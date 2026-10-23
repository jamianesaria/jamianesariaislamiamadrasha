// Read-only source proposal generator. It never changes application source or remote content.
// Usage: node scripts/connect-visual-content.mjs --component AboutJamiaSection
// A single component candidate and its seed records are written under .cms-work/content-proposals for review.
import ts from "typescript";
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, relative, basename } from "node:path";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";

const root = process.cwd();
const componentRoutes = JSON.parse(readFileSync("src/content/component-routes.json", "utf8"));
const selected = process.argv[process.argv.indexOf("--component") + 1];
if (!process.argv.includes("--component") || !selected || !/^[A-Za-z][A-Za-z0-9]+$/.test(selected)) throw new Error("Select exactly one component with --component Name.");
const proposal = resolve(".cms-work/content-proposals", selected);
mkdirSync(proposal, { recursive: true });
const require = createRequire(import.meta.url);
const parsed = new Map();
const loaded = new Map();
const documents = new Map();
const fileInfo = new Map();
const changes = [];
const labels = { HomePrimarySection: "হোমপেজ", HeaderBanner: "প্রধান ব্যানার", NavigationBar: "নেভিগেশন মেনু", Footer: "ফুটার", AboutJamiaSection: "জামিয়া পরিচিতি", AcademicsPageSection: "শিক্ষা বিভাগ", HistoryOrganizationSection: "জামিয়ার ইতিহাস", PhysicalInfrastructureSection: "অবকাঠামো", AdmissionInfoSection: "ভর্তি তথ্য", ApplyOnlineForm: "অনলাইন আবেদন ফরম", ContactSection: "যোগাযোগ পাতা", BadriKafilaSection: "বদরি কাফেলা", ClassRoutineSection: "ক্লাস রুটিন পাতা", ExamRoutineSection: "পরীক্ষার রুটিন পাতা", PublicResultsSection: "ফলাফলের পাতা", FacultyAndTeachersSection: "শিক্ষক পরিচিতি", ManagingCommitteeSection: "পরিচালনা পরিষদ", ManagingCommitteeTable: "কমিটির তালিকা", EventListTable: "অনুষ্ঠান", HolidayListTable: "ছুটির তালিকা", VacancyNoticeTable: "নিয়োগ বিজ্ঞপ্তি", MainGallerySection: "মিডিয়া গ্যালারি", PhotoGallerySection: "ফটো গ্যালারি", VideoGallerySection: "ভিডিও গ্যালারি", BlogSection: "ব্লগ", OrphanageSection: "এতিমখানা", HomeNoticeTabs: "হোমপেজ নোটিশ", HomeGalleryFilter: "হোমপেজ গ্যালারি" };
const dataLabels = { homePageContent: "হোমপেজের বিষয়বস্তু", aboutPageData: "জামিয়ার পরিচিতি", academicsPageData: "বিভাগের বিস্তারিত", orphanagePageData: "এতিমখানার পরিচিতি", officialAdmissionData: "ভর্তি নির্দেশিকা ও ফি", navigationItems: "ওয়েবসাইটের মেনু", organizationHistoryData: "ইতিহাস", physicalInfrastructureData: "অবকাঠামোর পরিচিতি", committeeAndFacultyData: "প্রতিষ্ঠানের পরিচিতি ও পরিষদ", availableClasses: "শ্রেণির নাম" };
const skip = new Set(["WebsiteIntro", "HeroVideo", "CustomScrollbar", "TimeDateWidget", "HashScrollHandler", "AgeCalculatorWidget", "VisitorStatsWidget", "AcademicResultSection", "AdmissionResultSection"]);
const privateData = new Set(["sampleAcademicResults", "sampleAdmissionResults"]);
const logic = /^(id|key|_.*|slug|classId|categoryId|categoryKey|category|type|variant|color|icon|iconName|badgeColor|status|value)$/;
function key(path) { let hash = 2166136261; for (let index = 0; index < path.length; index++) hash = Math.imul(hash ^ path.charCodeAt(index), 16777619); return "e" + (hash >>> 0).toString(36); }
function parse(file) { if (!parsed.has(file)) parsed.set(file, ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith("tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS)); return parsed.get(file); }
function loadData(file) {
  if (loaded.has(file)) return loaded.get(file).exports;
  const output = { exports: {} }; loaded.set(file, output);
  const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  runInNewContext(`(function(require,module,exports){${code}\n})`, { Date, console })((specifier) => specifier.startsWith(".") ? loadData(resolve(dirname(file), specifier + ".ts")) : require(specifier), output, output.exports);
  return output.exports;
}
function doc(id, title, route = componentRoutes[selected] || "/") { if (!documents.has(id)) documents.set(id, { _id: id, _type: "pageContent", title, route, entries: [] }); return documents.get(id); }
function addEntry(document, source, value, forcedKind) {
  if (typeof value !== "string" && typeof value !== "number") return;
  if (typeof value === "string" && !value.trim()) return;
  const entryKey = key(source);
  if (document.entries.some((entry) => entry._key === entryKey)) return;
  const kind = forcedKind || (typeof value === "number" ? "number" : /(?:\.(?:png|jpe?g|webp|svg)(?:\?|$)|images\.unsplash\.com)/i.test(value) ? "image" : "text");
  document.entries.push({ _type: "contentEntry", _key: entryKey, source, kind, label: typeof value === "string" ? value.replace(/\s+/g, " ").slice(0, 85) : "সংখ্যা / পরিমাণ", ...(kind === "number" ? { number: value } : kind === "image" ? { imageUrl: value, alt: "" } : { text: value }) });
  return entryKey;
}
function flatten(document, value, prefix = []) {
  if (logic.test(prefix.at(-1) || "")) return;
  if (value && typeof value === "object") for (const [name, child] of Object.entries(value)) flatten(document, child, [...prefix, name]);
  else addEntry(document, prefix.join("."), value);
}
function literal(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map((property) => [property.name.getText().replace(/^["']|["']$/g, ""), literal(property.initializer)]));
  return undefined;
}
function jsxText(raw) {
  const lines = raw.split(/\r\n|\n|\r/); let last = 0;
  for (let index = 0; index < lines.length; index++) if (/[^ \t]/.test(lines[index])) last = index;
  let result = "";
  for (let index = 0; index < lines.length; index++) {
    let line = lines[index].replace(/\t/g, " ");
    if (index) line = line.replace(/^ +/, "");
    if (index !== lines.length - 1) line = line.replace(/ +$/, "");
    if (line) result += line + (index !== last ? " " : "");
  }
  return result;
}
function descendants(node, visitor) { visitor(node); node.forEachChild((child) => descendants(child, visitor)); }
function dependency(file, specifier) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return null;
  const base = specifier.startsWith("@/") ? resolve("src", specifier.slice(2)) : resolve(dirname(file), specifier);
  return [base + ".tsx", base + ".ts", base + "/index.tsx", base + "/index.ts"].find(existsSync) || null;
}
const files = readdirSync("src/components").filter((file) => file === selected + ".tsx" && !skip.has(basename(file, ".tsx"))).map((file) => resolve("src/components", file));
for (const file of files) {
  const source = readFileSync(file, "utf8");
  if (source.includes('from "@/content/')) throw new Error("Already connected: " + relative(root, file));
  const ast = parse(file); const name = basename(file, ".tsx");
  const client = /^\s*["']use client["']/.test(source);
  const uiId = "copy.ui." + name;
  const ui = doc(uiId, labels[name] || name.replace(/([a-z])([A-Z])/g, "$1 $2"));
  const edits = []; const imports = new Set(); const dataImports = [];
  const edit = (start, end, value) => edits.push({ start, end, value });
  for (const statement of ast.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const specifier = statement.moduleSpecifier.text;
    if (specifier === "next/image") { edit(statement.getStart(ast), statement.end, ""); imports.add("EditableImage as Image"); }
    if (!specifier.startsWith("@/data/")) continue;
    const dataFile = dependency(file, specifier); if (!dataFile) continue;
    const values = loadData(dataFile);
    const named = statement.importClause?.namedBindings;
    if (!named || !ts.isNamedImports(named)) continue;
    for (const element of named.elements) {
      const exported = element.propertyName?.text || element.name.text;
      const local = element.name.text;
      if (element.isTypeOnly || !(exported in values) || privateData.has(exported)) continue;
      const dataId = exported === "siteSettings" ? "siteSettings" : "copy.data." + exported;
      if (exported !== "siteSettings") flatten(doc(dataId, dataLabels[exported] || ui.title), values[exported]);
      edit(element.getStart(ast), element.end, `${exported} as _fallback_${local}`);
      dataImports.push({ local, dataId, fallback: `_fallback_${local}` });
    }
  }
  // Preserve module-level types and helper fallbacks, then shadow within each real React component.
  if (dataImports.length) {
    const end = ast.statements.filter(ts.isImportDeclaration).at(-1)?.end || 0;
    const bodies = [];
    descendants(ast, (node) => {
      const name = ts.isFunctionDeclaration(node) ? node.name?.text : (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name) ? node.parent.name.text : "";
      if (name && /^[A-Z]/.test(name) && node.body && ts.isBlock(node.body)) bodies.push(node.body);
    });
    const moduleBindings = dataImports.filter((item) => {
      let needed = false;
      descendants(ast, (node) => {
        if (!ts.isIdentifier(node) || node.text !== item.local || bodies.some((body) => node.pos > body.pos && node.end <= body.end)) return;
        let parent = node.parent; while (parent && !ts.isImportDeclaration(parent)) parent = parent.parent;
        if (!parent) needed = true;
      });
      return needed;
    });
    if (moduleBindings.length) edit(end, end, "\n" + moduleBindings.map((item) => `const ${item.local} = ${item.fallback};`).join("\n") + "\n");
  }
  descendants(ast, (node) => {
    if (ts.isJsxText(node)) {
      const value = jsxText(node.text);
      if (!value.trim()) return;
      const entry = addEntry(ui, "text:" + node.pos, value);
      imports.add("EditableText");
      edit(node.pos, node.end, `<EditableText document=${JSON.stringify(uiId)} entry=${JSON.stringify(entry)} fallback={${JSON.stringify(value)}} />`);
    }
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(ast) === "Image") {
      const id = "image:" + node.pos;
      const src = node.attributes.properties.find((attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText(ast) === "src");
      const fallback = src?.initializer && ts.isStringLiteral(src.initializer) ? src.initializer.text : "";
      // A dynamic fallback remains in code; replacement is stored here only when staff choose a new image.
      const entry = key(id);
      if (fallback) addEntry(ui, id, fallback, "image");
      else ui.entries.push({ _type: "contentEntry", _key: entry, source: id, kind: "image", label: "ছবি পরিবর্তন করুন", imageUrl: "", alt: "" });
      let mapping = "";
      if (src?.initializer && ts.isJsxExpression(src.initializer) && src.initializer.expression) {
        let property;
        descendants(src.initializer.expression, (child) => { if (!property && ts.isPropertyAccessExpression(child)) property = child; });
        if (property) { mapping = ` source={fieldSource(${property.expression.getText(ast)}, ${JSON.stringify(property.name.text)})}`; }
      }
      edit(node.tagName.end, node.tagName.end, ` document=${JSON.stringify(uiId)} entry=${JSON.stringify(entry)}${mapping}`);
      if (mapping) imports.add("fieldSource");
    }
    const declaration = ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node);
    if (!declaration || !node.body || !ts.isBlock(node.body)) return;
    const functionName = ts.isFunctionDeclaration(node) ? node.name?.text : ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name) ? node.parent.name.text : "";
    if (!functionName || !/^[A-Z]/.test(functionName)) return;
    const body = node.body;
    const bodyText = body.getText(ast);
    const bindings = dataImports.filter((item) => new RegExp(`\\b${item.local}\\b`).test(bodyText));
    if (bindings.length) {
      imports.add(client ? "useEditableData" : "getEditableData");
      edit(body.getStart(ast) + 1, body.getStart(ast) + 1, "\n" + bindings.map((item) => `  const ${item.local} = ${client ? "useEditableData" : "await getEditableData"}(${JSON.stringify(item.dataId)}, ${item.fallback});`).join("\n") + "\n");
    }
    let hasLocalData = false;
    for (const statement of body.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const variable of statement.declarationList.declarations) {
        if (!ts.isIdentifier(variable.name) || !variable.initializer || !/^[a-z]/.test(variable.name.text) || /color|style|gradient|digit|letter|regex|bounds|rect|motion/i.test(variable.name.text)) continue;
        if (!ts.isArrayLiteralExpression(variable.initializer) && !ts.isObjectLiteralExpression(variable.initializer)) continue;
        const value = literal(variable.initializer);
        const before = ui.entries.length;
        flatten(ui, value, ["local", variable.name.text]);
        if (ui.entries.length === before) continue;
        hasLocalData = true; imports.add(client ? "useEditableData" : "getEditableData");
        edit(variable.initializer.getStart(ast), variable.initializer.end, `${client ? "useEditableData" : "await getEditableData"}(${JSON.stringify(uiId)}, ${variable.initializer.getText(ast)}, ${JSON.stringify(["local", variable.name.text])})`);
      }
    }
    if (!client && (bindings.length || hasLocalData) && !node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword)) edit(node.getStart(ast) + (source.slice(node.getStart(ast), node.body.pos).startsWith("export default ") ? "export default ".length : source.slice(node.getStart(ast), node.body.pos).startsWith("export ") ? "export ".length : 0), node.getStart(ast) + (source.slice(node.getStart(ast), node.body.pos).startsWith("export default ") ? "export default ".length : source.slice(node.getStart(ast), node.body.pos).startsWith("export ") ? "export ".length : 0), "async ");
  });
  if (!imports.size && !dataImports.length) continue;
  const names = [...imports].filter((item) => item !== "fieldSource");
  const importText = (names.length ? `\nimport { ${names.join(", ")} } from "@/content/${client ? "client" : "server"}";\n` : "") + (imports.has("fieldSource") ? 'import { fieldSource } from "@/content/model";\n' : "");
  const importEnd = ast.statements.filter(ts.isImportDeclaration).at(-1)?.end || 0;
  edit(importEnd, importEnd, importText);
  const backup = resolve(".cms-work/content-originals", relative(root, file)); mkdirSync(dirname(backup), { recursive: true }); writeFileSync(backup, source);
  let result = source;
  for (const change of edits.sort((a, b) => b.start - a.start || b.end - a.end)) result = result.slice(0, change.start) + change.value + result.slice(change.end);
  writeFileSync(resolve(proposal, "component.tsx"), result);
  fileInfo.set(file, { client, uiId, dataIds: dataImports.filter((item) => item.dataId !== "siteSettings").map((item) => item.dataId) });
  changes.push({ file: relative(root, file).replaceAll("\\", "/"), client, textFields: ui.entries.filter((entry) => entry.kind === "text").length, images: ui.entries.filter((entry) => entry.kind === "image").length });
}
writeFileSync(resolve(proposal,"seeds.json"),JSON.stringify([...documents.values()].filter(document=>document.entries.length),null,2)+"\n");
writeFileSync(resolve(proposal,"manifest.json"),JSON.stringify({component:selected,source:"src/components/"+selected+".tsx",candidate:relative(root,resolve(proposal,"component.tsx")),changes,fileInfo:[...fileInfo].map(([file,info])=>({file:relative(root,file),...info}))},null,2)+"\n");
console.log(JSON.stringify({component:selected,candidate:relative(root,resolve(proposal,"component.tsx")),documents:documents.size,entries:[...documents.values()].reduce((sum,document)=>sum+document.entries.length,0),sourceFilesChanged:0}));
