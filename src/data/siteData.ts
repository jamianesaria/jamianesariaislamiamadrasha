// Sanity-ready initial mock data structure
// Once Sanity CMS is hooked up, these can be replaced directly by groq queries!

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
      { label: "জামিয়ার পরিচয় ও ইতিহাস", href: "/about#identity" },
      { label: "প্রতিষ্ঠাতা ও জমিদাতাদের অবদান", href: "/about#founders" },
      { label: "লক্ষ্য, উদ্দেশ্য ও শিক্ষাদর্শন", href: "/about#mission" },
      { label: "মাদরাসার বৈশিষ্ট্যসমূহ", href: "/#features" },
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
    label: "পরিচালনা পরিষদ ও শিক্ষকবৃন্দ",
    shortLabel: "পরিষদ ও শিক্ষক",
    href: "/committee",
  },
  {
    label: "ভর্তি তথ্য",
    href: "/#admission",
    children: [
      { label: "ভর্তি আহ্বান ও নিয়মাবলি", href: "/#admission" },
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
    href: "/#notices",
    children: [
      { label: "নোটিশ বোর্ড", href: "/#notices" },
      { label: "সকল নোটিশ আর্কাইভ", href: "/functions/notices" },
      { label: "ছুটির তালিকা", href: "/functions/holiday" },
      { label: "ক্লাস রুটিন", href: "/functions/class-routine" },
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
    label: "৩১৩ বদলি কাফেলা",
    href: "/#badri-kafila",
  },
  {
    label: "গ্যালারি",
    href: "/#gallery",
    children: [
      { label: "হোমপেজ গ্যালারি", href: "/#gallery" },
      { label: "ফটো গ্যালারি", href: "/gallery/photo" },
      { label: "ভিডিও গ্যালারি", href: "/gallery/video" },
    ],
  },
  { label: "যোগাযোগ", href: "/#contact" },
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
  logoUrl: "/logo.jpg",
  headerBannerUrl: "/header.jpeg",
  heroBannerUrl: "/prodhan_banner.jpeg",
  applyUrl: "/apply",
  onlineClassUrl: "/online-class",
  appDownloadUrl: "/download-app",
  phone: "01716296379",
  email: "jamianesaria@gmail.com",
  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com",
  mapQuery: "মরকুন, তিস্তাগেট, টঙ্গী, গাজীপুর",
};

export const breakingNews = [
  "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানায় মক্তব, হিফজ, হিফজ রিভিশন, কিতাব বিভাগ ও মাদানি নেসাবে ভর্তি চলছে।",
  "কুরআন-সুন্নাহর আলোকে দ্বীনি শিক্ষা, নৈতিকতা ও আদর্শ মানুষ গড়ার প্রত্যয়ে ১৯৬৯ খ্রিষ্টাব্দ (১৩৭৬ বাংলা | ১৩৮৮ হিজরি) থেকে পরিচালিত ঐতিহ্যবাহী দ্বীনি শিক্ষাপ্রতিষ্ঠান।",
  "ভর্তি ও শিক্ষা-সংক্রান্ত যেকোনো তথ্যের জন্য যোগাযোগ করুন: 01716296379 (মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর)।",
];

export const homePageContent = {
  hero: {
    image: "/drone_poster.jpg",
    video: "/drone_shot_of_madrasha.mp4",
    title: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    slogan: "কুরআন-সুন্নাহর আলোকে দ্বীনি শিক্ষা, নৈতিকতা ও আদর্শ মানুষ গড়ার প্রত্যয়ে",
  },
  welcome: {
    title: "আমাদের জামিয়ায় স্বাগতম",
    paragraphs: [
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা একটি দ্বীনি শিক্ষাপ্রতিষ্ঠান, যা ১৯৬৯ খ্রিষ্টাব্দে প্রতিষ্ঠিত হয়েছে। প্রতিষ্ঠালগ্ন থেকে এ প্রতিষ্ঠান ইসলামী শিক্ষার প্রসার, শিক্ষার্থীদের নৈতিক ও চারিত্রিক উন্নয়ন এবং যোগ্য আলেম ও আদর্শ মানুষ গড়ে তোলার লক্ষ্যে কাজ করে যাচ্ছে।",
      "কুরআন-সুন্নাহভিত্তিক শিক্ষা, ইলমে দ্বীনের চর্চা, নেক আমল ও উন্নত আখলাকের সমন্বয়ে শিক্ষার্থীদের জীবন গঠন করাই আমাদের অন্যতম লক্ষ্য। আমরা বিশ্বাস করি, বিশুদ্ধ দ্বীনি জ্ঞান ও সুন্দর চরিত্রের সমন্বয়েই গড়ে ওঠে আদর্শ ব্যক্তি, পরিবার ও সমাজ।",
    ],
    buttonText: "জামিয়ার বিস্তারিত পরিচিতি",
    buttonHref: "/about",
  },
  atAGlance: {
    title: "এক নজরে আমাদের জামিয়া",
    established: "১৯৬৯ খ্রিষ্টাব্দ (১৩৭৬ বাংলা | ১৩৮৮ হিজরি)",
    mutawalli: "মনিরুজ্জামান মনু",
    landDonors: ["১। মরহুম চান মিয়া সাহেব", "২। আমিনা খাতুন", "৩। সফর বানু"],
    president: "কবির হোসেন শিমুল",
    muhtamim: "মুফতি মুখতার হোসাইন",
    academicPrograms: "মক্তব, হিফজ, হিফজ রিভিশন, কিতাব ও মাদানি নেসাব বিভাগ",
    address: "মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন,\nটঙ্গী, গাজীপুর, বাংলাদেশ।",
  },
  missionAndObjectives: {
    title: "আমাদের লক্ষ্য ও উদ্দেশ্য",
    mainGoal:
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার মূল লক্ষ্য হলো আল্লাহ তাআলার সন্তুষ্টি অর্জন এবং কুরআন-সুন্নাহর আলোকে শিক্ষার্থীদের জীবন গঠন করা।",
    objectivesTitle: "আমাদের প্রধান উদ্দেশ্যসমূহ:",
    objectives: [
      "বিশুদ্ধ কুরআন-সুন্নাহভিত্তিক ইসলামী শিক্ষা প্রদান।",
      "ইলম, আমল ও আখলাকের সমন্বয়ে শিক্ষার্থী গড়ে তোলা।",
      "যোগ্য আলেম, দাঈ ও আদর্শ মানুষ তৈরি করা।",
      "শিক্ষার্থীদের নৈতিকতা, শৃঙ্খলা ও মানবিক মূল্যবোধের বিকাশ ঘটানো।",
      "ইসলামী জ্ঞানচর্চা, দাওয়াহ ও দ্বীনি শিক্ষার প্রসারে অবদান রাখা।",
    ],
    buttonText: "লক্ষ্য, উদ্দেশ্য ও শিক্ষাদর্শন বিস্তারিত",
    buttonHref: "/about#mission",
  },
  departments: {
    title: "আমাদের শিক্ষা বিভাগসমূহ",
    items: [
      {
        id: "maktab",
        name: "মক্তব বিভাগ",
        image: "/hifz_bibhag.jpeg",
        description:
          "শিশুদের প্রাথমিক দ্বীনি শিক্ষা, আরবি বর্ণপরিচয়, কুরআন পাঠ, নামাজ ও প্রয়োজনীয় দোয়া-দরুদ এবং ১ম–৩য় শ্রেণি পর্যন্ত বাংলা, অঙ্ক ও ইংরেজি শেখানোর ব্যবস্থা।",
        badge: "অনাবাসিক ও আবাসিক নূরানি",
        href: "/academics#maktab",
      },
      {
        id: "hifz",
        name: "হিফজ বিভাগ",
        image: "/hifz_bibhag.jpeg",
        description:
          "সুদক্ষ হাফেজ সাহেবদের সার্বক্ষণিক তত্ত্বাবধানে অনূর্ধ্ব তিন বছরে পবিত্র কুরআনুল কারিম মুখস্থকরণ এবং শুদ্ধ তিলাওয়াত ও জরুরি মাসআলা প্রশিক্ষণ।",
        badge: "তাহফিজুল কুরআন",
        href: "/academics#hifz",
      },
      {
        id: "hifz-revision",
        name: "হিফজ রিভিশন বিভাগ",
        image: "/hifz_revision_bibhag.jpeg",
        description:
          "হিফজ সম্পন্নকারী শিক্ষার্থীদের পবিত্র কুরআন পূর্ণরূপে পুনরাবৃত্তি, নির্ভুল ইয়াদ ও শ্রুতিমধুর তেলাওয়াতের মাধ্যমে আন্তর্জাতিক মানের হাফেজ হিসেবে গড়ে তোলা।",
        badge: "ইয়াদ ও মানোন্নয়ন",
        href: "/academics#hifz",
      },
      {
        id: "kitab",
        name: "কিতাব বিভাগ",
        image: "/kitab_bibhag.jpeg",
        description:
          "ইবতেদায়ী (৪র্থ শ্রেণি) থেকে দাওরায়ে হাদিস (মাস্টার্স/এম.এ. সমমান) পর্যন্ত ইসলামী ও সাধারণ শিক্ষার সমন্বয়ে ধারাবাহিক পাঠদান।",
        badge: "ইবতেদায়ী থেকে দাওরায়ে হাদিস",
        href: "/academics#kitab",
      },
      {
        id: "madani-nisab",
        name: "মাদানি নেসাব",
        image: "/kitab_bibhag.jpeg",
        description:
          "মাদানি নেসাব ও কাদিম নেসাবের সমন্বিত সিলেবাসে আরবি ভাষা পঠন, লিখন, কথোপকথন, অনুবাদ ও সরাসরি আরবি কিতাব অনুধাবনের বিশেষ বিভাগ।",
        badge: "১ম, ২য় ও ৩য় বর্ষ",
        href: "/academics#madani-nisab",
      },
    ],
    buttonText: "সকল শিক্ষা বিভাগ ও পাঠ্যক্রম বিস্তারিত দেখুন",
    buttonHref: "/academics",
  },
  madrasaFeatures: {
    title: "মাদরাসার বৈশিষ্ট্য",
    subtitle:
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা মানসম্মত দ্বীনি শিক্ষা, শিক্ষার্থীদের মেধা ও যোগ্যতা বিকাশ এবং আদর্শ চরিত্র গঠনের লক্ষ্যে বিভিন্ন কার্যক্রম পরিচালনা করে থাকে।",
    items: [
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
      {
        id: "moral-events",
        title: "জীবন গঠনমূলক অনুষ্ঠান",
        description:
          "বুজুর্গ ওলামায়ে কেরামকে আমন্ত্রণের মাধ্যমে বিভিন্ন সময়ে ইসলামী শিক্ষা, নৈতিকতা, আত্মশুদ্ধি ও জীবন গঠনমূলক অনুষ্ঠানমালার আয়োজন।",
      },
      {
        id: "food",
        title: "স্বাস্থ্যসম্মত খাবার",
        description:
          "আবাসিক শিক্ষার্থীদের জন্য তিনবেলা স্বাস্থ্যসম্মত, উন্নতমানের ও রুচিকর খাবার পরিবেশনের ব্যবস্থা।",
      },
      {
        id: "building",
        title: "নিজস্ব ভবনে পাঠদান ও আবাসন",
        description:
          "মাদরাসার নিজস্ব ভবনে পাঠদান ও শিক্ষার্থীদের আবাসনের ব্যবস্থা।",
      },
      {
        id: "environment",
        title: "নিরাপদ ও মনোরম পরিবেশ",
        description:
          "নিরাপদ, সুরক্ষিত ও মনোরম পরিবেশে ইলমে দ্বীন শিক্ষার ব্যবস্থা এবং শিক্ষার্থীদের আদর্শ চরিত্র গঠনের উপযোগী পরিবেশ নিশ্চিত করার প্রচেষ্টা।",
      },
    ],
  },
  curriculum: {
    title: "পাঠ্যক্রম ও শিক্ষা কার্যক্রম",
    subtitle: "দ্বীনি জ্ঞান ও নৈতিক চরিত্র গঠনের সমন্বয়",
    paragraphs: [
      "আমাদের পাঠ্যক্রমে কুরআন মাজিদ, হাদিসে নববী, তাফসির, ফিকহ, আকাইদ, আখলাক, সীরাত, আরবি ভাষা ও সাহিত্যসহ বিভিন্ন গুরুত্বপূর্ণ বিষয় অন্তর্ভুক্ত রয়েছে। শিক্ষার্থীদের প্রয়োজন অনুযায়ী বাংলা, ইংরেজি ও সাধারণ শিক্ষার প্রতিও গুরুত্ব দেওয়া হয়।",
      "আমাদের উদ্দেশ্য শুধু পাঠ্যজ্ঞান প্রদান নয়; বরং শিক্ষার্থীদের চিন্তাশক্তি, ভাষাগত দক্ষতা, আদব-আখলাক ও দায়িত্বশীলতা বিকাশের মাধ্যমে আদর্শ জীবন গঠনে সহায়তা করা।",
    ],
    subjects: [
      "কুরআন মাজিদ",
      "হাদিসে নববী",
      "তাফসির",
      "ফিকহ",
      "আকাইদ",
      "আখলাক",
      "সীরাত",
      "আরবি ভাষা ও সাহিত্য",
      "বাংলা, ইংরেজি ও সাধারণ শিক্ষা",
    ],
    buttonText: "পূর্ণাঙ্গ সিলেবাস ও পাঠ্যবিষয় দেখুন",
    buttonHref: "/academics#syllabus",
  },
  studentTraining: {
    title: "ছাত্র প্রশিক্ষণ ও সহশিক্ষা কার্যক্রম",
    items: [
      {
        title: "আল বালাগ ছাত্র পাঠাগার",
        description: "পাঠাভ্যাস, জ্ঞানচর্চা ও বই পড়ার আগ্রহ বৃদ্ধি।",
      },
      {
        title: "বক্তৃতা প্রশিক্ষণ মজলিস",
        description: "বক্তৃতা, বক্তব্য উপস্থাপন ও দাওয়াহর দক্ষতা বিকাশ।",
      },
      {
        title: "দেয়াল পত্রিকা—আল বালাগ",
        description: "লেখালেখি, সাহিত্যচর্চা ও সৃজনশীল প্রতিভার বিকাশ।",
      },
      {
        title: "দ্বীনি তারবিয়াত",
        description: "আদব, আখলাক, শৃঙ্খলা ও নৈতিকতার অনুশীলন।",
      },
    ],
    buttonText: "ছাত্র প্রশিক্ষণ ও ভবিষ্যৎ পরিকল্পনা দেখুন",
    buttonHref: "/academics#training",
  },
  orphanageSupport: {
    title: "এতিমখানা ও সহযোগিতা",
    subtitle: "সুবিধাবঞ্চিত ও এতিম শিক্ষার্থীদের দ্বীনি শিক্ষা ও কল্যাণমূলক কার্যক্রম",
    description:
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার একটি বিশেষ ও গুরুত্বপূর্ণ শাখা হলো এতিমখানা বিভাগ। এ বিভাগের মাধ্যমে এতিম, গরিব ও অসহায় শিক্ষার্থীদের দ্বীনি শিক্ষার পাশাপাশি থাকা-খাওয়া, পোশাক, চিকিৎসা ও অন্যান্য প্রয়োজন পূরণে সহযোগিতা করা হয়। এতিম শিক্ষার্থীদের শিক্ষা অব্যাহত রাখা এবং তাদের সুন্দর ভবিষ্যৎ গড়ার লক্ষ্যে আপনাদের আন্তরিক সহযোগিতা একান্তভাবে কাম্য।",
    buttons: [
      {
        label: "এতিমখানার পরিচিতি ও নিবন্ধন",
        href: "/orphanage#intro",
      },
      {
        label: "অনুদান পাঠানোর মাধ্যম ও ব্যাংক হিসাব",
        href: "/orphanage#payment-methods",
      },
    ],
    image: "/hifz_bibhag.jpeg",
    imageCaption: "জামিয়া নেছারিয়া ইসলামিয়া এতিমখানা ও হিফজুল কুরআন বিভাগের শিক্ষার্থী ও দারস",
    supportPillars: [
      {
        title: "লিল্লাহ বোর্ডিং ও অন্নসংস্থান",
        desc: "এতিম ও অসচ্ছল শিক্ষার্থীদের প্রতিদিনের তিনবেলা স্বাস্থ্যসম্মত পুষ্টিকর খাদ্য পরিবেশন।",
      },
      {
        title: "বস্ত্র ও শিক্ষা উপকরণ বিতরণ",
        desc: "কুরআন মাজিদ, কিতাব, খাতা-কলম ও পোশাকসহ যাবতীয় শিক্ষা উপকরণ প্রদান।",
      },
      {
        title: "চিকিৎসা ও সার্বিক পরিচর্যা",
        desc: "শিক্ষার্থীদের শারীরিক সুস্থতা রক্ষা, নিয়মিত স্বাস্থ্য পরীক্ষা ও জরুরি চিকিৎসা সেবা।",
      },
      {
        title: "সদকাহ ও কল্যাণমূলক অনুদান",
        desc: "যাকাত, ফেতরা, কাফফারা, ফিদইয়া, মান্নত ও কোরবানির চামড়া দ্বারা এতিমদের কল্যাণ নিশ্চিতকরণ।",
      },
    ],
  },
  badriKafila: {
    id: "badri-kafila",
    title: "৩১৩ বদরি কাফেলা",
    badge: "বিশেষ দ্বীনি প্রজেক্ট",
    subtitle: "ঐতিহাসিক বদর প্রান্তরের ৩১৩ জন সম্মানিত সাহাবির পুণ্য স্মরণে এতিম ও দ্বীনি শিক্ষার স্থায়ী অভিভাবকত্ব",
    description:
      "ঐতিহাসিক বদর প্রান্তরের ৩১৩ জন বীর মুজাহিদ সাহাবায়ে কেরামের পুণ্য স্মৃতিকে ধারণ করে জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার লিল্লাহ বোর্ডিং ও এতিম শিক্ষার্থীদের নিয়মিত থাকা-খাওয়া ও দ্বীনি শিক্ষার পথ সুগম রাখতে গঠিত হয়েছে '৩১৩ বদরি কাফেলা'। ৩১৩ জন নিষ্ঠাবান দ্বীনদরদী শুভাকাঙ্ক্ষী নিয়মিত মাসিক/বার্ষিক সহযোগিতার মাধ্যমে এই কাফেলার সদস্য হয়ে এতিম শিশুদের সার্বিক অভিভাবকত্ব গ্রহণ করেন। আপনিও এই কাফেলার গর্বিত সদস্য হয়ে গ্রহণ করতে পারেন সদকায়ে জারিয়ার অফুরন্ত সওয়াব।",
    points: [
      "৩১৩ জন নির্বাচিত নিবেদিতপ্রাণ দাতা ও পৃষ্ঠপোষক সদস্যের সমন্বয়",
      "লিল্লাহ বোর্ডিংয়ের এতিম শিক্ষার্থীদের নিয়মিত খাদ্য ও বস্ত্রের দায়িত্ব গ্রহণ",
      "মাদরাসার বিশেষ খতমে কুরআন ও দোয়া মাহফিলে সম্মানিত সদস্যদের জন্য খাস মোনাজাত",
    ],
    targetNumber: "৩১৩",
    targetLabel: "সম্মানিত বদরি সদস্য",
    targetDesc: "প্রতিটি সদস্যের নিয়মিত হাদিয়ায় নিশ্চিত হয় এতিম শিশুদের পুষ্টিকর খাবার ও বিশুদ্ধ দ্বীনি শিক্ষা।",
    buttons: [
      {
        label: "কাফেলায় যুক্ত হোন",
        href: "/contact",
      },
      {
        label: "সদস্য ফরম ও বিস্তারিত",
        href: "/contact",
      },
    ],
  },
  hostelProject: {
    id: "hostel-project",
    title: "ছাত্রাবাসের চতুর্থ তলা নির্মাণ প্রকল্প",
    badge: "চলমান অবকাঠামো সম্প্রসারণ প্রকল্প",
    image: "/prodhan_banner.jpeg",
    imageCaption: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার ছাত্রাবাস ও একাডেমিক ভবন",
    motto: "একটি সুন্দর আবাসন, শিক্ষার্থীদের জন্য সুন্দর ভবিষ্যৎ।",
    shortInfo:
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার শিক্ষার্থীদের আবাসনব্যবস্থা আরও উন্নত করার লক্ষ্যে বর্তমানে বিদ্যমান তিনতলা ছাত্রাবাস ভবনটি চতুর্থ তলা পর্যন্ত সম্প্রসারণ করা বিশেষভাবে প্রয়োজন।",
    appeal: "একটি সুন্দর আবাসন, শিক্ষার্থীদের জন্য সুন্দর ভবিষ্যৎ — ছাত্রাবাসের চতুর্থ তলা নির্মাণে এগিয়ে আসুন",
    description:
      "শিক্ষার্থীদের আবাসনের চাহিদা পূরণ এবং তাদের থাকা ও পড়াশোনার পরিবেশ উন্নত করার জন্য এ নির্মাণ প্রকল্প গুরুত্বপূর্ণ। প্রকল্পটি বাস্তবায়িত হলে শিক্ষার্থীদের আবাসনের সুযোগ বৃদ্ধি পাবে এবং তাদের দৈনন্দিন জীবনযাপনে সহায়ক পরিবেশ গড়ে তোলা সম্ভব হবে, ইনশাআল্লাহ।",
    points: [
      "বিদ্যমান তিনতলা ছাত্রাবাস ভবনকে চতুর্থ তলা পর্যন্ত সম্প্রসারণ",
      "শিক্ষার্থীদের আবাসনের চাহিদা পূরণ ও উন্নত পরিবেশ নিশ্চিতকরণ",
      "সদকায়ে জারিয়ার মাধ্যমে চিরস্থায়ী পুণ্য ও আখেরাতের পাথেয় অর্জন",
    ],
    buttonText: "নির্মাণ প্রকল্পের বিস্তারিত ও অনুদান পদ্ধতি",
    buttonHref: "/orphanage#hostel-construction",
  },
  notices: {
    title: "নোটিশ ও বিজ্ঞপ্তি",
    subtitle: "মাদরাসার গুরুত্বপূর্ণ ঘোষণা ও সর্বশেষ তথ্য এই অংশে প্রকাশ করা হবে।",
    categories: [
      "ভর্তি বিজ্ঞপ্তি",
      "পরীক্ষা ও ফলাফল",
      "শিক্ষাবর্ষ ও ছুটির বিজ্ঞপ্তি",
      "অনুষ্ঠান ও বিশেষ কার্যক্রমের ঘোষণা",
    ],
    emptyMessage: "বর্তমানে কোনো নতুন বিজ্ঞপ্তি নেই।",
  },
  gallery: {
    title: "আমাদের গ্যালারি",
    subtitle:
      "মাদরাসার বাস্তব কার্যক্রম, মনোরম পরিবেশ ও বিভিন্ন দ্বীনি আয়োজনের চিত্রমালা:",
    categories: [
      {
        id: "campus",
        title: "ক্যাম্পাস ও ভবন",
        image: "/prodhan_banner.jpeg",
        caption: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার মূল ক্যাম্পাস ও একাডেমিক ভবন",
      },
      {
        id: "classroom",
        title: "পাঠদান কার্যক্রম",
        image: "/kitab_bibhag.jpeg",
        caption: "মনোরম ও সুশৃঙ্খল পরিবেশে বিজ্ঞ শিক্ষকমণ্ডলীর নিয়মিত পাঠদান",
      },
      {
        id: "hifz",
        title: "হিফজ বিভাগ",
        image: "/hifz_bibhag.jpeg",
        caption: "দক্ষ হাফেজে কুরআন শিক্ষকদের নিবিড় তত্ত্বাবধানে হিফজুল কুরআনের দারস",
      },
      {
        id: "events-awards",
        title: "অনুষ্ঠান ও পুরস্কার বিতরণী",
        image: "/hifz_revision_bibhag.jpeg",
        caption: "বার্ষিক প্রতিযোগিতা, মেধা মূল্যায়ন ও বিশেষ দোয়া মাহফিলের আয়োজন",
      },
    ],
    items: [
      {
        id: "img-campus-1",
        categoryId: "campus",
        categoryTitle: "ক্যাম্পাস ও ভবন",
        title: "ক্যাম্পাস ও বহুতল ভবন",
        image: "/prodhan_banner.jpeg",
        caption: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার মূল ক্যাম্পাস ও বহুতল একাডেমিক ভবন",
      },
      {
        id: "img-classroom-1",
        categoryId: "classroom",
        categoryTitle: "পাঠদান কার্যক্রম",
        title: "শ্রেণিকক্ষে নিয়মিত পাঠদান",
        image: "/kitab_bibhag.jpeg",
        caption: "সুশৃঙ্খল পরিবেশে বিজ্ঞ শিক্ষকমণ্ডলীর পাঠদান ও দ্বীনি শিক্ষা চর্চা",
      },
      {
        id: "img-hifz-1",
        categoryId: "hifz",
        categoryTitle: "হিফজ বিভাগ",
        title: "হিফজুল কুরআন বিভাগ",
        image: "/hifz_bibhag.jpeg",
        caption: "দক্ষ হাফেজ শিক্ষকদের তত্ত্বাবধানে শিক্ষার্থীদের পবিত্র কুরআন মুখস্থকরণ",
      },
      {
        id: "img-events-1",
        categoryId: "events-awards",
        categoryTitle: "অনুষ্ঠান ও পুরস্কার বিতরণী",
        title: "পুরস্কার বিতরণী ও বিশেষ আয়োজন",
        image: "/hifz_revision_bibhag.jpeg",
        caption: "বার্ষিক প্রতিযোগিতা, পুরস্কার বিতরণী ও বিশেষ দোয়া মাহফিলের চিত্রমালা",
      },
      {
        id: "img-hifz-2",
        categoryId: "hifz",
        categoryTitle: "হিফজ বিভাগ",
        title: "হিফজ রিভিশন ও বিশেষ মশক",
        image: "/hifz_revision_bibhag.jpeg",
        caption: "হিফজ সম্পন্নকারী শিক্ষার্থীদের পুনরাবৃত্তি ও স্মৃতিশক্তি দৃঢ়করণ",
      },
      {
        id: "img-classroom-2",
        categoryId: "classroom",
        categoryTitle: "পাঠদান কার্যক্রম",
        title: "কিতাব বিভাগের দারস",
        image: "/kitab_bibhag.jpeg",
        caption: "তাফসির, হাদিস ও আরবি ভাষা-সাহিত্যের উচ্চতর পাঠদান কার্যক্রম",
      },
    ],
  },
  admissionCall: {
    title: "ভর্তি আহ্বান",
    headline: "আপনার সন্তানের দ্বীনি শিক্ষার যাত্রা শুরু হোক এখান থেকে",
    description:
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার শিক্ষা বিভাগ, ভর্তি-সংক্রান্ত নিয়মাবলি ও প্রয়োজনীয় তথ্য জানতে আমাদের সঙ্গে যোগাযোগ করুন।",
    note: "ভর্তির সময়, যোগ্যতা, প্রয়োজনীয় কাগজপত্র ও ফি সম্পর্কে তথ্য এখানে যুক্ত করা হবে।",
    highlights: [
      { label: "ভর্তির সময়", desc: "নির্ধারিত শিক্ষাবর্ষের শুরুতে ও আসন খালি থাকা সাপেক্ষে" },
      { label: "যোগ্যতা", desc: "বিভাগ অনুযায়ী বয়স ও প্রাথমিক পাঠ যাচাই" },
      { label: "প্রয়োজনীয় কাগজপত্র", desc: "জন্মনিবন্ধন সনদ, ছবি ও অভিভাবকের জাতীয় পরিচয়পত্র" },
      { label: "ভর্তি ও মাসিক ফি", desc: "অতি স্বল্প ব্যয়ে ও এতিম-অসহায় শিক্ষার্থীদের বিশেষ সুবিধা" },
    ],
  },
  contact: {
    title: "যোগাযোগ",
    addressLabel: "ঠিকানা",
    addressValue: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ",
    addressFull: "মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন) টঙ্গী, গাজীপুর, বাংলাদেশ।",
    phoneLabel: "মোবাইল নম্বর",
    phoneValue: "01716296379",
    emailLabel: "ই-মেইল",
    emailValue: "jamianesaria@gmail.com",
  },
  footer: {
    title: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    slogan: "কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার প্রত্যয়।",
    links: [
      { label: "জামিয়া পরিচিতি", href: "/about" },
      { label: "শিক্ষা বিভাগ ও পাঠ্যক্রম", href: "/academics" },
      { label: "ভবিষ্যৎ শিক্ষা পরিকল্পনা", href: "/academics#future-plans" },
      { label: "এতিমখানা ও সহযোগিতা", href: "/orphanage" },
      { label: "ছাত্রাবাসের ৪র্থ তলা নির্মাণ", href: "/orphanage#hostel-construction" },
      { label: "ভর্তি তথ্য", href: "/#admission" },
      { label: "নোটিশ ও বিজ্ঞপ্তি", href: "/#notices" },
      { label: "যোগাযোগ", href: "/#contact" },
    ],
    copyright: "© জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা। সর্বস্বত্ব সংরক্ষিত।",
  },
};

export const noticeBoard = [
  {
    id: 1,
    title: "নতুন শিক্ষাবর্ষে ভর্তির আবেদনপত্র সংগ্রহ ও জমাদানের শেষ তারিখ",
    date: "১৫ অক্টোবর ২০২৪",
    link: "/notices/1",
  },
  {
    id: 2,
    title: "হিফজুল কুরআন বিভাগের সাময়িক পরীক্ষার রুটিন প্রকাশ সংক্রান্ত বিজ্ঞপ্তি",
    date: "১২ অক্টোবর ২০২৪",
    link: "/notices/2",
  },
  {
    id: 3,
    title: "অভিভাবক সমাবেশ ও বিশেষ পরামর্শ সভা সংক্রান্ত জরুরি নোটিশ",
    date: "০৮ অক্টোবর ২০২৪",
    link: "/notices/3",
  },
  {
    id: 4,
    title: "পড়া ঠিকমত না পারলে তাকে উৎসাহিত করুন ও শিক্ষকদের পরামর্শ নিন",
    date: "০৫ অক্টোবর ২০২৪",
    link: "/notices/4",
  },
];

export const teachingMethodology = {
  title: "শিক্ষাদান পদ্ধতি",
  points: [
    "১। ক্লাসরুমে পাঠদান এবং আদায়করণ।",
    "২। প্রতিদিনের পড়া ডায়রিতে লিখে অভিভাবকের কাছে প্রেরণ করা।",
    "৩। কায়দা, আমপারা, কুরআনের কারণে জেনারেল ক্লাসের কোন প্রকার ক্ষতি না হওয়া এবং জেনারেল ক্লাসের জন্য কুরআন ক্লাসের কোন ক্ষতি না হওয়া।",
    "৪। আমাদের নিজস্ব সিলেবাস এবং রুটিনে পাঠদান করা।",
    "৫। সাপ্তাহিক পরীক্ষা।",
  ],
  link: "/teaching-methods",
};

export const infoCardsData = [
  {
    title: "মাদ্রাসা সম্পর্কিত তথ্য",
    type: "madrasa",
    links: [
      { label: "ভর্তির নীতি", href: "/admission-policy" },
      { label: "ইভেন্ট সিডিউল", href: "/events" },
      { label: "Notice", href: "/functions/notices" },
      { label: "যোগাযোগ", href: "/contact" },
    ],
  },
  {
    title: "শিক্ষার্থীদের তথ্য",
    type: "students",
    links: [
      { label: "শিক্ষার্থীর তালিকা", href: "/students-list" },
      { label: "প্রাক্তন শিক্ষার্থী", href: "/alumni" },
    ],
  },
  {
    title: "শিক্ষকমণ্ডলীর তথ্যাবলী",
    type: "teachers",
    links: [
      { label: "শিক্ষকমণ্ডলী", href: "/teachers" },
      { label: "কর্মকর্তা ও কর্মচারী", href: "/staff" },
    ],
  },
  {
    title: "অন্যান্য তথ্যাবলী",
    type: "others",
    links: [
      { label: "ইভেন্ট সিডিউল", href: "/events" },
      { label: "বার্ষিক ক্যালেন্ডার", href: "/calendar" },
    ],
  },
];

export const downloadCornerLinks = [
  { label: "অনলাইন ভর্তি", href: "/admission" },
  { label: "ভর্তি ফরম ডাউনলোড", href: "/download/admission-form.pdf" },
  { label: "সিলেবাস ডাউনলোড", href: "/download/syllabus.pdf" },
  { label: "প্রসপেক্টাস", href: "/download/prospectus.pdf" },
];

export const importantLinks = [
  { label: "সর্বাধিক গুরুত্বপূর্ণ", href: "/important" },
  { label: "শিক্ষা বোর্ডসমূহ", href: "/education-boards" },
  { label: "লেখাপড়া অনলাইন", href: "/online-study" },
];

export const visitorStats = {
  allTimeVisitors: 58607,
  totalHits: 209451,
  todayVisitors: 2,
  todayHits: 3,
};

export const recentVideos = [
  {
    id: 1,
    title: "সুরা লুকমানের শেষ ৩ আয়াতের তাফসির ও বিশেষ নসিহত",
    thumbnail: "https://images.unsplash.com/photo-1584281722573-ef8876483507?auto=format&fit=crop&q=80&w=400",
    videoUrl: "https://www.youtube.com",
    date: "১৫ অক্টোবর ২০২৪",
  },
  {
    id: 2,
    title: "হিফজুল কুরআন প্রতিযোগিতা ও পুরস্কার বিতরণী অনুষ্ঠান",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400",
    videoUrl: "https://www.youtube.com",
    date: "১০ অক্টোবর ২০২৪",
  },
];

export const recentEvents = [
  {
    id: 1,
    title: "বার্ষিক ইসলামিক সম্মেলন ও দোয়া মাহফিল ২০২৪",
    date: "২৫ অক্টোবর ২০২৪",
    location: "মাদ্রাসা প্রাঙ্গণ, মরকুন, টঙ্গী",
    link: "/events/1",
  },
  {
    id: 2,
    title: "নতুন শিক্ষাবর্ষের অভিভাবক সমাবেশ ও পরামর্শ সভা",
    date: "২০ অক্টোবর ২০২৪",
    location: "মাদ্রাসা অডিটোরিয়াম",
    link: "/events/2",
  },
];

// Events List for /functions/event-list
export interface EventItem {
  id: number;
  photo?: string;
  eventName: string;
  dateTime: string;
  venue?: string;
  description?: string;
}

export const eventListTableData: EventItem[] = [
  {
    id: 1,
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150",
    eventName: "বার্ষিক ইসলামিক সম্মেলন ও পুরস্কার বিতরণী অনুষ্ঠান ২০২৪",
    dateTime: "25 Oct 2024, 09:30 AM",
    venue: "মাদ্রাসা প্রাঙ্গণ, মরকুন, টঙ্গী",
    description: "বিশেষ অতিথি হিসেবে উপস্থিত থাকবেন দেশবরেণ্য ওলামায়ে কেরাম।",
  },
  {
    id: 2,
    photo: "https://images.unsplash.com/photo-1584281722573-ef8876483507?auto=format&fit=crop&q=80&w=150",
    eventName: "হিফজুল কুরআন প্রতিযোগিতা ও বিশেষ দোয়া মাহফিল",
    dateTime: "18 Oct 2024, 10:00 AM",
    venue: "মাদ্রাসা কেন্দ্রীয় মসজিদ হল",
    description: "হিফজ বিভাগের ছাত্রদের অংশগ্রহণে প্রতিযোগিতা।",
  },
  {
    id: 3,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    eventName: "অভিভাবক সমাবেশ ও পরামর্শ সভা (নতুন শিক্ষাবর্ষ)",
    dateTime: "10 Oct 2024, 03:30 PM",
    venue: "অডিটোরিয়াম",
    description: "শিক্ষার্থীদের অগ্রগতি বিষয়ক অভিভাবক মতবিনিময়।",
  },
  {
    id: 4,
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150",
    eventName: "সিরাতুন্নবী (সা.) উদযাপন ও আলোচনা সভা",
    dateTime: "02 Oct 2024, 02:00 PM",
    venue: "মাদ্রাসা প্রাঙ্গণ",
    description: "প্রিয় নবী (সা.) এর জীবন ও আদর্শ শীর্ষক আলোচনা।",
  },
];

// Notices List for /functions/notices
export interface NoticeItem {
  id: number;
  title: string;
  dateTime: string;
  pdfUrl?: string;
  details?: string;
}

export const noticeListTableData: NoticeItem[] = [
  {
    id: 1,
    title: "প্রিয় অভিভাবক, আপনার সন্তানের নিয়মিত উপস্থিতি নিশ্চয় করুন।",
    dateTime: "08 - Jul - 2026",
    pdfUrl: "/documents/notice-1.pdf",
    details: "শিক্ষার্থীদের নিয়মিত ক্লাসে উপস্থিতি নিশ্চিত করতে সকল সম্মানিত অভিভাবকদের বিশেষ অনুরোধ করা হচ্ছে।",
  },
  {
    id: 2,
    title: "অনুগ্রহ করে নিয়মিত আপনার সন্তানের ক্লাসের বাসার পড়া তদারকি করুন। পড়া ঠিকমত না পারলে তাকে শিখতে ও অনুশীলন করতে সাহায্য করুন।",
    dateTime: "08 - Jul - 2026",
    pdfUrl: "/documents/notice-2.pdf",
    details: "বাসার পড়া নিয়মিত সম্পন্ন না হলে ক্লাসে পিছিয়ে পড়ার সম্ভাবনা থাকে।",
  },
  {
    id: 3,
    title: "প্রিয় অভিভাবক আপনার সন্তানের পড়াশুনার প্রতি মনোযোগ দিন।",
    dateTime: "08 - Jul - 2026",
    pdfUrl: "/documents/notice-3.pdf",
    details: "সাময়িক পরীক্ষার প্রস্তুতি গ্রহণের নিমিত্তে শিক্ষার্থীদের পড়াশোনায় বিশেষ মনোযোগ দেওয়ার আহ্বান জানানো হচ্ছে।",
  },
];

// Holidays List for /functions/holiday
export interface HolidayItem {
  id: number;
  title: string;
  dateTime: string;
  description?: string;
}

export const holidayListTableData: HolidayItem[] = [
  {
    id: 1,
    title: "শবে বরাত উপলক্ষে",
    dateTime: "04 - Feb - 2026 To 04 - Feb - 2026",
    description: "পবিত্র শবে বরাত উপলক্ষে মাদ্রাসার সকল শ্রেণির পাঠদান কার্যক্রম বন্ধ থাকবে।",
  },
  {
    id: 2,
    title: "রমজানুল মোবারক ও পবিত্র ঈদুল ফিতর উপলক্ষে",
    dateTime: "15 - Mar - 2026 To 10 - Apr - 2026",
    description: "পবিত্র মাহে রমজান এবং ঈদুল ফিতর উপলক্ষে নির্ধারিত ছুটি কার্যকর থাকবে।",
  },
  {
    id: 3,
    title: "পবিত্র ঈদুল আজহা উপলক্ষে ছুটি",
    dateTime: "01 - Jun - 2026 To 12 - Jun - 2026",
    description: "পবিত্র ঈদুল আজহা ও কোরবানির আনুষ্ঠানিকতা উপলক্ষে মাদ্রাসা বন্ধ থাকবে।",
  },
  {
    id: 4,
    title: "পবিত্র আশুরা উপলক্ষে ছুটি",
    dateTime: "27 - Jul - 2026 To 27 - Jul - 2026",
    description: "পবিত্র আশুরা (১০ই মহররম) উপলক্ষে মাদ্রাসায় ছুটি পালিত হবে।",
  },
];

// Class Routine Data for /functions/class-routine
export interface ClassRoutineItem {
  day: string;
  period1: string;
  period2: string;
  period3: string;
  period4: string;
  period5: string;
  period6: string;
}

export const availableClasses = [
  { id: "play", name: "Play" },
  { id: "nursery", name: "Nursery" },
  { id: "class-1", name: "Class One (প্রথম শ্রেণি)" },
  { id: "class-2", name: "Class Two (দ্বিতীয় শ্রেণি)" },
  { id: "class-3", name: "Class Three (তৃতীয় শ্রেণি)" },
  { id: "hifz", name: "হিফজুল কুরআন বিভাগ" },
  { id: "kitab", name: "কিতাব বিভাগ" },
];

export const sampleRoutines: Record<string, ClassRoutineItem[]> = {
  nursery: [
    {
      day: "শনিবার",
      period1: "কুরআন ও কায়দা (০৮:৩০ - ০৯:১৫)",
      period2: "বাংলা বর্ণমালা (০৯:১৫ - ১০:০০)",
      period3: "ইংরেজি বর্ণ (১০:০০ - ১০:৪৫)",
      period4: "টিফিন বিরতি",
      period5: "গণিত ও গণনা (১১:১৫ - ১২:০০)",
      period6: "আদব ও দোয়া (১২:০০ - ১২:৪৫)",
    },
    {
      day: "রবিবার",
      period1: "কুরআন ও কায়দা (০৮:৩০ - ০৯:১৫)",
      period2: "বাংলা পড়া ও লেখা (০৯:১৫ - ১০:০০)",
      period3: "ইংরেজি রাইমস (১০:০০ - ১০:৪৫)",
      period4: "টিফিন বিরতি",
      period5: "গণিত সংখ্যা (১১:১৫ - ১২:০০)",
      period6: "হাদিস ও আখলাক (১২:০০ - ১২:৪৫)",
    },
    {
      day: "সোমবার",
      period1: "কুরআন ও তাজবিদ (০৮:৩০ - ০৯:১৫)",
      period2: "বাংলা ব্যাকরণ প্রাথমিক (০৯:১৫ - ১০:০০)",
      period3: "সাধারণ জ্ঞান (১০:০০ - ১০:৪৫)",
      period4: "টিফিন বিরতি",
      period5: "ইংরেজি হস্তলিপি (১১:১৫ - ১২:০০)",
      period6: "দোয়া ও মাসায়িল (১২:০০ - ১২:৪৫)",
    },
  ],
};

// Exam Routine Data for /exam-routine
export interface ExamRoutineItem {
  date: string;
  day: string;
  subject: string;
  time: string;
  room?: string;
}

export const sampleExamRoutines: Record<string, ExamRoutineItem[]> = {
  play: [
    {
      date: "২০ অক্টোবর ২০২৪",
      day: "রবিবার",
      subject: "কুরআন ও মৌখিক দোয়া",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০১",
    },
    {
      date: "২২ অক্টোবর ২০২৪",
      day: "মঙ্গলবার",
      subject: "বাংলা ও বর্ণমালা",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০১",
    },
    {
      date: "২৪ অক্টোবর ২০২৪",
      day: "বৃহস্পতিবার",
      subject: "ইংরেজি ও ছড়া",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০১",
    },
    {
      date: "২৭ অক্টোবর ২০২৪",
      day: "রবিবার",
      subject: "গণিত ও গণনা",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০১",
    },
  ],
  nursery: [
    {
      date: "২০ অক্টোবর ২০২৪",
      day: "রবিবার",
      subject: "কুরআনুল কারীম ও মাসায়িল",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০২",
    },
    {
      date: "২২ অক্টোবর ২০২৪",
      day: "মঙ্গলবার",
      subject: "বাংলা",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০২",
    },
    {
      date: "২৪ অক্টোবর ২০২৪",
      day: "বৃহস্পতিবার",
      subject: "ইংরেজি",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০২",
    },
    {
      date: "২৭ অক্টোবর ২০২৪",
      day: "রবিবার",
      subject: "গণিত ও সাধারণ জ্ঞান",
      time: "সকাল ০৯:৩০ - ১১:০০",
      room: "রুম নং ১০২",
    },
  ],
};

// Managing Committee Data for /committee
export interface CommitteeMember {
  id: number;
  photo?: string;
  name: string;
  designation: string;
  mobile?: string;
  address?: string;
  term?: string;
}

export const committeeYears = ["2026", "2025", "2024", "2023", "2022"];

export const committeeMembersData: Record<string, CommitteeMember[]> = {
  "2026": [
    {
      id: 1,
      photo: "/logo.jpg",
      name: "মনিরুজ্জামান মনু",
      designation: "মুতাওয়াল্লী",
      mobile: "01716296379",
      address: "মরকুন, টঙ্গী, গাজীপুর",
      term: "চলমান",
    },
    {
      id: 2,
      photo: "/logo.jpg",
      name: "কবির হোসেন শিমুল",
      designation: "সভাপতি (পরিচালনা পরিষদ)",
      mobile: "01716296379",
      address: "মরকুন, টঙ্গী, গাজীপুর",
      term: "চলমান",
    },
    {
      id: 3,
      photo: "/logo.jpg",
      name: "মুফতি মুখতার হোসাইন",
      designation: "মুহতামিম (প্রিন্সিপাল)",
      mobile: "01716296379",
      address: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা, মরকুন, টঙ্গী",
      term: "চলমান",
    },
  ],
};

// Organization History Data for /about/history
export const organizationHistoryData = {
  title: "History of the organization",
  establishedYear: "1969",
  establishedBn: "১৯৬৯",
  nameBn: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  nameEn: "JAMIA NESARIA ISLAMIA TONGI",
  address: "মরকুন, (তিস্তাগেট আনোয়ার সিল্ক মিলস সংলগ্ন), টঙ্গী-গাজীপুর।",
  addressEn: "Morkun, (Near Tista Gate Anwar Silk Mills), Tongi, Gazipur.",
  historyParagraphs: [
    "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী বাংলাদেশের অন্যতম শীর্ষস্থানীয় ঐতিহ্যবাহী দ্বীনি শিক্ষা প্রতিষ্ঠান। ১৯৬৯ খ্রিষ্টাব্দে প্রতিষ্ঠানটির শুভ সূচনা হয়। দ্বীনি ইলমের প্রচার ও প্রসার এবং কুরআন-সুন্নাহর সঠিক শিক্ষায় একটি আদর্শ ও যোগ্য প্রজন্ম গড়ে তোলার মহান লক্ষ্য নিয়ে প্রতিষ্ঠানটি যাত্রা শুরু করে।",
    "প্রতিষ্ঠালগ্ন থেকেই প্রতিষ্ঠানটি যোগ্য মুফাসসির, মুহাদ্দিস, ফকিহ এবং হাফেজে কুরআন তৈরির ক্ষেত্রে অনন্য অবদান রেখে আসছে। ধর্মীয় শিক্ষার পাশাপাশি যুগোপযোগী সাধারণ শিক্ষার সমন্বয়ে পরিচালিত হয়ে শিক্ষার্থীদের ইহলৌকিক ও পারলৌকিক উভয় জগতের পূর্ণাঙ্গ সফলতার জন্য প্রস্তুত করা হয়।",
    "বর্তমানে এখানে নূরানী, নাজেরা, আন্তর্জাতিক মানের হিফজুল কুরআন বিভাগ এবং কিতাব বিভাগসহ বিভিন্ন স্তরে সহস্রাধিক শিক্ষার্থী অধ্যয়ন করছে। অভিজ্ঞ ও নিষ্ঠাবান শিক্ষক মণ্ডলীর তত্ত্বাবধানে প্রতিষ্ঠানটি প্রতি বছর কেন্দ্রীয় বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ সহ বিভিন্ন বোর্ড পরীক্ষায় অনন্য সাফল্য অর্জন করে আসছে।",
  ],
};

// Physical Infrastructure Data for /about/infrastructure
export const physicalInfrastructureData = {
  title: "Physical infrastructure",
  establishedYear: "1969",
  establishedBn: "১৯৬৯",
  nameBn: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  nameEn: "JAMIA NESARIA ISLAMIA TONGI",
  address: "মরকুন, (তিস্তাগেট আনোয়ার সিল্ক মিলস সংলগ্ন), টঙ্গী-গাজীপুর।",
  addressEn: "Morkun, (Near Tista Gate Anwar Silk Mills), Tongi, Gazipur.",
  features: [
    {
      title: "বহুতল আধুনিক একাডেমি ভবন",
      desc: "শিক্ষার্থীদের পাঠদানের জন্য রয়েছে সুপ্রশস্ত, আলো-বাতাসপূর্ণ ও শব্দদূষণমুক্ত আধুনিক শ্রেণিকক্ষ সমৃদ্ধ বহুতল একাডেমিক ভবন।",
    },
    {
      title: "কেন্দ্রীয় জামে মসজিদ",
      desc: "দৈনিক পাঁচ ওয়াক্ত নামাজ জামাতে আদায় ও হিফজ শিক্ষার্থীদের তেলাওয়াত অনুশীলনের জন্য রয়েছে সুবিশাল ও দৃষ্টিনন্দন কেন্দ্রীয় মসজিদ।",
    },
    {
      title: "হিফজুল কুরআন অডিটোরিয়াম ও ডরমেটরি",
      desc: "হিফজ ও আবাসিক শিক্ষার্থীদের জন্য পর্যাপ্ত নিরাপত্তা, পরিষ্কার-পরিচ্ছন্ন পরিবেশ এবং মানসম্পন্ন থাকার ও খাওয়ার সুব্যবস্থা।",
    },
    {
      title: "সমৃদ্ধ দ্বীনি গ্রন্থাগার (মাকতাবা)",
      desc: "তাফসির, হাদিস, ফিকহ ও ইসলামিক সাহিত্যের সহস্রাধিক দুর্লভ কিতাবের বিশাল সংগ্রহশালা।",
    },
    {
      title: "বিশুদ্ধ খাবার পানি ও নিরবচ্ছিন্ন বিদ্যুৎ",
      desc: "গভীর নলকূপ ও ওয়াটার পিউরিফায়ারের মাধ্যমে সার্বক্ষণিক নিরাপদ খাবার পানি এবং নিজস্ব জেনারেটর ব্যাকআপ সুবিধা।",
    },
    {
      title: "সিসিটিভি নিরাপত্তা ও স্বাস্থ্যসম্মত পরিবেশ",
      desc: "পুরো ক্যাম্পাস সার্বক্ষণিক সিসিটিভি ক্যামেরার আওতাভুক্ত এবং শিক্ষার্থীদের সুরক্ষায় সার্বক্ষণিক নিজস্ব নিরাপত্তা ব্যবস্থা।",
    },
  ],
};

// Vacancy Notice Data for /about/vacancy
export interface VacancyItem {
  id: number;
  postName: string;
  postingDate: string;
  dateline: string;
  requirements?: string;
  salary?: string;
  pdfUrl?: string;
}

export const vacancyListTableData: VacancyItem[] = [
  {
    id: 1,
    postName: "ICT Teacher (আইসিটি শিক্ষক)",
    postingDate: "11 - Apr - 2026",
    dateline: "15 - May - 2026",
    requirements: "কম্পিউটার সায়েন্স/আইসিটিতে স্নাতক অথবা সমমান। দ্বীনি ভাবগাম্ভীর্য ও সংশ্লিষ্ট বিষয়ে ন্যূনতম ২ বছরের অভিজ্ঞতা সম্পন্ন প্রার্থীদের অগ্রাধিকার দেওয়া হবে।",
    salary: "আলোচনা সাপেক্ষে আকর্ষণীয় বেতন ও ভাতাদি।",
    pdfUrl: "/documents/circular-ict.pdf",
  },
  {
    id: 2,
    postName: "হিফজুল কুরআন শিক্ষক (হাফেজ-ক্বারী)",
    postingDate: "05 - Apr - 2026",
    dateline: "30 - Apr - 2026",
    requirements: "আন্তর্জাতিক ক্বেরাত/হিফজ প্রতিযোগিতায় সফল এবং স্বীকৃত হিফজখানা থেকে সনদপ্রাপ্ত হাফেজ ও ক্বারী।",
    salary: "প্রতিষ্ঠানের নির্ধারিত স্কেল ও আবাসিক সুবিধা।",
    pdfUrl: "/documents/circular-hifz.pdf",
  },
  {
    id: 3,
    postName: "সহকারী শিক্ষক (ইংরেজি ও গণিত)",
    postingDate: "01 - Apr - 2026",
    dateline: "25 - Apr - 2026",
    requirements: "সংশ্লিষ্ট বিষয়ে স্নাতক/স্নাতকোত্তর। কওমী মাদ্রাসা পরিবেশে পাঠদানে আগ্রহী হতে হবে।",
    salary: "আলোচনা সাপেক্ষে।",
    pdfUrl: "/documents/circular-general.pdf",
  },
];

// Academic Exam Result Data for /results/academic
export interface StudentResultItem {
  id: number;
  roll: string;
  name: string;
  className: string;
  year: string;
  totalMarks: number;
  gpa: string;
  grade: string;
  status: "Pass" | "Fail";
}

export const academicYears = ["2026", "2025", "2024", "2023", "2022"];

export const sampleAcademicResults: Record<string, StudentResultItem[]> = {
  "play-2026": [
    { id: 1, roll: "101", name: "মুহাম্মদ আব্দুল্লাহ", className: "Play", year: "2026", totalMarks: 485, gpa: "5.00", grade: "A+", status: "Pass" },
    { id: 2, roll: "102", name: "আহমদ হাসান", className: "Play", year: "2026", totalMarks: 470, gpa: "5.00", grade: "A+", status: "Pass" },
    { id: 3, roll: "103", name: "ফাতেমা খাতুন", className: "Play", year: "2026", totalMarks: 460, gpa: "4.80", grade: "A", status: "Pass" },
    { id: 4, roll: "104", name: "মারিয়াম আক্তার", className: "Play", year: "2026", totalMarks: 450, gpa: "4.75", grade: "A", status: "Pass" },
  ],
  "nursery-2026": [
    { id: 1, roll: "201", name: "মুহাম্মদ উমর", className: "Nursery", year: "2026", totalMarks: 490, gpa: "5.00", grade: "A+", status: "Pass" },
    { id: 2, roll: "202", name: "আয়েশা সিদ্দিকা", className: "Nursery", year: "2026", totalMarks: 480, gpa: "5.00", grade: "A+", status: "Pass" },
  ],
};

// Admission Test Result Data for /results/admission (Sanity CMS schema ready)
export interface AdmissionTestResultItem {
  id: number;
  applicationNo: string;
  studentName: string;
  fatherName: string;
  targetClass: string;
  year: string;
  marks: number;
  status: "Selected" | "Waiting" | "Not Selected";
  meritPosition: number;
}

export const sampleAdmissionResults: Record<string, AdmissionTestResultItem[]> = {
  "play-2026": [
    { id: 1, applicationNo: "ADM-2026-001", studentName: "তাহমিদ হাসান", fatherName: "মোহাম্মদ রফিক", targetClass: "Play", year: "2026", marks: 92, status: "Selected", meritPosition: 1 },
    { id: 2, applicationNo: "ADM-2026-002", studentName: "জুনায়েদ ইসলাম", fatherName: "নূরুল আলম", targetClass: "Play", year: "2026", marks: 88, status: "Selected", meritPosition: 2 },
    { id: 3, applicationNo: "ADM-2026-003", studentName: "নুসরাত জাহান", fatherName: "মোঃ বিল্লাল হোসেন", targetClass: "Play", year: "2026", marks: 85, status: "Selected", meritPosition: 3 },
    { id: 4, applicationNo: "ADM-2026-004", studentName: "মুহাম্মদ ইউসুফ", fatherName: "মাওলানা কামাল উদ্দিন", targetClass: "Play", year: "2026", marks: 74, status: "Waiting", meritPosition: 4 },
  ],
  "nursery-2026": [
    { id: 1, applicationNo: "ADM-2026-101", studentName: "আরিফ বিল্লাহ", fatherName: "মাওলানা ফজলুল হক", targetClass: "Nursery", year: "2026", marks: 95, status: "Selected", meritPosition: 1 },
    { id: 2, applicationNo: "ADM-2026-102", studentName: "মারুফ হাসান", fatherName: "মোঃ শফিকুল ইসলাম", targetClass: "Nursery", year: "2026", marks: 89, status: "Selected", meritPosition: 2 },
  ],
};

// Footer specific data
export const footerImportantLinksCol1 = [
  { label: "তথ্য", href: "https://bangladesh.gov.bd" },
  { label: "জাতীয় ই-তথ্যকোষ", href: "https://infokosh.gov.bd" },
  { label: "ঢাকা শিক্ষা বোর্ড", href: "https://dhakaeducationboard.gov.bd" },
  { label: "ই-বুক পোর্টাল", href: "http://ebook.gov.bd" },
];

export const footerImportantLinksCol2 = [
  { label: "পিপিলিকা", href: "https://pipilika.com" },
  { label: "শিক্ষক বাতায়ন", href: "https://teachers.gov.bd" },
  { label: "চট্টগ্রাম শিক্ষা বোর্ড", href: "https://bise-ctg.gov.bd" },
  { label: "শিক্ষক ছুটি ফরম", href: "/leave-form" },
];

export const footerAwards = [
  { title: "অংশ 04 নম্বর অলিম্পিয়াড - জাতীয়ভাবে ১ম স্থান", year: "২০২৩" },
  { title: "জাতীয় হিফজুল কুরআন প্রতিযোগিতা শ্রেষ্ঠ প্রতিষ্ঠান পুরস্কার", year: "২০২২" },
  { title: "বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ মেধা তালিকায় বিশেষ স্থান", year: "২০২১" },
];

// Photo Gallery Data for /gallery/photo (Sanity CMS schema ready)
export interface GalleryPhotoItem {
  id: number;
  title: string;
  category: "all" | "campus" | "events" | "classroom" | "hifz";
  imageUrl: string;
  date: string;
  description?: string;
}

export const sampleGalleryPhotos: GalleryPhotoItem[] = [
  {
    id: 1,
    title: "মাদ্রাসার প্রধান ভবন ও সবুজ প্রাঙ্গণ",
    category: "campus",
    imageUrl: "https://images.unsplash.com/photo-1584281722573-ef8876483507?auto=format&fit=crop&q=80&w=800",
    date: "০১ জানুয়ারি ২০২৪",
    description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর মনোরম পরিবেশ ও বহুতল একাডেমিক ভবন।",
  },
  {
    id: 2,
    title: "বার্ষিক হিফজুল কুরআন সমাপনী ও পাগড়ি প্রদান অনুষ্ঠান",
    category: "events",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
    date: "১৫ অক্টোবর ২০২৪",
    description: "হিফজ সম্পন্নকারী কৃতী ছাত্রদের মাঝে সম্মাননা স্মারক ও পাগড়ি প্রদান।",
  },
  {
    id: 3,
    title: "হিফজুল কুরআন বিভাগের শিক্ষার্থী ও মশকের বিশেষ দৃশ্য",
    category: "hifz",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    date: "১০ সেপ্টেম্বর ২০২৪",
    description: "হাফেজ ছাত্রদের সহীহ ক্বেরাত ও মশকের নিয়মিত ক্লাস।",
  },
  {
    id: 4,
    title: "আধুনিক ডিজিটাল কম্পিউটার ল্যাব ও আইসিটি ক্লাস",
    category: "classroom",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    date: "২০ আগস্ট ২০২৪",
    description: "জেনারেল শিক্ষার অংশ হিসেবে প্রাথমিক ও মাধ্যমিক ছাত্রদের কম্পিউটার প্রশিক্ষণ।",
  },
  {
    id: 5,
    title: "বার্ষিক ইসলামিক সম্মেলন ও অভিভাবক সমাবেশ",
    category: "events",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    date: "০৫ মে ২০২৪",
    description: "অভিভাবকদের সাথে মতবিনিময় ও দোয়া মাহফিল।",
  },
  {
    id: 6,
    title: "ইসলামিক লাইব্রেরি ও কিতাব অধ্যয়ন কক্ষ",
    category: "campus",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    date: "১২ মার্চ ২০২৪",
    description: "হাজারো কিতাব ও গবেষণাধর্মী ইসলামিক গ্রন্থসংগ্রহ।",
  },
  {
    id: 7,
    title: "প্রাথমিক শ্রেণির পাঠদান ও শ্রেণিকক্ষ",
    category: "classroom",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    date: "১৮ ফেব্রুয়ারি ২০২৪",
    description: "স্নেহপূর্ণ পরিবেশে শিশুদের বাংলা, ইংরেজি ও গণিত শিক্ষা।",
  },
  {
    id: 8,
    title: "মাদ্রাসার দৃষ্টিনন্দন মসজিদ ও জামাত কক্ষ",
    category: "campus",
    imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800",
    date: "০২ জানুয়ারি ২০২৪",
    description: "ছাত্র ও শিক্ষকদের ৫ ওয়াক্ত জামাতে নামাজ আদায়ের সুব্যবস্থা।",
  },
];

// Video Gallery Data for /gallery/video (Sanity CMS schema ready)
export interface GalleryVideoItem {
  id: number;
  title: string;
  category: "all" | "quran" | "waz" | "events" | "madrasa";
  youtubeId: string;
  thumbnail: string;
  date: string;
  duration?: string;
  speaker?: string;
}

export const sampleGalleryVideos: GalleryVideoItem[] = [
  {
    id: 1,
    title: "সূরা হাশরের শেষ ৩ আয়াত। প্রতিদিন ফজর ও মাগরিবের পর আমল",
    category: "quran",
    youtubeId: "rVnE_P897_E", // Quran recitation
    thumbnail: "https://images.unsplash.com/photo-1584281722573-ef8876483507?auto=format&fit=crop&q=80&w=800",
    date: "১৬ অক্টোবর ২০২৪",
    duration: "১০:৪৫",
    speaker: "ক্বারী হাফেজ মাওলানা সাইফুল্লাহ",
  },
  {
    id: 2,
    title: "সুরা লুকমানের শেষ ৩ আয়াতের তাফসির ও বিশেষ নসিহত",
    category: "waz",
    youtubeId: "8Z08aI0i10Y",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
    date: "১৫ অক্টোবর ২০২৪",
    duration: "২৪:৩০",
    speaker: "মাওলানা মুফতি আব্দুল্লাহ",
  },
  {
    id: 3,
    title: "হিফজুল কুরআন প্রতিযোগিতা ও বিশেষ পুরস্কার বিতরণী অনুষ্ঠান",
    category: "events",
    youtubeId: "kJQP7kiw5Fk",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    date: "১০ অক্টোবর ২০২৪",
    duration: "১৮:১৫",
    speaker: "অতিথিবৃন্দ ও হাফেজ ছাত্ররা",
  },
  {
    id: 4,
    title: "বার্ষিক ইসলামিক সম্মেলন ও দোয়া মাহফিল ২০২৪",
    category: "events",
    youtubeId: "fJ9rUzIMcZQ",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    date: "০৫ মে ২০২৪",
    duration: "৩৫:২০",
    speaker: "সম্মানিত ওলামায়ে কেরাম",
  },
  {
    id: 5,
    title: "সহীহ কুরআন তেলাওয়াত ও মাশক পর্ব (তাজবীদ শিক্ষা)",
    category: "quran",
    youtubeId: "lTRiuFIWV54",
    thumbnail: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    date: "২০ এপ্রিল ২০২৪",
    duration: "১৫:১০",
    speaker: "প্রধান ক্বারী সাহেব",
  },
  {
    id: 6,
    title: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর পরিচিতি ও শিক্ষা কার্যক্রম ডকুমেন্টারি",
    category: "madrasa",
    youtubeId: "ScMzIvxBSi4",
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800",
    date: "০১ জানুয়ারি ২০২৪",
    duration: "০৮:৪৫",
    speaker: "মাদ্রাসা কর্তৃপক্ষ",
  },
];

// Blog Posts Data for /blog (Sanity CMS schema ready)
export interface BlogPostItem {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  date: string;
  author: string;
  likesCount: number;
  commentsCount: number;
  excerpt: string;
  content: string;
  category: string;
}

export const sampleBlogPosts: BlogPostItem[] = [
  {
    id: 1,
    slug: "school-environment-and-character-building",
    title: "School",
    thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    date: "11-Apr-2024",
    author: "মাওলানা আব্দুল্লাহ",
    likesCount: 12,
    commentsCount: 2,
    category: "শিক্ষা",
    excerpt: "It's that time again. You know you need to write a new post for your school blog, but every time you go to write, you find yourself staring at a blank page. An ideal school environment fosters character and knowledge together.",
    content: "একটি আদর্শ শিক্ষাপ্রতিষ্ঠান কেবল পাঠ্যপুস্তকের জ্ঞান দান করে না, বরং শিক্ষার্থীর মননশীলতা, নৈতিক চরিত্র ও দায়িত্ববোধ জাগ্রত করে। জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীতে দ্বীনি ও সাধারণ শিক্ষার সমন্বিত পাঠদানের মাধ্যমে প্রতিটি শিক্ষার্থীকে সুনাগরিক ও আদর্শ মানুষ হিসেবে গড়ে তোলা হচ্ছে।",
  },
  {
    id: 2,
    slug: "teaching-kids-problem-solving-skills-at-home",
    title: "Teaching kids Problem-solving skills at home",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    date: "11-Apr-2024",
    author: "শিক্ষক পরিষদ",
    likesCount: 18,
    commentsCount: 0,
    category: "অভিভাবকত্ব",
    excerpt: "As a parent, it's essential to help kids learn how to deal with problems constructively. One great way to teach your kids problem-solving skills is by guiding them patiently through daily challenges.",
    content: "সন্তানদের শৈশব থেকেই চিন্তাভাবনা করার সুযোগ দেওয়া এবং ছোটখাটো সংকট নিজে সমাধান করতে উৎসাহিত করা প্রয়োজন। তাদের ভুল হলে তিরস্কার না করে বিকল্প উপায় খোঁজার কৌশল শেখান। ধৈর্য ও ইতিবাচক মনোভাব তৈরিতে মা-বাবার ভূমিকা অপরিসীম।",
  },
  {
    id: 3,
    slug: "world-health-day-islamic-perspective",
    title: "World Health Day",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    date: "07-Apr-2024",
    author: "স্বাস্থ্য ও চিকিৎসা ডেস্ক",
    likesCount: 25,
    commentsCount: 4,
    category: "স্বাস্থ্য ও সচেতনতা",
    excerpt: "World Health Day: Our Planet, Our Health. In Islam, cleanliness is described as half of faith. Taking care of our body and surroundings is a fundamental religious duty.",
    content: "ইসলামে শারীরিক ও মানসিক সুস্থতাকে অমূল্য নিয়ামত বলা হয়েছে। নিয়মিত পরিষ্কার-পরিচ্ছন্নতা, পুষ্টিকর হালাল খাবার এবং পরিবেশ পরিচ্ছন্ন রাখা রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম-এর সুন্নাহ। শিক্ষার্থীদের স্বাস্থ্যবিধি মেনে চলতে উদ্বুদ্ধ করুন।",
  },
  {
    id: 4,
    slug: "importance-of-moral-and-islamic-education",
    title: "সন্তানকে দ্বীনি ও নৈতিক শিক্ষায় গড়ে তোলার গুরুত্ব",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
    date: "28-Mar-2024",
    author: "মুফতি মুহাম্মদ",
    likesCount: 34,
    commentsCount: 7,
    category: "দ্বীনি শিক্ষা",
    excerpt: "বর্তমান আধুনিক যুগে নৈতিক অবক্ষয় রোধে সন্তানদের সঠিক দ্বীনি বুনিয়াদ গড়ে তোলা সময়ের সবচেয়ে বড় চ্যালেঞ্জ ও দায়িত্ব।",
    content: "পিতা-মাতার জন্য সবচেয়ে বড় নেক আমল হলো একজন নেককার সন্তান রেখে যাওয়া। ছোটবেলা থেকেই সহীহ কুরআন শিক্ষা, নামাজের তাগিদ এবং উত্তম শিষ্টাচার শিক্ষা দিলে সন্তান বিপথগামী হওয়া থেকে রক্ষা পায়।",
  },
  {
    id: 5,
    slug: "easy-steps-to-complete-hifz-quran",
    title: "হিফজুল কুরআন সম্পন্ন করার সহজ উপায় ও নিয়মাবলী",
    thumbnail: "https://images.unsplash.com/photo-1584281722573-ef8876483507?auto=format&fit=crop&q=80&w=600",
    date: "15-Mar-2024",
    author: "ক্বারী মাহফুজুর রহমান",
    likesCount: 42,
    commentsCount: 9,
    category: "হিফজুল কুরআন",
    excerpt: "নিয়মিত মশক, পূর্বের সবক নিয়মিত ইয়াদ করা এবং গভীর মনোযোগের মাধ্যমে পবিত্র কুরআনুল কারীম সহজে হিফজ সম্পন্ন করা সম্ভব।",
    content: "কুরআন মুখস্থ করার ক্ষেত্রে একাগ্রতা ও নিয়মিত অনুশীলন সবচেয়ে জরুরি। প্রতিদিন নির্ধারিত অংশ মুখস্থ করা এবং পেছনের পড়া (আমোক্তা) শিক্ষকের সামনে শোনানোর মাধ্যমে হিফজ স্মৃতিতে দীর্ঘস্থায়ী হয়।",
  },
  {
    id: 6,
    slug: "integration-of-general-and-islamic-curriculum",
    title: "কওমী ও জেনারেল শিক্ষার সমন্বয়: সময়ের শ্রেষ্ঠ দাবি",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    date: "02-Feb-2024",
    author: "প্রিন্সিপাল মহোদয়",
    likesCount: 50,
    commentsCount: 15,
    category: "পাঠ্যক্রম",
    excerpt: "আমাদের মাদ্রাসায় আরবি ও ইসলামী শিক্ষার পাশাপাশি আধুনিক বাংলা, ইংরেজি ও তথ্যপ্রযুক্তি শিক্ষাদানের বাস্তব রূপরেখা।",
    content: "দ্বীনের খাদেম হওয়ার পাশাপাশি আধুনিক পৃথিবীর যোগ্য নাগরিক তৈরিতে জেনারেল বিষয়ের প্রয়োজনীয়তা অনস্বীকার্য। জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীতে এই সমন্বিত পাঠদান শিক্ষার্থীদের সাফল্যের দ্বার উন্মোচন করছে।",
  },
];


// ============================================================================
// FULL INSTITUTIONAL PROFILE DATA FOR /about (জামিয়া পরিচিতি — ১০টি পূর্ণাঙ্গ ধারা)
// ============================================================================
export const aboutPageData = {
  header: {
    title: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    established: "প্রতিষ্ঠিত: ১৯৬৯ খ্রিষ্টাব্দ | ১৩৭৬ বাংলা | ১৩৮৮ হিজরি",
    address: "ঠিকানা: মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।",
  },
  sections: {
    identity: {
      id: "identity",
      number: "১",
      title: "১. জামিয়ার পরিচয়",
      subtitle: "ভূমিকা",
      paragraphs: [
        "শিক্ষা জাতির মেরুদণ্ড। শিক্ষা মানুষকে অজ্ঞতার অন্ধকার থেকে আলোর পথে পরিচালিত করে। একটি আদর্শ সমাজ ও নৈতিকতাসম্পন্ন জাতি গঠনে শিক্ষার ভূমিকা অপরিসীম। আর প্রকৃত মানুষ গড়ার ক্ষেত্রে কুরআন-সুন্নাহভিত্তিক আদর্শ ইসলামী শিক্ষার গুরুত্ব অনস্বীকার্য।",
        "উপমহাদেশে ইসলামী শিক্ষা, ঐতিহ্য ও মূল্যবোধ সংরক্ষণে দারুল উলুম দেওবন্দ গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে। এ শিক্ষাধারা থেকে অসংখ্য আলেম, মুহাদ্দিস, মুফাসসির ও দ্বীনের নিবেদিতপ্রাণ খাদেম তৈরি হয়েছেন।",
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা কওমি মাদরাসার ঐতিহ্যবাহী দ্বীনি শিক্ষাধারার আদর্শ ও চেতনাকে ধারণ করে পরিচালিত একটি দ্বীনি শিক্ষাপ্রতিষ্ঠান। প্রতিষ্ঠালগ্ন থেকে দ্বীনি শিক্ষার প্রসার, ইসলামী আদর্শের চর্চা এবং শিক্ষার্থীদের ইলম, আমল ও উন্নত আখলাকে সমৃদ্ধ করে গড়ে তোলার প্রত্যয় নিয়ে প্রতিষ্ঠানটি এগিয়ে চলেছে।",
        "জামিয়ার মূল লক্ষ্য হলো শিক্ষার্থীদের বিশুদ্ধ আকিদা, সহিহ আমল, উত্তম চরিত্র, নৈতিকতা ও মানবিক মূল্যবোধে সমৃদ্ধ করে গড়ে তোলা; যেন তারা দ্বীনের খেদমত, সমাজের কল্যাণ এবং মানবতার সেবায় অবদান রাখতে পারে।",
      ],
    },
    history: {
      id: "history",
      number: "২",
      title: "২. প্রতিষ্ঠাকাল ও ইতিহাস",
      paragraphs: [
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা ১৯৬৯ খ্রিষ্টাব্দে প্রতিষ্ঠিত হয়। বাংলা সন ১৩৭৬ এবং হিজরি সন ১৩৮৮ প্রতিষ্ঠাকালীন তথ্য হিসেবে উল্লেখ করা হয়েছে।",
        "দ্বীনি শিক্ষার প্রসার ও ইসলামী আদর্শে শিক্ষিত প্রজন্ম গড়ে তোলার লক্ষ্যে গাজীপুর জেলার টঙ্গীর মরকুন এলাকায় এ প্রতিষ্ঠানের যাত্রা শুরু হয়।",
        "প্রতিষ্ঠানের ইতিহাসের সঙ্গে জমি দান, প্রতিষ্ঠার উদ্যোগ এবং প্রাথমিক পর্যায়ের সহযোগিতার গুরুত্বপূর্ণ স্মৃতি জড়িয়ে রয়েছে। সময়ের ধারাবাহিকতায় জামিয়া তার শিক্ষা কার্যক্রম ও প্রাতিষ্ঠানিক অগ্রযাত্রা অব্যাহত রেখেছে।",
        "জামিয়ার ইতিহাস, ঐতিহ্য এবং প্রতিষ্ঠার সঙ্গে জড়িত ব্যক্তিবর্গের অবদান সংরক্ষণ করা এ প্রতিষ্ঠানের গুরুত্বপূর্ণ দায়িত্ব। তাঁদের ত্যাগ, শ্রম ও সহযোগিতার স্মৃতি ভবিষ্যৎ প্রজন্মের কাছে তুলে ধরার প্রত্যয় রয়েছে।",
      ],
    },
    founders: {
      id: "founders",
      number: "৩",
      title: "৩. প্রতিষ্ঠাতা ও জমিদাতাদের অবদান",
      donors: [
        { name: "মরহুম চান মিয়া সাহেব", role: "সর্বপ্রথম জমিদাতা ও প্রতিষ্ঠাতা উদ্যোক্তা" },
        { name: "আমিনা খাতুন", role: "সম্মানিত জমিদাতা" },
        { name: "সফর বানু", role: "সম্মানিত জমিদাতা" },
      ],
      paragraphs: [
        "জামিয়ার প্রতিষ্ঠার ইতিহাসে মরহুম চান মিয়া সাহেব, আমিনা খাতুন ও সফর বানুর নাম বিশেষভাবে উল্লেখযোগ্য।",
        "প্রাপ্ত ঐতিহাসিক বিবরণ অনুযায়ী, মরহুম চান মিয়া সাহেব সর্বপ্রথম দ্বীনি শিক্ষাপ্রতিষ্ঠান প্রতিষ্ঠার জন্য জমি দান করেন। পরবর্তীতে আমিনা খাতুন ও সফর বানুও জমি দান করেন। তাঁদের এই অবদান প্রতিষ্ঠানের যাত্রা শুরুতে গুরুত্বপূর্ণ ভূমিকা পালন করে।",
        "জমিদাতা ও সংশ্লিষ্ট ব্যক্তিবর্গের এই ত্যাগ ও অবদান শ্রদ্ধার সঙ্গে স্মরণীয়। তাঁদের অবদানের যথাযথ সংরক্ষণ এবং পরবর্তী প্রজন্মের কাছে তুলে ধরা জামিয়ার ইতিহাস ও ঐতিহ্যের গুরুত্বপূর্ণ অংশ।",
      ],
    },
    location: {
      id: "location",
      number: "৪",
      title: "৪. জামিয়ার অবস্থান ও পরিবেশ",
      paragraphs: [
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা বাংলাদেশের গাজীপুর জেলার টঙ্গী থানাধীন মরকুন এলাকায় অবস্থিত।",
        "প্রাপ্ত বিবরণ অনুযায়ী, প্রতিষ্ঠানটি তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন এলাকায় অবস্থিত। টঙ্গী রেলওয়ে স্টেশন ও চেরাগ আলী এলাকার দিকনির্দেশনাও প্রতিষ্ঠানের অবস্থান শনাক্ত করতে সহায়ক।",
        "শিক্ষার্থীদের পাঠদান, দ্বীনি জ্ঞানচর্চা এবং প্রাতিষ্ঠানিক কার্যক্রম পরিচালনার জন্য জামিয়ার শিক্ষা ও আবাসন-ব্যবস্থা রয়েছে।",
        "প্রতিষ্ঠানের ক্যাম্পাস, শ্রেণিকক্ষ, আবাসন এবং অন্যান্য সুযোগ-সুবিধার ছবি ও বিস্তারিত বিবরণ এ পৃষ্ঠায় যুক্ত করা হবে, যাতে শিক্ষার্থী, অভিভাবক ও দর্শনার্থীরা জামিয়া সম্পর্কে সুস্পষ্ট ধারণা লাভ করতে পারেন।",
      ],
    },
    mission: {
      id: "mission",
      number: "৫",
      title: "৫. জামিয়ার লক্ষ্য ও উদ্দেশ্য",
      mainGoal:
        "আল্লাহ তাআলার সন্তুষ্টি অর্জন এবং দ্বীনের খেদমতে যোগ্য মানুষ গড়ে তোলাই জামিয়ার শিক্ষা কার্যক্রমের মূল লক্ষ্য।",
      objectivesIntro: "জামিয়ার প্রধান লক্ষ্য ও উদ্দেশ্যসমূহ হলো—",
      objectives: [
        "১. পবিত্র কুরআন ও সুন্নাহভিত্তিক দ্বীনি শিক্ষা প্রদান।",
        "২. শিক্ষার্থীদের বিশুদ্ধ আকিদা, সহিহ আমল ও ইসলামী জীবনবিধানের শিক্ষা দেওয়া।",
        "৩. ইলম, আমল, আদব ও আখলাকের সমন্বয়ে শিক্ষার্থীদের জীবন গঠন করা।",
        "৪. যোগ্য আলেম, দ্বীনের দাঈ এবং ইসলামের আদর্শে নিবেদিতপ্রাণ মানুষ তৈরি করা।",
        "৫. সমকালীন বিভিন্ন প্রশ্ন ও চ্যালেঞ্জ সম্পর্কে প্রয়োজনীয় জ্ঞান অর্জনে শিক্ষার্থীদের সহায়তা করা।",
        "৬. শিক্ষার্থীদের লেখনী, বক্তব্য, বক্তৃতা ও দাওয়াতি দক্ষতা বিকাশে সহযোগিতা করা।",
        "৭. এতিম ও অসহায় শিক্ষার্থীদের শিক্ষা ও প্রতিপালনের মাধ্যমে তাদের সুন্দর ভবিষ্যৎ গঠনে ভূমিকা রাখা।",
        "৮. ইসলামী মূল্যবোধ, নৈতিকতা ও মানবিক গুণাবলির বিকাশ ঘটানো।",
        "৯. সমাজ ও মানবতার কল্যাণে অবদান রাখার মানসিকতা তৈরি করা।",
      ],
    },
    philosophy: {
      id: "philosophy",
      number: "৬",
      title: "৬. জামিয়ার আদর্শ ও শিক্ষাদর্শন",
      paragraphs: [
        "জামিয়ার শিক্ষাদর্শনের মূল ভিত্তি হলো কুরআন-সুন্নাহর অনুসরণ, দ্বীনি জ্ঞানের চর্চা, উত্তম চরিত্র এবং বাস্তব জীবনে ইসলামী মূল্যবোধের প্রতিফলন।",
        "শিক্ষার্থীদের শুধু পাঠ্যবিষয়ে জ্ঞান অর্জন করানোই নয়; বরং অর্জিত জ্ঞান অনুযায়ী আমল করা, শিক্ষক ও অভিভাবকদের সম্মান করা, শৃঙ্খলা বজায় রাখা এবং মানুষের সঙ্গে উত্তম আচরণ করার প্রতিও গুরুত্ব দেওয়া হয়।",
      ],
      pointsIntro: "জামিয়ার শিক্ষাদর্শনের উল্লেখযোগ্য দিকগুলো হলো—",
      points: [
        "কুরআন-সুন্নাহর আলোকে জীবন গঠন।",
        "বিশুদ্ধ আকিদা ও সহিহ আমলের চর্চা।",
        "ইলম ও আমলের সমন্বয়।",
        "আদব, আখলাক, তাকওয়া ও নৈতিক চরিত্র গঠন।",
        "সততা, আমানতদারি ও দায়িত্ববোধের বিকাশ।",
        "ইসলামের সঠিক শিক্ষা ও আদর্শ মানুষের কাছে পৌঁছে দেওয়ার প্রস্তুতি।",
        "সমাজ ও মানবতার কল্যাণে ভূমিকা রাখার মানসিকতা তৈরি।",
      ],
    },
    features: {
      id: "features",
      number: "৭",
      title: "৭. মাদরাসার বৈশিষ্ট্য",
      intro:
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা মানসম্মত দ্বীনি শিক্ষা, শিক্ষার্থীদের মেধা ও যোগ্যতা বিকাশ এবং আদর্শ চরিত্র গঠনের লক্ষ্যে বিভিন্ন কার্যক্রম পরিচালনা করে থাকে।",
      items: [
        {
          letter: "ক.",
          title: "অভিজ্ঞ ও যোগ্য শিক্ষকমণ্ডলী",
          desc: "দেশ-বিদেশের উচ্চতর শিক্ষাপ্রতিষ্ঠান থেকে সনদপ্রাপ্ত বিজ্ঞ ও অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পাঠদানের ব্যবস্থা।",
        },
        {
          letter: "খ.",
          title: "বিশিষ্ট আলেম-উলামার তত্ত্বাবধান",
          desc: "দেশবরেণ্য শিক্ষাবিদ ও বুজুর্গ ওলামায়ে কেরামের সার্বিক তত্ত্বাবধান, পরামর্শ ও দিকনির্দেশনায় পরিচালিত হওয়ার প্রত্যয়।",
        },
        {
          letter: "গ.",
          title: "শিক্ষার মানোন্নয়নে বিশেষ উদ্যোগ",
          desc: "শিক্ষার মান ক্রমাগত উন্নয়নের লক্ষ্যে সার্বক্ষণিক তদারকি, সাপ্তাহিক ও মাসিক পরীক্ষা, বক্তৃতা প্রশিক্ষণ, পাঠাগারের উদ্যোগে নিয়মিত বই-পুস্তক বিতরণ এবং বাংলা ও আরবি ত্রৈমাসিক দেয়ালিকা প্রকাশসহ সৃজনশীল বিভিন্ন কার্যক্রম গ্রহণ।",
        },
        {
          letter: "ঘ.",
          title: "সমৃদ্ধ গ্রন্থাগার",
          desc: "শিক্ষার্থীদের জ্ঞানচর্চা ও অধ্যয়নের সুযোগ সম্প্রসারণের লক্ষ্যে দেশি-বিদেশি বিভিন্ন বিষয়ের বিপুলসংখ্যক কিতাব ও বইসমৃদ্ধ গ্রন্থাগারের ব্যবস্থা।",
        },
        {
          letter: "ঙ.",
          title: "জীবন গঠনমূলক অনুষ্ঠান",
          desc: "বুজুর্গ ওলামায়ে কেরামকে আমন্ত্রণের মাধ্যমে বিভিন্ন সময়ে ইসলামী শিক্ষা, নৈতিকতা, আত্মশুদ্ধি ও জীবন গঠনমূলক অনুষ্ঠানমালার আয়োজন।",
        },
        {
          letter: "চ.",
          title: "স্বাস্থ্যসম্মত খাবার",
          desc: "আবাসিক শিক্ষার্থীদের জন্য তিনবেলা স্বাস্থ্যসম্মত, উন্নতমানের ও রুচিকর খাবার পরিবেশনের ব্যবস্থা।",
        },
        {
          letter: "ছ.",
          title: "নিজস্ব ভবনে পাঠদান ও আবাসন",
          desc: "মাদরাসার নিজস্ব ভবনে পাঠদান ও শিক্ষার্থীদের আবাসনের ব্যবস্থা।",
        },
        {
          letter: "জ.",
          title: "নিরাপদ ও মনোরম পরিবেশ",
          desc: "নিরাপদ, সুরক্ষিত ও মনোরম পরিবেশে ইলমে দ্বীন শিক্ষার ব্যবস্থা এবং শিক্ষার্থীদের আদর্শ চরিত্র গঠনের উপযোগী পরিবেশ নিশ্চিত করার প্রচেষ্টা।",
        },
      ],
    },
    registration: {
      id: "registration",
      number: "৮",
      title: "৮. নিবন্ধন পরিচিতি",
      intro: "জামিয়ার শিক্ষা কার্যক্রম ও এতিমখানার নিবন্ধন-সংক্রান্ত তথ্য নিচে তুলে ধরা হলো।",
      items: [
        {
          code: "৮.১",
          title: "আল-হাইআতুল উলয়া লিল-জামি'আতিল কওমিয়া বাংলাদেশ",
          details: [
            { label: "শিক্ষা বোর্ড", value: "আল-হাইআতুল উলয়া লিল-জামি'আতিল কওমিয়া বাংলাদেশ" },
            { label: "নিবন্ধন নম্বর", value: "০০৬৮৫", highlight: true },
          ],
        },
        {
          code: "৮.২",
          title: "বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ",
          details: [
            { label: "শিক্ষা বোর্ড", value: "বেফাকুল মাদারিসিল আরাবিয়া—বাংলাদেশ কওমি মাদরাসা শিক্ষা বোর্ড" },
            { label: "নিবন্ধন নম্বর", value: "১/৭৪৩", highlight: true },
          ],
        },
        {
          code: "৮.৩",
          title: "এতিমখানার নিবন্ধন",
          details: [
            { label: "নিবন্ধিত নাম", value: "নেছারিয়া হাফিজিয়া এতিমখানা ও ইসলামিয়া মাদরাসা" },
            { label: "নিবন্ধনের তারিখ", value: "০৯ নভেম্বর ১৯৭৬" },
            { label: "নিবন্ধনকারী কর্তৃপক্ষ", value: "সমাজসেবা অধিদপ্তর, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" },
            { label: "নিবন্ধন নম্বর", value: "ঢ-০৫০৪", highlight: true },
          ],
        },
      ],
    },
    activities: {
      id: "activities",
      number: "৯",
      title: "৯. জামিয়ার বর্তমান কার্যক্রম",
      paragraphs: [
        "জামিয়ার দ্বীনি শিক্ষা কার্যক্রম, শিক্ষার্থীদের পাঠদান, আবাসন এবং এতিমখানার কার্যক্রম প্রতিষ্ঠানের অন্যতম গুরুত্বপূর্ণ দিক।",
        "শিক্ষার্থীদের জ্ঞানার্জন, নৈতিকতা, শৃঙ্খলা, বক্তৃতা প্রশিক্ষণ, পাঠাগার কার্যক্রম এবং সৃজনশীল চর্চার মাধ্যমে তাদের সামগ্রিক বিকাশে গুরুত্ব দেওয়া হয়।",
        "জামিয়ার বিভিন্ন শিক্ষা বিভাগ, পাঠ্যক্রম, শিক্ষক-শিক্ষার্থীর সংখ্যা এবং বিভাগভিত্তিক কার্যক্রমের বিস্তারিত বিবরণ ওয়েবসাইটের “শিক্ষা কার্যক্রম” মেনুতে পৃথকভাবে প্রকাশ করা হবে।",
      ],
    },
    commitment: {
      id: "commitment",
      number: "১০",
      title: "১০. আমাদের অঙ্গীকার",
      paragraphs: [
        "কুরআন-সুন্নাহর আলোকে শিক্ষার্থীদের ইলম, আমল ও উত্তম আখলাকে সমৃদ্ধ করে আদর্শ মানুষ হিসেবে গড়ে তোলা এবং দ্বীনি শিক্ষার প্রসারে অবদান রাখাই জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার প্রত্যয়।",
        "আল্লাহ তাআলা জামিয়ার দ্বীনি খেদমত কবুল করুন, এর সঙ্গে সংশ্লিষ্ট সকলের প্রচেষ্টায় বরকত দান করুন এবং প্রতিষ্ঠানটিকে দ্বীনি শিক্ষা ও মানবকল্যাণের উত্তম মাধ্যম হিসেবে কবুল করুন। আমিন।",
      ],
    },
  },
};

// ============================================================================
// FULL ACADEMIC DEPARTMENTS & CURRICULUM DATA FOR /academics (শিক্ষা বিভাগ)
// ============================================================================
export const academicsPageData = {
  header: {
    pageTitle: "শিক্ষা বিভাগ",
    institutionName: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    established: "প্রতিষ্ঠাকাল: ১৯৬৯ খ্রিস্টাব্দ",
    address: "ঠিকানা: মরকুন, টঙ্গী, গাজীপুর।",
    slogan: "কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার প্রত্যয়।",
  },
  overview: {
    id: "overview",
    title: "শিক্ষাব্যবস্থার পরিচিতি",
    paragraphs: [
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা ১৯৬৯ সালে প্রতিষ্ঠিত হওয়ার পর থেকে দ্বীনি শিক্ষার প্রসার এবং আদর্শ মানুষ গড়ার লক্ষ্যে কাজ করে আসছে। সমাজের গণ্যমান্য ব্যক্তিদের সমন্বয়ে গঠিত পরিচালনা পরিষদের সার্বিক তত্ত্বাবধানে জামিয়ার শিক্ষা কার্যক্রম পরিচালিত হয়।",
      "এ প্রতিষ্ঠানে পবিত্র কুরআন, হাদিস, তাফসির, ফিকাহ, আকাইদ, ইসলামী ইতিহাস ও আদব-আখলাকের পাশাপাশি প্রয়োজনীয় সাধারণ শিক্ষা প্রদানের ব্যবস্থা রয়েছে। শিক্ষার্থীদের ধর্মীয় ও নৈতিক মূল্যবোধ জাগ্রত করা, জ্ঞানচর্চার পরিধি বিস্তৃত করা এবং বহুমুখী প্রতিভার বিকাশ ঘটানোর প্রতি বিশেষ গুরুত্ব দেওয়া হয়।",
      "দ্বীনি শিক্ষার পাশাপাশি বাংলা, ইংরেজি, গণিত, বিজ্ঞান, ভাষা-সাহিত্য এবং প্রয়োজনীয় প্রযুক্তিগত জ্ঞান অর্জনের মাধ্যমে শিক্ষার্থীদের যোগ্য, আদর্শবান ও সমাজের কল্যাণে নিবেদিত মানুষ হিসেবে গড়ে তোলাই জামিয়ার শিক্ষাব্যবস্থার অন্যতম লক্ষ্য।",
    ],
  },
  departments: [
    {
      id: "maktab",
      number: "১",
      title: "১। মক্তব বিভাগ",
      image: "/hifz_bibhag.jpeg",
      subDepartments: [
        {
          code: "ক.",
          name: "ক. অনাবাসিক মক্তব বিভাগ",
          paragraphs: [
            "জামিয়ার নিকটে বসবাসরত ৬–৯ বছর বয়সী শিশুদের দ্বীনি শিক্ষার সঙ্গে পরিচিত করার লক্ষ্যে এ বিভাগ পরিচালিত হয়। অভিজ্ঞ শিক্ষকদের মাধ্যমে বাংলা, আরবি ও ইংরেজি বর্ণপরিচিতি, নামাজের প্রশিক্ষণ এবং প্রয়োজনীয় কিছু দোয়া-দরুদ শিক্ষা দেওয়া হয়।",
          ],
          duration: "কোর্সের সময়কাল: এক বছর।",
        },
        {
          code: "খ.",
          name: "খ. আবাসিক আদর্শ নূরানি মক্তব বিভাগ",
          paragraphs: [
            "কোমলমতি শিশুদের ধর্মীয় আদর্শ সুদৃঢ় করার লক্ষ্যে এ বিভাগে প্রশিক্ষণপ্রাপ্ত অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে সুবিন্যস্ত শ্রেণিপদ্ধতিতে পাঠদান করা হয়।",
            "এ বিভাগে আরবি বর্ণমালার পরিচয় থেকে শুরু করে সহিহভাবে কুরআন তেলাওয়াত, নামাজ, প্রয়োজনীয় দোয়া-দরুদ, জরুরি মাসআলা-মাসায়েল, ৪০ হাদিস, আদব-কায়দা ও আমল-আখলাক শেখানো হয়। পাশাপাশি প্রাথমিক পর্যায়ের (১ম–৩য় শ্রেণি পর্যন্ত) বাংলা, অঙ্ক ও ইংরেজি শিক্ষা দেওয়া হয়।",
          ],
          duration: "কোর্সের সময়কাল: দুই বছর।",
        },
      ],
    },
    {
      id: "hifz",
      number: "২",
      title: "২। হিফজ বিভাগ",
      image: "/hifz_revision_bibhag.jpeg",
      subDepartments: [
        {
          code: "ক.",
          name: "ক. হিফজুল কুরআন বিভাগ",
          paragraphs: [
            "প্রশিক্ষণপ্রাপ্ত সুদক্ষ হাফেজ সাহেবদের সার্বক্ষণিক দেখাশোনা ও সার্বিক তত্ত্বাবধানে মেধাবী শিক্ষার্থীদের পবিত্র কুরআনুল কারিম মুখস্থ করার বিশেষ ব্যবস্থা রয়েছে। আকর্ষণীয় ও ফলপ্রসূ পদ্ধতিতে শিক্ষার্থীদের হিফজ সম্পন্ন করানোর প্রতি বিশেষ গুরুত্ব দেওয়া হয়।",
            "পাশাপাশি জরুরি দোয়া-দরুদ, প্রয়োজনীয় মাসআলা-মাসায়েল, আদব-কায়দা ও আমল-আখলাক শেখানো হয়। হিফজ সম্পন্ন করার পর শিক্ষার্থীদের কিতাব বিভাগে ভর্তির সুযোগ-সুবিধা প্রদান করা হয়।",
          ],
          duration: "লক্ষ্যমাত্রা অনুযায়ী সময়কাল: অনূর্ধ্ব তিন বছর।",
        },
        {
          code: "খ.",
          name: "খ. হিফজ রিভিশন বিভাগ",
          paragraphs: [
            "হিফজ সম্পন্নকারী শিক্ষার্থীদের পবিত্র কুরআন পূর্ণরূপে পুনরাবৃত্তি, নির্ভুলভাবে মুখস্থ ধরে রাখা এবং তেলাওয়াত সুন্দর ও শ্রুতিমধুর করার লক্ষ্যে এ বিভাগ পরিচালিত হয়।",
            "অভিজ্ঞ শিক্ষকদের বিশেষ তত্ত্বাবধানে শিক্ষার্থীদের শুদ্ধ তেলাওয়াত, সাবলীলতা ও কুরআন হিফজের দৃঢ়তা বৃদ্ধির জন্য যত্নসহকারে প্রশিক্ষণ দেওয়া হয়। এর মাধ্যমে শিক্ষার্থীদের আন্তর্জাতিক মানের হাফেজ হিসেবে গড়ে তোলার প্রচেষ্টা চালানো হয়।",
          ],
        },
      ],
    },
    {
      id: "kitab",
      number: "৩",
      title: "৩। কিতাব বিভাগ",
      image: "/kitab_bibhag.jpeg",
      introParagraphs: [
        "কিতাব বিভাগে ইসলামী জ্ঞানের বিভিন্ন শাখায় ধারাবাহিক পাঠদানের ব্যবস্থা রয়েছে। ইবতেদায়ী (৪র্থ শ্রেণি) থেকে দাওরায়ে হাদিস (মাস্টার্স/এম.এ. সমমান) পর্যন্ত ইসলামী ও সাধারণ শিক্ষার সমন্বয়ে পাঠদান করা হয়।",
        "শিক্ষার্থীদের দ্বীনি জ্ঞানে সমৃদ্ধ করা, বিশ্লেষণী দক্ষতা বৃদ্ধি, উন্নত চরিত্র গঠন এবং সমাজে দায়িত্বশীল ভূমিকা পালনের উপযোগী করে গড়ে তোলার প্রতি বিশেষ গুরুত্ব দেওয়া হয়।",
      ],
      levelsTitle: "কিতাব বিভাগের শিক্ষাস্তর ও সময়কাল",
      levels: [
        { step: "১.", name: "ইবতেদায়ী/প্রাথমিক", classes: "বিশেষ জামাত ও তাইসির", duration: "দুই বছর।" },
        { step: "২.", name: "মুতাওয়াসসিতা/মাধ্যমিক", classes: "মিজান, নাহবেমির ও হেদায়াতুন্নাহু", duration: "তিন বছর।" },
        { step: "৩.", name: "সানাবিয়্যাহ/উচ্চ মাধ্যমিক", classes: "কাফিয়া ও শরহে বেকায়া", duration: "দুই বছর।" },
        { step: "৪.", name: "ফজিলত/স্নাতক", classes: "হেদায়া, জালালাইন ও মেশকাত", duration: "দুই বছর।" },
        { step: "৫.", name: "তাকমিল (মাস্টার্স/এম.এ. সমমান)", classes: "দাওরায়ে হাদিস", duration: "এক বছর।" },
      ],
      boardTitle: "বোর্ড ও পরীক্ষা",
      boardParagraphs: [
        "জামিয়া বাংলাদেশ কওমি মাদরাসা শিক্ষাবোর্ড (বেফাক)-এর অন্তর্ভুক্ত। বেফাকভুক্ত শ্রেণিগুলোতে নিজস্ব মারকাযে বার্ষিক পরীক্ষার ব্যবস্থা রয়েছে।",
        "এ ছাড়া আল-হাইআতুল উলয়া লিল-জামি'আতিল কওমিয়া বাংলাদেশ-এর অধীনে দাওরায়ে হাদিস (মাস্টার্স/এম.এ. সমমান) পরীক্ষায় অংশগ্রহণের ব্যবস্থা রয়েছে।",
      ],
    },
    {
      id: "madani-nisab",
      number: "৪",
      title: "৪। মাদানি নেসাব বিভাগ",
      sessionBadge: "শিক্ষাবর্ষ: ১ম, ২য় ও ৩য় বর্ষ।",
      intro:
        "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার মাদানি নেসাব বিভাগে শিক্ষার্থীদের আরবি ভাষায় দক্ষতা অর্জন, আরবি কিতাব অনুধাবন এবং অনুবাদ ও কথোপকথনের যোগ্যতা সৃষ্টির লক্ষ্যে বিশেষ পদ্ধতিতে পাঠদান করা হয়। মাদানি নেসাব ও কাদিম নেসাবের সমন্বয়ে প্রণীত সিলেবাস অনুযায়ী এ বিভাগের শিক্ষা কার্যক্রম পরিচালিত হয়।",
      featuresTitle: "মাদানি নেসাব বিভাগের বৈশিষ্ট্য ও শিক্ষার লক্ষ্য",
      features: [
        {
          num: "১।",
          title: "মাদানি নেসাব ও কাদিম নেসাবের সমন্বিত সিলেবাস",
          desc: "মাদানি নেসাব ও কাদিম নেসাবের সমন্বয়ে প্রণীত সিলেবাস অনুযায়ী পাঠদান করা হয়। এর মাধ্যমে শিক্ষার্থীদের আরবি ভাষা ও দ্বীনি জ্ঞানের ভিত্তি সুদৃঢ় করার প্রতি গুরুত্ব দেওয়া হয়।",
        },
        {
          num: "২।",
          title: "অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পাঠদান",
          desc: "মাদানি নেসাবের অভিজ্ঞ শিক্ষকদের মাধ্যমে শিক্ষার্থীদের পাঠদান করা হয়, যাতে তারা সুশৃঙ্খল ও ফলপ্রসূ পদ্ধতিতে পাঠ্যক্রম সম্পন্ন করতে পারে।",
        },
        {
          num: "৩।",
          title: "প্রথম বর্ষে আরবি ভাষায় দক্ষতা অর্জন",
          desc: "প্রথম বর্ষে নিয়মিত অনুশীলন ও মেহনতের মাধ্যমে শিক্ষার্থীরা আরবি ভাষা পঠন, লিখন ও কথোপকথনে দক্ষতা অর্জনের যোগ্যতা লাভ করে।",
        },
        {
          num: "৪।",
          title: "আরবি ও বাংলা অনুবাদে দক্ষতা অর্জন",
          desc: "নিজস্ব যোগ্যতা ও নিয়মিত অনুশীলনের মাধ্যমে শিক্ষার্থীরা আরবি থেকে বাংলায় এবং বাংলা থেকে আরবিতে অনুবাদ করার সক্ষমতা অর্জন করে।",
        },
        {
          num: "৫।",
          title: "দ্বিতীয় বর্ষে আরবি কিতাব অনুধাবনের যোগ্যতা",
          desc: "দ্বিতীয় বর্ষের পাঠ সম্পন্ন করার পর শিক্ষার্থীরা যেকোনো আরবি কিতাব বুঝে পড়ার যোগ্যতা অর্জনের লক্ষ্যে প্রস্তুত হয়।",
        },
        {
          num: "৬।",
          title: "বেফাক বোর্ডের পরীক্ষায় অংশগ্রহণ",
          desc: "দ্বিতীয় বর্ষের শিক্ষার্থীরা বাংলাদেশ কওমি মাদরাসা শিক্ষাবোর্ড (বেফাক)-এর অধীনে নাহবেমির জামাতে পরীক্ষায় অংশগ্রহণ করে।",
        },
      ],
      mainGoalTitle: "মাদানি নেসাব বিভাগের মূল লক্ষ্য",
      mainGoal:
        "মাদানি নেসাব বিভাগের মূল লক্ষ্য হলো শিক্ষার্থীদের আরবি ভাষায় পারদর্শী করে তোলা, আরবি কিতাব সরাসরি বুঝে পড়ার যোগ্যতা সৃষ্টি করা এবং অনুবাদ ও কথোপকথনে দক্ষ করে গড়ে তোলা। সমন্বিত সিলেবাস, অভিজ্ঞ শিক্ষকমণ্ডলী ও নিয়মিত অনুশীলনের মাধ্যমে শিক্ষার্থীদের উচ্চতর দ্বীনি শিক্ষার জন্য প্রস্তুত করাই এ বিভাগের অন্যতম উদ্দেশ্য।",
    },
  ],
  syllabus: {
    id: "syllabus",
    number: "৫",
    title: "৫। জামিয়ার সিলেবাস ও পাঠ্যবিষয়",
    intro:
      "জামিয়ার সিলেবাসে দ্বীনি শিক্ষার পাশাপাশি ভাষা, সাহিত্য, সাধারণ জ্ঞান, বিজ্ঞান, যুক্তিবিদ্যা এবং প্রয়োজনীয় অন্যান্য বিষয় অন্তর্ভুক্ত রয়েছে। শিক্ষার্থীদের জ্ঞান ও দক্ষতার বহুমুখী বিকাশের লক্ষ্যে নিম্নোক্ত বিষয়গুলো পাঠ্যক্রমে অন্তর্ভুক্ত রয়েছে।",
    categories: [
      {
        letter: "ক.",
        title: "ক. কুরআন ও তাফসিরবিষয়ক শিক্ষা",
        subjects: ["কুরআন তেলাওয়াত", "কুরআন তরজমা", "তাফসির", "উসুলে তাফসির"],
      },
      {
        letter: "খ.",
        title: "খ. হাদিস ও ফিকাহবিষয়ক শিক্ষা",
        subjects: ["হাদিসে নববি", "ইলমে ফিকাহ", "উসুলে হাদিস", "উসুলে ফিকাহ"],
      },
      {
        letter: "গ.",
        title: "গ. আকাইদ ও ইসলামী বিষয়াবলি",
        subjects: [
          "আকাইদ",
          "আদব-আখলাক",
          "সীরাত",
          "ইসলামী ইতিহাস",
          "তুলনামূলক ধর্মতত্ত্ব ও মতবাদশাস্ত্র",
        ],
      },
      {
        letter: "ঘ.",
        title: "ঘ. আরবি ভাষা ও সাহিত্য",
        subjects: ["আরবি ব্যাকরণ: নাহু-সরফ", "আরবি সাহিত্য", "অলংকারশাস্ত্র"],
      },
      {
        letter: "ঙ.",
        title: "ঙ. বাংলা ভাষা ও সাহিত্য",
        subjects: ["বাংলা সাহিত্য", "বাংলা ব্যাকরণ", "বাংলা রচনা"],
      },
      {
        letter: "চ.",
        title: "চ. ইংরেজি ও অন্যান্য ভাষা",
        subjects: ["প্রয়োজনীয় ইংরেজি", "উর্দু ভাষা ও সাহিত্য", "ফারসি ভাষা ও সাহিত্য"],
      },
      {
        letter: "ছ.",
        title: "ছ. সাধারণ শিক্ষা",
        subjects: ["অঙ্ক", "ভূগোল", "সমাজপাঠ", "বিজ্ঞান"],
      },
      {
        letter: "জ.",
        title: "জ. যুক্তিবিদ্যা ও অন্যান্য বিষয়",
        subjects: [
          "তর্কশাস্ত্র",
          "তুলনামূলক ধর্মতত্ত্ব ও মতবাদশাস্ত্র",
          "কারিগরি শিক্ষা",
          "উন্নত প্রযুক্তিবিদ্যা",
        ],
      },
    ],
    note: "দ্রষ্টব্য: বিষয়ভিত্তিক পাঠদান শ্রেণি ও বিভাগ অনুযায়ী নির্ধারিত হয়।",
  },
  training: {
    id: "training",
    number: "৬",
    title: "৬। ছাত্র প্রশিক্ষণ বিভাগ",
    intro:
      "পাঠ্যসূচির পাশাপাশি শিক্ষার্থীদের বহুমুখী প্রতিভার বিকাশ ঘটানোর লক্ষ্যে জামিয়ায় ছাত্র প্রশিক্ষণের বিভিন্ন কর্মসূচি গ্রহণ করা হয়। শিক্ষার্থীদের জ্ঞানচর্চা, বাকশক্তি, লেখনীর দক্ষতা এবং সৃজনশীল প্রতিভা বিকাশে এ বিভাগ গুরুত্বপূর্ণ ভূমিকা পালন করে।",
    items: [
      {
        letter: "ক.",
        title: "ক. ছাত্র পাঠাগার",
        badge: "আল বালাগ ছাত্র পাঠাগার",
        paragraphs: [
          "পাঠ্যবইয়ের জ্ঞানের পাশাপাশি শিক্ষার্থীদের জ্ঞানের পরিধি বিস্তারের লক্ষ্যে বিভিন্নমুখী জ্ঞান-বিজ্ঞানের পুস্তক ও পত্র-পত্রিকাসমৃদ্ধ ‘আল বালাগ ছাত্র পাঠাগার’ নামে একটি পাঠাগার রয়েছে।",
          "শিক্ষানুরাগী ও ছাত্রবন্ধু মহানুভব ব্যক্তিদের আর্থিক অনুকূল্য লাভে সমর্থ হলে পাঠাগারটি আরও সমৃদ্ধ হবে।",
        ],
      },
      {
        letter: "খ.",
        title: "খ. বক্তৃতা প্রশিক্ষণ মজলিস",
        badge: "সাপ্তাহিক বক্তৃতা অনুশীলন",
        paragraphs: [
          "ইলমে দ্বীন অর্জনের পর দাওয়াত ও তাবলিগের দায়িত্ব পালনের প্রয়োজনীয়তাকে সামনে রেখে শিক্ষার্থীদের বাকশক্তির বিকাশ ঘটানো এবং আকর্ষণীয়ভাবে দাওয়াত পেশের যোগ্যতা অর্জনের উদ্দেশ্যে এ কার্যক্রম পরিচালিত হয়।",
          "অভিজ্ঞ শিক্ষকের তত্ত্বাবধানে সাপ্তাহিক বক্তৃতা প্রশিক্ষণ মজলিসের সুষ্ঠু ব্যবস্থা চালু রয়েছে।",
        ],
      },
      {
        letter: "গ.",
        title: "গ. দেয়াল পত্রিকা",
        badge: "বাংলা ও আরবি পত্রিকা ‘আল বালাগ’",
        paragraphs: [
          "লেখালেখির এ যুগে শিক্ষার্থীদের যোগ্য লেখক ও কলমসৈনিক হিসেবে গড়ে তোলার লক্ষ্যে ‘আল বালাগ’ নামে বাংলা ও আরবি পত্রিকা প্রকাশের ব্যবস্থা রয়েছে।",
          "শিক্ষার্থীরা উৎসাহ ও উদ্দীপনার সঙ্গে এর মাধ্যমে নিজেদের রচিত প্রবন্ধ ও কবিতা প্রকাশ করে থাকে। এ কার্যক্রম তাদের সৃজনশীলতা, ভাষাগত দক্ষতা ও সাহিত্যচর্চার বিকাশে সহায়তা করে।",
        ],
      },
    ],
  },
  futurePlans: {
    id: "future-plans",
    number: "৭",
    title: "৭। ভবিষ্যৎ পরিকল্পনা",
    intro:
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার শিক্ষাব্যবস্থাকে আরও সমৃদ্ধ, যুগোপযোগী ও বহুমুখী করার লক্ষ্যে বিভিন্ন উন্নয়নমূলক পরিকল্পনা গ্রহণ করা হয়েছে। শিক্ষার্থীদের দ্বীনি জ্ঞান, ভাষাগত দক্ষতা, লেখনীর যোগ্যতা, প্রযুক্তিগত জ্ঞান ও পেশাগত দক্ষতা বৃদ্ধির উদ্দেশ্যে নিম্নোক্ত কার্যক্রমগুলো পর্যায়ক্রমে চালু ও সম্প্রসারণের পরিকল্পনা রয়েছে।",
    items: [
      {
        num: "১।",
        title: "ইফতা বিভাগ",
        desc: "উচ্চতর ফিকহি জ্ঞান অর্জন এবং ফতোয়া প্রদানের যোগ্যতা সৃষ্টির লক্ষ্যে ইফতা বিভাগ চালুর পরিকল্পনা।",
      },
      {
        num: "২।",
        title: "তাফসির বিভাগ",
        desc: "পবিত্র কুরআনের গভীর জ্ঞান ও তাফসিরশাস্ত্রে উচ্চতর অধ্যয়নের সুযোগ সৃষ্টি।",
      },
      {
        num: "৩।",
        title: "হাদিস বিভাগ",
        desc: "হাদিসশাস্ত্রে উচ্চতর জ্ঞানার্জন ও গবেষণার সুযোগ সম্প্রসারণ।",
      },
      {
        num: "৪।",
        title: "আদব ও তারিখ",
        desc: "ইসলামী সাহিত্য, আরবি আদব এবং ইসলামের ইতিহাসচর্চার উন্নয়ন।",
      },
      {
        num: "৫।",
        title: "লেখালেখি কোর্স",
        desc: "শিক্ষার্থীদের প্রবন্ধ, নিবন্ধ, কবিতা ও সৃজনশীল লেখালেখিতে দক্ষ করে তোলার জন্য বিশেষ প্রশিক্ষণের ব্যবস্থা।",
      },
      {
        num: "৬।",
        title: "কম্পিউটার প্রশিক্ষণ",
        desc: "আধুনিক প্রযুক্তির সঙ্গে শিক্ষার্থীদের পরিচিত করা এবং কম্পিউটার ব্যবহারে দক্ষতা বৃদ্ধির ব্যবস্থা।",
      },
      {
        num: "৭।",
        title: "সাংবাদিকতা প্রশিক্ষণ",
        desc: "সংবাদ লেখা, প্রতিবেদন তৈরি, সম্পাদনা ও সাংবাদিকতার মৌলিক বিষয়ে প্রশিক্ষণ প্রদান।",
      },
      {
        num: "৮।",
        title: "মুকালামাতুল আরাবিয়্যাহ ও ইংরেজি কথোপকথন কোর্স",
        desc: "শিক্ষার্থীদের আরবি ও ইংরেজি ভাষায় সাবলীলভাবে কথা বলা, যোগাযোগ করা এবং ভাষাগত দক্ষতা বৃদ্ধির জন্য বিশেষ কোর্স চালুর পরিকল্পনা।",
      },
    ],
  },
  academicGoals: {
    id: "academic-goals",
    number: "৮",
    title: "৮। শিক্ষার লক্ষ্য ও প্রত্যয়",
    mainGoal:
      "জামিয়ার শিক্ষাকার্যক্রমের মূল লক্ষ্য হলো পবিত্র কুরআন ও সুন্নাহর আলোকে শিক্ষার্থীদের সুশিক্ষিত, আদর্শবান, নৈতিকতাসম্পন্ন ও যোগ্য মানুষ হিসেবে গড়ে তোলা।",
    pointsIntro: "এ লক্ষ্যে—",
    points: [
      "বিশুদ্ধ দ্বীনি জ্ঞান ও ইসলামী আদর্শের চর্চা বৃদ্ধি করা।",
      "উন্নত চরিত্র, শৃঙ্খলাবোধ ও নৈতিক মূল্যবোধ গড়ে তোলা।",
      "ভাষাগত দক্ষতা ও সাধারণ জ্ঞানের পরিধি বিস্তৃত করা।",
      "শিক্ষার্থীদের বক্তৃতা, লেখালেখি ও সৃজনশীল প্রতিভার বিকাশ ঘটানো।",
      "আধুনিক জ্ঞান-বিজ্ঞান ও প্রযুক্তি সম্পর্কে প্রয়োজনীয় দক্ষতা অর্জনে উৎসাহিত করা।",
      "সমাজ ও দেশের কল্যাণে ভূমিকা রাখতে সক্ষম দায়িত্বশীল প্রজন্ম গড়ে তোলা।",
    ],
  },
  conclusion: {
    title: "উপসংহার",
    paragraphs: [
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা দ্বীনি শিক্ষার প্রসার, কুরআন-সুন্নাহর আলোকে জীবন গঠন এবং শিক্ষার্থীদের বহুমুখী যোগ্যতা বিকাশের প্রত্যয়ে পরিচালিত একটি শিক্ষাপ্রতিষ্ঠান। মক্তব, হিফজ, হিফজ রিভিশন, কিতাব, মাদানি নেসাব ও ছাত্র প্রশিক্ষণ কার্যক্রমের মাধ্যমে শিক্ষার্থীদের জ্ঞান, চরিত্র ও দক্ষতার সমন্বিত বিকাশে গুরুত্ব দেওয়া হয়।",
      "দ্বীনি শিক্ষার উৎকর্ষ সাধন এবং প্রয়োজনীয় সাধারণ ও দক্ষতাভিত্তিক শিক্ষার সমন্বয়ে আদর্শ মানুষ গড়ে তোলাই জামিয়ার অঙ্গীকার।",
    ],
    footerName: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    footerSlogan: "কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার প্রত্যয়।",
  },
};

export const orphanagePageData = {
  header: {
    title: "এতিমখানা ও সহযোগিতা",
    subtitle: "সুবিধাবঞ্চিত ও এতিম শিক্ষার্থীদের দ্বীনি শিক্ষা, আবাসন ও সার্বিক কল্যাণমূলক কার্যক্রম",
    tagline: "কুরআন-সুন্নাহর আলোকে মানবসেবা ও সদকায়ে জারিয়া",
  },
  toc: [
    { id: "intro", title: "১. এতিমখানা পরিচিতি" },
    { id: "hostel-construction", title: "ছাত্রাবাসের ৪র্থ তলা নির্মাণ প্রকল্প" },
    { id: "registration", title: "২. এতিমখানার সরকারি নিবন্ধন" },
    { id: "appeal", title: "৩. সহযোগিতার আবেদন ও খাতসমূহ" },
    { id: "funds", title: "৪. অনুদানের ফান্ড (সাধারণ ও লিল্লাহ)" },
    { id: "payment-methods", title: "৫. অনুদান পাঠানোর মাধ্যম (বিকাশ ও ব্যাংক)" },
    { id: "contact", title: "৬. যোগাযোগ ও অনুদান নিশ্চিতকরণ" },
    { id: "call-to-action", title: "৭. আসুন, এতিম শিশুদের পাশে দাঁড়াই" },
  ],
  intro: {
    id: "intro",
    sectionNo: "১",
    title: "১. এতিমখানা পরিচিতি",
    paragraphs: [
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার একটি বিশেষ ও গুরুত্বপূর্ণ শাখা হলো এতিমখানা বিভাগ। এ বিভাগের মাধ্যমে এতিম, গরিব ও অসহায় শিক্ষার্থীদের দ্বীনি শিক্ষার পাশাপাশি থাকা-খাওয়া, পোশাক, চিকিৎসা ও অন্যান্য প্রয়োজন পূরণে সহযোগিতা করা হয়।",
      "এতিম শিক্ষার্থীদের শিক্ষা অব্যাহত রাখা এবং তাদের সুন্দর ভবিষ্যৎ গড়ার লক্ষ্যে আপনাদের আন্তরিক সহযোগিতা একান্তভাবে কাম্য।",
    ],
    features: [
      "এতিম ও অসহায় শিক্ষার্থীদের জন্য সম্পূর্ণ বিনামূল্যে থাকা ও স্বাস্থ্যসম্মত পুষ্টিকর খাদ্য পরিবেশন",
      "কুরআন শিক্ষা, হিফজুল কুরআন, কিতাব ও মাদানি নেসাবে পাঠদানের পূর্ণ সুযোগ",
      "পোশাক-পরিচ্ছদ, পাঠ্যবই, খাতা-কলম ও শিক্ষা উপকরণ নিয়মিত বিতরণ",
      "নিয়মিত শারীরিক পরিচর্যা ও জরুরি চিকিৎসার সুব্যবস্থা",
    ],
  },
  hostelConstruction: {
    id: "hostel-construction",
    badge: "চলমান অবকাঠামো সম্প্রসারণ প্রকল্প",
    title: "নির্মাণ প্রকল্প",
    subtitle: "ছাত্রাবাসের চতুর্থ তলা নির্মাণে এগিয়ে আসুন",
    motto: "একটি সুন্দর আবাসন, শিক্ষার্থীদের জন্য সুন্দর ভবিষ্যৎ।",
    salam: "আসসালামু আলাইকুম ওয়া রহমাতুল্লাহি ওয়া বারাকাতুহু।",
    necessityTitle: "প্রকল্পের পরিচিতি ও প্রয়োজনীয়তা",
    necessityParagraphs: [
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার শিক্ষার্থীদের আবাসনব্যবস্থা আরও উন্নত করার লক্ষ্যে বর্তমানে বিদ্যমান তিনতলা ছাত্রাবাস ভবনটি চতুর্থ তলা পর্যন্ত সম্প্রসারণ করা বিশেষভাবে প্রয়োজন।",
      "শিক্ষার্থীদের আবাসনের চাহিদা পূরণ এবং তাদের থাকা ও পড়াশোনার পরিবেশ উন্নত করার জন্য এ নির্মাণ প্রকল্প গুরুত্বপূর্ণ। প্রকল্পটি বাস্তবায়িত হলে শিক্ষার্থীদের আবাসনের সুযোগ বৃদ্ধি পাবে এবং তাদের দৈনন্দিন জীবনযাপনে সহায়ক পরিবেশ গড়ে তোলা সম্ভব হবে, ইনশাআল্লাহ।",
    ],
    appealTitle: "নির্মাণকাজ সম্পন্ন করতে আপনাদের সহযোগিতা কাম্য",
    appealAudience: "সম্মানিত ধর্মপ্রাণ মুসলমান, দানশীল ব্যক্তি, প্রবাসী ভাই-বোন, ব্যবসায়ী ও শুভানুধ্যায়ীগণ!",
    appealParagraph:
      "এই প্রয়োজনীয় নির্মাণকাজ বাস্তবায়নে আপনাদের আন্তরিক সহযোগিতা একান্তভাবে কামনা করছি। আপনাদের সম্মিলিত প্রচেষ্টা ও অনুদানের মাধ্যমে ছাত্রাবাসের চতুর্থ তলা নির্মাণের কাজ এগিয়ে নেওয়া সম্ভব হবে, ইনশাআল্লাহ।",
    waysToHelpTitle: "যেভাবে সহযোগিতা করতে পারেন",
    waysToHelp: [
      "১. নির্মাণকাজের জন্য আর্থিক অনুদান প্রদান করে।",
      "২. সিমেন্ট, রড, ইটসহ প্রয়োজনীয় নির্মাণসামগ্রী দিয়ে।",
      "৩. এককালীন অথবা নিয়মিত অনুদানের মাধ্যমে।",
      "৪. দানশীল ব্যক্তি, আত্মীয়স্বজন ও শুভানুধ্যায়ীদের এ প্রকল্পে অংশ নিতে উৎসাহিত করে।",
    ],
    closingNote: "আপনার সামর্থ্য অনুযায়ী প্রতিটি সহযোগিতাই এ নির্মাণ প্রকল্পের জন্য মূল্যবান।",
    donationNoticeTitle: "নির্মাণ প্রকল্পে অনুদান প্রদান",
    donationNoticeParagraph: "ছাত্রাবাসের চতুর্থ তলা নির্মাণে সহযোগিতা করতে মাদরাসা কর্তৃপক্ষের সঙ্গে যোগাযোগ করুন।",
    contactDetails: {
      phone: "+8801716296379",
      email: "jamianesaria@gmail.com",
      address: "মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।",
    },
    donationInstruction:
      "অনুদান দেওয়ার আগে কর্তৃপক্ষের কাছ থেকে অনুমোদিত হিসাব ও অনুদান জমার পদ্ধতি নিশ্চিত হয়ে নিন। অনুদানের উদ্দেশ্য হিসেবে “ছাত্রাবাসের চতুর্থ তলা নির্মাণ প্রকল্প” উল্লেখ করুন, যাতে অর্থ নির্দিষ্ট নির্মাণকাজের জন্য চিহ্নিত করা যায়।",
    callToActionTitle: "আসুন, নির্মাণকাজে অংশীদার হই",
    callToActionText:
      "একটি সুন্দর আবাসন শিক্ষার্থীদের পড়াশোনা ও জীবনযাপনের পরিবেশ উন্নত করতে সহায়তা করে। আসুন, আমরা সবাই মিলে ছাত্রাবাসের চতুর্থ তলা নির্মাণে সহযোগিতার হাত বাড়িয়ে দিই এবং দ্বীনি শিক্ষার এই প্রতিষ্ঠানের কল্যাণমূলক কার্যক্রমকে এগিয়ে নিতে পাশে দাঁড়াই।",
    duaText:
      "মহান আল্লাহ তাআলা আপনাদের দান-সদকা কবুল করুন, সম্পদে বরকত দান করুন এবং এই কল্যাণকর কাজে অংশগ্রহণের উত্তম প্রতিদান দান করুন। আমিন।",
    signatory: {
      text: "আবেদনক্রমে,\nমাদরাসা কর্তৃপক্ষ",
      institution: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
      address: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ।",
    },
  },
  registration: {
    id: "registration",
    sectionNo: "২",
    title: "২. এতিমখানার সরকারি নিবন্ধন",
    registeredName: "নেছারিয়া হাফিজিয়া এতিমখানা ও ইসলামিয়া মাদরাসা",
    registrationDate: "০৯ নভেম্বর ১৯৭৬",
    authority: "সমাজসেবা অধিদপ্তর, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার",
    regNumber: "ঢ-০৫০৪",
  },
  appeal: {
    id: "appeal",
    sectionNo: "৩",
    title: "৩. এতিমখানার জন্য সহযোগিতার আবেদন",
    salutation: "সম্মানিত ধর্মপ্রাণ মুসলমান, দানশীল ব্যক্তি, প্রবাসী ভাই-বোন ও শুভানুধ্যায়ীগণ!",
    introParagraph:
      "এতিম ও অসহায় শিক্ষার্থীদের খাবার, পোশাক, শিক্ষা উপকরণ, চিকিৎসা ও অন্যান্য প্রয়োজন পূরণে আপনাদের সহযোগিতা কামনা করছি।",
    waysTitle: "আপনারা যেভাবে সহযোগিতা করতে পারেন—",
    ways: [
      "১. আর্থিক অনুদান প্রদান করে।",
      "২. খাদ্যসামগ্রী ও পোশাক দিয়ে।",
      "৩. বই-খাতা ও শিক্ষা উপকরণ দিয়ে।",
      "৪. চিকিৎসা ও স্বাস্থ্যসেবায় সহযোগিতা করে।",
      "৫. এককালীন অথবা নিয়মিত মাসিক অনুদান দিয়ে।",
    ],
    inspiringNote:
      "আপনার সামান্য সহযোগিতাও একজন এতিম শিশুর শিক্ষা ও সুন্দর ভবিষ্যৎ গড়ার পথে গুরুত্বপূর্ণ ভূমিকা রাখতে পারে।",
  },
  funds: {
    id: "funds",
    sectionNo: "৪",
    title: "৪. অনুদানের ফান্ড",
    items: [
      {
        id: "general-fund",
        number: "৪.১",
        title: "৪.১ সাধারণ ফান্ড",
        desc: "সাধারণ দান ও এককালীন অনুদান প্রতিষ্ঠানের অনুমোদিত প্রয়োজন, পরিচালন ব্যয় ও অন্যান্য নির্ধারিত খাতে ব্যয় করা হয়।",
        category: "সাধারণ দান ও পরিচালন ব্যয়",
      },
      {
        id: "goraba-fund",
        number: "৪.২",
        title: "৪.২ লিল্লাহ/গোরাবা ফান্ড",
        desc: "যাকাত, ফেতরা, কাফফারা, ফিদইয়া, মান্নত এবং কোরবানির চামড়া বা তার মূল্য শরিয়তসম্মত বিধান ও দানের নির্ধারিত উদ্দেশ্য অনুযায়ী যোগ্য এতিম, গরিব ও অসহায় শিক্ষার্থীদের কল্যাণে ব্যয় করা হয়।",
        category: "যাকাত, ফেতরা, কাফফারা ও ফিদইয়া",
      },
    ],
  },
  paymentMethods: {
    id: "payment-methods",
    sectionNo: "৫",
    title: "৫. অনুদান পাঠানোর মাধ্যম",
    bkash: {
      number: "+8801716296379",
      numberRaw: "01716296379",
      title: "৫.১ বিকাশ (bKash)",
    },
    gorabaAccount: {
      number: "৫.২",
      title: "৫.২ গোরাবা ফান্ড",
      bankName: "Sonali Bank PLC",
      branch: "BSCIC Branch, Tongi",
      accountType: "Current Account",
      accountNumber: "34004081",
      note: "যাকাত, ফেতরা, কাফফারা, ফিদইয়া ও এতিম শিক্ষার্থীদের খাদ্য-চিকিৎসার জন্য নির্ধারিত।",
    },
    generalAccount: {
      number: "৫.৩",
      title: "৫.৩ সাধারণ ফান্ড",
      bankName: "Bangladesh Krishi Bank",
      branch: "Tongi Branch",
      accountType: "Current Account",
      accountNumber: "42080310061842",
      note: "সাধারণ দান, নির্মাণকাজ, পরিচালন ব্যয় ও মাদরাসার সাধারণ উন্নয়ন খাতের জন্য নির্ধারিত।",
    },
    importantNotice:
      "অনুদান পাঠানোর আগে মাদরাসা কর্তৃপক্ষের মাধ্যমে হিসাবের তথ্য নিশ্চিত হয়ে নিন। অনুদান পাঠানোর পর রসিদ বা নিশ্চিতকরণের জন্য কর্তৃপক্ষের সঙ্গে যোগাযোগ করুন।",
  },
  contact: {
    id: "contact",
    sectionNo: "৬",
    title: "৬. যোগাযোগ",
    mobile: "+8801716296379",
    email: "jamianesaria@gmail.com",
    address: "মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।",
  },
  callToAction: {
    id: "call-to-action",
    sectionNo: "৭",
    title: "৭. আসুন, এতিম শিশুদের পাশে দাঁড়াই",
    appealText:
      "এতিম ও অসহায় শিক্ষার্থীদের দ্বীনি শিক্ষা, খাবার, চিকিৎসা ও সার্বিক কল্যাণে আপনার সামর্থ্য অনুযায়ী সহযোগিতার হাত বাড়িয়ে দিন।",
    duaText:
      "মহান আল্লাহ তাআলা আপনাদের দান-সদকা কবুল করুন, সম্পদে বরকত দান করুন এবং উত্তম প্রতিদান দান করুন। আমিন।",
    signatory: "আবেদনক্রমে,\nএতিমখানা পরিচালনা কর্তৃপক্ষ\nজামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  },
};