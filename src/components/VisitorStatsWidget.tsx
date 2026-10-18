import { visitorStats } from "@/data/siteData";
import { Globe } from "lucide-react";

export default function VisitorStatsWidget() {
  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Bar matching crimson/magenta accent */}
      <div className="bg-[#b73a4b] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs">
        <Globe size={16} />
        <span>ওয়েবসাইট ভিজিটর তথ্য</span>
      </div>

      {/* Top Bars */}
      <div className="p-4 space-y-3">
        {/* All time visitors */}
        <div>
          <div className="flex justify-between text-xs sm:text-[13px] font-semibold text-gray-700 mb-1">
            <span>সর্বমোট ভিজিটর:</span>
            <span className="font-mono text-gray-900">{visitorStats.allTimeVisitors.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-sky-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>

        {/* Total Hits */}
        <div>
          <div className="flex justify-between text-xs sm:text-[13px] font-semibold text-gray-700 mb-1">
            <span>মোট ভিজিটর (হিটস্):</span>
            <span className="font-mono text-gray-900">{visitorStats.totalHits.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full w-4/5"></div>
          </div>
        </div>
      </div>

      {/* Bottom split columns for Today's Stats */}
      <div className="grid grid-cols-2 border-t border-gray-200 bg-gray-50/70 text-center">
        <div className="py-2.5 px-3 border-r border-gray-200">
          <p className="text-[11px] sm:text-xs text-gray-600 font-medium">আজকের ভিজিটর</p>
          <p className="text-base sm:text-lg font-bold text-gray-800 font-mono mt-0.5">
            {visitorStats.todayVisitors}
          </p>
        </div>
        <div className="py-2.5 px-3">
          <p className="text-[11px] sm:text-xs text-gray-600 font-medium">আজকের সর্বমোট হিট</p>
          <p className="text-base sm:text-lg font-bold text-gray-800 font-mono mt-0.5">
            {visitorStats.todayHits}
          </p>
        </div>
      </div>
    </div>
  );
}

