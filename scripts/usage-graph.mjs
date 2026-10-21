// For every siteData export, list which components use it and whether those components are reachable from app pages.
// Usage: node scripts/usage-graph.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const data = await import("../src/data/siteData.ts");
const files = [];
(function rec(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) rec(p);
    else if (/\.(tsx?|mjs)$/.test(f)) files.push(p);
  }
})("src");

const src = Object.fromEntries(files.map((f) => [f, readFileSync(f, "utf8")]));
const compName = (f) => basename(f).replace(/\.tsx?$/, "");
// reachability: from src/app/**/page.tsx|layout.tsx follow "@/components/X" imports
const reach = new Set();
const queue = files.filter((f) => /src[\\/]app[\\/]/.test(f));
while (queue.length) {
  const f = queue.pop();
  if (reach.has(f)) continue;
  reach.add(f);
  for (const m of src[f].matchAll(/from\s+["'](?:@\/components\/|\.\/)([A-Za-z0-9_]+)["']/g)) {
    const target = files.find((x) => compName(x) === m[1] && x.includes("components"));
    if (target) queue.push(target);
  }
}
for (const name of Object.keys(data)) {
  const users = files.filter((f) => !f.endsWith("siteData.ts") && new RegExp(`\\b${name}\\b`).test(src[f]));
  console.log(name.padEnd(28), users.map((u) => `${compName(u)}${reach.has(u) ? "" : "(UNUSED)"}`).join(", ") || "-- none --");
}
console.log("\nUnreachable components:", files.filter((f) => f.includes("components") && !reach.has(f)).map(compName).join(", "));

