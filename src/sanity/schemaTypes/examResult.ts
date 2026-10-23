import { defineField, defineType } from "sanity";
import { availableClasses } from "@/data/siteData";

export const examResultType = defineType({
  name: "examResult",
  title: "পরীক্ষার ফলাফল ও মেধা তালিকা (Exam Results & Merit Lists)",
  type: "document",
  description: "এখানে কেবল প্রকাশের অনুমোদনপ্রাপ্ত ফলাফলের বিজ্ঞপ্তি ও পাবলিক তালিকা দিন। ব্যক্তিগত শিক্ষার্থী রেকর্ড ইনবক্সের সুরক্ষিত ব্যবস্থার বাইরে প্রকাশ করবেন না।",
  fields: [
    defineField({ name: "classId", title: "ফলাফলের শ্রেণি", type: "string", options: { list: availableClasses.map((item) => ({ title: item.name, value: item.id })) } }),
    defineField({
      name: "title",
      title: "ফলাফলের শিরোনাম",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: বার্ষিক পরীক্ষা ২০২৬ — নূরানী ১ম জামাত মেধা তালিকা",
    }),
    defineField({
      name: "academicYear",
      title: "শিক্ষাবর্ষ (Year)",
      type: "string",
      initialValue: "২০২৬",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "examTerm",
      title: "পরীক্ষার ধরন",
      type: "string",
      options: {
        list: [
          { title: "বার্ষিক পরীক্ষা (Annual)", value: "annual" },
          { title: "অর্ধ-বার্ষিক পরীক্ষা (Half-Yearly)", value: "half-yearly" },
          { title: "ভর্তি পরীক্ষা (Admission Test)", value: "admission" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "className",
      title: "শ্রেণি / বিভাগ",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPublished",
      hidden: true,
      title: "ওয়েবসাইটে প্রকাশ করুন (Publish to Web)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "meritListPdf",
      title: "অনুমোদিত পাবলিক ফলাফলের PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "summaryNotes",
      title: "পরীক্ষা নিয়ন্ত্রকের মন্তব্য ও পাসের হার",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "className",
    },
  },
});

