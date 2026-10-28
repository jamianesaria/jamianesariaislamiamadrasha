import { defineField, defineType } from "sanity";
import { seoRoutes } from "../../data/seoData";

export const pageSeoType = defineType({
  name: "pageSeo", title: "পাতার সার্চ ও ব্রেডক্রাম্ব (Page SEO)", type: "document",
  fields: [
    defineField({ name: "route", title: "ওয়েব পাতা (Page)", type: "string", options: { list: Object.entries(seoRoutes).map(([value, page]) => ({ title: `${page.label} · ${value}`, value })) }, validation: (rule) => rule.required().custom(async (value, context) => {
      if (!value) return true;
      const id = context.document?._id.replace(/^drafts\./, "");
      const exists = await context.getClient({ apiVersion: "2026-03-01" }).fetch('count(*[_type=="pageSeo" && route==$route && !(_id in [$id,$draft])])', { route: value, id: id || "", draft: `drafts.${id}` });
      return exists === 0 || "এই পাতার SEO সেটিংস ইতিমধ্যে রয়েছে। (This page already has SEO settings.)";
    }) }),
    defineField({ name: "seoTitle", title: "সার্চের শিরোনাম (Search title)", type: "string", description: "খালি রাখলে পাতার নাম ও প্রতিষ্ঠানের নাম ব্যবহার হবে। (Leave empty for the automatic title.)" }),
    defineField({ name: "seoDescription", title: "সার্চের পরিচিতি (Search description)", type: "text", rows: 3 }),
    defineField({ name: "breadcrumbLabel", title: "ব্রেডক্রাম্বের নাম (Breadcrumb label)", type: "string" }),
    defineField({ name: "pageHeading", title: "প্রধান শিরোনাম (Page heading)", type: "string", description: "সাধারণ তথ্য ও তালিকার পাতার প্রধান শিরোনাম। (Main heading on information and list pages.)" }),
    defineField({ name: "backToBlogLabel", title: "ব্লগে ফেরার লিংক (Back to blog label)", type: "string", hidden: ({ document }) => document?.route !== "/blog" }),
    defineField({ name: "articleAuthorLabel", title: "লেখকের পরিচয় (Author label)", type: "string", hidden: ({ document }) => document?.route !== "/blog" }),
    defineField({ name: "articleDateLabel", title: "প্রকাশের তারিখের পরিচয় (Publication date label)", type: "string", hidden: ({ document }) => document?.route !== "/blog" }),
    defineField({ name: "seoImage", title: "শেয়ার করার ছবি (Sharing image)", type: "image", options: { hotspot: true } }),
    defineField({ name: "noIndex", title: "সার্চে দেখাবেন না (Hide from search)", type: "boolean", initialValue: false, description: "এটি গোপনীয়তার ব্যবস্থা নয়। (This is not access control.)" }),
  ],
  preview: { select: { route: "route", title: "seoTitle" }, prepare({ route, title }) { return { title: title || seoRoutes[route]?.label || "পাতার SEO", subtitle: route }; } },
});
