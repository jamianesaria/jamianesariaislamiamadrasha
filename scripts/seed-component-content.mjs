// Seed only reviewed public fallback content for one explicitly selected component.
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import env from "@next/env";
env.loadEnvConfig(process.cwd());
const component = process.argv[2];
if (!component || !/^[A-Za-z][A-Za-z0-9]+$/.test(component)) throw new Error("Choose one reviewed component.");
const records = JSON.parse(readFileSync(`.cms-work/content-proposals/${component}/seeds.json`, "utf8"));
const routes = JSON.parse(readFileSync("src/content/component-routes.json", "utf8"));
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-03-01", token: process.env.SANITY_API_TOKEN, useCdn: false });
if (!client.config().token) throw new Error("Server write credential required.");
for (const record of records) {
  record.route = routes[component] || "/";
  if (record._type !== "pageContent" || !/^copy\.(ui|data)\.[A-Za-z][A-Za-z0-9]*$/.test(record._id) || !Array.isArray(record.entries)) throw new Error("Unexpected migration record.");
  if (/sampleAcademicResults|sampleAdmissionResults/.test(record._id)) throw new Error("Private result fixtures cannot enter public content.");
  const existing = await client.getDocument(record._id);
  if (!existing) await client.createIfNotExists(record);
  else {
    const keys = new Set((existing.entries || []).map((entry) => entry._key));
    const missing = record.entries.filter((entry) => !keys.has(entry._key));
    if (missing.length) await client.patch(record._id).ifRevisionId(existing._rev).setIfMissing({ entries: [] }).append("entries", missing).commit();
  }
  console.log(JSON.stringify({ document: record._id, fields: record.entries.length, existingRecordsPreserved: true }));
}
