"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { homePageContent, siteSettings } from "@/data/siteData";
import {
  BookOpen,
  Award,
  Target,
  ArrowRight,
  Calendar,
  UserCheck,
  Users,
  ShieldCheck,
  GraduationCap,
  MapPin,
  Sparkles,
  CheckCircle2,
  Library,
  Mic,
  FileEdit,
  HeartHandshake,
  Bell,
  Camera,
  Phone,
  Mail,
  Building2,
  ScrollText,
  Compass,
  Clock,
  FileCheck,
} from "lucide-react";

export default function HomePrimarySection() {
  const [activeNoticeTab, setActiveNoticeTab] = useState<number>(0);
  const [activeGalleryCategory, setActiveGalleryCategory] =
    useState<string>("all");

  const {
    hero,
    welcome,
    atAGlance,
    missionAndObjectives,
    departments,
    curriculum,
    studentTraining,
    notices,
    gallery,
    admissionCall,
    contact,
  } = homePageContent;

  const filteredGallery =
    activeGalleryCategory === "all"
      ? gallery.categories
      : gallery.categories.filter((item) => item.id === activeGalleryCategory);

  return (
    <div className="w-full">
      {/* =====================================================================
          ২। প্রধান ব্যানার (Hero Banner — Borderless & Balanced)
      ===================================================================== */}
      <section className="w-full relative">
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden">
          {/* Main Campus Image - No border */}
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            sizes="100vw"
            preload
            className="object-cover object-[center_35%]"
          />

          {/* Smooth dark gradient at the lower part for clean text readability */}
          <div className="absolute inset-x-0 bottom-0 pt-20 pb-6 sm:pb-8 px-4 sm:px-6 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                {hero.title}
              </h1>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-amber-200 leading-relaxed drop-shadow-xs">
                {hero.slogan}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৩। আমাদের জামিয়ায় স্বাগতম (Welcome to Our Jamia)
      ===================================================================== */}
      <section
        id="welcome"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#016332] via-[#D9822B] to-[#8B111A]" />

            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column: Seal Logo */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative p-3 rounded-full bg-amber-50/60 border border-amber-200/80">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#8B111A] bg-white p-1.5 shadow-sm flex items-center justify-center">
                    <Image
                      src={siteSettings.logoUrl}
                      alt={siteSettings.nameBn}
                      width={150}
                      height={150}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#016332] text-white text-[11px] sm:text-xs font-semibold px-3 py-0.5 rounded-full whitespace-nowrap shadow-2xs">
                    স্থাপিত: ১৯৬৯ খ্রিষ্টাব্দ
                  </div>
                </div>

                <div className="mt-5 space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#8B111A]">
                    {siteSettings.nameBn}
                  </h3>
                  <p className="text-xs text-[#016332] font-medium">
                    মরকুন, টঙ্গী, গাজীপুর, বাংলাদেশ
                  </p>
                </div>
              </div>

              {/* Right Column: Welcome Text & Button */}
              <div className="lg:col-span-8 space-y-3.5">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#016332] border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles size={13} className="text-[#D9822B]" />
                  <span>স্বাগতম বার্তা</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 leading-snug">
                  {welcome.title}
                </h2>

                <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#8B111A] to-[#D9822B]" />

                <div className="space-y-3 text-gray-700 text-sm sm:text-[15px] leading-relaxed text-justify">
                  {welcome.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={welcome.buttonHref}
                    className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014f28] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors group"
                  >
                    <span>{welcome.buttonText}</span>
                    <ArrowRight
                      size={15}
                      className="text-amber-300 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৪। এক নজরে আমাদের জামিয়া (At a Glance Section)
      ===================================================================== */}
      <section
        id="at-a-glance"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#05351b] text-white relative overflow-hidden scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-amber-300 border border-amber-300/30 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Building2 size={13} />
              <span>প্রতিষ্ঠানের সংক্ষিপ্ত তথ্যাবলি</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-white">
              {atAGlance.title}
            </h2>
            <div className="w-16 h-1 bg-[#D9822B] rounded-full mx-auto mt-2.5" />
          </div>

          {/* Top Row: 4 Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* প্রতিষ্ঠাকাল */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-emerald-700/70">
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 mb-3">
                <Calendar size={18} />
              </div>
              <p className="text-xs text-emerald-200">প্রতিষ্ঠাকাল</p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {atAGlance.established}
              </h3>
            </div>

            {/* মুতাওয়াল্লী */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-emerald-700/70">
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 mb-3">
                <ShieldCheck size={18} />
              </div>
              <p className="text-xs text-emerald-200">মুতাওয়াল্লী</p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {atAGlance.mutawalli}
              </h3>
            </div>

            {/* সভাপতি */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-emerald-700/70">
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 mb-3">
                <Award size={18} />
              </div>
              <p className="text-xs text-emerald-200">সভাপতি</p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {atAGlance.president}
              </h3>
            </div>

            {/* মুহতামিম */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-emerald-700/70">
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 mb-3">
                <UserCheck size={18} />
              </div>
              <p className="text-xs text-emerald-200">মুহতামিম</p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {atAGlance.muhtamim}
              </h3>
            </div>
          </div>

          {/* Bottom Row: 3 Detailed Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* জমিদাতাগন */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-emerald-700/70">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#8B111A] flex items-center justify-center text-amber-300 shrink-0">
                  <Users size={18} />
                </div>
                <h3 className="text-base font-bold text-amber-300">
                  জমিদাতাগন
                </h3>
              </div>
              <ul className="space-y-1.5 text-sm font-medium text-white">
                {atAGlance.landDonors.map((donor, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{donor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* শিক্ষা কার্যক্রম */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-emerald-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B111A] flex items-center justify-center text-amber-300 shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <h3 className="text-base font-bold text-amber-300">
                    শিক্ষা কার্যক্রম
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-semibold text-white leading-relaxed bg-white/5 p-3.5 rounded-lg border border-white/10">
                  {atAGlance.academicPrograms}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["মক্তব", "হিফজ", "হিফজ রিভিশন", "কিতাব বিভাগ"].map(
                  (dept, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-emerald-900/80 text-amber-200 px-2.5 py-0.5 rounded-full border border-emerald-700"
                    >
                      {dept}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* ঠিকানা */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-emerald-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B111A] flex items-center justify-center text-amber-300 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <h3 className="text-base font-bold text-amber-300">ঠিকানা</h3>
                </div>
                <p className="text-sm sm:text-[15px] font-medium text-white leading-relaxed whitespace-pre-line bg-white/5 p-3.5 rounded-lg border border-white/10">
                  {atAGlance.address}
                </p>
              </div>
              <div className="mt-3 text-xs text-emerald-200 flex items-center gap-1.5">
                <Phone size={13} className="text-amber-300" />
                <span>মোবাইল: {siteSettings.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৫. আমাদের লক্ষ্য ও উদ্দেশ্য (Our Aim & Objectives)
      ===================================================================== */}
      <section
        id="mission"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-red-50 text-[#8B111A] border border-red-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Target size={13} />
              <span>আদর্শ ও উদ্দেশ্য</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900">
              {missionAndObjectives.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#016332] to-[#8B111A] rounded-full mx-auto mt-2.5" />
          </div>

          {/* Main Goal Callout Card */}
          <div className="bg-gradient-to-r from-[#8B111A] to-[#6e0b13] text-white rounded-xl p-5 sm:p-6 shadow-sm mb-8 text-center">
            <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
              মূল লক্ষ্য
            </p>
            <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed max-w-4xl mx-auto">
              “{missionAndObjectives.mainGoal}”
            </p>
          </div>

          {/* Objectives Grid */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#016332] mb-4 flex items-center gap-2">
              <Compass size={18} className="text-[#8B111A]" />
              <span>{missionAndObjectives.objectivesTitle}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {missionAndObjectives.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F0] border border-amber-200/80 hover:border-[#016332] transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#016332] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} className="text-amber-300" />
                  </div>
                  <p className="text-sm sm:text-[15px] font-medium text-gray-800 leading-snug">
                    {obj}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-7 text-center">
              <Link
                href={missionAndObjectives.buttonHref}
                className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6e0b13] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors group"
              >
                <span>{missionAndObjectives.buttonText}</span>
                <ArrowRight
                  size={15}
                  className="text-amber-300 group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৬। আমাদের শিক্ষা বিভাগসমূহ (Our Academic Departments)
      ===================================================================== */}
      <section
        id="departments"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] border-y border-amber-200/60 scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-[#016332] border border-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <BookOpen size={13} />
              <span>বিভাগসমূহ</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900">
              {departments.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#016332] to-[#8B111A] rounded-full mx-auto mt-2.5" />
          </div>

          {/* 4 Main Departments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {departments.items.slice(0, 4).map((dept, idx) => {
              const bengaliNumbers = ["০১", "০২", "০৩", "০৪"];
              return (
                <div
                  key={dept.id}
                  className="bg-white rounded-xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-1 w-full bg-gradient-to-r from-[#016332] to-[#D9822B]" />
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-[#016332] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          {dept.badge}
                        </span>
                        <span className="text-lg font-bold text-amber-500/50 group-hover:text-[#8B111A] transition-colors">
                          {bengaliNumbers[idx]}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#016332] transition-colors mb-2">
                        {dept.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {dept.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-4 pt-1">
                    <div className="w-full h-[1px] bg-gray-100 mb-2.5" />
                    <span className="text-xs font-semibold text-[#8B111A]">
                      নিয়মিত পাঠদান ও তত্ত্বাবধান
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* মাদানি নেসাব Special Highlight Bar */}
          {departments.items[4] && (
            <div className="mt-5 bg-[#016332] rounded-xl p-5 sm:p-6 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 text-center sm:text-left">
                <div className="w-11 h-11 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                  <ScrollText size={22} />
                </div>
                <div>
                  <span className="inline-block text-[11px] font-semibold bg-[#8B111A] text-amber-200 px-2.5 py-0.5 rounded-full mb-1">
                    {departments.items[4].badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {departments.items[4].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-0.5 max-w-2xl">
                    {departments.items[4].description}
                  </p>
                </div>
              </div>

              <Link
                href={departments.buttonHref}
                className="shrink-0 inline-flex items-center gap-1.5 bg-[#D9822B] hover:bg-[#c27120] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors group"
              >
                <span>{departments.buttonText}</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          )}

          {/* Section Main CTA Button */}
          <div className="mt-7 text-center">
            <Link
              href={departments.buttonHref}
              className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014724] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors group"
            >
              <span>{departments.buttonText}</span>
              <ArrowRight
                size={15}
                className="text-amber-300 group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৭। পাঠ্যক্রম ও শিক্ষা কার্যক্রম (Curriculum & Educational Activities)
      ===================================================================== */}
      <section
        id="curriculum"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-[#8B111A] border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">
                <BookOpen size={13} className="text-[#016332]" />
                <span>{curriculum.title}</span>
              </span>

              <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 leading-snug">
                {curriculum.subtitle}
              </h2>

              <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#016332] to-[#D9822B]" />

              <div className="space-y-3 text-gray-700 text-sm sm:text-[15px] leading-relaxed text-justify">
                {curriculum.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href={curriculum.buttonHref}
                  className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6E0B13] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors group"
                >
                  <span>{curriculum.buttonText}</span>
                  <ArrowRight
                    size={15}
                    className="text-amber-300 group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* Right Visual Card: Included Subjects & Holistic Pillars (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-5 sm:p-6 border border-amber-200/80 space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#016332] mb-3 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-[#D9822B]" />
                  <span>পাঠ্যক্রমের অন্তর্ভুক্ত বিষয়সমূহ</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {curriculum.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-gray-800 font-medium text-xs sm:text-[13px] px-3 py-1.5 rounded-lg border border-amber-200/90 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#016332]" />
                      <span>{sub}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-amber-200/70 pt-4">
                <h4 className="text-xs font-bold text-[#8B111A] mb-2.5 uppercase tracking-wide">
                  শিক্ষার্থীদের সার্বিক বিকাশের ৪টি স্তম্ভ
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "চিন্তাশক্তি বিকাশ",
                    "ভাষাগত দক্ষতা",
                    "উন্নত আদব-আখলাক",
                    "দায়িত্বশীলতা গঠন",
                  ].map((pillar, idx) => (
                    <div
                      key={idx}
                      className="bg-emerald-950/5 border border-emerald-800/15 rounded-lg p-2.5 text-center font-semibold text-xs sm:text-[13px] text-[#016332]"
                    >
                      {pillar}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৮। ছাত্র প্রশিক্ষণ ও সহশিক্ষা কার্যক্রম (Student Training & Co-curricular)
      ===================================================================== */}
      <section
        id="training"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] border-t border-amber-200/60 scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-red-50 text-[#8B111A] border border-red-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Award size={13} />
              <span>প্রতিভা ও চরিত্র গঠন</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900">
              {studentTraining.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#8B111A] to-[#016332] rounded-full mx-auto mt-2.5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {studentTraining.items.map((item, idx) => {
              const icons = [
                <Library key="lib" size={20} />,
                <Mic key="mic" size={20} />,
                <FileEdit key="edit" size={20} />,
                <HeartHandshake key="heart" size={20} />,
              ];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#016332] text-amber-300 flex items-center justify-center mb-3.5 group-hover:bg-[#8B111A] transition-colors">
                      {icons[idx]}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-[#8B111A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#016332]">
                    <span>সহশিক্ষা কার্যক্রম</span>
                    <span>০{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 text-center">
            <Link
              href={studentTraining.buttonHref}
              className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014724] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors group"
            >
              <span>{studentTraining.buttonText}</span>
              <ArrowRight
                size={15}
                className="text-amber-300 group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৯। নোটিশ ও বিজ্ঞপ্তি (Notices & Announcements)
      ===================================================================== */}
      <section
        id="notices"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-amber-200/60 scroll-mt-14"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#016332] border border-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Bell size={13} />
              <span>বিজ্ঞপ্তি বোর্ড</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900">
              {notices.title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1.5">
              {notices.subtitle}
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#016332] to-[#8B111A] rounded-full mx-auto mt-2.5" />
          </div>

          {/* Notice Categories Grid / Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {notices.categories.map((cat, idx) => {
              const isActive = activeNoticeTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveNoticeTab(idx)}
                  className={`p-3.5 rounded-xl font-semibold text-xs sm:text-sm text-left transition-all flex items-center gap-2.5 border cursor-pointer ${
                    isActive
                      ? "bg-[#016332] text-white border-[#016332] shadow-xs"
                      : "bg-[#FAF7F0] text-gray-800 border-amber-200 hover:border-[#016332]"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold ${
                      isActive
                        ? "bg-amber-400 text-gray-900"
                        : "bg-emerald-100 text-[#016332]"
                    }`}
                  >
                    ০{idx + 1}
                  </span>
                  <span className="leading-snug">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Active Notice Display Box */}
          <div className="bg-[#FAF7F0] rounded-2xl border border-amber-200/90 overflow-hidden">
            <div className="bg-[#016332] text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                <Bell size={15} className="text-amber-300" />
                <span>{notices.categories[activeNoticeTab]}</span>
              </div>
              <span className="text-[11px] bg-white/15 px-2.5 py-0.5 rounded-full text-amber-200">
                সর্বশেষ হালনাগাদ
              </span>
            </div>

            <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center text-[#D9822B] mb-3">
                <Bell size={20} />
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-800">
                “{notices.emptyMessage}”
              </p>
              <p className="text-xs text-gray-500 mt-1">{notices.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ১০। আমাদের গ্যালারি (Our Gallery)
      ===================================================================== */}
      <section
        id="gallery"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] border-t border-amber-200/60 scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-red-50 text-[#8B111A] border border-red-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Camera size={13} />
              <span>ফটো ও কার্যক্রম গ্যালারি</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900">
              {gallery.title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1.5">
              {gallery.subtitle}
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#016332] to-[#8B111A] rounded-full mx-auto mt-2.5" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveGalleryCategory("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                activeGalleryCategory === "all"
                  ? "bg-[#8B111A] text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#8B111A]"
              }`}
            >
              সকল বিভাগ
            </button>
            {gallery.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveGalleryCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                  activeGalleryCategory === cat.id
                    ? "bg-[#016332] text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-[#016332]"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Gallery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                className={`group relative rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-md transition-all ${
                  idx === 0 && activeGalleryCategory === "all"
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
                }`}
              >
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#016332]/90 text-amber-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      গ্যালারি ০{idx + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-200 mt-0.5">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          ১১। ভর্তি আহ্বান (Admission Call-to-Action)
      ===================================================================== */}
      <section
        id="admission"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#8B111A] to-[#590910] text-white relative overflow-hidden scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Call to Action */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
                <GraduationCap size={14} />
                <span>{admissionCall.title}</span>
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                {admissionCall.headline}
              </h2>

              <p className="text-sm sm:text-[15px] text-amber-100/95 leading-relaxed">
                {admissionCall.description}
              </p>

              <div className="bg-black/20 border border-amber-300/25 rounded-xl p-3.5 text-xs sm:text-sm text-amber-200 flex items-start gap-2.5">
                <FileCheck
                  size={17}
                  className="text-amber-300 shrink-0 mt-0.5"
                />
                <span>{admissionCall.note}</span>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${contact.phoneValue}`}
                  className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014f28] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  <Phone size={15} className="text-amber-300" />
                  <span>কল করুন: {contact.phoneValue}</span>
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 bg-white text-[#8B111A] hover:bg-amber-50 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  <span>যোগাযোগ করুন</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Admission Info Pillars */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {admissionCall.highlights.map((item, idx) => {
                const icons = [
                  <Clock key="clock" size={18} />,
                  <UserCheck key="user" size={18} />,
                  <FileCheck key="file" size={18} />,
                  <HeartHandshake key="fee" size={18} />,
                ];
                return (
                  <div
                    key={idx}
                    className="bg-white/10 border border-white/15 rounded-xl p-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2.5">
                      {icons[idx]}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-amber-300 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-xs text-amber-50/90 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ১২। যোগাযোগ (Contact Section)
      ===================================================================== */}
      <section
        id="contact"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#016332] border border-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <MapPin size={13} />
              <span>সরাসরি যোগাযোগ</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900">
              {contact.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#016332] to-[#8B111A] rounded-full mx-auto mt-2.5" />
          </div>

          {/* 3 Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* ঠিকানা */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-2xs text-center flex flex-col items-center">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#016332] flex items-center justify-center mb-3">
                <MapPin size={22} />
              </div>
              <h3 className="text-xs font-semibold text-gray-500 mb-1">
                {contact.addressLabel}
              </h3>
              <p className="text-base sm:text-lg font-bold text-gray-900">
                {contact.addressValue}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন)
              </p>
            </div>

            {/* মোবাইল নম্বর */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-2xs text-center flex flex-col items-center">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#8B111A] flex items-center justify-center mb-3">
                <Phone size={22} />
              </div>
              <h3 className="text-xs font-semibold text-gray-500 mb-1">
                {contact.phoneLabel}
              </h3>
              <a
                href={`tel:${contact.phoneValue}`}
                className="text-lg sm:text-xl font-bold text-[#8B111A] hover:underline"
              >
                {contact.phoneValue}
              </a>
              <p className="text-xs text-gray-500 mt-0.5">
                ভর্তি ও তথ্যের জন্য সরাসরি কল করুন
              </p>
            </div>

            {/* ই-মেইল */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-2xs text-center flex flex-col items-center">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#D9822B] flex items-center justify-center mb-3">
                <Mail size={22} />
              </div>
              <h3 className="text-xs font-semibold text-gray-500 mb-1">
                {contact.emailLabel}
              </h3>
              <a
                href={`mailto:${contact.emailValue}`}
                className="text-base sm:text-lg font-bold text-[#016332] hover:underline break-all"
              >
                {contact.emailValue}
              </a>
              <p className="text-xs text-gray-500 mt-0.5">
                যেকোনো জিজ্ঞাসায় ই-মেইল পাঠান
              </p>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="bg-white rounded-xl p-2 border border-gray-200/90 shadow-2xs overflow-hidden">
            <iframe
              title="জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা ম্যাপ"
              src="https://www.google.com/maps?q=Morkun,+Tongi,+Gazipur,+Bangladesh&output=embed"
              className="w-full h-64 sm:h-72 rounded-lg border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
