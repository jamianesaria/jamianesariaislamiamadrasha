// Integration checks against the configured Sanity project. Creates and removes only its own QA records.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { randomUUID, webcrypto } from "node:crypto";
import ts from "typescript";
import env from "@next/env";
import { createClient } from "@sanity/client";
import { NextRequest } from "next/server.js";

env.loadEnvConfig(process.cwd());
const require = createRequire(import.meta.url);
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";
const publicDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const privateDataset = process.env.SANITY_SUBMISSIONS_DATASET || "submissions";
const config = { projectId, dataset: publicDataset, apiVersion: "2026-03-01", token: process.env.SANITY_API_TOKEN, useCdn: false };
const publicClient = createClient(config);
const privateClient = publicClient.withConfig({ dataset: privateDataset });
const anonymous = createClient({ projectId, dataset: publicDataset, apiVersion: config.apiVersion, useCdn: false });
const ownRecords = new Map();
const moduleCache = new Map();
function load(file) {
  if (moduleCache.has(file)) return moduleCache.get(file).exports;
  const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const loadedModule = { exports: {} }; moduleCache.set(file, loadedModule);
  runInNewContext(`(function(require,module,exports){${code}\n})`, { console, process, Buffer, Date, crypto: webcrypto })(
    (specifier) => specifier === "server-only" ? {} : specifier === "./validation" ? load(resolve("src/lib/submissions/validation.ts")) : specifier === "@/sanity/env" ? { projectId, apiVersion: config.apiVersion, dataset: publicDataset } : require(specifier), loadedModule, loadedModule.exports,
  );
  return loadedModule.exports;
}
const { receiveSubmission } = load(resolve("src/lib/submissions/server.ts"));
async function send(kind, body, key = randomUUID(), extraHeaders = {}) {
  const request = new NextRequest("https://test.invalid/api/" + kind, { method: "POST", headers: { "content-type": "application/json", "idempotency-key": key, origin: "https://test.invalid", "x-forwarded-for": "qa-" + randomUUID(), ...extraHeaders }, body: JSON.stringify(body) });
  const response = await receiveSubmission(request, kind);
  const result = await response.json();
  if (result.reference) {
    const id = await privateClient.fetch('*[_type=="incomingSubmission" && reference==$reference][0]._id', { reference: result.reference });
    if (id) ownRecords.set(id, privateClient);
  }
  return { response, result };
}
try {
  const datasets = await publicClient.datasets.list();
  assert.ok(datasets.some((item) => item.name === privateDataset));
  assert.equal(await privateClient.fetch('count(*[!(_type in ["system.group", "system.retention"]) && (_type != "incomingSubmission" || !(_id in path("incoming.*")) || length(_id) != 73)])', {}, { perspective: "raw" }), 0);
  console.log("Authenticated submission namespace verified independently of paid dataset visibility");
  const admission = { studentName: "CMS QA " + randomUUID(), fatherName: "QA Guardian", fatherMobile: "01700000000", admissionClass: "QA class", motherProfession: "QA", presentVillage: "QA", admissionYear: "2026" };
  const key = randomUUID();
  const first = await send("admission", admission, key);
  assert.equal(first.response.status, 201); assert.ok(first.result.reference);
  const retry = await send("admission", admission, key);
  assert.equal(retry.result.reference, first.result.reference);
  const record = await privateClient.fetch('*[_type=="incomingSubmission" && reference==$reference][0]', { reference: first.result.reference });
  assert.match(record._id, /^incoming\.[a-f0-9]{64}$/);
  let anonymousRecord = null;
  try { anonymousRecord = await anonymous.withConfig({ dataset: privateDataset }).fetch('*[_id==$id][0]', { id: record._id }); }
  catch (error) { assert.ok([401, 403].includes(error.statusCode)); }
  assert.equal(anonymousRecord, null, "Private submission must not be readable without authentication");
  console.log("Anonymous reads cannot retrieve an existing private submission");
  assert.equal(record.fields.motherProfession, "QA"); assert.equal(record.fields.presentVillage, "QA");
  assert.equal(await privateClient.fetch('count(*[reference==$reference])', { reference: first.result.reference }), 1);
  await privateClient.patch(record._id).ifRevisionId(record._rev).set({ status: "review", notes: "QA internal note" }).commit();
  assert.equal((await privateClient.getDocument(record._id)).status, "review");
  await assert.rejects(() => privateClient.patch(record._id).ifRevisionId(record._rev).set({ notes: "stale change" }).commit());
  console.log("Admission persists all supplied fields, retries return one record, and stale staff updates are rejected");
  for (const [kind, body] of [["contact", { name: "CMS QA contact", email: "qa@example.invalid", message: "Integration test" }], ["badri", { name: "CMS QA Badri", phone: "01700000000", memberType: "self", chosenSeatNumber: "12" }]]) {
    assert.equal((await send(kind, body)).response.status, 201);
  }
  assert.equal((await send("contact", { name: "Missing contact", message: "QA" })).response.status, 400);
  assert.equal((await send("admission", { ...admission, studentImage: "data:image/jpeg;base64,SGVsbG8=" })).response.status, 400);
  assert.equal((await send("contact", { name: "QA", email: "qa@example.invalid", message: "QA" }, randomUUID(), { origin: "https://foreign.invalid" })).response.status, 403);
  assert.equal((await send("admission", admission, "invalid")).response.status, 400);
  console.log("Contact/Badri persistence, validation, image validation, origin checks and request identifiers passed");
  const token = process.env.SANITY_API_TOKEN; const privateToken = process.env.SANITY_SUBMISSIONS_WRITE_TOKEN;
  try {
    delete process.env.SANITY_API_TOKEN; delete process.env.SANITY_SUBMISSIONS_WRITE_TOKEN;
    const disabled = await send("admission", admission);
    assert.equal(disabled.response.status, 503); assert.equal(disabled.result.success, false);
  } finally { process.env.SANITY_API_TOKEN = token; if (privateToken) process.env.SANITY_SUBMISSIONS_WRITE_TOKEN = privateToken; }
  console.log("Missing write credentials produce a truthful failure");
  const id = randomUUID(); const draftId = "drafts." + id;
  ownRecords.set(id, publicClient); ownRecords.set(draftId, publicClient);
  const document = { _id: draftId, _type: "notice", title: "CMS QA " + id, category: "general", publishDate: new Date().toISOString().slice(0, 10) };
  await publicClient.create(document);
  assert.equal(await anonymous.fetch('*[_id==$id][0]', { id }), null);
  await publicClient.create({ ...document, _id: id });
  assert.equal((await anonymous.fetch('*[_id==$id][0]', { id })).title, document.title);
  await publicClient.delete(id);
  assert.equal(await anonymous.fetch('*[_id==$id][0]', { id }), null);
  console.log("Draft, publish, and unpublish are distinguished by anonymous website reads");
  assert.equal(await anonymous.fetch('count(*[_type=="incomingSubmission"])'), 0);
  console.log("No private submissions were written to the public dataset. All management integration checks passed.");
} finally {
  for (const [id, client] of ownRecords) await client.delete(id);
  console.log("Only records created by this QA run were removed.");
}
