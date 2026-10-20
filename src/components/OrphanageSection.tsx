"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  orphanagePageData,
  siteSettings,
  homePageContent,
} from "@/data/siteData";
import {
  HeartHandshake,
  Building2,
  FileCheck2,
  Landmark,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Coins,
  ArrowRight,
  Info,
  Clock,
  Send,
} from "lucide-react";

export default function OrphanageSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const {
    header,
    toc,
    intro,
    hostelConstruction,
    registration,
    appeal,
    funds,
    paymentMethods,
    contact,
    callToAction,
  } = orphanagePageData;

  return (
    <div className="space-y-8">
      {/* ===================================================================
          1. Hero Header Card
      =================================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#014222] via-[#016332] to-[#0d7841] text-white p-6 sm:p-10 shadow-lg border-b-4 border-[#D9822B]">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-amber-400/10 pointer-events-none blur-xl" />

        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-semibold backdrop-blur-sm">
            <HeartHandshake size={14} className="text-amber-300" />
            <span>{header.tagline}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {header.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-3xl">
            {header.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full border border-white/15">
              <FileCheck2 size={13} className="text-amber-300" />
              <span>সমাজসেবা নিবন্ধন নং: {registration.regNumber}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full border border-white/15">
              <Clock size={13} className="text-amber-300" />
              <span>নিবন্ধন তারিখ: {registration.registrationDate}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full border border-white/15">
              <Phone size={13} className="text-amber-300" />
              <span>সহযোগিতা ও অনুদান: {contact.mobile}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. Two-Column Layout (Sticky Left TOC & Right Main Content)
      =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents (Left 4 cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-5 border-t-4 border-t-[#016332]">
            <h2 className="text-sm font-bold text-gray-900 pb-3 mb-3 border-b border-gray-100 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#016332]">
                <Sparkles size={16} />
                <span>এক নজরে সূচিপত্র</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                ৮টি বিভাগ
              </span>
            </h2>

            <nav className="space-y-1">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:text-[#016332] hover:bg-[#016332]/[0.06] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#016332] transition-colors" />
                    <span>{item.title}</span>
                  </span>
                  <ChevronRight
                    size={13}
                    className="text-gray-400 group-hover:text-[#016332] group-hover:translate-x-0.5 transition-transform"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Donation Hotline Box */}
          <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F2EDE0] rounded-2xl border border-[#D9822B]/40 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#8B111A]">
              <Coins size={18} />
              <h3 className="text-sm font-bold">সরাসরি অনুদান ও তথ্য</h3>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              এতিম ও অসচ্ছল শিক্ষার্থীদের খাবার, বস্ত্র, চিকিৎসা ও আবাসন সম্প্রসারণে আপনার সাদাকাহ পৌঁছে দিন।
            </p>
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleCopy(paymentMethods.bkash.number, "quick-bkash")}
                className="w-full flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-pink-200 text-xs font-bold text-gray-800 hover:border-pink-400 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>বিকাশ: {paymentMethods.bkash.number}</span>
                </span>
                <span className="text-[11px] text-[#016332] flex items-center gap-1 font-semibold">
                  {copiedKey === "quick-bkash" ? (
                    <>
                      <Check size={12} className="text-emerald-600" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>কপি</span>
                    </>
                  )}
                </span>
              </button>

              <a
                href={`tel:${contact.mobile}`}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#016332] hover:bg-[#014724] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                <Phone size={14} />
                <span>মাদরাসা কর্তৃপক্ষকে কল করুন</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Sections (Right 8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* =================================================================
              Section 1: ১. এতিমখানা পরিচিতি
          ================================================================= */}
          <section
            id={intro.id}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden scroll-mt-20"
          >
            <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
              <div className="flex items-center gap-2.5">
                <HeartHandshake size={20} className="text-[#ffd86b]" />
                <h2 className="text-base sm:text-lg font-bold">{intro.title}</h2>
              </div>
              <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                শাখা পরিচিতি
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <div className="space-y-3 text-sm sm:text-[15px] text-gray-800 leading-relaxed text-justify">
                {intro.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {intro.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-gray-200/90 bg-[#FAF7F0] flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-800"
                  >
                    <CheckCircle2 size={16} className="text-[#016332] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Orphanage Image */}
              <div className="pt-2">
                <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-gray-200 shadow-xs group">
                  <Image
                    src="/hifz_bibhag.jpeg"
                    alt="জামিয়া নেছারিয়া ইসলামিয়া এতিমখানা বিভাগ"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    <p className="text-xs font-semibold text-amber-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>জামিয়া নেছারিয়া ইসলামিয়া এতিমখানা ও হিফজুল কুরআন বিভাগের শিক্ষার্থী ও দারস</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              Section: নির্মাণ প্রকল্প — ছাত্রাবাসের চতুর্থ তলা নির্মাণে এগিয়ে আসুন
              (User explicitly specified: "এই লেখাটা এতিমখানা পরিচিত এর নিচে দিবেন")
          ================================================================= */}
          <section
            id={hostelConstruction.id}
            className="bg-white rounded-2xl border-2 border-[#D9822B] shadow-md overflow-hidden scroll-mt-20 relative"
          >
            {/* Top Badge */}
            <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-5 py-4 border-b-2 border-[#D9822B] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Building2 size={22} className="text-[#ffd86b]" />
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase block">
                    {hostelConstruction.title}
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    {hostelConstruction.subtitle}
                  </h2>
                </div>
              </div>
              <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-300/40 px-3 py-1 rounded-full font-bold">
                {hostelConstruction.badge}
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-6">
              {/* Motto Banner */}
              <div className="bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-l-4 border-l-[#8B111A] rounded-r-xl p-4 border-y border-r border-gray-200 shadow-2xs">
                <p className="text-base sm:text-lg font-extrabold text-[#8B111A] tracking-tight">
                  “{hostelConstruction.motto}”
                </p>
                <p className="text-xs font-semibold text-gray-600 mt-1">
                  {hostelConstruction.salam}
                </p>
              </div>

              {/* Campus Image */}
              <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-gray-200 shadow-xs">
                <Image
                  src="/prodhan_banner.jpeg"
                  alt="জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার নতুন ছাত্রাবাস ও একাডেমিক ভবন"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3.5 text-white">
                  <p className="text-xs font-semibold text-amber-200 flex items-center gap-2">
                    <Building2 size={14} className="text-amber-300" />
                    <span>জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার বর্তমান তিনতলা ছাত্রাবাস ভবন (চতুর্থ তলা সম্প্রসারণের অপেক্ষায়)</span>
                  </p>
                </div>
              </div>

              {/* প্রকল্পের পরিচিতি ও প্রয়োজনীয়তা */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#016332] flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-1.5 h-4 bg-[#016332] rounded-full" />
                  <span>{hostelConstruction.necessityTitle}</span>
                </h3>
                <div className="space-y-2.5 text-sm sm:text-[14.5px] text-gray-800 leading-relaxed text-justify">
                  {hostelConstruction.necessityParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* নির্মাণকাজ সম্পন্ন করতে আপনাদের সহযোগিতা কাম্য */}
              <div className="space-y-3 bg-[#FAF7F0]/80 rounded-xl p-4 sm:p-5 border border-[#D9822B]/30">
                <h3 className="text-base font-bold text-[#8B111A] flex items-center gap-2">
                  <HeartHandshake size={18} className="text-[#8B111A]" />
                  <span>{hostelConstruction.appealTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#016332]">
                  {hostelConstruction.appealAudience}
                </p>
                <p className="text-sm text-gray-800 leading-relaxed text-justify">
                  {hostelConstruction.appealParagraph}
                </p>
              </div>

              {/* যেভাবে সহযোগিতা করতে পারেন */}
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#8B111A] rounded-full" />
                  <span>{hostelConstruction.waysToHelpTitle}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hostelConstruction.waysToHelp.map((way, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-gray-200 bg-white hover:border-[#016332]/50 hover:bg-[#016332]/[0.02] transition-colors flex items-start gap-2.5 shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#016332]/10 text-[#016332] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                        {way.replace(/^[১-৪]\.\s*/, "")}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#8B111A] bg-[#8B111A]/5 p-2.5 rounded-lg border border-[#8B111A]/15 text-center">
                  {hostelConstruction.closingNote}
                </p>
              </div>

              {/* নির্মাণ প্রকল্পে অনুদান প্রদান ও যোগাযোগ */}
              <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                  <Coins size={17} className="text-[#016332]" />
                  <span>{hostelConstruction.donationNoticeTitle}</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {hostelConstruction.donationNoticeParagraph}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-gray-500 block font-medium">মোবাইল:</span>
                    <a
                      href={`tel:${hostelConstruction.contactDetails.phone}`}
                      className="font-bold text-[#8B111A] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone size={12} />
                      <span>{hostelConstruction.contactDetails.phone}</span>
                    </a>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-gray-500 block font-medium">ই-মেইল:</span>
                    <a
                      href={`mailto:${hostelConstruction.contactDetails.email}`}
                      className="font-bold text-[#016332] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Mail size={12} />
                      <span>{hostelConstruction.contactDetails.email}</span>
                    </a>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-gray-500 block font-medium">ঠিকানা:</span>
                    <span className="font-semibold text-gray-800 block mt-0.5 leading-snug">
                      {hostelConstruction.contactDetails.address}
                    </span>
                  </div>
                </div>

                {/* Important instruction callout */}
                <div className="bg-amber-50 border border-amber-300/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
                  <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-bold">গুরুত্বপূর্ণ নির্দেশনা:</span> {hostelConstruction.donationInstruction}
                  </p>
                </div>
              </div>

              {/* আসুন, নির্মাণকাজে অংশীদার হই & দোয়া */}
              <div className="bg-gradient-to-br from-[#016332]/5 to-[#016332]/10 rounded-xl p-4 sm:p-5 border border-[#016332]/25 space-y-3">
                <h4 className="text-base font-bold text-[#016332]">
                  {hostelConstruction.callToActionTitle}
                </h4>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-justify">
                  {hostelConstruction.callToActionText}
                </p>
                <div className="bg-white p-3.5 rounded-lg border border-emerald-200 shadow-2xs">
                  <p className="text-xs sm:text-sm font-bold text-[#8B111A] text-center leading-relaxed">
                    “{hostelConstruction.duaText}”
                  </p>
                </div>
                <div className="text-right text-xs text-gray-700 pt-2 border-t border-gray-200/80">
                  <p className="font-semibold">{hostelConstruction.signatory.text}</p>
                  <p className="font-bold text-[#016332]">{hostelConstruction.signatory.institution}</p>
                  <p className="text-gray-500">{hostelConstruction.signatory.address}</p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              Section 2: ২. এতিমখানার সরকারি নিবন্ধন
          ================================================================= */}
          <section
            id={registration.id}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden scroll-mt-20"
          >
            <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
              <div className="flex items-center gap-2.5">
                <FileCheck2 size={20} className="text-[#ffd86b]" />
                <h2 className="text-base sm:text-lg font-bold">{registration.title}</h2>
              </div>
              <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                সরকারি সনদ
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                জামিয়া নেছারিয়া ইসলামিয়ার এতিমখানা বিভাগটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সমাজসেবা অধিদপ্তরের অধীনে ১৯৭৬ খ্রিষ্টাব্দ থেকে নিবন্ধিত হয়ে বিশ্বস্ততা ও শৃঙ্খলার সাথে পরিচালিত হয়ে আসছে।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-gray-200 bg-[#FAF7F0] space-y-1">
                  <span className="text-xs text-gray-500 font-semibold block">১. নিবন্ধিত নাম:</span>
                  <p className="text-sm font-bold text-[#8B111A]">
                    {registration.registeredName}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-[#FAF7F0] space-y-1">
                  <span className="text-xs text-gray-500 font-semibold block">২. নিবন্ধনের তারিখ:</span>
                  <p className="text-sm font-bold text-gray-900">
                    {registration.registrationDate}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-[#FAF7F0] space-y-1">
                  <span className="text-xs text-gray-500 font-semibold block">৩. নিবন্ধনকারী কর্তৃপক্ষ:</span>
                  <p className="text-sm font-bold text-[#016332]">
                    {registration.authority}
                  </p>
                </div>

                <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/60 space-y-1">
                  <span className="text-xs text-emerald-800 font-semibold block">৪. সরকারি নিবন্ধন নম্বর:</span>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-extrabold text-[#016332] tracking-wide">
                      {registration.regNumber}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(registration.regNumber, "reg-no")}
                      className="text-xs text-emerald-700 bg-white border border-emerald-200 px-2 py-1 rounded hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "reg-no" ? (
                        <>
                          <Check size={12} />
                          <span>কপি</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>কপি</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              Section 3: ৩. এতিমখানার জন্য সহযোগিতার আবেদন
          ================================================================= */}
          <section
            id={appeal.id}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden scroll-mt-20"
          >
            <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
              <div className="flex items-center gap-2.5">
                <HeartHandshake size={20} className="text-[#ffd86b]" />
                <h2 className="text-base sm:text-lg font-bold">{appeal.title}</h2>
              </div>
              <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                মহতী আবেদন
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              <div className="bg-[#FAF7F0] border-l-4 border-l-[#8B111A] rounded-r-xl p-4 border-y border-r border-gray-200">
                <p className="text-sm sm:text-base font-bold text-[#8B111A] leading-snug">
                  {appeal.salutation}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1.5 leading-relaxed">
                  {appeal.introParagraph}
                </p>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#016332] rounded-full" />
                  <span>{appeal.waysTitle}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {appeal.ways.map((way, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-gray-200 bg-white hover:border-[#016332]/50 hover:bg-[#016332]/[0.02] transition-colors flex items-center gap-3 shadow-2xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#016332]/10 text-[#016332] font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">
                        {way.replace(/^[১-৫]\.\s*/, "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
                <p className="text-xs sm:text-sm font-bold text-[#016332] leading-relaxed">
                  “{appeal.inspiringNote}”
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================
              Section 4: ৪. অনুদানের ফান্ড
          ================================================================= */}
          <section
            id={funds.id}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden scroll-mt-20"
          >
            <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
              <div className="flex items-center gap-2.5">
                <Coins size={20} className="text-[#ffd86b]" />
                <h2 className="text-base sm:text-lg font-bold">{funds.title}</h2>
              </div>
              <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                শরিয়তসম্মত হিসাব
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                জামিয়ায় শরিয়তের বিধান অনুসারে প্রতিটি অনুদানকে আলাদা আলাদা ফান্ডের মাধ্যমে যথাযথ খাতে স্বচ্ছতার সাথে ব্যয় করা হয়:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {funds.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-gray-200/90 bg-gradient-to-br from-[#FAF7F0] to-white space-y-2.5 border-t-4 border-t-[#016332] shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#8B111A]">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#016332] bg-[#016332]/10 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13.5px] text-gray-700 leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================================
              Section 5: ৫. অনুদান পাঠানোর মাধ্যম (বিকাশ ও ব্যাংক হিসাব)
          ================================================================= */}
          <section
            id={paymentMethods.id}
            className="bg-white rounded-2xl border-2 border-[#016332] shadow-md overflow-hidden scroll-mt-20"
          >
            <div className="bg-gradient-to-r from-[#014222] via-[#016332] to-[#014222] text-white px-5 py-4 border-b-2 border-[#D9822B] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Landmark size={22} className="text-[#ffd86b]" />
                <div>
                  <h2 className="text-base sm:text-lg font-bold">
                    {paymentMethods.title}
                  </h2>
                  <span className="text-xs text-amber-200 font-medium">
                    বিকাশ মোবাইল ব্যাংকিং ও সোনালী/কৃষি ব্যাংক হিসাব
                  </span>
                </div>
              </div>
              <span className="text-xs bg-white/15 px-3 py-1 rounded-full border border-white/20 font-semibold">
                স্বীকৃত প্রাতিষ্ঠানিক মাধ্যম
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-6">
              {/* ৫.১ বিকাশ (bKash) */}
              <div className="bg-gradient-to-r from-pink-50 via-rose-50/50 to-pink-50 rounded-2xl border border-pink-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-pink-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      bK
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        {paymentMethods.bkash.title}
                      </h3>
                      <span className="text-[11px] text-pink-700 font-semibold">
                        পার্সোনাল / প্রাতিষ্ঠানিক মোবাইল নম্বর
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(paymentMethods.bkash.number, "bkash-main")}
                    className="inline-flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    {copiedKey === "bkash-main" ? (
                      <>
                        <Check size={13} />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>নম্বর কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-pink-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-medium">বিকাশ মোবাইল নম্বর:</span>
                    <p className="text-lg sm:text-xl font-extrabold text-pink-700 tracking-wider">
                      {paymentMethods.bkash.number}
                    </p>
                  </div>
                  <a
                    href={`tel:${paymentMethods.bkash.number}`}
                    className="text-xs text-gray-700 hover:text-pink-600 font-semibold flex items-center gap-1 bg-pink-50 px-2.5 py-1.5 rounded-md border border-pink-200"
                  >
                    <Phone size={12} />
                    <span>কল করুন</span>
                  </a>
                </div>
              </div>

              {/* Bank Accounts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ৫.২ গোরাবা ফান্ড — সোনালী ব্যাংক */}
                <div className="bg-gradient-to-br from-[#FAF7F0] to-white rounded-2xl border-2 border-emerald-300 p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Landmark size={18} className="text-[#016332]" />
                      <h3 className="text-sm sm:text-base font-bold text-[#016332]">
                        {paymentMethods.gorabaAccount.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      যাকাত ও এতিম কল্যাণ
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-700">
                    <p>
                      <span className="font-bold text-gray-900">ব্যাংকের নাম:</span>{" "}
                      {paymentMethods.gorabaAccount.bankName}
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">শাখা:</span>{" "}
                      {paymentMethods.gorabaAccount.branch}
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">হিসাবের ধরন:</span>{" "}
                      {paymentMethods.gorabaAccount.accountType}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium">হিসাব নম্বর (A/C No):</span>
                      <p className="text-base sm:text-lg font-extrabold text-[#016332] tracking-wider">
                        {paymentMethods.gorabaAccount.accountNumber}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(paymentMethods.gorabaAccount.accountNumber, "goraba-ac")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#016332] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedKey === "goraba-ac" ? (
                        <>
                          <Check size={12} />
                          <span>কপি</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>কপি</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11.5px] text-gray-600 leading-snug">
                    {paymentMethods.gorabaAccount.note}
                  </p>
                </div>

                {/* ৫.৩ সাধারণ ফান্ড — বাংলাদেশ কৃষি ব্যাংক */}
                <div className="bg-gradient-to-br from-[#FAF7F0] to-white rounded-2xl border-2 border-amber-300 p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Landmark size={18} className="text-[#8B111A]" />
                      <h3 className="text-sm sm:text-base font-bold text-[#8B111A]">
                        {paymentMethods.generalAccount.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      সাধারণ ও পরিচালন
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-700">
                    <p>
                      <span className="font-bold text-gray-900">ব্যাংকের নাম:</span>{" "}
                      {paymentMethods.generalAccount.bankName}
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">শাখা:</span>{" "}
                      {paymentMethods.generalAccount.branch}
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">হিসাবের ধরন:</span>{" "}
                      {paymentMethods.generalAccount.accountType}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium">হিসাব নম্বর (A/C No):</span>
                      <p className="text-base sm:text-lg font-extrabold text-[#8B111A] tracking-wider">
                        {paymentMethods.generalAccount.accountNumber}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(paymentMethods.generalAccount.accountNumber, "general-ac")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#8B111A] bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedKey === "general-ac" ? (
                        <>
                          <Check size={12} />
                          <span>কপি</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>কপি</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11.5px] text-gray-600 leading-snug">
                    {paymentMethods.generalAccount.note}
                  </p>
                </div>
              </div>

              {/* Important Instruction Notice */}
              <div className="bg-amber-50 border-l-4 border-l-amber-500 rounded-r-xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold">বিশেষ দ্রষ্টব্য:</span> {paymentMethods.importantNotice}
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================
              Section 6: ৬. যোগাযোগ ও অনুদান নিশ্চিতকরণ
          ================================================================= */}
          <section
            id={contact.id}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden scroll-mt-20"
          >
            <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
              <div className="flex items-center gap-2.5">
                <Phone size={20} className="text-[#ffd86b]" />
                <h2 className="text-base sm:text-lg font-bold">{contact.title}</h2>
              </div>
              <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                যোগাযোগ ডেস্ক
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                অনুদান পাঠানোর পূর্বে হিসাব নিশ্চিতকরণ বা অনুদান পাঠানোর পর মানি রিসিপ্ট সংগ্রহের জন্য নিচের নম্বরে যোগাযোগ করুন:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-xl border border-gray-200 bg-[#FAF7F0] space-y-1">
                  <span className="text-xs text-gray-500 font-semibold block">১. মোবাইল নম্বর:</span>
                  <a
                    href={`tel:${contact.mobile}`}
                    className="text-sm font-bold text-[#8B111A] hover:underline flex items-center gap-1.5"
                  >
                    <Phone size={14} />
                    <span>{contact.mobile}</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-[#FAF7F0] space-y-1">
                  <span className="text-xs text-gray-500 font-semibold block">২. অফিসিয়াল ই-মেইল:</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-bold text-[#016332] hover:underline flex items-center gap-1.5"
                  >
                    <Mail size={14} />
                    <span>{contact.email}</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-[#FAF7F0] space-y-1">
                  <span className="text-xs text-gray-500 font-semibold block">৩. ঠিকানা:</span>
                  <p className="text-xs font-bold text-gray-800 flex items-start gap-1 leading-snug">
                    <MapPin size={14} className="text-[#8B111A] shrink-0 mt-0.5" />
                    <span>{contact.address}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              Section 7: ৭. আসুন, এতিম শিশুদের পাশে দাঁড়াই
          ================================================================= */}
          <section
            id={callToAction.id}
            className="rounded-2xl bg-gradient-to-br from-[#014222] via-[#016332] to-[#0d7841] text-white p-6 sm:p-8 shadow-md border-b-4 border-[#D9822B] scroll-mt-20 space-y-4"
          >
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles size={20} />
              <h2 className="text-lg sm:text-xl font-extrabold">{callToAction.title}</h2>
            </div>

            <p className="text-sm sm:text-base text-gray-100 leading-relaxed max-w-3xl">
              {callToAction.appealText}
            </p>

            <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
              <p className="text-sm sm:text-base font-bold text-amber-200 text-center leading-relaxed">
                “{callToAction.duaText}”
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/20 text-xs sm:text-sm">
              <div className="whitespace-pre-line font-medium text-gray-200">
                <span className="font-bold text-white block">আবেদনক্রমে:</span>
                <span>এতিমখানা পরিচালনা কর্তৃপক্ষ</span>
                <span className="block text-amber-200 font-bold">জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`tel:${contact.mobile}`}
                  className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Phone size={13} />
                  <span>সরাসরি কল করুন</span>
                </a>
                <a
                  href={`#${paymentMethods.id}`}
                  className="inline-flex items-center gap-1.5 bg-white text-[#016332] hover:bg-gray-100 font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Coins size={13} />
                  <span>ব্যাংক ও বিকাশ দেখুন</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

