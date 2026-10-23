import { breakingNews as _fallback_breakingNews } from "@/data/siteData";
import { getEditableData, EditableText } from "@/content/server";


export default async function BreakingNewsBar({ newsItems }: { newsItems?: string[] }) {
  const breakingNews = await getEditableData("copy.data.breakingNews", _fallback_breakingNews);

  const items = newsItems && newsItems.length > 0 ? newsItems : breakingNews;
  return (
    <div className="w-full bg-[#FAF7F0] border-b border-[#e5dfd0] shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center overflow-hidden">
        {/* Label Badge */}
        <div className="bg-gradient-to-r from-[#750d15] to-[#8B111A] text-white px-3.5 sm:px-4 py-2 flex items-center gap-2 shrink-0 z-10 font-bold text-xs sm:text-[13.5px] border-r-2 border-[#D9822B] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse shrink-0" />
          <span><EditableText document="copy.ui.BreakingNewsBar" entry="enoxz1h" fallback={"সর্বশেষ বিজ্ঞপ্তি :"} /></span>
        </div>

        {/* Ticker marquee */}
        <div className="flex-1 overflow-hidden py-2 px-3 bg-white/80">
          <div className="animate-marquee inline-block whitespace-nowrap text-xs sm:text-[13.5px] text-gray-800 font-medium">
            {items.map((news, idx) => (
              <span key={idx} className="mx-6 inline-flex items-center gap-2">
                <span className="text-[#8B111A] font-bold"><EditableText document="copy.ui.BreakingNewsBar" entry="e1q5vv2a" fallback={"❖"} /></span>
                <span>{news}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
