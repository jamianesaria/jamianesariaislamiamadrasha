"use client";

import { useState } from "react";
import { holidayListTableData as _fallback_holidayListTableData, HolidayItem } from "@/data/siteData";
import { CalendarDays, Eye, X, Calendar, Clock } from "lucide-react";
import { useEditableData, EditableText } from "@/content/client";


export default function HolidayListTable({ records }: { records?: HolidayItem[] }) {
  const holidayListTableData = useEditableData("copy.data.holidayListTableData", _fallback_holidayListTableData);

  const holidays = records ?? holidayListTableData;
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayItem | null>(null);

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Table Header Bar - matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <CalendarDays size={18} />
        <span><EditableText document="copy.ui.HolidayListTable" entry="e1mnznxu" fallback={"ছুটির তালিকা"} /></span>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100/90 text-gray-700 border-b border-gray-300 font-bold">
              <th className="py-2.5 px-3 w-14 text-center"><EditableText document="copy.ui.HolidayListTable" entry="enahrco" fallback={"#"} /></th>
              <th className="py-2.5 px-4"><EditableText document="copy.ui.HolidayListTable" entry="e1qzcp1k" fallback={"ছুটির নাম"} /></th>
              <th className="py-2.5 px-4 text-center sm:w-80"><EditableText document="copy.ui.HolidayListTable" entry="e1wd5i9a" fallback={"তারিখ ও সময়"} /></th>
              <th className="py-2.5 px-3 w-32 text-center"><EditableText document="copy.ui.HolidayListTable" entry="e12t7hkn" fallback={"দেখুন"} /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {holidays.map((holiday, index) => (
              <tr
                key={holiday.id}
                className="hover:bg-teal-50/30 transition-colors group"
              >
                {/* 1. # Index */}
                <td className="py-3.5 px-3 text-center font-medium text-gray-600">
                  {index + 1}
                </td>

                {/* 2. Holiday Title */}
                <td className="py-3.5 px-4">
                  <p className="font-semibold text-gray-900 group-hover:text-[#8B111A] transition-colors leading-relaxed">
                    {holiday.title}
                  </p>
                </td>

                {/* 3. Date & Range */}
                <td className="py-3.5 px-4 text-center font-mono text-gray-700 whitespace-nowrap text-xs">
                  {holiday.dateTime}
                </td>

                {/* 4. Action Button (matching deep purple button in screenshot) */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => setSelectedHoliday(holiday)}
                    className="inline-flex items-center justify-center gap-1 bg-[#371b61] hover:bg-[#251044] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-2xs cursor-pointer"
                  >
                    <Eye size={13} />
                    <span><EditableText document="copy.ui.HolidayListTable" entry="ey4m1wl" fallback={"আরও দেখুন"} /></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Holiday Detail Modal */}
      {selectedHoliday && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="bg-[#126b59] text-white px-4 py-3 flex items-center justify-between font-bold">
              <span><EditableText document="copy.ui.HolidayListTable" entry="e1krpiuu" fallback={"ছুটির বিস্তারিত তথ্য"} /></span>
              <button
                onClick={() => setSelectedHoliday(null)}
                className="text-white hover:text-gray-200 p-1"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-sm text-gray-800">
              <h3 className="font-bold text-base text-[#8B111A] leading-snug">
                {selectedHoliday.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-600 border-y border-gray-200 py-3">
                <Calendar size={14} className="text-[#126b59]" />
                <span className="font-semibold text-gray-800"><EditableText document="copy.ui.HolidayListTable" entry="els6g7x" fallback={"ছুটির সময়কাল:"} /></span>
                <span className="font-mono">{selectedHoliday.dateTime}</span>
              </div>

              {selectedHoliday.description && (
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                  {selectedHoliday.description}
                </p>
              )}

              <div className="pt-2 text-right">
                <button
                  onClick={() => setSelectedHoliday(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded transition-colors"
                ><EditableText document="copy.ui.HolidayListTable" entry="e12mkiiy" fallback={"বন্ধ করুন"} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

