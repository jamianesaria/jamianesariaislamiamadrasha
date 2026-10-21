export interface DepartmentAdmissionRule {
  id: string;
  name: string;
  eligibility: string[];
  ageLimit: string;
  livingType: string;
  badge?: string;
}

export interface AdmissionFeeItem {
  name: string;
  amount: number;
}

export interface AdmissionFeeCategory {
  title: string;
  items: AdmissionFeeItem[];
  total: number;
}

export interface MonthlyExpenseDepartment {
  id: string;
  title: string;
  type: "অনাবাসিক" | "আবাসিক";
  items: { name: string; amount: number }[];
  total: number;
}

export interface EmdadiKhanaExpense {
  title: string;
  items: { name: string; amount: number }[];
  note: string;
}

export interface OfficialAdmissionInfo {
  institutionName: string;
  address: string;
  slogan: string;
  sessionName: string;
  hijriYear: string;
  status: "open" | "upcoming" | "closed";
  statusText: string;
  // ১. ভর্তি কার্যক্রম
  overview: string;
  // ২. ভর্তির সময়সীমা
  timelines: {
    arabic: string;
    english: string;
  };
  // ৩. বিভাগসমূহ ও ভর্তির যোগ্যতা
  departments: DepartmentAdmissionRule[];
  // ৪. ভর্তি পরীক্ষা ও ফলাফল
  examInfo: {
    method: string;
    resultPublish: string;
  };
  // ৫. ভর্তি প্রক্রিয়া
  admissionProcess: {
    intro: string;
    steps: string[];
    formDownloadNote: string;
    pdfDownloadUrl: string;
  };
  // ৬. ভর্তির জন্য প্রয়োজনীয় কাগজপত্র
  requiredDocuments: string[];
  // ৭. এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা
  orphanFacility: {
    title: string;
    description: string;
    verificationConditions: string[];
  };
  // ৮. বিভাগভিত্তিক ভর্তি ফি
  admissionFees: {
    newStudents: AdmissionFeeCategory;
    oldStudents: AdmissionFeeCategory;
  };
  // ৯. বিভাগভিত্তিক মাসিক খরচ
  monthlyExpenses: MonthlyExpenseDepartment[];
  emdadiKhana: EmdadiKhanaExpense;
  // ১০. যোগাযোগ
  contacts: {
    address: string;
    personnel: {
      role: string;
      phone: string;
      rawPhone: string;
    }[];
    note: string;
  };
  // ১১. অভিভাবকদের জন্য বিশেষ নির্দেশনা
  guardianGuidelines: string[];
}

export const officialAdmissionData: OfficialAdmissionInfo = {
  institutionName: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  address: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ।",
  slogan: "কুরআন-সুন্নাহর আলোকে আদর্শ মানুষ গড়ার প্রত্যয়।",
  sessionName: "২০২৬–২০২৭ খ্রিষ্টাব্দ",
  hijriYear: "১৪৪৭–১৪৪৮ হিজরি",
  status: "open",
  statusText: "ভর্তি কার্যক্রম চলমান",

  // ১. ভর্তি কার্যক্রম
  overview:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানায় বিভিন্ন শিক্ষাবিভাগে ভর্তিচ্ছু শিক্ষার্থীদের ভর্তি কার্যক্রম নির্ধারিত সময়সূচি ও নিয়মাবলি অনুযায়ী পরিচালিত হয়। আগ্রহী শিক্ষার্থী ও অভিভাবকদের সংশ্লিষ্ট বিভাগের ভর্তির যোগ্যতা, বয়সসীমা, ভর্তি পরীক্ষা, প্রয়োজনীয় কাগজপত্র ও ফি সম্পর্কে জেনে নির্ধারিত সময়ের মধ্যে ভর্তি কার্যক্রম সম্পন্ন করার জন্য অনুরোধ করা যাচ্ছে।",

  // ২. ভর্তির সময়সীমা
  timelines: {
    arabic: "প্রতি বছর শাওয়াল মাসের ৮ তারিখ থেকে ১৫ শাওয়াল পর্যন্ত।",
    english: "প্রতি বছর ১ জানুয়ারি থেকে ১৫ জানুয়ারি পর্যন্ত।",
  },

  // ৩. বিভাগসমূহ ও ভর্তির যোগ্যতা
  departments: [
    {
      id: "maktab",
      name: "ক. মক্তব বিভাগ",
      eligibility: ["বাংলা রিডিং পড়ার যোগ্যতা থাকতে হবে।"],
      ageLimit: "৬ থেকে ৮ বছর।",
      livingType: "আবাসিক ও অনাবাসিক উভয় ব্যবস্থায় ভর্তির সুযোগ রয়েছে।",
      badge: "নূরানী ও বুনিয়াদি শিক্ষা",
    },
    {
      id: "hifz",
      name: "খ. হিফজ বিভাগ",
      eligibility: [
        "শুদ্ধভাবে ও দ্রুত নাজেরা পড়ার যোগ্যতা থাকতে হবে।",
        "ভর্তি পরীক্ষায় উত্তীর্ণ হতে হবে।",
      ],
      ageLimit: "৮ থেকে ১০ বছর।",
      livingType: "আবাসিক ব্যবস্থায় অধ্যয়নের সুযোগ রয়েছে।",
      badge: "হিফজুল কুরআনুল কারিম",
    },
    {
      id: "kitab",
      name: "গ. কিতাব বিভাগ",
      eligibility: [
        "ভর্তিচ্ছু শিক্ষার্থীকে নির্ধারিত জামাতের ভর্তি পরীক্ষায় উত্তীর্ণ হতে হবে।",
        "মাদানী নেসাবের ১ম, ২য় ও ৩য় বর্ষ এবং তাকমিল (দাওরায়ে হাদিস) জামাত পর্যন্ত অধ্যয়নের সুযোগ রয়েছে।",
      ],
      ageLimit: "নির্ধারিত কোনো বয়সসীমা নেই।",
      livingType: "আবাসিক ও অনাবাসিক উভয় ব্যবস্থায় অধ্যয়নের সুযোগ রয়েছে।",
      badge: "মাদানী নেসাব ও দাওরায়ে হাদিস",
    },
  ],

  // ৪. ভর্তি পরীক্ষা ও ফলাফল
  examInfo: {
    method: "মৌখিক পরীক্ষা।",
    resultPublish: "প্রতিদিনের ভর্তি পরীক্ষার ফলাফল প্রতিদিন প্রকাশ করা হবে।",
  },

  // ৫. ভর্তি প্রক্রিয়া
  admissionProcess: {
    intro:
      "ভর্তিচ্ছু শিক্ষার্থী ও অভিভাবকেরা সরাসরি মাদরাসায় উপস্থিত হয়ে অথবা অনলাইনের মাধ্যমে ভর্তি কার্যক্রমে অংশগ্রহণ করতে পারবেন।",
    steps: [
      "মাদরাসার অফিস থেকে সরাসরি ভর্তি ফরম সংগ্রহ করুন অথবা ওয়েবসাইট থেকে ভর্তি ফরমের PDF ডাউনলোড করুন।",
      "ভর্তি ফরমে প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।",
      "প্রয়োজনীয় কাগজপত্রসহ ভর্তি আবেদন জমা দিন।",
      "নির্ধারিত মৌখিক ভর্তি পরীক্ষায় অংশগ্রহণ করুন।",
      "পরীক্ষার ফলাফল প্রকাশের পর নির্বাচিত হলে ভর্তি কার্যক্রম সম্পন্ন করুন।",
    ],
    formDownloadNote:
      "ওয়েবসাইটে “ভর্তি ফরম ডাউনলোড (PDF)” নামে একটি লিংক থাকবে। মাদরাসার অনুমোদিত ভর্তি ফরমের PDF ফাইল সেখানে যুক্ত করা হবে।",
    pdfDownloadUrl: "/download/admission-form.pdf",
  },

  // ৬. ভর্তির জন্য প্রয়োজনীয় কাগজপত্র
  requiredDocuments: [
    "শিক্ষার্থীর জন্মনিবন্ধন সনদের ফটোকপি।",
    "কমিশনার/চেয়ারম্যান কর্তৃক প্রদত্ত প্রত্যয়নপত্রের ফটোকপি।",
    "পাসপোর্ট সাইজের দুই কপি ছবি।",
    "এতিম শিক্ষার্থীদের ক্ষেত্রে পিতা অথবা মাতার যেকোনো একজনের মৃত্যুর প্রমাণ হিসেবে অনলাইনে যাচাইযোগ্য মৃত্যু সনদ।",
  ],

  // ৭. এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা
  orphanFacility: {
    title: "এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা",
    description:
      "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানায় এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য সম্পূর্ণ থাকা, খাওয়া ও পড়াশোনার সুব্যবস্থা রয়েছে। এসব শিক্ষার্থীর ধর্মীয় শিক্ষা, নৈতিক গঠন এবং সুন্দর ভবিষ্যৎ নির্মাণে প্রতিষ্ঠানটি আন্তরিকভাবে কাজ করে যাচ্ছে।",
    verificationConditions: [
      "শিক্ষার্থীর বয়স ১৮ বছরের কম হতে হবে।",
      "শিক্ষার্থীর জন্মনিবন্ধন সনদ জমা দিতে হবে।",
      "পিতা অথবা মাতার যেকোনো একজনের মৃত্যুর প্রমাণ হিসেবে অনলাইনে যাচাইযোগ্য মৃত্যু সনদ জমা দিতে হবে।",
      "জমা দেওয়া কাগজপত্র যাচাইয়ের মাধ্যমে শিক্ষার্থীর যোগ্যতা নিশ্চিত করা হবে।",
      "যোগ্যতা যাচাইয়ের পর নির্বাচিত শিক্ষার্থীরা মাদরাসার নির্ধারিত সুবিধা গ্রহণ করতে পারবেন।",
    ],
  },

  // ৮. বিভাগভিত্তিক ভর্তি ফি
  admissionFees: {
    newStudents: {
      title: "নতুন শিক্ষার্থীদের ভর্তি ফি",
      items: [
        { name: "ভর্তি ফি", amount: 3200 },
        { name: "ভর্তি ফরম", amount: 100 },
        { name: "ছাত্র পাঠাগার", amount: 200 },
      ],
      total: 3500,
    },
    oldStudents: {
      title: "পুরাতন শিক্ষার্থীদের ভর্তি ফি",
      items: [
        { name: "ভর্তি ফি", amount: 2900 },
        { name: "ভর্তি ফরম", amount: 100 },
        { name: "ছাত্র পাঠাগার", amount: 200 },
      ],
      total: 3200,
    },
  },

  // ৯. বিভাগভিত্তিক মাসিক খরচ
  monthlyExpenses: [
    {
      id: "maktab-non-res",
      title: "ক. মক্তব বিভাগ (অনাবাসিক)",
      type: "অনাবাসিক",
      items: [{ name: "মাসিক বেতন", amount: 1200 }],
      total: 1200,
    },
    {
      id: "nazera-res",
      title: "খ. নাজেরা বিভাগ (আবাসিক)",
      type: "আবাসিক",
      items: [
        { name: "বেতন ও আবাসিক চার্জ", amount: 1500 },
        { name: "মাসিক খোরাকি", amount: 2500 },
      ],
      total: 4000,
    },
    {
      id: "hifz-res",
      title: "গ. হিফজ বিভাগ (আবাসিক)",
      type: "আবাসিক",
      items: [
        { name: "বেতন ও আবাসিক চার্জ", amount: 1500 },
        { name: "মাসিক খোরাকি", amount: 2500 },
      ],
      total: 4000,
    },
    {
      id: "madani-res",
      title: "ঘ. মাদানী নেসাব বিভাগ (আবাসিক)",
      type: "আবাসিক",
      items: [
        { name: "বেতন ও আবাসিক চার্জ", amount: 1500 },
        { name: "মাসিক খোরাকি", amount: 2500 },
      ],
      total: 4000,
    },
    {
      id: "kitab-res",
      title: "ঙ. কিতাব বিভাগ (আবাসিক)",
      type: "আবাসিক",
      items: [
        { name: "বেতন ও আবাসিক চার্জ", amount: 1200 },
        { name: "মাসিক খোরাকি", amount: 2500 },
      ],
      total: 3700,
    },
  ],

  emdadiKhana: {
    title: "চ. এমদাদীখানার খরচ",
    items: [
      { name: "নাশতা বাবদ মাসিক খরচ", amount: 1000 },
      { name: "দুই বেলা গ্রহণের জন্য এককালীন খরচ", amount: 2000 },
    ],
    note: "এমদাদীখানার খরচ মূল মাসিক খরচের অতিরিক্ত কি না এবং দুই বেলার এককালীন খরচ কোন মেয়াদের জন্য প্রযোজ্য, তা মাদরাসা কর্তৃপক্ষের নির্দেশনা অনুযায়ী উল্লেখ করতে হবে।",
  },

  // ১০. যোগাযোগ
  contacts: {
    address: "মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ।",
    personnel: [
      { role: "মুহতামিম", phone: "০১৭১৬২৯৬৩৭৯", rawPhone: "01716296379" },
      { role: "নাজেমে তালিমাত", phone: "০১৭৩৪৩১৯৪২৬", rawPhone: "01734319426" },
      { role: "মাদরাসা অফিস", phone: "০১৯০১৪৪৭১৬০", rawPhone: "01901447160" },
    ],
    note: "ভর্তি-সংক্রান্ত যেকোনো তথ্য, নির্দেশনা ও সহযোগিতার জন্য সংশ্লিষ্ট দায়িত্বশীল ব্যক্তি অথবা মাদরাসা অফিসে যোগাযোগ করুন।",
  },

  // ১১. অভিভাবকদের জন্য বিশেষ নির্দেশনা
  guardianGuidelines: [
    "ভর্তির আগে সংশ্লিষ্ট বিভাগের যোগ্যতা ও বয়সসীমা যাচাই করুন।",
    "ভর্তি ফরমে সব তথ্য নির্ভুলভাবে পূরণ করুন।",
    "প্রয়োজনীয় কাগজপত্র সঙ্গে রাখুন।",
    "ভর্তি ফি ও মাসিক খরচ সম্পর্কে প্রয়োজনে মাদরাসা অফিসে যোগাযোগ করুন।",
    "এতিম শিক্ষার্থীদের বিশেষ সুবিধার জন্য নির্ধারিত কাগজপত্র জমা দিন।",
  ],
};

