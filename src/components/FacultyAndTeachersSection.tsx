"use client";

import { useState, useMemo, useEffect } from "react";
import type { PublicSettings, PublicTeacher } from "@/content/public-types";

import Link from "next/link";
import { committeeAndFacultyData as _fallback_committeeAndFacultyData, siteSettings as _fallback_siteSettings } from "@/data/siteData";
import {
  GraduationCap,
  BookOpen,
  Phone,
  Copy,
  Check,
  Building2,
  MapPin,
  Sparkles,
  X,
  Search,
  ArrowRight,
  Users,
  Briefcase,
  Layers,
} from "lucide-react";
import { EditableImage as Image, useEditableData, EditableText } from "@/content/client";
import { fieldSource } from "@/content/model";
import { stegaClean } from "@sanity/client/stega";


type TeacherCategory = "all" | "bukhari" | "kitab" | "hifz" | "maktab" | "other" | "staff";

interface TeacherItem {
  _id?: string;
  _type?: string;
  id: string | number;
  serial: string;
  name: string;
  designation: string;
  category: string;
  categoryTitle: string;
  district?: string;
  mobile?: string;
  institution?: string;
  note?: string;
  honor?: string;
  photo?: string;
}

interface FacultyAndTeachersSectionProps {
  initialTeachers?: PublicTeacher[];
  initialSettings?: PublicSettings;
}

export default function FacultyAndTeachersSection({
  initialTeachers,
  initialSettings,
}: FacultyAndTeachersSectionProps = {}) {
  const committeeAndFacultyData = useEditableData("copy.data.committeeAndFacultyData", _fallback_committeeAndFacultyData);
  const siteSettings = useEditableData("siteSettings", _fallback_siteSettings);
  const listCopy = useEditableData("copy.ui.FacultyAndTeachersSection", {
    titles: {
      all: "শিক্ষক মণ্ডলী ও কর্মকর্তা তালিকা",
      bukhari: "বুখারীর বিশেষ দরস প্রদানকারী উলামা",
      kitab: "মুহাদ্দিস ও কিতাব বিভাগের শিক্ষকবৃন্দ",
      hifz: "হিফজ ও নাজেরা বিভাগের শিক্ষকবৃন্দ",
      maktab: "মক্তব বিভাগের শিক্ষকবৃন্দ",
      other: "অন্যান্য শিক্ষক ও কর্মকর্তা",
      staff: "জামিয়ার স্টাফবৃন্দ",
    },
    subtitles: { all: "সকল বিভাগের সম্মানিত শিক্ষক ও কর্মী", filtered: "বিভাগভিত্তিক সদস্যবৃন্দ" },
  }, ["local", "listCopy"]);

  const [activeCategory, setActiveCategory] = useState<TeacherCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTeacherRecord, setSelectedTeacher] = useState<TeacherItem | null>(null);

  const { bukhariScholars, faculty, staff, pledge } = committeeAndFacultyData;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  useEffect(() => {
    const syncFromHash = () => {
      if (typeof window === "undefined") return;
      const rawHash = window.location.hash.replace(/^#/, "");
      if (!rawHash) return;

      if (rawHash === "bukhari") {
        setActiveCategory("bukhari");
        const el = document.getElementById("bukhari");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (rawHash === "kitab") {
        setActiveCategory("kitab");
        const el = document.getElementById("teachers-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (rawHash === "hifz") {
        setActiveCategory("hifz");
        const el = document.getElementById("teachers-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (rawHash === "maktab") {
        setActiveCategory("maktab");
        const el = document.getElementById("teachers-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (rawHash === "officers" || rawHash === "other") {
        setActiveCategory("other");
        const el = document.getElementById("teachers-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (rawHash === "staff") {
        setActiveCategory("staff");
        const el = document.getElementById("teachers-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // Build unified teacher and staff list
  const allTeachersList = useMemo<TeacherItem[]>(() => {
    if (initialTeachers !== undefined) {
      return initialTeachers.map((t, idx) => {
        let cat = stegaClean(t.department || "kitab");
        if (cat === "officers") cat = "other";
        let title = "মুহাদ্দিস ও কিতাব বিভাগ";
        if (cat === "bukhari") title = "বুখারীর বিশেষ দরস";
        else if (cat === "hifz") title = "হিফজ ও নাজেরা বিভাগ";
        else if (cat === "maktab") title = "নূরানী মক্তব বিভাগ";
        else if (cat === "other") title = "অন্যান্য শিক্ষক ও কর্মকর্তা";
        else if (cat === "staff") title = "জামিয়ার স্টাফবৃন্দ";

        return {
          _id: t._id,
          _type: "teacher",
          id: t.id || `teacher-${idx}`,
          serial: t.serial ? String(t.serial) : String(idx + 1),
          name: t.name,
          designation: t.designation,
          category: cat,
          categoryTitle: title,
          district: t.district || "",
          mobile: t.mobile || "",
          institution: t.institution || "",
          note: t.qualification || "",
          honor: t.honor || "",
          photo: t.photo || "/avatar-scholar.svg",
        };
      });
    }

    const list: TeacherItem[] = [];

    // Bukhari Scholars
    bukhariScholars.scholars.forEach((b) => {
      list.push({
        id: `bukhari-${b.id}`,
        serial: b.serial,
        name: b.name,
        designation: b.designation,
        institution: b.institution,
        honor: b.honor,
        category: "bukhari",
        categoryTitle: "বুখারীর বিশেষ দরস",
        photo: "/avatar-scholar.svg",
      });
    });

    // Kitab Department
    faculty.departments[0].teachers.forEach((t) => {
      list.push({
        id: `kitab-${t.id}`,
        serial: t.serial,
        name: t.name,
        designation: t.designation,
        district: t.district,
        mobile: t.mobile,
        note: t.note,
        category: "kitab",
        categoryTitle: "মুহাদ্দিস ও কিতাব বিভাগ",
        photo: "/avatar-scholar.svg",
      });
    });

    // Hifz Department
    faculty.departments[1].teachers.forEach((t) => {
      list.push({
        id: `hifz-${t.id}`,
        serial: t.serial,
        name: t.name,
        designation: t.designation,
        district: t.district,
        mobile: t.mobile,
        category: "hifz",
        categoryTitle: "হিফজ ও নাজেরা বিভাগ",
        photo: "/avatar-scholar.svg",
      });
    });

    // Maktab Department
    faculty.departments[2].teachers.forEach((t) => {
      list.push({
        id: `maktab-${t.id}`,
        serial: t.serial,
        name: t.name,
        designation: t.designation,
        district: t.district,
        mobile: t.mobile,
        category: "maktab",
        categoryTitle: "মক্তব বিভাগ",
        photo: "/avatar-scholar.svg",
      });
    });

    // Other Teachers & Officers
    faculty.departments[3].teachers.forEach((t) => {
      list.push({
        id: `other-${t.id}`,
        serial: t.serial,
        name: t.name,
        designation: t.designation,
        district: t.district,
        mobile: t.mobile,
        category: "other",
        categoryTitle: "অন্যান্য শিক্ষক ও কর্মকর্তা",
        photo: "/avatar-member.svg",
      });
    });

    // Staff
    staff.members.forEach((s) => {
      list.push({
        id: `staff-${s.id}`,
        serial: s.serial,
        name: s.name,
        designation: s.designation,
        district: s.district,
        mobile: s.mobile,
        category: "staff",
        categoryTitle: "জামিয়ার স্টাফবৃন্দ",
        photo: "/avatar-member.svg",
      });
    });

    return list;
  }, [initialTeachers, bukhariScholars, faculty, staff]);

  const selectedTeacher = allTeachersList.find((teacher) => teacher.id === selectedTeacherRecord?.id) || null;

  // Filtered teachers based on category & search
  const filteredTeachers = useMemo(() => {
    return allTeachersList.filter((item) => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.designation.toLowerCase().includes(q) ||
        (item.district && item.district.toLowerCase().includes(q)) ||
        (item.mobile && item.mobile.includes(q)) ||
        (item.institution && item.institution.toLowerCase().includes(q)) ||
        item.categoryTitle.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [allTeachersList, activeCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* ===================================================================
          1. Hero Header Card
      =================================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#014222] via-[#016332] to-[#0d7841] text-white p-6 sm:p-10 shadow-lg border-b-4 border-[#D9822B]">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-amber-400/10 pointer-events-none blur-xl" />

        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-semibold backdrop-blur-sm">
            <GraduationCap size={14} className="text-amber-300" />
            <span><EditableText document="copy.ui.FacultyAndTeachersSection" entry="eq9ud6c" fallback={"ইলমে দ্বীনের আলো ছড়ানো বিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকমণ্ডলী"} /></span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1e4ykg7" fallback={"সম্মানিত শিক্ষক মণ্ডলী ও উলামায়ে কেরাম"} /></h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-3xl"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e186by0p" fallback={"দেশ-বিদেশের উচ্চতর শিক্ষাপ্রতিষ্ঠান থেকে সনদপ্রাপ্ত বিজ্ঞ মুহাদ্দিস, শায়খুল হাদিস ও দক্ষ হাফেজে কুরআন শিক্ষকদের নিবিড় তত্ত্বাবধানে জামিয়া পরিচালিত হচ্ছে।"} /></p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full border border-white/15">
              <MapPin size={13} className="text-amber-300" />
              <span><EditableText document="copy.ui.FacultyAndTeachersSection" entry="ex9d51j" fallback={"মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর"} /></span>
            </span>
            <Link
              href="/committee"
              className="inline-flex items-center gap-1.5 bg-amber-400 text-gray-900 font-bold px-3 py-1 rounded-full hover:bg-amber-300 transition-colors shadow-xs"
            >
              <Users size={14} />
              <span><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1jdbae6" fallback={"পরিচালনা পরিষদ দেখুন"} /></span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Counter Summary */}
        <div className="mt-7 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
            <span className="text-2xl font-black text-amber-300 block"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1xpf3r" fallback={"৩"} /></span>
            <span className="text-gray-200"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e13ngiv" fallback={"বুখারীর দরস"} /></span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
            <span className="text-2xl font-black text-amber-300 block"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="ev5kbz0" fallback={"১৪"} /></span>
            <span className="text-gray-200"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e250e2p" fallback={"মুহাদ্দিস ও কিতাব"} /></span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
            <span className="text-2xl font-black text-amber-300 block"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="er7n80x" fallback={"১১"} /></span>
            <span className="text-gray-200"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e10jkka1" fallback={"হিফজ ও মক্তব"} /></span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
            <span className="text-2xl font-black text-amber-300 block"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e13tm96v" fallback={"৮"} /></span>
            <span className="text-gray-200"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e4xmhx" fallback={"কর্মকর্তা ও স্টাফ"} /></span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. Filter & Search Control Panel
      =================================================================== */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 sm:p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="শিক্ষকের নাম, পদবি বা জেলা দিয়ে খুঁজুন... (যেমন: মুহতামিম, ময়মনসিংহ)"
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-gray-50/70 focus:bg-white focus:outline-none focus:border-[#016332] text-gray-800"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs font-semibold">
          {[
            { id: "all", label: "সকল শিক্ষক ও স্টাফ", count: allTeachersList.length },
            { id: "bukhari", label: "বুখারীর বিশেষ দরস", count: 3 },
            { id: "kitab", label: "মুহাদ্দিস ও কিতাব বিভাগ", count: 14 },
            { id: "hifz", label: "হিফজ ও নাজেরা", count: 8 },
            { id: "maktab", label: "মক্তব বিভাগ", count: 3 },
            { id: "other", label: "কর্মকর্তা ও শিক্ষক", count: 4 },
            { id: "staff", label: "স্টাফবৃন্দ", count: 4 },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as TeacherCategory)}
                className={`shrink-0 px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#8B111A] text-white border-[#8B111A] shadow-xs"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#016332] hover:text-[#016332]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================
          3. Bukhari Scholars Section (Prominent when all/bukhari)
      =================================================================== */}
      {(activeCategory === "all" || activeCategory === "bukhari") && !searchQuery && (
        <section
          id="bukhari"
          className="bg-white rounded-2xl border-2 border-[#016332] shadow-xs overflow-hidden scroll-mt-20"
        >
          <div className="bg-gradient-to-r from-[#014222] via-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
            <div className="flex items-center gap-2.5">
              <BookOpen size={20} className="text-[#ffd86b]" />
              <div>
                <h2 className="text-base sm:text-lg font-bold">{bukhariScholars.title}</h2>
                <span className="text-xs text-amber-200 block">{bukhariScholars.subtitle}</span>
              </div>
            </div>
            <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-300/40 px-3 py-0.5 rounded-full font-bold"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1va400u" fallback={"৩ জন বিশিষ্ট শায়খ"} /></span>
          </div>

          <div className="p-5 sm:p-7 space-y-5">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {bukhariScholars.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {allTeachersList.filter((teacher) => teacher.category === "bukhari").map((scholar) => (
                <div
                  key={scholar.id}
                  className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white p-5 space-y-4 relative overflow-hidden shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="h-1.5 w-full bg-[#016332] absolute top-0 left-0" />

                  <div className="flex items-center gap-3.5">
                    {/* Scholar Photo Avatar on every card */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#016332] p-0.5 bg-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                      <Image document="copy.ui.FacultyAndTeachersSection" entry="e1o0fq5r" source={fieldSource(scholar, "photo")}
                        src={scholar.photo || "/avatar-scholar.svg"}
                        alt={scholar.name}
                        fill
                        sizes="64px"
                        className="object-cover rounded-full"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded-full inline-block mb-1"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e7gfu57" fallback={"বুখারী শরিফ বিশেষ দরস"} /></span>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#016332] transition-colors leading-tight">
                        {scholar.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#8B111A] mt-0.5">
                        {scholar.designation}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-700 leading-snug border-t border-gray-100 pt-3 space-y-1">
                    <p className="font-semibold text-gray-900">{scholar.institution}</p>
                    <p className="text-[11.5px] text-gray-500 font-medium">{scholar.honor}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 border-l-4 border-l-[#016332] rounded-r-xl p-4 text-xs sm:text-sm font-bold text-[#016332] leading-relaxed text-center shadow-2xs"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="ezc3j1o" fallback={"“"} />{bukhariScholars.closingDua}<EditableText document="copy.ui.FacultyAndTeachersSection" entry="etdv8jj" fallback={"”"} /></div>
          </div>
        </section>
      )}

      {/* Hidden Anchor targets for direct URL hash linking */}
      <div id="kitab" className="scroll-mt-24" />
      <div id="hifz" className="scroll-mt-24" />
      <div id="maktab" className="scroll-mt-24" />
      <div id="officers" className="scroll-mt-24" />
      <div id="staff" className="scroll-mt-24" />

      {/* ===================================================================
          4. Teachers Grid - Every Card has their photo image
      =================================================================== */}
      <section
        id="teachers-grid"
        className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden scroll-mt-20"
      >
        <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#D9822B]">
          <div className="flex items-center gap-2.5">
            <GraduationCap size={22} className="text-[#ffd86b]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {listCopy.titles[activeCategory]}
              </h2>
              <span className="text-xs text-amber-200 block">
                {activeCategory === "all" ? listCopy.subtitles.all : listCopy.subtitles.filtered}
              </span>
            </div>
          </div>
          <span className="text-xs bg-white/15 px-3 py-1 rounded-full border border-white/20 font-bold"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1jmahj2" fallback={"মোট: "} />{filteredTeachers.length}<EditableText document="copy.ui.FacultyAndTeachersSection" entry="ewjvpr7" fallback={" জন"} /></span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {filteredTeachers.length === 0 ? (
            <div className="py-12 text-center text-gray-500 space-y-2">
              <Search size={32} className="mx-auto text-gray-300" />
              <p className="text-sm font-bold"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e7ynfut" fallback={"কোনো শিক্ষকের তথ্য মেলেনি"} /></p>
              <p className="text-xs text-gray-400"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1kvtu5l" fallback={"“"} />{searchQuery}<EditableText document="copy.ui.FacultyAndTeachersSection" entry="epiq4ru" fallback={"” দিয়ে কোনো রেকর্ড পাওয়া যায়নি।"} /></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-2xl border border-gray-200/90 p-4.5 space-y-3.5 hover:border-[#016332]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Header: Photo Avatar & Details */}
                    <div className="flex items-center gap-3">
                      {/* Photo Avatar on every card */}
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#016332]/40 bg-gray-100 p-0.5 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Image document="copy.ui.FacultyAndTeachersSection" entry="ebc41x1" source={fieldSource(teacher, "photo")}
                          src={teacher.photo || "/avatar-scholar.svg"}
                          alt={teacher.name}
                          fill
                          sizes="56px"
                          className="object-cover rounded-full"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mb-1"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="eus1tka" fallback={"ক্রম: "} />{teacher.serial}
                        </span>
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#8B111A] transition-colors leading-snug line-clamp-2">
                          {teacher.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#016332] mt-0.5 line-clamp-1">
                          {teacher.designation}
                        </p>
                      </div>
                    </div>

                    {/* Department Badge and District Tag */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-semibold text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded-full">
                        {teacher.categoryTitle}
                      </span>
                      {teacher.district && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                          <MapPin size={10} className="text-[#8B111A]" />
                          <span>{teacher.district}</span>
                        </span>
                      )}
                    </div>

                    {teacher.institution && (
                      <p className="text-[11.5px] text-gray-600 leading-snug bg-gray-50 p-2 rounded-lg border border-gray-100">
                        {teacher.institution}
                      </p>
                    )}

                    {teacher.note && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                        {teacher.note}
                      </p>
                    )}
                  </div>

                  {/* Bottom Action Row: Mobile & Call */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    {teacher.mobile ? (
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <a
                          href={`tel:${stegaClean(teacher.mobile)}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#8B111A] hover:underline truncate"
                          title="কল করুন"
                        >
                          <Phone size={12} className="shrink-0" />
                          <span className="truncate">{teacher.mobile}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(teacher.mobile!, String(teacher.id))}
                          className="text-gray-400 hover:text-gray-700 p-1 rounded cursor-pointer"
                          title="নম্বর কপি করুন"
                        >
                          {copiedId === String(teacher.id) ? (
                            <Check size={12} className="text-emerald-600" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400 font-medium"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1ks39p" fallback={"জামিয়া নেছারিয়া"} /></span>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedTeacher(teacher)}
                      className="shrink-0 text-xs text-[#016332] hover:bg-[#016332]/10 px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer"
                    ><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1xyx77" fallback={"বিস্তারিত"} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          5. Pledge & Closing Dua Card
      =================================================================== */}
      <section className="rounded-2xl bg-gradient-to-br from-[#014222] via-[#016332] to-[#0d7841] text-white p-6 sm:p-8 shadow-md border-b-4 border-[#D9822B] space-y-4">
        <div className="flex items-center gap-2 text-amber-300">
          <Sparkles size={20} />
          <h2 className="text-lg sm:text-xl font-extrabold">{pledge.title}</h2>
        </div>

        <p className="text-sm sm:text-base text-gray-100 leading-relaxed max-w-3xl">
          {pledge.text}
        </p>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
          <p className="text-sm sm:text-base font-bold text-amber-200 text-center leading-relaxed"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1cxc5y1" fallback={"“"} />{pledge.closingDua}<EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1bi62c8" fallback={"”"} /></p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/20 text-xs sm:text-sm text-gray-300">
          <div>
            <span className="font-bold text-white block"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="epulcqr" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা"} /></span>
            <span><EditableText document="copy.ui.FacultyAndTeachersSection" entry="eblwici" fallback={"মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।"} /></span>
          </div>

          <a
            href={`tel:${stegaClean(siteSettings.phone)}`}
            className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs self-start sm:self-auto"
          >
            <Phone size={13} />
            <span><EditableText document="copy.ui.FacultyAndTeachersSection" entry="exqcmss" fallback={"যোগাযোগ করুন: "} />{siteSettings.phone}</span>
          </a>
        </div>
      </section>

      {/* ===================================================================
          6. Teacher Details Modal
      =================================================================== */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
              <span className="font-bold text-sm sm:text-base"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1tu53g3" fallback={"শিক্ষক পরিচিতি"} /></span>
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="text-white/80 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 text-sm text-gray-800">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#016332] p-0.5 bg-gray-50 shadow-sm shrink-0">
                  <Image document="copy.ui.FacultyAndTeachersSection" entry="e1vorgvo" source={fieldSource(selectedTeacher, "photo")}
                    src={selectedTeacher.photo || "/avatar-scholar.svg"}
                    alt={selectedTeacher.name}
                    fill
                    sizes="64px"
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#8B111A] leading-snug">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-xs font-bold text-[#016332] mt-0.5">
                    {selectedTeacher.designation}
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full mt-1">
                    {selectedTeacher.categoryTitle}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-gray-100 pt-3 text-xs sm:text-sm">
                {selectedTeacher.district && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={14} className="text-[#8B111A] shrink-0" />
                    <span className="font-semibold"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e1fytlxo" fallback={"জেলা:"} /></span>
                    <span className="font-bold text-gray-900">{selectedTeacher.district}</span>
                  </div>
                )}

                {selectedTeacher.institution && (
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                    <span className="text-gray-500 block text-[11px] font-semibold"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e14s5nnf" fallback={"প্রতিষ্ঠান:"} /></span>
                    <span className="font-bold text-gray-800">{selectedTeacher.institution}</span>
                  </div>
                )}

                {selectedTeacher.mobile && (
                  <div className="flex items-center justify-between bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-[#016332] shrink-0" />
                      <span className="font-semibold text-emerald-950"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="ei7od8f" fallback={"মোবাইল:"} /></span>
                      <a
                        href={`tel:${stegaClean(selectedTeacher.mobile)}`}
                        className="font-bold text-[#016332] hover:underline"
                      >
                        {selectedTeacher.mobile}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedTeacher.mobile!, "modal-teach")}
                      className="text-xs font-bold text-[#016332] bg-white border border-emerald-300 px-2.5 py-1 rounded-md hover:bg-emerald-100 cursor-pointer"
                    >
                      {copiedId === "modal-teach" ? "কপি হয়েছে" : "কপি"}
                    </button>
                  </div>
                )}

                {selectedTeacher.note && (
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs text-amber-950">
                    <span className="font-bold block"><EditableText document="copy.ui.FacultyAndTeachersSection" entry="ezovj4q" fallback={"মন্তব্য:"} /></span>
                    <span>{selectedTeacher.note}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                {selectedTeacher.mobile && (
                  <a
                    href={`tel:${stegaClean(selectedTeacher.mobile)}`}
                    className="inline-flex items-center gap-1.5 bg-[#016332] hover:bg-[#014222] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Phone size={13} />
                    <span><EditableText document="copy.ui.FacultyAndTeachersSection" entry="ejzhyan" fallback={"কল করুন"} /></span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                ><EditableText document="copy.ui.FacultyAndTeachersSection" entry="e19ghl66" fallback={"বন্ধ করুন"} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

