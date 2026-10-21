import { defineField, defineType } from "sanity";

export const badriKafilaType = defineType({
  name: "badriKafila",
  title: "৩১৩ বদরি কাফেলা প্রকল্প (313 Badri Kafela Project)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "প্রকল্পের নাম",
      type: "string",
      initialValue: "৩১৩ জন বদরি কাফেলা — আজীবন দাতা সদস্য প্রকল্প",
    }),
    defineField({
      name: "targetSeats",
      title: "মোট নির্ধারিত সদস্য সংখ্যা",
      type: "number",
      initialValue: 313,
    }),
    defineField({
      name: "enrolledCount",
      title: "বর্তমান অন্তর্ভুক্ত সদস্য সংখ্যা",
      type: "number",
      initialValue: 64,
    }),
    defineField({
      name: "theologicalOverview",
      title: "৩১৩ সংখ্যার ঐতিহাসিক ও আধ্যাত্মিক রহস্য",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "annualDonationAmount",
      title: "বার্ষিক অনুদানের পরিমাণ (টাকায়)",
      type: "string",
      initialValue: "৩,০০০",
    }),
    defineField({
      name: "monthlyDonationAmount",
      title: "মাসিক অনুদানের পরিমাণ (টাকায়)",
      type: "string",
      initialValue: "২৫০",
    }),
    defineField({
      name: "onetimeDonationAmount",
      title: "এককালীন আজীবন অনুদান (টাকায়)",
      type: "string",
      initialValue: "৫০,০০০",
    }),
    defineField({
      name: "bkashNumber",
      title: "বিকাশ অনুদান নম্বর",
      type: "string",
      initialValue: "01716296379",
    }),
    defineField({
      name: "bankAccountInfo",
      title: "ব্যাংক হিসাব বিবরণী",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "annualDonationAmount",
    },
  },
});

