import assert from "node:assert/strict";
import { readFileSync, mkdirSync } from "node:fs";
import env from "@next/env";
import { createClient } from "@sanity/client";
import { chromium } from "playwright";
import { mapAcademicDepartments, departmentForSection } from "../src/sanity/lib/departments.ts";
env.loadEnvConfig(process.cwd());
const source = readFileSync("src/sanity/lib/queries.ts", "utf8");
const query = source.match(/export const departmentsQuery = groq`([\s\S]*?)`;/)?.[1];
assert.ok(query);
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-03-01", token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN, useCdn: false });
const records = mapAcademicDepartments(await client.fetch(query, { homepageOnly: false }, { perspective: "published" }));
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto((process.env.QA_BASE_URL || "http://localhost:3020") + "/academics", { waitUntil: "domcontentloaded" });
  await page.locator("#maktab h2").waitFor();
  for (const slug of ["maktab", "hifz", "kitab", "madani-nisab"]) {
    const record = departmentForSection(records, slug);
    if (!record) continue;
    const section = page.locator(`#${slug}`);
    assert.ok((await section.getByRole("heading", { name: record.name, exact: true }).count()) > 0, slug + " must use the native CMS title");
    const text = (await section.innerText()).replace(/\s+/g, " ");
    if (record.overview) assert.ok(text.includes(record.overview.replace(/\s+/g, " ")), slug + " must use the native overview");
    for (const feature of record.features) assert.ok(text.includes(feature.replace(/\s+/g, " ")), slug + " must use native features");
  }
  assert.ok(await page.locator("#syllabus").count());
  mkdirSync(".cms-work/public-qa", { recursive: true });
  await page.screenshot({ path: ".cms-work/public-qa/academics-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
  await page.screenshot({ path: ".cms-work/public-qa/academics-phone.png", fullPage: true });
  console.log("Native department titles, overviews and features render with the detailed syllabus preserved; no production content changed.");
} finally { await browser.close(); }
