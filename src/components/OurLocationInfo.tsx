import { siteSettings } from "@/data/siteData";
import { MapPin, Phone, Mail } from "lucide-react";

export default function OurLocationInfo() {
  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header bar matching crimson/magenta accent */}
      <div className="bg-[#b73a4b] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs">
        <MapPin size={16} />
        <span>আমাদের অবস্থান</span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center space-y-2.5">
        <h4 className="font-bold text-base sm:text-lg text-[#8B111A]">
          {siteSettings.nameBn}
        </h4>
        <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-relaxed">
          {siteSettings.address}
        </p>

        <div className="pt-2 space-y-1.5 text-xs sm:text-[13px] text-gray-700">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#8B111A] shrink-0" />
            <span className="font-mono">{siteSettings.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#8B111A] shrink-0" />
            <span>{siteSettings.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

