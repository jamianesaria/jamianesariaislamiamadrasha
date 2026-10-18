import Image from "next/image";
import Link from "next/link";
import { siteSettings, homePageContent } from "@/data/siteData";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  const { footer, contact } = homePageContent;

  return (
    <footer className="w-full bg-[#042914] text-white border-t-2 border-[#8B111A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-emerald-800/60">
          {/* Column 1: Brand Identity & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-[#D9822B] bg-white p-1 shrink-0">
                <Image
                  src={siteSettings.logoUrl}
                  alt={footer.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="inline-block text-[11px] font-semibold text-amber-300 bg-emerald-900/80 px-2.5 py-0.5 rounded-full mb-1">
                  স্থাপিত: {siteSettings.established}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {footer.title}
                </h3>
              </div>
            </div>

            <p className="text-amber-200/95 font-medium text-xs sm:text-sm leading-relaxed pl-3 border-l-2 border-[#D9822B]">
              {footer.slogan}
            </p>

            <p className="text-xs text-emerald-100/80 leading-relaxed">
              মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন), টঙ্গী, গাজীপুর, বাংলাদেশ।
              গভঃ রেজিঃ নং {siteSettings.regNo}
            </p>
          </div>

          {/* Column 2: Quick Navigation Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm sm:text-base text-amber-300 flex items-center gap-2 pb-2 border-b border-emerald-800/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9822B]" />
              <span>গুরুত্বপূর্ণ লিংকসমূহ</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {footer.links.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-100 hover:text-amber-300 transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#D9822B] group-hover:translate-x-0.5 transition-transform shrink-0"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info Summary (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm sm:text-base text-amber-300 flex items-center gap-2 pb-2 border-b border-emerald-800/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9822B]" />
              <span>যোগাযোগ</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-emerald-300/80">
                    {contact.addressLabel}
                  </span>
                  <span className="font-medium text-white">
                    {contact.addressValue}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-emerald-300/80">
                    {contact.phoneLabel}
                  </span>
                  <a
                    href={`tel:${contact.phoneValue}`}
                    className="font-semibold text-white hover:text-amber-300 transition-colors"
                  >
                    {contact.phoneValue}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-emerald-300/80">
                    {contact.emailLabel}
                  </span>
                  <a
                    href={`mailto:${contact.emailValue}`}
                    className="font-medium text-white hover:text-amber-300 transition-colors break-all"
                  >
                    {contact.emailValue}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright bar */}
        <div className="pt-5 text-center text-xs text-emerald-200/90">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
