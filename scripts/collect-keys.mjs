// Collect every object key used in the CMS-managed siteData exports (for the Bengali label dictionary).
const data = await import("../src/data/siteData.ts");
const include = ["siteSettings","navigationItems","breakingNews","homePageContent","aboutPageData","academicsPageData","orphanagePageData","physicalInfrastructureData","committeeAndFacultyData","noticesData","eventListTableData","holidayListTableData","vacancyListTableData","availableClasses","sampleRoutines","sampleExamRoutines","sampleGalleryPhotos","sampleGalleryVideos","sampleBlogPosts","academicYears"];
const keys = new Map();
const conflicts = new Set();
function kind(v){return Array.isArray(v)?"array":v===null?"null":typeof v}
function walk(v, path) {
  if (Array.isArray(v)) {
    // check per-key kind conflicts across array items
    const seen = {};
    for (const it of v) if (it && typeof it === "object" && !Array.isArray(it)) for (const [k,x] of Object.entries(it)) { const kk = kind(x); if (seen[k] && seen[k]!==kk && x!=null) conflicts.add(`${path}[].${k}: ${seen[k]} vs ${kk}`); seen[k] ??= kk; }
    v.forEach((x) => walk(x, path + "[]"));
  } else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) { keys.set(k, (keys.get(k) || 0) + 1); walk(x, path + "." + k); }
}
for (const n of include) {
  const v = data[n];
  if (["sampleRoutines","sampleExamRoutines"].includes(n)) Object.values(v).forEach((arr) => walk(arr, n));
  else walk(v, n);
}
console.log([...keys.keys()].sort().join(" "));
console.log("\nCONFLICTS:", [...conflicts].join("\n"));

