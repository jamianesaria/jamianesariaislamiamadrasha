"use client";

import { stegaClean } from "@sanity/client/stega";
import { useState } from "react";
import Link from "next/link";
import { navigationItems as _fallback_navigationItems, siteSettings as _fallback_siteSettings } from "@/data/navigationData";
import { ChevronDown, Menu, X, Phone, GraduationCap } from "lucide-react";
import { useEditableData, EditableText } from "@/content/client";



export default function NavigationBar() {
  const navigationItems = useEditableData("copy.data.navigationItems", _fallback_navigationItems);
  const siteSettings = useEditableData("siteSettings", _fallback_siteSettings);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="w-full bg-[#053b1e] text-white sticky top-0 z-50 shadow-md border-t border-[#0a522b] border-b-2 border-[#8B111A]">
      <div className="w-full max-w-[1440px] mx-auto pl-1 sm:pl-2 xl:pl-2 pr-2 sm:pr-4 xl:pr-3 flex items-center justify-between">
        {/* Mobile / Tablet Menu Bar (< 1280px) */}
        <div className="flex xl:hidden py-2 items-center justify-between w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-2.5 py-1.5 rounded bg-[#084d28] hover:bg-[#8B111A] text-white transition-colors focus:outline-none flex items-center gap-1.5"
            aria-label="মেনু"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            <span className="font-semibold text-xs sm:text-sm"><EditableText document="copy.ui.NavigationBar" entry="e133739m" fallback={"মেনু নির্বাচন"} /></span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${stegaClean(siteSettings.phone)}`}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-200 hover:text-white px-2.5 py-1 bg-[#084d28] border border-[#0c6636] rounded"
            >
              <Phone size={12} className="text-amber-300" />
              <span>{siteSettings.phone}</span>
            </a>

            <Link
              href={siteSettings.applyUrl}
              className="bg-[#8B111A] hover:bg-[#a81b26] text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm inline-flex items-center gap-1.5 border border-[#b31d28] transition-colors"
            >
              <GraduationCap size={14} className="text-amber-300" />
              <span><EditableText document="copy.ui.NavigationBar" entry="eklgrrd" fallback={"ভর্তি আবেদন"} /></span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links (Pulled to Left, >= 1280px) */}
        <div className="hidden xl:flex items-center w-full">
          <div className="flex items-center justify-start gap-0 xl:gap-0.5 2xl:gap-1">
            {navigationItems.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              // Align dropdown to right for items near the right edge to avoid window overflow
              const isRightAligned = idx >= 6;

              return (
                <div
                  key={idx}
                  className="relative group border-r border-[#0c522c] last:border-r-0"
                >
                  <Link
                    href={item.href}
                    className="px-1.5 2xl:px-2 py-2.5 inline-flex items-center gap-0.5 xl:gap-1 text-[12px] 2xl:text-[13px] font-semibold text-white hover:bg-[#8B111A] transition-colors whitespace-nowrap"
                  >
                    <span>
                      {item.shortLabel ? (
                        <>
                          <span className="hidden 2xl:inline">{item.label}</span>
                          <span className="inline 2xl:hidden">{item.shortLabel}</span>
                        </>
                      ) : (
                        item.label
                      )}
                    </span>
                    {hasChildren && (
                      <ChevronDown
                        size={11}
                        className="opacity-75 group-hover:rotate-180 transition-transform duration-150 shrink-0"
                      />
                    )}
                  </Link>

                  {hasChildren && (
                    <div
                      className={`absolute top-full hidden group-hover:block bg-[#042d17] min-w-[220px] shadow-2xl border-t-2 border-[#D9822B] z-50 py-1 rounded-b-sm ${
                        isRightAligned ? "right-0 left-auto" : "left-0 right-auto"
                      }`}
                    >
                      {item.children?.map((child, cIdx) => (
                        <Link
                          key={cIdx}
                          href={child.href}
                          className="block px-4 py-2 text-[13px] font-medium hover:bg-[#8B111A] text-gray-100 hover:text-white transition-colors border-b border-[#0a4d28] last:border-b-0 whitespace-nowrap"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side Apply Now Button (Fully Visible, Pushed Right) */}
          <div className="ml-auto shrink-0 pl-2 xl:pl-3 pr-0.5">
            <Link
              href={siteSettings.applyUrl}
              className="bg-[#8B111A] hover:bg-[#a81b26] text-white text-xs sm:text-[13px] font-bold px-3.5 py-1.5 rounded shadow-sm inline-flex items-center gap-1.5 whitespace-nowrap border border-[#b31d28] transition-transform hover:scale-105"
              title="অনলাইনে ভর্তি আবেদন করুন"
            >
              <GraduationCap size={15} className="text-amber-300 shrink-0" />
              <span><EditableText document="copy.ui.NavigationBar" entry="e1imjhbf" fallback={"ভর্তি আবেদন"} /></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#042d17] border-t border-[#0c522c] px-4 py-3 space-y-1 shadow-2xl max-h-[80vh] overflow-y-auto">
          {/* Top Admission CTA in Mobile Drawer */}
          <div className="pb-2 mb-2 border-b border-[#0a4523]">
            <Link
              href={siteSettings.applyUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#8B111A] hover:bg-[#a81b26] text-white text-sm font-bold py-2 px-3 rounded flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <GraduationCap size={16} className="text-amber-300" />
              <span><EditableText document="copy.ui.NavigationBar" entry="e1ijt9k4" fallback={"অনলাইনে ভর্তি আবেদন করুন"} /></span>
            </Link>
          </div>
          {navigationItems.map((item, idx) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openDropdown === item.label;
            return (
              <div
                key={idx}
                className="border-b border-[#0a4523] last:border-b-0 py-1.5"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => !hasChildren && setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-semibold text-white hover:text-amber-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="p-1.5 text-amber-200 hover:text-white focus:outline-none"
                      aria-label="সাবমেনু"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {hasChildren && isOpen && (
                  <div className="mt-1 pl-3 py-1 space-y-1 bg-[#032010] rounded border-l-2 border-[#D9822B]">
                    {item.children?.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-2 text-xs text-gray-200 hover:text-white hover:bg-[#053b1e] rounded transition-colors"
                      ><EditableText document="copy.ui.NavigationBar" entry="ewnkzxi" fallback={"▪ "} />{child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}
