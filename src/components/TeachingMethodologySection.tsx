import Image from "next/image";
import Link from "next/link";
import { siteSettings, teachingMethodology } from "@/data/siteData";
import { Volume2, ArrowRight } from "lucide-react";

export default function TeachingMethodologySection() {
  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#244c66] text-white px-4 py-2 flex items-center gap-2 text-sm sm:text-base font-bold shadow-xs">
        <Volume2 size={18} />
        <span>{teachingMethodology.title}</span>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        {/* Left: Emblem/Logo inside circular frame */}
        <div className="shrink-0 flex items-center justify-center p-3 bg-red-50/40 rounded-full border border-red-100 shadow-xs">
          <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-full overflow-hidden border-2 border-[#8B111A] bg-white p-1">
            <Image
              src={siteSettings.logoUrl}
              alt={siteSettings.nameBn}
              fill
              className="object-contain p-1"
            />
          </div>
        </div>

        {/* Right: Points list */}
        <div className="flex-1 space-y-2 text-xs sm:text-[13.5px] text-gray-800 leading-relaxed">
          {teachingMethodology.points.map((pt, idx) => (
            <div key={idx} className="flex items-start gap-1 font-medium">
              <span>{pt}</span>
            </div>
          ))}

          <div className="pt-2">
            <Link
              href={teachingMethodology.link}
              className="inline-flex items-center gap-1 bg-[#244c66] hover:bg-[#193547] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            >
              <span>See More</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

