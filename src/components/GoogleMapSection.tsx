import { siteSettings } from "@/data/siteData";
import { Map, ExternalLink } from "lucide-react";

export default function GoogleMapSection() {
  // Embedded Google Map centered on Tongi, Gazipur
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    "Jamia Nesaria Islamia, Morkun, Tongi, Gazipur"
  )}&t=m&z=15&output=embed&iwloc=near`;

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching crimson/magenta accent */}
      <div className="bg-[#b73a4b] text-white px-4 py-2 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <Map size={16} />
          <span>গুগল ম্যাপে আমাদের অবস্থান</span>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী মরকুন গাজীপুর"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white hover:text-amber-200 flex items-center gap-1 font-normal"
        >
          <span>Open in Maps</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Interactive Map Iframe */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 bg-gray-100">
        <iframe
          title="Google Map Location"
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Floating location card overlay matching screenshot aesthetic */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2.5 rounded shadow-md border border-gray-200 max-w-[220px] pointer-events-none hidden sm:block">
          <p className="font-bold text-xs text-[#8B111A] leading-tight">
            {siteSettings.nameBn}
          </p>
          <p className="text-[10px] text-gray-600 mt-1 line-clamp-2">
            {siteSettings.address}
          </p>
        </div>
      </div>
    </div>
  );
}

