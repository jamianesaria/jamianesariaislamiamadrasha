// Build an import-based inventory; never rewrite application components.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import ts from "typescript";
const root = process.cwd();
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(resolve(dir, entry.name)) : [resolve(dir, entry.name)]); }
function dependency(file, specifier) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return;
  const base = specifier.startsWith("@/") ? resolve("src", specifier.slice(2)) : resolve(dirname(file), specifier);
  return [base+".tsx", base+".ts", base+"/index.tsx", base+"/index.ts"].find(existsSync);
}
const inventory = {};
for (const page of files(resolve("src/app")).filter((file) => file.endsWith("page.tsx") && !file.includes("studio"))) {
  const route = "/" + relative(resolve("src/app"), dirname(page)).replaceAll("\\", "/").replace(/^\.$/, "");
  const clients = new Set(); const documents = new Set(); const components = new Set(); const seen = new Set();
  function visit(file, inheritedClient = false) {
    const source = readFileSync(file, "utf8"); const client = inheritedClient || /^\s*["']use client["']/.test(source);
    const identity = `${file}:${client}`; if (seen.has(identity)) return; seen.add(identity);
    if (file.includes(`${resolve("src/components")}`)) components.add(relative(root, file).replaceAll("\\", "/"));
    for (const match of source.matchAll(/["'](copy\.(?:ui|data)\.[A-Za-z][A-Za-z0-9]*)["']/g)) { documents.add(match[1]); if (client) clients.add(match[1]); }
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    for (const statement of ast.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
      const next = dependency(file, statement.moduleSpecifier.text);
      if (next && !next.includes(`${resolve("src/content")}`) && !next.includes(`${resolve("src/sanity")}`) && !next.includes(`${resolve("src/data")}`)) visit(next, client);
    }
  }
  visit(page);
  const source = readFileSync(page, "utf8");
  inventory[route] = { clientDocuments: [...clients].sort(), documents: [...documents].sort(), components: [...components].sort(), redirect: /\b(?:permanentRedirect|redirect)\(/.test(source), context: /editableRoute\(|<EditablePage|import .*Page.*from/.test(source) };
}
writeFileSync("src/content/coverage.json", JSON.stringify(inventory, null, 2)+"\n");
writeFileSync("docs/content-coverage.md", "# Public content inventory\n\nGenerated from actual route imports. Mapping coverage is distinct from authenticated click-through acceptance testing. Technical controls, private form input, and decorative marks are excluded.\n\n| Route | Connected documents | Editing context |\n|---|---:|---|\n" + Object.entries(inventory).map(([route, item]) => `| ${route} | ${item.documents.length} | ${item.redirect ? "Redirect" : item.context ? "Connected" : "Review required"} |`).join("\n") + "\n\nNative records remain in their original Sanity types: notices, departments, teachers, committee, admissions, routines, results, calendars, vacancies and media. Page copy uses keyed fields; clicking punctuation selects its containing text field.\n");
console.log(JSON.stringify({ routes: Object.keys(inventory).length, missingContexts: Object.entries(inventory).filter(([,item]) => !item.context && !item.redirect).map(([route]) => route) }));
