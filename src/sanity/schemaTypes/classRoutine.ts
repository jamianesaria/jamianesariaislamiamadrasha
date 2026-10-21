import { defineField, defineType } from "sanity";

export const classRoutineType = defineType({
  name: "classRoutine",
  title: "ক্লাস রুটিন (Class Routines)",
  type: "document",
  fields: [
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
      name: "scheduleRows",
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

