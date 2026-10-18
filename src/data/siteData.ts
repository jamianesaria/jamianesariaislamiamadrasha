// Sanity-ready initial mock data structure
// Once Sanity CMS is hooked up, these can be replaced directly by groq queries!

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navigationItems: NavItem[] = [
  { label: "হোম", href: "/" },
  {
    label: "জামিয়া পরিচিতি",
    href: "/#welcome",
    children: [
      { label: "আমাদের জামিয়ায় স্বাগতম", href: "/#welcome" },
      { label: "এক নজরে আমাদের জামিয়া", href: "/#at-a-glance" },
      { label: "লক্ষ্য ও উদ্দেশ্য", href: "/#mission" },
      { label: "প্রতিষ্ঠানের ইতিহাস", href: "/about/history" },
      { label: "ভৌত অবকাঠামো", href: "/about/infrastructure" },
    ],
  },
  {
    label: "শিক্ষা বিভাগসমূহ",
    href: "/#departments",
    children: [
      { label: "মক্তব বিভাগ", href: "/#departments" },
      { label: "হিফজ বিভাগ", href: "/#departments" },
      { label: "হিফজ রিভিশন বিভাগ", href: "/#departments" },
      { label: "কিতাব বিভাগ", href: "/#departments" },
      { label: "মাদানি নেসাব", href: "/#departments" },
    ],
  },
  {
    label: "পাঠ্যক্রম ও কার্যক্রম",
    href: "/#curriculum",
    children: [
      { label: "পাঠ্যক্রম ও শিক্ষা কার্যক্রম", href: "/#curriculum" },
      { label: "ছাত্র প্রশিক্ষণ ও সহশিক্ষা", href: "/#training" },
      { label: "ক্লাস রুটিন", href: "/functions/class-routine" },
      { label: "পরীক্ষার রুটিন", href: "/exam-routine" },
    ],
  },
  {
    label: "ভর্তি তথ্য",
    href: "/#admission",
    children: [
      { label: "ভর্তি আহ্বান ও তথ্য", href: "/#admission" },
      { label: "অনলাইন ভর্তি আবেদন", href: "/apply" },
      { label: "ভর্তি পরীক্ষার ফলাফল", href: "/results/admission" },
    ],
  },
  {
    label: "নোটিশ ও বিজ্ঞপ্তি",
    href: "/#notices",
    children: [
      { label: "সকল নোটিশ ও বিজ্ঞপ্তি", href: "/#notices" },
      { label: "নোটিশ তালিকা", href: "/functions/notices" },
      { label: "ছুটির তালিকা", href: "/functions/holiday" },
    ],
  },
  {
    label: "গ্যালারি",
    href: "/#gallery",
    children: [
      { label: "আমাদের গ্যালারি", href: "/#gallery" },
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
  address: "মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন) টঙ্গী, গাজীপুর, বাংলাদেশ।",
  addressShort: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ",
  established: "১৯৬৯ খ্রিষ্টাব্দ",
  regNo: "ট-0504",
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
  "কুরআন-সুন্নাহর আলোকে দ্বীনি শিক্ষা, নৈতিকতা ও আদর্শ মানুষ গড়ার প্রত্যয়ে ১৯৬৯ খ্রিষ্টাব্দ থেকে পরিচালিত ঐতিহ্যবাহী দ্বীনি শিক্ষাপ্রতিষ্ঠান।",
  "ভর্তি ও শিক্ষা-সংক্রান্ত যেকোনো তথ্যের জন্য যোগাযোগ করুন: 01716296379 (মরকুন, তিস্তাগেট-আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর)।",
];

export const homePageContent = {
  hero: {
    image: "/prodhan_banner.jpeg",
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
    buttonHref: "/about/history",
  },
  atAGlance: {
    title: "এক নজরে আমাদের জামিয়া",
    established: "১৯৬৯ খ্রিষ্টাব্দ",
    mutawalli: "মনিরুজ্জামান মনু",
    landDonors: ["১। চান মিয়া", "২। আমেনা খাতুন", "৩। সফর বানু"],
    president: "কবির হোসেন শিমুল",
    muhtamim: "মুফতি মুখতার হোসাইন",
    academicPrograms: "মক্তব, হিফজ, হিফজ রিভিশন ও কিতাব বিভাগ",
    address: "মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন)\nটঙ্গী, গাজীপুর, বাংলাদেশ।",
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
    buttonText: "আমাদের লক্ষ্য ও উদ্দেশ্য",
    buttonHref: "/about/history",
  },
  departments: {
    title: "আমাদের শিক্ষা বিভাগসমূহ",
    items: [
      {
        id: "maktab",
        name: "মক্তব বিভাগ",
        description:
          "শিশুদের প্রাথমিক দ্বীনি শিক্ষা, আরবি বর্ণপরিচয়, কুরআন পাঠ, নামাজ ও প্রয়োজনীয় দোয়া-দরুদ শেখানোর ব্যবস্থা।",
        badge: "প্রাথমিক বুনিয়াদ",
      },
      {
        id: "hifz",
        name: "হিফজ বিভাগ",
        description:
          "দক্ষ শিক্ষকের তত্ত্বাবধানে পবিত্র কুরআনুল কারিম মুখস্থকরণ এবং শুদ্ধ তিলাওয়াতের প্রশিক্ষণ।",
        badge: "তাহফিজুল কুরআন",
      },
      {
        id: "hifz-revision",
        name: "হিফজ রিভিশন বিভাগ",
        description:
          "হিফজ সম্পন্নকারী শিক্ষার্থীদের কুরআন পুনরাবৃত্তি, স্মৃতিশক্তি দৃঢ়করণ ও তিলাওয়াতের মানোন্নয়ন।",
        badge: "ইয়াদ ও মানোন্নয়ন",
      },
      {
        id: "kitab",
        name: "কিতাব বিভাগ",
        description:
          "তাফসির, হাদিস, ফিকহ, আকাইদ, আরবি ভাষা-সাহিত্য ও উচ্চতর ইসলামী জ্ঞানচর্চার ধারাবাহিক পাঠদান।",
        badge: "উচ্চতর দ্বীনি শিক্ষা",
      },
      {
        id: "madani-nisab",
        name: "মাদানি নেসাব",
        description:
          "আধুনিক ও ফলপ্রসূ পদ্ধতিতে আরবি ভাষা, ব্যাকরণ ও দ্বীনি কিতাবসমূহের সমন্বিত বিশেষ নেসাব ও পাঠদান।",
        badge: "বিশেষ নেসাব",
      },
    ],
    buttonText: "সকল শিক্ষা বিভাগ দেখুন",
    buttonHref: "/#curriculum",
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
    buttonText: "পাঠ্যক্রম সম্পর্কে জানুন",
    buttonHref: "/functions/class-routine",
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
    buttonText: "আমাদের কার্যক্রম দেখুন",
    buttonHref: "/functions/event-list",
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
      "মাদরাসার বাস্তব কার্যক্রমের মাধ্যমে প্রতিষ্ঠানের শিক্ষা ও পরিবেশ তুলে ধরার জন্য এখানে থাকবে:",
    categories: [
      {
        id: "campus",
        title: "মাদরাসার ক্যাম্পাস ও ভবন",
        image: "/prodhan_banner.jpeg",
        caption: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার মূল ক্যাম্পাস ও একাডেমিক ভবন",
      },
      {
        id: "classroom",
        title: "শ্রেণিকক্ষ ও পাঠদান",
        image: "/prodhan_banner.jpeg",
        caption: "মনোরম ও সুশৃঙ্খল পরিবেশে শিক্ষার্থীদের নিয়মিত পাঠদান কার্যক্রম",
      },
      {
        id: "hifz-kitab",
        title: "হিফজ ও কিতাব বিভাগের কার্যক্রম",
        image: "/prodhan_banner.jpeg",
        caption: "দক্ষ শিক্ষকমণ্ডলীর তত্ত্বাবধানে হিফজুল কুরআন ও কিতাব বিভাগের দারস",
      },
      {
        id: "training-events",
        title: "ছাত্র প্রশিক্ষণ ও বিভিন্ন অনুষ্ঠান",
        image: "/prodhan_banner.jpeg",
        caption: "বক্তৃতা প্রশিক্ষণ, পাঠাগার ও সহশিক্ষা কার্যক্রমের বিশেষ মুহূর্ত",
      },
      {
        id: "awards",
        title: "পুরস্কার বিতরণী ও বিশেষ আয়োজন",
        image: "/prodhan_banner.jpeg",
        caption: "বার্ষিক পুরস্কার বিতরণী, দোয়া মাহফিল ও বিশেষ দ্বীনি আয়োজন",
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
      { label: "জামিয়া পরিচিতি", href: "/#welcome" },
      { label: "শিক্ষা বিভাগসমূহ", href: "/#departments" },
      { label: "পাঠ্যক্রম ও কার্যক্রম", href: "/#curriculum" },
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
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      name: "হাফেজ মাওলানা নাঈম মাহমুদ",
      designation: "প্রতিষ্ঠাতা চেয়ারম্যান",
      mobile: "০১৭১১-XXXXXX",
      address: "টঙ্গী, গাজীপুর",
      term: "২০২৪ - ২০২৬",
    },
    {
      id: 2,
      photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150",
      name: "মুফতি আব্দুর রহমান",
      designation: "সহ-সভাপতি",
      mobile: "০১৮১২-XXXXXX",
      address: "মরকুন, টঙ্গী",
      term: "২০২৪ - ২০২৬",
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