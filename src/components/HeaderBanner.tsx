import Image from "next/image";
import Link from "next/link";
import { siteSettings as defaultSettings } from "@/data/siteData";

interface HeaderBannerProps {
  initialSettings?: any;
}

export default function HeaderBanner({ initialSettings }: HeaderBannerProps = {}) {
  const settings = initialSettings || defaultSettings;

  return (
    <header className="w-full bg-[#016332] relative overflow-hidden">
      <div className="w-[92%] sm:w-[88%] md:w-[86%] lg:w-[85%] max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="block w-full relative aspect-[1329/230] sm:aspect-[1329/215] md:aspect-[1329/205] overflow-hidden bg-[#016332]"
          title={`${settings.nameBn || settings.title || defaultSettings.nameBn} - হোমপেজ`}
        >
          <Image
            src={settings.headerBannerUrl || defaultSettings.headerBannerUrl || "/header.jpeg"}
            alt={`${settings.nameBn || settings.title || defaultSettings.nameBn} - ${settings.nameEn || settings.englishTitle || defaultSettings.nameEn}`}
            width={1329}
            height={585}
            sizes="(max-width: 1536px) 88vw, 1440px"
            preload
            className="absolute left-[50.9%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[106%] max-w-none h-auto select-none pointer-events-none"
          />
        </Link>
      </div>
    </header>
  );
}
