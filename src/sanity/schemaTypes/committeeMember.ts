import { defineField, defineType } from "sanity";

export const committeeMemberType = defineType({
  name: "committeeMember",
  title: "পরিচালনা পরিষদ ও জমিদাতাবৃন্দ (Managing Committee & Donors)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "সদস্যের নাম",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "designation",
      title: "কমিটির পদবি (Designation)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "যেমন: সভাপতি, সহ-সভাপতি, সেক্রেটারি ও মুতাওয়াল্লী, কোষাধ্যক্ষ, সদস্য",
    }),
    defineField({
      name: "mobile",
      title: "মোবাইল নম্বর",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "ঠিকানা / পরিচিতি",
      type: "string",
    }),
    defineField({
      name: "isLandDonor",
      title: "তিনি কি সম্মানিত জমিদাতা? (Land Donor)",
      type: "boolean",
      initialValue: false,
      description: "মরহুম চান মিয়া, আমেনা খাতুন প্রমুখ সম্মানিত জমিদাতাবৃন্দের জন্য টিক দিন",
    }),
    defineField({
      name: "donorContribution",
      title: "জমির পরিমাণ বা বিশেষ অবদান",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "ছবি (Portrait)",
      type: "image",
      options: {
        hotspot: true,
      },
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

