import { groq } from "next-sanity";
import { fetchSiteQuery } from "./fetch";
import { getEditableData } from "@/content/server";
import type { AdmissionContent } from "@/content/public-types";
import { stegaClean } from "@sanity/client/stega";
import { paragraphs, type SettingsDocument, type HomepageDocument, type NoticeDocument, type TeacherDocument, type CommitteeDocument, type BlogDocument, type ClassRoutineDocument, type ExamRoutineDocument, type ResultDocument, type PhotoDocument, type VideoDocument, type CalendarDocument, type VacancyDocument } from "./documents";
import { mapAcademicDepartments, type AcademicDepartmentRecord } from "./departments";
import {
  siteSettings as fallbackSettings,
  homePageContent as fallbackHomeSource,
  noticesData as fallbackNotices,
  committeeAndFacultyData,
  sampleBlogPosts as fallbackBlogPosts,
} from "@/data/siteData";
const fallbackHome = fallbackHomeSource;

// 1. Site Settings Query (Projected)
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  _id,
  _type,
  title,
  arabicTitle,
  englishTitle,
  establishedYear,
  slogan,
  phone,
  emergencyPhone,
  footerSlogan,
  establishedFull,
  applyUrl,
  onlineClassUrl,
  appDownloadUrl,
  email,
  address,
  addressFull,
  regSocialWelfare,
  regBefaq,
  regHaiatulUlya,
  mapEmbedUrl,
  facebookUrl,
  youtubeUrl,
  "headerBannerUrl":coalesce(headerBanner.asset->url,headerBannerUrl),
  "logoUrl": logo.asset->url
}`;

export async function getSiteSettings() {
  try {
    const data = await fetchSiteQuery<SettingsDocument | null>(siteSettingsQuery, {});
    if (data && (data.title || data.phone)) {
      return {
        ...fallbackSettings,
        ...data,
        nameBn: data.title || fallbackSettings.nameBn,
        nameAr: data.arabicTitle || fallbackSettings.nameAr,
        nameEn: data.englishTitle || fallbackSettings.nameEn,
        sloganBn: data.slogan || fallbackSettings.sloganBn,
        footerSloganBn: data.footerSlogan || data.slogan || fallbackSettings.footerSloganBn,
        establishedFull: data.establishedFull || fallbackSettings.establishedFull,
        applyUrl: data.applyUrl || fallbackSettings.applyUrl,
        onlineClassUrl: data.onlineClassUrl || fallbackSettings.onlineClassUrl,
        appDownloadUrl: data.appDownloadUrl || fallbackSettings.appDownloadUrl,
        address: data.addressFull || fallbackSettings.address,
        addressShort: data.address || fallbackSettings.addressShort,
        established: data.establishedYear
          ? `${data.establishedYear} খ্রিষ্টাব্দ`
          : fallbackSettings.established,
        phone: data.phone || fallbackSettings.phone,
        emergencyPhone: data.emergencyPhone || "01713004929",
        email: data.email || fallbackSettings.email,
        regNo: data.regSocialWelfare || fallbackSettings.regNo,
        befaqRegNo: data.regBefaq || fallbackSettings.befaqRegNo,
        haiatulUlyaRegNo: data.regHaiatulUlya || fallbackSettings.haiatulUlyaRegNo,
        facebookUrl: data.facebookUrl || fallbackSettings.facebookUrl,
        youtubeUrl: data.youtubeUrl || fallbackSettings.youtubeUrl,
        mapQuery: data.mapEmbedUrl || fallbackSettings.mapQuery,
        headerBannerUrl:
          (typeof data.headerBannerUrl === "string" && data.headerBannerUrl.trim())
            ? data.headerBannerUrl
            : fallbackSettings.headerBannerUrl,
        logoUrl:
          (typeof data.logoUrl === "string" && data.logoUrl.trim())
            ? data.logoUrl
            : fallbackSettings.logoUrl,
      };
    }
  } catch (err) {
    console.warn("Using fallback site settings:", err);
  }
  return fallbackSettings;
}

// 2. Homepage Content Query (Projected)
export const homepageQuery = groq`*[_type == "homepage"][0]{
  _id,
  _type,
  introVideo{enabled, videoUrl, mobileVideoUrl, posterUrl, mobilePosterUrl, title, skipLabel, playLabel, loadingLabel},
  heroVideoUrl,
  "heroPosterUrl":coalesce(heroPoster.asset->url,heroPosterUrl),
  newsTicker,
  heroBadge,
  heroHeadline,
  heroSubheadline,
  statsTotalStudents,
  statsTeachers,
  statsHafiz,
  statsEstablished,
  principalName,
  principalDesignation,
  principalMessage,
  admissionBannerTitle,
  admissionBannerDesc
}`;

export async function getHomepageContent() {
  const fallbackHome = await getEditableData("copy.data.homePageContent", fallbackHomeSource);
  try {
    const data = await fetchSiteQuery<HomepageDocument | null>(homepageQuery, {});
    if (data && (data.heroHeadline || data.heroBadge || data.introVideo || data.heroVideoUrl || data.heroPosterUrl)) {
      return {
        ...fallbackHome,
        ...data,
        introVideo: {
          enabled: data.introVideo?.enabled ?? fallbackHome.introVideo.enabled,
          videoUrl: data.introVideo?.videoUrl && data.introVideo.videoUrl !== "/Student_opening_doors_to_light_20261021201917.mp4"
            ? data.introVideo.videoUrl : fallbackHome.introVideo.videoUrl,
          mobileVideoUrl: data.introVideo?.mobileVideoUrl === "/intro-mobile-v2.mp4"
            ? fallbackHome.introVideo.mobileVideoUrl
            : data.introVideo?.mobileVideoUrl || (data.introVideo?.videoUrl && data.introVideo.videoUrl !== "/Student_opening_doors_to_light_20261021201917.mp4" && data.introVideo.videoUrl !== fallbackHome.introVideo.videoUrl ? data.introVideo.videoUrl : fallbackHome.introVideo.mobileVideoUrl),
          posterUrl: data.introVideo?.posterUrl || fallbackHome.introVideo.posterUrl,
          mobilePosterUrl: data.introVideo?.mobilePosterUrl === "/intro-mobile-poster-v2.jpg"
            ? fallbackHome.introVideo.mobilePosterUrl
            : data.introVideo?.mobilePosterUrl || data.introVideo?.posterUrl || fallbackHome.introVideo.mobilePosterUrl,
          title: data.introVideo?.title || fallbackHome.introVideo.title,
          skipLabel: data.introVideo?.skipLabel || fallbackHome.introVideo.skipLabel,
          playLabel: data.introVideo?.playLabel || fallbackHome.introVideo.playLabel,
          loadingLabel: data.introVideo?.loadingLabel || fallbackHome.introVideo.loadingLabel,
        },
        newsTicker:
          Array.isArray(data.newsTicker) && data.newsTicker.length > 0
            ? data.newsTicker
            : fallbackHome.hero?.slogan
              ? [fallbackHome.hero.slogan]
              : ["নতুন শিক্ষাবর্ষে ভর্তি চলছে"],
        hero: {
          ...fallbackHome.hero,
          video: data.heroVideoUrl || fallbackHome.hero.video,
          image: data.heroPosterUrl || fallbackHome.hero.image,
          title: data.heroHeadline || fallbackHome.hero.title,
          slogan: data.heroSubheadline || fallbackHome.hero.slogan,
        },
        welcome: {
          ...fallbackHome.welcome,
          paragraphs: data.principalMessage
            ? [data.principalMessage, ...(fallbackHome.welcome?.paragraphs?.slice(1) || [])]
            : fallbackHome.welcome.paragraphs,
        },
        atAGlance: {
          ...fallbackHome.atAGlance,
          established: data.statsEstablished
            ? `${data.statsEstablished} খ্রিষ্টাব্দ`
            : fallbackHome.atAGlance.established,
          muhtamim: data.principalName || fallbackHome.atAGlance.muhtamim,
        },
        admissionCall: {
          ...fallbackHome.admissionCall,
          title: data.admissionBannerTitle || fallbackHome.admissionCall.title,
          description:
            data.admissionBannerDesc || fallbackHome.admissionCall.description,
        },
      };
    }
  } catch (err) {
    console.warn("Using fallback homepage content:", err);
  }
  return { ...fallbackHome, newsTicker: [fallbackHome.hero.slogan] };
}

// 2b. Lightweight News Ticker Query (for sub-pages)
export const newsTickerQuery = groq`*[_type == "homepage"][0]{
  newsTicker,
  heroSubheadline
}`;

export async function getNewsTicker(): Promise<string[]> {
  try {
    const data = await fetchSiteQuery<HomepageDocument | null>(newsTickerQuery, {});
    if (data && Array.isArray(data.newsTicker) && data.newsTicker.length > 0) {
      return data.newsTicker;
    }
    if (data?.heroSubheadline) {
      return [data.heroSubheadline];
    }
  } catch (err) {
    console.warn("Using fallback news ticker:", err);
  }
  return fallbackHome.hero?.slogan
    ? [fallbackHome.hero.slogan]
    : ["নতুন শিক্ষাবর্ষে ভর্তি চলছে"];
}

// 3. Notices Query (Projected)
export const noticesQuery = groq`*[_type == "notice" && !defined(archivedAt)] | order(publishDate desc) {
  _id,
  title,
  memo,
  category,
  publishDate,
  publishDateBn,
  publishDateHijri,
  isUrgent,
  summary,
  details,
  instructions,
  signatoryName,
  signatoryDesignation,
  "pdfUrl": pdfFile.asset->url
}`;

const categoryMap: Record<
  string,
  {
    label:
      | "ভর্তি সংক্রান্ত"
      | "পরীক্ষা ও ফলাফল"
      | "ছুটির তালিকা"
      | "ক্লাস ও রুটিন"
      | "প্রশাসনিক ও সাধারণ";
    key: "admission" | "exam" | "holiday" | "routine" | "general";
  }
> = {
  admission: { label: "ভর্তি সংক্রান্ত", key: "admission" },
  exam: { label: "পরীক্ষা ও ফলাফল", key: "exam" },
  holiday: { label: "ছুটির তালিকা", key: "holiday" },
  routine: { label: "ক্লাস ও রুটিন", key: "routine" },
  general: { label: "প্রশাসনিক ও সাধারণ", key: "general" },
};

export async function getNotices() {
  try {
    const data = await fetchSiteQuery<NoticeDocument[]>(noticesQuery, {});
    if (Array.isArray(data)) {
      return data.map((n, idx) => {
        const catInfo = categoryMap[stegaClean(n.category)] || {
          label: "প্রশাসনিক ও সাধারণ",
          key: "general",
        };
        return {
          id: n._id.replace("notice-", "") || idx + 1,
          memoNo: n.memo || `জামিয়া/বিজ্ঞপ্তি/${n.publishDateBn || "২০২৬"}/${idx + 1}`,
          title: n.title,
          category: catInfo.label,
          categoryKey: catInfo.key,
          publishDateEn: n.publishDate || "2026-01-01",
          publishDateBn: n.publishDateBn || (n.publishDate ? new Intl.DateTimeFormat("bn-BD", { dateStyle: "long", timeZone: "Asia/Dhaka" }).format(new Date(stegaClean(n.publishDate))) : "তারিখ উল্লেখ নেই"),
          publishDateHijri: n.publishDateHijri || "",
          isUrgent: !!n.isUrgent,
          isNew: idx < 3,
          summary: n.summary || n.title,
          details: paragraphs(n.details, n.summary || n.title),
          instructions: Array.isArray(n.instructions) ? n.instructions : [],
          signatory: {
            name: n.signatoryName || "মুহতামিম",
            designation: n.signatoryDesignation || "মুহতামিম ও শিক্ষা সচিব",
            institution: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
          },
          pdfUrl: n.pdfUrl || "#",
        };
      });
    }
  } catch (err) {
    console.warn("Using fallback notices:", err);
  }
  return fallbackNotices;
}

// 4. Teachers Query (Projected)
export const teachersQuery = groq`*[_type == "teacher" && !defined(archivedAt)] | order(serial asc) {
  _id,
  name,
  designation,
  department,
  qualification,
  honor,
  mobile,
  district,
  institution,
  serial,
  "photo": photo.asset->url
}`;

export async function getTeachers() {
  try {
    const data = await fetchSiteQuery<TeacherDocument[]>(teachersQuery, {});
    if (Array.isArray(data) && data.length > 0) {
      return data.map((t) => ({
        _id: t._id,
        _type: "teacher",
        id: t._id,
        name: t.name,
        designation: t.designation,
        department: t.department,
        qualification: t.qualification || "",
        honor: t.honor || "",
        mobile: t.mobile || "",
        district: t.district || "",
        institution: t.institution || "",
        photo: t.photo || "/avatar-scholar.svg",
        serial: t.serial || 1,
      }));
    }
  } catch (err) {
    console.warn("Using fallback teachers:", err);
  }
  return [];
}

// 5. Committee Members Query (Projected)
export const committeeQuery = groq`*[_type == "committeeMember" && !defined(archivedAt)] | order(serial asc) {
  _id,
  name,
  designation,
  mobile,
  address,
  isLandDonor,
  donorContribution,
  serial,
  "photo": photo.asset->url
}`;

export async function getCommitteeMembers() {
  try {
    const data = await fetchSiteQuery<CommitteeDocument[]>(committeeQuery, {});
    if (Array.isArray(data)) {
      return data.map((m) => ({
        _id: m._id,
        _type: "committeeMember",
        id: m._id,
        name: m.name,
        designation: m.designation,
        mobile: m.mobile || "",
        address: m.address || "",
        isLandDonor: !!m.isLandDonor,
        donorContribution: m.donorContribution || "",
        photo: m.photo || "/avatar-member.svg",
        serial: m.serial || 1,
      }));
    }
  } catch (err) {
    console.warn("Using fallback committee:", err);
  }
  return committeeAndFacultyData.managingCommittee.members;
}

// 6. Academic Departments Query (Projected)
export const departmentsQuery = groq`*[_type == "academicDepartment" && !defined(archivedAt) && (
  !$homepageOnly || coalesce(showOnHomepage, slug.current != "orphanage", true)
)] | order(serial asc, _updatedAt desc, _id asc) {
  _id,
  title,
  "slug": slug.current,
  arabicTitle,
  badge,
  ageRange,
  seatCount,
  overview,
  features,
  serial,
  showOnHomepage,
  "imageUrl": image.asset->url
}`;

export async function getAcademicDepartments({ homepageOnly = false }: { homepageOnly?: boolean } = {}) {
  try {
    const data = await fetchSiteQuery<AcademicDepartmentRecord[]>(departmentsQuery, { homepageOnly });
    if (Array.isArray(data) && data.length > 0) {
      return mapAcademicDepartments(data);
    }
  } catch (err) {
    console.warn("Using fallback departments:", err);
  }
  return [];
}

// 7. Admission Info Query (Projected)
export const admissionInfoQuery = groq`*[_type == "admissionInfo" && !defined(archivedAt)][0] {
  _id,
  sessionName,
  hijriYear,
  status,
  memoNo,
  overview,
  arabicTimeline,
  englishTimeline,
  examMethod,
  examResultPublish,
  orphanPolicy,
  orphanConditions,
  newStudentTotalFee,
  oldStudentTotalFee,
  phoneMuhtamim,
  phoneNazemeTalimat,
  phoneOffice,
  guardianGuidelines,
  formCollectionTime,
  "admissionFormPdfUrl": admissionFormPdf.asset->url
}`;

export async function getAdmissionInfo() {
  try {
    const data = await fetchSiteQuery<AdmissionContent | null>(admissionInfoQuery, {});
    if (data && data.sessionName) {
      return data;
    }
  } catch (err) {
    console.warn("Using fallback admission info:", err);
  }
  return null;
}

// 8. 313 Badri Kafila Query (Projected)
export const badriKafilaQuery = groq`*[_type == "badriKafila"][0] {
  _id,
  title,
  targetSeats,
  enrolledCount,
  theologicalOverview,
  annualDonationAmount,
  monthlyDonationAmount,
  onetimeDonationAmount,
  bkashNumber,
  bankAccountInfo
}`;

export async function getBadriKafila() {
  try {
    const data = await fetchSiteQuery<(Record<string, unknown> & { title?: string }) | null>(badriKafilaQuery, {});
    if (data && data.title) {
      return data;
    }
  } catch (err) {
    console.warn("Using fallback badri kafila:", err);
  }
  return null;
}

// 9. Class Routines Query (Projected)
export const classRoutinesQuery = groq`*[_type == "classRoutine" && !defined(archivedAt)] | order(academicYear desc) {
  _id,
  title,
  className,
  academicYear,
  classId,
  timetableRows,
  scheduleRows,
  "pdfUrl": pdfFile.asset->url
}`;

export async function getClassRoutines() {
  try {
    const data = await fetchSiteQuery<ClassRoutineDocument[]>(classRoutinesQuery, {});
    return data || [];
  } catch (err) {
    console.warn("Using fallback class routines:", err);
    return [];
  }
}

// 10. Exam Routines Query (Projected)
export const examRoutinesQuery = groq`*[_type == "examRoutine" && !defined(archivedAt)] | order(academicYear desc) {
  _id,
  title,
  examTerm,
  academicYear,
  className,
  classId,
  examRows,
  instructions,
  "pdfUrl": pdfFile.asset->url
}`;

export async function getExamRoutines() {
  try {
    const data = await fetchSiteQuery<ExamRoutineDocument[]>(examRoutinesQuery, {});
    return data || [];
  } catch (err) {
    console.warn("Using fallback exam routines:", err);
    return [];
  }
}

// 11. Exam Results Query (Projected — published summary metadata only)
export const examResultsQuery = groq`*[_type == "examResult" && !defined(archivedAt) && isPublished != false] | order(academicYear desc) {
  _id,
  title,
  academicYear,
  examTerm,
  className,
  classId,
  isPublished,
  summaryNotes,
  "meritListPdfUrl": meritListPdf.asset->url
}`;

export async function getExamResults() {
  try {
    const data = await fetchSiteQuery<ResultDocument[]>(examResultsQuery, {});
    return data || [];
  } catch (err) {
    console.warn("Using fallback exam results:", err);
    return [];
  }
}

// 12. Gallery Photos Query (Projected)
export const galleryPhotosQuery = groq`*[_type == "galleryPhoto" && !defined(archivedAt)] | order(displayOrder asc,_createdAt desc) {
  _id,
  title,
  category,
  caption,
  date,
  "imageUrl": coalesce(image.asset->url,imageUrl)
}`;

export async function getGalleryPhotos() {
  try {
    const data = await fetchSiteQuery<PhotoDocument[]>(galleryPhotosQuery, {});
    return data || [];
  } catch (err) {
    console.warn("Using fallback gallery photos:", err);
    return [];
  }
}

// 13. Gallery Videos Query (Projected)
export const galleryVideosQuery = groq`*[_type == "galleryVideo" && !defined(archivedAt)] | order(displayOrder asc,_createdAt desc) {
  _id,
  title,
  youtubeId,
  localVideoUrl,
  speaker,
  "thumbnail": coalesce(thumbnail.asset->url,thumbnailUrl),
  category,
  duration,
  date
}`;

export async function getGalleryVideos() {
  try {
    const data = await fetchSiteQuery<VideoDocument[]>(galleryVideosQuery, {});
    return data || [];
  } catch (err) {
    console.warn("Using fallback gallery videos:", err);
    return [];
  }
}
// 14. Blog Posts Query (Projected)
export const blogPostsQuery = groq`*[_type == "blogPost" && !defined(archivedAt)] | order(publishedAt desc, _createdAt desc) {
  _id,
  legacyId,
  title,
  "slug": slug.current,
  category,
  author,
  date,
  readTime,
  "thumbnail": coalesce(thumbnail.asset->url, thumbnailUrl),
  excerpt,
  content,
  likesCount,
  commentsCount
}`;

export async function getBlogPosts() {
  try {
    const data = await fetchSiteQuery<BlogDocument[]>(blogPostsQuery, {});
    if (Array.isArray(data)) {
      return data.map((post, idx) => ({
        _id: post._id,
        _type: "blogPost",
        id: post.legacyId ?? post._id,
        slug: post.slug || `post-${idx + 1}`,
        title: post.title,
        thumbnail: post.thumbnail || fallbackBlogPosts[idx % fallbackBlogPosts.length]?.thumbnail || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
        date: post.date || "২০২৪",
        author: post.author || "মাওলানা আব্দুল্লাহ আল-মামুন",
        readTime: post.readTime || "৪ মিনিট পাঠ",
        likesCount: post.likesCount ?? 0,
        commentsCount: post.commentsCount ?? 0,
        category: post.category || "দ্বীনি শিক্ষা",
        excerpt: post.excerpt || "",
        content: post.content || "",
      }));
    }
  } catch (err) {
    console.warn("Using fallback blog posts:", err);
  }
  return fallbackBlogPosts;
}

export async function getCalendar() {
  try { return await fetchSiteQuery<CalendarDocument[]>('*[_type == "calendarEvent" && !defined(archivedAt)] | order(date desc){_id,"_type":"calendarEvent",title,kind,date,endDate,dateBn,description,location,"imageUrl":coalesce(image.asset->url,imageUrl),"pdfUrl":pdfFile.asset->url}'); }
  catch { return []; }
}
export async function getVacancies() {
  try { return await fetchSiteQuery<VacancyDocument[]>('*[_type == "vacancy" && !defined(archivedAt)] | order(deadline desc){_id,"_type":"vacancy",title,department,qualification,deadline,postedAt,salary,vacancies,"pdfUrl":pdfFile.asset->url}'); }
  catch { return []; }
}
