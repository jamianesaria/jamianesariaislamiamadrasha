import { defineArrayMember, defineField, defineType } from "sanity";

export const pageContentType = defineType({
  name: "pageContent", title: "পাতার বিষয়বস্তু (Page content)", type: "document",
  fields: [
    defineField({ name: "title", title: "পাতা / অংশের নাম", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "route", title: "ওয়েবসাইটের ঠিকানা", type: "string", readOnly: true }),
    defineField({ name: "seoTitle", title: "সার্চে পাতার শিরোনাম", type: "string" }),
    defineField({ name: "seoDescription", title: "সার্চে পাতার পরিচিতি", type: "text", rows: 3 }),
    defineField({ name: "entries", title: "লেখা, ছবি ও লিংক", description: "ওয়েবসাইট সম্পাদনা থেকে সরাসরি বিষয়বস্তুতে ক্লিক করে সঠিক ঘরটি খুলুন।", type: "array", of: [defineArrayMember({ type: "object", name: "contentEntry", fields: [
      defineField({ name: "label", title: "বিষয়বস্তুর পরিচিতি", type: "string", readOnly: true }),
      defineField({ name: "source", title: "সংযোগ পরিচিতি", type: "string", hidden: true, readOnly: true }),
      defineField({ name: "kind", title: "ধরন", type: "string", hidden: true, readOnly: true }),
      defineField({ name: "text", title: "লেখা", type: "text", rows: 4, hidden: ({ parent }) => parent?.kind === "image" || parent?.kind === "number" }),
      defineField({ name: "number", title: "সংখ্যা / পরিমাণ", type: "number", hidden: ({ parent }) => parent?.kind !== "number" }),
      defineField({ name: "image", title: "ছবি পরিবর্তন করুন", type: "image", options: { hotspot: true }, hidden: ({ parent }) => parent?.kind !== "image" }),
      defineField({ name: "imageUrl", title: "বর্তমান ছবির লিংক", type: "url", hidden: ({ parent }) => parent?.kind !== "image", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["https"] }) }),
      defineField({ name: "alt", title: "ছবির বিবরণ", type: "string", hidden: ({ parent }) => parent?.kind !== "image" }),
    ], preview: { select: { title: "label", subtitle: "text", media: "image" } } })] }),
  ], preview: { select: { title: "title", subtitle: "route" } },
});
