import Image from "next/image";
import Link from "next/link";
import { siteSettings, homePageContent } from "@/data/siteData";

export default function Footer() {
  const { footer, contact } = homePageContent;

  return (
    <footer className="w-full bg-gradient-to-b from-[#032613] to-[#021a0d] text-white border-t-3 border-[#D9822B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-emerald-800/70">
          {/* Column 1: Brand Identity & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-[#D9822B] bg-white p-0.5 shrink-0 shadow-sm">
                <Image
                  src={siteSettings.logoUrl}
                  alt={footer.title}
                  width={52}
                  height={52}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {footer.title}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  স্থাপিত: {siteSettings.established} | গভঃ রেজিঃ নং {siteSettings.regNo}
                </p>
              </div>
            </div>

            <p className="text-amber-200 text-xs sm:text-sm font-medium pt-1 pl-3 border-l-2 border-[#D9822B]">
              {footer.slogan}
            </p>
          </div>

          {/* Column 2: Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-amber-300 pb-2 border-b border-emerald-800/80 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#D9822B] rounded-full inline-block" />
              <span>প্রয়োজনীয় লিংকসমূহ</span>
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs sm:text-[13.5px]">
              {footer.links.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-emerald-100 hover:text-amber-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[#D9822B] group-hover:translate-x-0.5 transition-transform">▪</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-amber-300 pb-2 border-b border-emerald-800/80 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#D9822B] rounded-full inline-block" />
              <span>যোগাযোগের ঠিকানা</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-[13.5px] text-emerald-100 bg-black/20 p-3.5 rounded-lg border border-emerald-800/60">
              <p>
                <span className="font-semibold text-amber-200">{contact.addressLabel}:</span>{" "}
                {contact.addressValue}
              </p>
              <p>
                <span className="font-semibold text-amber-200">{contact.phoneLabel}:</span>{" "}
                <a href={`tel:${contact.phoneValue}`} className="hover:text-amber-300 font-semibold">
                  {contact.phoneValue}
                </a>
              </p>
              <p>
                <span className="font-semibold text-amber-200">{contact.emailLabel}:</span>{" "}
                <a
                  href={`mailto:${contact.emailValue}`}
                  className="hover:text-amber-300 break-all"
                >
                  {contact.emailValue}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-5 text-center text-xs text-emerald-200/90">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
