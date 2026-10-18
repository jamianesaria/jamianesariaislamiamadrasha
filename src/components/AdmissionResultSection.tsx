"use client";

import { useState } from "react";
import { availableClasses, academicYears, sampleAdmissionResults, AdmissionTestResultItem } from "@/data/siteData";
import { Search, UserCheck, Clock, XCircle, FileText, Printer, CheckCircle } from "lucide-react";

export default function AdmissionResultSection() {
  const [selectedClass, setSelectedClass] = useState<string>("play");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [appNumberFilter, setAppNumberFilter] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(true); // default true to show data right away
  const [selectedStudent, setSelectedStudent] = useState<AdmissionTestResultItem | null>(null);

  const resultKey = `${selectedClass}-${selectedYear}`;
  const rawResults: AdmissionTestResultItem[] = sampleAdmissionResults[resultKey] || [];
  
  const results = rawResults.filter((item) => {
    if (!appNumberFilter.trim()) return true;
    return (
      item.applicationNo.toLowerCase().includes(appNumberFilter.toLowerCase().trim()) ||
      item.studentName.toLowerCase().includes(appNumberFilter.toLowerCase().trim())
    );
  });

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from standard theme */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center justify-between font-bold text-sm sm:text-base shadow-xs">
        <div className="flex items-center gap-2">
          <Search size={18} />
          <span>ভর্তি পরীক্ষার ফলাফল অনুসন্ধান (Admission Test Results)</span>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-normal">
          শিক্ষাবর্ষ: ২০২৬
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Search Filter Controls: Class, Year, Application No, Search button */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-gray-50/70 p-4 rounded-lg border border-gray-200">
          {/* Class Dropdown */}
          <div className="sm:col-span-4">
            <label
              htmlFor="admission-class-select"
              className="block text-xs font-bold text-gray-700 mb-1"
            >
              ভর্তিকৃত শ্রেণি (Class)
            </label>
            <select
              id="admission-class-select"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
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
          <div className="sm:col-span-3">
            <label
              htmlFor="admission-year-select"
              className="block text-xs font-bold text-gray-700 mb-1"
            >
              শিক্ষাবর্ষ (Year)
            </label>
            <select
              id="admission-year-select"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
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

          {/* Application No or Student Name filter */}
          <div className="sm:col-span-3">
            <label
              htmlFor="admission-app-input"
              className="block text-xs font-bold text-gray-700 mb-1"
            >
              আবেদন নং / নাম (ঐচ্ছিক)
            </label>
            <input
              id="admission-app-input"
              type="text"
              placeholder="উদা: ADM-2026-001"
              value={appNumberFilter}
              onChange={(e) => setAppNumberFilter(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#126b59] shadow-2xs"
            />
          </div>

          {/* Search Button matching purple theme */}
          <div className="sm:col-span-2">
            <button
              onClick={handleSearch}
              className="w-full bg-[#371b61] hover:bg-[#251044] text-white text-xs sm:text-sm font-bold py-2 px-3 rounded shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search size={14} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Results Area */}
        {searched && (
          <div className="border border-gray-200 rounded overflow-hidden">
            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#126b59] text-white font-bold">
                      <th className="py-2.5 px-3 border border-teal-800 text-center w-12">#</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center w-32">আবেদন নং</th>
                      <th className="py-2.5 px-4 border border-teal-800">শিক্ষার্থীর নাম</th>
                      <th className="py-2.5 px-4 border border-teal-800">পিতার নাম</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center">নম্বর</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center">মেধাক্রম</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center">স্ট্যাটাস</th>
                      <th className="py-2.5 px-3 border border-teal-800 text-center w-24">বিবরণ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-teal-50/30 transition-colors">
                        <td className="py-3 px-3 text-center font-medium text-gray-600 border border-gray-200">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-gray-900 border border-gray-200 bg-gray-50/50">
                          {item.applicationNo}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900 border border-gray-200">
                          {item.studentName}
                        </td>
                        <td className="py-3 px-4 text-gray-700 border border-gray-200">
                          {item.fatherName}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-medium text-gray-800 border border-gray-200">
                          {item.marks} / ১০০
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-[#8B111A] border border-gray-200">
                          {item.meritPosition}তম
                        </td>
                        <td className="py-3 px-3 text-center border border-gray-200">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              item.status === "Selected"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : item.status === "Waiting"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-red-100 text-red-800 border border-red-300"
                            }`}
                          >
                            {item.status === "Selected" && <CheckCircle size={12} />}
                            {item.status === "Waiting" && <Clock size={12} />}
                            {item.status === "Not Selected" && <XCircle size={12} />}
                            <span>
                              {item.status === "Selected"
                                ? "নির্বাচিত"
                                : item.status === "Waiting"
                                ? "অপেক্ষমান"
                                : "অনুত্তীর্ণ"}
                            </span>
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center border border-gray-200">
                          <button
                            onClick={() => setSelectedStudent(item)}
                            className="bg-[#126b59] hover:bg-[#0e5244] text-white text-[11px] font-semibold py-1 px-2.5 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <FileText size={12} />
                            <span>স্লিপ</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center bg-gray-50/50">
                <UserCheck size={36} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm font-semibold">
                  কোনো ভর্তি পরীক্ষার ফলাফল পাওয়া যায়নি।
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  অনুগ্রহ করে শ্রেণি ও শিক্ষাবর্ষ পরিবর্তন করে অথবা সঠিক আবেদন নম্বর লিখে পুনরায় অনুসন্ধান করুন।
                </p>
              </div>
            )}
          </div>
        )}

        {/* Admission Instruction Note */}
        <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded text-xs text-amber-900 space-y-1">
          <p className="font-bold">ভর্তি সংক্রান্ত বিশেষ নির্দেশনাবলী:</p>
          <ul className="list-disc list-inside space-y-0.5 text-amber-800">
            <li>নির্বাচিত শিক্ষার্থীদের নির্ধারিত তারিখের মধ্যে মূল সনদপত্র ও ছবি সহ অফিসে যোগাযোগ করতে হবে।</li>
            <li>অপেক্ষমান তালিকাভুক্ত শিক্ষার্থীদের আসন খালি সাপেক্ষে মেধাক্রম অনুসারে ভর্তির সুযোগ প্রদান করা হবে।</li>
            <li>যেকোনো প্রয়োজনে মাদ্রাসার অফিস কক্ষে সরাসরি অথবা যোগাযোগ নম্বরে যোগাযোগ করুন।</li>
          </ul>
        </div>
      </div>

      {/* Admission Result Card Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#126b59] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <FileText size={18} />
                ভর্তি পরীক্ষার রেজাল্ট কার্ড
              </h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center pb-3 border-b border-gray-100">
                <h4 className="font-bold text-gray-900 text-base">জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী</h4>
                <p className="text-xs text-gray-500">ভর্তি পরীক্ষা ফলাফল শিক্ষাবর্ষ - {selectedStudent.year}</p>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">আবেদনপত্র নং:</span>
                  <span className="font-mono font-bold text-gray-800">{selectedStudent.applicationNo}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">শিক্ষার্থীর নাম:</span>
                  <span className="font-bold text-gray-900">{selectedStudent.studentName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">পিতার নাম:</span>
                  <span className="text-gray-800">{selectedStudent.fatherName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">ভর্তিকৃত শ্রেণি:</span>
                  <span className="font-semibold text-gray-800">{selectedStudent.targetClass}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">প্রাপ্ত নম্বর:</span>
                  <span className="font-mono font-bold text-teal-700">{selectedStudent.marks} / ১০০</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">মেধাক্রম:</span>
                  <span className="font-mono font-bold text-[#8B111A]">{selectedStudent.meritPosition}তম</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">ফলাফল স্ট্যাটাস:</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                      selectedStudent.status === "Selected"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedStudent.status === "Waiting"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedStudent.status === "Selected"
                      ? "নির্বাচিত (Selected)"
                      : selectedStudent.status === "Waiting"
                      ? "অপেক্ষমান (Waiting)"
                      : "অনুত্তীর্ণ"}
                  </span>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer size={14} />
                  <span>প্রিন্ট করুন</span>
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 bg-[#126b59] hover:bg-[#0e5244] text-white py-2 rounded text-xs font-bold transition-colors cursor-pointer"
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

