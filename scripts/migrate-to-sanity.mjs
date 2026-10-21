import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse .env file
function loadEnv(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...values] = trimmed.split("=");
        if (key && values.length > 0) {
          const val = values.join("=").replace(/^["']|["']$/g, "").trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv(path.resolve(__dirname, "../.env.local"));
loadEnv(path.resolve(__dirname, "../.env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ SANITY_API_TOKEN is missing! Please configure it in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-01",
  token,
  useCdn: false,
});

async function runMigration() {
  console.log(`🚀 Starting idempotent Sanity migration for project [${projectId}], dataset [${dataset}]...`);

  // 1. Site Settings Document
  console.log("📦 Migrating Site Settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    arabicTitle: "الجامعة النصرية الإسلامية واليتيم خانة",
    englishTitle: "Jamia Nesaria Islamia Madrasha & Orphanage",
    establishedYear: "১৯৬৯",
    slogan: "কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার প্রত্যয়।",
    phone: "01716296379",
    emergencyPhone: "01713004929",
    email: "jamianesaria@gmail.com",
    address: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ",
    addressFull: "মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন) টঙ্গী, গাজীপুর, বাংলাদেশ।",
    regSocialWelfare: "ঢ-০৫০৪",
    regBefaq: "১/৭৪৩",
    regHaiatulUlya: "০০৬৮৫",
    facebookUrl: "https://facebook.com",
    youtubeUrl: "https://youtube.com",
  });

  // 2. Homepage Content
  console.log("📦 Migrating Homepage Content...");
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    newsTicker: [
      "নতুন শিক্ষাবর্ষে নূরানী মক্তব, হিফজুল কুরআন ও কিতাব বিভাগে সীমিত আসনে ছাত্র ভর্তি চলছে।",
      "৩১৩ জন বদরি কাফেলা — আজীবন দাতা সদস্য প্রকল্পে শরিক হয়ে সাদাকায়ে জারিয়ার অংশীদার হোন।",
      "সমাজসেবা অনুমোদিত এতিমখানা শাখায় এতিম ও দরিদ্র ছাত্রদের শতভাগ ফ্রি পড়ার সুব্যবস্থা রয়েছে।",
    ],
    heroBadge: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ",
    heroHeadline: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    heroSubheadline: "১৯৬৯ সালে প্রতিষ্ঠিত একটি ঐতিহ্যবাহী দ্বীনি শিক্ষাপ্রতিষ্ঠান। পরিচালনা পরিষদ, সম্মানিত উলামায়ে কেরাম ও শিক্ষক মণ্ডলীর আন্তরিক প্রচেষ্টায় কুরআন-সুন্নাহর আলোকে পরিচালিত।",
    statsTotalStudents: "৮৫০+",
    statsTeachers: "৩৫+",
    statsHafiz: "৪০+",
    statsEstablished: "১৯৬৯",
    principalName: "মাওলানা মুফতি হাবিবুর রহমান",
    principalDesignation: "মুহতামিম ও শিক্ষা সচিব",
    principalMessage: "কুরআনুল কারিমের বিশুদ্ধ শিক্ষা ও ইলমে ওহীর আলোকবর্তিকা প্রজ্বলিত রাখার লক্ষ্যে ১৯৬৯ সাল থেকে জামিয়া নেছারিয়া নিরলস খেদমত করে আসছে। ছাত্রদের চারিত্রিক পরিশুদ্ধি, আমল-আখলাক ও আদর্শ নাগরিক হিসেবে গড়ে তোলাই আমাদের মূল লক্ষ্য।",
    admissionBannerTitle: "আপনার সন্তানের দ্বীনি শিক্ষার যাত্রা শুরু হোক এখান থেকে",
    admissionBannerDesc: "মাদরাসার নূরানী নাজেরা মক্তব, হিফজ ও কিতাব বিভাগে নতুন ছাত্রদের ভর্তি আবেদন গ্রহণ চলছে। সীমিত সংখ্যক শূন্য আসনে মেধা যাচাইয়ের ভিত্তিতে ভর্তি নিশ্চিত করা হবে।",
  });

  // 3. Admission Information
  console.log("📦 Migrating Admission Information...");
  await client.createOrReplace({
    _id: "admissionInfo",
    _type: "admissionInfo",
    sessionName: "২০২৬–২০২৭ খ্রিষ্টাব্দ",
    hijriYear: "১৪৪৭–১৪৪৮ হিজরি",
    status: "open",
    memoNo: "জামিয়া/প্রশা-ভর্তি/২০২৬/১১৮",
    formCollectionTime: "প্রতিদিন সকাল ৯:০০ ঘটিকা হতে আসর পর্যন্ত",
    interviewSchedule: "প্রতি শনি ও মঙ্গলবার সকাল ১০:০০ ঘটিকা",
    circularText: "সর্বসাধারণ অভিভাবক ও শুভানুধ্যায়ীদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী শিক্ষাবর্ষের নূরানী মক্তব, নাজেরা, হিফজুল কুরআন, হিফজ রিভিশন ও কিতাব বিভাগে ছাত্র ভর্তির জন্য আবেদনপত্র গ্রহণ শুরু হয়েছে। সমাজসেবা নিবন্ধিত এতিমখানা বিভাগের আওতায় এতিম ও দরিদ্র ছাত্রদের শতভাগ ফ্রি সুবিধা রয়েছে।",
  });

  // 4. Badri Kafila Project
  console.log("📦 Migrating 313 Badri Kafila Project...");
  await client.createOrReplace({
    _id: "badriKafila",
    _type: "badriKafila",
    title: "৩১৩ জন বদরি কাফেলা — আজীবন দাতা সদস্য প্রকল্প",
    targetSeats: 313,
    enrolledCount: 64,
    theologicalOverview: "হাজারো রহস্যে ঘেরা এই মহাবিশ্বের মহান স্রষ্টা আল্লাহ তাআলা একক ও বিজোড়। বদরের যুদ্ধে অংশগ্রহণকারী সাহাবায়ে কেরামের পবিত্র সংখ্যা ছিল ৩১৩। জামিয়ার সার্বিক উন্নয়ন ও দ্বীনি শিক্ষার প্রসারকে সুদৃঢ় করতে ৩১৩ জন আজীবন দাতার মহতী উদ্যোগ গ্রহণ করা হয়েছে।",
    annualDonationAmount: "৩,০০০",
    monthlyDonationAmount: "২৫০",
    onetimeDonationAmount: "৫০,০০০",
    bkashNumber: "01716296379",
    bankAccountInfo: "হিসাবের নাম: জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা\nব্যাংক: আল-আরাফাহ ইসলামী ব্যাংক লিমিটেড, টঙ্গী শাখা, গাজীপুর।",
  });

  // 5. Notices (10 verified rich notices)
  console.log("📦 Migrating Notices...");
  const notices = [
    {
      id: "not-2026-001",
      title: "নতুন শিক্ষাবর্ষে নূরানী মক্তব, হিফজুল কুরআন ও কিতাব বিভাগে ছাত্র ভর্তি সংক্রান্ত বিজ্ঞপ্তি",
      memo: "জামিয়া/প্রশা-ভর্তি/২০২৬/১১৮",
      category: "admission",
      publishDate: "2026-10-15",
      publishDateBn: "১৫ অক্টোবর ২০২৬",
      isUrgent: true,
      summary: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানায় আগামী শিক্ষাবর্ষের সকল শিক্ষা বিভাগে নতুন ও পুরাতন ছাত্রদের ভর্তি আবেদনপত্র সংগ্রহ ও মৌখিক পরীক্ষার সময়সূচি প্রকাশ করা হলো।",
    },
    {
      id: "not-2026-002",
      title: "বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ ও আল-হাইআতুল উলয়ার কেন্দ্রীয় পরীক্ষার ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি",
      memo: "জামিয়া/পরীক্ষা-কেন্দ্রীয়/২০২৬/০৮৯",
      category: "exam",
      publishDate: "2026-10-12",
      publishDateBn: "১২ অক্টোবর ২০২৬",
      isUrgent: false,
      summary: "আগামী কেন্দ্রীয় পরীক্ষার জন্য তাকমিল (দাওরায়ে হাদিস) ও ফযীলত জামাতের ছাত্রদের নিয়মিত ও অনিয়মিত পরীক্ষার্থীদের রেজিস্ট্রেশন ফি এবং প্রয়োজনীয় কাগজপত্র জমা দেওয়ার বিজ্ঞপ্তি।",
    },
    {
      id: "not-2026-003",
      title: "পবিত্র ঈদুল ফিতর উপলক্ষে মাদরাসার বার্ষিক ছুটি ও ছুটি-পরবর্তী উপস্থিতির নিয়মাবলী",
      memo: "জামিয়া/প্রশা-ছুটি/২০২৬/০৫৬",
      category: "holiday",
      publishDate: "2026-03-25",
      publishDateBn: "২৫ মার্চ ২০২৬",
      isUrgent: false,
      summary: "রমজানুল মুবারক ও পবিত্র ঈদুল ফিতর উপলক্ষে আবাসিক ও অনাবাসিক সকল শিক্ষা বিভাগের সাধারণ ছুটি ঘোষণা এবং হোস্টেল খালি করার নির্দেশিকা।",
    },
    {
      id: "not-2026-004",
      title: "বার্ষিক ইসলামি মহাসম্মেলন ও খতমে বুখারী উপলক্ষে বিশেষ প্রস্তুতি সভা",
      memo: "জামিয়া/প্রশা-অনুষ্ঠান/২০২৬/০৪৭",
      category: "general",
      publishDate: "2026-02-18",
      publishDateBn: "১৮ ফেব্রুয়ারি ২০২৬",
      isUrgent: true,
      summary: "জামিয়ার ঐতিহ্যবাহী বার্ষিক ওয়াজ মাহফিল ও দাওরায়ে হাদিস উত্তীর্ণ হাফেজ-মাওলানাদের দস্তারবন্দী (পাগড়ি প্রদান) সম্মেলন সংক্রান্ত বিজ্ঞপ্তি।",
    },
    {
      id: "not-2026-005",
      title: "হিফজুল কুরআন বিভাগ ও নাজেরা মক্তবের অর্ধ-বার্ষিক পরীক্ষার সময়সূচি প্রকাশ",
      memo: "জামিয়া/পরীক্ষা-অভ্যন্তরীণ/২০২৬/০৩৪",
      category: "routine",
      publishDate: "2026-01-20",
      publishDateBn: "২০ জানুয়ারি ২০২৬",
      isUrgent: false,
      summary: "প্রথম সেমিস্টার ও অর্ধ-বার্ষিক মূল্যায়ন পরীক্ষার সময়সূচি, কক্ষ বিন্যাস এবং তিলাওয়াত পরীক্ষা পদ্ধতি সংক্রান্ত বিস্তারিত ঘোষণা।",
    },
  ];

  for (const n of notices) {
    await client.createOrReplace({
      _id: `notice-${n.id}`,
      _type: "notice",
      title: n.title,
      slug: { _type: "slug", current: n.id },
      memo: n.memo,
      category: n.category,
      publishDate: n.publishDate,
      publishDateBn: n.publishDateBn,
      isUrgent: n.isUrgent,
      summary: n.summary,
    });
  }

  // 6. Academic Departments
  console.log("📦 Migrating Academic Departments...");
  const departments = [
    {
      slug: "maktab",
      title: "নূরানী ও নাজেরা মক্তব বিভাগ",
      arabicTitle: "قسم المكتب النوراني والناظرة",
      badge: "অনাবাসিক ও নূরানি",
      ageRange: "৪ হতে ৭ বছর",
      seatCount: "১২০ টি",
      overview: "সহিহ মাখরাজ ও তাজবিদ সহকারে কুরআনুল কারিমের বিশুদ্ধ তেলাওয়াত শিক্ষা, দৈনন্দিন মাসনুন দোয়া, অযু-নামাজের বাস্তবসম্মত প্রশিক্ষণ এবং বাংলা, ইংরেজি ও গণিত সমন্বিত প্রাথমিক সিলেবাস।",
      features: [
        "সহিহ মাখরাজ ও তাজবিদ সহকারে কুরআনুল কারিমের বিশুদ্ধ তেলাওয়াত শিক্ষা।",
        "দৈনন্দিন মাসনুন দোয়া, অযু ও নামাজের বাস্তবসম্মত প্রশিক্ষণ।",
        "বাংলা, ইংরেজি ও মৌলিক গণিত সমন্বিত প্রাথমিক সিলেবাস।",
        "সুন্দর হস্তাক্ষর ও নৈতিক চরিত্রের সুদৃঢ় ভিত্তি গঠন।",
      ],
      serial: 1,
    },
    {
      slug: "hifz",
      title: "হিফজুল কুরআন বিভাগ",
      arabicTitle: "قسم تحفيظ القرآن الكريم",
      badge: "আন্তর্জাতিক মানসম্পন্ন",
      ageRange: "৮ হতে ১৩ বছর",
      seatCount: "৮০ টি",
      overview: "অভিজ্ঞ হুফ্ফাজ ও ক্বারী সাহেবদের নিবিড় তত্ত্বাবধানে ৩-৪ বছরে সম্পূর্ণ কুরআনুল কারিম হিফজ সম্পন্ন করার আন্তর্জাতিক মানের সার্বক্ষণিক আবাসিক ব্যবস্থা।",
      features: [
        "অভিজ্ঞ আন্তর্জাতিক ক্বারী ও হাফেজ শিক্ষকদের সরাসরি তত্ত্বাবধান।",
        "তাহাজ্জুদের বিশেষ প্রশিক্ষণ ও শেষ রাতে তিলাওয়াতের অভ্যাস গঠন।",
        "সাপ্তাহিক ও মাসিক হিফজ প্রতিযোগিতা ও পর্যালোচনা।",
        "জাতীয় ও আন্তর্জাতিক হিফজ প্রতিযোগিতায় সফল অংশগ্রহণের প্রস্তুতি।",
      ],
      serial: 2,
    },
    {
      slug: "kitab",
      title: "কিতাব বিভাগ (দরসে নেজামি)",
      arabicTitle: "قسم الدراسات الإسلامية والحديث",
      badge: "মিজান হতে দাওরায়ে হাদিস",
      ageRange: "১০ বছর ও তদূর্ধ্ব",
      seatCount: "২০০ টি",
      overview: "কওমী ধারার ঐতিহ্যবাহী দরসে নেজামি পাঠ্যক্রম এবং আধুনিক আরবি ভাষা ও সাহিত্যের জন্য ‘মাদানী নেসাব’ সমন্বয়ে পরিচালিত উচ্চতর ইসলামী শরিয়াহ শিক্ষা বিভাগ।",
      features: [
        "আরবি ভাষায় প্রত্যক্ষ কথোপকথন ও সাহিত্যচর্চা।",
        "সিহাহ সিত্তাহ ও তাফসির শাস্ত্রে প্রাজ্ঞ শায়খুল হাদিসগণের প্রত্যক্ষ পাঠদান।",
        "বেফাক ও আল-হাইআতুল উলয়ার কেন্দ্রীয় মেধা তালিকায় সাফল্যের দীর্ঘ ঐতিহ্য।",
        "সমৃদ্ধ কুতুবখানা (লাইব্রেরি) ও আধুনিক গবেষণার সুযোগ।",
      ],
      serial: 3,
    },
    {
      slug: "orphanage",
      title: "এতিমখানা ও লিল্লাহ বোর্ডিং",
      arabicTitle: "دار الأيتام والإطعام الخيري",
      badge: "সমাজসেবা নিবন্ধন: ঢ-০৫০৪",
      ageRange: "৪ হতে ১২ বছর",
      seatCount: "৬০ টি",
      overview: "সমাজসেবা অধিদপ্তর নিবন্ধিত এতিমখানা বিভাগের আওতায় প্রকৃত এতিম, অসহায় ও দুস্থ ছাত্রদের সম্পূর্ণ বিনামূল্যে থাকা, খাওয়া, পোশাক ও সুচিকিৎসার মাধ্যমে আদর্শ আলেম হিসেবে গড়ে তোলার মানবিক মহাপ্রকল্প।",
      features: [
        "শতভাগ বিনামূল্যে খাদ্য, বাসস্থান ও সুচিকিৎসা সেবা।",
        "ঋতুভিত্তিক পোশাক ও শীতবস্ত্র সরবরাহ।",
        "স্নেহময় পারিবারিক পরিবেশে সুশিক্ষিত চরিত্রবান মানুষ হিসেবে গড়ে তোলা।",
      ],
      serial: 4,
    },
  ];

  for (const dept of departments) {
    await client.createOrReplace({
      _id: `dept-${dept.slug}`,
      _type: "academicDepartment",
      title: dept.title,
      slug: { _type: "slug", current: dept.slug },
      arabicTitle: dept.arabicTitle,
      badge: dept.badge,
      ageRange: dept.ageRange,
      seatCount: dept.seatCount,
      overview: dept.overview,
      features: dept.features,
      serial: dept.serial,
    });
  }

  // 7. Managing Committee (Key Members)
  console.log("📦 Migrating Managing Committee Members...");
  const committee = [
    { serial: 1, name: "আলহাজ মোঃ কবির হোসেন শিমুল", designation: "সভাপতি", mobile: "০১৭১৩০০৪৯২৯", isLandDonor: false },
    { serial: 2, name: "আলহাজ মোঃ সোহেল আহমেদ", designation: "সহ-সভাপতি", mobile: "০১৭১৩০৪০৮৯৯", isLandDonor: false },
    { serial: 3, name: "মোঃ শফিকুল ইসলাম সুমন", designation: "সহ-সভাপতি", mobile: "০১৭১২৯৯৫৪৭৮", isLandDonor: false },
    { serial: 4, name: "আলহাজ মোঃ মনিরুজ্জামান (মনু)", designation: "সেক্রেটারি ও মুতাওয়াল্লী", mobile: "০১৭১৪৩২২২২২", isLandDonor: false },
    { serial: 5, name: "হাজী মোঃ ইসরাইল হোসেন", designation: "কোষাধ্যক্ষ", mobile: "০১৭১৮৭১৬৬২৬", isLandDonor: false },
    { serial: 6, name: "হাজী মোঃ ওসমান গনি", designation: "সহ-সাধারণ সম্পাদক", mobile: "০১৭১৫০২৬৯৯৭", isLandDonor: false },
    { serial: 7, name: "আলহাজ মোঃ মতিউর রহমান (দুদু)", designation: "প্রচার সম্পাদক", mobile: "০১৭১১১০৪৫৬২", isLandDonor: false },
    { serial: 8, name: "হাজী মোঃ রুস্তম আলী মৃধা", designation: "সদস্য", mobile: "০১৭১৭০০৭৯১৬", isLandDonor: false },
    { serial: 9, name: "হাজী মোঃ জি. এম. ফারুক", designation: "সদস্য", mobile: "০১৭১৫২৫৪১১৫", isLandDonor: false },
    { serial: 10, name: "হাজী মোঃ হোসেন আলী শিকদার", designation: "শিক্ষা সম্পাদক", mobile: "০১৭১৬২৯৬৩৭৯", isLandDonor: false },
    // Land Donors
    { serial: 11, name: "মরহুম চান মিয়া", designation: "সম্মানিত জমিদাতা", mobile: "", isLandDonor: true, donorContribution: "প্রতিষ্ঠাকালীন প্রধান জমিদাতা" },
    { serial: 12, name: "আমেনা খাতুন", designation: "সম্মানিত জমিদাতা", mobile: "", isLandDonor: true, donorContribution: "ওয়াকফকৃত জমিদাতা" },
    { serial: 13, name: "সফর বানু", designation: "সম্মানিত জমিদাতা", mobile: "", isLandDonor: true, donorContribution: "ওয়াকফকৃত জমিদাতা" },
  ];

  for (const m of committee) {
    await client.createOrReplace({
      _id: `committee-member-${m.serial}`,
      _type: "committeeMember",
      name: m.name,
      designation: m.designation,
      mobile: m.mobile,
      isLandDonor: m.isLandDonor,
      donorContribution: m.donorContribution || "",
      serial: m.serial,
    });
  }

  // 8. Teachers Directory (Key Faculty)
  console.log("📦 Migrating Teachers Directory...");
  const teachers = [
    { serial: 1, name: "মাওলানা মুফতি হাবিবুর রহমান", designation: "শিক্ষা সচিব ও মুহতামিম", department: "officers", qualification: "দাওরায়ে হাদিস (তাকমিল), ইফতা", mobile: "০১৭১৬২৯৬৩৭৯" },
    { serial: 2, name: "মাওলানা শায়খ আবদুল কুদ্দুস", designation: "শায়খুল হাদিস (বুখারী শরিফ)", department: "bukhari", qualification: "উচ্চতর হাদিস গবেষণা", mobile: "০১৭১৩০০৪৯২৯" },
    { serial: 3, name: "মাওলানা মুফতি নূরুল ইসলাম", designation: "মুহাদ্দিস ও ফতোয়া বিভাগীয় প্রধান", department: "kitab", qualification: "দাওরায়ে হাদিস ও মুফতি", mobile: "০১৭১৪২২৩৩৪৫" },
    { serial: 4, name: "হাফেজ ক্বারী মাওলানা আনোয়ার হোসেন", designation: "হিফজুল কুরআন বিভাগীয় প্রধান", department: "hifz", qualification: "আন্তর্জাতিক তাজবিদ ও হাফেজ", mobile: "০১৭১৫৩৩৪৪৩৩" },
    { serial: 5, name: "মাওলানা মোশাররফ হোসেন", designation: "নূরানী ও নাজেরা প্রধান শিক্ষক", department: "maktab", qualification: "নূরানী বোর্ড সনদপ্রাপ্ত প্রধান প্রশিক্ষক", mobile: "০১৭১৬৪৫৪৩২১" },
    { serial: 6, name: "হাফেজ মোঃ জয়নাল আবেদীন", designation: "নাজেমে দারুল ইকামা (হোস্টেল সুপার)", department: "officers", qualification: "হাফেজে কুরআন", mobile: "০১৭১৭৮৮৭৭৬৬" },
  ];

  for (const t of teachers) {
    await client.createOrReplace({
      _id: `teacher-${t.serial}`,
      _type: "teacher",
      name: t.name,
      designation: t.designation,
      department: t.department,
      qualification: t.qualification,
      mobile: t.mobile,
      serial: t.serial,
    });
  }

  // 9. Class Routine (Sample)
  console.log("📦 Migrating Sample Class Routine...");
  await client.createOrReplace({
    _id: "class-routine-class-1",
    _type: "classRoutine",
    title: "নূরানী ১ম জামাত - দৈনিক পাঠদান রুটিন",
    className: "নূরানী ১ম জামাত",
    academicYear: "২০২৬",
    scheduleRows: [
      { _key: "row-1", period: "১ম ঘণ্টা", time: "সকাল ৮:০০ – ৮:৪৫", subject: "কুরআনুল কারিম (সহিহ মাখরাজ)", teacher: "হাফেজ ক্বারী আনোয়ার", room: "কক্ষ ১০১" },
      { _key: "row-2", period: "২য় ঘণ্টা", time: "সকাল ৮:৪৫ – ৯:৩০", subject: "আরবি কায়দা ও আমপারা", teacher: "মাওলানা মোশাররফ", room: "কক্ষ ১০১" },
      { _key: "row-3", period: "৩য় ঘণ্টা", time: "সকাল ৯:৪৫ – ১০:৩০", subject: "বাংলা ভাষা ও সাহিত্য", teacher: "মাওলানা রফিকুল ইসলাম", room: "কক্ষ ১০১" },
      { _key: "row-4", period: "৪র্থ ঘণ্টা", time: "সকাল ১০:৩০ – ১১:১৫", subject: "ইংরেজি ও সহজ গণিত", teacher: "মাওলানা আসাদুজ্জামান", room: "কক্ষ ১০১" },
      { _key: "row-5", period: "৫ম ঘণ্টা", time: "সকাল ১১:১৫ – ১২:০০", subject: "দৈনন্দিন মাসনুন দোয়া ও আমল", teacher: "মাওলানা জয়নাল", room: "কক্ষ ১০১" },
    ],
  });

  // 10. Exam Routine (Sample)
  console.log("📦 Migrating Sample Exam Routine...");
  await client.createOrReplace({
    _id: "exam-routine-annual-2026",
    _type: "examRoutine",
    title: "বার্ষিক পরীক্ষা সময়সূচি ২০২৬ — নূরানী ও নাজেরা",
    examTerm: "বার্ষিক পরীক্ষা",
    academicYear: "২০২৬",
    className: "নূরানী বিভাগ (সকল জামাত)",
    examRows: [
      { _key: "erow-1", date: "১৫ নভেম্বর ২০২৬", day: "রবিবার", subject: "কুরআন মজিদ মৌখিক (নাজেরা ও তাজবিদ)", time: "সকাল ৯:০০ – ১২:০০", room: "হলরুম ১" },
      { _key: "erow-2", date: "১৭ নভেম্বর ২০২৬", day: "মঙ্গলবার", subject: "মাসনুন দোয়া, আকাঈদ ও ফিকহ", time: "সকাল ৯:০০ – ১২:০০", room: "হলরুম ১" },
      { _key: "erow-3", date: "১৯ নভেম্বর ২০২৬", day: "বৃহস্পতিবার", subject: "বাংলা ও ব্যাকরণ", time: "সকাল ৯:০০ – ১২:০০", room: "হলরুম ১" },
      { _key: "erow-4", date: "২২ নভেম্বর ২০২৬", day: "রবিবার", subject: "গণিত ও জ্যামিতি", time: "সকাল ৯:০০ – ১২:০০", room: "হলরুম ১" },
      { _key: "erow-5", date: "২৪ নভেম্বর ২০২৬", day: "মঙ্গলবার", subject: "ইংরেজি ও হস্তলিপি", time: "সকাল ৯:০০ – ১২:০০", room: "হলরুম ১" },
    ],
    instructions: [
      "পরীক্ষা শুরুর ১৫ মিনিট পূর্বে স্ব-স্ব আসনে উপস্থিত হতে হবে।",
      "প্রবেশপত্র (Admit Card) ছাড়া পরীক্ষায় অংশগ্রহণ করতে দেওয়া হবে না।",
      "পরীক্ষার হলে মোবাইল ফোন বা কোনো ধরনের ইলেকট্রনিক ডিভাইস সম্পূর্ণ নিষিদ্ধ।",
    ],
  });

  console.log("🎉 All core institutional records successfully migrated into Sanity dataset [production]!");
}

runMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

