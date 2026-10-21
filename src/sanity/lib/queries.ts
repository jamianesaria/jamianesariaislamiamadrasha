import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { client } from "./client";
import { mapAcademicDepartments, type AcademicDepartmentRecord } from "./departments";
import {
  siteSettings as fallbackSettings,
  homePageContent as fallbackHome,
  noticesData as fallbackNotices,
  committeeAndFacultyData,
} from "@/data/siteData";

/**
 * Dynamically resolves fetch options based on Next.js Draft Mode status.
 * In draft mode: fetches unpublished drafts + Content Source Maps (stega) using the viewer/read token.
 * In published mode: serves published content via CDN with zero stega overhead.
 */
export async function getSanityFetchOptions() {
  try {
    const draft = await draftMode();
    if (draft.isEnabled) {
      return {
        perspective: "drafts" as const,
        stega: true,
        useCdn: false,
        token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
        next: { revalidate: 0 },
      };
    }
  } catch {
    // draftMode() may throw during static build prerendering outside request context
  }

  return {
    perspective: "published" as const,
    stega: false,
    useCdn: true,
  };
}

// 1. Site Settings Query (Projected)
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  title,
  arabicTitle,
  englishTitle,
  establishedYear,
  slogan,
  phone,
  emergencyPhone,
  email,
  address,
  addressFull,
  regSocialWelfare,
  regBefaq,
  regHaiatulUlya,
  mapEmbedUrl,
  facebookUrl,
  youtubeUrl,
  headerBannerUrl,
  "logoUrl": logo.asset->url
}`;

export async function getSiteSettings() {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(siteSettingsQuery, {}, options);
    if (data && (data.title || data.phone)) {
      return {
        ...fallbackSettings,
        ...data,
        nameBn: data.title || fallbackSettings.nameBn,
        nameAr: data.arabicTitle || fallbackSettings.nameAr,
        nameEn: data.englishTitle || fallbackSettings.nameEn,
        sloganBn: data.slogan || fallbackSettings.sloganBn,
        footerSloganBn: data.slogan || fallbackSettings.footerSloganBn,
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
  introVideo{enabled, videoUrl, mobileVideoUrl, posterUrl, mobilePosterUrl, title, skipLabel},
  heroVideoUrl,
  heroPosterUrl,
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
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(homepageQuery, {}, options);
    if (data && (data.heroHeadline || data.heroBadge || data.introVideo || data.heroVideoUrl || data.heroPosterUrl)) {
      return {
        ...fallbackHome,
        ...data,
        introVideo: {
          enabled: data.introVideo?.enabled ?? fallbackHome.introVideo.enabled,
          videoUrl: data.introVideo?.videoUrl && data.introVideo.videoUrl !== "/Student_opening_doors_to_light_20261021201917.mp4"
            ? data.introVideo.videoUrl : fallbackHome.introVideo.videoUrl,
          mobileVideoUrl: data.introVideo?.mobileVideoUrl || (data.introVideo?.videoUrl && data.introVideo.videoUrl !== "/Student_opening_doors_to_light_20261021201917.mp4" && data.introVideo.videoUrl !== fallbackHome.introVideo.videoUrl ? data.introVideo.videoUrl : fallbackHome.introVideo.mobileVideoUrl),
          posterUrl: data.introVideo?.posterUrl || fallbackHome.introVideo.posterUrl,
          mobilePosterUrl: data.introVideo?.mobilePosterUrl || data.introVideo?.posterUrl || fallbackHome.introVideo.mobilePosterUrl,
          title: data.introVideo?.title || fallbackHome.introVideo.title,
          skipLabel: data.introVideo?.skipLabel || fallbackHome.introVideo.skipLabel,
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
  return fallbackHome;
}

// 2b. Lightweight News Ticker Query (for sub-pages)
export const newsTickerQuery = groq`*[_type == "homepage"][0]{
  newsTicker,
  heroSubheadline
}`;

export async function getNewsTicker(): Promise<string[]> {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(newsTickerQuery, {}, options);
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
export const noticesQuery = groq`*[_type == "notice"] | order(publishDate desc) {
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
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(noticesQuery, {}, options);
    if (Array.isArray(data) && data.length > 0) {
      return data.map((n: any, idx: number) => {
        const catInfo = categoryMap[n.category] || {
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
          publishDateBn: n.publishDateBn || "১ জানুয়ারি ২০২৬",
          publishDateHijri: n.publishDateHijri || "",
          isUrgent: !!n.isUrgent,
          isNew: idx < 3,
          summary: n.summary || n.title,
          details: Array.isArray(n.details) ? n.details : [n.summary || n.title],
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
export const teachersQuery = groq`*[_type == "teacher"] | order(serial asc) {
  _id,
  name,
  designation,
  department,
  qualification,
  mobile,
  district,
  institution,
  serial,
  "photo": photo.asset->url
}`;

export async function getTeachers() {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(teachersQuery, {}, options);
    if (Array.isArray(data) && data.length > 0) {
      return data.map((t: any) => ({
        id: t._id,
        name: t.name,
        designation: t.designation,
        department: t.department,
        qualification: t.qualification || "",
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
export const committeeQuery = groq`*[_type == "committeeMember"] | order(serial asc) {
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
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(committeeQuery, {}, options);
    if (Array.isArray(data) && data.length > 0) {
      return data.map((m: any) => ({
        id: m._id,
        name: m.name,
        designation: m.designation,
        mobile: m.mobile || "",
        address: m.address || "",
        isLandDonor: !!m.isLandDonor,
        serial: m.serial || 1,
      }));
    }
  } catch (err) {
    console.warn("Using fallback committee:", err);
  }
  return committeeAndFacultyData.managingCommittee.members;
}

// 6. Academic Departments Query (Projected)
export const departmentsQuery = groq`*[_type == "academicDepartment" && (
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
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch<AcademicDepartmentRecord[]>(departmentsQuery, { homepageOnly }, options);
    if (Array.isArray(data) && data.length > 0) {
      return mapAcademicDepartments(data);
    }
  } catch (err) {
    console.warn("Using fallback departments:", err);
  }
  return [];
}

// 7. Admission Info Query (Projected)
export const admissionInfoQuery = groq`*[_type == "admissionInfo"][0] {
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
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(admissionInfoQuery, {}, options);
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
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(badriKafilaQuery, {}, options);
    if (data && data.title) {
      return data;
    }
  } catch (err) {
    console.warn("Using fallback badri kafila:", err);
  }
  return null;
}

// 9. Class Routines Query (Projected)
export const classRoutinesQuery = groq`*[_type == "classRoutine"] | order(academicYear desc) {
  _id,
  title,
  className,
  academicYear,
  scheduleRows,
  "pdfUrl": pdfFile.asset->url
}`;

export async function getClassRoutines() {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(classRoutinesQuery, {}, options);
    return data || [];
  } catch (err) {
    console.warn("Using fallback class routines:", err);
    return [];
  }
}

// 10. Exam Routines Query (Projected)
export const examRoutinesQuery = groq`*[_type == "examRoutine"] | order(academicYear desc) {
  _id,
  title,
  examTerm,
  academicYear,
  className,
  examRows,
  instructions,
  "pdfUrl": pdfFile.asset->url
}`;

export async function getExamRoutines() {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(examRoutinesQuery, {}, options);
    return data || [];
  } catch (err) {
    console.warn("Using fallback exam routines:", err);
    return [];
  }
}

// 11. Exam Results Query (Projected — published summary metadata only)
export const examResultsQuery = groq`*[_type == "examResult" && isPublished == true] | order(academicYear desc) {
  _id,
  title,
  academicYear,
  examTerm,
  className,
  isPublished,
  summaryNotes,
  "meritListPdfUrl": meritListPdf.asset->url
}`;

export async function getExamResults() {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(examResultsQuery, {}, options);
    return data || [];
  } catch (err) {
    console.warn("Using fallback exam results:", err);
    return [];
  }
}

// 12. Gallery Photos Query (Projected)
export const galleryPhotosQuery = groq`*[_type == "galleryPhoto"] | order(_createdAt desc) {
  _id,
  title,
  category,
  caption,
  date,
  "imageUrl": image.asset->url
}`;

export async function getGalleryPhotos() {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(galleryPhotosQuery, {}, options);
    return data || [];
  } catch (err) {
    console.warn("Using fallback gallery photos:", err);
    return [];
  }
}

// 13. Gallery Videos Query (Projected)
export const galleryVideosQuery = groq`*[_type == "galleryVideo"] | order(_createdAt desc) {
  _id,
  title,
  youtubeId,
  category,
  duration,
  date
}`;

export async function getGalleryVideos() {
  "use cache";
  try {
    const options = await getSanityFetchOptions();
    const data = await client.fetch(galleryVideosQuery, {}, options);
    return data || [];
  } catch (err) {
    console.warn("Using fallback gallery videos:", err);
    return [];
  }
}
