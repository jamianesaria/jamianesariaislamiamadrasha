import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  stega: {
    enabled: true,
    studioUrl: "/studio",
  },
});

async function run() {
  const res = await client.fetch(
    `*[_type == "homepage"][0]{heroHeadline}`,
    {},
    {
      perspective: "drafts",
      stega: true,
    }
  );
  console.log("Raw text length:", "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা".length);
  console.log("Fetched heroHeadline length:", res.heroHeadline.length);
  console.log("Stega encoded:", res.heroHeadline.length > "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা".length);
}

run();

