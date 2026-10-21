import { defineField, defineType } from "sanity";

export const contactMessageType = defineType({
  name: "contactMessage",
  title: "যোগাযোগ বার্তা ও ইনবক্স (Inquiries & Messages)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "প্রেরকের নাম",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "মোবাইল নম্বর",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "ই-মেইল",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subject",
      title: "বিষয় / উদ্দেশ্য",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "বার্তা বিবরণ",
      type: "text",
      rows: 4,
      readOnly: true,
    }),
    defineField({
      name: "isRead",
      title: "পড়া হয়েছে? (Mark as Read)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "notes",
      title: "মাদরাসা কর্তৃপক্ষের মন্তব্য",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "receivedAt",
      title: "প্রাপ্তির সময়কাল",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "phone",
    },
  },
  orderings: [
    {
      title: "সর্বশেষ বার্তা আগে",
      name: "receivedAtDesc",
      by: [{ field: "receivedAt", direction: "desc" }],
    },
  ],
});

