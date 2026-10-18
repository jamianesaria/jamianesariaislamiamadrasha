import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/data/siteData";

export default function HeaderBanner() {
  return (
    <header className="w-full bg-[#016332] relative overflow-hidden">
      <div className="w-[92%] sm:w-[88%] md:w-[86%] lg:w-[85%] max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="block w-full relative aspect-[1329/230] sm:aspect-[1329/215] md:aspect-[1329/205] overflow-hidden bg-[#016332]"
          title={`${siteSettings.nameBn} - হোমপেজ`}
        >
          <Image
            src={siteSettings.headerBannerUrl}
            alt={`${siteSettings.nameBn} - ${siteSettings.nameEn}`}
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
