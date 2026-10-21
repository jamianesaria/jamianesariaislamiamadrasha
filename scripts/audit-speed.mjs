// Read-only browser audit. SITE_URL, PLAYWRIGHT_MODULE and BROWSER_EXECUTABLE are configurable.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || undefined });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(process.env.SITE_URL || "http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(7000);
  const metrics = await page.evaluate(() => ({
    navigation: performance.getEntriesByType("navigation").map((n) => ({ ttfb: n.responseStart, dom: n.domContentLoadedEventEnd, load: n.loadEventEnd })),
    resources: performance.getEntriesByType("resource").filter((r) => /mp4|\.js|\.woff/.test(r.name)).map((r) => ({ url: r.name, bytes: r.transferSize, ms: Math.round(r.duration) })),
    videos: [...document.querySelectorAll("video")].map((v) => ({ src: v.currentSrc, time: v.currentTime, ready: v.readyState, error: v.error?.message })),
    introVisible: !!document.querySelector('.website-intro:not([aria-hidden="true"])'),
  }));
  console.log(JSON.stringify({ status: response.status(), cache: response.headers()["x-vercel-cache"], errors, ...metrics }, null, 2));
} finally {
  await browser.close();
}
