// Dry run by default. --apply updates only approved public fields and adds missing link defaults.
import fs from "node:fs";
import env from "@next/env";
import { createClient } from "@sanity/client";
import { defaultQuickAccess, defaultRelatedLinks, relatedPageRoutes, relatedLinksTitle, pageSeoDocumentId } from "../src/data/seoData.ts";
env.loadEnvConfig(process.cwd());
const apply = process.argv.includes("--apply");
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-03-01", useCdn: false, token: process.env.SANITY_API_TOKEN });
const ids = ["siteSettings", "homepage", "copy.ui.NoticeBoardSection", ...Object.keys(relatedPageRoutes).map(pageSeoDocumentId)];
const records = (await client.getDocuments(ids.flatMap((id) => [id, `drafts.${id}`]))).filter(Boolean);
for (const id of ids) if (!records.some((record) => record._id === id)) throw new Error(`Required public record missing: ${id}`);
const officialFacebook = "https://www.facebook.com/jamianesaria/";
const oldNoticeHeading = "জামিয়ার কেন্দ্রীয় বিজ্ঞপ্তি প্রাচীর ও মহাফেজখানা";
const noticeHeading = "নোটিশ ও বিজ্ঞপ্তি";
const transaction = client.transaction();
let profileUpdates = 0; let missingQuickAccess = 0; let missingRelatedGroups = 0; let headingUpdates = 0;
for (const record of records) {
  const id = record._id.replace(/^drafts\./, "");
  if (id === "siteSettings" && record.facebookUrl !== officialFacebook) {
    transaction.patch(record._id, (patch) => patch.ifRevisionId(record._rev).set({ facebookUrl: officialFacebook })); profileUpdates++;
  }
  if (id === "homepage" && record.quickAccess === undefined) {
    transaction.patch(record._id, (patch) => patch.ifRevisionId(record._rev).setIfMissing({ quickAccess: defaultQuickAccess })); missingQuickAccess++;
  }
  if (id.startsWith("seo-page-") && relatedPageRoutes[record.route]) {
    const fields = { relatedLinksTitle, relatedLinks: defaultRelatedLinks(record.route), ...(record.route === "/about" ? { pageHeading: "জামিয়া পরিচিতি" } : {}) };
    const missing = Object.fromEntries(Object.entries(fields).filter(([key]) => record[key] === undefined));
    if (Object.keys(missing).length) { transaction.patch(record._id, (patch) => patch.ifRevisionId(record._rev).setIfMissing(missing)); missingRelatedGroups++; }
  }
  if (id === "copy.ui.NoticeBoardSection") {
    const entry = record.entries?.find((entry) => entry._key === "e1cv6689");
    if (entry?.text === oldNoticeHeading) {
      transaction.patch(record._id, (patch) => patch.ifRevisionId(record._rev).set({ 'entries[_key=="e1cv6689"].text': noticeHeading })); headingUpdates++;
    }
  }
}
if (apply && profileUpdates + missingQuickAccess + missingRelatedGroups + headingUpdates > 0) {
  fs.mkdirSync(".cms-work/navigation-backups", { recursive: true });
  fs.writeFileSync(`.cms-work/navigation-backups/${Date.now()}.json`, JSON.stringify(records, null, 2));
  await transaction.commit();
}
console.log(JSON.stringify({ applied: apply, profileUpdates, missingQuickAccess, missingRelatedGroups, headingUpdates, otherEditorialValuesPreserved: true }));
