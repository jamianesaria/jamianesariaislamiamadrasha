import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { randomUUID } from "node:crypto";
import ts from "typescript";
import env from "@next/env";
import { createClient } from "@sanity/client";
import { stegaClean } from "@sanity/client/stega";
env.loadEnvConfig(process.cwd());
const require = createRequire(import.meta.url);
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const model = { exports: {} };
const code = ts.transpileModule(readFileSync("src/content/model.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
runInNewContext(`(function(require,module,exports){${code}\n})`, { WeakMap, Object, Array, Date, String, Math })((specifier) => specifier === "@/sanity/env" ? { projectId, dataset } : require(specifier), model, model.exports);
const { contentKey, mappedData, fieldSource, imageProps, annotation } = model.exports;
const fallback = { paragraph: "একটি শব্দ, একটি বাক্য।", items: [{ title: "একই নাম", image: "/first.jpg" }, { title: "একই নাম", image: "/second.jpg" }], count: 12, id: "stable-id" };
const entries = [
  { _key: contentKey("paragraph"), source: "paragraph", kind: "text", text: "একটি শব্দ; একটি বাক্য।" },
  { _key: contentKey("items.1.title"), source: "items.1.title", kind: "text", text: "দ্বিতীয়টির নতুন নাম" },
  { _key: contentKey("items.1.image"), source: "items.1.image", kind: "image", imageUrl: "/replacement.jpg" },
  { _key: contentKey("count"), source: "count", kind: "number", number: 0 },
];
const state = { preview: true, documents: { "copy.data.qa": { _id: "copy.data.qa", entries } } };
const mapped = mappedData(state, "copy.data.qa", fallback);
assert.equal(mapped.paragraph, "একটি শব্দ; একটি বাক্য।"); assert.equal(fallback.paragraph, "একটি শব্দ, একটি বাক্য।");
assert.equal(mapped.items[0].title, "একই নাম"); assert.equal(mapped.items[1].title, "দ্বিতীয়টির নতুন নাম"); assert.equal(mapped.count, 0); assert.equal(mapped.id, fallback.id);
const source = fieldSource(mapped.items[1], "image");
assert.equal(source.key, contentKey("items.1.image"));
assert.equal(imageProps(state, { src: "/second.jpg", alt: "ছবি", width: 100, height: 100, source }).src, "/replacement.jpg");
assert.ok(annotation(state, source)); assert.equal(annotation({ ...state, preview: false }, source), undefined);
console.log("Single punctuation edits, repeated-item identity, image replacement, zero values, unchanged fallbacks and preview-only annotations passed");
const client = createClient({ projectId, dataset, apiVersion: "2026-03-01", token: process.env.SANITY_API_TOKEN, useCdn: false, stega: { enabled: false, studioUrl: "/studio" } });
const id = "qa-copy-" + randomUUID(); const draftId = "drafts." + id;
try {
  const document = { _id: id, _type: "pageContent", title: "Visual QA", route: "/about", entries: [{ _type: "contentEntry", _key: "paragraph", source: "paragraph", kind: "text", text: "একটি শব্দ, একটি বাক্য।" }] };
  await client.create(document); await client.create({ ...document, _id: draftId, entries: [{ ...document.entries[0], text: "একটি শব্দ; একটি বাক্য।" }] });
  const query = '*[_id==$id][0]{_id,entries[]{_key,text}}';
  const published = await client.fetch(query, { id }, { perspective: "published", stega: false });
  const preview = await client.fetch(query, { id }, { perspective: "drafts", stega: true, resultSourceMap: "withKeyArraySelector", filterResponse: false });
  assert.equal(published.entries[0].text, "একটি শব্দ, একটি বাক্য।");
  assert.equal(stegaClean(preview.result.entries[0].text), "একটি শব্দ; একটি বাক্য।");
  assert.ok(preview.result.entries[0].text.length > stegaClean(preview.result.entries[0].text).length);
  assert.ok(preview.resultSourceMap.documents.some((record) => record._id.includes(id)));
  assert.ok(JSON.stringify(preview.resultSourceMap.paths).includes("paragraph"));
  console.log("Real Sanity draft keeps the exact punctuation change private and supplies the field's keyed source map");
} finally { await client.delete(draftId); await client.delete(id); console.log("Only the two visual QA documents were removed."); }
