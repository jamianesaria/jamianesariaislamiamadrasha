// Real transactions, synthetic records only; no user content or assets are deleted.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { runInNewContext } from "node:vm";
import { randomUUID, randomBytes } from "node:crypto";
import ts from "typescript";
import env from "@next/env";
import { createClient } from "@sanity/client";
env.loadEnvConfig(process.cwd());
const require = createRequire(import.meta.url);
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const loadedModule = { exports: {} }; cache.set(file, loadedModule);
  runInNewContext(`(function(require,module,exports){${code}\n})`, { Set, Error })(specifier => specifier.startsWith(".") ? load(resolve(dirname(file), specifier + ".ts")) : require(specifier), loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const { canDeleteRecord, prepareDeletion, deleteConfirmedRecord } = load(resolve("src/sanity/management/deletion.ts"));
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-03-01", token: process.env.SANITY_API_TOKEN, useCdn: false, perspective: "raw" });
const privateClient = client.withConfig({ dataset: process.env.SANITY_SUBMISSIONS_DATASET || "submissions" });
const own = [];
async function create(client, record) { own.push([client, record._id]); return client.create(record); }
try {
  for (const type of ["notice","classRoutine","examRoutine","examResult","galleryPhoto","galleryVideo","teacher","committeeMember","academicDepartment","calendarEvent","vacancy","blogPost","admissionInfo"]) {
    const id = randomUUID();
    const published = await create(client, { _id: id, _type: type, title: "Temporary deletion QA" });
    await create(client, { _id: "drafts." + id, _type: type, title: "Temporary deletion draft" });
    const snapshot = await prepareDeletion(client, { ...published, title: "QA" });
    assert.equal(snapshot.versions.length, 2);
    await deleteConfirmedRecord(client, snapshot);
    assert.equal(await client.getDocument(id), undefined);
    assert.equal(await client.getDocument("drafts." + id), undefined);
  }
  console.log("13 public record types: published and draft versions removed together.");
  for (const type of ["homepage","siteSettings","pageContent","badriKafila"]) assert.equal(canDeleteRecord(type), false);
  const record = await create(client, { _id: randomUUID(), _type: "notice", title: "Temporary concurrent deletion QA" });
  const snapshot = await prepareDeletion(client, record);
  await client.patch(record._id).set({ title: "Newer work" }).commit();
  await assert.rejects(() => deleteConfirmedRecord(client, snapshot));
  assert.equal((await client.getDocument(record._id)).title, "Newer work");
  const referenced = await client.getDocument(record._id);
  await create(client, { _id: randomUUID(), _type: "qaDeletionReference", target: { _type: "reference", _ref: record._id } });
  const referenceSnapshot = await prepareDeletion(client, referenced);
  await assert.rejects(() => deleteConfirmedRecord(client, referenceSnapshot));
  assert.ok(await client.getDocument(record._id));
  const anonymous = client.withConfig({ token: undefined });
  await assert.rejects(() => deleteConfirmedRecord(anonymous, referenceSnapshot));
  const incoming = await create(privateClient, { _id: "incoming." + randomBytes(32).toString("hex"), _type: "incomingSubmission", reference: "QA", fields: {}, status: "new" });
  await deleteConfirmedRecord(privateClient, await prepareDeletion(privateClient, { ...incoming, title: "QA" }));
  assert.equal(await privateClient.getDocument(incoming._id), undefined);
  await assert.rejects(() => prepareDeletion(privateClient, { _id: randomUUID(), _rev: "test", _type: "incomingSubmission", title: "QA" }));
  console.log("Protected settings, concurrent edits, strong references, anonymous permissions, and authenticated submission deletion passed.");
} finally {
  for (const [owner, id] of own.reverse()) await owner.delete(id);
  console.log("Only this run's synthetic deletion records cleaned up.");
}
