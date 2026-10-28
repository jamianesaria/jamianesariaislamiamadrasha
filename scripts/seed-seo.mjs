// Add missing SEO singletons and repair only known obsolete public links; preserve editorial overrides.
// Dry run: node scripts/seed-seo.mjs; apply: node scripts/seed-seo.mjs --apply
import env from "@next/env";
import { createClient } from "@sanity/client";
import { pageSeoDocumentId, seoRoutes, seoDefaults, blogPath } from "../src/data/seoData.ts";
env.loadEnvConfig(process.cwd());
const apply = process.argv.includes("--apply");
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-03-01", useCdn: false, token: process.env.SANITY_API_TOKEN });
const [pages, posts, copies] = await Promise.all([
  client.fetch('*[_type=="pageSeo"]{_id,route}'),
  client.fetch('*[_type=="blogPost" && !defined(archivedAt)]{_id,legacyId,"slug":slug.current}'),
  client.fetch('*[_type=="pageContent" && !(_id in path("drafts.**"))]{_id,_rev,entries[]{_key,text}}'),
]);
const transaction = client.transaction(); let creates = 0; let linkChanges = 0;
for (const [route, page] of Object.entries(seoRoutes)) {
  if (pages.some((record) => record.route === route)) continue;
  transaction.createIfNotExists({ _id: pageSeoDocumentId(route), _type: "pageSeo", route, breadcrumbLabel: route === "/" ? seoDefaults.homeLabel : page.label, ...(page.heading ? { pageHeading: page.label } : {}), ...(route === "/blog" ? { backToBlogLabel: "সকল প্রবন্ধে ফিরে যান", articleAuthorLabel: "লেখক", articleDateLabel: "প্রকাশ" } : {}) }); creates++;
}
transaction.patch("siteSettings", (patch) => patch.setIfMissing({ seoSiteName: seoDefaults.siteName, seoDescription: seoDefaults.description, breadcrumbHomeLabel: seoDefaults.homeLabel, breadcrumbNavLabel: seoDefaults.breadcrumbLabel, badriFormContactLabel: "কাগজের ফরম পেতে অফিসে যোগাযোগ করুন" }));
const aliases = { "/about/history": "/about", "/faculty": "/teachers", "/profile": "/committee", "/profile/managing-committee": "/committee", "/313-badri-kafila": "/badri-kafila", "/functions/notices": "/notices", "/vorti-tottho": "/admission" };
function canonicalLink(value) {
  if (typeof value !== "string") return value;
  for (const [from, to] of Object.entries(aliases)) if (value === from || value.startsWith(from + "#") || value.startsWith(from + "?")) return to + value.slice(from.length);
  const match = value.match(/^\/blog#post-(.+)$/);
  const post = match && posts.find((record) => String(record.legacyId ?? record._id) === match[1]);
  return post?.slug ? blogPath(post.slug) : value;
}
for (const copy of copies) {
  const changes = Object.fromEntries((copy.entries || []).filter((entry) => canonicalLink(entry.text) !== entry.text).map((entry) => [`entries[_key=="${entry._key}"].text`, canonicalLink(entry.text)]));
  if (!Object.keys(changes).length) continue;
  linkChanges += Object.keys(changes).length;
  transaction.patch(copy._id, (patch) => patch.ifRevisionId(copy._rev).set(changes));
}
if (apply) await transaction.commit();
console.log(JSON.stringify({ applied: apply, missingSeoPages: creates, repairedLinks: linkChanges, existingEditorialValuesPreserved: true }));
