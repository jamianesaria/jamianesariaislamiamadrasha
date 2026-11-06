import InstitutionalIdentity from "./InstitutionalIdentity";

import { organizationHistoryData as _fallback_organizationHistoryData } from "@/data/siteData";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { getEditableData, EditableText } from "@/content/server";


export default async function HistoryOrganizationSection() {
  const organizationHistoryData = await getEditableData("copy.data.organizationHistoryData", _fallback_organizationHistoryData);

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <BookOpen size={18} />
        <span>{organizationHistoryData.title}</span>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Center: Madrasa Emblem Logo matching screenshot */}
        <InstitutionalIdentity />

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
          <h4 className="font-bold text-sm sm:text-base text-[#8B111A] mb-3"><EditableText document="copy.ui.HistoryOrganizationSection" entry="ewzzd14" fallback={"আমাদের লক্ষ্য ও ঐতিহ্যগত বৈশিষ্ট্য:"} /></h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span><EditableText document="copy.ui.HistoryOrganizationSection" entry="e7lsxka" fallback={"হিফজ ও কওমী সিলেবাসের সাথে যুগোপযোগী জেনারেল শিক্ষার সমন্বয়।"} /></span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span><EditableText document="copy.ui.HistoryOrganizationSection" entry="eo1ljlq" fallback={"আন্তর্জাতিক মানের তাজবিদ ও ক্বেরাত শিক্ষা।"} /></span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span><EditableText document="copy.ui.HistoryOrganizationSection" entry="e93g5db" fallback={"অভিজ্ঞ ও নিষ্ঠাবান শিক্ষকমণ্ডলী দ্বারা পাঠদান।"} /></span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#126b59] shrink-0 mt-0.5" />
              <span><EditableText document="copy.ui.HistoryOrganizationSection" entry="ec2jhde" fallback={"আদর্শ চরিত্র গঠন ও নৈতিক মূল্যবোধ চর্চা।"} /></span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

