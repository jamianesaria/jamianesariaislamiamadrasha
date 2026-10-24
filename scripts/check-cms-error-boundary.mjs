import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import env from "@next/env";

env.loadEnvConfig(process.cwd());
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const port = Number(process.env.QA_ERROR_PORT || 3021);
const base = `http://localhost:${port}`;
const invalidToken = `qa-invalid-read-${randomUUID()}`;
let logs = "";
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--port", String(port)], {
  env: { ...process.env, SANITY_API_READ_TOKEN: invalidToken },
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", chunk => { logs += chunk; });
server.stderr.on("data", chunk => { logs += chunk; });
let browser;
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => { clearInterval(check); reject(new Error("QA server startup timed out")); }, 60000);
    const check = setInterval(() => {
      if (logs.includes("Ready")) { clearTimeout(timer); clearInterval(check); resolve(); }
      else if (server.exitCode !== null) { clearTimeout(timer); clearInterval(check); reject(new Error("QA server exited before startup")); }
    }, 100);
  });
  browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || undefined });
  const context = await browser.newContext();
  const page = await context.newPage();
  const published = await page.goto(base + "/contact", { waitUntil: "domcontentloaded", timeout: 90000 });
  assert.equal(published.status(), 200);
  // The bypass value belongs only to this local build. No live preview access is changed.
  const manifest = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
  await context.addCookies([{ name: "__prerender_bypass", value: manifest.preview.previewModeId, url: base, httpOnly: true, sameSite: "Lax" }]);
  const preview = await page.goto(base + "/contact", { waitUntil: "domcontentloaded", timeout: 90000 });
  assert.equal(preview.status(), 200, "The page must render its fallback when CMS authorization fails");
  await page.locator("nav").first().waitFor();
  await page.waitForTimeout(2000);
  assert.ok(logs.includes("Using fallback site settings: Sanity is unavailable."), "The failure path must actually execute");
  assert.equal(logs.includes(invalidToken), false, "SDK request credentials must not enter server logs");
  assert.equal((await page.content()).includes(invalidToken), false, "Credentials must not enter browser HTML");
  console.log(JSON.stringify({ cmsFailureExercised: true, fallbackStatus: preview.status(), credentialInLogs: false, credentialInHtml: false }));
} finally {
  await browser?.close();
  server.kill();
}
