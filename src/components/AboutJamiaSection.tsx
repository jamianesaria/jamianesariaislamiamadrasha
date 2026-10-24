
import { stegaClean } from "@sanity/client/stega";
import Link from "next/link";
import { aboutPageData as _fallback_aboutPageData, siteSettings as _fallback_siteSettings } from "@/data/siteData";
import {
  BookOpen,
  Calendar,
  MapPin,
  Award,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building2,
  FileCheck2,
  Phone,
} from "lucide-react";
import { EditableImage as Image, getEditableData, EditableText } from "@/content/server";
import { fieldSource } from "@/content/model";



export default async function AboutJamiaSection() {
  const aboutPageData = await getEditableData("copy.data.aboutPageData", _fallback_aboutPageData);
  const siteSettings = await getEditableData("siteSettings", _fallback_siteSettings);

  const { header, sections } = aboutPageData;

  const tocItems = await getEditableData("copy.ui.AboutJamiaSection", [
    { id: "identity", num: "১", label: "জামিয়ার পরিচয়" },
    { id: "history", num: "২", label: "প্রতিষ্ঠাকাল ও ইতিহাস" },
    { id: "founders", num: "৩", label: "প্রতিষ্ঠাতা ও জমিদাতাগণ" },
    { id: "location", num: "৪", label: "অবস্থান ও পরিবেশ" },
    { id: "mission", num: "৫", label: "লক্ষ্য ও উদ্দেশ্য" },
    { id: "philosophy", num: "৬", label: "আদর্শ ও শিক্ষাদর্শন" },
    { id: "features", num: "৭", label: "মাদরাসার বৈশিষ্ট্য" },
    { id: "registration", num: "৮", label: "নিবন্ধন পরিচিতি" },
    { id: "activities", num: "৯", label: "বর্তমান কার্যক্রম" },
    { id: "commitment", num: "১০", label: "আমাদের অঙ্গীকার" },
  ], ["local","tocItems"]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* =====================================================================
          TOP INSTITUTIONAL IDENTITY HERO CARD
      ===================================================================== */}
      <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} className="text-amber-300 shrink-0" />
            <span className="font-bold text-sm sm:text-base tracking-wide"><EditableText document="copy.ui.AboutJamiaSection" entry="e1f5kqrb" fallback={"জামিয়া পরিচিতি — পূর্ণাঙ্গ প্রাতিষ্ঠানিক বিবরণী"} /></span>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-amber-200 hover:text-white bg-black/20 px-3 py-1 rounded-full border border-amber-300/30 transition-colors"
          ><EditableText document="copy.ui.AboutJamiaSection" entry="e1431uxj" fallback={"← হোমপেজে ফিরে যান"} /></Link>
        </div>

        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#FAF7F0]/70 to-white">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Official Seal */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-3 border-[#8B111A] ring-4 ring-amber-100/80 p-0.5 bg-white shadow-md shrink-0 relative overflow-hidden">
              <Image document="copy.ui.AboutJamiaSection" entry="eoadomy" source={fieldSource(siteSettings, "logoUrl")}
                src={siteSettings.logoUrl || "/jamia-logo-v2.png"}
                alt={header.title}
                width={128}
                height={128}
                className="w-full h-full object-contain rounded-full scale-105"
              />
            </div>

            <div className="flex-1 space-y-2.5">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#016332] tracking-tight">
                {header.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-0.5">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B111A] bg-amber-50 border border-[#D9822B]/40 px-3.5 py-1 rounded-full">
                  <Calendar size={14} className="text-[#8B111A]" />
                  <span>{header.established}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm md:text-[15px] text-gray-700 font-medium flex items-center justify-center md:justify-start gap-1.5 pt-0.5">
                <MapPin size={15} className="text-[#8B111A] shrink-0" />
                <span>{header.address}</span>
              </p>

              {/* Quick Official Registration Strip */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                <span className="bg-[#016332]/10 text-[#016332] border border-[#016332]/20 font-bold px-3 py-1 rounded-md"><EditableText document="copy.ui.AboutJamiaSection" entry="egsag8g" fallback={"আল-হাইআতুল উলয়া নিবন্ধন: ০০৬৮৫"} /></span>
                <span className="bg-[#8B111A]/10 text-[#8B111A] border border-[#8B111A]/20 font-bold px-3 py-1 rounded-md"><EditableText document="copy.ui.AboutJamiaSection" entry="e9c3s87" fallback={"বেফাক নিবন্ধন: ১/৭৪৩"} /></span>
                <span className="bg-amber-500/15 text-amber-900 border border-amber-500/30 font-bold px-3 py-1 rounded-md"><EditableText document="copy.ui.AboutJamiaSection" entry="evak6cg" fallback={"এতিমখানা নিবন্ধন (সমাজসেবা অধিদপ্তর): ঢ-০৫০৪"} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN 2-COLUMN LAYOUT: STICKY TABLE OF CONTENTS + 10 SECTIONS
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
        {/* LEFT STICKY TABLE OF CONTENTS (3 cols on Desktop) */}
        <aside className="lg:col-span-3 lg:sticky lg:top-16 space-y-5">
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-4 py-2.5 border-b-2 border-[#D9822B] flex items-center gap-2">
              <Compass size={16} className="text-amber-300" />
              <h2 className="text-sm font-bold tracking-wide"><EditableText document="copy.ui.AboutJamiaSection" entry="enzrzhv" fallback={"এক নজরে সূচিপত্র"} /></h2>
            </div>

            <nav className="p-2 divide-y divide-gray-100">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-[13px] font-semibold text-gray-700 hover:text-[#016332] hover:bg-[#FAF7F0] rounded-lg transition-colors group"
                >
                  <span className="w-5 h-5 rounded-full bg-[#016332]/10 text-[#016332] group-hover:bg-[#016332] group-hover:text-white font-bold text-[11px] flex items-center justify-center shrink-0 transition-colors">
                    {item.num}
                  </span>
                  <span className="truncate">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Action Sidebar Card */}
          <div className="bg-gradient-to-br from-[#014d26] to-[#016332] text-white rounded-xl p-4 border border-[#D9822B]/50 shadow-sm space-y-3 hidden lg:block">
            <h3 className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
              <GraduationCap size={16} />
              <span><EditableText document="copy.ui.AboutJamiaSection" entry="e163nxqq" fallback={"শিক্ষা কার্যক্রম ও ভর্তি"} /></span>
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed"><EditableText document="copy.ui.AboutJamiaSection" entry="e58isle" fallback={"মক্তব, হিফজ, হিফজ রিভিশন, কিতাব ও মাদানি নেসাব বিভাগের বিস্তারিত পাঠ্যক্রম দেখুন।"} /></p>
            <div className="space-y-2 pt-1">
              <Link
                href="/academics"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-[#016332] hover:bg-amber-50 text-xs font-bold py-2 px-3 rounded-md transition-colors"
              >
                <span><EditableText document="copy.ui.AboutJamiaSection" entry="ejstd05" fallback={"শিক্ষা বিভাগ ও পাঠ্যক্রম"} /></span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/apply"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs font-bold py-2 px-3 rounded-md border border-amber-300/30 transition-colors"
              >
                <span><EditableText document="copy.ui.AboutJamiaSection" entry="ey16mx5" fallback={"অনলাইন ভর্তি আবেদন"} /></span>
              </Link>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA (9 cols on Desktop) */}
        <div className="lg:col-span-9 space-y-6">
          {/* ১. জামিয়ার পরিচয় */}
          <section
            id="identity"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
                <h2 className="text-base sm:text-lg font-bold">
                  {sections.identity.title}
                </h2>
              </div>
              <span className="text-xs bg-white/15 text-amber-200 px-2.5 py-0.5 rounded-full font-semibold">
                {sections.identity.subtitle}
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-[#8B111A] border-b border-gray-100 pb-2">
                {sections.identity.subtitle}
              </h3>
              {sections.identity.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === sections.identity.paragraphs.length - 1
                      ? "bg-[#FAF7F0] border-l-4 border-l-[#016332] p-4 rounded-r-lg text-sm sm:text-[15.5px] font-semibold text-gray-900 leading-relaxed"
                      : "text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* ২. প্রতিষ্ঠাকাল ও ইতিহাস */}
          <section
            id="history"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
              <h2 className="text-base sm:text-lg font-bold">
                {sections.history.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              {/* Era Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-2">
                <div className="bg-[#FAF7F0] border border-[#D9822B]/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-gray-500 block"><EditableText document="copy.ui.AboutJamiaSection" entry="e1rlb7hq" fallback={"খ্রিষ্টাব্দ সন"} /></span>
                  <span className="text-base sm:text-lg font-extrabold text-[#016332]"><EditableText document="copy.ui.AboutJamiaSection" entry="eakpy0h" fallback={"১৯৬৯ খ্রিষ্টাব্দ"} /></span>
                </div>
                <div className="bg-[#FAF7F0] border border-[#D9822B]/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-gray-500 block"><EditableText document="copy.ui.AboutJamiaSection" entry="e1xhh3rv" fallback={"বাংলা সন"} /></span>
                  <span className="text-base sm:text-lg font-extrabold text-[#8B111A]"><EditableText document="copy.ui.AboutJamiaSection" entry="e1b09lem" fallback={"১৩৭৬ বাংলা"} /></span>
                </div>
                <div className="bg-[#FAF7F0] border border-[#D9822B]/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-gray-500 block"><EditableText document="copy.ui.AboutJamiaSection" entry="eba415b" fallback={"হিজরি সন"} /></span>
                  <span className="text-base sm:text-lg font-extrabold text-[#016332]"><EditableText document="copy.ui.AboutJamiaSection" entry="e1r997kr" fallback={"১৩৮৮ হিজরি"} /></span>
                </div>
              </div>

              {sections.history.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* ৩. প্রতিষ্ঠাতা ও জমিদাতাদের অবদান */}
          <section
            id="founders"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
              <HeartHandshake size={18} className="text-amber-300 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold">
                {sections.founders.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              {/* Highlighted Donors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {sections.founders.donors.map((donor, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-[#FAF7F0] to-white border border-[#D9822B]/40 rounded-xl p-4 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-full bg-[#8B111A] text-white text-xs font-bold flex items-center justify-center"><EditableText document="copy.ui.AboutJamiaSection" entry="e1inmm8u" fallback={"০"} />{idx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-[#016332] bg-[#016332]/10 px-2.5 py-0.5 rounded-full"><EditableText document="copy.ui.AboutJamiaSection" entry="e19e30hs" fallback={"শ্রদ্ধেয় জমিদাতা"} /></span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900">
                      {donor.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{donor.role}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5 pt-1">
                {sections.founders.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ৪. জামিয়ার অবস্থান ও পরিবেশ */}
          <section
            id="location"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
              <MapPin size={18} className="text-amber-300 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold">
                {sections.location.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              {sections.location.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* ৫. জামিয়ার লক্ষ্য ও উদ্দেশ্য */}
          <section
            id="mission"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-[#D9822B] rounded-full inline-block" />
              <h2 className="text-base sm:text-lg font-bold">
                {sections.mission.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              <div className="bg-gradient-to-r from-[#FAF7F0] to-white border border-[#e6dec8] border-l-4 border-l-[#8B111A] rounded-r-lg p-4 sm:p-5">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded mb-1"><EditableText document="copy.ui.AboutJamiaSection" entry="e1rx9bpk" fallback={"মূল লক্ষ্য"} /></span>
                <p className="text-sm sm:text-base font-bold text-gray-900 leading-relaxed">
                  {sections.mission.mainGoal}
                </p>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#016332] mb-3">
                  {sections.mission.objectivesIntro}
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {sections.mission.objectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF7F0]/60 border border-gray-200/90 rounded-lg px-4 py-3 flex items-start gap-3 hover:border-[#016332]/40 transition-colors"
                    >
                      <CheckCircle2
                        size={17}
                        className="text-[#016332] shrink-0 mt-0.5"
                      />
                      <span className="text-sm sm:text-[15px] text-gray-800 font-medium leading-relaxed">
                        {obj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ৬. জামিয়ার আদর্শ ও শিক্ষাদর্শন */}
          <section
            id="philosophy"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
              <Sparkles size={18} className="text-amber-300 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold">
                {sections.philosophy.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              {sections.philosophy.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify"
                >
                  {para}
                </p>
              ))}

              <div className="pt-2">
                <h3 className="text-sm sm:text-base font-bold text-[#8B111A] mb-3">
                  {sections.philosophy.pointsIntro}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {sections.philosophy.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF7F0] border border-gray-200/90 rounded-lg p-3 flex items-start gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#8B111A] shrink-0 mt-2" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ৭. মাদরাসার বৈশিষ্ট্য */}
          <section
            id="features"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
              <Award size={18} className="text-amber-300 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold">
                {sections.features.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              <p className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed">
                {sections.features.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.features.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF7F0]/70 border border-gray-200/90 rounded-xl p-4 hover:border-[#016332]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-[#016332] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {item.letter}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ৮. নিবন্ধন পরিচিতি */}
          <section
            id="registration"
            className="bg-white rounded-xl border-2 border-[#D9822B] shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck2 size={18} className="text-amber-300 shrink-0" />
                <h2 className="text-base sm:text-lg font-bold">
                  {sections.registration.title}
                </h2>
              </div>
              <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-300/40 px-2.5 py-0.5 rounded-full font-semibold"><EditableText document="copy.ui.AboutJamiaSection" entry="e52swxl" fallback={"সরকারি ও বোর্ড অনুমোদন"} /></span>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              <p className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed">
                {sections.registration.intro}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {sections.registration.items.map((reg, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-[#FAF7F0] via-white to-[#FAF7F0] border border-gray-200/90 border-l-4 border-l-[#016332] rounded-xl p-4 sm:p-5 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/80">
                      <span className="bg-[#016332] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                        {reg.code}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        {reg.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                      {reg.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="bg-white border border-gray-200/80 rounded-lg px-3.5 py-2.5 flex flex-col justify-center"
                        >
                          <span className="text-[11px] font-semibold text-gray-500">
                            {detail.label}
                          </span>
                          <span
                            className={
                              detail.highlight
                                ? "text-sm sm:text-base font-extrabold text-[#8B111A] mt-0.5"
                                : "text-xs sm:text-sm font-bold text-gray-900 mt-0.5"
                            }
                          >
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ৯. জামিয়ার বর্তমান কার্যক্রম */}
          <section
            id="activities"
            className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden scroll-mt-16"
          >
            <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] text-white px-4 sm:px-6 py-3 border-b-2 border-[#D9822B] flex items-center gap-2.5">
              <Building2 size={18} className="text-amber-300 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold">
                {sections.activities.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              {sections.activities.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-[15.5px] text-gray-700 leading-relaxed text-justify"
                >
                  {para}
                </p>
              ))}

              <div className="pt-2">
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014724] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md shadow-xs transition-all group"
                >
                  <GraduationCap size={16} />
                  <span><EditableText document="copy.ui.AboutJamiaSection" entry="e8ljkiw" fallback={"শিক্ষা বিভাগ ও পাঠ্যক্রম পৃষ্ঠায় যান"} /></span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </section>

          {/* ১০. আমাদের অঙ্গীকার */}
          <section
            id="commitment"
            className="bg-gradient-to-br from-[#014d26] via-[#016332] to-[#024222] text-white rounded-xl border-2 border-[#D9822B] shadow-md overflow-hidden scroll-mt-16"
          >
            <div className="px-5 sm:px-7 py-4 border-b border-emerald-700/70 flex items-center gap-2.5">
              <ShieldCheck size={20} className="text-amber-300 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-amber-200">
                {sections.commitment.title}
              </h2>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <p className="text-sm sm:text-base text-emerald-50 leading-relaxed text-justify">
                {sections.commitment.paragraphs[0]}
              </p>

              <div className="bg-black/25 border-l-4 border-[#D9822B] p-4 rounded-r-lg">
                <p className="text-sm sm:text-base font-bold text-amber-200 leading-relaxed"><EditableText document="copy.ui.AboutJamiaSection" entry="en7c35q" fallback={"“"} />{sections.commitment.paragraphs[1]}<EditableText document="copy.ui.AboutJamiaSection" entry="e1w071rx" fallback={"”"} /></p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-700/60 text-xs text-emerald-100">
                <span>
                  {header.title}<EditableText document="copy.ui.AboutJamiaSection" entry="e1ad7szi" fallback={" — "} />{header.established}
                </span>
                <a
                  href={`tel:${stegaClean(siteSettings.phone)}`}
                  className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:underline"
                >
                  <Phone size={13} />
                  <span><EditableText document="copy.ui.AboutJamiaSection" entry="e9h354f" fallback={"যোগাযোগ: "} />{siteSettings.phone}</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

