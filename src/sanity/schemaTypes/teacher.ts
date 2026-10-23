import { defineField, defineType } from "sanity";

export const teacherType = defineType({
  name: "teacher",
  title: "শিক্ষক ও উলামায়ে কেরাম (Teachers & Faculty)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "শিক্ষকের পুরো নাম",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "designation",
      title: "পদবি (Designation)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: শায়খুল হাদিস, প্রধান শিক্ষক, নাজেমে দারুল ইকামা",
    }),
    defineField({
      name: "department",
      title: "শিক্ষা বিভাগ (Department)",
      type: "string",
      options: {
        list: [
          { title: "বুখারীর বিশেষ দরস প্রদানকারী উলামা", value: "bukhari" },
          { title: "মুহাদ্দিস ও কিতাব বিভাগ", value: "kitab" },
          { title: "হিফজ ও নাজেরা বিভাগ", value: "hifz" },
          { title: "মক্তব ও নূরানী বিভাগ", value: "maktab" },
          { title: "কর্মকর্তা ও প্রশাসনিক শিক্ষক", value: "officers" },
          { title: "অন্যান্য স্টাফবৃন্দ", value: "staff" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "qualification",
      title: "শিক্ষাগত যোগ্যতা",
      type: "string",
      description: "যেমন: দাওরায়ে হাদিস (তাকমিল), মুফতি, হাফেজ ও ক্বারী",
    }),
    defineField({
      name: "mobile",
      title: "মোবাইল নম্বর",
      type: "string",
    }),
    defineField({ name: "honor", title: "উপাধি / বিশেষ পরিচিতি", type: "string" }),
    defineField({
      name: "district",
      title: "নিজ জেলা (District)",
      type: "string",
    }),
    defineField({
      name: "institution",
      title: "মূল প্রতিষ্ঠান (Institution)",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "শিক্ষকের ছবি (Portrait)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "serial",
      title: "প্রদর্শনের ক্রমিক নম্বর (Sort Order)",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "photo",
    },
  },
  orderings: [
    {
      title: "ক্রমিক নম্বর অনুযায়ী",
      name: "serialAsc",
      by: [{ field: "serial", direction: "asc" }],
    },
  ],
});

