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

async function main() {
  console.log("Checking CORS for project:", projectId);
  const res = await fetch(`https://api.sanity.io/v2023-08-01/projects/${projectId}/cors`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log("Current CORS origins:", JSON.stringify(data, null, 2));

  // Check if http://localhost:3000 exists
  const hasLocalhost = Array.isArray(data) && data.some(item => item.origin === "http://localhost:3000");
  if (!hasLocalhost) {
    console.log("Adding http://localhost:3000 with allowCredentials: true...");
    const addRes = await fetch(`https://api.sanity.io/v2023-08-01/projects/${projectId}/cors`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        origin: "http://localhost:3000",
        allowCredentials: true
      })
    });
    const addData = await addRes.json();
    console.log("Added result:", addData);
  } else {
    console.log("http://localhost:3000 already present in CORS origins.");
  }
}

main().catch(console.error);
