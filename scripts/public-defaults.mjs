import ts from "typescript";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
const require = createRequire(import.meta.url); const modules = new Map();
function load(file) {
  if (modules.has(file)) return modules.get(file).exports;
  const output = { exports: {} }; modules.set(file, output);
  const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  runInNewContext(`(function(require,module,exports){${code}\n})`, { Date })((specifier) => specifier.startsWith(".") ? load(resolve(dirname(file), specifier+".ts")) : require(specifier),output,output.exports);
  return output.exports;
}
const source = load(resolve("src/data/siteData.ts"));
// Explicit public allowlist: student result fixtures and private records are excluded.
export const defaults = Object.fromEntries(["availableClasses","sampleRoutines","sampleExamRoutines","eventListTableData","holidayListTableData","vacancyListTableData","sampleGalleryPhotos","sampleGalleryVideos","sampleBlogPosts"].map((name) => [name,source[name]]));
