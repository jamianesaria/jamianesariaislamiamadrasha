"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { committeeAndFacultyData, siteSettings } from "@/data/siteData";
import {
  Users,
  Heart,
  Phone,
  Copy,
  Check,
  Building2,
  MapPin,
  Sparkles,
  X,
  Search,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

interface CommitteeMemberItem {
  id: number;
  serial: string;
  name: string;
  designation: string;
  mobile: string;
  photo?: string;
  address?: string;
}

export default function ManagingCommitteeSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<CommitteeMemberItem | null>(null);

  const { header, landDonors, managingCommittee, pledge } = committeeAndFacultyData;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredMembers = managingCommittee.members.filter((m) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q) ||
      m.mobile.includes(q)
    );
  });

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
            <Building2 size={14} className="text-amber-300" />
            <span>প্রতিষ্ঠিত: ১৯৬৯ খ্রিষ্টাব্দ | ১৩৭৬ বাংলা | ১৩৮৮ হিজরি</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            পরিচালনা পরিষদ ও জমিদাতাবৃন্দ
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-3xl">
            {header.intro}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full border border-white/15">
              <MapPin size={13} className="text-amber-300" />
              <span>{header.address}</span>
            </span>
            <Link
              href="/teachers"
              className="inline-flex items-center gap-1.5 bg-amber-400 text-gray-900 font-bold px-3 py-1 rounded-full hover:bg-amber-300 transition-colors shadow-xs"
            >
              <GraduationCap size={14} />
              <span>শিক্ষক মণ্ডলীর তালিকা দেখুন</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Counter Summary */}
        <div className="mt-7 pt-5 border-t border-white/15 flex flex-wrap gap-4 text-xs font-semibold">
          <div className="bg-black/20 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
            <Users size={16} className="text-amber-300" />
            <span>পরিচালনা পরিষদ: ১৬ জন বিশিষ্ট ব্যক্তিত্ব</span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
            <Heart size={16} className="text-amber-300" />
            <span>জমিদাতা: ৩ জন চিরস্মরণীয় দাতা</span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. Land Donors (১. জমি দাতা)
      =================================================================== */}
      <section
        id="donors"
        className="bg-white rounded-2xl border-2 border-[#D9822B] shadow-xs overflow-hidden scroll-mt-20"
      >
        <div className="bg-gradient-to-r from-[#750d15] via-[#8B111A] to-[#9e141e] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
          <div className="flex items-center gap-2.5">
            <Heart size={20} className="text-[#ffd86b]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">{landDonors.title}</h2>
              <span className="text-xs text-amber-200 block">{landDonors.subtitle}</span>
            </div>
          </div>
          <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-300/40 px-3 py-1 rounded-full font-bold">
            সদকায়ে জারিয়া
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {landDonors.donors.map((donor) => (
              <div
                key={donor.id}
                className="rounded-2xl border border-amber-200 bg-gradient-to-br from-[#FAF7F0] via-white to-amber-50/40 p-5 space-y-4 relative overflow-hidden shadow-2xs hover:shadow-md transition-all group"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-[#016332] via-[#D9822B] to-[#8B111A] absolute top-0 left-0" />

                <div className="flex items-center gap-3.5">
                  {/* Photo / Avatar with Image on every card */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D9822B] p-0.5 bg-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    <Image
                      src="/avatar-member.svg"
                      alt={donor.name}
                      fill
                      sizes="64px"
                      className="object-cover rounded-full"
                    />
                  </div>

                  <div>
                    <span className="text-[10.5px] font-bold text-[#8B111A] bg-[#8B111A]/10 px-2 py-0.5 rounded-full inline-block mb-1">
                      {donor.badge}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#8B111A] transition-colors leading-tight">
                      {donor.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#016332] mt-0.5">
                      {donor.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {donor.contribution}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border-l-4 border-l-[#D9822B] rounded-r-xl p-4 text-xs sm:text-sm font-bold text-[#8B111A] leading-relaxed text-center shadow-2xs">
            “{landDonors.closingDua}”
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. Managing Committee (২. পরিচালনা পরিষদ)
      =================================================================== */}
      <section
        id="committee"
        className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden scroll-mt-20"
      >
        <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#D9822B]">
          <div className="flex items-center gap-2.5">
            <Users size={22} className="text-[#ffd86b]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">{managingCommittee.title}</h2>
              <span className="text-xs text-amber-200 block">{managingCommittee.subtitle}</span>
            </div>
          </div>
          <span className="text-xs bg-white/15 px-3 py-1 rounded-full border border-white/20 font-bold">
            মোট ১৬ জন সদস্য
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Search Filter for Committee Members */}
          <div className="max-w-md relative">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পরিচালনা পরিষদের সদস্য বা পদবি দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-gray-50/70 focus:bg-white focus:outline-none focus:border-[#016332] text-gray-800"
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

          {/* Grid of 16 Committee Members - Every Card has their photo image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-gray-200/90 p-4.5 space-y-3.5 hover:border-[#016332]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Photo & Badge Header */}
                  <div className="flex items-center gap-3">
                    {/* Member Photo on every single card */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#016332]/40 bg-gray-100 p-0.5 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <Image
                        src="/avatar-member.svg"
                        alt={member.name}
                        fill
                        sizes="56px"
                        className="object-cover rounded-full"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mb-1">
                        ক্রম: {member.serial}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#8B111A] transition-colors leading-snug line-clamp-2">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#016332] mt-0.5 truncate">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Phone & Action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <a
                      href={`tel:${member.mobile}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#8B111A] hover:underline truncate"
                      title="কল করুন"
                    >
                      <Phone size={12} className="shrink-0" />
                      <span className="truncate">{member.mobile}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(member.mobile, `comm-${member.id}`)}
                      className="text-gray-400 hover:text-gray-700 p-1 rounded cursor-pointer"
                      title="নম্বর কপি করুন"
                    >
                      {copiedId === `comm-${member.id}` ? (
                        <Check size={12} className="text-emerald-600" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="shrink-0 text-xs text-[#016332] hover:bg-[#016332]/10 px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer"
                  >
                    বিস্তারিত
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. Pledge & Closing Dua Card
      =================================================================== */}
      <section
        id="pledge"
        className="rounded-2xl bg-gradient-to-br from-[#014222] via-[#016332] to-[#0d7841] text-white p-6 sm:p-8 shadow-md border-b-4 border-[#D9822B] space-y-4"
      >
        <div className="flex items-center gap-2 text-amber-300">
          <Sparkles size={20} />
          <h2 className="text-lg sm:text-xl font-extrabold">{pledge.title}</h2>
        </div>

        <p className="text-sm sm:text-base text-gray-100 leading-relaxed max-w-3xl">
          {pledge.text}
        </p>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
          <p className="text-sm sm:text-base font-bold text-amber-200 text-center leading-relaxed">
            “{pledge.closingDua}”
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/20 text-xs sm:text-sm text-gray-300">
          <div>
            <span className="font-bold text-white block">জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা</span>
            <span>মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন, টঙ্গী, গাজীপুর, বাংলাদেশ।</span>
          </div>

          <a
            href={`tel:${siteSettings.phone}`}
            className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6e0b13] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs self-start sm:self-auto"
          >
            <Phone size={13} />
            <span>যোগাযোগ করুন: {siteSettings.phone}</span>
          </a>
        </div>
      </section>

      {/* ===================================================================
          5. Member Details Modal
      =================================================================== */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D9822B]">
              <span className="font-bold text-sm sm:text-base">পরিচালনা পরিষদ সদস্যের তথ্য</span>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="text-white/80 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 text-sm text-gray-800">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#016332] p-0.5 bg-gray-50 shadow-sm shrink-0">
                  <Image
                    src="/avatar-member.svg"
                    alt={selectedMember.name}
                    fill
                    sizes="64px"
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#8B111A] leading-snug">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs font-bold text-[#016332] mt-0.5">
                    {selectedMember.designation}
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full mt-1">
                    পরিচালনা পরিষদ (সদস্য নং {selectedMember.serial})
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-gray-100 pt-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-[#016332] shrink-0" />
                    <span className="font-semibold text-emerald-950">মোবাইল:</span>
                    <a
                      href={`tel:${selectedMember.mobile}`}
                      className="font-bold text-[#016332] hover:underline"
                    >
                      {selectedMember.mobile}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedMember.mobile, "modal-comm")}
                    className="text-xs font-bold text-[#016332] bg-white border border-emerald-300 px-2.5 py-1 rounded-md hover:bg-emerald-100 cursor-pointer"
                  >
                    {copiedId === "modal-comm" ? "কপি হয়েছে" : "কপি"}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <a
                  href={`tel:${selectedMember.mobile}`}
                  className="inline-flex items-center gap-1.5 bg-[#016332] hover:bg-[#014222] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Phone size={13} />
                  <span>কল করুন</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

