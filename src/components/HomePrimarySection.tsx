
import Link from "next/link";
import type { BlogPostItem, NoticeFullItem } from "@/data/siteData";
import type { AcademicDepartment } from "@/sanity/lib/departments";
import HeroVideo from "./HeroVideo";
import HomeNoticeTabs from "./HomeNoticeTabs";
import HomeGalleryFilter from "./HomeGalleryFilter";
import { homePageContent as _fallback_homePageContent, siteSettings as _fallback_siteSettings, sampleBlogPosts as _fallback_sampleBlogPosts } from "@/data/siteData";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Users,
  ClipboardCheck,
  Library,
  Mic,
  Utensils,
  Building2,
  ShieldCheck,
  HeartHandshake,
  Bell,
  BookOpen,
  CheckCircle2,
  User,
  Calendar,
} from "lucide-react";
import { EditableImage as Image, getEditableData, getFieldAttribute, EditableText } from "@/content/server";
import { fieldSource } from "@/content/model";

const homePageContent = _fallback_homePageContent;
const siteSettings = _fallback_siteSettings;


interface HomePrimarySectionProps {
  initialData?: typeof homePageContent;
  initialSettings?: typeof siteSettings;
  initialNotices?: NoticeFullItem[];
  initialDepartments?: AcademicDepartment[];
  initialBlogPosts?: BlogPostItem[];
}

export default async function HomePrimarySection({
  initialData,
  initialSettings,
  initialNotices,
  initialDepartments,
  initialBlogPosts,
}: HomePrimarySectionProps = {}) {
  const fieldAttribute = await getFieldAttribute();
  const editing = Boolean(fieldAttribute({ _id: "homepage", _type: "homepage" }, "heroHeadline"));
  const homePageContent = await getEditableData("copy.data.homePageContent", _fallback_homePageContent);
  const siteSettings = await getEditableData("siteSettings", _fallback_siteSettings);
  const sampleBlogPosts = await getEditableData("copy.data.sampleBlogPosts", _fallback_sampleBlogPosts);

  const content = (initialData || homePageContent) as typeof homePageContent;
  const currentSettings = (initialSettings || siteSettings) as typeof siteSettings;
  const blogPosts = initialBlogPosts ?? sampleBlogPosts;

  const {
    hero,
    welcome,
    atAGlance,
    missionAndObjectives,
    departments,
    madrasaFeatures,
    curriculum,
    studentTraining,
    orphanageSupport,
    badriKafila,
    hostelProject,
    notices,
    gallery,
    admissionCall,
    contact,
  } = content;

  // Build dynamic academic department list with Sanity images and fallback
  const departmentList =
    initialDepartments && initialDepartments.length > 0
      ? initialDepartments.map((d, idx) => {
          const fallback = departments.items[idx] || departments.items[0];
          return {
            _id: d._id,
            _type: d._type,
            id: d.id || fallback.id,
            name: d.name || fallback.name,
            image: d.imageUrl || fallback.image || "/drone_poster.jpg",
            description: d.overview || fallback.description,
            badge: d.badge || fallback.badge,
            href: `/academics#${d.id || fallback.id}`,
          };
        })
      : departments.items;

  const bengaliDigits = ["১", "২", "৩", "৪", "৫"];
  const bengaliLetters = ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ"];

  return (
    <div className="w-full bg-[#F4F5F0] text-gray-800">
      {/* =====================================================================
          ২। প্রধান ব্যানার (Hero Video Banner — Edge-to-Edge Responsive Video)
      ===================================================================== */}
      <section className="w-full relative overflow-hidden">
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[560px] overflow-hidden bg-[#021c0e]">
          <HeroVideo src={hero.video} poster={hero.image} sanity={fieldAttribute({ _id: "homepage", _type: "homepage" }, "heroVideoUrl")} />

          {/* Clean dark gradient at the lower part of video */}
          <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 sm:pb-6 px-4 bg-gradient-to-t from-[#021c0e]/90 via-[#021c0e]/50 to-transparent pointer-events-none" style={{ pointerEvents: editing ? "auto" : undefined }}>
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-bold text-white tracking-tight leading-snug drop-shadow-md">
                {hero.title}
              </h1>
              <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm md:text-base lg:text-[17px] font-medium text-[#FDE68A] leading-relaxed drop-shadow-sm">
                {hero.slogan}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN INSTITUTIONAL PORTAL HUB (2-Column Editorial & Admin Layout)
          Left Column (8 cols): ৩। আমাদের জামিয়ায় স্বাগতম + ৫। আমাদের লক্ষ্য ও উদ্দেশ্য
          Right Column (4 cols): ৪। এক নজরে আমাদের জামিয়া + ৯। নোটিশ ও বিজ্ঞপ্তি
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-11">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          {/* LEFT MAIN COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-7">
            {/* ৩। আমাদের জামিয়ায় স্বাগতম */}
            <article
              id="welcome"
              className="bg-white rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden scroll-mt-14"
            >
              <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
                  <h2 className="text-base sm:text-lg font-bold tracking-wide">
                    {welcome.title}
                  </h2>
                </div>
                <span className="text-xs bg-white/10 border border-amber-300/30 text-amber-200 px-2.5 py-0.5 rounded-full font-medium"><EditableText document="copy.ui.HomePrimarySection" entry="eei2jgx" fallback={"স্থাপিত: ১৯৬৯ খ্রিষ্টাব্দ"} /></span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {/* Official Madrasa Seal */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#8B111A] ring-4 ring-[#FAF7F0] p-0.5 bg-white shadow-md flex items-center justify-center overflow-hidden">
                      <Image document="copy.ui.HomePrimarySection" entry="efkaj2k" source={fieldSource(currentSettings, "logoUrl")}
                        src={currentSettings.logoUrl || siteSettings.logoUrl || "/jamia-logo-v2.png"}
                        alt={currentSettings.nameBn || siteSettings.nameBn}
                        width={128}
                        height={128}
                        className="w-full h-full object-contain rounded-full scale-105"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#016332] bg-[#FAF7F0] border border-gray-200 px-2.5 py-0.5 rounded-full"><EditableText document="copy.ui.HomePrimarySection" entry="e1ex5607" fallback={"গভঃ রেজিঃ "} />{currentSettings.regNo}
                    </span>
                  </div>

                  {/* Welcome Paragraphs */}
                  <div className="flex-1 space-y-3.5 text-gray-700 text-sm sm:text-[15.5px] leading-relaxed text-justify">
                    {welcome.paragraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? "text-gray-800 font-medium border-l-3 border-[#016332]/40 pl-3"
                            : ""
                        }
                      >
                        {para}
                      </p>
                    ))}

                    <div className="pt-2">
                      <Link
                        href={welcome.buttonHref}
                        className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md shadow-xs hover:shadow-md transition-all group"
                      >
                        <span>{welcome.buttonText}</span>
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ৫. আমাদের লক্ষ্য ও উদ্দেশ্য */}
            <article
              id="mission"
              className="bg-white rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden scroll-mt-14"
            >
              <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
                  <h2 className="text-base sm:text-lg font-bold tracking-wide">
                    {missionAndObjectives.title}
                  </h2>
                </div>
                <span className="text-xs text-amber-200 hidden sm:inline font-medium"><EditableText document="copy.ui.HomePrimarySection" entry="efg2s8r" fallback={"কুরআন ও সুন্নাহর আদর্শ"} /></span>
              </div>

              <div className="p-5 sm:p-7 space-y-5">
                {/* Main Goal Box */}
                <div className="bg-gradient-to-r from-[#FAF7F0] to-[#fffdf9] border border-[#e6dec8] border-l-4 border-l-[#8B111A] rounded-r-lg p-4 sm:p-5 shadow-2xs">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded mb-1.5"><EditableText document="copy.ui.HomePrimarySection" entry="e1pes0np" fallback={"মূল লক্ষ্য"} /></span>
                  <p className="text-sm sm:text-[15.5px] font-semibold text-gray-900 leading-relaxed">
                    {missionAndObjectives.mainGoal}
                  </p>
                </div>

                {/* Objectives List */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#016332] mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-[#8B111A]" />
                    <span>{missionAndObjectives.objectivesTitle}</span>
                  </h3>
                  <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden bg-[#fcfcfa]">
                    {missionAndObjectives.objectives.map((obj, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-3 flex items-start gap-3 text-sm sm:text-[15px] text-gray-800 hover:bg-[#FAF7F0]/70 transition-colors"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#8B111A]/10 border border-[#8B111A]/20 text-[#8B111A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {bengaliDigits[idx]}
                        </span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-1">
                  <Link
                    href={missionAndObjectives.buttonHref}
                    className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014724] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md shadow-xs hover:shadow-md transition-all group"
                  >
                    <span>{missionAndObjectives.buttonText}</span>
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT INSTITUTIONAL SIDEBAR COLUMN (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:space-y-7">
            {/* ৪। এক নজরে আমাদের জামিয়া (Institutional Profile Table) */}
            <div
              id="at-a-glance"
              className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-14"
            >
              <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-4 sm:px-5 py-3 border-b-2 border-[#D9822B] flex items-center gap-2">
                <Building2 size={17} className="text-amber-300 shrink-0" />
                <h2 className="text-base sm:text-lg font-bold tracking-wide">
                  {atAGlance.title}
                </h2>
              </div>

              <div className="divide-y divide-gray-100 text-xs sm:text-sm">
                <div className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="e1tm18qj" fallback={"প্রতিষ্ঠাকাল"} /></span>
                  <span className="col-span-8 font-bold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="ezgrggs" fallback={": "} />{atAGlance.established}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-[#F9FAF8] hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="el2ufwt" fallback={"মুতাওয়াল্লী"} /></span>
                  <span className="col-span-8 font-bold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="e1oq8e6q" fallback={": "} />{atAGlance.mutawalli}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="e1i3k9cx" fallback={"জমিদাতাগন"} /></span>
                  <div className="col-span-8 font-semibold text-gray-900 space-y-1">
                    {atAGlance.landDonors.map((donor, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF7F0] border border-gray-200/80 px-2.5 py-0.5 rounded text-xs"
                      >
                        {donor}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-[#F9FAF8] hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="ev78mb9" fallback={"সভাপতি"} /></span>
                  <span className="col-span-8 font-bold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="efuzlg1" fallback={": "} />{atAGlance.president}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="e42q6vk" fallback={"মুহতামিম"} /></span>
                  <span className="col-span-8 font-bold text-[#016332]"><EditableText document="copy.ui.HomePrimarySection" entry="evttax9" fallback={": "} />{atAGlance.muhtamim}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-[#F9FAF8] hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="e12q7x5k" fallback={"শিক্ষা কার্যক্রম"} /></span>
                  <span className="col-span-8 font-semibold text-gray-900 leading-snug"><EditableText document="copy.ui.HomePrimarySection" entry="ehivn56" fallback={": "} />{atAGlance.academicPrograms}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="e116wvzk" fallback={"নিবন্ধন নম্বর"} /></span>
                  <div className="col-span-8 text-xs font-semibold text-gray-800 space-y-1">
                    <div><EditableText document="copy.ui.HomePrimarySection" entry="e1x8rbwy" fallback={"হাইআতুল উলয়া: "} /><span className="font-bold text-[#016332]"><EditableText document="copy.ui.HomePrimarySection" entry="eje7drx" fallback={"০০৬৮৫"} /></span><EditableText document="copy.ui.HomePrimarySection" entry="eiubbvy" fallback={" | বেফাক: "} /><span className="font-bold text-[#8B111A]"><EditableText document="copy.ui.HomePrimarySection" entry="e9a51v7" fallback={"১/৭৪৩"} /></span></div>
                    <div><EditableText document="copy.ui.HomePrimarySection" entry="e16v2far" fallback={"এতিমখানা (সমাজসেবা): "} /><span className="font-bold text-[#016332]"><EditableText document="copy.ui.HomePrimarySection" entry="eaofc4i" fallback={"ঢ-০৫০৪"} /></span></div>
                  </div>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-[#F9FAF8] hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600"><EditableText document="copy.ui.HomePrimarySection" entry="e1d7lh4n" fallback={"ঠিকানা"} /></span>
                  <span className="col-span-8 font-medium text-gray-800 leading-snug whitespace-pre-line">
                    {atAGlance.address}
                  </span>
                </div>
              </div>
            </div>

            {/* ৯। নোটিশ ও বিজ্ঞপ্তি (Official Notice Board) */}
            <div
              id="notices"
              className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-14"
            >
              <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-5 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-amber-300 shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold tracking-wide">
                    {notices.title}
                  </h2>
                </div>
                <Link
                  href="/notices"
                  className="text-xs bg-white/15 hover:bg-white/25 text-amber-200 px-2.5 py-0.5 rounded-full transition-colors font-medium flex items-center gap-1"
                >
                  <span><EditableText document="copy.ui.HomePrimarySection" entry="e1p1znwx" fallback={"সকল নোটিশ"} /></span>
                  <span><EditableText document="copy.ui.HomePrimarySection" entry="e1hfng90" fallback={"→"} /></span>
                </Link>
              </div>

              <HomeNoticeTabs subtitle={notices.subtitle} categories={notices.categories} records={initialNotices} />
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================================
          ৬। আমাদের শিক্ষা বিভাগসমূহ (Academic Departments)
      ===================================================================== */}
      <section
        id="departments"
        className="bg-gradient-to-b from-white via-[#FAF7F0]/50 to-white border-y border-gray-200/90 py-10 sm:py-12 scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Classic Institutional Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-7 border-b-2 border-[#016332]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-7 bg-[#8B111A] rounded-xs inline-block" />
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-gray-900">
                  {departments.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 pl-4"><EditableText document="copy.ui.HomePrimarySection" entry="e10iolec" fallback={"মক্তব ও হিফজ থেকে কিতাব ও মাদানি নেসাব পর্যন্ত সমন্বিত দ্বীনি শিক্ষা"} /></p>
            </div>
            <Link
              href={departments.buttonHref}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B111A] hover:text-white bg-[#8B111A]/8 hover:bg-[#8B111A] border border-[#8B111A]/25 px-3.5 py-2 rounded-md transition-all self-start sm:self-auto"
            >
              <span>{departments.buttonText}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* All 5 Academic Departments with Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            {departmentList.map((dept, idx) => (
              <div
                key={dept.id}
                className={`bg-white rounded-xl border border-gray-200/90 overflow-hidden flex flex-col justify-between group hover:border-[#016332] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-xs ${
                  idx === 4 ? "sm:col-span-2 md:col-span-1 xl:col-span-1" : ""
                }`}
              >
                {/* Department Photo */}
                <div className="relative h-46 sm:h-48 w-full overflow-hidden bg-gray-100">
                  <Image document="copy.ui.HomePrimarySection" entry="eh2v1pw" source={fieldSource(dept, "image")}
                    src={dept.image || "/drone_poster.jpg"}
                    alt={dept.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[11px] font-bold bg-[#8B111A] text-white px-2.5 py-0.5 rounded shadow-xs border border-white/20"><EditableText document="copy.ui.HomePrimarySection" entry="e1tly5lg" fallback={"বিভাগ - ০"} />{idx + 1}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[11px] font-bold bg-white/95 text-[#016332] px-2.5 py-0.5 rounded border border-gray-200 shadow-xs">
                      {dept.badge}
                    </span>
                  </div>
                </div>

                {/* Department Info */}
                <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between bg-white border-t border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-[#016332] mb-1.5 group-hover:text-[#8B111A] transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-gray-700 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold flex items-center gap-1">
                      <BookOpen size={12} className="text-[#016332]" />
                      <span><EditableText document="copy.ui.HomePrimarySection" entry="e1jxzol5" fallback={"ভর্তি ও দারস"} /></span>
                    </span>
                    <Link
                      href={("href" in dept && dept.href) ? String(dept.href) : departments.buttonHref}
                      className="inline-flex items-center gap-1 font-bold text-[#8B111A] group-hover:text-[#016332] transition-colors"
                    >
                      <span><EditableText document="copy.ui.HomePrimarySection" entry="e14ha0s7" fallback={"বিস্তারিত"} /></span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Academic Strip */}
          <div className="mt-6 bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] rounded-xl border border-gray-200/90 border-l-4 border-l-[#016332] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm shadow-2xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#016332]/10 text-[#016332] flex items-center justify-center shrink-0">
                <GraduationCap size={18} />
              </div>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-bold text-[#016332]"><EditableText document="copy.ui.HomePrimarySection" entry="e1afe2fe" fallback={"ভর্তি ও পাঠদান সংক্রান্ত তথ্য:"} /></span><EditableText document="copy.ui.HomePrimarySection" entry="e15s35cy" fallback={" মক্তব, হিফজ, হিফজ রিভিশন, কিতাব ও মাদানি নেসাবে শিক্ষার্থী ভর্তি ও ক্লাস রুটিন সম্পর্কে বিস্তারিত জানতে যোগাযোগ করুন।"} /></p>
            </div>
            <Link
              href={departments.buttonHref}
              className="shrink-0 inline-flex items-center gap-1.5 bg-[#016332] hover:bg-[#014724] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-md shadow-xs transition-all"
            >
              <span>{departments.buttonText}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৭। মাদরাসার বৈশিষ্ট্য (Madrasa Features / Boisisto - as in reference image)
      ===================================================================== */}
      {madrasaFeatures && (
        <section
          id="features"
          className="max-w-7xl mx-auto px-3 sm:px-6 py-9 sm:py-11 scroll-mt-14"
        >
          {/* Section Header */}
          <div className="pb-4 mb-7 border-b-2 border-[#016332]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-7 bg-[#8B111A] rounded-xs inline-block" />
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-gray-900">
                {madrasaFeatures.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 pl-4 leading-relaxed">
              {madrasaFeatures.subtitle}
            </p>
          </div>

          {/* 8 Feature Cards Grid matching reference image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {madrasaFeatures.items.map((feature, idx) => {
              const getIcon = (id: string) => {
                switch (id) {
                  case "teachers":
                    return (
                      <GraduationCap
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  case "supervision":
                    return (
                      <Users
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  case "education-initiative":
                    return (
                      <ClipboardCheck
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  case "library":
                    return (
                      <Library
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  case "moral-events":
                    return (
                      <Mic
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  case "food":
                    return (
                      <Utensils
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  case "building":
                    return (
                      <Building2
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  case "environment":
                    return (
                      <ShieldCheck
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                  default:
                    return (
                      <GraduationCap
                        className="w-5 h-5"
                        strokeWidth={1.9}
                      />
                    );
                }
              };

              return (
                <div
                  key={feature.id}
                  className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#016332]/50 transition-all duration-200 flex flex-col justify-start group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#016332]/8 border border-[#016332]/15 text-[#016332] group-hover:bg-[#016332] group-hover:text-white flex items-center justify-center transition-colors">
                      {getIcon(feature.id)}
                    </div>
                    <span className="text-xs font-bold text-[#8B111A] bg-[#FAF7F0] border border-gray-200 px-2.5 py-0.5 rounded-full">
                      {bengaliLetters[idx]}<EditableText document="copy.ui.HomePrimarySection" entry="e1sbtljh" fallback={"."} /></span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-[#016332] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          ৮। পাঠ্যক্রম ও শিক্ষা কার্যক্রম & ৯। ছাত্র প্রশিক্ষণ ও সহশিক্ষা কার্যক্রম
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* ৭। পাঠ্যক্রম ও শিক্ষা কার্যক্রম */}
        <div
          id="curriculum"
          className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-14"
        >
          <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
              <h2 className="text-base sm:text-lg font-bold tracking-wide">
                {curriculum.title}
              </h2>
            </div>
            <span className="text-xs text-amber-200 hidden sm:inline font-medium">
              {curriculum.subtitle}
            </span>
          </div>

          <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-7 space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-[#8B111A]">
                {curriculum.subtitle}
              </h3>
              <div className="space-y-3 text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify">
                {curriculum.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  href={curriculum.buttonHref}
                  className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md shadow-xs transition-all group"
                >
                  <span>{curriculum.buttonText}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF7F0] rounded-xl border border-[#e6dec8] p-4 sm:p-5">
              <h4 className="text-xs sm:text-sm font-bold text-[#016332] pb-2.5 mb-3.5 border-b border-gray-200 flex items-center gap-2">
                <BookOpen size={15} className="text-[#8B111A]" />
                <span><EditableText document="copy.ui.HomePrimarySection" entry="e1tegs5r" fallback={"পাঠ্যক্রমের অন্তর্ভুক্ত প্রধান বিষয়সমূহ :"} /></span>
              </h4>
              <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-[13.5px] font-semibold text-gray-800">
                {curriculum.subjects.map((sub, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-lg border border-gray-200/90 px-3 py-2 flex items-center gap-2 shadow-2xs hover:border-[#016332] transition-colors ${
                      idx === curriculum.subjects.length - 1 ? "col-span-2" : ""
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#8B111A] shrink-0" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ৮। ছাত্র প্রশিক্ষণ ও সহশিক্ষা কার্যক্রম */}
        <div
          id="training"
          className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-14"
        >
          <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
              <h2 className="text-base sm:text-lg font-bold tracking-wide">
                {studentTraining.title}
              </h2>
            </div>
            <Link
              href={studentTraining.buttonHref}
              className="text-xs bg-white/15 hover:bg-white/25 text-amber-200 px-3 py-1 rounded-full transition-colors flex items-center gap-1 font-medium"
            >
              <span>{studentTraining.buttonText}</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {studentTraining.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#FAF7F0] to-white p-4.5 border-l-4 border-l-[#016332] shadow-2xs hover:shadow-md transition-all"
                >
                  <span className="inline-block text-[11px] font-bold text-[#8B111A] bg-[#8B111A]/10 px-2.5 py-0.5 rounded-full mb-2"><EditableText document="copy.ui.HomePrimarySection" entry="ewae4sd" fallback={"কার্যক্রম - ০"} />{idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <Link
                href={studentTraining.buttonHref}
                className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014724] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md shadow-xs transition-all group"
              >
                <span>{studentTraining.buttonText}</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/academics#future-plans"
                className="inline-flex items-center gap-2 bg-[#FAF7F0] hover:bg-[#8B111A] text-[#8B111A] hover:text-white border border-[#D9822B]/50 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-md transition-all group"
              >
                <span><EditableText document="copy.ui.HomePrimarySection" entry="e5kr87n" fallback={"ভবিষ্যৎ শিক্ষা পরিকল্পনা (ইফতা, তাফসির, কম্পিউটার ও ভাষা কোর্স)"} /></span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          এতিমখানা ও সহযোগিতা (Orphanage & Institutional Support)
      ===================================================================== */}
      {orphanageSupport && (
        <section
          id="orphanage"
          className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 scroll-mt-14"
        >
          <div className="bg-white border border-gray-200/90 rounded-xl shadow-sm overflow-hidden">
            {/* Institutional Header Bar */}
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-5 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
                <h2 className="text-base sm:text-lg font-bold tracking-wide">
                  {orphanageSupport.title}
                </h2>
              </div>
              <span className="text-xs text-amber-200 bg-black/20 border border-amber-300/30 px-2.5 py-0.5 rounded-full hidden sm:inline font-medium"><EditableText document="copy.ui.HomePrimarySection" entry="e1c0qlkv" fallback={"লিল্লাহ বোর্ডিং ও মানবসেবা কার্যক্রম"} /></span>
            </div>

            <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Description & Action Buttons */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#8B111A] flex items-center gap-2">
                    <HeartHandshake size={18} className="text-[#8B111A] shrink-0" />
                    <span>{orphanageSupport.subtitle}</span>
                  </h3>
                  <p className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify">
                    {orphanageSupport.description}
                  </p>
                </div>

                {/* বোতাম: এতিমখানার পরিচিতি & সহযোগিতার উপায় */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href={orphanageSupport.buttons[0].href}
                    className="inline-flex items-center gap-1.5 bg-[#016332] hover:bg-[#014724] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-md transition-all shadow-xs group"
                  >
                    <span>{orphanageSupport.buttons[0].label}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href={orphanageSupport.buttons[1].href}
                    className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-md transition-all shadow-xs"
                  >
                    <HeartHandshake size={15} />
                    <span>{orphanageSupport.buttons[1].label}</span>
                  </Link>
                </div>

                {/* Hifz Bibhag Image directly below the buttons */}
                {orphanageSupport.image && (
                  <div className="pt-2">
                    <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 group shadow-xs">
                      <Image document="copy.ui.HomePrimarySection" entry="elwzeyd" source={fieldSource(orphanageSupport, "image")}
                        src={orphanageSupport.image || "/drone_poster.jpg"}
                        alt="জামিয়া নেছারিয়া এতিমখানা ও হিফজুল কুরআন বিভাগ"
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3.5 text-white">
                        <p className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{orphanageSupport.imageCaption}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Support Pillars Ledger */}
              <div className="lg:col-span-5 bg-[#FAF7F0]/90 border border-[#D9822B]/30 rounded-xl p-4 sm:p-5 shadow-2xs">
                <h4 className="text-xs sm:text-sm font-bold text-[#016332] pb-2.5 mb-3.5 border-b border-gray-200 flex items-center justify-between">
                  <span><EditableText document="copy.ui.HomePrimarySection" entry="e1g5sq6y" fallback={"সহযোগিতার গুরুত্বপূর্ণ খাতসমূহ :"} /></span>
                  <span className="text-[11px] font-semibold text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded-full"><EditableText document="copy.ui.HomePrimarySection" entry="e5re446" fallback={"সদকাহ ও অনুদান"} /></span>
                </h4>

                <div className="space-y-2.5">
                  {orphanageSupport.supportPillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200/90 rounded-lg p-3 border-l-3 border-l-[#016332] hover:border-[#016332]/50 transition-colors shadow-2xs"
                    >
                      <h5 className="text-xs sm:text-[13px] font-bold text-gray-900 mb-0.5">
                        {pillar.title}
                      </h5>
                      <p className="text-[11.5px] sm:text-xs text-gray-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick Bank & bKash info */}
                <div className="mt-3.5 pt-3 border-t border-gray-200/90 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-md border border-pink-200">
                    <span className="font-bold text-pink-700"><EditableText document="copy.ui.HomePrimarySection" entry="e1j8zhu" fallback={"বিকাশ (bKash):"} /></span>
                    <span className="font-bold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="ect6l3a" fallback={"+8801716296379"} /></span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-md border border-emerald-200">
                    <span className="font-bold text-[#016332]"><EditableText document="copy.ui.HomePrimarySection" entry="egx3n0a" fallback={"গোরাবা ফান্ড (Sonali Bank):"} /></span>
                    <span className="font-bold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="e1ci49uj" fallback={"34004081"} /></span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-md border border-amber-200">
                    <span className="font-bold text-[#8B111A]"><EditableText document="copy.ui.HomePrimarySection" entry="e1yojx1b" fallback={"সাধারণ ফান্ড (Krishi Bank):"} /></span>
                    <span className="font-bold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="e1tk2fez" fallback={"42080310061842"} /></span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200/90 flex flex-wrap items-center justify-between text-xs text-gray-700 gap-1">
                  <span className="font-semibold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="elepabj" fallback={"অনুদান ও তথ্য হটলাইন:"} /></span>
                  <a
                    href={`tel:${contact.phoneValue}`}
                    className="font-bold text-[#8B111A] bg-white border border-[#8B111A]/25 px-2.5 py-1 rounded-md hover:bg-[#8B111A] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Phone size={12} />
                    <span>{contact.phoneValue}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              ৩১৩ বদরি কাফেলা (313 Badri Kafila Patron Circle)
          =================================================================== */}
          {badriKafila && (
            <div
              id="badri-kafila"
              className="mt-6 bg-gradient-to-br from-[#FAF7F0] via-white to-[#FAF7F0] border-2 border-[#D9822B] rounded-xl shadow-sm overflow-hidden scroll-mt-14"
            >
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-4 sm:px-5 py-3 border-b-2 border-[#D9822B] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
                  <h3 className="text-base sm:text-lg font-bold tracking-wide">
                    {badriKafila.title}
                  </h3>
                </div>
                <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-300/40 px-3 py-0.5 rounded-full font-semibold">
                  {badriKafila.badge}
                </span>
              </div>

              <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3.5">
                  <h4 className="text-sm sm:text-base font-bold text-[#016332]">
                    {badriKafila.subtitle}
                  </h4>
                  <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed text-justify">
                    {badriKafila.description}
                  </p>

                  <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-gray-800">
                    {badriKafila.points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200/90 rounded-lg p-3 flex items-start gap-2 shadow-2xs"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#8B111A]/10 text-[#8B111A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"><EditableText document="copy.ui.HomePrimarySection" entry="esc0dec" fallback={"✓"} /></span>
                        <span className="leading-snug font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* বোতাম: কাফেলায় যুক্ত হোন & সদস্য ফরম */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href={badriKafila.buttons[0].href}
                      className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-md transition-all shadow-xs"
                    >
                      <HeartHandshake size={15} />
                      <span>{badriKafila.buttons[0].label}</span>
                    </Link>

                    <Link
                      href={badriKafila.buttons[1].href}
                      className="inline-flex items-center gap-1.5 bg-[#016332] hover:bg-[#014724] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-md transition-all shadow-xs group"
                    >
                      <span>{badriKafila.buttons[1].label}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border-2 border-[#D9822B]/40 rounded-xl p-5 text-center space-y-2 shadow-xs relative overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-[#016332] via-[#D9822B] to-[#8B111A] absolute top-0 left-0" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block pt-1"><EditableText document="copy.ui.HomePrimarySection" entry="eskjvce" fallback={"সদস্য লক্ষ্যমাত্রা"} /></span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#8B111A] tracking-tight">
                    {badriKafila.targetNumber}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#016332]">
                    {badriKafila.targetLabel}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                    {badriKafila.targetDesc}
                  </p>
                  <div className="pt-2">
                    <a
                      href={`tel:${contact.phoneValue}`}
                      className="inline-flex items-center justify-center gap-1.5 w-full bg-[#FAF7F0] border border-[#D9822B]/40 hover:border-[#8B111A] hover:bg-[#8B111A] hover:text-white rounded-md text-xs font-bold text-gray-800 py-2 transition-colors"
                    >
                      <Phone size={12} />
                      <span><EditableText document="copy.ui.HomePrimarySection" entry="e14iez5n" fallback={"সরাসরি যোগাযোগ: "} />{contact.phoneValue}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          নতুন ছাত্রাবাস নির্মাণ প্রকল্প (New Student Hostel Construction Project)
      ===================================================================== */}
      {hostelProject && (
        <section
          id="hostel-project"
          className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 scroll-mt-14"
        >
          <div className="bg-white border border-gray-200/90 rounded-xl shadow-sm overflow-hidden">
            {/* Institutional Header Bar */}
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-5 py-3 border-b-2 border-[#D9822B] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
                <h2 className="text-base sm:text-lg font-bold tracking-wide">
                  {hostelProject.title}
                </h2>
              </div>
              <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-300/40 px-3 py-0.5 rounded-full font-semibold">
                {hostelProject.badge}
              </span>
            </div>

            <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column (5 cols): Hero Image */}
              <div className="lg:col-span-5 space-y-2">
                <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 group shadow-xs">
                  <Image document="copy.ui.HomePrimarySection" entry="ee3osf8" source={fieldSource(hostelProject, "image")}
                    src={hostelProject.image || "/drone_poster.jpg"}
                    alt={hostelProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3.5 text-white">
                    <p className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                      <Building2 size={14} className="text-amber-300 shrink-0" />
                      <span>{hostelProject.imageCaption}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Content, Callout, & Action Button */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-3">
                  <span className="inline-block bg-[#016332]/10 text-[#016332] text-xs font-bold px-3 py-1 rounded-full border border-[#016332]/20"><EditableText document="copy.ui.HomePrimarySection" entry="e2fhmyz" fallback={"আবাসন-সংকট নিরসন ও সম্প্রসারণ উদ্যোগ"} /></span>

                  {/* Client's exact text 1 */}
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                    {hostelProject.shortInfo}
                  </p>

                  {/* Client's exact text 2: Highlight Appeal Callout */}
                  <div className="bg-gradient-to-r from-[#FAF7F0] to-white border-l-4 border-l-[#8B111A] rounded-r-lg p-3.5 sm:p-4 my-2 border-y border-r border-gray-200/90 shadow-2xs">
                    <p className="text-sm sm:text-[15.5px] font-bold text-[#8B111A] leading-relaxed"><EditableText document="copy.ui.HomePrimarySection" entry="e1gy4flx" fallback={"“"} />{hostelProject.appeal}<EditableText document="copy.ui.HomePrimarySection" entry="e1liepn7" fallback={"”"} /></p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                    {hostelProject.description}
                  </p>
                </div>

                {/* Key feature pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-gray-700">
                  {hostelProject.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF7F0] border border-gray-200/90 rounded-lg p-2.5 flex items-start gap-2"
                    >
                      <span className="text-[#016332] font-bold mt-0.5"><EditableText document="copy.ui.HomePrimarySection" entry="e1mj07lh" fallback={"▪"} /></span>
                      <span className="leading-snug font-medium">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Client's exact button: "প্রকল্পের বিস্তারিত ও সহযোগিতা" */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={hostelProject.buttonHref}
                    className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md transition-all shadow-xs group"
                  >
                    <span>{hostelProject.buttonText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <a
                    href={`tel:${contact.phoneValue}`}
                    className="inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:border-[#016332] text-gray-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-md transition-colors shadow-2xs"
                  >
                    <Phone size={13} className="text-[#016332]" />
                    <span><EditableText document="copy.ui.HomePrimarySection" entry="eh1z5wk" fallback={"সহায়তা হটলাইন: "} />{contact.phoneValue}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          ১০। আমাদের গ্যালারি (Our Gallery)
      ===================================================================== */}
      <section
        id="gallery"
        className="bg-white border-y border-gray-200 py-8 sm:py-10 scroll-mt-14"
      >
        <HomeGalleryFilter
          title={gallery.title}
          subtitle={gallery.subtitle}
          categories={gallery.categories}
          items={gallery.items || gallery.categories}
        />
      </section>

      {/* =====================================================================
          ১১। মাদরাসা ব্লগ ও সমকালীন প্রবন্ধ (Blog Section & Dummy Posts)
      ===================================================================== */}
      <section
        id="blog"
        className="py-10 sm:py-14 bg-gradient-to-b from-[#FAF7F0] via-white to-[#FAF7F0] border-b border-[#e6decb] scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Institutional Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-7 border-b-2 border-[#016332]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-7 bg-[#8B111A] rounded-xs inline-block" />
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-gray-900"><EditableText document="copy.ui.HomePrimarySection" entry="e7zgkra" fallback={"মাদরাসা ব্লগ ও সমকালীন প্রবন্ধ"} /></h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 pl-4"><EditableText document="copy.ui.HomePrimarySection" entry="e20j9kt" fallback={"দ্বীনি চিন্তা, শিক্ষা, তারবিয়াত ও স্বাস্থ্য সচেতনতা বিষয়ক নিয়মিত জ্ঞানগর্ভ লেখা"} /></p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B111A] hover:text-white bg-[#8B111A]/8 hover:bg-[#8B111A] border border-[#8B111A]/25 px-3.5 py-2 rounded-md transition-all self-start sm:self-auto group"
            >
              <span><EditableText document="copy.ui.HomePrimarySection" entry="e1gwg59o" fallback={"সকল ব্লগ দেখুন"} /></span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 3 Featured Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-gray-200/90 hover:border-[#016332] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Thumbnail with Category & Read Time Badges */}
                  <div className="relative aspect-16/10 w-full bg-gray-100 overflow-hidden">
                    <Image document="copy.ui.HomePrimarySection" entry="e1x47el6" source={fieldSource(post, "thumbnail")}
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold bg-[#8B111A] text-white px-2.5 py-1 rounded shadow-xs border border-white/20">
                        {post.category}
                      </span>
                    </div>
                    {post.readTime && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10.5px] font-medium bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded shadow-xs">
                          {post.readTime}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    {/* Meta Row: Date & Author */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2.5">
                      <span className="flex items-center gap-1 font-medium text-emerald-800">
                        <User size={13} />
                        <span>{post.author}</span>
                      </span>
                      <span><EditableText document="copy.ui.HomePrimarySection" entry="e69jeu9" fallback={"•"} /></span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        <span>{post.date}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#016332] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog#post-${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/blog#post-${post.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#8B111A] hover:text-[#016332] transition-colors"
                  >
                    <span><EditableText document="copy.ui.HomePrimarySection" entry="e1ndf4r1" fallback={"সম্পূর্ণ পড়ুন"} /></span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {post.likesCount ? `👍 ${post.likesCount}` : ""}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Explore Strip */}
          <div className="mt-8 bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#016332] text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-xs"><EditableText document="copy.ui.HomePrimarySection" entry="eqdf34s" fallback={"✍️"} /></span>
              <p className="text-xs sm:text-sm text-gray-700"><EditableText document="copy.ui.HomePrimarySection" entry="eeoglzc" fallback={"শিক্ষক, শিক্ষার্থী ও অভিভাবকদের জন্য নিয়মিত জ্ঞানগর্ভ প্রবন্ধ ও ইসলামি জীবনধারার সঠিক নির্দেশনা প্রকাশিত হয়।"} /></p>
            </div>
            <Link
              href="/blog"
              className="shrink-0 bg-[#016332] hover:bg-[#024a24] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-xs"
            ><EditableText document="copy.ui.HomePrimarySection" entry="ew12ncc" fallback={"সকল ব্লগ পাতা খুলুন"} /></Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ১২। ভর্তি আহ্বান & ১২। যোগাযোগ (Admission & Contact Desk)
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* ১১। ভর্তি আহ্বান */}
        <div
          id="admission"
          className="bg-gradient-to-br from-[#014d26] via-[#016332] to-[#024222] text-white border-2 border-[#D9822B] rounded-xl p-5 sm:p-8 shadow-md scroll-mt-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-block bg-[#8B111A] text-amber-200 text-xs font-bold px-3.5 py-1 rounded-full border border-amber-300/40 shadow-2xs">
                {admissionCall.title}
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                {admissionCall.headline}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {admissionCall.description}
              </p>
              <p className="text-xs sm:text-sm text-amber-200 font-medium bg-black/25 px-4 py-2.5 rounded-r-md border-l-3 border-[#D9822B]">
                {admissionCall.note}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${contact.phoneValue}`}
                  className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-md border border-amber-300/40 transition-all shadow-xs"
                >
                  <Phone size={14} />
                  <span><EditableText document="copy.ui.HomePrimarySection" entry="eymegf" fallback={"মোবাইল: "} />{contact.phoneValue}</span>
                </a>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 bg-white text-[#016332] hover:bg-amber-50 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-md transition-all shadow-xs group"
                >
                  <span><EditableText document="copy.ui.HomePrimarySection" entry="e13js1nw" fallback={"অনলাইন ভর্তি ফরম"} /></span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {admissionCall.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/25 border border-emerald-600/60 rounded-lg p-3.5 hover:border-amber-300/50 transition-colors"
                >
                  <h3 className="font-bold text-amber-300 text-xs sm:text-sm mb-1"><EditableText document="copy.ui.HomePrimarySection" entry="er6niji" fallback={"▪ "} />{item.label}
                  </h3>
                  <p className="text-emerald-100 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ১২। যোগাযোগ */}
        <div
          id="contact"
          className="bg-white border border-gray-200/90 rounded-xl shadow-sm overflow-hidden scroll-mt-14"
        >
          <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-5 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
            <h2 className="text-base sm:text-lg font-bold tracking-wide">
              {contact.title}
            </h2>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Contact Details Table */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-gray-200/90 rounded-xl overflow-hidden divide-y divide-gray-200/90 text-xs sm:text-sm shadow-2xs">
                <div className="p-4 flex items-start gap-3.5 bg-[#FAF7F0]">
                  <div className="w-9 h-9 rounded-lg bg-[#8B111A]/10 text-[#8B111A] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-600 text-xs">
                      {contact.addressLabel}
                    </span>
                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                      {contact.addressValue}
                    </span>
                    <span className="block text-xs text-gray-600 mt-0.5"><EditableText document="copy.ui.HomePrimarySection" entry="e1s5vgdf" fallback={"মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন), টঙ্গী, গাজীপুর।"} /></span>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-3.5 bg-white">
                  <div className="w-9 h-9 rounded-lg bg-[#016332]/10 text-[#016332] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-600 text-xs">
                      {contact.phoneLabel}
                    </span>
                    <a
                      href={`tel:${contact.phoneValue}`}
                      className="font-bold text-[#8B111A] text-base sm:text-lg hover:underline"
                    >
                      {contact.phoneValue}
                    </a>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-3.5 bg-[#FAF7F0]">
                  <div className="w-9 h-9 rounded-lg bg-[#D9822B]/15 text-[#b56719] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-600 text-xs">
                      {contact.emailLabel}
                    </span>
                    <a
                      href={`mailto:${contact.emailValue}`}
                      className="font-bold text-[#016332] text-sm sm:text-base hover:underline break-all"
                    >
                      {contact.emailValue}
                    </a>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-3.5 bg-white">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-bold text-gray-600 text-xs"><EditableText document="copy.ui.HomePrimarySection" entry="ekrn6ww" fallback={"অফিশিয়াল ফেসবুক পেজ"} /></span>
                    <a
                      href={currentSettings.facebookUrl || "https://www.facebook.com/jamianesaria/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#1877F2] text-sm sm:text-base hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <span><EditableText document="copy.ui.HomePrimarySection" entry="e1rku567" fallback={"facebook.com/jamianesaria"} /></span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7 border border-gray-200/90 rounded-xl p-1.5 bg-[#FAF7F0] shadow-2xs">
              <iframe
                title="জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা ম্যাপ"
                src="https://www.google.com/maps?q=Morkun,+Tongi,+Gazipur,+Bangladesh&output=embed"
                className="w-full h-60 sm:h-64 border-0 rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
