import Link from "next/link";
import { BookOpen, CalendarDays, HeartHandshake, Images, Mail, MapPin, Megaphone, Newspaper, ScrollText, Users, UserRoundCheck, type LucideIcon } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";
import { EditableImage as Image, getFieldAttribute } from "@/content/server";
import { fieldSource } from "@/content/model";
import { getPageSeoRecords } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";
import { pageFrameDefaults } from "@/data/pageFrameDefaults";

const icons: Record<string, LucideIcon> = {
  "/committee": Users, "/teachers": UserRoundCheck, "/admission": BookOpen,
  "/results/academic": ScrollText, "/notices": Megaphone,
  "/orphanage": HeartHandshake, "/badri-kafila": HeartHandshake,
  "/gallery": Images, "/blog": Newspaper, "/contact": Mail,
};

/**
 * Shared top identity frame for the ten main navigation pages added on 2026-11-06.
 * The page's existing pageSeo document is the content source; editors find it in
 * Studio > Page Frames. The logo comes from siteSettings until that page gets a
 * frameImage. Keep this component, pageFrameDefaults, the pageSeo schema/query,
 * Studio structure, and route placements in sync when changing this feature.
 */
export default async function PageIdentityFrame({ route }: { route: string }) {
  const fallback = pageFrameDefaults[route];
  if (!fallback) return null;
  const [pages, settings, attribute] = await Promise.all([getPageSeoRecords(), getSiteSettings(), getFieldAttribute()]);
  const page = pages.find((entry) => stegaClean(entry.route) === route);
  if (page?.frameEnabled === false) return null;
  const Icon = icons[route];
  const value = (field: "frameEyebrow" | "frameTitle" | "frameSubtitle" | "frameMeta" | "frameDetail", defaultText: string) =>
    stegaClean(page?.[field] ?? defaultText);
  const badges = Array.isArray(page?.frameBadges) ? page.frameBadges : fallback.badges;
  const title = value("frameTitle", fallback.title);
  const imageUrl = stegaClean(page?.frameImageUrl || settings.logoUrl || "/jamia-logo-v2.png");
  const imageSource = page ? fieldSource(page, "frameImage") : fieldSource(settings, "logoUrl");
  const backHref = stegaClean(page?.frameBackUrl || "/");
  const safeBackHref = backHref.startsWith("/") && !backHref.startsWith("//") ? backHref : "/";

  return <section aria-label={title} className="mb-6 sm:mb-8 overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#D9822B] bg-gradient-to-r from-[#014d26] via-[#016332] to-[#02733b] px-4 py-3 text-white sm:px-6">
      <div className="flex items-center gap-2.5"><Icon size={18} className="shrink-0 text-amber-300" aria-hidden="true" />
        <span className="text-sm font-bold tracking-wide sm:text-base" data-sanity={attribute(page, "frameEyebrow")}>{value("frameEyebrow", fallback.eyebrow)}</span>
      </div>
      <Link href={safeBackHref} className="rounded-full border border-amber-300/30 bg-black/20 px-3 py-1 text-xs font-semibold text-amber-200 transition-colors hover:text-white" data-sanity={attribute(page, "frameBackLabel")}>{stegaClean(page?.frameBackLabel ?? "← হোমপেজে ফিরে যান")}</Link>
    </div>
    <div className="bg-gradient-to-b from-[#FAF7F0]/70 to-white p-6 sm:p-8">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-3 border-[#8B111A] bg-white p-0.5 shadow-md ring-4 ring-amber-100/80 sm:h-32 sm:w-32">
          <Image source={imageSource} src={imageUrl} alt={stegaClean(page?.frameImageAlt || title)} width={128} height={128} className="h-full w-full rounded-full object-contain" />
        </div>
        <div className="min-w-0 flex-1 space-y-2.5">
          <h2 className="text-xl font-extrabold tracking-tight text-[#016332] sm:text-2xl md:text-3xl" data-sanity={attribute(page, "frameTitle")}>{title}</h2>
          <p className="text-sm font-semibold text-gray-700 sm:text-base" data-sanity={attribute(page, "frameSubtitle")}>{value("frameSubtitle", fallback.subtitle)}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5 md:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9822B]/40 bg-amber-50 px-3.5 py-1 text-xs font-bold text-[#8B111A] sm:text-sm"><CalendarDays size={14} aria-hidden="true" /><span data-sanity={attribute(page, "frameMeta")}>{value("frameMeta", fallback.meta)}</span></span>
          </div>
          <p className="flex items-center justify-center gap-1.5 pt-0.5 text-xs font-medium text-gray-700 sm:text-sm md:justify-start" data-sanity={attribute(page, "frameDetail")}><MapPin size={15} className="shrink-0 text-[#8B111A]" aria-hidden="true" />{value("frameDetail", fallback.detail)}</p>
          {badges.length > 0 && <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs md:justify-start">
            {badges.filter(Boolean).map((badge, index) => <span key={`${index}-${badge}`} className={["rounded-md border px-3 py-1 font-bold", index % 3 === 0 ? "border-[#016332]/20 bg-[#016332]/10 text-[#016332]" : index % 3 === 1 ? "border-[#8B111A]/20 bg-[#8B111A]/10 text-[#8B111A]" : "border-amber-500/30 bg-amber-500/15 text-amber-900"].join(" ")} data-sanity={attribute(page, `frameBadges[${index}]`)}>{stegaClean(badge)}</span>)}
          </div>}
        </div>
      </div>
    </div>
  </section>;
}
