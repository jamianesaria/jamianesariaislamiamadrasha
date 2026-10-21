import assert from "node:assert/strict";
import { test } from "node:test";
import { mapAcademicDepartments } from "../src/sanity/lib/departments.ts";

test("duplicate slugs return one department with its source document identity", () => {
  const departments = mapAcademicDepartments([
    { _id: "new-maktab", slug: "maktab", title: "Updated department" },
    { _id: "old-maktab", slug: "maktab", title: "Older department" },
    { _id: "hifz", slug: "hifz", title: "Hifz" },
  ]);
  assert.equal(departments.length, 2);
  assert.deepEqual(departments.map((item) => item.id), ["maktab", "hifz"]);
  assert.equal(departments[0]._id, "new-maktab");
  assert.equal(departments[0].name, "Updated department");
});

test("missing slugs use unique document IDs", () => {
  const departments = mapAcademicDepartments([
    { _id: "no-slug-a", title: "Department A" },
    { _id: "no-slug-b", title: "Department B", slug: "" },
  ]);
  assert.deepEqual(departments.map((item) => item.id), ["no-slug-a", "no-slug-b"]);
});

test("CMS text, punctuation, and uploaded images pass through unchanged", () => {
  const [department] = mapAcademicDepartments([
    { _id: "edited", slug: "kitab", title: "Edited title", overview: "Edited paragraph, punctuation.", badge: "Edited badge", imageUrl: "https://cdn.sanity.io/custom.jpg" },
  ]);
  assert.equal(department.name, "Edited title");
  assert.equal(department.overview, "Edited paragraph, punctuation.");
  assert.equal(department.badge, "Edited badge");
  assert.equal(department.imageUrl, "https://cdn.sanity.io/custom.jpg");
});

test("empty CMS data preserves the existing empty-array fallback contract", () => {
  assert.deepEqual(mapAcademicDepartments([]), []);
});

test("mapping does not mutate or delete source records", () => {
  const records = [
    { _id: "new", slug: "maktab" },
    { _id: "old", slug: "maktab" },
  ];
  const before = structuredClone(records);
  mapAcademicDepartments(records);
  assert.deepEqual(records, before);
});
