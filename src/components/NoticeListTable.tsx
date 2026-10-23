"use client";

import { useState } from "react";
import { noticeListTableData as _fallback_noticeListTableData, NoticeItem } from "@/data/siteData";
import { FileText, Eye, Download, X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEditableData, EditableText } from "@/content/client";


export default function NoticeListTable() {
  const noticeListTableData = useEditableData("copy.data.noticeListTableData", _fallback_noticeListTableData);

  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  // Pagination calculation
  const totalPages = Math.ceil(noticeListTableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = noticeListTableData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <FileText size={18} />
        <span><EditableText document="copy.ui.NoticeListTable" entry="e1ij1oaq" fallback={"নোটিশের তালিকা"} /></span>
      </div>

      {/* Responsive Notice Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100/90 text-gray-700 border-b border-gray-300 font-bold">
              <th className="py-2.5 px-3 w-12 text-center"><EditableText document="copy.ui.NoticeListTable" entry="e84dbim" fallback={"#"} /></th>
              <th className="py-2.5 px-4"><EditableText document="copy.ui.NoticeListTable" entry="e11sa01c" fallback={"নোটিশের নাম"} /></th>
              <th className="py-2.5 px-4 w-36 sm:w-44 text-center"><EditableText document="copy.ui.NoticeListTable" entry="e17xxmj9" fallback={"তারিখ ও সময়"} /></th>
              <th className="py-2.5 px-3 w-24 text-center"><EditableText document="copy.ui.NoticeListTable" entry="eey548i" fallback={"পিডিএফ"} /></th>
              <th className="py-2.5 px-3 w-28 text-center"><EditableText document="copy.ui.NoticeListTable" entry="ek1qbk5" fallback={"দেখুন"} /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentNotices.map((notice, index) => (
              <tr
                key={notice.id}
                className="hover:bg-teal-50/30 transition-colors group"
              >
                {/* 1. # Index */}
                <td className="py-3.5 px-3 text-center font-medium text-gray-600">
                  {indexOfFirstItem + index + 1}
                </td>

                {/* 2. Notice Title */}
                <td className="py-3.5 px-4">
                  <p className="font-semibold text-gray-900 group-hover:text-[#8B111A] transition-colors leading-relaxed">
                    {notice.title}
                  </p>
                </td>

                {/* 3. Date & Time */}
                <td className="py-3.5 px-4 text-center font-mono text-gray-700 whitespace-nowrap text-xs">
                  {notice.dateTime}
                </td>

                {/* 4. PDF Download / View */}
                <td className="py-3.5 px-3 text-center">
                  <a
                    href={notice.pdfUrl || "#"}
                    className="inline-flex items-center justify-center p-1.5 text-red-700 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                    title="পিডিএফ ডাউনলোড করুন"
                    download
                  >
                    <Download size={16} />
                  </a>
                </td>

                {/* 5. See More / দেখুন Button (matching purple button in screenshot) */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="inline-flex items-center justify-center gap-1 bg-[#371b61] hover:bg-[#251044] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-2xs cursor-pointer"
                  >
                    <Eye size={13} />
                    <span><EditableText document="copy.ui.NoticeListTable" entry="egz8jbr" fallback={"আরও দেখুন"} /></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls matching screenshot (1, 2, >) */}
      <div className="p-4 border-t border-gray-200 flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-colors cursor-pointer ${
              currentPage === pageNumber
                ? "bg-[#371b61] text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="bg-[#126b59] text-white px-4 py-3 flex items-center justify-between font-bold">
              <span><EditableText document="copy.ui.NoticeListTable" entry="e1d3ck1l" fallback={"নোটিশের বিস্তারিত"} /></span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-white hover:text-gray-200 p-1"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-sm text-gray-800">
              <h3 className="font-bold text-base text-[#8B111A] leading-snug">
                {selectedNotice.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-500 border-b border-gray-200 pb-2.5">
                <Calendar size={13} className="text-[#126b59]" />
                <span><EditableText document="copy.ui.NoticeListTable" entry="e3799ez" fallback={"প্রকাশের তারিখ: "} />{selectedNotice.dateTime}</span>
              </div>

              {selectedNotice.details && (
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                  {selectedNotice.details}
                </p>
              )}

              <div className="pt-3 flex items-center justify-between border-t border-gray-100">
                <a
                  href={selectedNotice.pdfUrl || "#"}
                  download
                  className="inline-flex items-center gap-1.5 bg-[#8B111A] hover:bg-[#6E0B13] text-white text-xs px-3 py-1.5 rounded transition-colors"
                >
                  <Download size={14} />
                  <span><EditableText document="copy.ui.NoticeListTable" entry="eagqxny" fallback={"পিডিএফ ডাউনলোড"} /></span>
                </a>

                <button
                  onClick={() => setSelectedNotice(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded transition-colors"
                ><EditableText document="copy.ui.NoticeListTable" entry="edcg8y0" fallback={"বন্ধ করুন"} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

