import { defineField, defineType } from "sanity";
import { availableClasses } from "@/data/siteData";

export const classRoutineType = defineType({
  name: "classRoutine",
  title: "ক্লাস রুটিন (Class Routines)",
  type: "document",
  fields: [
    defineField({ name: "migrationKey", title: "স্থানান্তর পরিচিতি", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "classId", title: "ওয়েবসাইটের শ্রেণি নির্বাচন", type: "string", options: { list: availableClasses.map((item) => ({ title: item.name, value: item.id })) }, validation: (rule) => rule.required() }),
    defineField({
      name: "title",
      title: "রুটিনের শিরোনাম",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: নূরানী ১ম জামাত - দৈনিক ক্লাস রুটিন",
    }),
    defineField({
      name: "className",
      title: "শ্রেণি / জামাত",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: নূরানী ১ম জামাত, হিফজুল কুরআন, মিজান, দাওরায়ে হাদিস",
    }),
    defineField({
      name: "academicYear",
      title: "শিক্ষাবর্ষ (Academic Year)",
      type: "string",
      initialValue: "২০২৬",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timetableRows", title: "সপ্তাহের রুটিন", type: "array", description: "প্রতি দিনের জন্য একটি সারি যোগ করুন। বিষয়ের সঙ্গে সময়, শিক্ষক বা কক্ষ লিখতে পারবেন।", of: [{ type: "object", name: "routineDay", fields: [
        { name: "day", title: "দিন", type: "string", options: { list: ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"] }, validation: (rule) => rule.required() },
        ...["১ম পিরিয়ড", "২য় পিরিয়ড", "৩য় পিরিয়ড", "বিরতি", "৪র্থ পিরিয়ড", "৫ম পিরিয়ড"].map((title, index) => ({ name: `period${index + 1}`, title, type: "string" as const })),
      ], preview: { select: { title: "day", subtitle: "period1" } } }],
    }),
    defineField({
      name: "scheduleRows",
      description: "আগের ঘণ্টাভিত্তিক রুটিন এখানে সংরক্ষিত আছে। চাইলে সাপ্তাহিক রুটিনের ঘরে নতুন সূচি দিন।",
      title: "ঘণ্টাভিত্তিক পাঠদান সূচি (Timetable Rows)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "period", title: "ঘণ্টা / পিরিয়ড", type: "string" },
            { name: "time", title: "সময়সূচি", type: "string" },
            { name: "subject", title: "পাঠ্য বিষয়", type: "string" },
            { name: "teacher", title: "দায়িত্বপ্রাপ্ত শিক্ষক", type: "string" },
            { name: "room", title: "কক্ষ নম্বর", type: "string" },
          ],
          preview: {
            select: {
              title: "subject",
              subtitle: "time",
            },
          },
        },
      ],
    }),
    defineField({
      name: "pdfFile",
      title: "অফিসিয়াল রুটিন PDF ডাউনলোড",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "academicYear",
    },
  },
});

