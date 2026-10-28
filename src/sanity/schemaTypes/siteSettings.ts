import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "প্রতিষ্ঠান সেটিংস ও পরিচিতি (Global Site Settings)",
  type: "document",
  fields: [
    defineField({ name: "seoSiteName", title: "সার্চে প্রতিষ্ঠানের সংক্ষিপ্ত নাম (Search site name)", type: "string" }),
    defineField({ name: "googleSiteVerification", title: "গুগল সার্চ কনসোল যাচাইকরণ (Google Search Console verification)", type: "string", description: "Google-এর দেওয়া content কোডটি দিন, পুরো meta tag নয়। (Use the verification content value, not the full meta tag.)" }),
    defineField({ name: "seoDescription", title: "সাইটের সার্চ পরিচিতি (Site search description)", type: "text", rows: 3 }),
    defineField({ name: "seoImage", title: "সাইট শেয়ারের ছবি (Default sharing image)", type: "image", options: { hotspot: true } }),
    defineField({ name: "breadcrumbHomeLabel", title: "ব্রেডক্রাম্বে হোমের নাম (Breadcrumb home label)", type: "string" }),
    defineField({ name: "breadcrumbNavLabel", title: "ব্রেডক্রাম্বের সহায়ক নাম (Breadcrumb accessible label)", type: "string" }),
    defineField({ name: "badriFormUrl", title: "বদরি কাফেলার কাগজের ফরম (Badri paper form URL)", type: "url", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["https"] }), description: "আসল PDF প্রস্তুত হলে লিংক দিন। খালি থাকলে অফিসে যোগাযোগের লিংক দেখাবে। (Leave empty to direct visitors to the office.)" }),
    defineField({ name: "badriFormContactLabel", title: "কাগজের ফরমের যোগাযোগ বাটন (Paper form contact label)", type: "string" }),
    ...[
      ["footerSlogan", "ফুটারের পরিচিতি"], ["establishedFull", "সম্পূর্ণ প্রতিষ্ঠাকাল"],
      ["applyUrl", "আবেদন ফরমের লিংক"], ["onlineClassUrl", "অনলাইন ক্লাসের লিংক"], ["appDownloadUrl", "অ্যাপ ডাউনলোডের লিংক"],
    ].map(([name, title]) => defineField({ name, title, type: "string" })),
    defineField({ name: "headerBanner", title: "ওয়েবসাইটের প্রধান ব্যানার (Header banner)", type: "image", options: { hotspot: true }, description: "ওয়েবসাইট সম্পাদনা থেকে ব্যানারে ক্লিক করে ছবিটি পরিবর্তন করতে পারবেন।" }),
    defineField({
      name: "title",
      title: "মাদরাসার নাম (বাংলা)",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    }),
    defineField({
      name: "arabicTitle",
      title: "মাদরাসার নাম (আরবি)",
      type: "string",
      initialValue: "الجامعة النصرية الإسلامية واليتيم خانة",
    }),
    defineField({
      name: "englishTitle",
      title: "মাদরাসার নাম (ইংরেজি)",
      type: "string",
      initialValue: "Jamia Nesaria Islamia Madrasha & Orphanage",
    }),
    defineField({
      name: "establishedYear",
      title: "প্রতিষ্ঠার সাল",
      type: "string",
      initialValue: "১৯৬৯",
    }),
    defineField({
      name: "slogan",
      title: "মূল স্লোগান / প্রত্যয়",
      type: "string",
      initialValue: "কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার প্রত্যয়।",
    }),
    defineField({
      name: "phone",
      title: "প্রধান মোবাইল নম্বর",
      type: "string",
      initialValue: "01716296379",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emergencyPhone",
      title: "জরুরি হেল্পলাইন",
      type: "string",
      initialValue: "01713004929",
    }),
    defineField({
      name: "email",
      title: "অফিসিয়াল ই-মেইল",
      type: "string",
      initialValue: "jamianesaria@gmail.com",
    }),
    defineField({
      name: "address",
      title: "সংক্ষিপ্ত ঠিকানা",
      type: "string",
      initialValue: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ",
    }),
    defineField({
      name: "addressFull",
      title: "পূর্ণাঙ্গ বিস্তারিত ঠিকানা",
      type: "string",
      initialValue: "মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন) টঙ্গী, গাজীপুর, বাংলাদেশ।",
    }),
    defineField({
      name: "regSocialWelfare",
      title: "সমাজসেবা নিবন্ধন নম্বর",
      type: "string",
      initialValue: "ঢ-০৫০৪",
    }),
    defineField({
      name: "regBefaq",
      title: "বেফাকুল মাদারিসিল আরাবিয়া নিবন্ধন নম্বর",
      type: "string",
      initialValue: "১/৭৪৩",
    }),
    defineField({
      name: "regHaiatulUlya",
      title: "আল-হাইআতুল উলয়া নিবন্ধন নম্বর",
      type: "string",
      initialValue: "০০৬৮৫",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "গুগল ম্যাপ এমবেড লিংক (Google Maps Embed URL)",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "ফেসবুক পেজ লিংক",
      type: "url",
      initialValue: "https://www.facebook.com/jamianesaria/",
    }),
    defineField({
      name: "youtubeUrl",
      title: "ইউটিউব চ্যানেল লিংক",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "মাদরাসার অফিশিয়াল লোগো (Logo)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "phone",
    },
  },
});

