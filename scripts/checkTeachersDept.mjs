import { createClient } from "next-sanity";
import fs from "fs";

let token = process.env.SANITY_API_TOKEN;
let projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";

if (fs.existsSync(".env.local")) {
  const lines = fs.readFileSync(".env.local", "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("SANITY_API_TOKEN=")) {
      token = trimmed.split("=")[1]?.trim().replace(/^["']|["']$/g, "");
    }
    if (trimmed.startsWith("NEXT_PUBLIC_SANITY_PROJECT_ID=")) {
      projectId = trimmed.split("=")[1]?.trim().replace(/^["']|["']$/g, "");
    }
  }
}

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2023-08-01",
  useCdn: false,
  token,
});

async function main() {
  const teachers = await client.fetch(`*[_type == "teacher"] | order(serial asc) { serial, name, department, designation }`);
  console.log("Count:", teachers.length);
  const byDept = {};
  for (const t of teachers) {
    byDept[t.department] = (byDept[t.department] || 0) + 1;
    console.log(`${t.serial}: [${t.department}] ${t.name} (${t.designation})`);
  }
  console.log("By department:", byDept);
}

main().catch(console.error);
