"use client";

import { useState } from "react";
import { availableClasses as _fallback_availableClasses } from "@/data/siteData";
import type { ExamRoutineDocument } from "@/sanity/lib/documents";
import { stegaClean } from "@sanity/client/stega";
import { GraduationCap, Search, Calendar, Clock, MapPin } from "lucide-react";
import { useEditableData, EditableText } from "@/content/client";


export default function ExamRoutineSection({ records = [] }: { records?: ExamRoutineDocument[] }) {
  const availableClasses = useEditableData("copy.data.availableClasses", _fallback_availableClasses);

  const [selectedClass, setSelectedClass] = useState<string>("play");
  const [searched, setSearched] = useState<boolean>(false);

  const routine = records.find((item) => stegaClean(item.classId || "") === "all" || stegaClean(item.classId || "") === selectedClass || stegaClean(item.className || "").toLowerCase() === availableClasses.find((entry) => entry.id === selectedClass)?.name.toLowerCase());
  const examData = searched ? routine?.examRows || [] : [];

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {routine?.pdfUrl && <a href={stegaClean(routine.pdfUrl)} target="_blank" rel="noreferrer" className="block p-3 text-sm font-semibold text-[#126b59] underline"><EditableText document="copy.ui.ExamRoutineSection" entry="eln59sg" fallback={"অফিসিয়াল পরীক্ষার রুটিন PDF দেখুন"} /></a>}
      {/* Table Header Bar - matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <GraduationCap size={18} />
        <span><EditableText document="copy.ui.ExamRoutineSection" entry="e7ke44o" fallback={"পরীক্ষা রুটিন"} /></span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Class selection dropdown matching screenshot */}
        <div className="max-w-md">
          <label
            htmlFor="exam-class-select"
            className="block text-xs font-bold text-gray-700 mb-1"
          ><EditableText document="copy.ui.ExamRoutineSection" entry="e1n6fqv5" fallback={"শ্রেণী"} /></label>
          <select
            id="exam-class-select"
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

        {/* Search button matching deep purple in screenshot */}
        <div>
          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-1.5 bg-[#371b61] hover:bg-[#251044] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded shadow-xs transition-colors cursor-pointer"
          >
            <Search size={14} />
            <span><EditableText document="copy.ui.ExamRoutineSection" entry="eew35b8" fallback={"অনুসন্ধান"} /></span>
          </button>
        </div>

        {/* Exam Routine Table when searched */}
        {searched && (
          <div className="mt-6 border border-gray-200 rounded overflow-hidden">
            {examData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#126b59] text-white font-bold">
                      <th className="py-2.5 px-3 border border-teal-800 text-center w-14"><EditableText document="copy.ui.ExamRoutineSection" entry="ewm4yb8" fallback={"#"} /></th>
                      <th className="py-2.5 px-4 border border-teal-800"><EditableText document="copy.ui.ExamRoutineSection" entry="e1ntl5hj" fallback={"তারিখ ও বার"} /></th>
                      <th className="py-2.5 px-4 border border-teal-800"><EditableText document="copy.ui.ExamRoutineSection" entry="etp5ybb" fallback={"বিষয়"} /></th>
                      <th className="py-2.5 px-4 border border-teal-800 text-center"><EditableText document="copy.ui.ExamRoutineSection" entry="e7exelv" fallback={"সময়"} /></th>
                      <th className="py-2.5 px-4 border border-teal-800 text-center"><EditableText document="copy.ui.ExamRoutineSection" entry="ej7bnvh" fallback={"কক্ষ নং"} /></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {examData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-teal-50/30 transition-colors">
                        <td className="py-3 px-3 text-center font-medium text-gray-600 border border-gray-200">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900 border border-gray-200">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-[#8B111A] shrink-0" />
                            <span>{item.date}<EditableText document="copy.ui.ExamRoutineSection" entry="e73lu2t" fallback={" ("} />{item.day}<EditableText document="copy.ui.ExamRoutineSection" entry="e15ibplc" fallback={")"} /></span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#8B111A] border border-gray-200">
                          {item.subject}
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-gray-700 border border-gray-200">
                          <div className="flex items-center justify-center gap-1">
                            <Clock size={12} className="text-gray-400 shrink-0" />
                            <span>{item.time}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center text-gray-600 border border-gray-200">
                          <div className="flex items-center justify-center gap-1">
                            <MapPin size={12} className="text-gray-400 shrink-0" />
                            <span>{item.room || "হলরুম"}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-10 text-center bg-gray-50/50">
                <p className="text-gray-500 text-sm font-semibold"><EditableText document="copy.ui.ExamRoutineSection" entry="extuppm" fallback={"নির্বাচিত শ্রেণির পরীক্ষার রুটিন শীঘ্রই প্রকাশিত হবে।"} /></p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

