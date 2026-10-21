// Lists API tokens for the project and checks whether SANITY_API_READ_TOKEN is set.
// Usage: node --env-file=.env.local scripts/check-tokens.mjs
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";
const token = process.env.SANITY_API_TOKEN;
const read = process.env.SANITY_API_READ_TOKEN;
console.log("SANITY_API_TOKEN set:", !!token, "| SANITY_API_READ_TOKEN set:", !!read, "| same:", token === read);
const res = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/tokens`, {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
console.log(res.status, JSON.stringify(Array.isArray(data) ? data.map((t) => ({ id: t.id, label: t.label, roles: t.roles?.map((r) => r.name) })) : data, null, 2));

