// Analyse the shape of src/data/siteData.ts to plan the Sanity schema generator.
// Usage: node scripts/analyze-sitedata.mjs
const data = await import("../src/data/siteData.ts");

const issues = [];
const validKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
function walk(v, path) {
  if (Array.isArray(v)) {
    const kinds = new Set(v.map((x) => (Array.isArray(x) ? "array" : x === null ? "null" : typeof x)));
    if (kinds.size > 1) issues.push(`MIXED ARRAY ${path}: ${[...kinds]}`);
    if (kinds.has("array")) issues.push(`NESTED ARRAY ${path}`);
    v.forEach((x, i) => walk(x, `${path}[${i}]`));
  } else if (v && typeof v === "object") {
    for (const [k, x] of Object.entries(v)) {
      if (!validKey.test(k)) issues.push(`INVALID KEY ${path}.${k}`);
      walk(x, `${path}.${k}`);
    }
  } else if (typeof v === "function") issues.push(`FUNCTION ${path}`);
}
for (const [name, v] of Object.entries(data)) {
  const kind = Array.isArray(v) ? `array(${v.length})` : typeof v;
  console.log(name.padEnd(28), kind);
  walk(v, name);
}
console.log("\nISSUES:\n" + [...new Set(issues.map((i) => i.replace(/\[\d+\]/g, "[]")))].join("\n"));

