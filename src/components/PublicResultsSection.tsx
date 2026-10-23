"use client";

import { useMemo, useState } from "react";
import { FileText, Search, Download } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";
import type { ResultDocument } from "@/sanity/lib/documents";
import { EditableText } from "@/content/client";


export default function PublicResultsSection({ records, admission = false }: { records: ResultDocument[]; admission?: boolean }) {
  const [year, setYear] = useState("");
  const [className, setClassName] = useState("");
  const [searched, setSearched] = useState(false);
  const candidates = useMemo(() => records.filter((record) => (stegaClean(record.examTerm) === "admission") === admission), [records, admission]);
  const years = [...new Set(candidates.map((record) => stegaClean(record.academicYear)))];
  const classes = [...new Set(candidates.map((record) => stegaClean(record.className)))];
  const results = candidates.filter((record) => (!year || stegaClean(record.academicYear) === year) && (!className || stegaClean(record.className) === className));
  return <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
    <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base"><FileText size={18} /><span>{admission ? <EditableText document="copy.ui.PublicResultsSection" entry="e1mas90j" fallback="ভর্তি পরীক্ষার ফলাফল" /> : <EditableText document="copy.ui.PublicResultsSection" entry="e8iq4bh" fallback="পরীক্ষার ফলাফল ও মেধা তালিকা" />}</span></div>
    <div className="p-4 sm:p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
      <label className="text-xs font-bold text-gray-700"><EditableText document="copy.ui.PublicResultsSection" entry="e12m8t49" fallback={"শ্রেণি"} /><select className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white" value={className} onChange={(event) => { setClassName(event.target.value); setSearched(false); }}><option value=""><EditableText plain document="copy.ui.PublicResultsSection" entry="eeekqg8" fallback={"সব শ্রেণি"} /></option>{classes.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
      <label className="text-xs font-bold text-gray-700"><EditableText document="copy.ui.PublicResultsSection" entry="e1ag6bkg" fallback={"শিক্ষাবর্ষ"} /><select className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white" value={year} onChange={(event) => { setYear(event.target.value); setSearched(false); }}><option value=""><EditableText plain document="copy.ui.PublicResultsSection" entry="esj55bf" fallback={"সব শিক্ষাবর্ষ"} /></option>{years.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
      <button className="inline-flex items-center justify-center gap-2 rounded bg-[#371b61] text-white px-5 py-2 text-sm font-semibold" onClick={() => setSearched(true)}><Search size={16} /><EditableText document="copy.ui.PublicResultsSection" entry="evpw8hi" fallback={"অনুসন্ধান"} /></button>
    </div>
    <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-xs sm:text-sm"><thead className="bg-gray-100"><tr><th className="p-3 border border-gray-200"><EditableText document="copy.ui.PublicResultsSection" entry="e56ry96" fallback={"ফলাফলের শিরোনাম"} /></th><th className="p-3 border border-gray-200"><EditableText document="copy.ui.PublicResultsSection" entry="eef1pnw" fallback={"শ্রেণি / শিক্ষাবর্ষ"} /></th><th className="p-3 border border-gray-200"><EditableText document="copy.ui.PublicResultsSection" entry="e9bgic9" fallback={"অফিসিয়াল প্রকাশনা"} /></th></tr></thead><tbody>{(searched ? results : candidates).map((record) => <tr key={record._id}><td className="p-3 border border-gray-200"><strong>{record.title}</strong>{record.summaryNotes && <p className="mt-1 text-gray-500 whitespace-pre-wrap">{record.summaryNotes}</p>}</td><td className="p-3 border border-gray-200">{record.className}<br />{record.academicYear}</td><td className="p-3 border border-gray-200">{record.meritListPdfUrl ? <a className="inline-flex gap-1 items-center text-[#126b59] font-semibold underline" href={stegaClean(record.meritListPdfUrl)} target="_blank" rel="noreferrer"><Download size={15} /><EditableText document="copy.ui.PublicResultsSection" entry="ey064a2" fallback={"ফলাফল PDF"} /></a> : <span className="text-gray-500"><EditableText document="copy.ui.PublicResultsSection" entry="e1hg0lj4" fallback={"সংযুক্তি নেই"} /></span>}</td></tr>)}</tbody></table></div>
    {!(searched ? results : candidates).length && <p role="status" className="text-center text-sm text-gray-500 py-10"><EditableText document="copy.ui.PublicResultsSection" entry="esvs9u0" fallback={"এই নির্বাচনের কোনো ফলাফল এখনো প্রকাশিত হয়নি।"} /></p>}
    </div>
  </article>;
}
