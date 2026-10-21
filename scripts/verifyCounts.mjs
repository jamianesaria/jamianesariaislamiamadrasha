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
  const teacherCount = await client.fetch(`count(*[_type == "teacher"])`);
  const committeeCount = await client.fetch(`count(*[_type == "committeeMember"])`);
  const deptCount = await client.fetch(`count(*[_type == "academicDepartment"])`);
  const noticesCount = await client.fetch(`count(*[_type == "notice"])`);
  const homeDoc = await client.fetch(`*[_type == "homepage"][0]`);

  console.log("Teacher count:", teacherCount);
  console.log("Committee count:", committeeCount);
  console.log("Department count:", deptCount);
  console.log("Notice count:", noticesCount);
  console.log("Homepage exists:", !!homeDoc);
}

main().catch(console.error);
