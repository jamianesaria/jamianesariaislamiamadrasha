import Link from "next/link";
import { siteSettings, noticeBoard, importantLinks } from "@/data/siteData";
import {
  FileText,
  Video,
  Download,
  Bell,
  ChevronRight,
  Calendar,
  Layers,
  Link as LinkIcon,
  UserCheck,
  HeartHandshake,
} from "lucide-react";
import TimeDateWidget from "./TimeDateWidget";
import AgeCalculatorWidget from "./AgeCalculatorWidget";

export default function RightSidebar() {
  return (
    <aside className="w-full space-y-4">
      {/* 1. Action Buttons */}
      <div className="space-y-2.5">
        <Link
          href={siteSettings.applyUrl}
          className="w-full bg-[#1b5e20] hover:bg-[#154a19] text-white py-3 px-4 rounded font-bold text-center flex items-center justify-center gap-2 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <FileText size={18} />
          <span>অনলাইন ভর্তি আবেদন</span>
        </Link>

        <Link
          href={siteSettings.onlineClassUrl}
          className="w-full bg-[#cc0000] hover:bg-[#a30000] text-white py-3 px-4 rounded font-bold text-center flex items-center justify-center gap-2 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Video size={18} />
          <span>অনলাইন ক্লাস</span>
        </Link>

        <Link
          href={siteSettings.appDownloadUrl}
          className="w-full bg-[#20693a] hover:bg-[#18532d] text-white py-3 px-4 rounded font-bold text-center flex items-center justify-center gap-2 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Download size={18} />
          <span>Download Apps</span>
        </Link>
      </div>

      {/* 2. Notice Board Card */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#788e38] text-white px-4 py-2.5 flex items-center justify-between font-bold text-base shadow-xs">
          <div className="flex items-center gap-2">
            <Bell size={18} />
            <span>নোটিশ বোর্ড</span>
          </div>
          <Link
            href="/notices"
            className="text-xs font-normal underline hover:text-amber-200"
          >
            সকল নোটিশ
          </Link>
        </div>

        <div className="p-3 divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
          {noticeBoard.map((item) => (
            <div key={item.id} className="py-2.5 group">
              <Link
                href={item.link}
                className="text-xs sm:text-[13px] font-medium text-gray-800 group-hover:text-[#8B111A] leading-relaxed flex items-start gap-1.5 transition-colors"
              >
                <ChevronRight
                  size={15}
                  className="shrink-0 text-amber-600 mt-0.5 group-hover:translate-x-0.5 transition-transform"
                />
                <span>{item.title}</span>
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1 pl-5">
                <Calendar size={11} />
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Time & Date Widget */}
      <TimeDateWidget />

      {/* 4. Age Calculation Widget */}
      <AgeCalculatorWidget />

      {/* 5. Content Download Corner Sidebar Card */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#8fae27] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs">
          <Layers size={16} />
          <span>কনটেন্ট ডাউনলোড কর্নার</span>
        </div>
        <div className="p-3">
          <Link
            href="/content-downloads"
            className="w-full bg-[#4a148c] hover:bg-[#380d6b] text-white py-2 px-3 rounded text-xs sm:text-sm font-bold text-center block transition-colors shadow-xs"
          >
            আরও দেখুন
          </Link>
        </div>
      </div>

      {/* 6. Important Links Section */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#8fae27] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs">
          <LinkIcon size={16} />
          <span>গুরুত্বপূর্ণ লিংক</span>
        </div>
        <div className="p-3 space-y-2">
          {importantLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="w-full bg-[#a3c22b] hover:bg-[#8fae27] text-white text-xs sm:text-[13px] font-semibold py-2 px-3 rounded flex items-center gap-2 transition-colors shadow-2xs"
            >
              <ChevronRight size={14} className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Student Info Widget Bar */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#8fae27] text-white px-3.5 py-2.5 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs cursor-pointer hover:bg-[#7e9c20] transition-colors">
          <div className="flex items-center gap-2">
            <UserCheck size={16} />
            <span>শিক্ষার্থীর তথ্য</span>
          </div>
          <ChevronRight size={16} />
        </div>
      </div>

      {/* 8. Overall Cooperation Widget Bar */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#8fae27] text-white px-3.5 py-2.5 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs cursor-pointer hover:bg-[#7e9c20] transition-colors">
          <div className="flex items-center gap-2">
            <HeartHandshake size={16} />
            <span>সার্বিক সহযোগিতায়</span>
          </div>
          <ChevronRight size={16} />
        </div>
      </div>
    </aside>
  );
}
