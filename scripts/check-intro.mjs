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
  page.on("pageerror", (error) => errors.push(error));
  await page.goto(siteUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  return { context, page };
}

async function assertUnblocked(page) {
  await page.waitForFunction(() => !document.querySelector(".website-intro"), undefined, { timeout: 12000 });
  assert.equal(await page.evaluate(() => document.body.style.overflow === "hidden" || !!document.querySelector("[inert]")), false);
}

try {
  for (const [name, width, height] of [["phone", 390, 844], ["tablet", 768, 1024], ["desktop", 1440, 900]]) {
    const { context, page } = await open({ viewport: { width, height } });
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
    assert.equal(dimensions.fit, "contain");
    assert.ok(dimensions.videoWidth > 0 && dimensions.videoHeight > 0);
    assert.ok(dimensions.muted && dimensions.inline && dimensions.buttonFits && dimensions.focusInDialog, JSON.stringify(dimensions));
    await page.screenshot({ path: join(screenshots, `${name}.png`) });
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.tagName), "BUTTON");
    await dialog.getByRole("button").click();
    await assertUnblocked(page);
    await page.reload({ waitUntil: "domcontentloaded" });
    await assertUnblocked(page);
    console.log(`${name}: viewport, playback, keyboard, skip, and once-per-session checks passed`);
    await context.close();
  }

  const automatic = await open();
  await automatic.page.getByRole("dialog").waitFor({ state: "visible" });
  await assertUnblocked(automatic.page);
  const completed = await automatic.page.evaluate(() => Object.keys(sessionStorage).some((key) => key.startsWith("jamia-intro:") && sessionStorage.getItem(key) === "seen"));
  assert.ok(completed, "Completing playback must mark the intro seen");
  await automatic.context.close();
  console.log("Natural playback completion reveals the homepage");

  const reduced = await open({ reducedMotion: "reduce" });
  await assertUnblocked(reduced.page);
  await reduced.context.close();
  console.log("Reduced-motion visitors bypass the intro");

  const denied = await open({}, (context) => context.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException("Autoplay blocked", "NotAllowedError"));
  }));
  await assertUnblocked(denied.page);
  await denied.context.close();
  console.log("Blocked autoplay reveals the homepage safely");

  const missing = await open({}, (context) => context.route("**/Student_opening_doors_to_light_20261021201917.mp4", (route) => route.fulfill({ status: 404, body: "" })));
  await assertUnblocked(missing.page);
  await missing.context.close();
  console.log("Missing video reveals the homepage safely");

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
  await noScript.context.close();
  console.log("The homepage remains accessible without JavaScript");

  assert.equal(errors.length, 0, `${errors.length} browser runtime errors`);
  console.log(`All intro checks passed. Screenshots: ${screenshots}`);
} finally {
  await browser.close();
}
