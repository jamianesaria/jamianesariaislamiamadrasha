import "server-only";
import { cache } from "react";
import type { Metadata } from "next";
import { stegaClean } from "@sanity/client/stega";
import { unstable_rethrow } from "next/navigation";
import { fetchSiteQuery } from "@/sanity/lib/fetch";
import { absoluteUrl, seoDefaults, seoRoutes, SITE_URL } from "@/data/seoData";

export interface PageSeoRecord {
  route: string; seoTitle?: string; seoDescription?: string; breadcrumbLabel?: string;
  pageHeading?: string; seoImageUrl?: string; noIndex?: boolean; _updatedAt?: string;
  backToBlogLabel?: string; articleAuthorLabel?: string; articleDateLabel?: string;
}
export const getPageSeoRecords = cache(async (): Promise<PageSeoRecord[]> => {
  try {
    return await fetchSiteQuery<PageSeoRecord[]>('*[_type == "pageSeo" && !defined(archivedAt)]{route,seoTitle,seoDescription,breadcrumbLabel,pageHeading,noIndex,backToBlogLabel,articleAuthorLabel,articleDateLabel,_updatedAt,"seoImageUrl":seoImage.asset->url}') || [];
  } catch (error) { unstable_rethrow(error); return []; }
});
export const getSeoSettings = cache(async () => {
  const { getSiteSettings } = await import("@/sanity/lib/queries");
  const settings = await getSiteSettings();
  return {
    name: clean(settings.seoSiteName, seoDefaults.siteName),
    googleVerification: clean("googleSiteVerification" in settings ? settings.googleSiteVerification : ""),
    fullName: clean(settings.nameBn), englishName: clean(settings.nameEn),
    description: clean(settings.seoDescription, seoDefaults.description),
    image: clean(settings.seoImageUrl, seoDefaults.image),
    homeLabel: clean(settings.breadcrumbHomeLabel, seoDefaults.homeLabel),
    breadcrumbLabel: clean(settings.breadcrumbNavLabel, seoDefaults.breadcrumbLabel),
    logo: clean(settings.logoUrl), address: clean(settings.address),
    phone: clean(settings.phone), email: clean(settings.email),
    facebook: clean(settings.facebookUrl), youtube: clean(settings.youtubeUrl),
  };
});
export function clean(value?: string, fallback = ""): string { return stegaClean(value || fallback).trim(); }
export function socialImage(value?: string): string {
  const image = clean(value, seoDefaults.image);
  // Only intentional local paths and secure public assets are valid sharing images.
  return image.startsWith("/") && !image.startsWith("//") ? absoluteUrl(image) : /^https:\/\//.test(image) ? image : absoluteUrl(seoDefaults.image);
}
export async function pageMetadata(route: string, fallback: Metadata, legacy?: { seoTitle?: string; seoDescription?: string }, preview = false): Promise<Metadata> {
  const [settings, records] = await Promise.all([getSeoSettings(), getPageSeoRecords()]);
  const page = records.find((record) => clean(record.route) === route);
  const label = seoRoutes[route]?.label || settings.name;
  const title = clean(page?.seoTitle || legacy?.seoTitle, route === "/" ? label : `${label} | ${settings.name}`);
  const description = clean(page?.seoDescription || legacy?.seoDescription, typeof fallback.description === "string" ? fallback.description : settings.description);
  const image = socialImage(page?.seoImageUrl || settings.image);
  return {
    ...fallback, metadataBase: new URL(SITE_URL), title: { absolute: title }, description,
    applicationName: settings.name,
    ...(settings.googleVerification ? { verification: { google: settings.googleVerification } } : {}),
    alternates: { canonical: absoluteUrl(route) },
    robots: preview || page?.noIndex ? { index: false, follow: true } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "website", locale: "bn_BD", siteName: settings.name, title, description, url: absoluteUrl(route), images: [{ url: image, alt: settings.fullName }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
