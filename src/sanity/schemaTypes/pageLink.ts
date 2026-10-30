import { defineField, defineType } from "sanity";
import { seoRoutes } from "../../data/seoData";

export const pageLinkType = defineType({
  name: "publicPageLink", title: "ওয়েব পাতার লিংক (Public page link)", type: "object",
  fields: [
    defineField({ name: "label", title: "লিংকের নাম (Link label)", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", title: "গন্তব্য পাতা (Destination page)", type: "string", options: { list: Object.entries(seoRoutes).map(([value, page]) => ({ title: `${page.label} (${value})`, value })) }, validation: (rule) => rule.required().custom((value) => !value || Object.hasOwn(seoRoutes, value) || "তালিকা থেকে একটি প্রকাশ্য পাতা বেছে নিন। (Choose a public page from the list.)") }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
