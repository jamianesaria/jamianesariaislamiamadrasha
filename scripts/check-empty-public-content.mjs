// Exercise successful empty CMS responses without deleting any actual content.
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
const require = createRequire(import.meta.url);
const cache = new Map();
const copy = { getEditableData: async (_id, fallback) => fallback, getFieldAttribute: async () => () => undefined, EditableText: ({ fallback }) => fallback, EditableImage: () => null };
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const loadedModule = { exports: {} }; cache.set(file, loadedModule);
  const imports = specifier => {
    if (specifier === "server-only") return {};
    if (specifier === "next-sanity") return { groq: (strings, ...values) => strings.reduce((text, part, index) => text + part + (values[index] || ""), "") };
    if (specifier === "next/navigation") return { unstable_rethrow: () => {} };
    if (specifier === "next/link") return { default: "a", __esModule: true };
    if (specifier === "./fetch") return { fetchSiteQuery: async () => [] };
    if (specifier === "@/content/server") return copy;
    if (specifier === "@/content/model") return { fieldSource: () => undefined };
    if (["./HeroVideo","./HomeNoticeTabs","./HomeGalleryFilter"].includes(specifier)) return { default: () => null, __esModule: true };
    if (specifier.startsWith(".") || specifier.startsWith("@/")) {
      const base = specifier.startsWith("@/") ? resolve("src", specifier.slice(2)) : resolve(dirname(file), specifier);
      return load(base + (existsSync(base + ".ts") ? ".ts" : ".tsx"));
    }
    return require(specifier);
  };
  runInNewContext(`(function(require,module,exports){${code}\n})`, { console })(imports, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const queries = load(resolve("src/sanity/lib/queries.ts"));
for (const name of ["getNotices","getTeachers","getCommitteeMembers","getAcademicDepartments","getClassRoutines","getExamRoutines","getExamResults","getGalleryPhotos","getGalleryVideos","getBlogPosts","getCalendar","getVacancies"]) assert.equal((await queries[name]()).length, 0, name + " must preserve a successful empty result");
const gallery = await load(resolve("src/sanity/lib/gallery.ts")).getGalleryRecords();
assert.equal(gallery.photos.length, 0); assert.equal(gallery.videos.length, 0);
const home = load(resolve("src/components/HomePrimarySection.tsx")).default;
function imageCount(node) {
  if (Array.isArray(node)) return node.reduce((sum, item) => sum + imageCount(item), 0);
  if (!node || typeof node !== "object") return 0;
  return (node.props?.entry === "eh2v1pw" ? 1 : 0) + imageCount(node.props?.children);
}
assert.ok(imageCount(await home()) > 0, "Positive control: an unconfigured homepage has fallback department cards");
assert.equal(imageCount(await home({ initialDepartments: [] })), 0, "Deleting the last managed department must not resurrect fallback cards");
console.log("12 managed lists, gallery provider and actual homepage preserve intentional empty CMS data; no real records changed.");
