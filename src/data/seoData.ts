// Public routes only. Student records, submissions, API handlers and Studio never belong here.
export const SITE_URL = "https://nesariamadrasa.com";
export const seoDefaults = {
  siteName: "জামিয়া নেছারিয়া ইসলামিয়া",
  description: "টঙ্গী, গাজীপুরের জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা। মক্তব, হিফজ, কিতাব ও মাদানি নেসাব বিভাগের শিক্ষা, ভর্তি তথ্য, নোটিশ ও যোগাযোগ।",
  image: "/social-share.png",
  homeLabel: "হোম",
  breadcrumbLabel: "পাতার অবস্থান (Breadcrumb)",
};

export interface SeoRoute { label: string; parent?: string; heading?: boolean; document?: string }
export const seoRoutes: Record<string, SeoRoute> = {
  "/": { label: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা, টঙ্গী", document: "HomePrimarySection" },
  "/about": { label: "জামিয়া পরিচিতি", document: "AboutJamiaSection" },
  "/about/infrastructure": { label: "ভৌত অবকাঠামো ও সুযোগ-সুবিধা", parent: "/about", heading: true, document: "PhysicalInfrastructureSection" },
  "/about/vacancy": { label: "নিয়োগ বিজ্ঞপ্তি", parent: "/about", heading: true, document: "VacancyNoticeTable" },
  "/academics": { label: "শিক্ষা বিভাগ ও পাঠ্যক্রম", document: "AcademicsPageSection" },
  "/admission": { label: "ভর্তি তথ্য, যোগ্যতা ও ফি", document: "AdmissionInfoSection" },
  "/apply": { label: "অনলাইন ভর্তি আবেদন", parent: "/admission", heading: true, document: "ApplyOnlineForm" },
  "/teachers": { label: "শিক্ষক ও উলামায়ে কেরাম", document: "FacultyAndTeachersSection" },
  "/committee": { label: "পরিচালনা পরিষদ ও জমিদাতাবৃন্দ", document: "ManagingCommitteeSection" },
  "/contact": { label: "যোগাযোগ ও ঠিকানা", heading: true, document: "ContactSection" },
  "/orphanage": { label: "এতিমখানা ও সহযোগিতা", document: "OrphanageSection" },
  "/badri-kafila": { label: "৩১৩ বদরি কাফেলা ও আজীবন দাতা সদস্য", document: "BadriKafilaSection" },
  "/blog": { label: "ব্লগ ও ইসলামি প্রবন্ধ", document: "BlogSection" },
  "/notices": { label: "নোটিশ ও বিজ্ঞপ্তি", document: "NoticeBoardSection" },
  "/exam-routine": { label: "পরীক্ষার রুটিন", parent: "/academics", heading: true, document: "ExamRoutineSection" },
  "/functions/class-routine": { label: "ক্লাস রুটিন", parent: "/academics", heading: true, document: "ClassRoutineSection" },
  "/functions/event-list": { label: "অনুষ্ঠান ও কর্মসূচি", parent: "/notices", heading: true, document: "EventListTable" },
  "/functions/holiday": { label: "ছুটির তালিকা", parent: "/notices", heading: true, document: "HolidayListTable" },
  "/results/academic": { label: "একাডেমিক পরীক্ষার প্রকাশিত ফলাফল", parent: "/academics", heading: true, document: "PublicResultsSection" },
  "/results/admission": { label: "ভর্তি পরীক্ষার প্রকাশিত ফলাফল", parent: "/admission", heading: true, document: "PublicResultsSection" },
  "/gallery": { label: "ছবি ও ভিডিও গ্যালারি", document: "MainGallerySection" },
  "/gallery/photo": { label: "ফটো গ্যালারি", parent: "/gallery", heading: true, document: "PhotoGallerySection" },
  "/gallery/video": { label: "ভিডিও গ্যালারি", parent: "/gallery", heading: true, document: "VideoGallerySection" },
};

export function absoluteUrl(path: string): string { return new URL(path, SITE_URL).href; }
export function blogPath(slug: string): string { return `/blog/${encodeURIComponent(slug)}`; }
export function pageSeoDocumentId(route: string): string { return `seo-page-${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}`; }
export function jsonLd(value: unknown): string { return JSON.stringify(value).replace(/</g, "\\u003c"); }
