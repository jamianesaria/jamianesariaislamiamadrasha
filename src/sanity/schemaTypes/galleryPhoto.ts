import { defineField, defineType } from "sanity";

export const galleryPhotoType = defineType({
  name: "galleryPhoto",
  title: "ফটো গ্যালারি (Photo Gallery)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "ছবির শিরোনাম",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "ফটোগ্রাফ (Image)",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.custom((value, context) => value || context.document?.imageUrl ? true : "একটি ছবি আপলোড করুন।"),
    }),
    defineField({ name: "imageUrl", title: "আগের ছবির ঠিকানা", type: "string", hidden: true }),
    defineField({ name: "migrationKey", title: "স্থানান্তর পরিচিতি", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "displayOrder", title: "প্রদর্শনের ক্রম", type: "number", initialValue: 10 }),
    defineField({
      name: "category",
      title: "ক্যাটাগরি",
      type: "string",
      options: {
        list: [
          { title: "ক্যাম্পাস ও পরিবেশ (Campus)", value: "campus" },
          { title: "হিফজুল কুরআন (Hifz)", value: "hifz" },
          { title: "কিতাব বিভাগ (Kitab)", value: "kitab" },
          { title: "পাঠদান কার্যক্রম (Classroom)", value: "classroom" },
          { title: "অনুষ্ঠান ও মাহফিল (Events)", value: "events" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "ক্যাপশন বা বিবরণ",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "date",
      title: "তারিখ",
      type: "string",
      initialValue: "২০২৬",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});

