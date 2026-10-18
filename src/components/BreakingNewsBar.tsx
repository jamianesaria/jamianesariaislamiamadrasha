import { breakingNews } from "@/data/siteData";
import { Megaphone } from "lucide-react";

export default function BreakingNewsBar() {
  return (
    <div className="w-full bg-[#FFFDF7] border-b border-amber-200/70">
      <div className="max-w-7xl mx-auto flex items-center overflow-hidden">
        {/* Label Badge */}
        <div className="bg-[#8B111A] text-white px-3.5 sm:px-4 py-1.5 flex items-center gap-1.5 shrink-0 z-10 font-semibold text-xs sm:text-[13px]">
          <Megaphone size={14} className="text-amber-300 animate-pulse shrink-0" />
          <span>বিশেষ ঘোষণা</span>
        </div>

        {/* Ticker marquee */}
        <div className="flex-1 overflow-hidden py-1.5 px-3">
          <div className="animate-marquee inline-block whitespace-nowrap text-xs sm:text-[13.5px] text-gray-700 font-medium">
            {breakingNews.map((news, idx) => (
              <span key={idx} className="mx-6 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#016332] inline-block shrink-0" />
                <span>{news}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
