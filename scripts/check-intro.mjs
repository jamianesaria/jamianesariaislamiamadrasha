// Run against a local server with Playwright available. Optional environment:
// SITE_URL, PLAYWRIGHT_MODULE (module name or file URL), BROWSER_EXECUTABLE.
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || undefined });
const siteUrl = process.env.SITE_URL || "http://localhost:3000";
const screenshots = mkdtempSync(join(tmpdir(), "jamia-intro-qa-"));
const errors = [];

async function open(options = {}, setup) {
  const context = await browser.newContext({ reducedMotion: "no-preference", ...options });
  if (setup) await setup(context);
  const page = await context.newPage();
  const videoRequests = [];
  page.on("request", (request) => { if (/\.mp4(?:\?|$)/.test(request.url())) videoRequests.push(request.url()); });
  page.on("pageerror", (error) => errors.push(error));
  await page.goto(siteUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  return { context, page, videoRequests };
}

async function assertUnblocked(page) {
  await page.waitForFunction(() => !document.querySelector(".website-intro"), undefined, { timeout: 12000 });
  assert.equal(await page.evaluate(() => document.body.style.overflow === "hidden" || !!document.querySelector("[inert]")), false);
}

try {
  for (const [name, width, height] of [["phone", 390, 844], ["tablet", 768, 1024], ["desktop", 1440, 900]]) {
    const { context, page, videoRequests } = await open({ viewport: { width, height } });
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    const video = dialog.locator("video");
    await page.waitForFunction(() => document.querySelector(".website-intro video")?.currentTime > 0.1);
    await video.evaluate((element) => element.pause());
    const dimensions = await dialog.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const video = element.querySelector("video");
      const button = element.querySelector("button").getBoundingClientRect();
      return {
        width: rect.width, height: rect.height, x: rect.x, y: rect.y,
        overflow: document.documentElement.scrollWidth > innerWidth,
        fit: getComputedStyle(video).objectFit,
        videoWidth: video.videoWidth, videoHeight: video.videoHeight,
        muted: video.muted, inline: video.playsInline,
        buttonFits: button.x >= 0 && button.right <= innerWidth && button.y >= 0 && button.bottom <= innerHeight,
        focusInDialog: element.contains(document.activeElement),
      };
    });
    assert.equal(dimensions.width, width);
    assert.equal(dimensions.height, height);
    assert.equal(dimensions.x, 0);
    assert.equal(dimensions.y, 0);
    assert.equal(dimensions.overflow, false);
    assert.equal(dimensions.fit, height > width ? "cover" : "contain");
    assert.ok(dimensions.videoWidth > 0 && dimensions.videoHeight > 0);
    assert.equal(dimensions.videoHeight > dimensions.videoWidth, height > width, "Portrait devices must receive the portrait file");
    assert.ok(videoRequests.every((url) => !url.includes("hero-courtyard")), "Hero must not compete with the intro download");
    assert.ok(dimensions.muted && dimensions.inline && dimensions.buttonFits && dimensions.focusInDialog, JSON.stringify(dimensions));
    await page.screenshot({ path: join(screenshots, `${name}.png`) });
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.tagName), "BUTTON");
    await dialog.getByRole("button").click();
    await assertUnblocked(page);
    const beforeReload = videoRequests.filter((url) => url.includes("intro-")).length;
    await page.reload({ waitUntil: "domcontentloaded" });
    await assertUnblocked(page);
    assert.equal(videoRequests.filter((url) => url.includes("intro-")).length, beforeReload, "Repeat visits must not download the intro");
    console.log(`${name}: viewport, playback, keyboard, skip, and once-per-session checks passed`);
    await context.close();
  }

  const automatic = await open();
  await automatic.page.getByRole("dialog").waitFor({ state: "visible" });
  await assertUnblocked(automatic.page);
  await automatic.page.waitForFunction(() => [...document.querySelectorAll("video")].some((video) => video.currentSrc.includes("hero-courtyard") && video.currentTime > 0));
  const completed = await automatic.page.evaluate(() => Object.keys(sessionStorage).some((key) => key.startsWith("jamia-intro:") && sessionStorage.getItem(key) === "seen"));
  assert.ok(completed, "Completing playback must mark the intro seen");
  await automatic.context.close();
  console.log("Natural playback completion reveals the homepage");

  const reduced = await open({ reducedMotion: "reduce" });
  await assertUnblocked(reduced.page);
  assert.equal(reduced.videoRequests.length, 0, "Reduced motion must not download either video");
  await reduced.context.close();
  console.log("Reduced-motion visitors bypass the intro");

  const denied = await open({}, (context) => context.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException("Autoplay blocked", "NotAllowedError"));
  }));
  await assertUnblocked(denied.page);
  await denied.context.close();
  console.log("Blocked autoplay reveals the homepage safely");

  const missing = await open({}, (context) => context.route("**/intro-*.mp4", (route) => route.fulfill({ status: 404, body: "" })));
  await assertUnblocked(missing.page);
  await missing.context.close();
  console.log("Missing video reveals the homepage safely");

  const stalled = await open({}, (context) => context.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => new Promise(() => {});
  }));
  assert.equal(await stalled.page.getByRole("dialog").isVisible(), false, "An unready video must never cover the homepage");
  assert.equal(await stalled.page.locator("[inert]").count(), 0);
  await stalled.page.waitForFunction(() => !document.querySelector(".website-intro"), undefined, { timeout: 2500 });
  await assertUnblocked(stalled.page);
  await stalled.context.close();
  console.log("Stalled playback stays invisible and is bypassed within 1.5 seconds");

  const saving = await open({}, (context) => context.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g" } });
  }));
  await assertUnblocked(saving.page);
  assert.equal(saving.videoRequests.length, 0, "Data Saver must not download decorative videos");
  await saving.context.close();
  console.log("Data Saver skips both video downloads");

  const delayed = await open({}, (context) => context.route("**/*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3500));
    await route.continue();
  }));
  await assertUnblocked(delayed.page);
  assert.equal(delayed.videoRequests.some((url) => url.includes("intro-")), false, "Slow hydration must not download or open a late intro");
  await delayed.context.close();
  console.log("Slow JavaScript bypasses the intro without a blocking cover");

  const restricted = await open({}, (context) => context.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", { get() { throw new DOMException("Storage blocked", "SecurityError"); } });
  }));
  await restricted.page.getByRole("dialog").getByRole("button").click();
  await assertUnblocked(restricted.page);
  await restricted.context.close();
  console.log("Restricted session storage preserves the skip action");

  const escape = await open();
  await escape.page.getByRole("dialog").waitFor({ state: "visible" });
  await escape.page.keyboard.press("Escape");
  await assertUnblocked(escape.page);
  await escape.context.close();
  console.log("Escape dismisses the intro");

  const noScript = await open({ javaScriptEnabled: false });
  assert.equal(await noScript.page.locator(".website-intro").isVisible(), false);
  assert.equal(await noScript.page.locator("[inert]").count(), 0);
  assert.equal(noScript.videoRequests.length, 0, "No JavaScript must leave the homepage accessible without video downloads");
  await noScript.context.close();
  console.log("The homepage remains accessible without JavaScript");

  assert.equal(errors.length, 0, `${errors.length} browser runtime errors`);
  console.log(`All intro checks passed. Screenshots: ${screenshots}`);
} finally {
  await browser.close();
}
