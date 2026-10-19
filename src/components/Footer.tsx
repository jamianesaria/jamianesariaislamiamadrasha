import Image from "next/image";
import Link from "next/link";
import { siteSettings, homePageContent } from "@/data/siteData";

export default function Footer() {
  const { footer, contact } = homePageContent;

  return (
    <footer className="w-full bg-[#032613] text-white border-t-3 border-[#8B111A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-9 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-7 border-b border-emerald-800/70">
          {/* Column 1: Brand Identity & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D9822B] bg-white p-0.5 shrink-0">
                <Image
                  src={siteSettings.logoUrl}
                  alt={footer.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {footer.title}
                </h3>
                <p className="text-xs text-amber-300 font-medium">
                  স্থাপিত: {siteSettings.established} | গভঃ রেজিঃ নং {siteSettings.regNo}
                </p>
              </div>
            </div>

            <p className="text-amber-200 text-xs sm:text-sm font-medium pt-1">
              {footer.slogan}
            </p>
          </div>

          {/* Column 2: Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-bold text-sm text-amber-300 pb-1.5 border-b border-emerald-800">
              প্রয়োজনীয় লিংকসমূহ
            </h4>
            <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-xs sm:text-[13.5px]">
              {footer.links.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-emerald-100 hover:text-amber-300 transition-colors"
                  >
                    ▪ {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-bold text-sm text-amber-300 pb-1.5 border-b border-emerald-800">
              যোগাযোগের ঠিকানা
            </h4>
            <div className="space-y-1.5 text-xs sm:text-[13.5px] text-emerald-100">
              <p>
                <span className="font-semibold text-white">{contact.addressLabel}:</span>{" "}
                {contact.addressValue}
              </p>
              <p>
                <span className="font-semibold text-white">{contact.phoneLabel}:</span>{" "}
                <a href={`tel:${contact.phoneValue}`} className="hover:text-amber-300">
                  {contact.phoneValue}
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">{contact.emailLabel}:</span>{" "}
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
        <div className="pt-4 text-center text-xs text-emerald-200/90">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
