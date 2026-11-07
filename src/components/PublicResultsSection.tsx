"use client";

import { useMemo, useRef, useState } from "react";
import { FileText, Search, Download, Eye } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";
import type { ResultDocument } from "@/sanity/lib/documents";
import { EditableText } from "@/content/client";
import PdfDocumentViewer from "./PdfDocumentViewer";
import { resultClasses } from "@/data/resultClasses";
import { examTerms } from "@/data/examTerms";

export default function PublicResultsSection({
  records,
  admission = false,
}: {
  records: ResultDocument[];
  admission?: boolean;
}) {
  const [year, setYear] = useState("");
  const [className, setClassName] = useState("");
  const [examTerm, setExamTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const candidates = useMemo(
    () => records.filter((record) => (stegaClean(record.examTerm) === "admission") === admission),
    [records, admission]
  );
  const classLabel = (record: ResultDocument) =>
    (stegaClean(record.classId || "") === "all" ? "সকল শ্রেণি" : "") ||
    resultClasses.find((item) => item.id === stegaClean(record.classId || ""))?.name ||
    stegaClean(record.className || "");
  const years = [...new Set(candidates.map((record) => stegaClean(record.academicYear)))].filter(Boolean);
  const classes = [...new Set(candidates.map(classLabel))].filter(Boolean);
  const results = candidates.filter(
    (record) =>
      (!year || stegaClean(record.academicYear) === year) &&
      (admission || !examTerm || stegaClean(record.examTerm) === examTerm) &&
      (!className || stegaClean(record.classId || "") === "all" || classLabel(record) === className)
  );

  const displayList = searched ? results : candidates;
  const activeRecord =
    (selectedRecordId ? displayList.find((r) => r._id === selectedRecordId) : null) ||
    displayList.find((r) => !!r.meritListPdfUrl) ||
    null;

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base">
        <FileText size={18} />
        <span>
          {admission ? (
            <EditableText
              document="copy.ui.PublicResultsSection"
              entry="e1mas90j"
              fallback="ভর্তি পরীক্ষার ফলাফল"
            />
          ) : (
            <EditableText
              document="copy.ui.PublicResultsSection"
              entry="e8iq4bh"
              fallback="পরীক্ষার ফলাফল ও মেধা তালিকা"
            />
          )}
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Search & Filter Bar */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${admission ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-4 items-end`}>
          <label className="text-xs font-bold text-gray-700">
            <EditableText document="copy.ui.PublicResultsSection" entry="e12m8t49" fallback={"শ্রেণি"} />
            <select
              className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white cursor-pointer"
              value={className}
              onChange={(event) => {
                setClassName(event.target.value);
                setSearched(false);
              }}
            >
              <option value="">
                <EditableText plain document="copy.ui.PublicResultsSection" entry="eeekqg8" fallback={"সব শ্রেণি"} />
              </option>
              {classes.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-bold text-gray-700">
            <EditableText document="copy.ui.PublicResultsSection" entry="e1ag6bkg" fallback={"শিক্ষাবর্ষ"} />
            <select
              className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white cursor-pointer"
              value={year}
              onChange={(event) => {
                setYear(event.target.value);
                setSearched(false);
              }}
            >
              <option value="">
                <EditableText plain document="copy.ui.PublicResultsSection" entry="esj55bf" fallback={"সব শিক্ষাবর্ষ"} />
              </option>
              {years.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          {!admission && (
            <label className="text-xs font-bold text-gray-700">
              <EditableText document="copy.ui.PublicResultsSection" entry="examTermLabel" fallback="পরীক্ষার ধরন" />
              <select
                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white cursor-pointer"
                value={examTerm}
                onChange={(event) => {
                  setExamTerm(event.target.value);
                  setSearched(false);
                }}
              >
                <option value="">
                  <EditableText plain document="copy.ui.PublicResultsSection" entry="allExamTerms" fallback="সব পরীক্ষার ধরন" />
                </option>
                {examTerms.filter((term) => term.value !== "admission").map((term) => (
                  <option key={term.value} value={term.value}>{term.title}</option>
                ))}
              </select>
            </label>
          )}

          <button
            className="inline-flex items-center justify-center gap-2 rounded bg-[#371b61] hover:bg-[#251044] text-white px-5 py-2 text-sm font-semibold transition-colors cursor-pointer"
            onClick={() => setSearched(true)}
          >
            <Search size={16} />
            <EditableText document="copy.ui.PublicResultsSection" entry="evpw8hi" fallback={"অনুসন্ধান"} />
          </button>
        </div>

        {/* Results Data Table */}
        <div className="overflow-x-auto">
          <table className="block w-full border-collapse text-left text-xs sm:table sm:text-sm">
            <thead className="hidden bg-gray-100 sm:table-header-group">
              <tr>
                <th className="p-3 border border-gray-200">
                  <EditableText document="copy.ui.PublicResultsSection" entry="e56ry96" fallback={"ফলাফলের শিরোনাম"} />
                </th>
                <th className="p-3 border border-gray-200">
                  <EditableText document="copy.ui.PublicResultsSection" entry="eef1pnw" fallback={"শ্রেণি / শিক্ষাবর্ষ"} />
                </th>
                <th className="p-3 border border-gray-200 text-center">
                  <EditableText document="copy.ui.PublicResultsSection" entry="e9bgic9" fallback={"অফিসিয়াল প্রকাশনা"} />
                </th>
              </tr>
            </thead>
            <tbody className="block sm:table-row-group">
              {displayList.map((record) => {
                const isSelected = activeRecord?._id === record._id;
                const pdfUrl = record.meritListPdfUrl ? stegaClean(record.meritListPdfUrl) : "";

                return (
                  <tr
                    key={record._id}
                    className={`mb-3 block overflow-hidden rounded-lg border border-gray-200 transition-colors sm:mb-0 sm:table-row sm:overflow-visible sm:rounded-none sm:border-0 ${
                      isSelected ? "bg-emerald-50/50" : "hover:bg-gray-50/80"
                    }`}
                  >
                    <td className="block border-b border-gray-200 px-3 py-2.5 sm:table-cell sm:border sm:p-3">
                      <strong className="break-words text-gray-900">{record.title}</strong>
                      {record.summaryNotes && (
                        <p className="mt-1 text-gray-500 whitespace-pre-wrap text-xs">
                          {record.summaryNotes}
                        </p>
                      )}
                    </td>
                    <td className="block border-b border-gray-200 px-3 py-2.5 text-gray-700 sm:table-cell sm:border sm:p-3 sm:whitespace-nowrap">
                      <span className="font-semibold">{classLabel(record)}</span>
                      <br />
                      <span className="text-xs text-gray-500">{record.academicYear}</span>
                    </td>
                    <td className="block px-3 py-2.5 text-left sm:table-cell sm:border sm:border-gray-200 sm:p-3 sm:text-center sm:whitespace-nowrap">
                      {pdfUrl ? (
                        <div className="flex flex-wrap items-center gap-2 sm:inline-flex">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRecordId(record._id);
                              if (window.matchMedia("(max-width: 639px)").matches) {
                                window.requestAnimationFrame(() =>
                                  previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                                );
                              }
                            }}
                            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#016332] text-white shadow-2xs"
                                : "bg-emerald-100 text-[#016332] hover:bg-emerald-200"
                            }`}
                            title="ফলাফল শিট অনলাইনে দেখুন"
                          >
                            <Eye size={13} />
                            <span>অনলাইনে দেখুন</span>
                          </button>

                          <a
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#8B111A] hover:text-[#6E0B13] bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded transition-colors"
                            href={pdfUrl}
                            download
                            title="ফলাফল PDF ডাউনলোড করুন"
                          >
                            <Download size={13} />
                            <span>ডাউনলোড</span>
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          <EditableText document="copy.ui.PublicResultsSection" entry="e1hg0lj4" fallback={"সংযুক্তি নেই"} />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!displayList.length && (
          <p role="status" className="text-center text-sm text-gray-500 py-10">
            <EditableText
              document="copy.ui.PublicResultsSection"
              entry="esvs9u0"
              fallback={"এই নির্বাচনের কোনো ফলাফল এখনো প্রকাশিত হয়নি।"}
            />
          </p>
        )}

        {/* Visual PDF Document Canvas: Displays like a picture and provides download/view */}
        {activeRecord?.meritListPdfUrl && (
          <div ref={previewRef} className="mt-8 scroll-mt-4 border-t-2 border-[#126b59]/30 pt-6">
            <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-3.5 mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="text-[#016332] shrink-0" size={18} />
                <h3 className="font-bold text-sm sm:text-base text-[#014222]">
                  {activeRecord.title} — পাবলিক ফলাফল শিট
                </h3>
              </div>
              <span className="text-xs font-bold bg-[#014222] text-white px-3 py-1 rounded-full shadow-2xs">
                {classLabel(activeRecord)} ({activeRecord.academicYear})
              </span>
            </div>

            <PdfDocumentViewer
              fitViewport
              url={stegaClean(activeRecord.meritListPdfUrl)}
              title={`${activeRecord.title} - মেধা তালিকা ও ফলাফল`}
              badge="অনুমোদিত ফলাফল ও মেধা তালিকা PDF"
            />
          </div>
        )}
      </div>
    </article>
  );
}
