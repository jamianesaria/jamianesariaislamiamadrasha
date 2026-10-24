"use client";

import { stegaClean } from "@sanity/client/stega";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  noticesData as _fallback_fallbackNotices,
  NoticeFullItem,
  siteSettings as _fallback_siteSettings,
} from "@/data/siteData";
import {
  FileText,
  Search,
  Calendar,
  Eye,
  Download,
  Printer,
  Share2,
  X,
  AlertCircle,
  Pin,
  Sparkles,
  Phone,
  LayoutGrid,
  List,
  ChevronRight,
  Check,
  Clock,
  ArrowDownToLine,
  BookOpen,
  GraduationCap,
  Building,
  HelpCircle,
  RotateCcw,
  Stamp,
  Award,
  Layers,
  CalendarDays,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { EditableText, useEditableData } from "@/content/client";


type CategoryFilter = "all" | "admission" | "exam" | "holiday" | "routine" | "general";
type SortOption = "newest" | "oldest" | "urgent";
type ViewMode = "pinboard" | "gazette" | "timeline";

// 3D Pushpin Graphic Component
function PushPin({ color = "red" }: { color?: "red" | "gold" | "green" }) {
  const gradient =
    color === "gold"
      ? "from-amber-300 via-amber-500 to-amber-700"
      : color === "green"
      ? "from-emerald-400 via-emerald-600 to-emerald-800"
      : "from-red-400 via-red-600 to-red-800";

  return (
    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
      {/* Pin Head */}
      <div
        className={`w-4 h-4 rounded-full bg-gradient-to-br ${gradient} shadow-inner border border-white/60 relative`}
      >
        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/70 rounded-full" />
      </div>
      {/* Pin Neck */}
      <div className="w-1.5 h-1.5 bg-gray-400/80 -mt-0.5 shadow-2xs" />
      {/* Shadow under pin */}
      <div className="w-3 h-1 bg-black/30 rounded-full blur-[0.8px] -mt-0.5" />
    </div>
  );
}

// Vintage / Official Madrasa Rubber Stamp Badge
function RubberStamp({
  label,
  color = "red",
  rotate = "-rotate-6",
}: {
  label: string;
  color?: "red" | "emerald" | "purple" | "blue" | "amber";
  rotate?: string;
}) {
  const colorMap = {
    red: "text-red-700 border-red-700/80 bg-red-50/40",
    emerald: "text-emerald-800 border-emerald-800/80 bg-emerald-50/40",
    purple: "text-purple-800 border-purple-800/80 bg-purple-50/40",
    blue: "text-sky-800 border-sky-800/80 bg-sky-50/40",
    amber: "text-amber-800 border-amber-800/80 bg-amber-50/40",
  };

  return (
    <span
      className={`inline-block border-2 border-dashed font-bold uppercase tracking-wider text-[10px] sm:text-[11px] px-2 py-0.5 rounded-sm select-none ${colorMap[color]} ${rotate} transition-transform duration-200 group-hover:scale-105`}
      style={{
        boxShadow: "inset 0 0 2px rgba(0,0,0,0.1)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {label}
    </span>
  );
}

// Authentic Circular Institutional Seal Component
function InstitutionalSeal() {
  return (
    <div className="w-28 h-28 rounded-full border-4 border-emerald-800/80 border-dashed p-1 flex items-center justify-center relative select-none opacity-85 rotate-[-8deg] pointer-events-none">
      <div className="w-full h-full rounded-full border-2 border-emerald-800 flex flex-col items-center justify-center text-center p-1 bg-emerald-50/10">
        <span className="text-[7.5px] font-bold text-emerald-900 leading-tight"><EditableText document="copy.ui.NoticeBoardSection" entry="e1mppw7m" fallback={"الجامعة النثارية"} /></span>
        <span className="text-[9px] font-black text-emerald-950 tracking-tighter"><EditableText document="copy.ui.NoticeBoardSection" entry="e1oi7at5" fallback={"জামিয়া নেছারিয়া"} /></span>
        <span className="text-[6.5px] font-bold text-emerald-800 tracking-wider"><EditableText document="copy.ui.NoticeBoardSection" entry="e8tgjoc" fallback={"★ ১৯৬৯ ★"} /></span>
        <span className="text-[7.5px] font-bold text-emerald-900 leading-tight"><EditableText document="copy.ui.NoticeBoardSection" entry="edmvbwg" fallback={"টঙ্গী, গাজীপুর"} /></span>
      </div>
    </div>
  );
}

function NoticeBoardContent({ initialNotices }: { initialNotices?: NoticeFullItem[] } = {}) {
  const fallbackNotices = useEditableData("copy.data.noticesData", _fallback_fallbackNotices);
  const siteSettings = useEditableData("siteSettings", _fallback_siteSettings);

  const noticesData =
    initialNotices !== undefined
      ? initialNotices
      : fallbackNotices;

  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as CategoryFilter) || "all";
  const initialNoticeId = searchParams.get("id");

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("pinboard");
  const [selectedNoticeRecord, setSelectedNotice] = useState<NoticeFullItem | null>(() => noticesData.find((item) => String(item.id) === initialNoticeId) || null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const selectedNotice = noticesData.find((notice) => notice.id === selectedNoticeRecord?.id) || null;

  // Stamp-style categories list
  const categoriesList = useEditableData("copy.ui.NoticeBoardSection", [
    { key: "all", label: "সকল বিজ্ঞপ্তি", count: noticesData.length, color: "red" as const },
    {
      key: "admission",
      label: "ভর্তি সংক্রান্ত",
      count: noticesData.filter((n) => n.categoryKey === "admission").length,
      color: "emerald" as const,
    },
    {
      key: "exam",
      label: "পরীক্ষা ও ফলাফল",
      count: noticesData.filter((n) => n.categoryKey === "exam").length,
      color: "purple" as const,
    },
    {
      key: "holiday",
      label: "ছুটির তালিকা",
      count: noticesData.filter((n) => n.categoryKey === "holiday").length,
      color: "blue" as const,
    },
    {
      key: "routine",
      label: "ক্লাস ও রুটিন",
      count: noticesData.filter((n) => n.categoryKey === "routine").length,
      color: "amber" as const,
    },
    {
      key: "general",
      label: "প্রশাসনিক ও সাধারণ",
      count: noticesData.filter((n) => n.categoryKey === "general").length,
      color: "red" as const,
    },
  ], ["local","categoriesList"]);

  // Urgent pinned notices
  const pinnedNotices = useMemo(() => {
    return noticesData.filter((n) => n.isUrgent);
  }, [noticesData]);

  // Filtered and sorted notices
  const filteredNotices = useMemo(() => {
    let result = [...noticesData];

    // 1. Category Filter
    if (activeCategory !== "all") {
      result = result.filter((n) => n.categoryKey === activeCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.memoNo.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q) ||
          n.signatory.name.toLowerCase().includes(q) ||
          (n.instructions && n.instructions.some((ins: string) => ins.toLowerCase().includes(q)))
      );
    }

    // 3. Sorting
    if (sortBy === "newest") {
      result.sort((a, b) => Date.parse(stegaClean(b.publishDateEn)) - Date.parse(stegaClean(a.publishDateEn)));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => Date.parse(stegaClean(a.publishDateEn)) - Date.parse(stegaClean(b.publishDateEn)));
    } else if (sortBy === "urgent") {
      result.sort((a, b) => {
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
        return Date.parse(stegaClean(b.publishDateEn)) - Date.parse(stegaClean(a.publishDateEn));
      });
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, noticesData]);

  // Copy notice link action
  const handleCopyLink = (id: NoticeFullItem["id"]) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/notices?id=${id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  // Print notice action
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSortBy("newest");
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* =====================================================================
          ১। BESPOKE ARCHITECTURAL HERO: "জামিয়ার কেন্দ্রীয় মহাফেজখানা ও প্রজ্ঞাপন প্রাচীর"
      ===================================================================== */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#16271a] text-white shadow-2xl border-4 border-[#311f15]">
        {/* Subtle Archival Texture & Filigree Trim */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#D9822B 1px, transparent 1px), radial-gradient(#016332 1px, #16271a 1px)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />

        {/* Top Ornate Brass Rivet Bar */}
        <div className="bg-gradient-to-r from-[#2b180d] via-[#4a2b18] to-[#2b180d] px-4 py-2 flex items-center justify-between border-b-2 border-amber-600/40 text-[11px] font-mono text-amber-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] inline-block" />
            <span className="font-bold tracking-widest uppercase"><EditableText document="copy.ui.NoticeBoardSection" entry="ebxjr5b" fallback={"OFFICIAL ARCHIVES &amp; GAZETTE WALL"} /></span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-amber-300/80">
            <span><EditableText document="copy.ui.NoticeBoardSection" entry="elujqp2" fallback={"স্থাপিত: ১৯৬৯ খ্রি. (১৩৮৮ হিজরি)"} /></span>
            <span><EditableText document="copy.ui.NoticeBoardSection" entry="eqy1siq" fallback={"•"} /></span>
            <span><EditableText document="copy.ui.NoticeBoardSection" entry="ewhqow7" fallback={"রেজি: ঢ-০৫০৪ | ১/৭৪৩ | ০০৬৮৫"} /></span>
          </div>
        </div>

        {/* Hero Main Body */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-6">
          {/* Top Breadcrumb & Live Bell */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <Link href="/" className="hover:underline flex items-center gap-1">
                <span><EditableText document="copy.ui.NoticeBoardSection" entry="esdum18" fallback={"হোমপেজ"} /></span>
              </Link>
              <ChevronRight size={12} />
              <span className="text-white font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e1vlwzc" fallback={"বিজ্ঞপ্তি প্রাচীর ও মহাফেজখানা"} /></span>
            </div>

            {/* Audio / Announcement Tag */}
            <div className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-500/50 text-red-200 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              <Flame size={13} className="text-amber-400" />
              <span><EditableText document="copy.ui.NoticeBoardSection" entry="e14j7cts" fallback={"চলমান শিক্ষাবর্ষের সত্যায়িত প্রজ্ঞাপন"} /></span>
            </div>
          </div>

          {/* Central Calligraphy & Header */}
          <div className="space-y-3 max-w-4xl">
            <p className="font-serif text-sm sm:text-base text-amber-300/90 tracking-widest text-center sm:text-left"><EditableText document="copy.ui.NoticeBoardSection" entry="ef3g54u" fallback={"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"} /></p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"><EditableText document="copy.ui.NoticeBoardSection" entry="e1cv6689" fallback={"জামিয়ার কেন্দ্রীয় বিজ্ঞপ্তি প্রাচীর ও মহাফেজখানা"} /></h1>
            <p className="text-xs sm:text-base text-emerald-100/85 leading-relaxed max-w-3xl"><EditableText document="copy.ui.NoticeBoardSection" entry="e1rj8t9q" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার শিক্ষা বিভাগসমূহ, ভর্তি কার্যক্রম, কেন্দ্রীয় পরীক্ষা, বাৎসরিক ছুটির পঞ্জিকা ও প্রশাসনিক সিদ্ধান্তের প্রামাণ্য ও সত্যায়িত প্রজ্ঞাপন বোর্ড।"} /></p>
          </div>

          {/* 4 Architectural Stats Badges */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#1c3321]/80 backdrop-blur-xs border border-emerald-600/30 rounded-xl p-3.5 text-center shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-amber-300">
                {noticesData.length}
              </span>
              <span className="text-xs text-emerald-200 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="eih5y1c" fallback={"মোট প্রজ্ঞাপন"} /></span>
            </div>

            <div className="bg-[#1c3321]/80 backdrop-blur-xs border border-red-600/30 rounded-xl p-3.5 text-center shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-red-400">
                {pinnedNotices.length}
              </span>
              <span className="text-xs text-red-200 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e4tg5lv" fallback={"জরুরি নোটিশ"} /></span>
            </div>

            <div className="bg-[#1c3321]/80 backdrop-blur-xs border border-emerald-600/30 rounded-xl p-3.5 text-center shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-300">
                {noticesData.filter((n) => n.categoryKey === "admission").length}
              </span>
              <span className="text-xs text-emerald-200 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e1q4xu95" fallback={"ভর্তি সার্কুলার"} /></span>
            </div>

            <div className="bg-[#1c3321]/80 backdrop-blur-xs border border-sky-600/30 rounded-xl p-3.5 text-center shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-sky-300">
                {noticesData.filter((n) => n.categoryKey === "holiday").length}
              </span>
              <span className="text-xs text-sky-200 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e6pe4qn" fallback={"ছুটির পঞ্জিকা"} /></span>
            </div>
          </div>
        </div>

        {/* Live Marquee Ticker at the base */}
        <div className="bg-[#0e1a11] px-4 py-2 border-t border-emerald-900 flex items-center gap-3 text-xs">
          <span className="bg-[#8B111A] text-white px-2 py-0.5 rounded font-bold uppercase text-[10px] shrink-0"><EditableText document="copy.ui.NoticeBoardSection" entry="ex0eemt" fallback={"জরুরি খবর"} /></span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block text-amber-200"><EditableText document="copy.ui.NoticeBoardSection" entry="e1si9jjt" fallback={"📢 নতুন শিক্ষাবর্ষে নূরানী মক্তব, হিফজুল কুরআন ও কিতাব বিভাগে ছাত্র ভর্তি আবেদন চলছে ••• আল-হাইআতুল উলয়া ও বেফাক কেন্দ্রীয় পরীক্ষার ফরম পূরণ নির্ধারিত সময়ের মধ্যে সম্পন্ন করুন ••• ছাত্রাবাসের চতুর্থ তলা নির্মাণে আপনার সদকায়ে জারিয়া অব্যাহত রাখুন।"} /></div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ২। SPOTLIGHT BULLETIN: "আজকের বিশেষ বিজ্ঞপ্তি" (Parchment Featured Sheet)
      ===================================================================== */}
      {pinnedNotices.length > 0 && (
        <section className="relative rounded-2xl bg-gradient-to-r from-[#FAF6EE] via-[#FFFDF8] to-[#F5EEDC] p-6 sm:p-8 border-2 border-amber-700/30 shadow-xl overflow-hidden">
          {/* Subtle Watermark Seal */}
          <div className="absolute right-4 -bottom-6 pointer-events-none opacity-20 hidden md:block">
            <InstitutionalSeal />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <RubberStamp label="বিশেষ জরুরি সার্কুলার" color="red" rotate="-rotate-2" />
                <RubberStamp label="ভর্তি শিক্ষাবর্ষ ২০২৬" color="emerald" rotate="rotate-2" />
                <span className="text-xs font-mono text-gray-500 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="ecc0ohw" fallback={"স্মারক নং: "} />{pinnedNotices[0].memoNo}
                </span>
              </div>

              <h2
                onClick={() => setSelectedNotice(pinnedNotices[0])}
                className="text-lg sm:text-2xl font-black text-gray-900 hover:text-[#8B111A] transition-colors leading-snug cursor-pointer"
              >
                {pinnedNotices[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl">
                {pinnedNotices[0].summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
                <span className="flex items-center gap-1 font-semibold text-emerald-800">
                  <Calendar size={14} />
                  <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1s3gurt" fallback={"প্রকাশ: "} />{pinnedNotices[0].publishDateBn}</span>
                </span>
                {pinnedNotices[0].publishDateHijri && (
                  <span className="text-gray-500 font-medium"><EditableText document="copy.ui.NoticeBoardSection" entry="e76y7jv" fallback={"("} />{pinnedNotices[0].publishDateHijri}<EditableText document="copy.ui.NoticeBoardSection" entry="e18ch0av" fallback={")"} /></span>
                )}
                <span className="text-gray-400"><EditableText document="copy.ui.NoticeBoardSection" entry="e13qan8h" fallback={"•"} /></span>
                <span className="font-semibold text-gray-800"><EditableText document="copy.ui.NoticeBoardSection" entry="e15i8mfk" fallback={"স্বাক্ষর: "} />{pinnedNotices[0].signatory.name}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedNotice(pinnedNotices[0])}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#8B111A] hover:bg-[#6E0B13] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Eye size={16} />
                <span><EditableText document="copy.ui.NoticeBoardSection" entry="eaqs3nb" fallback={"পূর্ণ বিজ্ঞপ্তি পাঠ করুন"} /></span>
              </button>
              <a
                href="/download/admission-form.pdf"
                download
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Download size={16} />
                <span><EditableText document="copy.ui.NoticeBoardSection" entry="eptys03" fallback={"ভর্তি ফরম ডাউনলোড"} /></span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          ৩। BESPOKE INTERACTIVE CONTROLS BAR: Stamped Filters, Search & 3 Views
      ===================================================================== */}
      <section className="bg-[#FAF7F0] rounded-2xl border-2 border-stone-300/80 p-4 sm:p-6 shadow-sm space-y-4">
        {/* Rubber Stamp Filter Tabs */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
            <Stamp size={14} className="text-[#016332]" />
            <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1vpzlbi" fallback={"বিষয়ভিত্তিক সিলমোহর নির্বাচন করুন (ক্যাটাগরি ফিল্টার):"} /></span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categoriesList.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key as CategoryFilter)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 select-none border-2 shrink-0 ${
                    isActive
                      ? "bg-[#014222] text-white border-[#014222] shadow-md transform -translate-y-0.5"
                      : "bg-white text-stone-700 hover:bg-stone-100 border-stone-300 hover:border-stone-400"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-amber-400 text-stone-900" : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Toolbar: Search, Sort, and 3 Bespoke View Toggles */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-3 border-t border-stone-200">
          {/* Instant Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="স্মারক নং, বিষয়ের নাম বা কি-ওয়ার্ড লিখুন..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 focus:border-[#016332] rounded-xl outline-none shadow-2xs transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label="মুছে ফেলুন"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & 3 Unique View Modes */}
          <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold">
              <span className="hidden sm:inline"><EditableText document="copy.ui.NoticeBoardSection" entry="esu4lph" fallback={"ক্রমবিন্যাস:"} /></span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-stone-300 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 outline-none focus:border-[#016332] cursor-pointer shadow-2xs"
              >
                <option value="newest"><EditableText plain document="copy.ui.NoticeBoardSection" entry="e1aj97to" fallback={"সর্বশেষ আগে"} /></option>
                <option value="oldest"><EditableText plain document="copy.ui.NoticeBoardSection" entry="e1a5fk3e" fallback={"পুরাতন বিজ্ঞপ্তি"} /></option>
                <option value="urgent"><EditableText plain document="copy.ui.NoticeBoardSection" entry="e44vg0l" fallback={"জরুরি বিজ্ঞপ্তি আগে"} /></option>
              </select>
            </div>

            {/* 3 Unique Layout Switchers */}
            <div className="inline-flex items-center p-1 bg-stone-200 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setViewMode("pinboard")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "pinboard"
                    ? "bg-[#016332] text-white shadow-xs"
                    : "text-stone-700 hover:text-stone-900"
                }`}
                title="বিজ্ঞপ্তি প্রাচীর (পিনবোর্ড ভিউ)"
              >
                <Pin size={14} />
                <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1w5e8ge" fallback={"পিনবোর্ড প্রাচীর"} /></span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("gazette")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "gazette"
                    ? "bg-[#016332] text-white shadow-xs"
                    : "text-stone-700 hover:text-stone-900"
                }`}
                title="সরকারি গেজেট লেজার ভিউ"
              >
                <FileText size={14} />
                <span><EditableText document="copy.ui.NoticeBoardSection" entry="en7hiav" fallback={"গেজেট লেজার"} /></span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("timeline")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "timeline"
                    ? "bg-[#016332] text-white shadow-xs"
                    : "text-stone-700 hover:text-stone-900"
                }`}
                title="বাৎসরিক ক্যালেন্ডার টাইমলাইন"
              >
                <CalendarDays size={14} />
                <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1ocem77" fallback={"টাইমলাইন"} /></span>
              </button>
            </div>
          </div>
        </div>

        {/* Status text & reset button */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
          <span><EditableText document="copy.ui.NoticeBoardSection" entry="e8419oc" fallback={"সর্বমোট "} /><strong>{noticesData.length}</strong><EditableText document="copy.ui.NoticeBoardSection" entry="e4ogu0i" fallback={"টির মধ্যে"} />{" "}
            <strong className="text-emerald-800 font-bold">{filteredNotices.length}</strong><EditableText document="copy.ui.NoticeBoardSection" entry="eqzmsu4" fallback={"টি প্রজ্ঞাপন প্রদর্শিত"} /></span>
          {(activeCategory !== "all" || searchQuery !== "" || sortBy !== "newest") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#8B111A] hover:underline font-bold cursor-pointer"
            >
              <RotateCcw size={12} />
              <span><EditableText document="copy.ui.NoticeBoardSection" entry="eihg45y" fallback={"ফিল্টার রিসেট করুন"} /></span>
            </button>
          )}
        </div>
      </section>

      {/* =====================================================================
          ৪। 3 BESPOKE EXPERIENCES:
          View A: 📌 Pinned Bulletin Board Wall (কাঠের ফ্রেমে বাঁধানো পিনবোর্ড)
          View B: 📜 Imperial Gazette Ledger (সরকারি গেজেট রেজিস্টার)
          View C: 📅 Annual Academic & Holiday Timeline (বাৎসরিক টাইমলাইন)
      ===================================================================== */}
      {filteredNotices.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border-2 border-dashed border-stone-300 p-12 text-center space-y-3">
          <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto border-2 border-amber-200">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-lg font-bold text-stone-800"><EditableText document="copy.ui.NoticeBoardSection" entry="e1uujd6j" fallback={"কোনো প্রজ্ঞাপন পাওয়া যায়নি"} /></h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto"><EditableText document="copy.ui.NoticeBoardSection" entry="e1p6gzdb" fallback={"আপনার অনুসন্ধান &quot;"} />{searchQuery}<EditableText document="copy.ui.NoticeBoardSection" entry="e1n8gm0j" fallback={"&quot; বা নির্বাচিত ক্যাটাগরির সাথে কোনো নোটিশ মেলেনি।"} /></p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 bg-[#016332] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#014222] transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1c2n8tt" fallback={"সকল নোটিশ দেখুন"} /></span>
          </button>
        </div>
      ) : viewMode === "pinboard" ? (
        /* =================================================================
            VIEW A: 📌 PHYSICAL PINBOARD NOTICE WALL (বিজ্ঞপ্তি প্রাচীর)
            A realistic cork/felt bulletin board with wooden frame & pushpins
        ================================================================= */
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#231811] p-4 sm:p-7 shadow-2xl border-4 sm:border-8 border-[#3b271b]">
          {/* Inner Cork/Felt Texture Panel */}
          <div
            className="rounded-xl sm:rounded-2xl p-4 sm:p-8 relative min-h-[500px]"
            style={{
              backgroundColor: "#2a3d2e",
              backgroundImage: `radial-gradient(#1f2e22 15%, transparent 16%), radial-gradient(#1b291e 15%, transparent 16%)`,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
              boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            {/* Top Brass Plaque on the board */}
            <div className="text-center pb-6 sm:pb-8">
              <span className="inline-block bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-stone-950 font-black text-[11px] sm:text-xs px-6 py-1 rounded-sm shadow-md uppercase tracking-widest border border-amber-300"><EditableText document="copy.ui.NoticeBoardSection" entry="e1hucfi5" fallback={"★ জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা — কেন্দ্রীয় নোটিশ বোর্ড ★"} /></span>
            </div>

            {/* Pinned Paper Sheets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
              {filteredNotices.map((notice, idx) => {
                // Subtle rotation for organic tactile physical paper feel
                const rotations = ["-rotate-1", "rotate-1", "-rotate-0.5", "rotate-0.5"];
                const cardRotation = rotations[idx % rotations.length];
                const pinColor = notice.isUrgent ? "red" : idx % 2 === 0 ? "gold" : "green";

                return (
                  <article
                    key={notice.id}
                    className={`relative bg-[#FAF6EE] text-stone-900 rounded-sm sm:rounded p-5 sm:p-6 shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 transform ${cardRotation} hover:rotate-0 hover:scale-[1.02] hover:z-30 hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] group border-t-4 ${
                      notice.isUrgent ? "border-t-red-600" : "border-t-emerald-700"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(to bottom, #FFFDF8, #FAF4E6)`,
                    }}
                  >
                    {/* 3D Pushpin */}
                    <PushPin color={pinColor} />

                    {/* Paper Header: Rubber Stamps & Serial */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-b border-stone-200/90 pb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {notice.isUrgent ? (
                          <RubberStamp label="জরুরি প্রজ্ঞাপন" color="red" rotate="-rotate-3" />
                        ) : (
                          <RubberStamp
                            label={notice.category}
                            color={
                              notice.categoryKey === "admission"
                                ? "emerald"
                                : notice.categoryKey === "exam"
                                ? "purple"
                                : notice.categoryKey === "holiday"
                                ? "blue"
                                : "amber"
                            }
                            rotate="rotate-1"
                          />
                        )}
                      </div>

                      <span className="font-mono text-[10px] text-stone-500 font-bold"><EditableText document="copy.ui.NoticeBoardSection" entry="ee9o3sd" fallback={"#"} />{String(notice.id).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Notice Memo No */}
                    <div className="pt-3">
                      <p className="text-[11px] font-mono text-stone-500 font-medium tracking-tight"><EditableText document="copy.ui.NoticeBoardSection" entry="e4e4g5o" fallback={"স্মারক নং: "} />{notice.memoNo}
                      </p>
                    </div>

                    {/* Notice Title */}
                    <h3
                      onClick={() => setSelectedNotice(notice)}
                      className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-[#8B111A] transition-colors leading-snug pt-2 cursor-pointer"
                    >
                      {notice.title}
                    </h3>

                    {/* Summary snippet */}
                    <p className="text-xs text-stone-700 line-clamp-3 leading-relaxed pt-2">
                      {notice.summary}
                    </p>

                    {/* Paper Footer Strip: Date & Signature Stamp */}
                    <div className="mt-5 pt-3 border-t border-dashed border-stone-300 flex items-center justify-between gap-2 text-xs">
                      {/* Date Block */}
                      <div className="flex items-center gap-1 text-[11px] text-stone-600 font-semibold">
                        <Calendar size={13} className="text-[#016332] shrink-0" />
                        <span>{notice.publishDateBn}</span>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedNotice(notice)}
                        className="inline-flex items-center gap-1 bg-[#016332] hover:bg-[#8B111A] text-white text-xs font-bold px-3 py-1.5 rounded transition-colors shadow-xs cursor-pointer"
                      >
                        <Eye size={12} />
                        <span><EditableText document="copy.ui.NoticeBoardSection" entry="e14c83qy" fallback={"প্রজ্ঞাপন পাঠ"} /></span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : viewMode === "gazette" ? (
        /* =================================================================
            VIEW B: 📜 OFFICIAL IMPERIAL GAZETTE LEDGER (মহাফেজখানা রেজিস্টার)
            An official government/madrasa gazette book format
        ================================================================= */
        <div className="bg-[#FAF7F0] rounded-2xl border-2 border-stone-300 shadow-md overflow-hidden">
          {/* Gazette Volume Title Bar */}
          <div className="bg-gradient-to-r from-[#1c2e21] via-[#014222] to-[#1c2e21] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-600">
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-amber-400" />
              <div>
                <h3 className="font-bold text-sm sm:text-base"><EditableText document="copy.ui.NoticeBoardSection" entry="etrtfg1" fallback={"জামিয়া নেছারিয়া সরকারি প্রজ্ঞাপন রেজিস্টার ও গেজেট ভলিউম"} /></h3>
                <p className="text-xs text-emerald-200"><EditableText document="copy.ui.NoticeBoardSection" entry="e1tw3s9y" fallback={"নিবন্ধিত স্মারক নম্বর অনুযায়ী ক্রমান্বয়ে সাজানো প্রাতিষ্ঠানিক মহাফেজখানা"} /></p>
              </div>
            </div>

            <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full border border-white/20 text-amber-200"><EditableText document="copy.ui.NoticeBoardSection" entry="ed97jaq" fallback={"ভলিউম: ২০২৬ খ্রি. / ১৪৪৭-৪৮ হিজরি"} /></span>
          </div>

          {/* Gazette Entries List */}
          <div className="divide-y divide-stone-200">
            {filteredNotices.map((notice, idx) => (
              <div
                key={notice.id}
                className="p-5 sm:p-6 hover:bg-emerald-50/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Left: Date Stamp Block */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Visual Calendar Block */}
                  <div className="w-14 sm:w-16 rounded-xl bg-white border-2 border-stone-300 text-center overflow-hidden shrink-0 shadow-xs">
                    <div className="bg-[#8B111A] text-white text-[10px] font-bold py-0.5 tracking-wider uppercase">
                      {notice.publishDateEn.split(" ")[1]}
                    </div>
                    <div className="py-1 font-black text-lg sm:text-xl text-stone-900 leading-none">
                      {notice.publishDateBn.split(" ")[0]}
                    </div>
                    <div className="text-[9px] text-stone-500 font-semibold pb-1">
                      {notice.publishDateBn.split(" ")[1]}
                    </div>
                  </div>

                  {/* Notice Details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded"><EditableText document="copy.ui.NoticeBoardSection" entry="e13njdd6" fallback={"স্মারক: "} />{notice.memoNo}
                      </span>
                      <RubberStamp label={notice.category} color="emerald" rotate="rotate-0" />
                      {notice.isUrgent && (
                        <RubberStamp label="জরুরি" color="red" rotate="rotate-0" />
                      )}
                    </div>

                    <h4
                      onClick={() => setSelectedNotice(notice)}
                      className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-[#8B111A] transition-colors leading-snug cursor-pointer"
                    >
                      {notice.title}
                    </h4>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {notice.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 pt-1">
                      <span><EditableText document="copy.ui.NoticeBoardSection" entry="e17rve0b" fallback={"স্বাক্ষরকারী: "} />{notice.signatory.name}<EditableText document="copy.ui.NoticeBoardSection" entry="e1829tay" fallback={" ("} />{notice.signatory.designation}<EditableText document="copy.ui.NoticeBoardSection" entry="e43rvwz" fallback={")"} /></span>
                      {notice.publishDateHijri && (
                        <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1ycwvd4" fallback={"• হিজরি: "} />{notice.publishDateHijri}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(notice.id)}
                    className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
                    title="লিংক কপি করুন"
                  >
                    <Share2 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedNotice(notice)}
                    className="inline-flex items-center gap-1.5 bg-[#014222] hover:bg-[#8B111A] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Eye size={14} />
                    <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1jy6lue" fallback={"গেজেট পাঠ করুন"} /></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* =================================================================
            VIEW C: 📅 ANNUAL ACADEMIC & HOLIDAY TIMELINE (বাৎসরিক টাইমলাইন)
            A visual roadmap of all academic events, exams, and vacations
        ================================================================= */
        <div className="bg-[#FAF7F0] rounded-2xl border-2 border-stone-300 p-6 sm:p-10 shadow-md space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1 pb-4 border-b border-stone-200">
            <h3 className="text-lg sm:text-xl font-black text-stone-900"><EditableText document="copy.ui.NoticeBoardSection" entry="eavoish" fallback={"বাৎসরিক শিক্ষাবর্ষ ও নোটিশ টাইমলাইন"} /></h3>
            <p className="text-xs text-stone-600"><EditableText document="copy.ui.NoticeBoardSection" entry="e4dh0we" fallback={"ভর্তি, পরীক্ষা, ছুটির ঘোষণা ও একাডেমিক সেশনের সময়ানুক্রমিক তালিকা"} /></p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#016332] space-y-8 max-w-3xl mx-auto">
            {filteredNotices.map((notice, idx) => (
              <div key={notice.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#016332] group-hover:border-[#8B111A] group-hover:scale-125 transition-all shadow-sm" />

                {/* Timeline Card */}
                <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white bg-[#016332] px-2.5 py-0.5 rounded-full">
                      {notice.publishDateBn}
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      {notice.memoNo}
                    </span>
                  </div>

                  <h4
                    onClick={() => setSelectedNotice(notice)}
                    className="text-base font-bold text-stone-900 group-hover:text-[#8B111A] transition-colors leading-snug cursor-pointer"
                  >
                    {notice.title}
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {notice.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e12ezhfs" fallback={"ক্যাটাগরি: "} />{notice.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedNotice(notice)}
                      className="text-xs font-bold text-[#8B111A] hover:text-[#016332] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1jkzj8m" fallback={"বিস্তারিত দেখুন"} /></span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          ৫। DOWNLOAD CORNER: Architectural Form & Resource Chest (মহাফেজখানা সংকলন)
      ===================================================================== */}
      <section className="bg-gradient-to-br from-[#1a2e20] to-[#0d1710] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-amber-600/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ArrowDownToLine className="text-amber-400" size={22} />
              <h2 className="text-lg sm:text-xl font-bold"><EditableText document="copy.ui.NoticeBoardSection" entry="e12i5oo8" fallback={"মহাফেজখানা ডাউনলোড কর্নার ও প্রয়োজনীয় ফরম"} /></h2>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200"><EditableText document="copy.ui.NoticeBoardSection" entry="e1x6ruj5" fallback={"অফিশিয়াল ভর্তি আবেদন ফরম, বাৎসরিক ছুটির ক্যালেন্ডার ও শিক্ষাক্রম সিলেবাসের প্রামাণ্য কপি"} /></p>
          </div>
          <Link
            href="/admission"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
          >
            <span><EditableText document="copy.ui.NoticeBoardSection" entry="eex2x12" fallback={"ভর্তি প্রক্রিয়া সম্পর্কে বিস্তারিত"} /></span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-[#243c2b] rounded-xl p-4 border border-emerald-700/50 hover:border-amber-400 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-900/80 text-amber-300 flex items-center justify-center border border-emerald-600">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-bold text-sm text-white"><EditableText document="copy.ui.NoticeBoardSection" entry="e1ctfd3t" fallback={"ভর্তি আবেদন ফরম ২০২৬"} /></h4>
              <p className="text-xs text-emerald-200"><EditableText document="copy.ui.NoticeBoardSection" entry="emukqu9" fallback={"মক্তব, হিফজ ও কিতাব বিভাগের মূল আবেদনপত্র"} /></p>
            </div>
            <a
              href="/download/admission-form.pdf"
              download
              className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              <Download size={13} />
              <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1d57e49" fallback={"ফরম ডাউনলোড (PDF)"} /></span>
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-[#243c2b] rounded-xl p-4 border border-emerald-700/50 hover:border-amber-400 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-900/80 text-sky-300 flex items-center justify-center border border-emerald-600">
                <Calendar size={20} />
              </div>
              <h4 className="font-bold text-sm text-white"><EditableText document="copy.ui.NoticeBoardSection" entry="e1x7ms6i" fallback={"বাৎসরিক ছুটির পঞ্জিকা"} /></h4>
              <p className="text-xs text-emerald-200"><EditableText document="copy.ui.NoticeBoardSection" entry="e1rtk029" fallback={"রমজান, ঈদ ও বাৎসরিক সকল ছুটির প্রজ্ঞাপন"} /></p>
            </div>
            <a
              href="/functions/holiday"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              <Eye size={13} />
              <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1v50sm4" fallback={"ছুটির তালিকা দেখুন"} /></span>
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-[#243c2b] rounded-xl p-4 border border-emerald-700/50 hover:border-amber-400 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-900/80 text-purple-300 flex items-center justify-center border border-emerald-600">
                <Clock size={20} />
              </div>
              <h4 className="font-bold text-sm text-white"><EditableText document="copy.ui.NoticeBoardSection" entry="eqel4n6" fallback={"দৈনিক তালীমি রুটিন"} /></h4>
              <p className="text-xs text-emerald-200"><EditableText document="copy.ui.NoticeBoardSection" entry="e1rcs4ja" fallback={"তাহাজ্জুদ, ফজর, ক্লাসের ঘণ্টা ও রাতের তাকরার"} /></p>
            </div>
            <a
              href="/functions/class-routine"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              <Eye size={13} />
              <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1vjukr3" fallback={"রুটিন দেখুন"} /></span>
            </a>
          </div>

          {/* Card 4 */}
          <div className="bg-[#243c2b] rounded-xl p-4 border border-emerald-700/50 hover:border-amber-400 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-900/80 text-amber-300 flex items-center justify-center border border-emerald-600">
                <BookOpen size={20} />
              </div>
              <h4 className="font-bold text-sm text-white"><EditableText document="copy.ui.NoticeBoardSection" entry="ej199s5" fallback={"জামিয়ার পূর্ণাঙ্গ প্রসপেক্টাস"} /></h4>
              <p className="text-xs text-emerald-200"><EditableText document="copy.ui.NoticeBoardSection" entry="e15wefzp" fallback={"ইতিহাস, দেওবন্দি পাঠ্যক্রম ও বোর্ডিং নীতিমালা"} /></p>
            </div>
            <a
              href="/academics"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              <BookOpen size={13} />
              <span><EditableText document="copy.ui.NoticeBoardSection" entry="e9cgerk" fallback={"প্রসপেক্টাস পাঠ করুন"} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৬। NOTICE HELPDESK & EMERGENCY INQUIRY
      ===================================================================== */}
      <section className="bg-gradient-to-r from-[#2b180d] via-[#4a2b18] to-[#2b180d] text-white rounded-2xl p-5 sm:p-7 shadow-lg border-2 border-amber-600/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="text-amber-400" size={20} />
              <h3 className="text-base sm:text-lg font-bold"><EditableText document="copy.ui.NoticeBoardSection" entry="e1mnzvea" fallback={"বিজ্ঞপ্তি বা কোনো প্রজ্ঞাপন সংক্রান্ত জরুরি তথ্য সহায়তা"} /></h3>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90"><EditableText document="copy.ui.NoticeBoardSection" entry="e19o607q" fallback={"ভর্তি, কেন্দ্রীয় পরীক্ষা বা যে কোনো প্রজ্ঞাপন সম্পর্কে অনুসন্ধানের জন্য সরাসরি মাদরাসা অফিসে যোগাযোগ করুন।"} /></p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${stegaClean(siteSettings.phone)}`}
              className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#a81b26] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors border border-amber-400/40"
            >
              <Phone size={15} />
              <span>{siteSettings.phone}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-colors"
            >
              <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1xpqbvz" fallback={"সরাসরি ঠিকানা ও যোগাযোগ"} /></span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৭। BESPOKE OFFICIAL MEMORANDUM MODAL (অফিশিয়াল প্রজ্ঞাপন ভিউয়ার ও প্রিন্ট মোড)
          Complete with Circular Seal, Rubber Stamps, Letterhead & Print Engine
      ===================================================================== */}
      {selectedNotice && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF7F0] text-stone-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border-4 border-[#2b180d] my-auto"
          >
            {/* Modal Top Control Bar */}
            <div className="bg-[#1b2b1d] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b-2 border-amber-600 shrink-0">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-amber-300" />
                <span className="font-bold text-sm sm:text-base"><EditableText document="copy.ui.NoticeBoardSection" entry="e42e3k4" fallback={"জামিয়া নেছারিয়া অফিশিয়াল প্রজ্ঞাপন"} /></span>
                {selectedNotice.isUrgent && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1"><EditableText document="copy.ui.NoticeBoardSection" entry="e1nmeg0c" fallback={"জরুরি"} /></span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-lg transition-colors cursor-pointer border border-white/20"
                  title="প্রিন্ট করুন"
                >
                  <Printer size={14} />
                  <span className="hidden sm:inline font-bold"><EditableText document="copy.ui.NoticeBoardSection" entry="e97tl96" fallback={"প্রিন্ট"} /></span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(null)}
                  className="text-stone-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="বন্ধ করুন"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body: Styled like Official Madrasa Letterhead */}
            <div
              id="printable-notice-content"
              className="p-6 sm:p-10 overflow-y-auto space-y-6 flex-1 bg-[#FFFDF9] relative"
            >
              {/* Subtle background seal in modal */}
              <div className="absolute right-6 top-32 pointer-events-none opacity-15">
                <InstitutionalSeal />
              </div>

              {/* Formal Institutional Letterhead */}
              <div className="text-center space-y-2 border-b-2 border-[#016332] pb-5">
                <p className="font-serif text-sm text-stone-600 tracking-widest font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e1ytisqs" fallback={"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"} /></p>
                <h2 className="text-xl sm:text-2xl font-black text-[#014222] tracking-tight">
                  {siteSettings.nameBn}
                </h2>
                <p className="text-xs sm:text-sm font-arabic text-stone-700">
                  {siteSettings.nameAr}
                </p>
                <p className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
                  {siteSettings.nameEn}
                </p>
                <p className="text-xs text-stone-600">
                  {siteSettings.address}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-stone-600 pt-1">
                  <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e1hghioc" fallback={"সমাজসেবা রেজি: "} />{siteSettings.regNo}
                  </span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e9esyi7" fallback={"বেফাক রেজি: "} />{siteSettings.befaqRegNo}
                  </span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e1dr014r" fallback={"হাইআতুল উলয়া রেজি: "} />{siteSettings.haiatulUlyaRegNo}
                  </span>
                </div>
              </div>

              {/* Memo & Date Meta Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-700 border-b border-stone-200 pb-3">
                <div>
                  <span className="font-bold text-stone-900"><EditableText document="copy.ui.NoticeBoardSection" entry="e12lb1aj" fallback={"স্মারক নং: "} /></span>
                  <span className="font-mono font-bold text-emerald-900">{selectedNotice.memoNo}</span>
                </div>
                <div className="space-y-0.5 sm:text-right">
                  <div>
                    <span className="font-bold text-stone-900"><EditableText document="copy.ui.NoticeBoardSection" entry="e1y4ya1o" fallback={"তারিখ: "} /></span>
                    <span>{selectedNotice.publishDateBn}</span>
                  </div>
                  {selectedNotice.publishDateHijri && (
                    <div className="text-[11px] text-stone-500"><EditableText document="copy.ui.NoticeBoardSection" entry="eiwobmw" fallback={"হিজরি: "} />{selectedNotice.publishDateHijri}
                    </div>
                  )}
                </div>
              </div>

              {/* Notice Title Header Banner */}
              <div className="text-center space-y-2 py-1">
                <span className="inline-block bg-[#8B111A] text-white text-xs font-bold px-4 py-1 rounded-sm tracking-wider uppercase shadow-2xs">
                  {selectedNotice.category}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-stone-900 leading-snug pt-1">
                  {selectedNotice.title}
                </h3>
              </div>

              {/* Paragraphs of Notice Details */}
              <div className="space-y-3.5 text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
                {selectedNotice.details.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Numbered Instructions / Directives */}
              {selectedNotice.instructions && selectedNotice.instructions.length > 0 && (
                <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-4 sm:p-5 space-y-2.5">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-[#8B111A] rounded-xs inline-block" />
                    <span><EditableText document="copy.ui.NoticeBoardSection" entry="e15d1er7" fallback={"বিশেষ নির্দেশনা ও অনুসরণীয় নিয়মাবলি:"} /></span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {selectedNotice.instructions.map((ins, iIdx) => (
                      <li key={iIdx} className="leading-relaxed pl-1">
                        {ins}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Attachments Section if any */}
              {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                <div className="border border-stone-200 rounded-xl p-3.5 space-y-2 bg-stone-50/70">
                  <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1">
                    <Download size={13} className="text-[#016332]" />
                    <span><EditableText document="copy.ui.NoticeBoardSection" entry="e1l3d6r2" fallback={"সংযুক্তি / সংশ্লিষ্ট ফাইলসমূহ:"} /></span>
                  </h4>
                  <div className="space-y-1.5">
                    {selectedNotice.attachments.map((att, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-center justify-between p-2 rounded bg-white border border-stone-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText size={15} className="text-red-700 shrink-0" />
                          <span className="font-semibold text-stone-800">{att.name}</span>
                          {att.size && <span className="text-stone-400"><EditableText document="copy.ui.NoticeBoardSection" entry="ei0enkl" fallback={"("} />{att.size}<EditableText document="copy.ui.NoticeBoardSection" entry="ehqi7dl" fallback={")"} /></span>}
                        </div>
                        <a
                          href={att.url}
                          download
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#016332] hover:text-[#014222] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200"
                        >
                          <Download size={11} />
                          <span><EditableText document="copy.ui.NoticeBoardSection" entry="ecw7yru" fallback={"ডাউনলোড"} /></span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Seal & Signatory Block */}
              <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                {/* Circular Seal stamp */}
                <div className="hidden sm:block">
                  <InstitutionalSeal />
                </div>

                {/* Signatory Text */}
                <div className="text-center sm:text-right space-y-1 min-w-[200px] ml-auto">
                  <div className="h-9 flex items-center justify-center sm:justify-end">
                    <span className="text-xs font-serif italic text-emerald-800 font-bold border-b border-dashed border-stone-400 pb-0.5"><EditableText document="copy.ui.NoticeBoardSection" entry="e1fgnsol" fallback={"(স্বাক্ষরিত ও সত্যায়িত)"} /></span>
                  </div>
                  <p className="font-black text-sm text-stone-900">
                    {selectedNotice.signatory.name}
                  </p>
                  <p className="text-xs text-stone-600 font-semibold">
                    {selectedNotice.signatory.designation}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    {selectedNotice.signatory.institution}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="bg-stone-100 px-4 sm:px-6 py-3 border-t border-stone-300 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(selectedNotice.id)}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-stone-300 shadow-2xs transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check size={14} className="text-emerald-600" />
                      <span className="text-emerald-700"><EditableText document="copy.ui.NoticeBoardSection" entry="e1136l1l" fallback={"লিংক কপি হয়েছে!"} /></span>
                    </>
                  ) : (
                    <>
                      <Share2 size={13} />
                      <span><EditableText document="copy.ui.NoticeBoardSection" entry="e105lq4h" fallback={"লিংক শেয়ার করুন"} /></span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-stone-300 shadow-2xs transition-colors cursor-pointer"
                >
                  <Printer size={13} />
                  <span><EditableText document="copy.ui.NoticeBoardSection" entry="ee4hele" fallback={"প্রিন্ট করুন"} /></span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedNotice(null)}
                  className="bg-stone-300 hover:bg-stone-400 text-stone-800 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                ><EditableText document="copy.ui.NoticeBoardSection" entry="e15aw79m" fallback={"বন্ধ করুন"} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoticeBoardRoute({ initialNotices }: { initialNotices?: NoticeFullItem[] }) { const params = useSearchParams(); return <NoticeBoardContent key={params.toString()} initialNotices={initialNotices} />; }

export default function NoticeBoardSection({
  initialNotices,
}: {
  initialNotices?: NoticeFullItem[];
} = {}) {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FAF7F0] rounded-2xl border-2 border-stone-300 p-12 text-center text-stone-500 space-y-3">
          <div className="w-10 h-10 border-4 border-[#016332] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold"><EditableText document="copy.ui.NoticeBoardSection" entry="e1mot5a0" fallback={"বিজ্ঞপ্তি প্রাচীর ও মহাফেজখানা লোড হচ্ছে..."} /></p>
        </div>
      }
    >
      <NoticeBoardRoute initialNotices={initialNotices} />
    </Suspense>
  );
}
