import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import ts from "typescript";
const component = process.argv[2];
if (!component || !/^[A-Za-z][A-Za-z0-9]+$/.test(component)) throw new Error("Choose one component.");
const parse = (path) => ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const backup = `.cms-work/content-originals/src/components/${component}.tsx`;
const original = parse(existsSync(backup) ? backup : `src/components/${component}.tsx`);
const candidate = parse(`.cms-work/content-proposals/${component}/component.tsx`);
const clean = (text) => text.replace(/<EditableText document="[^"]+" entry="[^"]+" fallback=\{("(?:[^"\\]|\\.)*")\} \/>/g, (_, fallback) => JSON.parse(fallback)).replace(/\s+/g, " ").trim();
function markup(file) {
  const elements = [];
  function visit(node) {
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.tagName.getText(file) !== "EditableText") {
      elements.push({ tag: node.tagName.getText(file), attributes: node.attributes.properties.filter((attribute) => !ts.isJsxAttribute(attribute) || !["document", "entry", "source"].includes(attribute.name.getText(file))).map((attribute) => clean(attribute.getText(file))) });
    }
    node.forEachChild(visit);
  }
  visit(file); return elements;
}
assert.deepEqual(markup(candidate), markup(original), "Public elements, layout classes, attributes, links and interactions must remain identical");
const originalText = []; const candidateText = [];
function scan(file, output, migrated) {
  function visit(node) {
    if (ts.isJsxText(node) && clean(node.text)) output.push(clean(node.text));
    if (migrated && ts.isJsxSelfClosingElement(node) && node.tagName.getText(file) === "EditableText") {
      const fallback = node.attributes.properties.find((attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText(file) === "fallback")?.initializer;
      assert.ok(fallback && ts.isJsxExpression(fallback) && ts.isStringLiteral(fallback.expression));
      output.push(clean(fallback.expression.text));
      return;
    }
    node.forEachChild(visit);
  }
  visit(file);
}
scan(original, originalText, false); scan(candidate, candidateText, true);
assert.deepEqual(candidateText, originalText, "Every original static word and punctuation mark must be retained");
assert.equal(candidate.parseDiagnostics.length, 0, "Candidate TSX must parse without errors");
console.log(`${component}: unchanged public elements/attributes and ${originalText.length} original text fragments verified. Source files were not changed.`);
