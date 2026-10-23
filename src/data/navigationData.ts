export interface NavItem {
  label: string;
  shortLabel?: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navigationItems: NavItem[] = [
  { label: "হোম", href: "/" },
  {
    label: "জামিয়া পরিচিতি",
    href: "/about",
    children: [
      { label: "জামিয়ার পরিচয় ও ইতিহাস", href: "/about/history" },
      { label: "প্রতিষ্ঠাতা ও জমিদাতাদের অবদান", href: "/about#founders" },
      { label: "লক্ষ্য, উদ্দেশ্য ও শিক্ষাদর্শন", href: "/about#mission" },
      { label: "মাদরাসার বৈশিষ্ট্যসমূহ", href: "/about#features" },
      { label: "নিবন্ধন পরিচিতি (বোর্ড ও সরকারি)", href: "/about#registration" },
      { label: "ভৌত অবকাঠামো ও ছাত্রাবাস প্রকল্প", href: "/about/infrastructure" },
    ],
  },
  {
    label: "শিক্ষা বিভাগ",
    href: "/academics",
    children: [
      { label: "শিক্ষাব্যবস্থার পরিচিতি", href: "/academics#overview" },
      { label: "১। মক্তব বিভাগ (অনাবাসিক ও নূরানি)", href: "/academics#maktab" },
      { label: "২। হিফজ ও হিফজ রিভিশন বিভাগ", href: "/academics#hifz" },
      { label: "৩। কিতাব বিভাগ (ইবতেদায়ী–তাকমিল)", href: "/academics#kitab" },
      { label: "৪। মাদানি নেসাব বিভাগ", href: "/academics#madani-nisab" },
      { label: "৫। জামিয়ার সিলেবাস ও পাঠ্যবিষয়", href: "/academics#syllabus" },
      { label: "৬। ছাত্র প্রশিক্ষণ বিভাগ", href: "/academics#training" },
      { label: "৭। ভবিষ্যৎ পরিকল্পনা", href: "/academics#future-plans" },
    ],
  },
  {
    label: "পরিচালনা পরিষদ",
    shortLabel: "পরিষদ",
    href: "/committee",
    children: [
      { label: "পরিচালনা পরিষদ (কমিটি)", href: "/committee#committee" },
      { label: "সম্মানিত জমিদাতাগণ", href: "/committee#donors" },
      { label: "আমাদের প্রত্যয়", href: "/committee#pledge" },
    ],
  },
  {
    label: "শিক্ষক মণ্ডলী",
    shortLabel: "শিক্ষকবৃন্দ",
    href: "/teachers",
    children: [
      { label: "বুখারীর বিশেষ দরস প্রদানকারী উলামা", href: "/teachers#bukhari" },
      { label: "মুহাদ্দিস ও কিতাব বিভাগ", href: "/teachers#kitab" },
      { label: "হিফজ ও নাজেরা বিভাগ", href: "/teachers#hifz" },
      { label: "মক্তব বিভাগের শিক্ষকবৃন্দ", href: "/teachers#maktab" },
      { label: "কর্মকর্তা ও শিক্ষকবৃন্দ", href: "/teachers#officers" },
      { label: "জামিয়ার স্টাফবৃন্দ", href: "/teachers#staff" },
    ],
  },
  {
    label: "ভর্তি তথ্য",
    href: "/admission",
    children: [
      { label: "ভর্তি তথ্য ও নির্দেশিকা", href: "/admission" },
      { label: "বিভাগ ও যোগ্যতা", href: "/admission#departments" },
      { label: "বয়স ও শ্রেণি যাচাই", href: "/admission#age-checker" },
      { label: "ভর্তি ফি ও মাসিক খরচ", href: "/admission#fee-calculator" },
      { label: "কাগজপত্রের চেকলিস্ট", href: "/admission#document-checklist" },
      { label: "অনলাইন ভর্তি আবেদন ফরম", href: "/apply" },
      { label: "ভর্তি পরীক্ষার ফলাফল", href: "/results/admission" },
    ],
  },
  {
    label: "পরীক্ষা ও ফলাফল",
    href: "/results/academic",
    children: [
      { label: "পরীক্ষার রুটিন", href: "/exam-routine" },
      { label: "অ্যাকাডেমিক পরীক্ষার ফলাফল", href: "/results/academic" },
      { label: "ভর্তি পরীক্ষার ফলাফল", href: "/results/admission" },
    ],
  },
  {
    label: "নোটিশ ও বিজ্ঞপ্তি",
    href: "/notices",
    children: [
      { label: "নোটিশ বোর্ড (সকল বিজ্ঞপ্তি)", href: "/notices" },
      { label: "ভর্তি সংক্রান্ত বিজ্ঞপ্তি", href: "/notices?category=admission" },
      { label: "পরীক্ষা ও ফলাফল বিজ্ঞপ্তি", href: "/notices?category=exam" },
      { label: "ছুটির তালিকা ও প্রজ্ঞাপন", href: "/notices?category=holiday" },
      { label: "ক্লাস ও অ্যাকাডেমিক রুটিন", href: "/notices?category=routine" },
      { label: "প্রশাসনিক ও সাধারণ নোটিশ", href: "/notices?category=general" },
    ],
  },
  {
    label: "এতিমখানা ও সহযোগিতা",
    shortLabel: "এতিমখানা ও সেবা",
    href: "/orphanage",
    children: [
      { label: "এতিমখানা পরিচিতি", href: "/orphanage#intro" },
      { label: "ছাত্রাবাসের ৪র্থ তলা নির্মাণ প্রকল্প", href: "/orphanage#hostel-construction" },
      { label: "এতিমখানার সরকারি নিবন্ধন", href: "/orphanage#registration" },
      { label: "সহযোগিতার আবেদন ও খাতসমূহ", href: "/orphanage#appeal" },
      { label: "অনুদানের ফান্ড (সাধারণ ও গোরাবা)", href: "/orphanage#funds" },
      { label: "অনুদান পাঠানোর মাধ্যম (বিকাশ ও ব্যাংক)", href: "/orphanage#payment-methods" },
      { label: "যোগাযোগ ও অনুদান নিশ্চিতকরণ", href: "/orphanage#contact" },
    ],
  },
  {
    label: "৩১৩ বদরি কাফেলা",
    shortLabel: "৩১৩ কাফেলা",
    href: "/badri-kafila",
    children: [
      { label: "কাফেলার মূল পরিচিতি", href: "/badri-kafila#intro" },
      { label: "৩১৩ সংখ্যার বরকতময় রহস্য", href: "/badri-kafila#mystery" },
      { label: "কেন এই আয়োজন ও উদ্দেশ্য", href: "/badri-kafila#why" },
      { label: "সদস্যদের প্রতি আহ্বান ও করণীয়", href: "/badri-kafila#rules" },
      { label: "জামিয়ার আধ্যাত্মিক অঙ্গীকার", href: "/badri-kafila#commitments" },
      { label: "অনলাইনে সদস্য আবেদন", href: "/badri-kafila#apply" },
      { label: "আজীবন দাতা সদস্য সনদ", href: "/badri-kafila#certificate" },
    ],
  },
  {
    label: "গ্যালারি",
    href: "/gallery",
    children: [
      { label: "গ্যালারি হাব (সকল ছবি ও ভিডিও)", href: "/gallery" },
      { label: "স্থিরচিত্র গ্যালারি (ছবি)", href: "/gallery?type=photos" },
      { label: "ভিডিও ও ড্রোন ফুটেজ", href: "/gallery?type=videos" },
      { label: "ক্যাম্পাস ও বহুতল ভবন", href: "/gallery?category=campus" },
      { label: "হিফজুল কুরআন বিভাগ", href: "/gallery?category=hifz" },
      { label: "কিতাব বিভাগ ও দারস", href: "/gallery?category=kitab" },
    ],
  },
  { label: "ব্লগ", href: "/blog" },
  { label: "যোগাযোগ", href: "/contact" },
];

export const siteSettings = {
  nameBn: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  nameAr: "الجامعة النثارية الإسلامية تنغي غازي بور بنغلاديش",
  nameEn: "JAMIA NESARIA ISLAMIA MADRASHA & ORPHANAGE",
  sloganBn: "কুরআন-সুন্নাহর আলোকে দ্বীনি শিক্ষা, নৈতিকতা ও আদর্শ মানুষ গড়ার প্রত্যয়ে",
  footerSloganBn: "কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার প্রত্যয়।",
  address: "মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।",
  addressShort: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ",
  established: "১৯৬৯ খ্রিষ্টাব্দ",
  establishedFull: "১৯৬৯ খ্রিষ্টাব্দ | ১৩৭৬ বাংলা | ১৩৮৮ হিজরি",
  regNo: "ঢ-০৫০৪",
  befaqRegNo: "১/৭৪৩",
  haiatulUlyaRegNo: "০০৬৮৫",
  logoUrl: "/jamia-logo-v2.png",
  headerBannerUrl: "/header.jpeg",
  heroBannerUrl: "/prodhan_banner.jpeg",
  applyUrl: "/apply",
  onlineClassUrl: "/online-class",
  appDownloadUrl: "/download-app",
  phone: "01716296379",
  email: "jamianesaria@gmail.com",
  facebookUrl: "https://www.facebook.com/jamianesaria/",
  youtubeUrl: "https://youtube.com",
  mapQuery: "মরকুন, তিস্তাগেট, টঙ্গী, গাজীপুর",
};

