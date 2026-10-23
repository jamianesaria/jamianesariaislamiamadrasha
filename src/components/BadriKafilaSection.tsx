"use client";

import { useState } from "react";
import { useSubmission } from "@/lib/submissions/useSubmission";
import Link from "next/link";
import { siteSettings as _fallback_siteSettings } from "@/data/navigationData";
import {
  Shield,
  HeartHandshake,
  Award,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  Phone,
  Send,
  Download,
  Flame,
  ChevronRight,
  Clock,
  Building,
  UserCheck,
  Star,
  Compass,
  ArrowRight,
  BadgeCheck,
  ScrollText,
  Landmark,
  Coins,
  Heart,
  Crown,
  Layers,
  HelpCircle,
} from "lucide-react";
import { useEditableData, EditableText } from "@/content/client";


export default function BadriKafilaSection() {
  const siteSettings = useEditableData("siteSettings", _fallback_siteSettings);

  // Interactive Seat Selection
  const [selectedSeat, setSelectedSeat] = useState<number>(313);
  const [seatSearch, setSeatSearch] = useState<string>("");

  // Form states
  const [memberType, setMemberType] = useState<"self" | "deceased">("self");
  const [formData, setFormData] = useState({
    name: "",
    guardianOrApplicant: "",
    phone: "",
    whatsapp: "",
    address: "",
    donationPlan: "annual-3000",
    customAmount: "",
    paymentChannel: "bkash",
    note: "",
    chosenSeatNumber: "৩১৩",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { submit, isSubmitting, error } = useSubmission("/api/badri");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    if (await submit({ ...formData, memberType, chosenSeatNumber: String(selectedSeat) })) setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: "",
      guardianOrApplicant: "",
      phone: "",
      whatsapp: "",
      address: "",
      donationPlan: "annual-3000",
      customAmount: "",
      paymentChannel: "bkash",
      note: "",
      chosenSeatNumber: "৩১৩",
    });
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* =====================================================================
          ১। MONUMENTAL HERO: The Badr 313 Archival Pavilion
      ===================================================================== */}
      <section
        id="intro"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#122216] via-[#013b1e] to-[#0c1a10] text-white p-6 sm:p-12 shadow-2xl border-4 border-[#D9822B]/60"
      >
        {/* Divine Architectural Inset Border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-amber-400/20 pointer-events-none" />

        {/* Floating Ambient Aura */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8 text-center sm:text-left">
          {/* Top Identity Ribbon */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-200">
              <Link href="/" className="hover:text-white transition-colors"><EditableText document="copy.ui.BadriKafilaSection" entry="e1os3r05" fallback={"হোমপেজ"} /></Link>
              <ChevronRight size={12} />
              <span className="text-white font-bold"><EditableText document="copy.ui.BadriKafilaSection" entry="ed9jn9t" fallback={"৩১৩ জন বদরি কাফেলা"} /></span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#8B111A] text-amber-200 border border-amber-300/40 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm">
              <Crown size={13} className="text-amber-300" />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="evg1xku" fallback={"আজীবন দাতা সদস্য প্রকল্প • সর্বমোট ৩১৩ আসন"} /></span>
            </div>
          </div>

          {/* Main Visual Display: Golden Badr Shield & Quranic Typography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            {/* Left 8 Cols: Typography & Description */}
            <div className="lg:col-span-8 space-y-4">
              <p className="font-serif text-sm sm:text-base text-amber-300 tracking-widest"><EditableText document="copy.ui.BadriKafilaSection" entry="e19y8i6v" fallback={"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"} /></p>

              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold text-emerald-200 tracking-wide uppercase"><EditableText document="copy.ui.BadriKafilaSection" entry="ern7soy" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা"} /></span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"><EditableText document="copy.ui.BadriKafilaSection" entry="e10597vt" fallback={"‘৩১৩ জন বদরি কাফেলা’"} /></h1>
                <p className="text-base sm:text-xl font-bold text-amber-300"><EditableText document="copy.ui.BadriKafilaSection" entry="e16064rh" fallback={"বদরের চেতনায় উদ্বুদ্ধ আজীবন দাতা সদস্য উদ্যোগ"} /></p>
              </div>

              {/* Quranic Ayah Card with Ornate Frame */}
              <div className="bg-black/30 backdrop-blur-xs border-l-4 border-[#D9822B] p-4 rounded-r-xl space-y-1 text-left">
                <p className="text-xs sm:text-sm text-emerald-100 font-arabic leading-relaxed italic"><EditableText document="copy.ui.BadriKafilaSection" entry="e1hizw57" fallback={"&quot;وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ&quot;"} /></p>
                <p className="text-[11px] sm:text-xs text-amber-200/90"><EditableText document="copy.ui.BadriKafilaSection" entry="en5q0wz" fallback={"— &quot;আর নিশ্চয়ই আল্লাহ বদরে তোমাদের সাহায্য করেছিলেন যখন তোমরা দুর্বল ছিলে। অতএব আল্লাহকে ভয় কর, যাতে তোমরা শোকরগুজার হতে পার।&quot; (সূরা আলে ইমরান: ১২৩)"} /></p>
              </div>

              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed text-justify pt-1"><EditableText document="copy.ui.BadriKafilaSection" entry="e1fw2ke3" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার সার্বিক উন্নয়ন, দ্বীনি শিক্ষার প্রসার এবং ভবিষ্যৎ অগ্রযাত্রাকে সুদৃঢ় করার লক্ষ্যে "} /><strong><EditableText document="copy.ui.BadriKafilaSection" entry="ezenfzc" fallback={"‘৩১৩ জন বদরি কাফেলা’"} /></strong><EditableText document="copy.ui.BadriKafilaSection" entry="e1tb8y4" fallback={" নামে ৩১৩ জন আজীবন দাতা সদস্যের একটি মহতী উদ্যোগ গ্রহণ করা হয়েছে। এই উদ্যোগের মূল উদ্দেশ্য হলো, দ্বীনি শিক্ষার খেদমতে নিবেদিতপ্রাণ দানশীল ও শুভাকাঙ্ক্ষী ব্যক্তিবর্গকে ঐক্যবদ্ধ করে জামিয়ার উন্নয়ন কার্যক্রমে সম্মিলিতভাবে অবদান রাখা।"} /></p>

              {/* Call to Action Buttons */}
              <div className="pt-3 flex flex-wrap justify-center sm:justify-start gap-3">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#6E0B13] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 border border-amber-300/40"
                >
                  <HeartHandshake size={17} />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="e4y17ss" fallback={"কাফেলার সদস্য হতে আবেদন করুন"} /></span>
                </a>
                <a
                  href="#seat-roster"
                  className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-emerald-500/50 transition-all"
                >
                  <Layers size={16} className="text-amber-300" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="en4y1tq" fallback={"৩১৩ আসনের তাৎপর্য ও তালিকা"} /></span>
                </a>
              </div>
            </div>

            {/* Right 4 Cols: Ornate Golden Shield Emblem */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Outer Rotating Halo */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40 animate-[spin_60s_linear_infinite]" />
                
                {/* Ornate Gold Medallion */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#ffd86b] via-[#d9822b] to-[#7a410b] p-1.5 shadow-[0_0_35px_rgba(217,130,43,0.4)] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0c2214] via-[#023318] to-[#041a0d] p-4 flex flex-col items-center justify-center text-center border-2 border-amber-300/60 relative overflow-hidden">
                    {/* Emblem Crown & Stars */}
                    <div className="flex items-center gap-1 text-amber-300 mb-1">
                      <Star size={12} fill="#fde047" />
                      <Star size={14} fill="#fde047" />
                      <Star size={12} fill="#fde047" />
                    </div>

                    <span className="text-[10px] font-bold text-amber-200 uppercase tracking-widest"><EditableText document="copy.ui.BadriKafilaSection" entry="e1b87kne" fallback={"পবিত্র বদরি সংখ্যা"} /></span>

                    <span className="text-5xl sm:text-6xl font-black text-amber-300 tracking-tight py-1 font-serif drop-shadow-md"><EditableText document="copy.ui.BadriKafilaSection" entry="e1o77k1m" fallback={"৩১৩"} /></span>

                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide"><EditableText document="copy.ui.BadriKafilaSection" entry="e1t1zevi" fallback={"আজীবন সদস্য"} /></span>

                    <span className="text-[10px] text-emerald-200 mt-1 font-semibold border-t border-emerald-700/60 pt-1 w-full"><EditableText document="copy.ui.BadriKafilaSection" entry="e1553tst" fallback={"জামিয়া নেছারিয়া টঙ্গী"} /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ২। INTERACTIVE 313 SEAT ROSTER & EXCLUSIVITY SHOWCASE
      ===================================================================== */}
      <section
        id="seat-roster"
        className="rounded-3xl bg-[#FAF7F0] border-2 border-amber-700/30 p-6 sm:p-10 shadow-lg space-y-6 scroll-mt-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#016332] pb-5">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#016332] px-3 py-0.5 rounded-full uppercase">
              <Shield size={12} />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="eyhipsn" fallback={"নির্ধারিত কোটা • ৩১৩ সদস্য"} /></span>
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-stone-900 pt-1"><EditableText document="copy.ui.BadriKafilaSection" entry="e2zkbr8" fallback={"৩১৩ সদস্যবিশিষ্ট কাফেলার পবিত্র আসন বিন্যাস"} /></h2>
            <p className="text-xs sm:text-sm text-stone-600"><EditableText document="copy.ui.BadriKafilaSection" entry="errsqet" fallback={"জামিয়ার উন্নয়নকল্পে এই সংখ্যাটি নির্ধারিত—এর কম বা বেশি নয়।"} /></p>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 shadow-2xs">
            <span><EditableText document="copy.ui.BadriKafilaSection" entry="exg1p8g" fallback={"নির্বাচিত আসন নং: "} /></span>
            <strong className="text-[#8B111A] font-black text-sm"><EditableText document="copy.ui.BadriKafilaSection" entry="e385tbs" fallback={"#"} />{selectedSeat}</strong>
          </div>
        </div>

        {/* Seat Picker Visual Mosaic */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
            <p><EditableText document="copy.ui.BadriKafilaSection" entry="e14i590i" fallback={"নিচের প্রতীকী আসনগুলো থেকে আপনার পছন্দের বা কাঙ্ক্ষিত আসন নম্বর নির্বাচন করে সরাসরি আবেদন ফরম পূরণ করতে পারেন:"} /></p>
            <div className="flex items-center gap-3 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-700 inline-block" />
                <span><EditableText document="copy.ui.BadriKafilaSection" entry="ep41k3x" fallback={"উন্মুক্ত আসন"} /></span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#8B111A] inline-block" />
                <span><EditableText document="copy.ui.BadriKafilaSection" entry="enl8db3" fallback={"নির্বাচিত আসন"} /></span>
              </span>
            </div>
          </div>

          {/* Quick Seat Selector Grid (Samples of 313 badges) */}
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 gap-1.5 max-h-56 overflow-y-auto p-3 bg-white rounded-2xl border border-stone-200 scrollbar-thin">
            {Array.from({ length: 313 }, (_, i) => i + 1).map((seatNum) => {
              const isSelected = selectedSeat === seatNum;
              return (
                <button
                  key={seatNum}
                  type="button"
                  onClick={() => {
                    setSelectedSeat(seatNum);
                    setFormData((prev) => ({
                      ...prev,
                      chosenSeatNumber: String(seatNum),
                    }));
                  }}
                  className={`py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#8B111A] text-white border-[#8B111A] shadow-xs scale-105"
                      : "bg-[#FAF7F0] text-stone-700 hover:bg-emerald-100 hover:text-emerald-900 border-stone-200"
                  }`}
                  title={`আসন নম্বর #${seatNum}`}
                ><EditableText document="copy.ui.BadriKafilaSection" entry="eoa7rkx" fallback={"#"} />{seatNum}
                </button>
              );
            })}
          </div>

          {/* Selected Seat Callout Banner */}
          <div className="bg-emerald-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-stone-950 font-black text-xl flex items-center justify-center shrink-0 shadow-md"><EditableText document="copy.ui.BadriKafilaSection" entry="e1ycb1g0" fallback={"#"} />{selectedSeat}
              </div>
              <div className="space-y-0.5 text-center sm:text-left">
                <h4 className="font-bold text-sm sm:text-base text-amber-200"><EditableText document="copy.ui.BadriKafilaSection" entry="ey4fywo" fallback={"আপনি ৩১৩ কাফেলার আসন নং #"} />{selectedSeat}<EditableText document="copy.ui.BadriKafilaSection" entry="enl2pna" fallback={" নির্বাচন করেছেন"} /></h4>
                <p className="text-xs text-emerald-100"><EditableText document="copy.ui.BadriKafilaSection" entry="evh8808" fallback={"এই পুণ্য আসনে নিজের অথবা পিতা-মাতার নামে তালিকাভুক্ত হতে এখনই নিচে আবেদন ফরম জমা দিন।"} /></p>
              </div>
            </div>

            <a
              href="#apply"
              className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="e7erq76" fallback={"এই আসনে নিবন্ধন করুন"} /></span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৩। ১. কাফেলাটি ৩১৩ সদস্যবিশিষ্ট হওয়ার ৪টি ঐতিহাসিক রহস্য
          (4 Divine Pillars crafted as Golden Tablets, not flat cards)
      ===================================================================== */}
      <section id="mystery" className="space-y-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#016332] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            <Sparkles size={14} />
            <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1pldc41" fallback={"কোরআন, হাদিস ও ইতিহাসের মহিমা"} /></span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 leading-snug"><EditableText document="copy.ui.BadriKafilaSection" entry="e1k6sd3" fallback={"১. কাফেলাটি ৩১৩ সদস্যবিশিষ্ট হওয়ার রহস্য"} /></h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed"><EditableText document="copy.ui.BadriKafilaSection" entry="e1dn6ddu" fallback={"হাজারো রহস্যে ঘেরা এই মহাবিশ্বের মহান স্রষ্টা ও একচ্ছত্র নিয়ন্ত্রক মহান আল্লাহ। তিনি একক, অদ্বিতীয় ও বিজোড়। তিনি বিজোড় ভালোবাসেন। ‘৩১৩’ একটি ঐতিহাসিক ও আধ্যাত্মিক সংখ্যা। এই বিজোড় সংখ্যাটি প্রভূত বরকতময়, মহিমামণ্ডিত ও নানাবিধ রহস্যে ঘেরা।"} /></p>
        </div>

        {/* 4 Majestic Golden Tablets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Tablet 1: Badr Battlefield */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EE] to-[#F5EEDC] p-7 sm:p-8 border-2 border-amber-600/40 shadow-md space-y-4 flex flex-col justify-between group hover:border-amber-600 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <span className="w-9 h-9 rounded-xl bg-[#016332] text-amber-300 font-black text-sm flex items-center justify-center shadow-xs"><EditableText document="copy.ui.BadriKafilaSection" entry="e2yjit6" fallback={"১.১"} /></span>
                <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100/80 px-3 py-0.5 rounded-full border border-emerald-300"><EditableText document="copy.ui.BadriKafilaSection" entry="e154bt7b" fallback={"বদর প্রান্তর ও ৫,০০০ ফেরেশতা"} /></span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-snug"><EditableText document="copy.ui.BadriKafilaSection" entry="e15mkmoe" fallback={"বদরের যুদ্ধে অংশগ্রহণকারী সাহাবিদের সংখ্যা ৩১৩"} /></h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="euwmq57" fallback={"ইসলামের প্রথম আত্মত্যাগী যুদ্ধ বদর। ঐতিহাসিক এই যুদ্ধে অংশগ্রহণকারী সাহাবিদের সংখ্যা ৩১৩। নিরস্ত্র এই ৩১৩ জন সাহাবিকে সাহায্য করতে নেমে এসেছিলেন পাঁচ হাজার ফেরেশতা। আল্লাহর সাহায্য ও রাসুলের নেতৃত্বে এই যুদ্ধে এক মহাবিজয় ও সাফল্য অর্জিত হয়েছিল। আল্লাহ তাআলা ঘোষণা করেছেন, এই ৩১৩ জনের সব গুনাহ মাফ, তাদের জন্য জান্নাত ওয়াজিব।"} /></p>

              {/* Core takeaways */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-800 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1r6vufj" fallback={"নিরস্ত্র ৩১৩ জন বীর সাহাবির পক্ষে ঐশী সাহায্য"} /></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="esn47n0" fallback={"পাঁচ হাজার ফেরেশতার সরাসরি রণক্ষেত্রে অবতরণ"} /></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1bk4ytm" fallback={"জীবদ্দশাতেই জান্নাত অবধারিত ঘোষণার মহিমা"} /></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-amber-300/80 flex items-center gap-2 text-xs font-bold text-[#8B111A]">
              <BookOpen size={15} />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="e6xm0pn" fallback={"দলীল সূত্র: সূরা আলে ইমরান: ১২৫, বোখারি: ৩৯৮৩, তিরমিজি: ১৫৯৮।"} /></span>
            </div>
          </div>

          {/* Tablet 2: Symbol of Ultimate Victory */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EE] to-[#F5EEDC] p-7 sm:p-8 border-2 border-amber-600/40 shadow-md space-y-4 flex flex-col justify-between group hover:border-amber-600 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <span className="w-9 h-9 rounded-xl bg-[#8B111A] text-amber-300 font-black text-sm flex items-center justify-center shadow-xs"><EditableText document="copy.ui.BadriKafilaSection" entry="evd45co" fallback={"১.২"} /></span>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-3 py-0.5 rounded-full border border-amber-300"><EditableText document="copy.ui.BadriKafilaSection" entry="e14gqytq" fallback={"ঐতিহাসিক বিজয়ের প্রতীক"} /></span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-snug"><EditableText document="copy.ui.BadriKafilaSection" entry="e1m7pt41" fallback={"৩১৩ সংখ্যা বিজয়ের চিরন্তন প্রতীক (বাদশাহ তালুত)"} /></h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="e1dr349i" fallback={"বারা বিন আজেব (রা.) বলেন, আমরা সাহাবায়ে কেরাম আলোচনা করতাম যে, বদর যুদ্ধে অংশগ্রহণকারী সাহাবিদের সংখ্যা এবং জালুতের বিরুদ্ধে লড়াইকারী বিজয়ী বাদশাহ তালুতের সৈন্যসংখ্যা একই পরিমাণ তথা ৩১৩ জন। অর্থাৎ ইসলামের ইতিহাসে ৩১৩ হলো চূড়ান্ত বিজয়ের এক ঐশী শুভ লক্ষণ।"} /></p>

              {/* Core takeaways */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-800 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="esh2bds" fallback={"তালুত বাদশাহ ও বদর মুজাহিদদের সংখ্যার অলৌকিক সামঞ্জস্য"} /></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="eaegcz5" fallback={"বাতিলের বিশাল শক্তির বিপরীতে হকের বিজয়ের নিদর্শন"} /></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-amber-300/80 flex items-center gap-2 text-xs font-bold text-[#8B111A]">
              <BookOpen size={15} />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="esntx59" fallback={"দলীল সূত্র: সহিহ বোখারি: ৩৯৫৯, জামে তিরমিজি: ১৫৯৮।"} /></span>
            </div>
          </div>

          {/* Tablet 3: Blessed Number & Healing/Du'a */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EE] to-[#F5EEDC] p-7 sm:p-8 border-2 border-amber-600/40 shadow-md space-y-4 flex flex-col justify-between group hover:border-amber-600 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <span className="w-9 h-9 rounded-xl bg-[#014222] text-amber-300 font-black text-sm flex items-center justify-center shadow-xs"><EditableText document="copy.ui.BadriKafilaSection" entry="esu4lph" fallback={"১.৩"} /></span>
                <span className="text-[11px] font-bold text-purple-900 bg-purple-100/80 px-3 py-0.5 rounded-full border border-purple-300"><EditableText document="copy.ui.BadriKafilaSection" entry="ejaf8xc" fallback={"বালা-মুসিবত দূরীকরণ আমল"} /></span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-snug"><EditableText document="copy.ui.BadriKafilaSection" entry="e1d18ske" fallback={"৩১৩ একটি বরকতময় সংখ্যা ও দোয়ার পরীক্ষিত অসিলা"} /></h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="e1y5ooek" fallback={"৩১৩ সংখ্যাটি নিঃসন্দেহে বরকতময়। প্রখ্যাত আলেম আল্লামা দাওয়ানি (রহ.) বলেছেন, বদর যুদ্ধে অংশগ্রহণকারী সাহাবিদের নামের অসিলায় আল্লাহর সমীপে দোয়া করলে তা কবুল হয়। উদ্দেশ্য সফল হয়, জটিল রোগ-ব্যাধি ও বালা-মুসিবত দূর হয়। এটি যুগ যুগ ধরে ওলামায়ে কেরামের পরীক্ষিত আমল।"} /></p>

              {/* Core takeaways */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-800 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1thrrkq" fallback={"বদরি সাহাবিদের নামের অসিলায় দোয়া নিশ্চিত কবুল"} /></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="e169dq0v" fallback={"কঠিন ব্যাধি ও বিপদাপদ থেকে মুক্তির পরীক্ষিত আমল"} /></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-amber-300/80 flex items-center gap-2 text-xs font-bold text-[#8B111A]">
              <BookOpen size={15} />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1ir8qfx" fallback={"দলীল সূত্র: সিরাতে হালাবিয়া: খণ্ড ৪, পৃষ্ঠা ৪৮৯।"} /></span>
            </div>
          </div>

          {/* Tablet 4: Imam Mahdi's 313 Officers */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EE] to-[#F5EEDC] p-7 sm:p-8 border-2 border-amber-600/40 shadow-md space-y-4 flex flex-col justify-between group hover:border-amber-600 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <span className="w-9 h-9 rounded-xl bg-[#8B111A] text-amber-300 font-black text-sm flex items-center justify-center shadow-xs"><EditableText document="copy.ui.BadriKafilaSection" entry="etuvqlg" fallback={"১.৪"} /></span>
                <span className="text-[11px] font-bold text-sky-900 bg-sky-100/80 px-3 py-0.5 rounded-full border border-sky-300"><EditableText document="copy.ui.BadriKafilaSection" entry="exnpj9w" fallback={"শেষ জামানার ভবিষ্যদ্বাণী"} /></span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-snug"><EditableText document="copy.ui.BadriKafilaSection" entry="e3aitjn" fallback={"ইমাম মাহদি (আ.)-এর সেনা অফিসার ৩১৩ জন"} /></h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="eqp22jj" fallback={"কিয়ামতের পূর্বে আবির্ভূত হবেন ইমাম মাহদি (আ.)। ইসলাম ও মানবতার শত্রু ইহুদি-খ্রিস্টান ও বাতিল শক্তির বিরুদ্ধে জিহাদ করে তিনি বিজয়ী হবেন। তাঁর বিশেষ বিপ্লবী বাহিনীর শীর্ষ নেতৃত্বে থাকবেন বদর যুদ্ধের সৈন্যসংখ্যার সমপরিমাণ—অর্থাৎ ঠিক ৩১৩ জন নিবেদিতপ্রাণ সেনা অফিসার।"} /></p>

              {/* Core takeaways */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-800 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1n6teb5" fallback={"বদর থেকে কেয়ামত পর্যন্ত দ্বীনি বিপ্লবের কেন্দ্রবিন্দু"} /></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="e19ciqy1" fallback={"ইমাম মাহদির অগ্রবর্তী কাফেলার সদস্যসংখ্যা ৩১৩ জন"} /></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-amber-300/80 flex items-center gap-2 text-xs font-bold text-[#8B111A]">
              <BookOpen size={15} />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="e7p0spk" fallback={"দলীল সূত্র: মুস্তাদরাকে হাকেম: হাদিস নং ৪৬৫৯।"} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৪। ২. কেন এই আয়োজন? (Why This Project?)
          Crafted with Islamic Heritage Banner & Hadith Box
      ===================================================================== */}
      <section
        id="why"
        className="rounded-3xl bg-gradient-to-r from-[#01351b] via-[#014d26] to-[#01351b] text-white p-6 sm:p-11 shadow-xl border-2 border-amber-400/50 space-y-6 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-700 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass size={15} />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="eb1c6cy" fallback={"উদ্দেশ্য, দর্শন ও আহ্বান"} /></span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white"><EditableText document="copy.ui.BadriKafilaSection" entry="e1mcrubh" fallback={"২. কেন এই আয়োজন?"} /></h2>
          </div>
          <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-amber-200 border border-white/20 self-start sm:self-auto"><EditableText document="copy.ui.BadriKafilaSection" entry="evxa3ln" fallback={"জামিয়া নেছারিয়ার দ্বীনি অগ্রযাত্রা"} /></span>
        </div>

        <div className="space-y-4 text-xs sm:text-base text-emerald-50 leading-relaxed text-justify">
          <p className="font-serif text-sm sm:text-base text-amber-200"><EditableText document="copy.ui.BadriKafilaSection" entry="edwqtfh" fallback={"মুহতারাম শুভানুধ্যায়ী ও ধর্মপ্রাণ মুসলমান ভাই ও বোনেরা,"} /></p>
          <p><EditableText document="copy.ui.BadriKafilaSection" entry="ecd9u7d" fallback={"আপনারা জানেন, জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা আল্লাহ তাআলার অশেষ রহমতে আজ একটি বড় শিক্ষাপ্রতিষ্ঠানে পরিণত হয়েছে। এটি ইসলামী সভ্যতা, সংস্কৃতি ও মূল্যবোধের দাওয়াত ছড়িয়ে দিচ্ছে এবং ইসলামবিরোধী শক্তির মোকাবিলায় দৃঢ়ভাবে দায়িত্ব পালন করে আসছে—ইনশাআল্লাহ, এ ধারাবাহিকতা অব্যাহত থাকবে।"} /></p>
          <p><EditableText document="copy.ui.BadriKafilaSection" entry="e1e7bcaa" fallback={"কিন্তু এই প্রতিষ্ঠানের বৃহৎ পরিকল্পনা বাস্তবায়নে প্রয়োজন আপনাদের আন্তরিক দোয়া, ভালোবাসা, সর্বাত্মক সহযোগিতা ও ত্যাগ। "} /><strong><EditableText document="copy.ui.BadriKafilaSection" entry="etxfe4n" fallback={"দরকার বদরি কাফেলার মতো আত্মত্যাগী ও একনিষ্ঠ একদল সুধী মুমিন মুসলমান।"} /></strong>
          </p>

          {/* Prophetic Hadith Callout Block */}
          <div className="bg-black/25 border-l-4 border-amber-400 p-5 rounded-r-2xl space-y-2">
            <p className="text-amber-300 font-arabic text-base sm:text-lg text-center font-bold"><EditableText document="copy.ui.BadriKafilaSection" entry="el0aett" fallback={"&quot;الْمَرْءُ مَعَ مَنْ أَحَبَّ&quot;"} /></p>
            <p className="text-xs sm:text-sm text-center text-white font-medium"><EditableText document="copy.ui.BadriKafilaSection" entry="eb6gswj" fallback={"হাদিস শরিফে এসেছে, জান্নাত কারও আমলের বিনিময়ে নয়; বরং আল্লাহর রহমতের অসিলায় মিলবে। পৃথিবীতে যে যার সাদৃশ্য ও মহব্বত অবলম্বন করবে, পরকালে তাদের হাশর-নাশর হবে একসঙ্গে।"} /></p>
          </div>

          <p className="font-bold text-amber-200 pt-1"><EditableText document="copy.ui.BadriKafilaSection" entry="e1xw4y8m" fallback={"তাই ‘জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা’-এর উন্নয়নকল্পে ‘বদরি কাফেলা’ নামে আজীবন দাতা সদস্যদের জন্য ‘৩১৩’ এই বরকতময় সংখ্যা নির্ধারিত হয়েছে, এর কম বা বেশি নয়। সুতরাং যারা বদরের চেতনায় উদ্বুদ্ধ হয়ে এই জামিয়ার উন্নয়ন প্রচেষ্টায় শরিক হতে ইচ্ছুক, আমরা তাদের স্বাগত জানাই।"} /></p>
        </div>
      </section>

      {/* =====================================================================
          ৫। ৩. আজীবন দাতা সদস্যদের প্রতি আহ্বান & ৪. সদস্য হওয়ার নিয়ম
      ===================================================================== */}
      <section id="rules" className="space-y-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#8B111A] bg-red-50 px-3.5 py-1 rounded-full uppercase border border-red-200"><EditableText document="copy.ui.BadriKafilaSection" entry="e1l8iwm6" fallback={"পবিত্র দায়িত্ব ও আর্থিক কাঠামো"} /></span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e1kj0qgz" fallback={"৩. সদস্যদের প্রতি আহ্বান ও ৪. সদস্য হওয়ার নিয়ম"} /></h2>
        </div>

        {/* 3 Core Pledges Visual Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border-2 border-stone-200 p-6 shadow-xs hover:border-[#016332] transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#016332] font-black text-base flex items-center justify-center"><EditableText document="copy.ui.BadriKafilaSection" entry="ee3aw51" fallback={"১"} /></div>
            <h3 className="font-black text-base text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="eib7ls3" fallback={"জানমালের কোরবানি পেশ"} /></h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="efd7oyl" fallback={"একমাত্র আল্লাহ পাকের সন্তুষ্টির লক্ষ্যে নিজের জানমালের পবিত্র কোরবানি পেশ করা এবং দ্বীনের তরে সম্পদ ব্যয়ে অগ্রণী হওয়া।"} /></p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-stone-200 p-6 shadow-xs hover:border-[#016332] transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-black text-base flex items-center justify-center"><EditableText document="copy.ui.BadriKafilaSection" entry="e1wsuc7i" fallback={"২"} /></div>
            <h3 className="font-black text-base text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e1tnv994" fallback={"মাদরাসার খেদমতে অগ্রণী ভূমিকা"} /></h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="enn7zoc" fallback={"মাদরাসার খেদমত ও উন্নতি সাধনকে নিজের ব্যক্তিগত দায়িত্ব মনে করে সর্বাবস্থায় জামিয়ার উন্নয়নে অগ্রণী ভূমিকা পালন করা।"} /></p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-stone-200 p-6 shadow-xs hover:border-[#016332] transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#8B111A] font-black text-base flex items-center justify-center"><EditableText document="copy.ui.BadriKafilaSection" entry="ehg98h" fallback={"৩"} /></div>
            <h3 className="font-black text-base text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="eyhmoyy" fallback={"পরিবারকে দ্বীনের ওপর পরিচালনা"} /></h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="e1nrybev" fallback={"প্রত্যেক সদস্য নিজেকে এবং নিজের পরিবার ও পরবর্তী প্রজন্মকে সার্বিকভাবে দ্বীনের শাশ্বত বিধানের ওপর পরিচালিত করার চেষ্টা করা।"} /></p>
          </div>
        </div>

        {/* 2-Part Membership Criteria & Donation Accounts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Rules: Member Registry & 3,000 Taka Donation */}
          <div className="bg-[#FAF7F0] rounded-3xl border-2 border-stone-300 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-white bg-[#016332] px-3 py-1 rounded-full uppercase"><EditableText document="copy.ui.BadriKafilaSection" entry="ebvh28n" fallback={"ক. সদস্য নিবন্ধন"} /></span>
                <p className="text-sm font-semibold text-stone-800 pt-2"><EditableText document="copy.ui.BadriKafilaSection" entry="ermexmc" fallback={"আজীবন দাতা সদস্য ফরম পূরণ করে মাদরাসার অফিশিয়াল রেজিস্ট্রি খাতায় নাম লিখিয়ে ‘বদরি কাফেলা’-এর তালিকাভুক্ত হওয়া।"} /></p>
              </div>

              <div className="border-t border-stone-300 pt-4 space-y-1.5">
                <span className="text-xs font-bold text-white bg-[#8B111A] px-3 py-1 rounded-full uppercase"><EditableText document="copy.ui.BadriKafilaSection" entry="e46l2ee" fallback={"খ. বার্ষিক অনুদান"} /></span>
                <p className="text-sm font-semibold text-stone-800 pt-2"><EditableText document="copy.ui.BadriKafilaSection" entry="e1dbiay1" fallback={"মাদরাসার কার্যক্রম সুষ্ঠুভাবে পরিচালনার জন্য প্রত্যেক সদস্য প্রতি বছর ন্যূনতম"} />{" "}
                  <strong className="text-[#8B111A] font-bold text-base"><EditableText document="copy.ui.BadriKafilaSection" entry="eadi3li" fallback={"৩,০০০/- (তিন হাজার) টাকা"} /></strong>{" "}<EditableText document="copy.ui.BadriKafilaSection" entry="e112s8r" fallback={"অনুদান প্রদান করা। অথবা আপনি ইচ্ছা করলে প্রতি মাসে সামর্থ্যমতো নির্দিষ্ট হারে (যেমন: মাসিক ২৫০/- বা তদূর্ধ্ব) অনুদান প্রদান করতে পারেন।"} /></p>
              </div>
            </div>

            <div className="bg-emerald-100/70 rounded-2xl p-4 border border-emerald-300 text-xs text-emerald-950 space-y-1">
              <span className="font-bold block"><EditableText document="copy.ui.BadriKafilaSection" entry="e1941gu0" fallback={"★ মৃত পিতা-মাতার নামেও ফরম পূরণ করা যাবে"} /></span>
              <p className="text-stone-700"><EditableText document="copy.ui.BadriKafilaSection" entry="eb17k8z" fallback={"মৃত পিতা-মাতা বা প্রিয়জনদের মাগফিরাত ও চিরস্থায়ী সদকায়ে জারিয়ার নিয়তে ফরম পূরণ করে এই কাফেলার সদস্যপদ গ্রহণ করা যাবে।"} /></p>
            </div>
          </div>

          {/* Direct Donation Channels with Instant Copy */}
          <div className="bg-white rounded-3xl border-2 border-amber-600/40 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <Coins size={18} className="text-[#016332]" />
              <span><EditableText document="copy.ui.BadriKafilaSection" entry="ec9wanp" fallback={"অনুদান প্রেরণের অফিশিয়াল একাউন্টসমূহ"} /></span>
            </h3>

            <div className="space-y-3">
              {/* bKash */}
              <div className="bg-pink-50/50 rounded-2xl p-3.5 border border-pink-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-pink-700 uppercase"><EditableText document="copy.ui.BadriKafilaSection" entry="e16rd4nw" fallback={"বিকাশ পার্সোনাল (Personal)"} /></span>
                  <p className="font-mono font-black text-sm sm:text-base text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e15j7jg7" fallback={"01716296379"} /></p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("01716296379", "bkash")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-pink-700 bg-white hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-300 transition-colors cursor-pointer"
                >
                  {copiedAccount === "bkash" ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700"><EditableText document="copy.ui.BadriKafilaSection" entry="e5x316d" fallback={"কপি হয়েছে!"} /></span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span><EditableText document="copy.ui.BadriKafilaSection" entry="et8rbq6" fallback={"কপি করুন"} /></span>
                    </>
                  )}
                </button>
              </div>

              {/* Sonali Bank */}
              <div className="bg-emerald-50/50 rounded-2xl p-3.5 border border-emerald-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase"><EditableText document="copy.ui.BadriKafilaSection" entry="e17ggbjl" fallback={"সোনালী ব্যাংক পিএলসি (টঙ্গী শাখা)"} /></span>
                  <p className="text-xs text-stone-600"><EditableText document="copy.ui.BadriKafilaSection" entry="e1rrndll" fallback={"হিসাব: Jamia Nesaria Islamia Madrasha"} /></p>
                  <p className="font-mono font-black text-sm text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e13qwa6s" fallback={"4403002011838"} /></p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("4403002011838", "sonali")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors cursor-pointer"
                >
                  {copiedAccount === "sonali" ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700"><EditableText document="copy.ui.BadriKafilaSection" entry="e1kbu2qr" fallback={"কপি!"} /></span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span><EditableText document="copy.ui.BadriKafilaSection" entry="ezaokn3" fallback={"কপি"} /></span>
                    </>
                  )}
                </button>
              </div>

              {/* Krishi Bank */}
              <div className="bg-emerald-50/50 rounded-2xl p-3.5 border border-emerald-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase"><EditableText document="copy.ui.BadriKafilaSection" entry="efhy238" fallback={"বাংলাদেশ কৃষি ব্যাংক (টঙ্গী শাখা)"} /></span>
                  <p className="text-xs text-stone-600"><EditableText document="copy.ui.BadriKafilaSection" entry="e1j4prv4" fallback={"হিসাব: Jamia Nesaria Islamia Madrasha"} /></p>
                  <p className="font-mono font-black text-sm text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e1qyhbit" fallback={"41160310003046"} /></p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("41160310003046", "krishi")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors cursor-pointer"
                >
                  {copiedAccount === "krishi" ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700"><EditableText document="copy.ui.BadriKafilaSection" entry="e1la146u" fallback={"কপি!"} /></span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span><EditableText document="copy.ui.BadriKafilaSection" entry="e5mni7k" fallback={"কপি"} /></span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 pt-1"><EditableText document="copy.ui.BadriKafilaSection" entry="eue7mrk" fallback={"অনুদান পাঠানোর পর মাদরাসা অফিসে ফোন করে ("} /><strong>{siteSettings.phone}</strong><EditableText document="copy.ui.BadriKafilaSection" entry="e1v6mr31" fallback={") নিশ্চিত করে মানি রিসিট ও সনদ সংগ্রহ করুন।"} /></p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৬। ৫. সদস্যদের প্রতি আমাদের কর্তব্য (Spiritual Commitments)
          Crafted as a Sacred Quranic Rehal & Du'a Pavilion
      ===================================================================== */}
      <section id="commitments" className="space-y-6 scroll-mt-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F0] via-white to-emerald-50 border-2 border-[#016332] p-6 sm:p-10 shadow-lg space-y-6">
          <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#8B111A] uppercase tracking-wider"><EditableText document="copy.ui.BadriKafilaSection" entry="ep9kbvy" fallback={"রূহানি সম্পর্ক ও চিরস্থায়ী দোয়া"} /></span>
              <h2 className="text-xl sm:text-3xl font-black text-stone-900 pt-1"><EditableText document="copy.ui.BadriKafilaSection" entry="e1erxv82" fallback={"৫. আজীবন দাতা সদস্যদের প্রতি আমাদের কর্তব্য"} /></h2>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full font-bold self-start sm:self-auto"><EditableText document="copy.ui.BadriKafilaSection" entry="e68ce9j" fallback={"প্রতিদিন ফজর ও আসরে ছাত্রদের খাস মোনাজাত"} /></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Du'a */}
            <div className="bg-white rounded-2xl border-2 border-emerald-800/30 p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#016332] flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <h3 className="font-black text-lg text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e1fkgy2h" fallback={"প্রতিদিন ফজর ও আসরে সূরা ইয়াসিন ও খতমে খাজেগান"} /></h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="e1i6v7rt" fallback={"প্রতিদিন ফজর ও আসর নামাজের পর "} /><strong><EditableText document="copy.ui.BadriKafilaSection" entry="ere1sfc" fallback={"সূরা ইয়াসিন ও খতমে খাজেগানের দোয়া"} /></strong>{" "}<EditableText document="copy.ui.BadriKafilaSection" entry="e1r6z4wn" fallback={"পড়ে মাদরাসার শত শত এতিম ও কুরআনের তালিবে ইলমদের নিয়ে আজীবন দাতা সদস্যদের জানমাল, সুস্থতা ও সমৃদ্ধির জন্য বিশেষভাবে দোয়া করা হয়।"} /></p>
              </div>

              <div className="pt-3 border-t border-dashed border-stone-200 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <BadgeCheck size={16} />
                <span><EditableText document="copy.ui.BadriKafilaSection" entry="eltdnq3" fallback={"প্রতিদিন মাদরাসায় অবিরত দোয়ার ধারা"} /></span>
              </div>
            </div>

            {/* Janaza & Quran Khatam */}
            <div className="bg-white rounded-2xl border-2 border-amber-800/30 p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="font-black text-lg text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="evztc30" fallback={"ইন্তেকালের পর জানাজায় অংশগ্রহণ ও পূর্ণ কোরআন খতম"} /></h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify"><EditableText document="copy.ui.BadriKafilaSection" entry="e97pakx" fallback={"কোনো সম্মানিত সদস্যের ইন্তেকাল হলে মাদরাসার শিক্ষক ও উলামায়ে কেরাম তাঁর জানাজায় অংশগ্রহণের আপ্রাণ চেষ্টা করবেন। মাদরাসায় সম্পূর্ণ কোরআন খতম করে তাঁর রূহের মাগফিরাত ও পরকালীন শান্তির জন্য বিশেষ মোনাজাত করা হবে, ইনশাআল্লাহ।"} /></p>
              </div>

              <div className="pt-3 border-t border-dashed border-stone-200 text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                <BadgeCheck size={16} />
                <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1ycq0yx" fallback={"আখেরাতে চিরন্তন ক্ষমার পাথেয় ও ইসালে সওয়াব"} /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৭। ‘আজীবন দাতা সদস্য সনদ’ (Official Certificate Display)
      ===================================================================== */}
      <section id="certificate" className="space-y-6 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full uppercase border border-amber-300"><EditableText document="copy.ui.BadriKafilaSection" entry="ecmwd3c" fallback={"দালিলিক স্বীকৃতি ও মর্যাদা"} /></span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="eo0bkxm" fallback={"‘আজীবন দাতা সদস্য সনদ’"} /></h2>
          <p className="text-xs sm:text-sm text-stone-600"><EditableText document="copy.ui.BadriKafilaSection" entry="ege2iro" fallback={"মাদরাসার পক্ষ থেকে প্রত্যেক সম্মানিত সদস্যকে একটি ঐতিহ্যবাহী ও সুদৃশ্য প্রাতিষ্ঠানিক ‘আজীবন দাতা সদস্য সনদ’ প্রদান করা হবে।"} /></p>
        </div>

        {/* Photorealistic Certificate Mockup */}
        <div className="max-w-3xl mx-auto bg-[#FFFDF8] border-8 border-[#2e1c12] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="border-4 border-double border-[#D9822B] p-5 sm:p-8 space-y-5 text-center relative">
            <p className="font-serif text-xs sm:text-sm text-stone-600 tracking-widest font-semibold"><EditableText document="copy.ui.BadriKafilaSection" entry="e1nxg3uq" fallback={"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"} /></p>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-[#014222]"><EditableText document="copy.ui.BadriKafilaSection" entry="e9yws04" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা"} /></h3>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold"><EditableText document="copy.ui.BadriKafilaSection" entry="eusdp8s" fallback={"মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর"} /></p>
              <p className="text-[10px] text-stone-600 font-mono"><EditableText document="copy.ui.BadriKafilaSection" entry="e4c2ozo" fallback={"সমাজসেবা রেজি: ঢ-০৫০৪ | বেফাক রেজি: ১/৭৪৩ | হাইআতুল উলয়া রেজি: ০০৬৮৫"} /></p>
            </div>

            <div className="py-2">
              <span className="inline-block bg-[#8B111A] text-white text-xs sm:text-sm font-black px-6 py-1.5 rounded-sm uppercase tracking-wider shadow-sm"><EditableText document="copy.ui.BadriKafilaSection" entry="e1n4glak" fallback={"আজীবন দাতা সদস্য সনদপত্র"} /></span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-800 leading-relaxed max-w-xl mx-auto">
              <p><EditableText document="copy.ui.BadriKafilaSection" entry="e1nuw5tt" fallback={"এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, জনাব/মরহুম ........................................... জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার সার্বিক উন্নয়ন ও দ্বীনি শিক্ষার অগ্রযাত্রায় গঠিত মহতী "} /><strong><EditableText document="copy.ui.BadriKafilaSection" entry="eilbiu" fallback={"‘৩১৩ জন বদরি কাফেলা’"} /></strong><EditableText document="copy.ui.BadriKafilaSection" entry="ev716dt" fallback={"-এর সম্মানিত আজীবন দাতা সদস্য হিসেবে তালিকাভুক্ত হয়েছেন।"} /></p>
              <p className="italic text-stone-600 font-serif"><EditableText document="copy.ui.BadriKafilaSection" entry="e1dbuiac" fallback={"&quot;মহান আল্লাহ তাঁর এই দানকে কবুল করুন এবং আখেরাতে বদরি সাহাবিদের সাথে হাশর নসিব করুন। আমিন।&quot;"} /></p>
            </div>

            {/* Certificate Signature & Seal Strip */}
            <div className="pt-8 flex items-end justify-between border-t border-dashed border-stone-300 text-xs">
              <div className="text-center space-y-1">
                <span className="font-serif italic text-emerald-800 font-bold block border-b border-stone-400 pb-0.5"><EditableText document="copy.ui.BadriKafilaSection" entry="e1lmhgsu" fallback={"(স্বাক্ষরিত)"} /></span>
                <span className="font-bold text-stone-900 block"><EditableText document="copy.ui.BadriKafilaSection" entry="e41ritg" fallback={"মুহতামিম / সেক্রেটারি"} /></span>
                <span className="text-[10px] text-stone-500 block"><EditableText document="copy.ui.BadriKafilaSection" entry="e371avd" fallback={"জামিয়া পরিচালনা পরিষদ"} /></span>
              </div>

              {/* Center Seal */}
              <div className="w-16 h-16 rounded-full border-2 border-emerald-800 border-dashed flex items-center justify-center text-center p-1 opacity-80 rotate-[-8deg]">
                <span className="text-[8px] font-bold text-emerald-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e2jg1n8" fallback={"জামিয়া নেছারিয়া"} /><br /><EditableText document="copy.ui.BadriKafilaSection" entry="e1org2t4" fallback={"সিলমোহর"} /></span>
              </div>

              <div className="text-center space-y-1">
                <span className="font-serif italic text-emerald-800 font-bold block border-b border-stone-400 pb-0.5"><EditableText document="copy.ui.BadriKafilaSection" entry="e1ejjov3" fallback={"(স্বাক্ষরিত)"} /></span>
                <span className="font-bold text-stone-900 block"><EditableText document="copy.ui.BadriKafilaSection" entry="ejwn7lu" fallback={"সভাপতি"} /></span>
                <span className="text-[10px] text-stone-500 block"><EditableText document="copy.ui.BadriKafilaSection" entry="e1eobpp3" fallback={"জামিয়া পরিচালনা পরিষদ"} /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ৮। অনলাইনে সদস্য আবেদন ফরম (Online Membership Application Form)
      ===================================================================== */}
      <section id="apply" className="space-y-6 scroll-mt-20">
        <div className="bg-[#FAF7F0] border-2 border-emerald-800/40 rounded-3xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto">
          <div className="text-center space-y-2 pb-6 border-b border-stone-300">
            <span className="text-xs font-bold text-white bg-[#016332] px-3.5 py-1 rounded-full uppercase"><EditableText document="copy.ui.BadriKafilaSection" entry="e1pahall" fallback={"সদস্য নিবন্ধন ফরম"} /></span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e1jf4xwc" fallback={"‘বদরি কাফেলা’ আজীবন সদস্য আবেদন"} /></h2>
            <p className="text-xs sm:text-sm text-stone-600"><EditableText document="copy.ui.BadriKafilaSection" entry="e1jbiw25" fallback={"অনলাইনে নিচের তথ্যগুলো পূরণ করে সরাসরি জমা দিন অথবা মাদরাসা কার্যালয়ে এসে ফরম পূরণ করুন।"} /></p>
          </div>

          {formSubmitted ? (
            /* Success confirmation */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#016332] rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-stone-900"><EditableText document="copy.ui.BadriKafilaSection" entry="e6hxg8l" fallback={"আলহামদুলিল্লাহ! আপনার সদস্য আবেদন মাদরাসায় প্রেরিত হয়েছে"} /></h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-md mx-auto"><EditableText document="copy.ui.BadriKafilaSection" entry="ejryxb8" fallback={"সম্মানিত "} /><strong>{formData.name}</strong><EditableText document="copy.ui.BadriKafilaSection" entry="e1izzbt3" fallback={", ৩১৩ জন বদরি কাফেলায় আসন নম্বর"} />{" "}
                <strong><EditableText document="copy.ui.BadriKafilaSection" entry="epg7m4e" fallback={"#"} />{formData.chosenSeatNumber}</strong><EditableText document="copy.ui.BadriKafilaSection" entry="e1k8koin" fallback={"-এর জন্য আপনার আবেদন মাদরাসার দাপ্তরিক রেজিস্ট্রি খাতায় সংরক্ষণ করা হয়েছে। খুব শীঘ্রই মাদরাসা কর্তৃপক্ষ আপনার সাথে যোগাযোগ করবেন।"} /></p>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs text-left space-y-1.5 max-w-md mx-auto">
                <p>
                  <strong><EditableText document="copy.ui.BadriKafilaSection" entry="e1kwrmi8" fallback={"আসন নম্বর:"} /></strong><EditableText document="copy.ui.BadriKafilaSection" entry="ep09uc5" fallback={" #"} />{formData.chosenSeatNumber}
                </p>
                <p>
                  <strong><EditableText document="copy.ui.BadriKafilaSection" entry="e171helw" fallback={"আবেদনকারীর ফোন:"} /></strong> {formData.phone}
                </p>
                <p>
                  <strong><EditableText document="copy.ui.BadriKafilaSection" entry="e19mo7l5" fallback={"অনুদান পরিকল্পনা:"} /></strong>{" "}
                  {formData.donationPlan === "annual-3000"
                    ? "বার্ষিক ৩,০০০/- টাকা"
                    : formData.donationPlan === "monthly-500"
                    ? "মাসিক ৫০০/- টাকা"
                    : formData.customAmount || "ঐচ্ছিক অনুদান"}
                </p>
                <p>
                  <strong><EditableText document="copy.ui.BadriKafilaSection" entry="eq1arku" fallback={"পেমেন্ট মাধ্যম:"} /></strong> {formData.paymentChannel}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="inline-flex items-center gap-1.5 bg-[#8B111A] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm"
                >
                  <Phone size={14} />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="euw8oha" fallback={"মাদরাসায় সরাসরি কল করুন ("} />{siteSettings.phone}<EditableText document="copy.ui.BadriKafilaSection" entry="e1x6e63r" fallback={")"} /></span>
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-stone-600 underline font-semibold cursor-pointer"
                ><EditableText document="copy.ui.BadriKafilaSection" entry="exrx295" fallback={"আরেকটি আবেদন ফরম পূরণ করুন"} /></button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleFormSubmit} className="pt-6 space-y-5">
              {error && <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
              {/* Member Type Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="eg7w741" fallback={"কার নামে সদস্যপদ তালিকাভুক্ত করতে চান? "} /><span className="text-red-600"><EditableText document="copy.ui.BadriKafilaSection" entry="e1geqctl" fallback={"*"} /></span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMemberType("self")}
                    className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      memberType === "self"
                        ? "bg-[#016332] text-white border-[#016332] shadow-xs"
                        : "bg-white text-stone-700 border-stone-300 hover:border-stone-400"
                    }`}
                  >
                    <UserCheck size={16} />
                    <span><EditableText document="copy.ui.BadriKafilaSection" entry="e1h63oog" fallback={"আমার নিজের নামে (জীবিত সদস্য)"} /></span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMemberType("deceased")}
                    className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      memberType === "deceased"
                        ? "bg-[#8B111A] text-white border-[#8B111A] shadow-xs"
                        : "bg-white text-stone-700 border-stone-300 hover:border-stone-400"
                    }`}
                  >
                    <HeartHandshake size={16} />
                    <span><EditableText document="copy.ui.BadriKafilaSection" entry="eh9s7nx" fallback={"মরহুম পিতা-মাতা/অভিভাবকের ইসালে সওয়াবে"} /></span>
                  </button>
                </div>
              </div>

              {/* Chosen Seat Number */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="e9s8n8v" fallback={"কাঙ্ক্ষিত আসন নম্বর (১ হতে ৩১৩)"} /></label>
                <input
                  type="text"
                  value={formData.chosenSeatNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, chosenSeatNumber: e.target.value })
                  }
                  placeholder="যেমন: ৩১৩ বা যে কোনো আসন"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs font-mono font-bold text-[#8B111A]"
                />
              </div>

              {/* Name field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  {memberType === "self" ? "সদস্যের পুরো নাম" : "মরহুম ব্যক্তির পুরো নাম"}{" "}
                  <span className="text-red-600"><EditableText document="copy.ui.BadriKafilaSection" entry="eub61vo" fallback={"*"} /></span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={
                    memberType === "self"
                      ? "যেমন: আলহাজ মোঃ রফিকুল ইসলাম"
                      : "যেমন: মরহুম হাজী আব্দুল কাদের"
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs"
                />
              </div>

              {/* Guardian / Contact Person (if deceased) */}
              {memberType === "deceased" && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="e1pa3rjq" fallback={"আবেদনকারী / ওয়ারিশের নাম ও সম্পর্ক "} /><span className="text-red-600"><EditableText document="copy.ui.BadriKafilaSection" entry="eppct0u" fallback={"*"} /></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guardianOrApplicant}
                    onChange={(e) =>
                      setFormData({ ...formData, guardianOrApplicant: e.target.value })
                    }
                    placeholder="যেমন: মোঃ কামরুল হাসান (মরহুমের বড় ছেলে)"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs"
                  />
                </div>
              )}

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="e1pdu9pr" fallback={"মোবাইল নম্বর "} /><span className="text-red-600"><EditableText document="copy.ui.BadriKafilaSection" entry="e1wyx2oh" fallback={"*"} /></span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="০১XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="ecol2vy" fallback={"হোয়াটসঅ্যাপ নম্বর (প্রবাসীদের জন্য বিশেষ প্রয়োজন)"} /></label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+৮৮০XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="egm9z8a" fallback={"স্থায়ী/বর্তমান ঠিকানা (গ্রাম, থানা, জেলা / প্রবাসীদের দেশের নাম)"} /></label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="যেমন: টঙ্গী, গাজীপুর / রিয়াদ, সৌদি আরব"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs"
                />
              </div>

              {/* Donation Plan */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="e1mue6ki" fallback={"বার্ষিক/মাসিক অনুদানের পরিকল্পনা"} /></label>
                <select
                  value={formData.donationPlan}
                  onChange={(e) => setFormData({ ...formData, donationPlan: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs cursor-pointer"
                >
                  <option value="annual-3000"><EditableText document="copy.ui.BadriKafilaSection" entry="ekdpzzr" fallback={"বার্ষিক এককালীন ৩,০০০/- টাকা (নির্ধারিত ন্যূনতম)"} /></option>
                  <option value="annual-5000"><EditableText document="copy.ui.BadriKafilaSection" entry="ebpzn95" fallback={"বার্ষিক এককালীন ৫,০০০/- টাকা"} /></option>
                  <option value="annual-10000"><EditableText document="copy.ui.BadriKafilaSection" entry="etrfknr" fallback={"বার্ষিক এককালীন ১০,০০০/- টাকা"} /></option>
                  <option value="monthly-250"><EditableText document="copy.ui.BadriKafilaSection" entry="e1lovovp" fallback={"মাসিক ২৫০/- টাকা হারে"} /></option>
                  <option value="monthly-500"><EditableText document="copy.ui.BadriKafilaSection" entry="e2gpm5t" fallback={"মাসিক ৫০০/- টাকা হারে"} /></option>
                  <option value="monthly-1000"><EditableText document="copy.ui.BadriKafilaSection" entry="e4zdh04" fallback={"মাসিক ১,০০০/- টাকা হারে"} /></option>
                  <option value="custom"><EditableText document="copy.ui.BadriKafilaSection" entry="e109n2ju" fallback={"অন্য কোনো অংক (নিচে লিখুন)"} /></option>
                </select>
              </div>

              {formData.donationPlan === "custom" && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="e1c5b8kg" fallback={"আপনার প্রস্তাবিত অনুদানের পরিমাণ (টাকা)"} /></label>
                  <input
                    type="text"
                    value={formData.customAmount}
                    onChange={(e) => setFormData({ ...formData, customAmount: e.target.value })}
                    placeholder="টাকার পরিমাণ লিখুন"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs"
                  />
                </div>
              )}

              {/* Payment Channel Preference */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="e10po30e" fallback={"অনুদান জমাদানের পছন্দের মাধ্যম"} /></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: "bkash", label: "বিকাশ" },
                    { id: "bank-sonali", label: "সোনালী ব্যাংক" },
                    { id: "bank-krishi", label: "কৃষি ব্যাংক" },
                    { id: "office", label: "মাদরাসা অফিস" },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentChannel: ch.id })}
                      className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                        formData.paymentChannel === ch.id
                          ? "bg-[#016332] text-white border-[#016332] shadow-2xs"
                          : "bg-white text-stone-700 border-stone-300 hover:border-stone-400"
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note / Du'a Request */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800"><EditableText document="copy.ui.BadriKafilaSection" entry="e1sr4ybd" fallback={"বিশেষ দোয়ার আবেদন বা কোনো মন্তব্য (যদি থাকে)"} /></label>
                <textarea
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="যেমন: পিতা-মাতার মাগফিরাত ও পরিবারের সুস্থতার জন্য বিশেষ দোয়ার আবেদন..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:border-[#016332] outline-none shadow-2xs resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#8B111A] hover:bg-[#6E0B13] text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-sm cursor-pointer"
                >
                  <Send size={16} />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="eku1z8t" fallback={"আজীবন দাতা সদস্য ফরম জমা দিন"} /></span>
                </button>
              </div>

              <div className="text-center pt-2">
                <a
                  href="/download/badri-kafila-form.pdf"
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#016332] hover:underline"
                >
                  <Download size={13} />
                  <span><EditableText document="copy.ui.BadriKafilaSection" entry="ezxr8ur" fallback={"কাগজের অফিশিয়াল ফরম ডাউনলোড করুন (PDF)"} /></span>
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* =====================================================================
          ৯। শেষ কথা ও মাদরাসা কর্তৃপক্ষের আরজগুজার
      ===================================================================== */}
      <section className="bg-gradient-to-r from-[#2a170d] via-[#3d2315] to-[#2a170d] text-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-amber-600/50 space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-300 bg-amber-950 px-3.5 py-1 rounded-full uppercase border border-amber-700"><EditableText document="copy.ui.BadriKafilaSection" entry="ebkvrf" fallback={"৬. শেষ কথা ও বিনম্র নিবেদন"} /></span>
          <h3 className="text-xl sm:text-2xl font-black text-white"><EditableText document="copy.ui.BadriKafilaSection" entry="eb0fold" fallback={"মাদরাসা কর্তৃপক্ষের আরজগুজার"} /></h3>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed text-justify sm:text-center"><EditableText document="copy.ui.BadriKafilaSection" entry="e1ncgmaz" fallback={"‘বদরি সদস্য’ হওয়ার আবেদন ফরম এই পুস্তিকার শেষে যুক্ত করা হলো। মৃত ব্যক্তিদের নামেও ফরম পূরণ করা যাবে। মেহেরবানি করে আগ্রহী শুভাকাঙ্ক্ষীরা ফরমটি পূরণ করে মাদরাসার দফতরে জমা দেবেন। মাদরাসার পক্ষ থেকে প্রত্যেক সদস্যকে ‘আজীবন দাতা সদস্য সনদ’ প্রদান করা হবে।"} /></p>

          <div className="pt-5 border-t border-amber-800/80 text-center space-y-1">
            <p className="text-xs text-amber-300 uppercase tracking-widest font-bold"><EditableText document="copy.ui.BadriKafilaSection" entry="ew3z90j" fallback={"আরজগুজার"} /></p>
            <p className="text-base sm:text-lg font-black text-white"><EditableText document="copy.ui.BadriKafilaSection" entry="e1hzruap" fallback={"মাদরাসা কর্তৃপক্ষ"} /></p>
            <p className="text-xs sm:text-sm text-amber-200"><EditableText document="copy.ui.BadriKafilaSection" entry="e1bh0jd9" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা"} /></p>
            <p className="text-xs text-amber-300/80"><EditableText document="copy.ui.BadriKafilaSection" entry="e1f4uw4e" fallback={"মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।"} /></p>
            <p className="text-xs text-amber-300/90 font-mono pt-1"><EditableText document="copy.ui.BadriKafilaSection" entry="e12y9uq0" fallback={"জরুরি যোগাযোগ: "} />{siteSettings.phone}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
