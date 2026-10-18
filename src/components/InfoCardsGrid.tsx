import Link from "next/link";
import { infoCardsData } from "@/data/siteData";
import { Check, Users } from "lucide-react";

export default function InfoCardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {infoCardsData.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col"
        >
          {/* Header Bar matching maroon / deep crimson brand red */}
          <div className="bg-[#b73a4b] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs">
            <span>{card.title}</span>
          </div>

          {/* Body */}
          <div className="p-4 flex items-center gap-4 flex-1">
            {/* Left 3D-like Group Avatars Icon Illustration */}
            <div className="shrink-0 w-20 h-20 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center p-2">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#8B111A] to-rose-400 flex items-center justify-center text-white shadow-sm">
                  <Users size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                  ✓
                </div>
              </div>
            </div>

            {/* Right Links List */}
            <div className="flex-1 space-y-1.5">
              {card.links.map((link, lIdx) => (
                <Link
                  key={lIdx}
                  href={link.href}
                  className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-800 hover:text-[#8B111A] font-medium transition-colors group"
                >
                  <Check
                    size={14}
                    className="text-gray-900 font-extrabold group-hover:text-[#8B111A] shrink-0"
                  />
                  <span className="group-hover:underline">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

