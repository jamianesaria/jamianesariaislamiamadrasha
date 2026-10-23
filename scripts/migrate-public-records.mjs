// Safe additive migration. No existing content is replaced or deleted.
import { defaults } from "./public-defaults.mjs";
import env from "@next/env";
import { createClient } from "@sanity/client";
env.loadEnvConfig(process.cwd());
const apply = process.argv.includes("--apply");
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-03-01", useCdn: false, token: process.env.SANITY_API_TOKEN });
const iso = (value) => { const date = new Date(value.replace(/ - /g," ")); if (Number.isNaN(date.getTime())) throw new Error("Invalid original public date"); return date.toISOString().slice(0,10); };
const rows = (items) => items.map((row, index) => ({ ...row, _key: `row${index}`, _type: "routineDay" }));
const records = [
  ...defaults.sampleBlogPosts.map(({id,slug,thumbnail,...item}) => ({ ...item, _type: "blogPost", migrationKey: `original-blog-${id}`, legacyId: id, slug: { _type: "slug", current: slug }, thumbnailUrl: thumbnail, publishedAt: new Date(Date.now() - id * 1000).toISOString() })),
  ...defaults.eventListTableData.map((item) => ({ _type: "calendarEvent", migrationKey: `original-event-${item.id}`, kind: "event", title: item.eventName, date: iso(item.dateTime), dateBn: item.dateTime, location: item.venue, description: item.description, imageUrl: item.photo })),
  ...defaults.holidayListTableData.map((item) => ({ _type: "calendarEvent", migrationKey: `original-holiday-${item.id}`, kind: "holiday", title: item.title, date: iso(item.dateTime.split(" To ")[0]), endDate: iso(item.dateTime.split(" To ")[1]), dateBn: item.dateTime, description: item.description })),
  ...defaults.vacancyListTableData.map((item) => ({ _type: "vacancy", migrationKey: `original-vacancy-${item.id}`, title: item.postName, postedAt: iso(item.postingDate), deadline: iso(item.dateline), qualification: item.requirements, salary: item.salary })),
  ...defaults.sampleGalleryPhotos.map(({id,imageUrl,description,...item}) => ({ ...item, _type: "galleryPhoto", migrationKey: `original-photo-${id}`, imageUrl, caption: description, displayOrder: id })),
  ...defaults.sampleGalleryVideos.map(({id,thumbnail,...item}) => ({ ...item, _type: "galleryVideo", migrationKey: `original-video-${id}`, thumbnailUrl: thumbnail, displayOrder: id })),
  ...Object.entries(defaults.sampleRoutines).map(([classId,items]) => ({ _type: "classRoutine", migrationKey: `original-class-${classId}`, title: defaults.availableClasses.find((item) => item.id===classId).name + " — ক্লাস রুটিন", classId, className: defaults.availableClasses.find((item)=>item.id===classId).name, academicYear: "2024", timetableRows: rows(items) })),
  ...Object.entries(defaults.sampleExamRoutines).map(([classId,items]) => ({ _type: "examRoutine", migrationKey: `original-exam-${classId}`, title: defaults.availableClasses.find((item)=>item.id===classId).name + " — পরীক্ষা রুটিন", classId, className: defaults.availableClasses.find((item)=>item.id===classId).name, examTerm: "বার্ষিক পরীক্ষা", academicYear: "2024", examRows: rows(items).map((row)=>({...row,_type:"examRow"})) })),
];
for (const record of records) {
  const exists = await client.fetch('count(*[_type==$type && (migrationKey==$key || title==$title || ($classId!="" && classId==$classId))])', { type: record._type, key: record.migrationKey, title: record.title, classId: record.classId || "" });
  if (!exists && apply) await client.create(record);
  console.log(JSON.stringify({ type: record._type, key: record.migrationKey, action: exists ? "preserved" : apply ? "created" : "would-create" }));
}
// Attach only a missing class selector to the two known legacy records; their schedules stay untouched.
for (const [id,classId] of [["class-routine-class-1","class-1"],["exam-routine-annual-2026","all"]]) {
  const existing = await client.getDocument(id);
  if (existing && !existing.classId && apply) await client.patch(id).ifRevisionId(existing._rev).setIfMissing({ classId }).commit();
}
