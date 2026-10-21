import { defineField, defineType } from "sanity";

export const academicDepartmentType = defineType({
  name: "academicDepartment",
  title: "শিক্ষা বিভাগ ও পাঠ্যক্রম (Academic Departments)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "বিভাগের নাম (বাংলা)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: নূরানী মক্তব ও নাজেরা বিভাগ, হিফজুল কুরআন বিভাগ, কিতাব বিভাগ",
    }),
    defineField({
      name: "slug",
      title: "ওয়েব লিংক স্ল্যাগ",
      type: "slug",
      description: "প্রতিটি বিভাগের জন্য আলাদা লিংক দিন। একই বিভাগের জন্য একাধিক রেকর্ড তৈরি করবেন না।",
      validation: (Rule) => Rule.required().error("বিভাগের জন্য একটি স্বতন্ত্র ওয়েব লিংক দিন।"),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "arabicTitle",
      title: "বিভাগের নাম (আরবি)",
      type: "string",
    }),
    defineField({
      name: "badge",
      title: "সংক্ষিপ্ত ব্যাজ টেক্সট",
      type: "string",
      description: "যেমন: অনাবাসিক ও নূরানি, আন্তর্জাতিক মানসম্পন্ন",
    }),
    defineField({
      name: "image",
      title: "বিভাগের ছবি (Department Photo)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "ওয়েবসাইটে প্রদর্শনের জন্য ছবি আপলোড করুন",
    }),
    defineField({
      name: "ageRange",
      title: "ভর্তির বয়সসীমা",
      type: "string",
      description: "যেমন: ৪ হতে ৫+ বছর, ৮ হতে ১৩ বছর",
    }),
    defineField({
      name: "seatCount",
      title: "মোট আসন সংখ্যা",
      type: "string",
      description: "যেমন: ১২০ টি",
    }),
    defineField({
      name: "overview",
      title: "বিভাগীয় সংক্ষিপ্ত পরিচিতি",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "features",
      title: "প্রধান বৈশিষ্ট্যসমূহ (Bullet points)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "syllabusPdf",
      title: "সিলেবাস PDF ফাইল",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "showOnHomepage",
      title: "হোমপেজে দেখান (Show on homepage)",
      type: "boolean",
      initialValue: true,
      description: "বন্ধ রাখলে এই বিভাগের কার্ড শুধু হোমপেজ থেকে লুকানো থাকবে। অন্য পাতার তথ্য মুছে যাবে না।",
    }),
    defineField({
      name: "serial",
      title: "ক্রমিক নম্বর (Sort Order)",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "badge",
      media: "image",
    },
  },
});

