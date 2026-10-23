"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Phone,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Calculator,
  Award,
  Heart,
  Check,
  Printer,
  ClipboardList,
  Coins,
  X,
  MapPin,
  Download,
  AlertCircle,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
  PhoneCall,
  Copy,
  CheckCheck,
} from "lucide-react";
import { officialAdmissionData, type OfficialAdmissionInfo } from "@/data/admissionData";

interface AdmissionInfoSectionProps {
  initialAdmissionData?: any;
}

type TabKey =
  | "overview"
  | "departments"
  | "process"
  | "documents"
  | "fees"
  | "contact"
  | "full";

export default function AdmissionInfoSection({
  initialAdmissionData,
}: AdmissionInfoSectionProps) {
  // Merge CMS data if available with official static data
  const data: OfficialAdmissionInfo = {
    ...officialAdmissionData,
    sessionName: initialAdmissionData?.sessionName || officialAdmissionData.sessionName,
    hijriYear: initialAdmissionData?.hijriYear || officialAdmissionData.hijriYear,
    status: initialAdmissionData?.status || officialAdmissionData.status,
    overview: initialAdmissionData?.overview || officialAdmissionData.overview,
    timelines: {
      arabic:
        initialAdmissionData?.arabicTimeline || officialAdmissionData.timelines.arabic,
      english:
        initialAdmissionData?.englishTimeline || officialAdmissionData.timelines.english,
    },
    examInfo: {
      method: initialAdmissionData?.examMethod || officialAdmissionData.examInfo.method,
      resultPublish:
        initialAdmissionData?.examResultPublish ||
        officialAdmissionData.examInfo.resultPublish,
    },
    orphanFacility: {
      ...officialAdmissionData.orphanFacility,
      description:
        initialAdmissionData?.orphanPolicy ||
        officialAdmissionData.orphanFacility.description,
      verificationConditions:
        Array.isArray(initialAdmissionData?.orphanConditions) &&
        initialAdmissionData.orphanConditions.length > 0
          ? initialAdmissionData.orphanConditions
          : officialAdmissionData.orphanFacility.verificationConditions,
    },
    guardianGuidelines:
      Array.isArray(initialAdmissionData?.guardianGuidelines) &&
      initialAdmissionData.guardianGuidelines.length > 0
        ? initialAdmissionData.guardianGuidelines
        : officialAdmissionData.guardianGuidelines,
    admissionProcess: {
      ...officialAdmissionData.admissionProcess,
      pdfDownloadUrl:
        initialAdmissionData?.admissionFormPdfUrl ||
        officialAdmissionData.admissionProcess.pdfDownloadUrl,
    },
  };

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedDeptId, setSelectedDeptId] = useState<string>("maktab");

  // Fee Calculator State
  const [calcStudentType, setCalcStudentType] = useState<"new" | "old">("new");
  const [calcDeptId, setCalcDeptId] = useState<string>("maktab-non-res");
  const [includeBreakfast, setIncludeBreakfast] = useState<boolean>(false);
  const [includeOneTimeTwoMeals, setIncludeOneTimeTwoMeals] = useState<boolean>(false);

  // Document Checklist state
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});

  // Form Modal State
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Sync tab with URL hash if present and scroll smoothly
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (!hash) return;
      let matchedTab: TabKey | null = null;
      if (hash.includes("fee") || hash.includes("cost") || hash.includes("khoroch") || hash.includes("calculator")) {
        matchedTab = "fees";
      } else if (
        hash.includes("dept") ||
        hash.includes("department") ||
        hash.includes("bibhag") ||
        hash.includes("age") ||
        hash.includes("checker")
      ) {
        matchedTab = "departments";
      } else if (
        hash.includes("process") ||
        hash.includes("step") ||
        hash.includes("exam")
      ) {
        matchedTab = "process";
      } else if (
        hash.includes("doc") ||
        hash.includes("orphan") ||
        hash.includes("etim") ||
        hash.includes("checklist")
      ) {
        matchedTab = "documents";
      } else if (
        hash.includes("contact") ||
        hash.includes("phone") ||
        hash.includes("help")
      ) {
        matchedTab = "contact";
      } else if (hash.includes("all") || hash.includes("full")) {
        matchedTab = "full";
      }

      if (matchedTab) {
        setActiveTab(matchedTab);
        setTimeout(() => {
          const rawId = window.location.hash.replace(/^#/, "");
          const el = document.getElementById(rawId) || document.getElementById("admission-content-area");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 60);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const toggleDoc = (idx: number) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const goToTab = (key: TabKey) => {
    setActiveTab(key);
    if (typeof window !== "undefined") {
      const contentEl = document.getElementById("admission-content-area");
      if (contentEl) {
        contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleCopyPhone = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Fee Calculator Computation
  const activeFeeCategory =
    calcStudentType === "new"
      ? data.admissionFees.newStudents
      : data.admissionFees.oldStudents;

  const selectedMonthlyDept =
    data.monthlyExpenses.find((d) => d.id === calcDeptId) || data.monthlyExpenses[0];

  const breakfastCost = includeBreakfast ? 1000 : 0;
  const oneTimeMealCost = includeOneTimeTwoMeals ? 2000 : 0;

  const totalMonthlyFee = selectedMonthlyDept.total + breakfastCost;
  const totalAdmissionFee = activeFeeCategory.total + oneTimeMealCost;
  const grandFirstMonthTotal = totalAdmissionFee + totalMonthlyFee;

  const tabs: { key: TabKey; label: string; icon: any; sectionNo: string }[] = [
    {
      key: "overview",
      label: "ভর্তি কার্যক্রম ও সময়সূচি",
      icon: Calendar,
      sectionNo: "১ ও ২",
    },
    {
      key: "departments",
      label: "বিভাগ ও ভর্তির যোগ্যতা",
      icon: BookOpen,
      sectionNo: "৩",
    },
    {
      key: "process",
      label: "ভর্তি পরীক্ষা ও প্রক্রিয়া",
      icon: ClipboardList,
      sectionNo: "৪ ও ৫",
    },
    {
      key: "documents",
      label: "কাগজপত্র ও এতিমদের সুবিধা",
      icon: Heart,
      sectionNo: "৬ ও ৭",
    },
    {
      key: "fees",
      label: "ভর্তি ফি ও মাসিক খরচ",
      icon: Coins,
      sectionNo: "৮ ও ৯",
    },
    {
      key: "contact",
      label: "যোগাযোগ ও বিশেষ নির্দেশনা",
      icon: Phone,
      sectionNo: "১০ ও ১১",
    },
    {
      key: "full",
      label: "একনজরে পূর্ণ বিবরণী (সব ধারা)",
      icon: Layers,
      sectionNo: "১-১১",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* =====================================================================
          1. INSTITUTIONAL HERO BANNER (Bold Islamic Green, Gold Border)
      ===================================================================== */}
      <div className="rounded-3xl bg-linear-to-br from-[#014020] via-[#014d26] to-[#032e18] text-white p-6 sm:p-8 md:p-10 shadow-xl border-b-6 border-[#D9822B] relative overflow-hidden">
        {/* Subtle Islamic Decorative Background Pattern Accent */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top Status & Accreditation Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-[#8B111A] text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full border-2 border-amber-300 inline-flex items-center gap-2 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{data.statusText} ({data.sessionName})</span>
            </span>

            <span className="text-amber-200 font-bold text-xs bg-black/40 px-3 py-1.5 rounded-full border border-amber-300/40">
              হিজরি সেশন: {data.hijriYear}
            </span>

            <span className="text-emerald-100 font-bold text-xs bg-emerald-900/80 px-3 py-1.5 rounded-full border border-emerald-500/50">
              সমাজসেবা ও বেফাক নিবন্ধিত
            </span>

            <span className="text-amber-300 font-arabic text-sm sm:text-base font-bold ml-auto hidden md:inline">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>

          {/* Institution Header & Identity */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-black tracking-wide uppercase">
              <Sparkles size={16} />
              <span>{data.slogan}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              ভর্তি তথ্য ও ভর্তি নির্দেশিকা
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base md:text-lg text-emerald-100 font-bold">
              <span>{data.institutionName}</span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-amber-200">
                <MapPin size={16} className="text-amber-300 shrink-0" />
                <span>{data.address}</span>
              </span>
            </div>
          </div>

          {/* Key Quick Highlight Chips */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="bg-black/30 backdrop-blur-xs border border-white/15 p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-amber-300 uppercase">ভর্তির সময়সীমা</div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5">৮–১৫ শাওয়াল</div>
              <div className="text-[11px] text-emerald-200 font-medium">ইংরেজি: ১–১৫ জানুয়ারি</div>
            </div>

            <div className="bg-black/30 backdrop-blur-xs border border-white/15 p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-amber-300 uppercase">ভর্তি পরীক্ষা</div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5">মৌখিক পরীক্ষা</div>
              <div className="text-[11px] text-emerald-200 font-medium">ফলাফল প্রতিদিন প্রকাশ</div>
            </div>

            <div className="bg-black/30 backdrop-blur-xs border border-white/15 p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-amber-300 uppercase">নতুন ছাত্র ভর্তি ফি</div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5">৳ ৩,৫০০ টাকা</div>
              <div className="text-[11px] text-emerald-200 font-medium">পুরাতন ছাত্র: ৩,২০০ টাকা</div>
            </div>

            <div className="bg-black/30 backdrop-blur-xs border border-white/15 p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-amber-300 uppercase">এতিম ও অসহায় কোটা</div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5">১০০% ফ্রি সুবিধা</div>
              <div className="text-[11px] text-emerald-200 font-medium">থাকা, খাওয়া ও পড়াশোনা</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-sm sm:text-base font-black px-5 py-3 rounded-xl border-2 border-amber-300 shadow-lg transition-all hover:scale-105"
            >
              <GraduationCap size={18} className="text-amber-300" />
              <span>অনলাইনে ভর্তি আবেদন শুরু করুন</span>
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={() => setShowFormModal(true)}
              className="inline-flex items-center gap-2 bg-white text-[#014d26] hover:bg-amber-50 text-sm sm:text-base font-black px-4 py-3 rounded-xl border-2 border-amber-400 shadow-md transition-colors"
            >
              <Download size={18} className="text-[#8B111A]" />
              <span>ভর্তি ফরম ডাউনলোড (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("fees")}
              className="inline-flex items-center gap-2 bg-[#D9822B] hover:bg-[#c27122] text-black text-sm sm:text-base font-black px-4 py-3 rounded-xl border-2 border-amber-200 shadow-sm transition-colors"
            >
              <Calculator size={17} />
              <span>ভর্তি ফি হিসাব করুন</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("contact")}
              className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white text-sm sm:text-base font-black px-4 py-3 rounded-xl border border-white/30 transition-colors"
            >
              <PhoneCall size={17} className="text-emerald-300" />
              <span>জরুরি যোগাযোগ</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. ACCESSIBLE RESPONSIVE NAVIGATION BAR (Optimized for PC, Tab, Phone)
      ===================================================================== */}
      <nav
        aria-label="ভর্তি তথ্য ধারা নির্দেশক মেনু"
        className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border-2 border-gray-300 lg:sticky lg:top-14 z-20"
      >
        {/* Mobile Header: Displays Current Section & Instruction */}
        <div className="flex sm:hidden items-center justify-between pb-2 mb-2.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black bg-[#014d26] text-amber-300 px-2.5 py-0.5 rounded-md">
              ধারা {tabs.find((t) => t.key === activeTab)?.sectionNo}
            </span>
            <span className="text-xs font-black text-gray-950 truncate max-w-[200px]">
              {tabs.find((t) => t.key === activeTab)?.label}
            </span>
          </div>
          <span className="text-[10px] font-bold text-gray-500">
            ৭টি বিষয়ভিত্তিক ধাপ
          </span>
        </div>

        {/* Responsive Grid:
            - Mobile (default): 2 columns (7th item spans full width)
            - Small Tablet (sm: 640px): 3 columns
            - Medium Tablet (md: 768px): 4 columns
            - PC / Laptop (lg / xl): 7 columns in 1 perfectly balanced row
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const isFullView = tab.key === "full";

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                  // Scroll smoothly to content area on mobile/tablet
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    const contentEl = document.getElementById("admission-content-area");
                    if (contentEl) {
                      contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                className={`group text-left p-2.5 sm:p-3 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isFullView
                    ? "col-span-2 sm:col-span-3 md:col-span-2 lg:col-span-1"
                    : "col-span-1"
                } ${
                  isActive
                    ? "bg-[#014d26] text-white border-[#D9822B] shadow-md ring-2 ring-emerald-300/40"
                    : isFullView
                    ? "bg-amber-50 hover:bg-amber-100 text-gray-950 border-amber-300"
                    : "bg-gray-50 hover:bg-emerald-50/60 text-gray-900 border-gray-300 hover:border-emerald-400"
                }`}
              >
                {/* Top Row: Section Badge + Icon */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-amber-400 text-black shadow-xs"
                        : isFullView
                        ? "bg-amber-200 text-amber-950 font-black"
                        : "bg-emerald-100 text-[#014d26] group-hover:bg-emerald-200"
                    }`}
                  >
                    {tab.sectionNo}
                  </span>

                  <Icon
                    size={16}
                    className={`transition-colors shrink-0 ${
                      isActive
                        ? "text-amber-300"
                        : isFullView
                        ? "text-[#8B111A]"
                        : "text-[#014d26] group-hover:text-emerald-700"
                    }`}
                  />
                </div>

                {/* Bottom Row: Tab Label */}
                <div
                  className={`mt-2 font-black text-xs sm:text-[13px] lg:text-[11px] xl:text-xs leading-snug line-clamp-2 ${
                    isActive ? "text-white" : "text-gray-950"
                  }`}
                >
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* =====================================================================
          3. MAIN TAB CONTENT AREA
      ===================================================================== */}
      <div
        id="admission-content-area"
        className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border-2 border-gray-300 min-h-[500px]"
      >
        {/* =================================================================
            TAB 1: ১. ভর্তি কার্যক্রম ও ২. ভর্তির সময়সীমা
        ================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#014d26] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  ধারা ১ ও ২ • প্রাতিষ্ঠানিক প্রজ্ঞাপন
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 mt-1.5">
                  ভর্তি কার্যক্রম ও নির্ধারিত সময়সীমা
                </h2>
                <p className="text-sm font-bold text-gray-700 mt-0.5">
                  শিক্ষাবর্ষ: {data.sessionName} | হিজরি: {data.hijriYear}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(true)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-white bg-[#8B111A] hover:bg-[#6e0b13] px-4 py-2.5 rounded-xl border border-amber-300 shadow-xs transition-colors"
                >
                  <Download size={15} />
                  <span>ভর্তি ফরম (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-2.5 rounded-xl border border-gray-300 transition-colors"
                >
                  <Printer size={15} />
                  <span className="hidden sm:inline">প্রিন্ট</span>
                </button>
              </div>
            </div>

            {/* ১. ভর্তি কার্যক্রম */}
            <div className="space-y-3 bg-[#f8faf8] p-5 sm:p-7 rounded-2xl border-2 border-emerald-200">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#014d26] text-amber-300 font-black text-sm flex items-center justify-center">
                  ১
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#014d26]">
                  ভর্তি কার্যক্রম
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed font-medium pl-1 sm:pl-10">
                {data.overview}
              </p>
            </div>

            {/* ২. ভর্তির সময়সীমা */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#8B111A] text-white font-black text-sm flex items-center justify-center">
                  ২
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-950">
                  ভর্তির সময়সীমা
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-0 sm:pl-10">
                {/* Arabic Timeline Card */}
                <div className="bg-emerald-50/70 border-2 border-emerald-400 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#014d26] bg-emerald-200 px-3 py-1 rounded-full uppercase">
                      আরবি শিক্ষাবর্ষ
                    </span>
                    <Calendar size={20} className="text-[#014d26]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-gray-950">
                    আরবি বর্ষের ভর্তি সময়সীমা
                  </h4>
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-300 text-sm sm:text-base font-black text-[#014d26]">
                    {data.timelines.arabic}
                  </div>
                  <p className="text-xs text-gray-700 font-semibold">
                    * কওমী মাদরাসা শিক্ষাবোর্ড বেফাকের বার্ষিক ক্যালেন্ডার অনুযায়ী নির্ধারিত।
                  </p>
                </div>

                {/* English Timeline Card */}
                <div className="bg-amber-50/70 border-2 border-amber-400 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-950 bg-amber-200 px-3 py-1 rounded-full uppercase">
                      ইংরেজি বর্ষ
                    </span>
                    <Calendar size={20} className="text-[#8B111A]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-gray-950">
                    ইংরেজি বর্ষের ভর্তি সময়সীমা
                  </h4>
                  <div className="bg-white p-3.5 rounded-xl border border-amber-300 text-sm sm:text-base font-black text-[#8B111A]">
                    {data.timelines.english}
                  </div>
                  <p className="text-xs text-gray-700 font-semibold">
                    * নূরানী মক্তব ও হিফজ প্রস্তুতি জামাতে জানুয়ারি সেশনে নতুন শিক্ষার্থী গ্রহণ করা হয়।
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation to Next Tab */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-gray-600">
                পরবর্তী ধাপ: বিভাগসমূহ ও ভর্তির যোগ্যতা
              </span>
              <button
                type="button"
                onClick={() => goToTab("departments")}
                className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl border border-amber-300 shadow-sm transition-colors"
              >
                <span>ধারা ৩ • বিভাগ ও যোগ্যতা দেখুন</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: ৩. বিভাগসমূহ ও ভর্তির যোগ্যতা
        ================================================================= */}
        {activeTab === "departments" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div id="departments" className="scroll-mt-24" />
            <div id="age-checker" className="scroll-mt-24" />
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4">
              <span className="text-xs font-black text-[#014d26] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                ধারা ৩ • শিক্ষাগত যোগ্যতা ও বিভাগ
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 mt-1.5">
                বিভাগসমূহ ও ভর্তির যোগ্যতা
              </h2>
              <p className="text-sm font-bold text-gray-700 mt-0.5">
                নিচের বিভাগগুলোর বিস্তারিত নিয়মাবলি, বয়সসীমা ও আবাসন সুবিধা দেখে নিন।
              </p>
            </div>

            {/* Department Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.departments.map((dept) => {
                const isSelected = selectedDeptId === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#014d26] text-white border-amber-400 shadow-md scale-102"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-900 border-gray-300"
                    }`}
                  >
                    <div className="space-y-1">
                      <span
                        className={`text-[11px] font-black px-2.5 py-0.5 rounded-full inline-block ${
                          isSelected
                            ? "bg-amber-400 text-black"
                            : "bg-emerald-100 text-[#014d26]"
                        }`}
                      >
                        {dept.badge}
                      </span>
                      <h3 className="font-black text-base sm:text-lg mt-1">{dept.name}</h3>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/20 text-xs font-semibold">
                      বয়সসীমা: {dept.ageLimit}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Department Cards (Showing All 3 Prominently) */}
            <div className="space-y-6">
              {data.departments.map((dept) => {
                const isSelected = selectedDeptId === dept.id;
                return (
                  <div
                    key={dept.id}
                    id={`dept-${dept.id}`}
                    className={`rounded-2xl p-6 sm:p-7 border-2 transition-all space-y-5 ${
                      isSelected
                        ? "bg-[#f9fbf9] border-[#014d26] shadow-sm ring-2 ring-emerald-200"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-gray-200 pb-3">
                      <div>
                        <span className="text-xs font-black text-[#8B111A] bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                          {dept.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#014d26] mt-1">
                          {dept.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-amber-950 bg-amber-200 px-3 py-1 rounded-full border border-amber-300">
                          বয়স: {dept.ageLimit}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Eligibility Box */}
                      <div className="bg-white p-5 rounded-xl border border-gray-300 space-y-3">
                        <h4 className="font-black text-base text-gray-950 flex items-center gap-2 text-[#014d26]">
                          <CheckCircle2 size={18} className="text-[#014d26]" />
                          <span>ভর্তির যোগ্যতা ও শর্তাবলি:</span>
                        </h4>
                        <ul className="space-y-2">
                          {dept.eligibility.map((el, i) => (
                            <li
                              key={i}
                              className="text-sm font-semibold text-gray-800 flex items-start gap-2"
                            >
                              <span className="text-[#8B111A] font-black text-base leading-none">
                                •
                              </span>
                              <span>{el}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Living & Facilities Box */}
                      <div className="bg-white p-5 rounded-xl border border-gray-300 space-y-3">
                        <h4 className="font-black text-base text-gray-950 flex items-center gap-2 text-[#014d26]">
                          <Info size={18} className="text-amber-600" />
                          <span>আবাসন ও অধ্যয়নের সুযোগ:</span>
                        </h4>
                        <div className="space-y-2 text-sm text-gray-800">
                          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 font-bold text-[#014d26]">
                            {dept.livingType}
                          </div>
                          <p className="text-xs text-gray-600 font-medium leading-relaxed">
                            {dept.id === "maktab" &&
                              "মক্তব বিভাগে শিক্ষার্থীদের সহিহ কুরআন তিলাওয়াত, বাংলা, ইংরেজি ও মৌলিক গণিত সমন্বিত সিলেবাসে পাঠদান করা হয়।"}
                            {dept.id === "hifz" &&
                              "হিফজ বিভাগে আন্তর্জাতিক মানসম্পন্ন তাজবিদ প্রশিক্ষণ এবং আবাসিক তত্ত্বাবধানে দ্রুত হিফজ সম্পন্ন করার সুব্যবস্থা রয়েছে।"}
                            {dept.id === "kitab" &&
                              "কিতাব বিভাগে বেফাকুল মাদারিসিল আরাবিয়া এবং আল-হাইআতুল উলয়া লিল জামিআতিল কওমিয়ার অধীনে দরস প্রদান করা হয়।"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200">
                      <span className="text-xs font-bold text-gray-600">
                        * নির্ধারিত সময়ে মৌখিক পরীক্ষার মাধ্যমে যোগ্যতা যাচাই করা হবে।
                      </span>
                      <Link
                        href={`/apply?dept=${dept.id}`}
                        className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-xs sm:text-sm font-black px-4 py-2 rounded-xl transition-colors"
                      >
                        <span>এই বিভাগে আবেদন ফরম পূরণ করুন</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToTab("overview")}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-gray-300 transition-colors"
              >
                &larr; পূর্ববর্তী: ধারা ১ ও ২ (কার্যক্রম ও সময়সূচি)
              </button>
              <button
                type="button"
                onClick={() => goToTab("process")}
                className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl border border-amber-300 shadow-sm transition-colors"
              >
                <span>পরবর্তী: ধারা ৪ ও ৫ • পরীক্ষা ও প্রক্রিয়া</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: ৪. ভর্তি পরীক্ষা ও ফলাফল এবং ৫. ভর্তি প্রক্রিয়া
        ================================================================= */}
        {activeTab === "process" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#014d26] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  ধারা ৪ ও ৫ • পরীক্ষা ও আবেদন ধাপ
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 mt-1.5">
                  ভর্তি পরীক্ষা ও পূর্ণাঙ্গ ভর্তি প্রক্রিয়া
                </h2>
                <p className="text-sm font-bold text-gray-700 mt-0.5">
                  অনলাইন বা সরাসরি অফিসে এসে আবেদনের ৫টি সহজ ধাপ।
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFormModal(true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#014d26] bg-amber-300 hover:bg-amber-400 px-4 py-2.5 rounded-xl border-2 border-amber-500 shadow-xs transition-colors"
              >
                <Download size={16} />
                <span>ভর্তি ফরম ডাউনলোড (PDF)</span>
              </button>
            </div>

            {/* ৪. ভর্তি পরীক্ষা ও ফলাফল */}
            <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#014d26] text-amber-300 font-black text-sm flex items-center justify-center">
                  ৪
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#014d26]">
                  ভর্তি পরীক্ষা ও ফলাফল
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-10">
                <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-1">
                  <div className="text-xs font-black text-gray-600 uppercase">
                    ভর্তি পরীক্ষার পদ্ধতি
                  </div>
                  <div className="text-base sm:text-lg font-black text-[#8B111A]">
                    {data.examInfo.method}
                  </div>
                  <p className="text-xs text-gray-700 font-medium">
                    সংশ্লিষ্ট জামাত ও বিভাগের শিক্ষাগত মান অনুযায়ী মৌখিক যাচাই গ্রহণ করা হয়।
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-1">
                  <div className="text-xs font-black text-gray-600 uppercase">
                    ফলাফল প্রকাশ
                  </div>
                  <div className="text-base sm:text-lg font-black text-[#014d26]">
                    {data.examInfo.resultPublish}
                  </div>
                  <p className="text-xs text-gray-700 font-medium">
                    মাদরাসার নোটিশ বোর্ড এবং ওয়েবসাইটের ফলাফল পেজে তাৎক্ষণিক হালনাগাদ করা হয়।
                  </p>
                </div>
              </div>
            </div>

            {/* ৫. ভর্তি প্রক্রিয়া (5 Easy Steps) */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#8B111A] text-white font-black text-sm flex items-center justify-center">
                  ৫
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-950">
                    ভর্তি প্রক্রিয়া
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">
                    {data.admissionProcess.intro}
                  </p>
                </div>
              </div>

              {/* 5 Sequential Roadmap Steps */}
              <div className="space-y-3.5 pl-0 sm:pl-10">
                {data.admissionProcess.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#f9fafb] border-2 border-gray-300 hover:border-emerald-400 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#014d26] text-amber-300 font-black text-sm flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-[#8B111A] uppercase">ধাপ ০{idx + 1}</div>
                      <p className="text-sm sm:text-base font-bold text-gray-950 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dedicated "ভর্তি ফরম ডাউনলোড (PDF)" Card */}
              <div className="pl-0 sm:pl-10">
                <div className="rounded-2xl p-6 bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-xs font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full border border-amber-300">
                      অফিসিয়াল ফরম
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-gray-950">
                      ভর্তি ফরম ডাউনলোড (PDF)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 max-w-xl">
                      {data.admissionProcess.formDownloadNote}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowFormModal(true)}
                      className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-sm font-black px-5 py-3 rounded-xl border border-amber-300 shadow-md transition-colors"
                    >
                      <Printer size={17} />
                      <span>ফরম প্রিভিউ ও প্রিন্ট</span>
                    </button>

                    <a
                      href={data.admissionProcess.pdfDownloadUrl}
                      download="admission-form.pdf"
                      className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-sm font-black px-5 py-3 rounded-xl border border-amber-300 shadow-md transition-colors"
                    >
                      <Download size={17} />
                      <span>সরাসরি PDF ফাইল সেভ করুন</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToTab("departments")}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-gray-300 transition-colors"
              >
                &larr; পূর্ববর্তী: ধারা ৩ (বিভাগসমূহ ও যোগ্যতা)
              </button>
              <button
                type="button"
                onClick={() => goToTab("documents")}
                className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl border border-amber-300 shadow-sm transition-colors"
              >
                <span>পরবর্তী: ধারা ৬ ও ৭ • কাগজপত্র ও এতিমদের সুবিধা</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 4: ৬. প্রয়োজনীয় কাগজপত্র ও ৭. এতিমদের বিশেষ ব্যবস্থা
        ================================================================= */}
        {activeTab === "documents" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div id="document-checklist" className="scroll-mt-24" />
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4">
              <span className="text-xs font-black text-[#014d26] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                ধারা ৬ ও ৭ • নথিপত্র ও মানবিক সুবিধা
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 mt-1.5">
                ভর্তির প্রয়োজনীয় কাগজপত্র ও এতিমদের বিশেষ ব্যবস্থা
              </h2>
              <p className="text-sm font-bold text-gray-700 mt-0.5">
                আবেদনের পূর্বে প্রয়োজনীয় কাগজপত্র প্রস্তুত করে রাখুন।
              </p>
            </div>

            {/* ৬. ভর্তির জন্য প্রয়োজনীয় কাগজপত্র */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#014d26] text-amber-300 font-black text-sm flex items-center justify-center">
                    ৬
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-gray-950">
                    ভর্তির জন্য প্রয়োজনীয় কাগজপত্র
                  </h3>
                </div>

                <span className="text-xs font-bold text-gray-600 hidden sm:inline">
                  চেকবক্সে ক্লিক করে আপনার সংগ্রহ যাচাই করুন
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.requiredDocuments.map((doc, idx) => {
                  const isChecked = !!checkedDocs[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleDoc(idx)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-400 shadow-xs"
                          : "bg-white border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border-2 transition-colors ${
                          isChecked
                            ? "bg-[#014d26] border-[#014d26] text-white"
                            : "border-gray-400 bg-white"
                        }`}
                      >
                        {isChecked && <Check size={14} className="stroke-[3]" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-gray-500">নথি ক্রমিক ০{idx + 1}</div>
                        <p className="text-sm sm:text-base font-black text-gray-950">
                          {doc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ৭. এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা */}
            <div className="bg-linear-to-br from-amber-50 via-rose-50 to-orange-50 border-2 border-rose-300 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#8B111A] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Heart size={22} className="text-amber-300" />
                </div>
                <div>
                  <span className="text-xs font-black text-rose-900 bg-rose-200 px-3 py-1 rounded-full border border-rose-300">
                    ধারা ৭ • মানবিক ও লিল্লাহ কোটা
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#8B111A] mt-1.5">
                    {data.orphanFacility.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-900 font-medium leading-relaxed mt-2">
                    {data.orphanFacility.description}
                  </p>
                </div>
              </div>

              {/* Conditions Checklist Box */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-rose-200 space-y-3">
                <h4 className="font-black text-base sm:text-lg text-[#014d26] flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#014d26]" />
                  <span>এতিম শিক্ষার্থী যাচাইয়ের শর্তাবলি:</span>
                </h4>

                <div className="space-y-2.5">
                  {data.orphanFacility.verificationConditions.map((cond, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#014d26] flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        {cond}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs font-bold text-gray-700">
                  * সমাজসেবা অধিদপ্তর নিবন্ধিত এতিমখানা লিল্লাহ বোর্ডিং (নিবন্ধন: ঢ-০৫০৪)।
                </span>
                <Link
                  href="/orphanage"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-black bg-[#8B111A] hover:bg-[#6e0b13] text-white px-5 py-2.5 rounded-xl border border-amber-300 transition-colors"
                >
                  <span>এতিমখানা লিল্লাহ ফান্ড বিবরণ দেখুন</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Tab 4 Pagination Controls */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToTab("process")}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-gray-300 transition-colors"
              >
                &larr; পূর্ববর্তী: ধারা ৪ ও ৫ (পরীক্ষা ও প্রক্রিয়া)
              </button>
              <button
                type="button"
                onClick={() => goToTab("fees")}
                className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl border border-amber-300 shadow-sm transition-colors"
              >
                <span>পরবর্তী: ধারা ৮ ও ৯ • ভর্তি ফি ও মাসিক খরচ</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 5: ৮. বিভাগভিত্তিক ভর্তি ফি ও ৯. বিভাগভিত্তিক মাসিক খরচ
        ================================================================= */}
        {activeTab === "fees" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div id="fee-calculator" className="scroll-mt-24" />
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4">
              <span className="text-xs font-black text-[#014d26] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                ধারা ৮ ও ৯ • স্বচ্ছ আর্থিক পরিকাঠামো
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 mt-1.5">
                বিভাগভিত্তিক ভর্তি ফি ও মাসিক খরচ
              </h2>
              <p className="text-sm font-bold text-gray-700 mt-0.5">
                জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার অনুমোদিত ফি চার্ট ও খরচ হিসাব টুল।
              </p>
            </div>

            {/* ৮. বিভাগভিত্তিক ভর্তি ফি */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#014d26] text-amber-300 font-black text-sm flex items-center justify-center">
                  ৮
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-950">
                  বিভাগভিত্তিক ভর্তি ফি
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-0 sm:pl-10">
                {/* নতুন শিক্ষার্থীদের ভর্তি ফি */}
                <div className="bg-[#fcfdfc] rounded-2xl border-2 border-emerald-400 overflow-hidden shadow-xs">
                  <div className="bg-[#014d26] text-white p-4 flex items-center justify-between">
                    <h4 className="font-black text-base sm:text-lg">
                      {data.admissionFees.newStudents.title}
                    </h4>
                    <span className="text-xs font-black bg-amber-400 text-black px-2.5 py-1 rounded-md">
                      নতুন ছাত্র
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200 text-gray-700 font-bold text-xs">
                          <th className="text-left py-2">বিবরণ</th>
                          <th className="text-right py-2">পরিমাণ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-bold text-gray-900">
                        {data.admissionFees.newStudents.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-emerald-50/50">
                            <td className="py-2.5">{item.name}</td>
                            <td className="py-2.5 text-right font-black text-gray-950">
                              {item.amount.toLocaleString("bn-BD")} টাকা
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-[#014d26] bg-emerald-50 font-black text-base text-[#014d26]">
                          <td className="py-3 px-2">সর্বমোট</td>
                          <td className="py-3 px-2 text-right">
                            {data.admissionFees.newStudents.total.toLocaleString("bn-BD")} টাকা
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* পুরাতন শিক্ষার্থীদের ভর্তি ফি */}
                <div className="bg-[#fcfdfc] rounded-2xl border-2 border-amber-400 overflow-hidden shadow-xs">
                  <div className="bg-[#8B111A] text-white p-4 flex items-center justify-between">
                    <h4 className="font-black text-base sm:text-lg">
                      {data.admissionFees.oldStudents.title}
                    </h4>
                    <span className="text-xs font-black bg-amber-300 text-black px-2.5 py-1 rounded-md">
                      পুরাতন ছাত্র
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200 text-gray-700 font-bold text-xs">
                          <th className="text-left py-2">বিবরণ</th>
                          <th className="text-right py-2">পরিমাণ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-bold text-gray-900">
                        {data.admissionFees.oldStudents.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-amber-50/50">
                            <td className="py-2.5">{item.name}</td>
                            <td className="py-2.5 text-right font-black text-gray-950">
                              {item.amount.toLocaleString("bn-BD")} টাকা
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-[#8B111A] bg-amber-50 font-black text-base text-[#8B111A]">
                          <td className="py-3 px-2">সর্বমোট</td>
                          <td className="py-3 px-2 text-right">
                            {data.admissionFees.oldStudents.total.toLocaleString("bn-BD")} টাকা
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* ৯. বিভাগভিত্তিক মাসিক খরচ */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#8B111A] text-white font-black text-sm flex items-center justify-center">
                  ৯
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-950">
                  বিভাগভিত্তিক মাসিক খরচ
                </h3>
              </div>

              {/* Monthly Cost Table Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-0 sm:pl-10">
                {data.monthlyExpenses.map((dept) => (
                  <div
                    key={dept.id}
                    className="bg-white rounded-2xl border-2 border-gray-300 p-4 space-y-3 shadow-xs hover:border-[#014d26] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            dept.type === "আবাসিক"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-blue-100 text-blue-900 border border-blue-300"
                          }`}
                        >
                          {dept.type}
                        </span>
                        <span className="text-xs font-bold text-gray-500">প্রতি মাস</span>
                      </div>
                      <h4 className="font-black text-base text-gray-950 mt-2">
                        {dept.title}
                      </h4>

                      <div className="mt-3 space-y-1.5 border-t border-gray-200 pt-2 text-xs font-bold text-gray-800">
                        {dept.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{it.name}</span>
                            <span className="text-gray-950 font-black">
                              {it.amount.toLocaleString("bn-BD")} টাকা
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t-2 border-emerald-300 bg-emerald-50/70 p-2.5 rounded-xl flex items-center justify-between font-black text-sm text-[#014d26]">
                      <span>মাসিক সর্বমোট</span>
                      <span className="text-base">
                        {dept.total.toLocaleString("bn-BD")} টাকা
                      </span>
                    </div>
                  </div>
                ))}

                {/* চ. এমদাদীখানার খরচ Card */}
                <div className="bg-amber-50/60 rounded-2xl border-2 border-amber-400 p-4 space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-400">
                        অতিরিক্ত খাদ্য সেবা
                      </span>
                      <span className="text-xs font-bold text-amber-800">ঐচ্ছিক</span>
                    </div>
                    <h4 className="font-black text-base text-gray-950 mt-2">
                      {data.emdadiKhana.title}
                    </h4>

                    <div className="mt-3 space-y-1.5 border-t border-amber-200 pt-2 text-xs font-bold text-gray-800">
                      {data.emdadiKhana.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{it.name}</span>
                          <span className="text-gray-950 font-black">
                            {it.amount.toLocaleString("bn-BD")} টাকা
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded-lg border border-amber-300 text-[11px] font-semibold text-gray-700 leading-tight">
                    <strong>বিশেষ দ্রষ্টব্য:</strong> {data.emdadiKhana.note}
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Interactive Fee Calculator Tool */}
            <div className="mt-8 bg-linear-to-br from-emerald-50 via-gray-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-400 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#014d26] text-amber-300 flex items-center justify-center shrink-0">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-950">
                    ইন্টারেক্টিভ ভর্তি ফি ও মাসিক খরচ ক্যালকুলেটর
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">
                    শিক্ষার্থীর ধরন ও কাঙ্ক্ষিত বিভাগ নির্বাচন করে তাৎক্ষণিক সর্বমোট খরচের হিসাব দেখুন।
                  </p>
                </div>
              </div>

              {/* Calculator Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Student Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-900">
                    ১. শিক্ষার্থীর ধরন নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcStudentType("new")}
                      className={`p-3 rounded-xl text-xs sm:text-sm font-black border-2 transition-all ${
                        calcStudentType === "new"
                          ? "bg-[#014d26] text-white border-amber-400 shadow-sm"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      নতুন শিক্ষার্থী (৳৩,৫০০)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcStudentType("old")}
                      className={`p-3 rounded-xl text-xs sm:text-sm font-black border-2 transition-all ${
                        calcStudentType === "old"
                          ? "bg-[#8B111A] text-white border-amber-400 shadow-sm"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      পুরাতন শিক্ষার্থী (৳৩,২০০)
                    </button>
                  </div>
                </div>

                {/* 2. Department Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-900">
                    ২. শিক্ষাবিভাগ নির্বাচন করুন:
                  </label>
                  <select
                    value={calcDeptId}
                    onChange={(e) => setCalcDeptId(e.target.value)}
                    className="w-full bg-white border-2 border-gray-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-bold text-gray-950 focus:outline-none focus:border-[#014d26]"
                  >
                    {data.monthlyExpenses.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.title} — মাসিক ৳{dept.total.toLocaleString("bn-BD")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Emdadi Khana Optional Checkboxes */}
              <div className="bg-white p-4 rounded-xl border border-gray-300 space-y-2">
                <div className="text-xs font-black text-gray-900">
                  ৩. এমদাদীখানার অতিরিক্ত সেবা (প্রযোজ্য ক্ষেত্রে টিক দিন):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-gray-800">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-200">
                    <input
                      type="checkbox"
                      checked={includeBreakfast}
                      onChange={(e) => setIncludeBreakfast(e.target.checked)}
                      className="w-4 h-4 text-[#014d26] rounded border-gray-300"
                    />
                    <span>নাশতা বাবদ মাসিক খরচ (+ ১,০০০ টাকা/মাস)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-200">
                    <input
                      type="checkbox"
                      checked={includeOneTimeTwoMeals}
                      onChange={(e) => setIncludeOneTimeTwoMeals(e.target.checked)}
                      className="w-4 h-4 text-[#014d26] rounded border-gray-300"
                    />
                    <span>দুই বেলা গ্রহণের জন্য এককালীন খরচ (+ ২,০০০ টাকা)</span>
                  </label>
                </div>
              </div>

              {/* Calculation Result Summary Box */}
              <div className="bg-white rounded-2xl p-5 border-2 border-emerald-400 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-xs font-bold text-gray-600">ভর্তিকালীন এককালীন ফি</div>
                    <div className="text-lg sm:text-xl font-black text-[#8B111A] mt-1">
                      ৳ {totalAdmissionFee.toLocaleString("bn-BD")}
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-xs font-bold text-gray-600">প্রতি মাসের নিয়মিত খরচ</div>
                    <div className="text-lg sm:text-xl font-black text-[#014d26] mt-1">
                      ৳ {totalMonthlyFee.toLocaleString("bn-BD")}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-100/70 rounded-xl border-2 border-emerald-400">
                    <div className="text-xs font-black text-emerald-950 uppercase">
                      ভর্তিকালীন ১ম মাসে প্রদেয়
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#014d26] mt-1">
                      ৳ {grandFirstMonthTotal.toLocaleString("bn-BD")}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-700 font-semibold">
                    * এতিম শিক্ষার্থীদের ক্ষেত্রে লিল্লাহ বোর্ডিং যাচাই সাপেক্ষে ১০০% ফ্রি সুবিধা প্রযোজ্য।
                  </p>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl border border-amber-300 transition-colors shadow-xs"
                  >
                    <span>ভর্তি আবেদন শুরু করুন</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Tab 5 Pagination Controls */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToTab("documents")}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-gray-300 transition-colors"
              >
                &larr; পূর্ববর্তী: ধারা ৬ ও ৭ (কাগজপত্র ও এতিমদের সুবিধা)
              </button>
              <button
                type="button"
                onClick={() => goToTab("contact")}
                className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl border border-amber-300 shadow-sm transition-colors"
              >
                <span>পরবর্তী: ধারা ১০ ও ১১ • যোগাযোগ ও নির্দেশনা</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 6: ১০. যোগাযোগ ও ১১. অভিভাবকদের জন্য বিশেষ নির্দেশনা
        ================================================================= */}
        {activeTab === "contact" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4">
              <span className="text-xs font-black text-[#014d26] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                ধারা ১০ ও ১১ • সরাসরি যোগাযোগ ও নির্দেশনা
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 mt-1.5">
                যোগাযোগ ও অভিভাবকদের জন্য বিশেষ নির্দেশনা
              </h2>
              <p className="text-sm font-bold text-gray-700 mt-0.5">
                ভর্তি সংক্রান্ত যেকোনো তথ্য, নির্দেশনা ও সহযোগিতার জন্য মাদরাসা কর্তৃপক্ষের সাথে যোগাযোগ করুন।
              </p>
            </div>

            {/* ১০. যোগাযোগ */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#014d26] text-amber-300 font-black text-sm flex items-center justify-center">
                  ১০
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-950">
                  যোগাযোগ
                </h3>
              </div>

              {/* Institution Address Banner */}
              <div className="bg-[#f8faf8] p-5 rounded-2xl border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 pl-0 sm:pl-10">
                <div className="space-y-1">
                  <div className="font-black text-lg text-[#014d26]">
                    {data.institutionName}
                  </div>
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <MapPin size={16} className="text-[#8B111A] shrink-0" />
                    <span>ঠিকানা: {data.contacts.address}</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="text-xs sm:text-sm font-black text-[#014d26] bg-emerald-100 hover:bg-emerald-200 px-4 py-2 rounded-xl border border-emerald-300 transition-colors"
                >
                  ক্যাম্পাস অবস্থান ম্যাপে দেখুন &rarr;
                </Link>
              </div>

              {/* 3 Contact Cards for Key Personnel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-0 sm:pl-10">
                {data.contacts.personnel.map((person, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border-2 border-gray-300 hover:border-[#014d26] transition-all space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#8B111A] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                        {person.role}
                      </span>
                      <PhoneCall size={18} className="text-[#014d26]" />
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-500">মোবাইল নম্বর:</div>
                      <a
                        href={`tel:${person.rawPhone}`}
                        className="text-lg font-black text-[#014d26] hover:underline block"
                      >
                        {person.phone}
                      </a>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href={`tel:${person.rawPhone}`}
                        className="flex-1 text-center bg-[#014d26] hover:bg-[#023e1f] text-white text-xs font-black py-2 rounded-lg transition-colors"
                      >
                        কল করুন
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyPhone(person.rawPhone)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 p-2 rounded-lg border border-gray-300 transition-colors"
                        title="নম্বর কপি করুন"
                      >
                        {copiedNumber === person.rawPhone ? (
                          <CheckCheck size={16} className="text-emerald-700" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-gray-700 pl-0 sm:pl-10">
                {data.contacts.note}
              </p>
            </div>

            {/* ১১. অভিভাবকদের জন্য বিশেষ নির্দেশনা */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#8B111A] text-white font-black text-sm flex items-center justify-center">
                  ১১
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-950">
                  অভিভাবকদের জন্য বিশেষ নির্দেশনা
                </h3>
              </div>

              <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 space-y-3.5 pl-0 sm:pl-10">
                {data.guardianGuidelines.map((guide, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 bg-white p-3.5 rounded-xl border border-amber-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#8B111A] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm sm:text-base font-bold text-gray-950 leading-relaxed">
                      {guide}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Institution Closing Motto Card */}
            <div className="rounded-2xl bg-[#014d26] text-white p-6 sm:p-7 text-center space-y-2 border-2 border-amber-400">
              <div className="font-black text-lg sm:text-xl text-amber-300">
                {data.institutionName}
              </div>
              <p className="text-sm sm:text-base font-bold text-emerald-100">
                {data.slogan}
              </p>
            </div>

            {/* Tab 6 Pagination Controls */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToTab("fees")}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-gray-300 transition-colors"
              >
                &larr; পূর্ববর্তী: ধারা ৮ ও ৯ (ভর্তি ফি ও মাসিক খরচ)
              </button>
              <button
                type="button"
                onClick={() => goToTab("full")}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl border border-amber-500 shadow-sm transition-colors"
              >
                <span>একনজরে পূর্ণ বিবরণী (সব ধারা ১–১১)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 7: একনজরে পূর্ণ বিবরণী (সব ধারা ১ থেকে ১১ ক্রমানুসারে)
        ================================================================= */}
        {activeTab === "full" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#014d26] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  পূর্ণ প্রজ্ঞাপন • সকল ধারা (১–১১)
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 mt-1.5">
                  ভর্তি তথ্যের পূর্ণ প্রাতিষ্ঠানিক বিবরণী
                </h2>
                <p className="text-sm font-bold text-gray-700 mt-0.5">
                  {data.institutionName} • ঠিকানা: {data.address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-[#014d26] text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl border border-amber-300"
                >
                  <Printer size={16} />
                  <span>প্রিন্ট করুন</span>
                </button>
              </div>
            </div>

            {/* Complete Document Sequential Flow */}
            <div className="space-y-8 text-gray-900">
              {/* ১. ভর্তি কার্যক্রম */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">১. ভর্তি কার্যক্রম</h3>
                <p className="text-sm sm:text-base font-medium leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-300">
                  {data.overview}
                </p>
              </div>

              {/* ২. ভর্তির সময়সীমা */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">২. ভর্তির সময়সীমা</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-1.5 text-sm sm:text-base font-semibold">
                  <div>• <strong>আরবি বর্ষ:</strong> {data.timelines.arabic}</div>
                  <div>• <strong>ইংরেজি বর্ষ:</strong> {data.timelines.english}</div>
                </div>
              </div>

              {/* ৩. বিভাগসমূহ ও ভর্তির যোগ্যতা */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-[#014d26]">৩. বিভাগসমূহ ও ভর্তির যোগ্যতা</h3>
                <div className="space-y-3">
                  {data.departments.map((dept) => (
                    <div key={dept.id} className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-2 text-sm">
                      <h4 className="font-black text-base text-gray-950">{dept.name}</h4>
                      <ul className="list-disc list-inside space-y-1 font-medium pl-1">
                        {dept.eligibility.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                        <li><strong>বয়সসীমা:</strong> {dept.ageLimit}</li>
                        <li><strong>ব্যবস্থা:</strong> {dept.livingType}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* ৪. ভর্তি পরীক্ষা ও ফলাফল */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">৪. ভর্তি পরীক্ষা ও ফলাফল</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-1 text-sm sm:text-base font-semibold">
                  <div>• <strong>ভর্তি পরীক্ষার পদ্ধতি:</strong> {data.examInfo.method}</div>
                  <div>• <strong>ফলাফল প্রকাশ:</strong> {data.examInfo.resultPublish}</div>
                </div>
              </div>

              {/* ৫. ভর্তি প্রক্রিয়া */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">৫. ভর্তি প্রক্রিয়া</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-2 text-sm sm:text-base">
                  <p className="font-semibold">{data.admissionProcess.intro}</p>
                  <div className="font-black text-[#8B111A]">ভর্তির ধাপসমূহ:</div>
                  <ol className="list-decimal list-inside space-y-1.5 font-medium pl-1">
                    {data.admissionProcess.steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ol>
                  <p className="pt-2 text-xs font-bold text-gray-700">
                    <strong>ভর্তি ফরম ডাউনলোড:</strong> {data.admissionProcess.formDownloadNote}
                  </p>
                </div>
              </div>

              {/* ৬. ভর্তির জন্য প্রয়োজনীয় কাগজপত্র */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">৬. ভর্তির জন্য প্রয়োজনীয় কাগজপত্র</h3>
                <ol className="list-decimal list-inside space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-300 text-sm sm:text-base font-medium">
                  {data.requiredDocuments.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ol>
              </div>

              {/* ৭. এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">
                  ৭. এতিম, অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা
                </h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-3 text-sm sm:text-base">
                  <p className="font-medium">{data.orphanFacility.description}</p>
                  <div className="font-black text-[#8B111A]">এতিম শিক্ষার্থী যাচাইয়ের শর্তাবলি:</div>
                  <ul className="list-disc list-inside space-y-1 font-medium pl-1">
                    {data.orphanFacility.verificationConditions.map((cond, i) => (
                      <li key={i}>{cond}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ৮. বিভাগভিত্তিক ভর্তি ফি */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">৮. বিভাগভিত্তিক ভর্তি ফি</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-2">
                    <h4 className="font-black text-sm text-[#014d26]">নতুন শিক্ষার্থীদের ভর্তি ফি</h4>
                    <table className="w-full text-xs sm:text-sm">
                      <tbody>
                        {data.admissionFees.newStudents.items.map((it, i) => (
                          <tr key={i} className="border-b border-gray-200">
                            <td className="py-1">{it.name}</td>
                            <td className="py-1 text-right font-bold">{it.amount.toLocaleString("bn-BD")} টাকা</td>
                          </tr>
                        ))}
                        <tr className="font-black text-gray-950">
                          <td className="py-1.5">সর্বমোট</td>
                          <td className="py-1.5 text-right">{data.admissionFees.newStudents.total.toLocaleString("bn-BD")} টাকা</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-2">
                    <h4 className="font-black text-sm text-[#8B111A]">পুরাতন শিক্ষার্থীদের ভর্তি ফি</h4>
                    <table className="w-full text-xs sm:text-sm">
                      <tbody>
                        {data.admissionFees.oldStudents.items.map((it, i) => (
                          <tr key={i} className="border-b border-gray-200">
                            <td className="py-1">{it.name}</td>
                            <td className="py-1 text-right font-bold">{it.amount.toLocaleString("bn-BD")} টাকা</td>
                          </tr>
                        ))}
                        <tr className="font-black text-gray-950">
                          <td className="py-1.5">সর্বমোট</td>
                          <td className="py-1.5 text-right">{data.admissionFees.oldStudents.total.toLocaleString("bn-BD")} টাকা</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* ৯. বিভাগভিত্তিক মাসিক খরচ */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">৯. বিভাগভিত্তিক মাসিক খরচ</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.monthlyExpenses.map((dept) => (
                    <div key={dept.id} className="bg-gray-50 p-3.5 rounded-xl border border-gray-300 space-y-1 text-xs sm:text-sm">
                      <div className="font-black text-gray-950">{dept.title}</div>
                      {dept.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-gray-700">
                          <span>{it.name}</span>
                          <span>{it.amount.toLocaleString("bn-BD")} টাকা</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-black text-[#014d26] pt-1 border-t border-gray-200">
                        <span>মাসিক সর্বমোট</span>
                        <span>{dept.total.toLocaleString("bn-BD")} টাকা</span>
                      </div>
                    </div>
                  ))}

                  <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-300 space-y-1 text-xs sm:text-sm">
                    <div className="font-black text-gray-950">{data.emdadiKhana.title}</div>
                    {data.emdadiKhana.items.map((it, i) => (
                      <div key={i} className="flex justify-between text-gray-700">
                        <span>{it.name}</span>
                        <span>{it.amount.toLocaleString("bn-BD")} টাকা</span>
                      </div>
                    ))}
                    <p className="text-[11px] font-semibold text-gray-600 pt-1">
                      <strong>বিশেষ দ্রষ্টব্য:</strong> {data.emdadiKhana.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* ১০. যোগাযোগ */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">১০. যোগাযোগ</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-300 space-y-1.5 text-sm sm:text-base font-semibold">
                  <div><strong>{data.institutionName}</strong></div>
                  <div>• <strong>ঠিকানা:</strong> {data.contacts.address}</div>
                  {data.contacts.personnel.map((p, i) => (
                    <div key={i}>• <strong>{p.role}:</strong> {p.phone}</div>
                  ))}
                  <p className="pt-1 text-xs font-medium text-gray-600">{data.contacts.note}</p>
                </div>
              </div>

              {/* ১১. অভিভাবকদের জন্য বিশেষ নির্দেশনা */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#014d26]">১১. অভিভাবকদের জন্য বিশেষ নির্দেশনা</h3>
                <ul className="list-disc list-inside space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-300 text-sm sm:text-base font-medium">
                  {data.guardianGuidelines.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              {/* Ending */}
              <div className="text-center pt-4 border-t-2 border-gray-200 space-y-1">
                <div className="font-black text-base text-[#014d26]">{data.institutionName}</div>
                <div className="text-xs sm:text-sm font-bold text-gray-700">{data.slogan}</div>
              </div>
            </div>

            {/* Tab 7 Bottom Controls */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToTab("overview")}
                className="inline-flex items-center gap-2 bg-[#014d26] hover:bg-[#023e1f] text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl border border-amber-300 transition-colors"
              >
                &larr; ধারাভিত্তিক ট্যাব ভিউতে ফিরুন
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-black bg-gray-100 px-4 py-2.5 rounded-xl border border-gray-300 transition-colors"
              >
                উপরে উঠুন ↑
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          4. OFFICIAL PRINTABLE ADMISSION FORM MODAL ("ভর্তি ফরম ডাউনলোড (PDF)")
      ===================================================================== */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border-2 border-gray-400 shadow-2xl relative my-auto">
            {/* Modal Sticky Controls Bar (Hidden in Print) */}
            <div className="sticky top-0 bg-[#014d26] text-white p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 z-20 border-b-2 border-amber-400">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-amber-300 shrink-0" />
                <h3 className="font-black text-xs sm:text-base">
                  ভর্তি ফরম (PDF Preview)
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-amber-400 hover:bg-amber-300 text-black text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Printer size={13} />
                  <span>প্রিন্ট / PDF সেভ</span>
                </button>

                <a
                  href={data.admissionProcess.pdfDownloadUrl}
                  download="admission-form.pdf"
                  className="bg-[#8B111A] hover:bg-[#6e0b13] text-white text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>PDF ডাউনলোড</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 hover:bg-black/60 flex items-center justify-center text-white shrink-0"
                  title="বন্ধ করুন"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Printable Form Body */}
            <div id="printable-admission-form" className="p-6 sm:p-8 space-y-5 text-gray-950 bg-white">
              {/* Form Official Header */}
              <div className="text-center border-b-2 border-gray-400 pb-4 relative">
                <div className="text-xs font-bold text-gray-700">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <h2 className="text-xl sm:text-2xl font-black text-[#014d26] mt-0.5">
                  {data.institutionName}
                </h2>
                <p className="text-xs font-bold text-gray-700">
                  ঠিকানা: {data.address} | ফোন: ০১৭১৬২৯৬৩৭৯, ০১৭৩৪৩১৯৪২৬, ০১৯০১৪৪৭১৬০
                </p>
                <div className="mt-2 inline-block bg-[#014d26] text-white px-4 py-1 rounded-full text-xs sm:text-sm font-black border border-amber-300">
                  ছাত্র ভর্তি আবেদন ফরম — শিক্ষাবর্ষ: {data.sessionName} ({data.hijriYear})
                </div>

                {/* Passport Photo Box on Top Right */}
                <div className="sm:absolute right-0 top-0 mt-3 sm:mt-0 w-24 h-28 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center p-1 text-[11px] font-bold text-gray-500 mx-auto sm:mx-0">
                  <span>পাসপোর্ট সাইজ</span>
                  <span>ছবি লাগান</span>
                </div>
              </div>

              {/* Form Form Fields Table / Lines */}
              <div className="space-y-3.5 text-xs sm:text-sm font-bold text-gray-900">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2 border border-gray-300 rounded-lg">
                    ফরম নং: ............................................
                  </div>
                  <div className="p-2 border border-gray-300 rounded-lg">
                    ভর্তির তারিখ: ....../....../২০২....
                  </div>
                </div>

                <div className="p-2 border border-gray-300 rounded-lg">
                  ১. শিক্ষার্থীর পুরো নাম (বাংলায়): ..........................................................................................
                </div>

                <div className="p-2 border border-gray-300 rounded-lg">
                  ২. শিক্ষার্থীর নাম (ইংরেজি বড় অক্ষরে): .................................................................................
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2 border border-gray-300 rounded-lg">
                    ৩. পিতার নাম: ........................................................
                  </div>
                  <div className="p-2 border border-gray-300 rounded-lg">
                    পেশা: .......................................................
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2 border border-gray-300 rounded-lg">
                    ৪. মাতার নাম: ........................................................
                  </div>
                  <div className="p-2 border border-gray-300 rounded-lg">
                    অভিভাবকের মোবাইল: ....................................
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2 border border-gray-300 rounded-lg">
                    ৫. জন্মতারিখ: ....../....../............
                  </div>
                  <div className="p-2 border border-gray-300 rounded-lg">
                    ডিজিটাল জন্মনিবন্ধন নং: ......................................
                  </div>
                </div>

                <div className="p-2 border border-gray-300 rounded-lg">
                  ৬. বর্তমান ঠিকানা: গ্রাম/মহল্লা: ................................. ডাকঘর: ................................ থানা: ............................. জেলা: .....................................
                </div>

                <div className="p-2 border border-gray-300 rounded-lg">
                  ৭. স্থায়ী ঠিকানা: গ্রাম/মহল্লা: ................................. ডাকঘর: ................................ থানা: ............................. জেলা: .....................................
                </div>

                <div className="p-3 border border-gray-300 rounded-lg space-y-1.5">
                  <div>৮. ভর্তিচ্ছু বিভাগ ও ধরন (টিক চিহ্ন দিন):</div>
                  <div className="flex flex-wrap gap-4 font-normal text-xs sm:text-sm">
                    <label className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border border-gray-400 inline-block rounded-xs" />
                      <span>মক্তব বিভাগ (অনাবাসিক)</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border border-gray-400 inline-block rounded-xs" />
                      <span>নাজেরা বিভাগ (আবাসিক)</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border border-gray-400 inline-block rounded-xs" />
                      <span>হিফজ বিভাগ (আবাসিক)</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border border-gray-400 inline-block rounded-xs" />
                      <span>মাদানী নেসাব বিভাগ</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border border-gray-400 inline-block rounded-xs" />
                      <span>কিতাব বিভাগ (আবাসিক)</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border border-gray-400 inline-block rounded-xs" />
                      <span>এতিমখানা লিল্লাহ কোটা</span>
                    </label>
                  </div>
                </div>

                {/* Declaration Box */}
                <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-xs leading-relaxed space-y-2">
                  <div className="font-black text-[#014d26]">অভিভাবকের অঙ্গীকারনামা:</div>
                  <p>
                    আমি এই মর্মে অঙ্গীকার করছি যে, ফরমে প্রদত্ত সকল তথ্য সত্য ও সঠিক। আমার সন্তান মাদরাসার সকল নিয়মাবলি, সময়সূচি ও শৃঙ্খলা মেনে চলতে বাধ্য থাকবে।
                  </p>
                  <div className="pt-6 flex justify-between font-bold text-gray-700">
                    <div>শিক্ষার্থীর স্বাক্ষর: ...................................</div>
                    <div>অভিভাবকের স্বাক্ষর: ...................................</div>
                  </div>
                </div>

                {/* Office Use Section */}
                <div className="p-3 border-2 border-dashed border-gray-400 rounded-lg text-xs space-y-2 bg-gray-50">
                  <div className="font-black text-gray-950 uppercase text-center border-b border-gray-300 pb-1">
                    কেবলমাত্র মাদরাসা অফিস ব্যবহারের জন্য
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-semibold text-gray-800">
                    <div>মৌখিক পরীক্ষার প্রাপ্ত নম্বর: ...........</div>
                    <div>নির্ধারিত জামাত: ...................</div>
                    <div>গৃহীত ভর্তি ফি: ৳....................</div>
                    <div>ভর্তি রোল নং: .......................</div>
                  </div>
                  <div className="pt-4 flex justify-between font-bold text-gray-700">
                    <div>যাচাইকারীর স্বাক্ষর: .................................</div>
                    <div>মুহতামিমের অনুমোদন: .................................</div>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons for Modal */}
              <div className="pt-4 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500 font-bold">
                  * ডাউনলোড বা প্রিন্ট করে প্রয়োজনীয় কাগজপত্রসহ অফিসে জমা দিন।
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/apply"
                    className="bg-[#014d26] hover:bg-[#023e1f] text-white text-xs font-black px-4 py-2 rounded-xl transition-colors"
                  >
                    অনলাইনে ফরম পূরণ করুন &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-black px-4 py-2 rounded-xl transition-colors"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
