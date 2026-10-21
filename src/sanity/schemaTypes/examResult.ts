import { defineField, defineType } from "sanity";

export const examResultType = defineType({
  name: "examResult",
  title: "পরীক্ষার ফলাফল ও মেধা তালিকা (Exam Results & Merit Lists)",
  type: "document",
  fields: [
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
      title: "ওয়েবসাইটে প্রকাশ করুন (Publish to Web)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "meritListPdf",
      title: "অফিসিয়াল মেধা তালিকা ও মার্কশিট PDF",
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

