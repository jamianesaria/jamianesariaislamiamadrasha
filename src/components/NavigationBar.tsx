"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationItems, siteSettings } from "@/data/siteData";
import { ChevronDown, Menu, X, PhoneCall, GraduationCap } from "lucide-react";

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="w-full bg-[#063b1e] text-white sticky top-0 z-50 shadow-sm border-y border-emerald-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile Hamburger toggle with Brand Logo */}
        <div className="flex lg:hidden py-2 items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md bg-[#0a4d28] hover:bg-[#0e6435] text-white border border-emerald-700/60 focus:outline-none transition-colors"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link href="/" className="flex items-center gap-2" title="হোম">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-300/80 bg-white p-0.5 shrink-0">
              <Image
                src={siteSettings.logoUrl}
                alt={siteSettings.nameBn}
                width={28}
                height={28}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-amber-100">
              মেনু
            </span>
          </Link>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center">
          {navigationItems.map((item, idx) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <div
                key={idx}
                className="relative group border-r border-emerald-800/50 last:border-r-0"
              >
                <Link
                  href={item.href}
                  className="px-3.5 py-2.5 inline-flex items-center gap-1 text-sm font-medium text-emerald-50 hover:text-white hover:bg-[#8B111A] transition-colors duration-150 whitespace-nowrap"
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      size={14}
                      className="opacity-80 group-hover:rotate-180 transition-transform duration-200 text-amber-300"
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasChildren && (
                  <div className="absolute left-0 top-full hidden group-hover:block bg-[#063b1e] min-w-[210px] shadow-xl border-t-2 border-[#D9822B] rounded-b-lg py-1 z-50">
                    {item.children?.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        className="block px-4 py-2 text-xs sm:text-[13px] font-medium hover:bg-[#8B111A] text-emerald-50 hover:text-white transition-colors border-b border-emerald-800/40 last:border-b-0"
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

        {/* Right Side CTA Buttons */}
        <div className="py-1.5 flex items-center gap-2">
          <a
            href={`tel:${siteSettings.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-amber-200 hover:text-white px-3 py-1.5 rounded-full bg-[#0a4d28] border border-emerald-700/60 transition-colors"
          >
            <PhoneCall size={13} className="text-amber-400" />
            <span>{siteSettings.phone}</span>
          </a>
          <Link
            href="/#admission"
            className="bg-[#8B111A] hover:bg-[#a81823] text-white text-xs sm:text-[13px] font-semibold px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <GraduationCap size={14} className="text-amber-300" />
            <span>ভর্তি আহ্বান</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#042914] border-t border-emerald-800/80 px-4 py-2.5 space-y-1 shadow-lg">
          {navigationItems.map((item, idx) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <div
                key={idx}
                className="border-b border-emerald-900/70 last:border-b-0 pb-1"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => !hasChildren && setMobileMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-emerald-50 hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="p-1.5 text-emerald-200 hover:text-white"
                      aria-label="সাবমেনু"
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label
                            ? "rotate-180 text-amber-400"
                            : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {hasChildren && openDropdown === item.label && (
                  <div className="pl-3 py-1 space-y-1 bg-[#031d0e] rounded mb-1.5 border-l-2 border-[#D9822B]">
                    {item.children?.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-2 text-xs text-emerald-100 hover:text-amber-300"
                      >
                        • {child.label}
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
