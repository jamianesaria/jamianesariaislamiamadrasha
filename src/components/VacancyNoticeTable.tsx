"use client";

import { useState } from "react";
import Image from "next/image";
import { siteSettings, vacancyListTableData, VacancyItem } from "@/data/siteData";
import { Briefcase, Calendar, MapPin, X, FileText, Download } from "lucide-react";

export default function VacancyNoticeTable() {
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyItem | null>(null);

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <Briefcase size={18} />
        <span>Vacancy (Notice)</span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Center: Madrasa Logo & Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#8B111A] p-1 bg-white shadow-md relative overflow-hidden mb-3">
            <Image
              src={siteSettings.logoUrl}
              alt={siteSettings.nameBn}
              fill
              sizes="96px"
              className="object-contain p-1"
              priority
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#8B111A]">
            {siteSettings.nameBn}
          </h2>
          <h3 className="text-xs sm:text-sm font-bold text-gray-700 tracking-wider mt-0.5 uppercase font-sans">
            {siteSettings.nameEn}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-gray-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Calendar size={13} className="text-[#8B111A]" />
            <span>প্রতিষ্ঠিত: {siteSettings.established}</span>
          </div>

          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <MapPin size={13} className="text-[#8B111A]" />
            <span>{siteSettings.address}</span>
          </p>
        </div>

        {/* Vacancy Table matching screenshot columns: #, Post name, Posting date, Dateline, View */}
        <div className="border border-gray-200 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100/90 text-gray-700 border-b border-gray-300 font-bold">
                  <th className="py-2.5 px-3 w-12 text-center">#</th>
                  <th className="py-2.5 px-4">Post name</th>
                  <th className="py-2.5 px-4 text-center w-40">Posting date</th>
                  <th className="py-2.5 px-4 text-center w-40">Dateline</th>
                  <th className="py-2.5 px-3 w-28 text-center">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vacancyListTableData.map((vacancy, index) => (
                  <tr
                    key={vacancy.id}
                    className="hover:bg-teal-50/30 transition-colors group"
                  >
                    {/* 1. Index # */}
                    <td className="py-3.5 px-3 text-center font-medium text-gray-600">
                      {index + 1}
                    </td>

                    {/* 2. Post Name */}
                    <td className="py-3.5 px-4 font-semibold text-gray-900 group-hover:text-[#8B111A] transition-colors">
                      {vacancy.postName}
                    </td>

                    {/* 3. Posting Date */}
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600 text-xs">
                      {vacancy.postingDate}
                    </td>

                    {/* 4. Dateline */}
                    <td className="py-3.5 px-4 text-center font-mono text-red-600 font-medium text-xs">
                      {vacancy.dateline}
                    </td>

                    {/* 5. View Details Button matching purple style */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedVacancy(vacancy)}
                        className="inline-flex items-center justify-center gap-1 bg-[#6a1b9a] hover:bg-[#4a148c] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-2xs cursor-pointer"
                      >
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Vacancy Details Modal */}
      {selectedVacancy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            <div className="bg-[#126b59] text-white px-4 py-3 flex items-center justify-between font-bold">
              <span>নিয়োগ বিজ্ঞপ্তির বিস্তারিত</span>
              <button
                onClick={() => setSelectedVacancy(null)}
                className="text-white hover:text-gray-200 p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm text-gray-800">
              <h3 className="font-bold text-base sm:text-lg text-[#8B111A]">
                {selectedVacancy.postName}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                <p>
                  <span className="font-semibold text-gray-800">প্রকাশের তারিখ:</span>{" "}
                  {selectedVacancy.postingDate}
                </p>
                <p>
                  <span className="font-semibold text-red-700">আবেদনের শেষ তারিখ:</span>{" "}
                  {selectedVacancy.dateline}
                </p>
              </div>

              {selectedVacancy.requirements && (
                <div>
                  <h5 className="font-bold text-xs text-gray-700 mb-1">যোগ্যতা ও শর্তাবলী:</h5>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                    {selectedVacancy.requirements}
                  </p>
                </div>
              )}

              {selectedVacancy.salary && (
                <p className="text-xs text-gray-700">
                  <span className="font-semibold">বেতন স্কেল:</span> {selectedVacancy.salary}
                </p>
              )}

              <div className="pt-3 flex items-center justify-between border-t border-gray-100">
                <a
                  href={selectedVacancy.pdfUrl || "#"}
                  download
                  className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6E0B13] text-white text-xs px-3 py-1.5 rounded transition-colors"
                >
                  <Download size={13} />
                  <span>সার্কুলার ডাউনলোড</span>
                </a>

                <button
                  onClick={() => setSelectedVacancy(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

