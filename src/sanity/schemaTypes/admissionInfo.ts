import { defineField, defineType } from "sanity";

export const admissionInfoType = defineType({
  name: "admissionInfo",
  title: "ভর্তি তথ্য ও নির্দেশিকা (Admission Info & Circulars)",
  type: "document",
  fields: [
    defineField({
      name: "sessionName",
      title: "ভর্তি শিক্ষাবর্ষের নাম",
      type: "string",
      initialValue: "২০২৬–২০২৭ খ্রিষ্টাব্দ",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hijriYear",
      title: "হিজরি সন",
      type: "string",
      initialValue: "১৪৪৭–১৪৪৮ হিজরি",
    }),
    defineField({
      name: "status",
      title: "ভর্তি সেশন স্ট্যাটাস",
      type: "string",
      options: {
        list: [
          { title: "চলমান (আবেদন উন্মুক্ত)", value: "open" },
          { title: "শীঘ্রই শুরু হবে (Upcoming)", value: "upcoming" },
          { title: "ভর্তি সমাপ্ত (Closed)", value: "closed" },
        ],
      },
      initialValue: "open",
    }),
    defineField({
      name: "memoNo",
      title: "অফিসিয়াল স্মারক নম্বর",
      type: "string",
      initialValue: "জামিয়া/প্রশা-ভর্তি/২০২৬/১১৮",
    }),
    defineField({
      name: "overview",
      title: "১. ভর্তি কার্যক্রম পরিচিতি",
      type: "text",
      rows: 4,
      initialValue:
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানায় বিভিন্ন শিক্ষাবিভাগে ভর্তিচ্ছু শিক্ষার্থীদের ভর্তি কার্যক্রম নির্ধারিত সময়সূচি ও নিয়মাবলি অনুযায়ী পরিচালিত হয়। আগ্রহী শিক্ষার্থী ও অভিভাবকদের সংশ্লিষ্ট বিভাগের ভর্তির যোগ্যতা, বয়সসীমা, ভর্তি পরীক্ষা, প্রয়োজনীয় কাগজপত্র ও ফি সম্পর্কে জেনে নির্ধারিত সময়ের মধ্যে ভর্তি কার্যক্রম সম্পন্ন করার জন্য অনুরোধ করা যাচ্ছে।",
    }),
    defineField({
      name: "arabicTimeline",
      title: "২. আরবি বর্ষ সময়সীমা",
      type: "string",
      initialValue: "প্রতি বছর শাওয়াল মাসের ৮ তারিখ থেকে ১৫ শাওয়াল পর্যন্ত।",
    }),
    defineField({
      name: "englishTimeline",
      title: "২. ইংরেজি বর্ষ সময়সীমা",
      type: "string",
      initialValue: "প্রতি বছর ১ জানুয়ারি থেকে ১৫ জানুয়ারি পর্যন্ত।",
    }),
    defineField({
      name: "examMethod",
      title: "৪. ভর্তি পরীক্ষার পদ্ধতি",
      type: "string",
      initialValue: "মৌখিক পরীক্ষা।",
    }),
    defineField({
      name: "examResultPublish",
      title: "৪. ফলাফল প্রকাশের নিয়ম",
      type: "string",
      initialValue: "প্রতিদিনের ভর্তি পরীক্ষার ফলাফল প্রতিদিন প্রকাশ করা হবে।",
    }),
    defineField({
      name: "orphanPolicy",
      title: "৭. এতিম ও সুবিধাবঞ্চিত শিক্ষার্থীদের বিশেষ সুবিধা",
      type: "text",
      rows: 3,
      initialValue:
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানায় এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য সম্পূর্ণ থাকা, খাওয়া ও পড়াশোনার সুব্যবস্থা রয়েছে। এসব শিক্ষার্থীর ধর্মীয় শিক্ষা, নৈতিক গঠন এবং সুন্দর ভবিষ্যৎ নির্মাণে প্রতিষ্ঠানটি আন্তরিকভাবে কাজ করে যাচ্ছে।",
    }),
    defineField({
      name: "orphanConditions",
      title: "৭. এতিম শিক্ষার্থী যাচাইয়ের শর্তাবলি",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "শিক্ষার্থীর বয়স ১৮ বছরের কম হতে হবে।",
        "শিক্ষার্থীর জন্মনিবন্ধন সনদ জমা দিতে হবে।",
        "পিতা অথবা মাতার যেকোনো একজনের মৃত্যুর প্রমাণ হিসেবে অনলাইনে যাচাইযোগ্য মৃত্যু সনদ জমা দিতে হবে।",
        "জমা দেওয়া কাগজপত্র যাচাইয়ের মাধ্যমে শিক্ষার্থীর যোগ্যতা নিশ্চিত করা হবে।",
        "যোগ্যতা যাচাইয়ের পর নির্বাচিত শিক্ষার্থীরা মাদরাসার নির্ধারিত সুবিধা গ্রহণ করতে পারবেন।",
      ],
    }),
    defineField({
      name: "newStudentTotalFee",
      hidden: true,
      title: "৮. নতুন শিক্ষার্থীদের সর্বমোট ভর্তি ফি (টাকা)",
      type: "number",
      initialValue: 3500,
    }),
    defineField({
      name: "oldStudentTotalFee",
      hidden: true,
      title: "৮. পুরাতন শিক্ষার্থীদের সর্বমোট ভর্তি ফি (টাকা)",
      type: "number",
      initialValue: 3200,
    }),
    defineField({
      name: "phoneMuhtamim",
      title: "১০. মুহতামিম মোবাইল নম্বর",
      type: "string",
      initialValue: "০১৭১৬২৯৬৩৭৯",
    }),
    defineField({
      name: "phoneNazemeTalimat",
      title: "১০. নাজেমে তালিমাত মোবাইল নম্বর",
      type: "string",
      initialValue: "০১৭৩৪৩১৯৪২৬",
    }),
    defineField({
      name: "phoneOffice",
      title: "১০. মাদরাসা অফিস মোবাইল নম্বর",
      type: "string",
      initialValue: "০১৯০১৪৪৭১৬০",
    }),
    defineField({
      name: "guardianGuidelines",
      title: "১১. অভিভাবকদের জন্য বিশেষ নির্দেশনা",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "ভর্তির আগে সংশ্লিষ্ট বিভাগের যোগ্যতা ও বয়সসীমা যাচাই করুন।",
        "ভর্তি ফরমে সব তথ্য নির্ভুলভাবে পূরণ করুন।",
        "প্রয়োজনীয় কাগজপত্র সঙ্গে রাখুন।",
        "ভর্তি ফি ও মাসিক খরচ সম্পর্কে প্রয়োজনে মাদরাসা অফিসে যোগাযোগ করুন।",
        "এতিম শিক্ষার্থীদের বিশেষ সুবিধার জন্য নির্ধারিত কাগজপত্র জমা দিন।",
      ],
    }),
    defineField({
      name: "formCollectionTime",
      hidden: true,
      title: "ফরম সংগ্রহ ও জমার সময়সূচি",
      type: "string",
      initialValue: "প্রতিদিন সকাল ৯:০০ ঘটিকা হতে আসর পর্যন্ত",
    }),
    defineField({
      name: "admissionFormPdf",
      title: "প্রিন্টযোগ্য ভর্তি ফরম PDF ফাইল (ঐচ্ছিক আপলোড)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
  preview: {
    select: {
      title: "sessionName",
      subtitle: "memoNo",
    },
  },
});
