// Read-only regression checks against a running build. No form submissions or CMS writes.
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { seoRoutes, SITE_URL, blogPath } from "../src/data/seoData.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.QA_BASE_URL || "http://localhost:3020";
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || undefined });
const results = [];
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const robots = await context.request.get(`${base}/robots.txt`);
  assert.equal(robots.status(), 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/nesariamadrasa\.com\/sitemap.xml/);
  const sitemap = await context.request.get(`${base}/sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  const xml = await sitemap.text();
  for (const privatePath of ["/studio", "/api/", "/faculty", "/about/history", "/profile"]) assert.ok(!xml.includes(`${SITE_URL}${privatePath}`), privatePath);
  assert.ok(xml.includes(`${SITE_URL}/admission`));
  const paths = Object.keys(seoRoutes);
  const articlePaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname).filter((path) => path.startsWith("/blog/"));
  assert.ok(articlePaths.length > 0, "Published articles must have sitemap entries");
  for (const route of [...paths, ...articlePaths]) {
    const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    assert.equal(response.status(), 200, route);
    await page.locator('link[rel="canonical"]').waitFor({ state: "attached" });
    await page.locator("main h1").first().waitFor();
    await page.waitForFunction(() => document.styleSheets.length > 0);
    const seo = await page.evaluate(() => ({
      title: document.title, canonical: document.querySelector('link[rel="canonical"]')?.href,
      description: document.querySelector('meta[name="description"]')?.content,
      og: document.querySelector('meta[property="og:title"]')?.content,
      twitter: document.querySelector('meta[name="twitter:card"]')?.content,
      h1: [...document.querySelectorAll("main h1")].map((node) => node.textContent),
      graph: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((node) => { const data = JSON.parse(node.textContent); return data["@graph"] || [data]; }),
      breadcrumbs: document.querySelectorAll('nav[aria-label*="Breadcrumb"] [aria-current="page"]').length,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      articleText: document.querySelector("main article")?.textContent.length || 0,
      links: [...document.querySelectorAll("main a[href]")].map((a) => a.getAttribute("href")),
    }));
    assert.equal(seo.canonical, `${SITE_URL}${route === "/" ? "/" : route}`, route);
    assert.ok(seo.title && seo.description && seo.og && seo.twitter === "summary_large_image", route);
    assert.ok(!/\?{3,}/.test(seo.title), "Bengali metadata must retain its encoding");
    assert.equal(seo.h1.length, 1, route);
    assert.equal(seo.overflow, false, route);
    assert.ok(seo.graph.some((node) => node["@type"] === "WebSite"), route);
    assert.ok(seo.graph.some((node) => node["@type"] === "EducationalOrganization"), route);
    if (route !== "/") {
      assert.equal(seo.breadcrumbs, 1, route);
      const trail = seo.graph.find((node) => node["@type"] === "BreadcrumbList");
      assert.equal(trail.itemListElement.at(-1).item, seo.canonical, route);
    }
    if (route.startsWith("/blog/")) {
      assert.ok(seo.graph.some((node) => node["@type"] === "BlogPosting"));
      assert.ok(seo.articleText > 200, "Full article must render");
      const raw = await context.request.get(`${base}${route}`);
      assert.ok((await raw.text()).includes("BlogPosting"), "Article schema must be server-rendered");
    }
    if (route === "/blog") assert.ok(seo.links.some((href) => href.startsWith("/blog/")), "Article links must be crawlable");
    if (route === "/badri-kafila") assert.ok(!seo.links.includes("/download/badri-kafila-form.pdf"));
    results.push({ route, canonical: seo.canonical, h1: seo.h1[0], valid: true });
  }
  for (const [from, to] of Object.entries({ "/about/history": "/about", "/faculty": "/teachers", "/profile/managing-committee": "/committee", "/profile": "/committee", "/313-badri-kafila": "/badri-kafila", "/functions/notices": "/notices", "/vorti-tottho": "/admission" })) {
    const response = await context.request.get(`${base}${from}`, { maxRedirects: 0 });
    assert.equal(response.status(), 308, from);
    assert.equal(new URL(response.headers().location, base).pathname, to);
  }
  await page.goto(`${base}/studio`, { waitUntil: "domcontentloaded" });
  await page.locator('meta[name="robots"]').waitFor({ state: "attached" });
  assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/);
  const missing = await context.request.get(`${base}${blogPath("seo-check-missing-article")}`);
  assert.equal(missing.status(), 404);
  assert.match(await missing.text(), /noindex/);
  const api = await context.request.get(`${base}/api/contact`);
  assert.match(api.headers()["x-robots-tag"], /noindex/);
  for (const file of ["/favicon.ico", "/icon.png", "/apple-icon.png", "/social-share.png"]) assert.equal((await context.request.get(`${base}${file}`)).status(), 200);
  await page.goto(`${base}/notices?category=admission`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector('link[rel="canonical"]')?.getAttribute("href") === "https://nesariamadrasa.com/notices");
  assert.deepEqual(errors, []);
  const report = { checked: results.length, articlePages: articlePaths.length, redirects: 7, runtimeErrors: errors, results };
  mkdirSync(".cms-work/seo", { recursive: true });
  writeFileSync(".cms-work/seo/checks.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
