"use client";

import { useState } from "react";
import Link from "next/link";
import type { NoticeFullItem } from "@/data/siteData";
import { EditableText } from "@/content/client";


interface HomeNoticeTabsProps {
  subtitle: string;
  categories: string[];
  records?: NoticeFullItem[];
}

export default function HomeNoticeTabs({ subtitle, categories, records = [] }: HomeNoticeTabsProps) {
  const [activeNoticeTab, setActiveNoticeTab] = useState<number>(0);
  const selectedNotice = records.find((record) => record.categoryKey === ["admission", "exam", "holiday", "general"][activeNoticeTab]);

  return (
    <div className="p-4 sm:p-5 space-y-3.5">
      <p className="text-xs text-gray-600 leading-relaxed">{subtitle}</p>

      {/* 4 Notice Categories */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveNoticeTab(idx)}
            className={`px-3 py-2 text-xs font-bold text-left rounded-md border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeNoticeTab === idx
                ? "bg-[#8B111A] text-white border-[#8B111A] shadow-xs"
                : "bg-[#F9FAF8] text-gray-800 border-gray-200 hover:border-[#016332] hover:bg-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                activeNoticeTab === idx ? "bg-amber-300" : "bg-[#016332]"
              }`}
            />
            <span className="truncate">{cat}</span>
          </button>
        ))}
      </div>

      {/* Active Notice Box */}
      <div className="border border-emerald-200 rounded-lg bg-emerald-50/50 p-4 text-center space-y-2">
        <span className="inline-block text-[11px] font-bold text-[#016332] bg-[#016332]/10 px-2.5 py-0.5 rounded-full">
          {categories[activeNoticeTab]}
        </span>
        <p className="text-xs font-semibold text-gray-800">{selectedNotice?.summary || <EditableText document="copy.ui.HomeNoticeTabs" entry="e1kedexh" fallback={"কেন্দ্রীয় নোটিশ বোর্ডে নতুন ও সর্বশেষ বিজ্ঞপ্তি প্রকাশিত হয়েছে।"} />}</p>
        <Link
          href={selectedNotice ? `/notices?id=${encodeURIComponent(String(selectedNotice.id))}` : "/notices"}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#8B111A] hover:text-[#016332] hover:underline pt-1"
        >
          <span><EditableText document="copy.ui.HomeNoticeTabs" entry="eurn3gt" fallback={"বিস্তারিত প্রজ্ঞাপন ও ডাউনলোড দেখুন →"} /></span>
        </Link>
      </div>
    </div>
  );
}

