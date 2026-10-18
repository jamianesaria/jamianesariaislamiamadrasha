import Image from "next/image";
import { siteSettings, physicalInfrastructureData } from "@/data/siteData";
import { Building2, MapPin, Calendar, CheckCircle, ShieldCheck } from "lucide-react";

export default function PhysicalInfrastructureSection() {
  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <Building2 size={18} />
        <span>{physicalInfrastructureData.title}</span>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Center: Madrasa Logo and Identification */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#8B111A] p-1 bg-white shadow-md relative overflow-hidden mb-4">
            <Image
              src={siteSettings.logoUrl}
              alt={siteSettings.nameBn}
              fill
              sizes="112px"
              className="object-contain p-1"
              priority
            />
          </div>

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

        {/* Infrastructure Highlights Grid */}
        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#126b59]" />
            <span>ভৌত অবকাঠামো ও প্রাতিষ্ঠানিক সুযোগ-সুবিধা</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {physicalInfrastructureData.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50/60 hover:bg-teal-50/20 hover:border-teal-200 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={18} className="text-[#126b59] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-[#8B111A]">{feat.title}</h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

