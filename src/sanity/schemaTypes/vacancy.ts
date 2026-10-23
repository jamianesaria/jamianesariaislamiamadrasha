import { defineField, defineType } from "sanity";

export const vacancyType = defineType({ name: "vacancy", title: "নিয়োগ বিজ্ঞপ্তি (Vacancies)", type: "document", fields: [
  defineField({ name: "title", title: "পদের নাম", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "department", title: "বিভাগ", type: "string" }),
  defineField({ name: "qualification", title: "যোগ্যতা ও অভিজ্ঞতা", type: "text" }),
  defineField({ name: "salary", title: "বেতন ও সুবিধা", type: "text" }),
  defineField({ name: "postedAt", title: "বিজ্ঞপ্তি প্রকাশের তারিখ", type: "date", initialValue: () => new Date().toISOString().slice(0,10) }),
  defineField({ name: "postingDateText", title: "আগের প্রদর্শনের তারিখ", type: "string", hidden: true }),
  defineField({ name: "deadlineText", title: "আগের প্রদর্শনের শেষ তারিখ", type: "string", hidden: true }),
  defineField({ name: "migrationKey", title: "স্থানান্তর পরিচিতি", type: "string", hidden: true, readOnly: true }),
  defineField({ name: "deadline", title: "আবেদনের শেষ তারিখ", type: "date", validation: (rule) => rule.required() }),
  defineField({ name: "vacancies", title: "শূন্য পদ", type: "string" }),
  defineField({ name: "pdfFile", title: "নিয়োগ বিজ্ঞপ্তি PDF", type: "file", options: { accept: ".pdf" } }),
], preview: { select: { title: "title", subtitle: "deadline" } } });
