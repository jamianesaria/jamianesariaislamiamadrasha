import Link from "next/link";
import { downloadCornerLinks } from "@/data/siteData";
import { Check, ArrowDownToLine } from "lucide-react";

export default function DownloadCorner() {
  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header bar matching maroon crimson */}
      <div className="bg-[#b73a4b] text-white px-4 py-2 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs">
        <span>ডাউনলোড কর্নার</span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex items-center gap-5">
        {/* Left Glowing Cyan / Blue Download Circle Icon matching screenshot */}
        <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-b from-cyan-400 to-sky-700 p-1 flex items-center justify-center shadow-md">
          <div className="w-full h-full rounded-full border-2 border-white/60 flex items-center justify-center bg-sky-600/30 text-white">
            <ArrowDownToLine size={36} className="animate-bounce" />
          </div>
        </div>

        {/* Right download items */}
        <div className="flex-1 space-y-2">
          {downloadCornerLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-2 text-xs sm:text-[13.5px] font-semibold text-gray-800 hover:text-[#8B111A] transition-colors group"
            >
              <Check size={15} className="text-gray-900 font-extrabold group-hover:text-[#8B111A]" />
              <span className="group-hover:underline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

