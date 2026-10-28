import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "ব্লগ ও সমকালীন প্রবন্ধ (Blog Posts)",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "সার্চের শিরোনাম (Search title)", type: "string" }),
    defineField({ name: "seoDescription", title: "সার্চের পরিচিতি (Search description)", type: "text", rows: 3 }),
    defineField({ name: "seoImage", title: "শেয়ার করার ছবি (Sharing image)", type: "image", options: { hotspot: true } }),
    defineField({ name: "noIndex", title: "সার্চে দেখাবেন না (Hide from search)", type: "boolean", initialValue: false }),
    defineField({ name: "migrationKey", title: "স্থানান্তর পরিচিতি", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "legacyId", title: "আগের লিংকের পরিচিতি", type: "number", hidden: true, readOnly: true }),
    defineField({
      name: "title",
      title: "ব্লগের শিরোনাম (Title)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "ইউআরএল স্লাগ (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "ক্যাটাগরি / বিভাগ (Category)",
      type: "string",
      options: {
        list: [
          { title: "শিক্ষা ও তারবিয়াত", value: "শিক্ষা" },
          { title: "অভিভাবকত্ব", value: "অভিভাবকত্ব" },
          { title: "স্বাস্থ্য ও সচেতনতা", value: "স্বাস্থ্য ও সচেতনতা" },
          { title: "দ্বীনি শিক্ষা ও নসিহত", value: "দ্বীনি শিক্ষা" },
          { title: "হিফজুল কুরআন", value: "হিফজুল কুরআন" },
          { title: "পাঠ্যক্রম ও সিলেবাস", value: "পাঠ্যক্রম" },
        ],
      },
      initialValue: "দ্বীনি শিক্ষা",
    }),
    defineField({
      name: "author",
      title: "লেখক / অবদানকারী (Author)",
      type: "string",
      initialValue: "মুহাদ্দিস ও শিক্ষক পরিষদ",
    }),
    defineField({
      name: "date",
      title: "প্রকাশের তারিখ (Display Date)",
      type: "string",
      description: "যেমন: ২৮ অক্টোবর ২০২৪",
    }),
    defineField({
      name: "readTime",
      title: "পড়ার আনুমানিক সময় (Reading Time)",
      type: "string",
      initialValue: "৪ মিনিট পাঠ",
    }),
    defineField({
      name: "thumbnail",
      title: "ফিচার ছবি (Featured Image)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "thumbnailUrl",
      title: "ছবির বিকল্প ইউআরএল (Image URL Fallback)",
      type: "url",
      description: "সরাসরি ইমেজ লিংক (Unsplash বা পাবলিক লিংক) দিতে পারেন।",
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http"] }),
    }),
    defineField({
      name: "excerpt",
      title: "সংক্ষিপ্ত সারসংক্ষেপ (Excerpt)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "মূল প্রবন্ধ / বিষয়বস্তু (Content)",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "likesCount",
      title: "প্রাথমিক লাইক সংখ্যা (Likes Count)",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "commentsCount",
      title: "মন্তব্য সংখ্যা (Comments Count)",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "publishedAt",
      title: "প্রকাশের সময় (Published At)",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "thumbnail",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `লেখক: ${author}` };
    },
  },
});

