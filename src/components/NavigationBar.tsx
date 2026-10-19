"use client";

import { useState } from "react";
import Link from "next/link";
import { navigationItems, siteSettings } from "@/data/siteData";
import { ChevronDown, Menu, X, Phone } from "lucide-react";

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="w-full bg-[#053b1e] text-white sticky top-0 z-50 shadow-sm border-t border-[#0a522b] border-b-2 border-[#8B111A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex lg:hidden py-2 items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-[#084d28] text-white focus:outline-none"
            aria-label="মেনু"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <span className="font-semibold text-sm text-white">মেনু নির্বাচন করুন</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center">
          {navigationItems.map((item, idx) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <div
                key={idx}
                className="relative group border-r border-[#0c522c] last:border-r-0"
              >
                <Link
                  href={item.href}
                  className="px-4 py-2.5 inline-flex items-center gap-1 text-[14.5px] font-semibold text-white hover:bg-[#8B111A] transition-colors whitespace-nowrap"
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      size={14}
                      className="opacity-80 group-hover:rotate-180 transition-transform duration-150"
                    />
                  )}
                </Link>

                {hasChildren && (
                  <div className="absolute left-0 top-full hidden group-hover:block bg-[#053b1e] min-w-[215px] shadow-lg border-t-2 border-[#D9822B] z-50">
                    {item.children?.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        className="block px-4 py-2 text-[13.5px] font-medium hover:bg-[#8B111A] text-gray-100 hover:text-white transition-colors border-b border-[#0a4d28] last:border-b-0"
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

        {/* Right Side Contact & Admission CTA */}
        <div className="py-1.5 flex items-center gap-2.5">
          <a
            href={`tel:${siteSettings.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-amber-200 hover:text-white px-2.5 py-1"
          >
            <Phone size={13} className="text-amber-300" />
            <span>{siteSettings.phone}</span>
          </a>
          <Link
            href="/#admission"
            className="bg-[#8B111A] hover:bg-[#6e0b13] text-white text-xs sm:text-[13px] font-bold px-3.5 py-1.5 rounded-xs transition-colors"
          >
            ভর্তি তথ্য
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#042d17] border-t border-[#0c522c] px-4 py-2 space-y-0.5">
          {navigationItems.map((item, idx) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <div
                key={idx}
                className="border-b border-[#0a4523] last:border-b-0 py-1"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => !hasChildren && setMobileMenuOpen(false)}
                    className="block py-1.5 text-sm font-semibold text-white hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="p-1.5 text-gray-200"
                      aria-label="সাবমেনু"
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {hasChildren && openDropdown === item.label && (
                  <div className="pl-3 py-1 space-y-1 bg-[#032010]">
                    {item.children?.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-2 text-xs text-gray-200 hover:text-amber-300"
                      >
                        - {child.label}
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
