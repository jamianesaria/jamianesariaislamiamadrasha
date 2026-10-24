// Verify Sanity's fixed authenticated-path ACL using synthetic data only.
// --configure-free removes reliance on paid private-dataset ACL after all checks pass.
import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import env from "@next/env";
import { createClient } from "@sanity/client";
env.loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const apiVersion = "2026-03-01";
const client = createClient({ projectId, apiVersion, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", token: process.env.SANITY_API_TOKEN, useCdn: false, perspective: "raw" });
const submissions = client.withConfig({ dataset: process.env.SANITY_SUBMISSIONS_DATASET || "submissions" });
const protectedId = "privacy-probe." + randomBytes(32).toString("hex");
const parentId = randomUUID();
const canary = "synthetic-private-" + randomUUID();
const own = [];
async function assertAnonymousIsolation(datasetClient, id) {
  const config = datasetClient.config();
  for (const useCdn of [false, true]) {
    const anonymous = createClient({ projectId, apiVersion, dataset: config.dataset, useCdn, perspective: "published" });
    if (config.dataset === client.config().dataset) assert.equal((await anonymous.getDocument(parentId))?._id, parentId, "Positive control: the root probe must be publicly readable");
    assert.equal(await anonymous.fetch('count(*[_id==$id])', { id }), 0);
    assert.equal(await anonymous.fetch('*[_id==$id][0]', { id }), null);
    assert.equal(await anonymous.getDocument(id), undefined);
    assert.equal(await anonymous.fetch('*[_id==$parent][0].target->', { parent: parentId }), null);
    const broad = await anonymous.fetch('*[_type=="qaAccessProbe"]');
    assert.ok(!JSON.stringify(broad).includes(canary));
  }
}
try {
  assert.notEqual(client.config().dataset, submissions.config().dataset);
  const records = await submissions.fetch('*[!(_type in ["system.group","system.retention"])]{_id,_type}');
  assert.ok(records.every(record => record._type === "incomingSubmission" && /^incoming\.[a-f0-9]{64}$/.test(record._id)), "Every existing non-system record must use the protected submission namespace");
  // The deliberately synthetic probe is placed in the ALREADY PUBLIC content dataset.
  const probe = await client.create({ _id: protectedId, _type: "qaAccessProbe", value: canary }); own.push(probe);
  const parent = await client.create({ _id: parentId, _type: "qaAccessProbe", target: { _type: "reference", _ref: protectedId, _weak: true } }); own.push(parent);
  assert.equal((await client.getDocument(protectedId)).value, canary);
  await assertAnonymousIsolation(client, protectedId);
  const anonymous = createClient({ projectId, apiVersion, dataset: client.config().dataset, useCdn: false });
  await assert.rejects(() => anonymous.delete(protectedId), error => [401,403].includes(error.statusCode));
  console.log("Public dataset: anonymous API/CDN queries, direct document lookups, dereferencing and deletion cannot access a protected path; authenticated reads work.");
  if (process.argv.includes("--configure-free")) {
    // Recheck immediately before changing ACL; no root personal data or public assets allowed.
    const current = await submissions.fetch('*[!(_type in ["system.group","system.retention"])]{_id,_type}');
    assert.ok(current.every(record => record._type === "incomingSubmission" && /^incoming\.[a-f0-9]{64}$/.test(record._id)));
    await submissions.datasets.edit(submissions.config().dataset, { aclMode: "public" });
    console.log("Submission container configured for Free. Document access still requires authentication through fixed protected paths.");
  }
  const visibility = (await client.datasets.list()).find(entry => entry.name === submissions.config().dataset)?.aclMode;
  if (visibility === "public") {
    // Only IDs and aggregate counts are used; never fetch real submission fields anonymously.
    const anon = createClient({ projectId, apiVersion, dataset: submissions.config().dataset, useCdn: false });
    assert.equal(await anon.fetch('count(*[_type=="incomingSubmission"])'), 0);
    for (const record of records) await assertAnonymousIsolation(submissions, record._id);
    console.log("Existing submissions remain inaccessible anonymously in the Free-compatible public container.");
  }
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), submissionContainer: visibility, protectedRecords: records.length, unsafeRecords: 0 }));
} finally {
  for (const document of own.reverse()) await client.transaction().patch(document._id, patch => patch.ifRevisionId(document._rev).unset(["_qaCleanup"])).delete(document._id).commit();
  console.log("Synthetic privacy probes removed.");
}
