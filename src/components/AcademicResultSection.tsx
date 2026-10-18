"use client";

import { useState } from "react";
import { availableClasses, academicYears, sampleAcademicResults, StudentResultItem } from "@/data/siteData";
import { Search, Award, CheckCircle2, AlertCircle } from "lucide-react";

export default function AcademicResultSection() {
  const [selectedClass, setSelectedClass] = useState<string>("play");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [searched, setSearched] = useState<boolean>(false);

  const resultKey = `${selectedClass}-${selectedYear}`;
  const results: StudentResultItem[] = searched ? sampleAcademicResults[resultKey] || [] : [];

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <Search size={18} />
        <span>Search results</span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Search Filter Controls matching screenshot: Class, Year, Search button */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          {/* Class Dropdown */}
          <div className="sm:col-span-5">
            <label
              htmlFor="result-class-select"
              className="block text-xs font-bold text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              id="result-class-select"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSearched(false);
              }}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#126b59] shadow-2xs cursor-pointer"
            >
              {availableClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="sm:col-span-5">
            <label
              htmlFor="result-year-select"
              className="block text-xs font-bold text-gray-700 mb-1"
            >
              Year
            </label>
            <select
              id="result-year-select"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSearched(false);
              }}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#126b59] shadow-2xs cursor-pointer"
            >
              {academicYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button matching purple color in screenshot */}
          <div className="sm:col-span-2">
            <button
              onClick={handleSearch}
              className="w-full bg-[#371b61] hover:bg-[#251044] text-white text-xs sm:text-sm font-bold py-2 px-4 rounded shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Results Table Area when Search is clicked */}
        {searched && (
          <div className="mt-6 border border-gray-200 rounded overflow-hidden">
            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#126b59] text-white font-bold">
                      <th className="py-2.5 px-3 border border-teal-800 text-center w-12">#</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center w-20">রোল নং</th>
                      <th className="py-2.5 px-4 border border-teal-800">শিক্ষার্থীর নাম</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center">প্রাপ্ত নম্বর</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center">GPA</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center">গ্রেড</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center">ফলাফল</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-teal-50/30 transition-colors">
                        <td className="py-3 px-3 text-center font-medium text-gray-600 border border-gray-200">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-gray-900 border border-gray-200">
                          {item.roll}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900 border border-gray-200">
                          {item.name}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-medium text-gray-700 border border-gray-200">
                          {item.totalMarks}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-teal-800 border border-gray-200">
                          {item.gpa}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-[#8B111A] border border-gray-200">
                          {item.grade}
                        </td>
                        <td className="py-3 px-3 text-center border border-gray-200">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              item.status === "Pass"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-red-100 text-red-800 border border-red-300"
                            }`}
                          >
                            {item.status === "Pass" ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              <AlertCircle size={12} />
                            )}
                            <span>{item.status === "Pass" ? "উত্তীর্ণ" : "অনুত্তীর্ণ"}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center bg-gray-50/50">
                <Award size={36} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm font-semibold">
                  নির্বাচিত শ্রেণি ও শিক্ষাবর্ষের ফলাফল পাওয়া যায়নি।
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  অনুগ্রহ করে শ্রেণি ও শিক্ষাবর্ষ সঠিকভাবে নির্বাচন করুন।
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

