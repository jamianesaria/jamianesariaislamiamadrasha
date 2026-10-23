import { defineField, defineType } from "sanity";

export const calendarEventType = defineType({ name: "calendarEvent", title: "অনুষ্ঠান ও ছুটি (Calendar)", type: "document", fields: [
  defineField({ name: "title", title: "শিরোনাম", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "kind", title: "ধরন", type: "string", initialValue: "event", options: { list: [{ title: "অনুষ্ঠান", value: "event" }, { title: "ছুটি", value: "holiday" }] }, validation: (rule) => rule.required() }),
  defineField({ name: "date", title: "শুরুর তারিখ", type: "date", validation: (rule) => rule.required() }),
  defineField({ name: "endDate", title: "শেষ তারিখ", type: "date", validation: (rule) => rule.min(rule.valueOfField("date")) }),
  defineField({ name: "dateBn", title: "প্রদর্শনের বাংলা তারিখ", type: "string" }),
  defineField({ name: "location", title: "স্থান", type: "string" }),
  defineField({ name: "image", title: "অনুষ্ঠানের ছবি", type: "image", options: { hotspot: true } }),
  defineField({ name: "imageUrl", title: "আগের ছবির ঠিকানা", type: "string", hidden: true }),
  defineField({ name: "migrationKey", title: "স্থানান্তর পরিচিতি", type: "string", hidden: true, readOnly: true }),
  defineField({ name: "description", title: "বিবরণ", type: "text", rows: 4 }),
  defineField({ name: "pdfFile", title: "সংযুক্ত বিজ্ঞপ্তি", type: "file", options: { accept: ".pdf" } }),
], preview: { select: { title: "title", subtitle: "date" } } });
