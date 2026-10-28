// Render a code-based sharing card using the existing logo. No remote image service.
import fs from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const logo = fs.readFileSync("public/jamia-logo-v2.png").toString("base64");
  await page.setContent(`<!doctype html><html lang="bn"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#014d26;color:#fffdf5;font-family:'Nirmala UI',sans-serif;border:18px solid #d5a04d;display:flex;align-items:center;padding:55px;gap:42px}img{width:245px;height:245px;border-radius:50%;background:white}h1{font-size:49px;line-height:1.5;margin:0 0 18px;font-weight:700}p{font-size:28px;line-height:1.6;margin:0;color:#f8e8bf}.domain{margin-top:28px;font-size:24px;color:white}</style><img src="data:image/png;base64,${logo}" alt=""><div><h1>জামিয়া নেছারিয়া ইসলামিয়া<br>মাদরাসা ও এতিমখানা</h1><p>মরকুন, টঙ্গী, গাজীপুর<br>প্রতিষ্ঠিত: ১৯৬৯ খ্রিষ্টাব্দ</p><p class="domain">nesariamadrasa.com</p></div></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/social-share.png" });
  console.log("Created 1200x630 sharing image.");
} finally { await browser.close(); }
