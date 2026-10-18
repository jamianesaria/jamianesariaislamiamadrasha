"use client";

import { useState } from "react";
import { availableClasses, sampleRoutines } from "@/data/siteData";
import { Calendar, Search } from "lucide-react";

export default function ClassRoutineSection() {
  const [selectedClass, setSelectedClass] = useState<string>("nursery");
  const [searched, setSearched] = useState<boolean>(false);

  const routineData = searched ? sampleRoutines[selectedClass] || [] : [];

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching deep purple from screenshot */}
      <div className="bg-[#371b61] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <Calendar size={18} />
        <span>রুটিন</span>
      </div>

      {/* Filter and Dropdown Controls */}
      <div className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          {/* Left: Search button */}
          <div>
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-1.5 bg-[#371b61] hover:bg-[#251044] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded shadow-xs transition-colors cursor-pointer"
            >
              <Search size={14} />
              <span>অনুসন্ধান</span>
            </button>
          </div>

          {/* Right: Class Select Dropdown matching screenshot */}
          <div className="w-full sm:w-72">
            <label
              htmlFor="class-select"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              শ্রেণী
            </label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSearched(false);
              }}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#371b61] shadow-2xs cursor-pointer"
            >
              {availableClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Routine Display Area / Not Found message matching screenshot */}
        <div className="mt-6 border border-gray-200 rounded overflow-hidden">
          {searched && routineData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#371b61] text-white font-bold">
                    <th className="py-2.5 px-3 border border-purple-900 text-center w-28">বার / দিন</th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center">১ম পিরিয়ড</th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center">২য় পিরিয়ড</th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center">৩য় পিরিয়ড</th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center w-24 bg-purple-950">বিরতি</th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center">৪র্থ পিরিয়ড</th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center">৫ম পিরিয়ড</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center">
                  {routineData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#8B111A] bg-gray-50 border border-gray-200">
                        {row.day}
                      </td>
                      <td className="py-3 px-3 border border-gray-200">{row.period1}</td>
                      <td className="py-3 px-3 border border-gray-200">{row.period2}</td>
                      <td className="py-3 px-3 border border-gray-200">{row.period3}</td>
                      <td className="py-3 px-3 font-semibold text-gray-500 bg-gray-100 border border-gray-200">
                        {row.period4}
                      </td>
                      <td className="py-3 px-3 border border-gray-200">{row.period5}</td>
                      <td className="py-3 px-3 border border-gray-200">{row.period6}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Default "Not Found" state matching the screenshot */
            <div className="py-12 px-4 text-center bg-gray-50/50">
              <p className="text-gray-500 text-sm font-semibold tracking-wide">
                Not Found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

