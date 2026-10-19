import { breakingNews } from "@/data/siteData";

export default function BreakingNewsBar() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center overflow-hidden">
        {/* Label Badge */}
        <div className="bg-[#8B111A] text-white px-3.5 sm:px-4 py-1.5 flex items-center shrink-0 z-10 font-bold text-xs sm:text-[13.5px]">
          <span>সর্বশেষ বিজ্ঞপ্তি :</span>
        </div>

        {/* Ticker marquee */}
        <div className="flex-1 overflow-hidden py-1.5 px-3 bg-[#fdfcf9]">
          <div className="animate-marquee inline-block whitespace-nowrap text-xs sm:text-[13.5px] text-gray-800 font-medium">
            {breakingNews.map((news, idx) => (
              <span key={idx} className="mx-6 inline-flex items-center gap-2">
                <span className="text-[#8B111A] font-bold">▪</span>
                <span>{news}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
