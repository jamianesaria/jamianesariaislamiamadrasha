import test from "node:test";
import assert from "node:assert/strict";
import { normalizePageLinks, primaryPageLinks, defaultRelatedLinks } from "../src/data/seoData.ts";

test("missing navigation uses defaults without mutating them; an empty list stays empty", () => {
  const snapshot = JSON.stringify(primaryPageLinks);
  assert.deepEqual(normalizePageLinks(undefined, primaryPageLinks), primaryPageLinks);
  assert.deepEqual(normalizePageLinks([], primaryPageLinks), []);
  assert.equal(JSON.stringify(primaryPageLinks), snapshot);
});
test("public links reject private, external, fragment and filtered destinations", () => {
  const forbidden = ["javascript:alert(1)", "https://example.com", "//example.com", "/api/apply", "/studio", "/notices?id=private", "/about#history", "/missing"];
  assert.deepEqual(normalizePageLinks(forbidden.map((href) => ({ href, label: "test" })), primaryPageLinks), []);
});
test("deduplicates destinations and omits the current page", () => {
  const links = normalizePageLinks([{ href: "/about", label: "About" }, { href: "/contact", label: "Contact" }, { href: "/contact", label: "Duplicate" }], [], "/about");
  assert.deepEqual(links.map((link) => link.href), ["/contact"]);
});
test("missing labels get meaningful defaults and invalid annotation keys are replaced", () => {
  const links = normalizePageLinks([{ href: "/admission", label: "", _key: 'bad"]' }], []);
  assert.equal(links[0].label, primaryPageLinks[0].label);
  assert.equal(links[0]._key, "admission");
  assert.ok(defaultRelatedLinks("/admission").some((link) => link.href === "/apply"));
});
