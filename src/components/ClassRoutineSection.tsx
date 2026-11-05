"use client";

import { useState } from "react";
import { availableClasses as _fallback_availableClasses } from "@/data/siteData";
import type { ClassRoutineDocument } from "@/sanity/lib/documents";
import { stegaClean } from "@sanity/client/stega";
import { Calendar, Search } from "lucide-react";
import { useEditableData, EditableText } from "@/content/client";
import PdfDocumentViewer from "./PdfDocumentViewer";

export default function ClassRoutineSection({ records = [] }: { records?: ClassRoutineDocument[] }) {
  const availableClasses = useEditableData("copy.data.availableClasses", _fallback_availableClasses);

  const [selectedClass, setSelectedClass] = useState<string>("nursery");
  const [searched, setSearched] = useState<boolean>(false);
  const [selectedRoutineId, setSelectedRoutineId] = useState<string>("");

  const selectedClassLabel = availableClasses.find((entry) => stegaClean(entry.id) === selectedClass)?.name;
  const specificRoutines = records.filter((item) =>
    stegaClean(item.classId || "") === selectedClass ||
    (!stegaClean(item.classId || "") && selectedClassLabel &&
      stegaClean(item.className || "").toLowerCase() === stegaClean(selectedClassLabel).toLowerCase())
  );
  const matchingRoutines = [...specificRoutines, ...records.filter((item) => stegaClean(item.classId || "") === "all")];
  const routine = matchingRoutines.find((item) => item._id === selectedRoutineId) || matchingRoutines[0];
  const routineData = searched ? routine?.timetableRows || [] : [];
  const selectedClassName =
    availableClasses.find((c) => stegaClean(c.id) === selectedClass)?.name || routine?.className || "শ্রেণি";

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching deep purple from screenshot */}
      <div className="bg-[#371b61] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <Calendar size={18} />
        <span><EditableText document="copy.ui.ClassRoutineSection" entry="e1qzuo57" fallback={"রুটিন"} /></span>
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
              <span><EditableText document="copy.ui.ClassRoutineSection" entry="ek89u7f" fallback={"অনুসন্ধান"} /></span>
            </button>
          </div>

          {/* Right: Class Select Dropdown matching screenshot */}
          <div className="w-full sm:w-72">
            <label
              htmlFor="class-select"
              className="block text-xs font-semibold text-gray-700 mb-1"
            ><EditableText document="copy.ui.ClassRoutineSection" entry="e13jns57" fallback={"শ্রেণী"} /></label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(stegaClean(e.target.value));
              setSelectedRoutineId("");
                setSearched(false);
              }}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#371b61] shadow-2xs cursor-pointer"
            >
              {availableClasses.map((cls) => (
                <option key={cls.id} value={stegaClean(cls.id)}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {matchingRoutines.length > 1 && (
          <label className="block max-w-md text-xs font-bold text-gray-700">
            রুটিন নির্বাচন
            <select value={routine?._id || ""} onChange={(event) => { setSelectedRoutineId(event.target.value); setSearched(true); }} className="block w-full mt-1 border border-gray-300 rounded px-3 py-2 bg-white">
              {matchingRoutines.map((item) => <option key={item._id} value={item._id}>{item.title} ({item.academicYear})</option>)}
            </select>
          </label>
        )}

        {/* Routine Display Area */}
        {searched && !routineData.length && !!routine?.scheduleRows?.length ? (
          <div className="mt-6 border border-gray-200 rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#371b61] text-white font-bold">
                    {["ঘণ্টা", "সময়", "বিষয়", "শিক্ষক", "কক্ষ"].map((label) => (
                      <th key={label} className="py-2.5 px-3 border border-purple-900">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routine.scheduleRows.map((row, index) => (
                    <tr key={row._key || index} className="hover:bg-purple-50/30">
                      {[row.period, row.time, row.subject, row.teacher, row.room].map((text, column) => (
                        <td key={column} className="py-3 px-3 border border-gray-200">{text}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : searched && routineData.length > 0 ? (
          <div className="mt-6 border border-gray-200 rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#371b61] text-white font-bold">
                    <th className="py-2.5 px-3 border border-purple-900 text-center w-28"><EditableText document="copy.ui.ClassRoutineSection" entry="em3ev90" fallback={"বার / দিন"} /></th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center"><EditableText document="copy.ui.ClassRoutineSection" entry="es1tgr3" fallback={"১ম পিরিয়ড"} /></th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center"><EditableText document="copy.ui.ClassRoutineSection" entry="eahe5u6" fallback={"২য় পিরিয়ড"} /></th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center"><EditableText document="copy.ui.ClassRoutineSection" entry="e1fnj6xl" fallback={"৩য় পিরিয়ড"} /></th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center w-24 bg-purple-950"><EditableText document="copy.ui.ClassRoutineSection" entry="e14uqcof" fallback={"বিরতি"} /></th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center"><EditableText document="copy.ui.ClassRoutineSection" entry="efxmhhg" fallback={"৪র্থ পিরিয়ড"} /></th>
                    <th className="py-2.5 px-3 border border-purple-900 text-center"><EditableText document="copy.ui.ClassRoutineSection" entry="es3f9nm" fallback={"৫ম পিরিয়ড"} /></th>
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
          </div>
        ) : searched && !routine?.pdfUrl ? (
          /* Default "Not Found" state matching the screenshot */
          <div className="mt-6 border border-gray-200 rounded overflow-hidden">
            <div className="py-12 px-4 text-center bg-gray-50/50">
              <p className="text-gray-500 text-sm font-semibold tracking-wide"><EditableText document="copy.ui.ClassRoutineSection" entry="e1i7ivyu" fallback={"Not Found"} /></p>
            </div>
          </div>
        ) : null}

        {/* Visual PDF Document Canvas: Displays like a picture and provides download/view */}
        {routine?.pdfUrl && (
          <div className="mt-6">
            <PdfDocumentViewer
              url={stegaClean(routine.pdfUrl)}
              title={`${selectedClassName} — দৈনিক ক্লাস রুটিন (${routine.academicYear || "২০২৬"})`}
              badge="অফিসিয়াল ক্লাস রুটিন PDF"
            />
          </div>
        )}
      </div>
    </div>
  );
}
