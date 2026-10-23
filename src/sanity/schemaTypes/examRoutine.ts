import { defineField, defineType } from "sanity";
import { availableClasses } from "@/data/siteData";

export const examRoutineType = defineType({
  name: "examRoutine",
  title: "পরীক্ষার রুটিন (Exam Routines)",
  type: "document",
  fields: [
    defineField({ name: "migrationKey", title: "স্থানান্তর পরিচিতি", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "classId", title: "ওয়েবসাইটের শ্রেণি নির্বাচন", type: "string", options: { list: [{ title: "সকল শ্রেণি", value: "all" }, ...availableClasses.map((item) => ({ title: item.name, value: item.id }))] }, validation: (rule) => rule.required() }),
    defineField({
      name: "title",
      title: "পরীক্ষার রুটিনের শিরোনাম",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: বার্ষিক পরীক্ষা রুটিন ২০২৬ - নূরানী ও কিতাব বিভাগ",
    }),
    defineField({
      name: "examTerm",
      title: "পরীক্ষার নাম / সেশন",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: বার্ষিক পরীক্ষা, অর্ধ-বার্ষিক পরীক্ষা, ১ম সাময়িক পরীক্ষা",
    }),
    defineField({
      name: "academicYear",
      title: "শিক্ষাবর্ষ (Year)",
      type: "string",
      initialValue: "২০২৬",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "className",
      title: "শ্রেণি / বিভাগ",
      type: "string",
      description: "যেমন: নূরানী ১ম জামাত, হিফজ নাজেরা, দাওরায়ে হাদিস",
    }),
    defineField({
      name: "examRows",
      title: "তারিখভিত্তিক পরীক্ষার সময়সূচি (Exam Schedule Rows)",
      type: "array",
      of: [
        {
          type: "object", name: "examRow",
          fields: [
            { name: "date", title: "তারিখ", type: "string" },
            { name: "day", title: "বার", type: "string" },
            { name: "subject", title: "বিষয়", type: "string" },
            { name: "time", title: "সময়", type: "string" },
            { name: "room", title: "পরীক্ষার কক্ষ", type: "string" },
          ],
          preview: {
            select: {
              title: "subject",
              subtitle: "date",
            },
          },
        },
      ],
    }),
    defineField({
      name: "instructions",
      title: "পরীক্ষার্থীদের জন্য সাধারণ নির্দেশনাবলী",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "pdfFile",
      title: "অফিসিয়াল পরীক্ষা রুটিন PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "examTerm",
    },
  },
});

