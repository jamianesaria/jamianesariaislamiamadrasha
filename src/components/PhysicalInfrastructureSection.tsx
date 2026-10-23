
import { siteSettings as _fallback_siteSettings, physicalInfrastructureData as _fallback_physicalInfrastructureData } from "@/data/siteData";
import { Building2, MapPin, Calendar, CheckCircle, ShieldCheck } from "lucide-react";
import { EditableImage as Image, getEditableData, EditableText } from "@/content/server";
import { fieldSource } from "@/content/model";


export default async function PhysicalInfrastructureSection() {
  const siteSettings = await getEditableData("siteSettings", _fallback_siteSettings);
  const physicalInfrastructureData = await getEditableData("copy.data.physicalInfrastructureData", _fallback_physicalInfrastructureData);

  return (
    <article className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#016332] to-[#014222] text-white px-5 py-3.5 flex items-center gap-2.5 font-bold text-sm sm:text-base shadow-xs border-b-2 border-[#D9822B]">
        <Building2 size={18} className="text-[#ffd86b]" />
        <span>{physicalInfrastructureData.title}</span>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Center: Madrasa Logo and Identification */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#8B111A] p-0.5 bg-white shadow-md relative overflow-hidden mb-4">
            <Image document="copy.ui.PhysicalInfrastructureSection" entry="e1kleqqi" source={fieldSource(siteSettings, "logoUrl")}
              src={siteSettings.logoUrl || "/jamia-logo-v2.png"}
              alt={siteSettings.nameBn}
              fill
              sizes="112px"
              className="object-contain p-0 scale-105"
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
            <span><EditableText document="copy.ui.PhysicalInfrastructureSection" entry="e1cxnx7j" fallback={"প্রতিষ্ঠিত: "} />{siteSettings.establishedFull}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-gray-500">
            <MapPin size={14} className="text-[#8B111A] shrink-0" />
            <span>{siteSettings.address}</span>
          </div>
        </div>

        {/* Infrastructure Highlights Grid */}
        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#016332]" />
            <span><EditableText document="copy.ui.PhysicalInfrastructureSection" entry="e2zmkay" fallback={"ভৌত অবকাঠামো ও প্রাতিষ্ঠানিক সুযোগ-সুবিধা"} /></span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {physicalInfrastructureData.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-[#016332]/[0.03] hover:border-[#016332]/30 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={18} className="text-[#016332] shrink-0 mt-0.5" />
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

