import { defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "হোমপেজ কনটেন্ট (Homepage Content)",
  type: "document",
  fields: [
    defineField({
      name: "newsTicker",
      title: "জরুরি ঘোষণা / টিকার বার্তা (News Ticker Announcements)",
      type: "array",
      of: [{ type: "string" }],
      description: "শীর্ষে স্ক্রল হওয়া জরুরি খবরাখবর ও হেডলাইনসমূহ",
    }),
    defineField({
      name: "heroBadge",
      title: "হিরো সেকশন ব্যাজ",
      type: "string",
      initialValue: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ",
    }),
    defineField({
      name: "heroHeadline",
      title: "হিরো প্রধান শিরোনাম",
      type: "string",
      initialValue: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    }),
    defineField({
      name: "heroSubheadline",
      title: "হিরো উপ-শিরোনাম ও বর্ণনা",
      type: "text",
      rows: 3,
      initialValue: "১৯৬৯ সালে প্রতিষ্ঠিত একটি ঐতিহ্যবাহী দ্বীনি শিক্ষাপ্রতিষ্ঠান। কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার লক্ষ্যে নিরলসভাবে পরিচালিত।",
    }),
    defineField({
      name: "statsTotalStudents",
      title: "পরিসংখ্যান: মোট শিক্ষার্থী সংখ্যা",
      type: "string",
      initialValue: "৮৫০+",
    }),
    defineField({
      name: "statsTeachers",
      title: "পরিসংখ্যান: অভিজ্ঞ শিক্ষকবৃন্দ",
      type: "string",
      initialValue: "৩৫+",
    }),
    defineField({
      name: "statsHafiz",
      title: "পরিসংখ্যান: বার্ষিক হাফেজ গ্র্যাজুয়েট",
      type: "string",
      initialValue: "৪০+",
    }),
    defineField({
      name: "statsEstablished",
      title: "পরিসংখ্যান: প্রতিষ্ঠার বছর",
      type: "string",
      initialValue: "১৯৬৯",
    }),
    defineField({
      name: "principalName",
      title: "মুহতামিম / প্রিন্সিপাল সাহেবের নাম",
      type: "string",
      initialValue: "মুহতারাম মুহতামিম সাহেব",
    }),
    defineField({
      name: "principalDesignation",
      title: "পদবি",
      type: "string",
      initialValue: "মুহতামিম ও শিক্ষা সচিব",
    }),
    defineField({
      name: "principalMessage",
      title: "মুহতামিমের বাণী ও নসিহত",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "principalPhoto",
      title: "মুহতামিমের ছবি (Portrait)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "admissionBannerTitle",
      title: "ভর্তি আহ্বান শিরোনাম",
      type: "string",
      initialValue: "আপনার সন্তানের দ্বীনি শিক্ষার যাত্রা শুরু হোক এখান থেকে",
    }),
    defineField({
      name: "admissionBannerDesc",
      title: "ভর্তি আহ্বান বর্ণনা",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "হোমপেজ প্রধান পাতা (Homepage Content)",
        subtitle: "হিরো, পরিসংখ্যান ও মুহতামিমের বাণী",
      };
    },
  },
});

