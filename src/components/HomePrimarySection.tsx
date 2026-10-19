"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { homePageContent, siteSettings } from "@/data/siteData";
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
  } = homePageContent;

  const filteredGallery =
    activeGalleryCategory === "all"
      ? (gallery.items || gallery.categories)
      : (gallery.items || gallery.categories).filter(
          (item) => (item.categoryId || item.id) === activeGalleryCategory
        );

  const bengaliDigits = ["১", "২", "৩", "৪", "৫"];
  const bengaliLetters = ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ"];

  return (
    <div className="w-full bg-[#F4F5F0] text-gray-800">
      {/* =====================================================================
          ২। প্রধান ব্যানার (Hero Video Banner — Edge-to-Edge Responsive Video)
      ===================================================================== */}
      <section className="w-full relative overflow-hidden">
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[560px] overflow-hidden bg-[#021c0e]">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={hero.image}
            className="absolute inset-0 w-full h-full object-cover object-[center_68%]"
            style={{ objectFit: "cover", objectPosition: "center 68%", width: "100%", height: "100%" }}
          >
            <source src={hero.video || "/drone_shot_of_madrasha.mp4"} type="video/mp4" />
          </video>

          {/* Clean dark gradient at the lower part of video */}
          <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 sm:pb-6 px-4 bg-gradient-to-t from-[#021c0e]/90 via-[#021c0e]/50 to-transparent pointer-events-none">
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
                <span className="text-xs bg-white/10 border border-amber-300/30 text-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                  স্থাপিত: ১৯৬৯ খ্রিষ্টাব্দ
                </span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {/* Official Madrasa Seal */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#8B111A] ring-4 ring-[#FAF7F0] p-1.5 bg-white shadow-md flex items-center justify-center">
                      <Image
                        src={siteSettings.logoUrl}
                        alt={siteSettings.nameBn}
                        width={128}
                        height={128}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#016332] bg-[#FAF7F0] border border-gray-200 px-2.5 py-0.5 rounded-full">
                      গভঃ রেজিঃ {siteSettings.regNo}
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
                <span className="text-xs text-amber-200 hidden sm:inline font-medium">
                  কুরআন ও সুন্নাহর আদর্শ
                </span>
              </div>

              <div className="p-5 sm:p-7 space-y-5">
                {/* Main Goal Box */}
                <div className="bg-gradient-to-r from-[#FAF7F0] to-[#fffdf9] border border-[#e6dec8] border-l-4 border-l-[#8B111A] rounded-r-lg p-4 sm:p-5 shadow-2xs">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded mb-1.5">
                    মূল লক্ষ্য
                  </span>
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
                  <span className="col-span-4 font-bold text-gray-600">
                    প্রতিষ্ঠাকাল
                  </span>
                  <span className="col-span-8 font-bold text-gray-900">
                    : {atAGlance.established}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-[#F9FAF8] hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600">
                    মুতাওয়াল্লী
                  </span>
                  <span className="col-span-8 font-bold text-gray-900">
                    : {atAGlance.mutawalli}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600">
                    জমিদাতাগন
                  </span>
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
                  <span className="col-span-4 font-bold text-gray-600">
                    সভাপতি
                  </span>
                  <span className="col-span-8 font-bold text-gray-900">
                    : {atAGlance.president}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600">
                    মুহতামিম
                  </span>
                  <span className="col-span-8 font-bold text-[#016332]">
                    : {atAGlance.muhtamim}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-[#F9FAF8] hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600">
                    শিক্ষা কার্যক্রম
                  </span>
                  <span className="col-span-8 font-semibold text-gray-900 leading-snug">
                    : {atAGlance.academicPrograms}
                  </span>
                </div>

                <div className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#FAF7F0]/50 transition-colors">
                  <span className="col-span-4 font-bold text-gray-600">
                    ঠিকানা
                  </span>
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
                  href="/functions/notices"
                  className="text-xs bg-white/15 hover:bg-white/25 text-amber-200 px-2.5 py-0.5 rounded-full transition-colors font-medium"
                >
                  সকল নোটিশ →
                </Link>
              </div>

              <div className="p-4 sm:p-5 space-y-3.5">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {notices.subtitle}
                </p>

                {/* 4 Notice Categories */}
                <div className="grid grid-cols-2 gap-2">
                  {notices.categories.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveNoticeTab(idx)}
                      className={`px-3 py-2 text-xs font-bold text-left rounded-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeNoticeTab === idx
                          ? "bg-[#8B111A] text-white border-[#8B111A] shadow-xs"
                          : "bg-[#F9FAF8] text-gray-800 border-gray-200 hover:border-[#016332] hover:bg-white"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          activeNoticeTab === idx ? "bg-amber-300" : "bg-[#016332]"
                        }`}
                      />
                      <span className="truncate">{cat}</span>
                    </button>
                  ))}
                </div>

                {/* Active Notice Box */}
                <div className="border-2 border-dashed border-[#D9822B]/50 rounded-lg bg-[#FAF7F0] p-5 text-center space-y-1.5">
                  <span className="inline-block text-[11px] font-bold text-[#016332] bg-[#016332]/10 px-2.5 py-0.5 rounded-full">
                    {notices.categories[activeNoticeTab]}
                  </span>
                  <p className="text-sm font-bold text-gray-800 pt-1">
                    “{notices.emptyMessage}”
                  </p>
                </div>
              </div>
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
              <p className="text-xs sm:text-sm text-gray-600 mt-1 pl-4">
                মক্তব ও হিফজ থেকে কিতাব ও মাদানি নেসাব পর্যন্ত সমন্বিত দ্বীনি শিক্ষা
              </p>
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
            {departments.items.map((dept, idx) => (
              <div
                key={dept.id}
                className={`bg-white rounded-xl border border-gray-200/90 overflow-hidden flex flex-col justify-between group hover:border-[#016332] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-xs ${
                  idx === 4 ? "sm:col-span-2 md:col-span-1 xl:col-span-1" : ""
                }`}
              >
                {/* Department Photo */}
                <div className="relative h-46 sm:h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[11px] font-bold bg-[#8B111A] text-white px-2.5 py-0.5 rounded shadow-xs border border-white/20">
                      বিভাগ - ০{idx + 1}
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
                      <span>ভর্তি ও দারস</span>
                    </span>
                    <Link
                      href={departments.buttonHref}
                      className="inline-flex items-center gap-1 font-bold text-[#8B111A] group-hover:text-[#016332] transition-colors"
                    >
                      <span>বিস্তারিত</span>
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
                <span className="font-bold text-[#016332]">ভর্তি ও পাঠদান সংক্রান্ত তথ্য:</span> মক্তব, হিফজ, হিফজ রিভিশন, কিতাব ও মাদানি নেসাবে শিক্ষার্থী ভর্তি ও ক্লাস রুটিন সম্পর্কে বিস্তারিত জানতে যোগাযোগ করুন।
              </p>
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
                      {bengaliLetters[idx]}.
                    </span>
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
                <span>পাঠ্যক্রমের অন্তর্ভুক্ত প্রধান বিষয়সমূহ :</span>
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
                  <span className="inline-block text-[11px] font-bold text-[#8B111A] bg-[#8B111A]/10 px-2.5 py-0.5 rounded-full mb-2">
                    কার্যক্রম - ০{idx + 1}
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

            <div className="mt-6">
              <Link
                href={studentTraining.buttonHref}
                className="inline-flex items-center gap-2 bg-[#016332] hover:bg-[#014724] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md shadow-xs transition-all group"
              >
                <span>{studentTraining.buttonText}</span>
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
              <span className="text-xs text-amber-200 bg-black/20 border border-amber-300/30 px-2.5 py-0.5 rounded-full hidden sm:inline font-medium">
                লিল্লাহ বোর্ডিং ও মানবসেবা কার্যক্রম
              </span>
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
                      <Image
                        src={orphanageSupport.image}
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
                  <span>সহযোগিতার গুরুত্বপূর্ণ খাতসমূহ :</span>
                  <span className="text-[11px] font-semibold text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded-full">
                    সদকাহ ও অনুদান
                  </span>
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

                <div className="mt-4 pt-3 border-t border-gray-200/90 flex flex-wrap items-center justify-between text-xs text-gray-700 gap-1">
                  <span className="font-semibold text-gray-900">
                    অনুদান ও তথ্য হটলাইন:
                  </span>
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
                        <span className="w-4 h-4 rounded-full bg-[#8B111A]/10 text-[#8B111A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
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
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block pt-1">
                    সদস্য লক্ষ্যমাত্রা
                  </span>
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
                      <span>সরাসরি যোগাযোগ: {contact.phoneValue}</span>
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
                  <Image
                    src={hostelProject.image}
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
                  <span className="inline-block bg-[#016332]/10 text-[#016332] text-xs font-bold px-3 py-1 rounded-full border border-[#016332]/20">
                    আবাসন-সংকট নিরসন ও সম্প্রসারণ উদ্যোগ
                  </span>

                  {/* Client's exact text 1 */}
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                    {hostelProject.shortInfo}
                  </p>

                  {/* Client's exact text 2: Highlight Appeal Callout */}
                  <div className="bg-gradient-to-r from-[#FAF7F0] to-white border-l-4 border-l-[#8B111A] rounded-r-lg p-3.5 sm:p-4 my-2 border-y border-r border-gray-200/90 shadow-2xs">
                    <p className="text-sm sm:text-[15.5px] font-bold text-[#8B111A] leading-relaxed">
                      “{hostelProject.appeal}”
                    </p>
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
                      <span className="text-[#016332] font-bold mt-0.5">▪</span>
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
                    <span>সহায়তা হটলাইন: {contact.phoneValue}</span>
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3.5 mb-6 border-b-2 border-[#016332]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#8B111A] rounded-full inline-block" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {gallery.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {gallery.subtitle}
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveGalleryCategory("all")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full border cursor-pointer transition-all ${
                  activeGalleryCategory === "all"
                    ? "bg-[#016332] text-white border-[#016332] shadow-2xs"
                    : "bg-[#F9FAF8] text-gray-700 border-gray-300 hover:border-[#016332]"
                }`}
              >
                সকল ছবি
              </button>
              {gallery.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveGalleryCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full border cursor-pointer transition-all ${
                    activeGalleryCategory === cat.id
                      ? "bg-[#8B111A] text-white border-[#8B111A] shadow-2xs"
                      : "bg-[#F9FAF8] text-gray-700 border-gray-300 hover:border-[#8B111A]"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200/90 rounded-xl bg-white overflow-hidden group shadow-xs hover:shadow-md hover:border-[#016332]/60 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  {("categoryTitle" in item && item.categoryTitle) && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[11px] font-bold bg-[#016332]/95 text-white px-2.5 py-0.5 rounded-full shadow-xs border border-white/20">
                        {String(item.categoryTitle)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-100 bg-white">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#8B111A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          ১১। ভর্তি আহ্বান & ১২। যোগাযোগ (Admission & Contact Desk)
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
                  <span>মোবাইল: {contact.phoneValue}</span>
                </a>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 bg-white text-[#016332] hover:bg-amber-50 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-md transition-all shadow-xs group"
                >
                  <span>অনলাইন ভর্তি ফরম</span>
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
                  <h3 className="font-bold text-amber-300 text-xs sm:text-sm mb-1">
                    ▪ {item.label}
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
                    <span className="block text-xs text-gray-600 mt-0.5">
                      মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন), টঙ্গী, গাজীপুর।
                    </span>
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
