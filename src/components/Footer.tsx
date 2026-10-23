import Image from "next/image";
import Link from "next/link";
import { siteSettings as defaultSettings, homePageContent as defaultHome } from "@/data/siteData";

interface FooterProps {
  initialSettings?: any;
  initialData?: any;
}

export default function Footer({ initialSettings, initialData }: FooterProps = {}) {
  const settings = initialSettings || defaultSettings;
  const content = initialData || defaultHome;
  const footer = content.footer || defaultHome.footer;
  const contact = content.contact || defaultHome.contact;

  return (
    <footer className="w-full bg-gradient-to-b from-[#032613] to-[#021a0d] text-white border-t-3 border-[#D9822B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-emerald-800/70">
          {/* Column 1: Brand Identity & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D9822B] bg-white p-0.5 shrink-0 shadow-sm flex items-center justify-center">
                <Image
                  src={settings.logoUrl || defaultSettings.logoUrl || "/jamia-logo-v2.png"}
                  alt={footer.title || settings.nameBn}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full scale-105"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {footer.title || settings.nameBn}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  স্থাপিত: {settings.established} | গভঃ রেজিঃ নং {settings.regNo}
                </p>
              </div>
            </div>

            <p className="text-amber-200 text-xs sm:text-sm font-medium pt-1 pl-3 border-l-2 border-[#D9822B]">
              {footer.slogan || settings.footerSloganBn || settings.sloganBn}
            </p>

            {/* Official Facebook Page Button */}
            <div className="pt-2">
              <a
                href={settings.facebookUrl || "https://www.facebook.com/jamianesaria/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-xs transition-all hover:scale-105 border border-blue-400/30"
                title="জামিয়া নেছারিয়া অফিশিয়াল ফেসবুক পেজ"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>অফিশিয়াল ফেসবুক পেজ</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-amber-300 pb-2 border-b border-emerald-800/80 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#D9822B] rounded-full inline-block" />
              <span>প্রয়োজনীয় লিংকসমূহ</span>
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs sm:text-[13.5px]">
              {(footer.links || defaultHome.footer.links).map((item: any, idx: number) => (
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
                <span className="font-semibold text-amber-200">{contact.addressLabel || "ঠিকানা"}:</span>{" "}
                {settings.address || contact.addressValue}
              </p>
              <p>
                <span className="font-semibold text-amber-200">{contact.phoneLabel || "মোবাইল"}:</span>{" "}
                <a href={`tel:${settings.phone || contact.phoneValue}`} className="hover:text-amber-300 font-semibold">
                  {settings.phone || contact.phoneValue}
                </a>
              </p>
              <p>
                <span className="font-semibold text-amber-200">{contact.emailLabel || "ইমেইল"}:</span>{" "}
                <a
                  href={`mailto:${settings.email || contact.emailValue}`}
                  className="hover:text-amber-300 break-all"
                >
                  {settings.email || contact.emailValue}
                </a>
              </p>
              <p>
                <span className="font-semibold text-amber-200">ফেসবুক:</span>{" "}
                <a
                  href={settings.facebookUrl || "https://www.facebook.com/jamianesaria/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 text-amber-200 underline font-medium"
                >
                  facebook.com/jamianesaria
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-5 text-center text-xs text-emerald-200/90">
          <p>{footer.copyright || defaultHome.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
