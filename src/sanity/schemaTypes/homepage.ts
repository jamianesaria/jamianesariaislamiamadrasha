import { defineArrayMember, defineField, defineType } from "sanity";
import { defaultQuickAccess } from "../../data/seoData";

export const homepageType = defineType({
  name: "homepage",
  title: "হোমপেজ কনটেন্ট (Homepage Content)",
  type: "document",
  fields: [
    defineField({ name: "quickAccess", title: "গুরুত্বপূর্ণ পাতার দ্রুত লিংক (Quick access links)", type: "object", initialValue: defaultQuickAccess, fields: [
      defineField({ name: "enabled", title: "দেখান (Show section)", type: "boolean", initialValue: true }),
      defineField({ name: "title", title: "শিরোনাম (Heading)", type: "string" }),
      defineField({ name: "links", title: "গুরুত্বপূর্ণ পাতা (Important pages)", type: "array", of: [defineArrayMember({ type: "publicPageLink" })], validation: (rule) => rule.max(8) }),
    ] }),
    defineField({
      name: "introVideo",
      title: "সূচনা ভিডিও (Opening video)",
      type: "object",
      description: "প্রতি ব্রাউজার সেশনে একবার দেখানো হয়। স্বয়ংক্রিয়ভাবে চালু না হলে ভিডিও চালু করার বোতাম দেখাবে। ভিডিও শেষ হলে বা প্রবেশ বোতাম চাপলে মূল পাতা খুলবে।",
      fields: [
        defineField({ name: "enabled", title: "সূচনা ভিডিও চালু (Enabled)", type: "boolean", initialValue: true }),
        defineField({
          name: "videoUrl", title: "ভিডিও লিংক (Video URL)", type: "url",
          initialValue: "/intro-desktop-v2.mp4",
          description: "ওয়েবসাইটের public ফোল্ডারের / দিয়ে শুরু হওয়া MP4 লিংক অথবা HTTPS ভিডিও লিংক দিন।",
          validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https"] }),
        }),
        defineField({
          name: "mobileVideoUrl", title: "মোবাইলের লম্বা ভিডিও (Portrait video)", type: "url",
          initialValue: "/intro-mobile-v3.mp4",
          description: "৯:১৬ ভিডিওতে নাম ও জরুরি লেখা মাঝের অংশে রাখুন, যাতে লম্বা ফোনেও লেখা না কাটে। খালি রাখলে মূল ভিডিও ব্যবহার হবে।",
          validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https"] }),
        }),
        defineField({
          name: "mobilePosterUrl", title: "মোবাইল ভিডিওর প্রচ্ছদ (Portrait poster)", type: "url",
          initialValue: "/intro-mobile-poster-v3.jpg",
          validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https"] }),
        }),
        defineField({
          name: "posterUrl", title: "ভিডিওর প্রচ্ছদ (Poster URL)", type: "url",
          initialValue: "/intro-poster.jpg",
          validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https"] }),
        }),
        defineField({ name: "title", title: "ভিডিওর পরিচিতি (Accessible title)", type: "string", initialValue: "জামিয়ায় স্বাগতম" }),
        defineField({ name: "skipLabel", title: "প্রবেশ বোতামের লেখা (Skip label)", type: "string", initialValue: "ওয়েবসাইটে প্রবেশ করুন" }),
        defineField({ name: "playLabel", title: "চালু করার বোতাম (Play label)", type: "string", initialValue: "ভিডিও চালু করুন" }),
        defineField({ name: "loadingLabel", title: "অপেক্ষার বার্তা (Loading label)", type: "string", initialValue: "ভিডিও প্রস্তুত হচ্ছে…" }),
      ],
    }),
    defineField({
      name: "heroVideoUrl", title: "মূল ব্যানারের ভিডিও (Hero video)", type: "url",
      initialValue: "/hero-courtyard-v2.mp4",
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https"] }),
    }),
    defineField({
      name: "heroPosterUrl", title: "মূল ব্যানারের প্রচ্ছদ (Hero poster)", type: "url",
      initialValue: "/drone_poster.jpg",
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https"] }),
    }),
    defineField({ name: "heroPoster", title: "ব্যানারের নতুন প্রচ্ছদ আপলোড", type: "image", options: { hotspot: true } }),
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
      hidden: true,
      title: "পরিসংখ্যান: মোট শিক্ষার্থী সংখ্যা",
      type: "string",
      initialValue: "৮৫০+",
    }),
    defineField({
      name: "statsTeachers",
      hidden: true,
      title: "পরিসংখ্যান: অভিজ্ঞ শিক্ষকবৃন্দ",
      type: "string",
      initialValue: "৩৫+",
    }),
    defineField({
      name: "statsHafiz",
      hidden: true,
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
      hidden: true,
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
      hidden: true,
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
    defineField({
      name: "atAGlanceEstablished",
      title: "এক নজরে: প্রতিষ্ঠাকাল (Established Year/String)",
      type: "string",
      initialValue: "১৯৬৯ খ্রিষ্টাব্দ (১৩৭৬ বাংলা | ১৩৮৮ হিজরি)",
    }),
    defineField({
      name: "atAGlanceLandDonors",
      title: "এক নজরে: জমিদাতাগণ (Land Donors List)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["১। মরহুম চান মিয়া সাহেব", "২। আমিনা খাতুন", "৩। সফর বানু"],
    }),
    defineField({
      name: "atAGlanceMutawalli",
      title: "এক নজরে: মুতাওয়াল্লী (Mutawalli Name)",
      type: "string",
      initialValue: "মনিরুজ্জামান মনু",
    }),
    defineField({
      name: "atAGlancePresident",
      title: "এক নজরে: সভাপতি (President Name)",
      type: "string",
      initialValue: "কবির হোসেন শিমুল",
    }),
    defineField({
      name: "atAGlanceTeachers",
      title: "এক নজরে: শিক্ষক সংখ্যা (Teachers Count)",
      type: "string",
      initialValue: "৩২ জন",
    }),
    defineField({
      name: "atAGlanceStudents",
      title: "এক নজরে: শিক্ষার্থী সংখ্যা (Students Count)",
      type: "string",
      initialValue: "৫০০ জন",
    }),
    defineField({
      name: "atAGlanceAcademicPrograms",
      title: "এক নজরে: শিক্ষা কার্যক্রম (Academic Programs)",
      type: "string",
      initialValue: "মক্তব, হিফজ, হিফজ রিভিশন, কিতাব ও মাদানি নেসাব বিভাগ",
    }),
    defineField({
      name: "atAGlanceAddress",
      title: "এক নজরে: ঠিকানা ও ফোন নম্বর (Address & Phone)",
      type: "text",
      rows: 3,
      initialValue: "মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।\nফোন: 01716296379",
    }),
    defineField({
      name: "missionMainGoal",
      title: "লক্ষ্য ও উদ্দেশ্য: মূল লক্ষ্য (Main Goal)",
      type: "text",
      rows: 2,
      initialValue:
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার মূল লক্ষ্য হলো আল্লাহ তাআলার সন্তুষ্টি অর্জন এবং কুরআন-সুন্নাহর আলোকে শিক্ষার্থীদের জীবন গঠন করা।",
    }),
    defineField({
      name: "missionObjectives",
      title: "লক্ষ্য ও উদ্দেশ্য: প্রধান উদ্দেশ্যসমূহ (Objectives List)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "বিশুদ্ধ কুরআন-সুন্নাহভিত্তিক ইসলামী শিক্ষা প্রদান।",
        "ইলম, আমল ও আখলাকের সমন্বয়ে শিক্ষার্থী গড়ে তোলা।",
        "যোগ্য আলেম, দাঈ ও আদর্শ মানুষ তৈরি করা।",
      ],
    }),
    defineField({
      name: "madrasaFeatureItems",
      title: "মাদরাসার বৈশিষ্ট্য (Madrasa Features Cards)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", title: "আইডি (Icon Key)", type: "string" }),
            defineField({ name: "title", title: "শিরোনাম (Title)", type: "string" }),
            defineField({ name: "description", title: "বর্ণনা (Description)", type: "text", rows: 3 }),
          ],
        }),
      ],
      initialValue: [
        {
          id: "teachers",
          title: "অভিজ্ঞ ও যোগ্য শিক্ষকমণ্ডলী",
          description:
            "দেশ-বিদেশের উচ্চতর শিক্ষাপ্রতিষ্ঠান থেকে সনদপ্রাপ্ত বিজ্ঞ ও অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পাঠদানের ব্যবস্থা।",
        },
        {
          id: "supervision",
          title: "বিশিষ্ট আলেম-উলামার তত্ত্বাবধান",
          description:
            "দেশবরেণ্য শিক্ষাবিদ ও বুজুর্গ ওলামায়ে কেরামের সার্বিক তত্ত্বাবধান, পরামর্শ ও দিকনির্দেশনায় পরিচালিত হওয়ার প্রত্যয়।",
        },
        {
          id: "education-initiative",
          title: "শিক্ষার মানোন্নয়নে বিশেষ উদ্যোগ",
          description:
            "শিক্ষার মান ক্রমাগত উন্নয়নের লক্ষ্যে সার্বক্ষণিক তদারকি, সাপ্তাহিক ও মাসিক পরীক্ষা, বক্তৃতা প্রশিক্ষণ, পাঠাগারের উদ্যোগে নিয়মিত বই-পুস্তক বিতরণ এবং বাংলা ও আরবি ত্রৈমাসিক দেয়ালিকা প্রকাশসহ সৃজনশীল বিভিন্ন কার্যক্রম গ্রহণ।",
        },
        {
          id: "library",
          title: "সমৃদ্ধ গ্রন্থাগার",
          description:
            "শিক্ষার্থীদের জ্ঞানচর্চা ও অধ্যয়নের সুযোগ সম্প্রসারণের লক্ষ্যে দেশি-বিদেশি বিভিন্ন বিষয়ের বিপুলসংখ্যক কিতাব ও বইসমৃদ্ধ গ্রন্থাগারের ব্যবস্থা।",
        },
      ],
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

