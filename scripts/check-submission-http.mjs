// End-to-end HTTP persistence check. Removes only records carrying this run's unique QA marker.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import env from "@next/env";
import { createClient } from "@sanity/client";

env.loadEnvConfig(process.cwd());
const base = process.env.QA_BASE_URL || "http://localhost:3020";
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.SANITY_SUBMISSIONS_DATASET || "submissions", apiVersion: "2026-03-01", token: process.env.SANITY_SUBMISSIONS_WRITE_TOKEN || process.env.SANITY_API_TOKEN, useCdn: false });
const marker = "HTTP CMS QA " + randomUUID();
const ownQuery = '*[_type=="incomingSubmission" && (fields.name==$marker || fields.studentName==$marker)]';
const cases = [
  ["apply", { studentName: marker, fatherName: "QA Guardian", fatherMobile: "01700000000", admissionClass: "QA only" }],
  ["contact", { name: marker, email: "qa@example.invalid", message: "Temporary release verification only." }],
  ["badri", { name: marker, phone: "01700000000", note: "Temporary release verification only." }],
];
try {
  for (const [route, body] of cases) {
    const options = { method: "POST", headers: { "content-type": "application/json", origin: new URL(base).origin, "idempotency-key": randomUUID() }, body: JSON.stringify(body) };
    const response = await fetch(base + "/api/" + route, options);
    const result = await response.json();
    assert.equal(response.status, 201, route + ": server-side saving must be configured");
    assert.equal(result.success, true);
    const retry = await fetch(base + "/api/" + route, options);
    assert.equal(retry.status, 200);
    assert.equal((await retry.json()).reference, result.reference);
    const saved = await client.fetch(ownQuery + '[reference==$reference]', { marker, reference: result.reference });
    assert.equal(saved.length, 1, "Exactly one private record for a retried submission");
    console.log(JSON.stringify({ route, saved: true, retryDeduplicated: true }));
  }
} finally {
  const records = await client.fetch(ownQuery + '{_id}', { marker });
  for (const record of records) await client.delete(record._id);
  console.log("Only this HTTP verification run's private records were removed.");
}
