import { defineField, defineType } from "sanity";

export const admissionApplicationType = defineType({
  name: "admissionApplication",
  title: "ভর্তি আবেদনপত্রসমূহ (Online Applications)",
  type: "document",
  fields: [
    defineField({
      name: "applicationId",
      title: "আবেদন ট্র্যাকিং নম্বর (Application ID)",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "studentName",
      title: "শিক্ষার্থীর নাম",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "admissionClass",
      title: "আবেদিত শ্রেণি / বিভাগ",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "residentialStatus",
      title: "আবাসন ধরন",
      type: "string",
      options: {
        list: [
          { title: "আবাসিক (Full Hostel)", value: "আবাসিক" },
          { title: "অনাবাসিক (Day)", value: "অনাবাসিক" },
          { title: "ডে-কেয়ার (Day-care)", value: "ডে-কেয়ার" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "আবেদনের অগ্রগতি অবস্থা (Status)",
      type: "string",
      options: {
        list: [
          { title: "নতুন আবেদন (Pending)", value: "pending" },
          { title: "মৌখিক পরীক্ষার জন্য নির্বাচিত (Interview Scheduled)", value: "interview" },
          { title: "ভর্তি নিশ্চিত (Accepted)", value: "accepted" },
          { title: "অপেক্ষমাণ তালিকা (Waiting)", value: "waiting" },
          { title: "বাতিল (Rejected)", value: "rejected" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "dateOfBirth",
      title: "জন্ম তারিখ",
      type: "string",
    }),
    defineField({
      name: "birthCertificateNumber",
      title: "অনলাইন জন্মনিবন্ধন নম্বর (BRN)",
      type: "string",
    }),
    defineField({
      name: "fatherName",
      title: "পিতার নাম",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fatherMobile",
      title: "অভিভাবকের মোবাইল নম্বর",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fatherNid",
      title: "পিতার জাতীয় পরিচয়পত্র (NID)",
      type: "string",
    }),
    defineField({
      name: "motherName",
      title: "মাতার নাম",
      type: "string",
    }),
    defineField({
      name: "presentAddress",
      title: "বর্তমান ঠিকানা",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "permanentAddress",
      title: "স্থায়ী ঠিকানা",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "submittedAt",
      title: "আবেদনের সময়কাল",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "studentName",
      subtitle: "applicationId",
    },
  },
  orderings: [
    {
      title: "সর্বশেষ আবেদন আগে",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});

