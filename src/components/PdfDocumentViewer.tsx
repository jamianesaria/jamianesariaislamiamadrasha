"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText, RefreshCw, Eye } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";

interface PdfDocumentViewerProps {
  url?: string | null;
  title?: string;
  badge?: string;
  className?: string;
  compact?: boolean;
}

export default function PdfDocumentViewer({
  url,
  title = "অফিসিয়াল PDF নথি",
  badge = "অফিসিয়াল PDF প্রকাশনা",
  className = "",
  compact = false,
}: PdfDocumentViewerProps) {
  const [viewerMode, setViewerMode] = useState<"google" | "direct">("google");
  const cleanUrl = stegaClean(url || "").trim();

  if (!cleanUrl || cleanUrl === "#" || cleanUrl.startsWith("javascript:")) {
    return null;
  }

  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    cleanUrl
  )}&embedded=true`;

  const currentIframeSrc =
    viewerMode === "google" ? googleDocsViewerUrl : `${cleanUrl}#toolbar=1&navpanes=0`;

  return (
    <div
      className={`rounded-2xl border-2 border-amber-500/40 bg-white shadow-md overflow-hidden my-4 ${className}`}
    >
      {/* Top Header Control Strip */}
      <div className="bg-gradient-to-r from-[#014d26] via-[#016332] to-[#024422] text-white px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#D9822B]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-red-600/90 text-white flex items-center justify-center shrink-0 shadow-xs border border-red-400">
            <FileText size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded">
                {badge}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md md:max-w-xl">
              {title}
            </h4>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setViewerMode(viewerMode === "google" ? "direct" : "google")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-100 hover:text-white bg-black/20 hover:bg-black/35 px-2.5 py-1.5 rounded-lg border border-white/20 transition-colors"
            title="ভিউয়ার পরিবর্তন করুন (Google Docs / Direct Browser View)"
          >
            <RefreshCw size={13} className="shrink-0" />
            <span className="hidden sm:inline">
              {viewerMode === "google" ? "সরাসরি ব্রাউজার ভিউ" : "গুগল ভিউয়ার"}
            </span>
          </button>

          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg border border-amber-400/40 shadow-xs transition-colors"
            title="পূর্ণাঙ্গ PDF নতুন ট্যাবে খুলুন"
          >
            <ExternalLink size={13} className="shrink-0" />
            <span>নতুন ট্যাবে দেখুন</span>
          </a>

          <a
            href={cleanUrl}
            download
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-[#8B111A] hover:bg-[#a81b26] px-3.5 py-1.5 rounded-lg border border-red-400/40 shadow-xs transition-colors"
            title="PDF ফাইল ডাউনলোড করুন"
          >
            <Download size={14} className="shrink-0 text-amber-300" />
            <span>ডাউনলোড</span>
          </a>
        </div>
      </div>

      {/* Main Document Display Canvas (Shows like a picture / document) */}
      <div className="relative bg-[#2e3134] p-1.5 sm:p-2.5">
        <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-inner border border-stone-300">
          <iframe
            src={currentIframeSrc}
            title={title}
            loading="lazy"
            className={`w-full border-0 block bg-stone-100 ${
              compact
                ? "h-[450px] sm:h-[550px]"
                : "h-[550px] sm:h-[750px] md:h-[850px]"
            }`}
          />
        </div>
      </div>

      {/* Bottom Help & Download Strip */}
      <div className="bg-stone-50 px-4 py-2.5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
        <p className="flex items-center gap-1.5 font-medium">
          <Eye size={14} className="text-[#016332]" />
          <span>নথিটি স্ক্রল করে প্রতিটি পাতা স্পষ্টভাবে দেখা যাবে।</span>
        </p>
        <div className="flex items-center gap-3">
          <a
            href={cleanUrl}
            download
            className="font-bold text-[#8B111A] hover:underline inline-flex items-center gap-1"
          >
            <Download size={13} />
            <span>সরাসরি ডাউনলোড লিঙ্ক</span>
          </a>
        </div>
      </div>
    </div>
  );
}

