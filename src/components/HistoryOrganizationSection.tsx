import Image from "next/image";
import { siteSettings, organizationHistoryData } from "@/data/siteData";
import { BookOpen, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default function HistoryOrganizationSection() {
  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <BookOpen size={18} />
        <span>{organizationHistoryData.title}</span>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Center: Madrasa Emblem Logo matching screenshot */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[3px] border-[#8B111A] p-0.5 bg-white shadow-lg ring-4 ring-amber-100/80 relative overflow-hidden mb-4">
            <Image
              src={siteSettings.logoUrl || "/jamia-logo-v2.png"}
              alt={siteSettings.nameBn}
              fill
              sizes="144px"
              className="object-contain p-0 scale-105"
              quality={100}
            />
          </div>

          {/* Titles matching screenshot structure */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#8B111A] tracking-tight">
            {siteSettings.nameBn}
          </h2>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-700 tracking-wider mt-1 uppercase font-sans">
            {siteSettings.nameEn}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm font-semibold text-gray-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Calendar size={14} className="text-[#8B111A]" />
            <span>প্রতিষ্ঠিত: {siteSettings.established}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-gray-500">
            <MapPin size={14} className="text-[#8B111A] shrink-0" />
            <span>{siteSettings.address}</span>
          </div>
        </div>

        {/* Detailed History narrative paragraphs */}
        <div className="space-y-4 pt-6 border-t border-gray-200 text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
          {organizationHistoryData.historyParagraphs.map((para, idx) => (
            <p key={idx} className="indent-6 sm:indent-8">
              {para}
            </p>
          ))}
        </div>

        {/* Feature / Milestone Highlights */}
        <div className="bg-[#FAF8F5] rounded border border-[#E9E4DC] p-5 sm:p-6 mt-6">
          <h4 className="font-bold text-sm sm:text-base text-[#8B111A] mb-3">
            আমাদের লক্ষ্য ও ঐতিহ্যগত বৈশিষ্ট্য:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span>হিফজ ও কওমী সিলেবাসের সাথে যুগোপযোগী জেনারেল শিক্ষার সমন্বয়।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span>আন্তর্জাতিক মানের তাজবিদ ও ক্বেরাত শিক্ষা।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span>অভিজ্ঞ ও নিষ্ঠাবান শিক্ষকমণ্ডলী দ্বারা পাঠদান।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span>আদর্শ চরিত্র গঠন ও নৈতিক মূল্যবোধ চর্চা।</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

