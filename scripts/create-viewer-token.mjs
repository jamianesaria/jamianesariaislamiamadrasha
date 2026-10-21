// Creates a Viewer-role API token (safe to share with the browser for live draft preview)
// and writes it to .env.local as SANITY_API_READ_TOKEN.
// Usage: node --env-file=.env.local scripts/create-viewer-token.mjs
import { readFileSync, writeFileSync } from "node:fs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";
const token = process.env.SANITY_API_TOKEN;

const res = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/tokens`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ label: "next-live-preview-viewer", roleName: "viewer" }),
});
const data = await res.json();
if (!res.ok || !data.key) {
  console.error("Failed to create viewer token:", res.status, data);
  process.exit(1);
}

for (const file of [".env.local", ".env"]) {
  let text = "";
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (/^SANITY_API_READ_TOKEN=.*$/m.test(text)) {
    text = text.replace(/^SANITY_API_READ_TOKEN=.*$/m, `SANITY_API_READ_TOKEN=${data.key}`);
  } else {
    text += `\nSANITY_API_READ_TOKEN=${data.key}\n`;
  }
  writeFileSync(file, text);
  console.log(`Updated SANITY_API_READ_TOKEN in ${file}`);
}
console.log("Viewer token created:", data.id, data.label);

