import { createDataAttribute } from "next-sanity";
import { stegaClean } from "@sanity/client/stega";
import type { ImageProps } from "next/image";
import { projectId, dataset } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageObject } from "@sanity/image-url";
const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export interface CopyEntry { _key: string; source: string; kind: string; text?: string; number?: number; imageUrl?: string; alt?: string; image?: SanityImageObject }
export interface CopyDocument { _id: string; title: string; route: string; entries: CopyEntry[]; seoTitle?: string; seoDescription?: string }
export interface CopyState { documents: Record<string, CopyDocument>; preview: boolean; settings?: Record<string, unknown>; gallery?: { photos: import("@/data/siteData").GalleryPhotoItem[]; videos: import("@/data/siteData").GalleryVideoItem[] } }
export interface FieldSource { document: string; key: string; field: string; type?: string }
export type CopyImageProps = ImageProps & { document?: string; entry?: string; source?: FieldSource };
const metadata = new WeakMap<object, { document: string; prefix: string[] }>();

export function contentKey(path: string): string {
  // Stable FNV-1a keys shared by migration tooling and both renderers.
  let hash = 2166136261;
  for (let index = 0; index < path.length; index++) hash = Math.imul(hash ^ path.charCodeAt(index), 16777619);
  return "e" + (hash >>> 0).toString(36);
}
export function entryFor(state: CopyState, document: string, key: string) {
  return state.documents[document]?.entries?.find((entry) => entry._key === key);
}
export function annotation(state: CopyState, source?: FieldSource) {
  if (!state.preview || !source) return undefined;
  return createDataAttribute({ projectId, dataset, baseUrl: "/studio", id: source.document, type: source.type || "pageContent", path: source.type ? source.field : `entries[_key=="${source.key}"].${source.field}` }).toString();
}
const logicKeys = /^(id|key|_.*|slug|classId|categoryId|categoryKey|category|type|variant|color|icon|iconName|badgeColor|status|value)$/;
const linkKeys = /(href|url|src|link|image|photo|video|email|phone|mobile|mapQuery|youtubeId)$/i;
export function mappedData<T>(state: CopyState, document: string, fallback: T, prefix: string[] = []): T {
  if (typeof fallback === "string") {
    if (logicKeys.test(prefix.at(-1) || "")) return fallback;
    const entry = entryFor(state, document, contentKey(prefix.join(".")));
    if (!entry) return fallback;
    const value = entry.kind === "image" ? entry.imageUrl ?? fallback : entry.text ?? fallback;
    return (linkKeys.test(prefix.at(-1) || "") ? stegaClean(value) : value) as T;
  }
  if (typeof fallback === "number") {
    const value = entryFor(state, document, contentKey(prefix.join(".")))?.number;
    return (typeof value === "number" ? value : fallback) as T;
  }
  if (!fallback || typeof fallback !== "object") return fallback;
  if ("$$typeof" in fallback || fallback instanceof Date) return fallback;
  if (Array.isArray(fallback)) {
    const result = fallback.map((value, index) => mappedData(state, document, value, [...prefix, String(index)]));
    metadata.set(result, { document, prefix });
    return result as T;
  }
  const result = Object.fromEntries(Object.entries(fallback).map(([key, value]) => [key, mappedData(state, document, value, [...prefix, key])]));
  metadata.set(result, { document, prefix });
  return result as T;
}
export function fieldSource(object: unknown, key: string | number): FieldSource | undefined {
  if (!object || typeof object !== "object") return undefined;
  const info = metadata.get(object);
  if (info) return { document: info.document, key: contentKey([...info.prefix, String(key)].join(".")), field: /image|photo|thumbnail/i.test(String(key)) ? "image" : typeof (object as Record<string, unknown>)[key] === "number" ? "number" : "text" };
  const record = object as { _id?: string; _type?: string };
  if (record._id && record._type) return { document: record._id.replace(/^drafts\./, ""), key: "", type: record._type, field: record._type === "calendarEvent" && key === "photo" ? "image" : ({ imageUrl: "image", logoUrl: "logo", headerBannerUrl: "headerBanner", pdfUrl: "pdfFile", thumbnail: "thumbnail", nameBn: "title", nameAr: "arabicTitle", nameEn: "englishTitle", addressShort: "address", address: "addressFull", established: "establishedYear", regNo: "regSocialWelfare", befaqRegNo: "regBefaq", haiatulUlyaRegNo: "regHaiatulUlya" } as Record<string, string>)[String(key)] || String(key) };
  return undefined;
}
export function imageProps(state: CopyState, props: CopyImageProps): ImageProps & { "data-sanity"?: string } {
  const { document, entry: key, source, ...image } = props;
  const resolved = source ? { ...source, field: source.type ? source.field : "image" } : (document && key ? { document, key, field: "image" } : undefined);
  const entry = resolved && !resolved.type ? entryFor(state, resolved.document, resolved.key) : undefined;
  const hotspot = entry?.image?.hotspot;
  const uploaded = entry?.image?.asset ? imageBuilder.image(entry.image).auto("format").url() : entry?.imageUrl;
  return { ...image, src: uploaded ? stegaClean(uploaded) : image.src, alt: entry?.alt ? stegaClean(entry.alt) : image.alt, ...(hotspot ? { style: { ...image.style, objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` } } : {}), "data-sanity": annotation(state, resolved) };
}
