import { defineField, defineType } from "sanity";

export const noticeType = defineType({
  name: "notice",
  title: "নোটিশ ও প্রজ্ঞাপন (Notices)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "নোটিশের শিরোনাম (Title)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "ওয়েব লিংক স্ল্যাগ (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "memo",
      title: "স্মারক নম্বর (Memo No)",
      type: "string",
      description: "যেমন: জামিয়া/প্রশা-ভর্তি/২০২৬/১১৮",
    }),
    defineField({
      name: "category",
      title: "ক্যাটাগরি (Category)",
      type: "string",
      options: {
        list: [
          { title: "ভর্তি সংক্রান্ত (Admission)", value: "admission" },
          { title: "পরীক্ষা ও ফলাফল (Exam & Results)", value: "exam" },
          { title: "ছুটির নোটিশ (Holiday)", value: "holiday" },
          { title: "ক্লাস ও রুটিন (Routine)", value: "routine" },
          { title: "একাডেমিক (Academic)", value: "academic" },
          { title: "সাধারণ ও প্রশাসনিক (General)", value: "general" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "প্রকাশের তারিখ (Publish Date)",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "publishDateBn",
      title: "বাংলা তারিখ (Bangla Date String)",
      type: "string",
      description: "যেমন: ১৫ অক্টোবর ২০২৬",
    }),
    defineField({
      name: "isUrgent",
      title: "জরুরি নোটিশ ব্যাজ (Is Urgent)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "summary",
      title: "সংক্ষিপ্ত সারসংক্ষেপ (Summary)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "details",
      title: "বিস্তারিত বিবরণ (Full Content)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pdfFile",
      title: "সংযুক্ত অফিসিয়াল PDF ফাইল (PDF Attachment)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "memo",
    },
  },
});

