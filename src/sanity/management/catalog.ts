export type ModuleKey = "notice" | "classRoutine" | "examRoutine" | "examResult" | "teacher" | "committeeMember" | "academicDepartment" | "galleryPhoto" | "galleryVideo" | "blogPost" | "pageContent" | "calendarEvent" | "vacancy";
export const modules: { type: ModuleKey; label: string; description: string; path: string; group: string }[] = [
  { type: "notice", label: "নোটিশ ও ঘোষণা", description: "জরুরি ঘোষণা, বিজ্ঞপ্তি ও সংযুক্ত PDF", path: "/notices", group: "প্রকাশনা" },
  { type: "classRoutine", label: "ক্লাস রুটিন", description: "শ্রেণি, দিন, সময় ও বিষয় অনুযায়ী পাঠসূচি", path: "/functions/class-routine", group: "একাডেমিক" },
  { type: "examRoutine", label: "পরীক্ষার রুটিন", description: "পরীক্ষার তারিখ, বিষয় ও নির্দেশনা", path: "/exam-routine", group: "একাডেমিক" },
  { type: "examResult", label: "ফলাফল প্রকাশ", description: "অনুমোদিত ফলাফলের বিজ্ঞপ্তি ও পাবলিক PDF", path: "/results/academic", group: "একাডেমিক" },
  { type: "calendarEvent", label: "অনুষ্ঠান ও ছুটি", description: "একাডেমিক ক্যালেন্ডার ও ছুটির তালিকা", path: "/functions/event-list", group: "একাডেমিক" },
  { type: "teacher", label: "শিক্ষক ও কর্মী", description: "পরিচিতি, ছবি, দায়িত্ব ও প্রদর্শন ক্রম", path: "/teachers", group: "প্রতিষ্ঠান" },
  { type: "committeeMember", label: "পরিচালনা পরিষদ", description: "কমিটি, প্রতিষ্ঠাতা ও জমিদাতার পরিচিতি", path: "/committee", group: "প্রতিষ্ঠান" },
  { type: "academicDepartment", label: "শিক্ষা বিভাগ", description: "বিভাগের পরিচিতি, ছবি ও কার্যক্রম", path: "/academics", group: "প্রতিষ্ঠান" },
  { type: "vacancy", label: "নিয়োগ বিজ্ঞপ্তি", description: "পদ, যোগ্যতা ও আবেদনের শেষ তারিখ", path: "/about/vacancy", group: "প্রতিষ্ঠান" },
  { type: "galleryPhoto", label: "ফটো গ্যালারি", description: "ছবি, ক্যাপশন ও বিভাগ", path: "/gallery/photo", group: "মিডিয়া" },
  { type: "galleryVideo", label: "ভিডিও গ্যালারি", description: "ভিডিও লিংক ও পরিচিতি", path: "/gallery/video", group: "মিডিয়া" },
  { type: "blogPost", label: "ব্লগ ও প্রবন্ধ", description: "লেখা, প্রচ্ছদ ও প্রকাশনা", path: "/blog", group: "মিডিয়া" },
  { type: "pageContent", label: "পাতার লেখা ও ছবি", description: "ওয়েবসাইটের পাতাভিত্তিক সম্পাদনাযোগ্য বিষয়বস্তু", path: "/", group: "ওয়েবসাইট" },
];
export const inboxKinds = [
  { key: "admission", label: "ভর্তি আবেদন", icon: "🎓" },
  { key: "contact", label: "যোগাযোগ বার্তা", icon: "✉" },
  { key: "badri", label: "বদরি কাফেলা আবেদন", icon: "♡" },
] as const;
export const managementTypes = [...modules.map((entry) => entry.type), "homepage", "siteSettings", "admissionInfo", "badriKafila"];
export const statuses = [
  { value: "new", label: "নতুন" }, { value: "review", label: "যাচাই চলছে" },
  { value: "needsInfo", label: "তথ্য প্রয়োজন" }, { value: "accepted", label: "গৃহীত" },
  { value: "rejected", label: "বাতিল" }, { value: "resolved", label: "সমাধান হয়েছে" },
  { value: "archived", label: "আর্কাইভ" }, { value: "spam", label: "অপ্রয়োজনীয়" },
];
export const fieldLabels: Record<string, string> = {
  studentName: "শিক্ষার্থীর নাম", studentUid: "শিক্ষার্থী পরিচিতি", dateOfBirth: "জন্ম তারিখ", birthCertificateNumber: "জন্মনিবন্ধন নম্বর", gender: "লিঙ্গ", fatherName: "পিতার নাম", fatherProfession: "পিতার পেশা", fatherMobile: "অভিভাবকের মোবাইল", fatherNid: "পিতার NID", guardianName: "অভিভাবকের নাম", guardianRelation: "সম্পর্ক", motherName: "মাতার নাম", motherProfession: "মাতার পেশা", motherMobile: "মাতার মোবাইল", motherNid: "মাতার NID", admissionClass: "আবেদিত শ্রেণি", admissionGroup: "বিভাগ", admissionYear: "শিক্ষাবর্ষ", residentialStatus: "আবাসন", name: "নাম", phone: "মোবাইল", email: "ই-মেইল", subject: "বিষয়", message: "বার্তা", guardianOrApplicant: "আবেদনকারী / অভিভাবক", whatsapp: "হোয়াটসঅ্যাপ", address: "ঠিকানা", donationPlan: "সহযোগিতার পরিকল্পনা", customAmount: "প্রস্তাবিত পরিমাণ", paymentChannel: "পছন্দের মাধ্যম", note: "আবেদনকারীর মন্তব্য", chosenSeatNumber: "পছন্দের সদস্য নম্বর", memberType: "সদস্যের ধরন", sameAsPresent: "স্থায়ী ঠিকানা বর্তমানের মতো",
};
for (const [prefix, title] of [["present", "বর্তমান"], ["permanent", "স্থায়ী"]]) {
  for (const [key, label] of Object.entries({ Country: "দেশ", Division: "বিভাগ", District: "জেলা", Upazila: "উপজেলা", PostOffice: "ডাকঘর", PostalCode: "পোস্ট কোড", Village: "গ্রাম / এলাকা" })) fieldLabels[prefix + key] = `${title} ${label}`;
}
