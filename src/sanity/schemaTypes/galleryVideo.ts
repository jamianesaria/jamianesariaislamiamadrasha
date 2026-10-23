import { defineField, defineType } from "sanity";

export const galleryVideoType = defineType({
  name: "galleryVideo",
  title: "ভিডিও গ্যালারি (Video Gallery)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "ভিডিও শিরোনাম",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "ইউটিউব ভিডিও আইডি (YouTube ID)",
      type: "string",
      description: "যেমন: fJ9rUzIMcZQ (https://www.youtube.com/watch?v=fJ9rUzIMcZQ হতে শুধু আইডিটি লিখুন)",
      validation: (Rule) => Rule.custom((value, context) => context.document?.localVideoUrl || typeof value === "string" && /^[A-Za-z0-9_-]{11}$/.test(value) ? true : "ইউটিউব ভিডিওর সঠিক ১১ অক্ষরের আইডি দিন।"),
    }),
    defineField({ name: "thumbnail", title: "ভিডিওর প্রচ্ছদ", type: "image", options: { hotspot: true } }),
    defineField({ name: "thumbnailUrl", title: "আগের প্রচ্ছদের ঠিকানা", type: "string", hidden: true }),
    defineField({ name: "localVideoUrl", title: "আগের স্থানীয় ভিডিও", type: "string", hidden: true }),
    defineField({ name: "migrationKey", title: "স্থানান্তর পরিচিতি", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "speaker", title: "বক্তা / নির্মাতা", type: "string" }),
    defineField({ name: "displayOrder", title: "প্রদর্শনের ক্রম", type: "number", initialValue: 10 }),
    defineField({
      name: "category",
      title: "ভিডিও ক্যাটাগরি",
      type: "string",
      options: {
        list: [
          { title: "মাদরাসা কার্যক্রম (Madrasa Activities)", value: "madrasa" },
          { title: "কুরআন তিলাওয়াত (Quran Recitation)", value: "quran" },
          { title: "ইসলামিক আলোচনা ও বয়ান (Waz / Lectures)", value: "waz" },
          { title: "অনুষ্ঠান ও দস্তারবন্দী (Events)", value: "events" },
        ],
      },
    }),
    defineField({
      name: "duration",
      title: "ভিডিও দৈর্ঘ্য (যেমন: ১২:৪৫)",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "তারিখ",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});

