// Inspect Sanity dataset: counts per document type + sample of singletons.
// Usage: node --env-file=.env.local scripts/inspect-dataset.mjs
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

async function q(query) {
  const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}&perspective=raw`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  return (await res.json()).result;
}

const docs = await q(`*[!(_type match "system.*") && !(_type match "sanity.*")]{_id,_type}`);
const counts = {};
for (const d of docs) counts[d._type] = (counts[d._type] || 0) + 1;
console.log("COUNTS", counts);
console.log("IDS", docs.map((d) => d._id).join(", "));
const arg = process.argv[2];
if (arg) console.log(JSON.stringify(await q(arg), null, 2));

