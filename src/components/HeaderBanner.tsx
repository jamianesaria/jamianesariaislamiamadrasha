
import Link from "next/link";
import type { PublicSettings } from "@/content/public-types";
import { siteSettings as _fallback_defaultSettings } from "@/data/siteData";
import { EditableImage as Image, getEditableData } from "@/content/server";
import { fieldSource } from "@/content/model";



interface HeaderBannerProps {
  initialSettings?: PublicSettings;
}

export default async function HeaderBanner({ initialSettings }: HeaderBannerProps = {}) {
  const defaultSettings = await getEditableData("siteSettings", _fallback_defaultSettings);

  const settings = initialSettings || defaultSettings;

  return (
    <header className="w-full bg-[#016332] relative overflow-hidden">
      <div className="w-[92%] sm:w-[88%] md:w-[86%] lg:w-[85%] max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="block w-full relative aspect-[1329/230] sm:aspect-[1329/215] md:aspect-[1329/205] overflow-hidden bg-[#016332]"
          title={`${settings.nameBn || defaultSettings.nameBn} - হোমপেজ`}
        >
          <Image document="copy.ui.HeaderBanner" entry="eghezdc" source={fieldSource(settings, "headerBannerUrl")}
            src={settings.headerBannerUrl || defaultSettings.headerBannerUrl || "/header.jpeg"}
            alt={`${settings.nameBn || defaultSettings.nameBn} - ${settings.nameEn || defaultSettings.nameEn}`}
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
