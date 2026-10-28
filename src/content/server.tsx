import "server-only";
import { cache, type ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import { stegaClean } from "@sanity/client/stega";
import { fetchSiteQuery } from "@/sanity/lib/fetch";
import { CopyProvider } from "./client";
import { annotation, fieldSource, entryFor, imageProps, mappedData, type CopyImageProps, type CopyState } from "./model";
import routeCoverage from "./coverage.json";
import componentRoutes from "./component-routes.json";
import { pageMetadata } from "@/lib/seo";
import { seoRoutes } from "@/data/seoData";

export const getCopyState = cache(async (): Promise<CopyState> => {
  try {
    const preview = (await draftMode()).isEnabled;
    const documents = await fetchSiteQuery<import("./model").CopyDocument[]>('*[_type=="pageContent"]{_id,title,route,seoTitle,seoDescription,entries[]{_key,source,kind,text,number,alt,image,"imageUrl":coalesce(image.asset->url,imageUrl)}}');
    return { documents: Object.fromEntries(documents.map((document) => [document._id.replace(/^drafts\./, ""), { ...document, route: stegaClean(document.route || "/"), entries: (document.entries || []).map((entry) => ({ ...entry, source: stegaClean(entry.source), kind: stegaClean(entry.kind), ...(entry.imageUrl ? { imageUrl: stegaClean(entry.imageUrl) } : {}) })) }])), preview };
  } catch { return { documents: {}, preview: false }; }
});
export async function EditableText({ document, entry, fallback, plain = false }: { document: string; entry: string; fallback: string; plain?: boolean }) {
  const state = await getCopyState();
  const text = entryFor(state, document, entry)?.text ?? fallback;
  return state.preview && !plain ? <span data-sanity={annotation(state, { document, key: entry, field: "text" })}>{text}</span> : text;
}
export async function EditableImage(props: CopyImageProps) { const resolved = imageProps(await getCopyState(), props); return <Image {...resolved} alt={resolved.alt} />; }
export async function getFieldAttribute() { const state = await getCopyState(); return (object: unknown, key: string | number) => annotation(state, fieldSource(object, key)); }
export async function getEditableData<T>(document: string, fallback: T, prefix: string[] = []): Promise<T> {
  if (document === "siteSettings") return { ...fallback, ...await (await import("@/sanity/lib/queries")).getSiteSettings() };
  return mappedData(await getCopyState(), document, fallback, prefix);
}
export async function EditablePage({ route, children }: { route: string; children: ReactNode }) {
  const state = await getCopyState();
  const needed = (routeCoverage as Record<string, { clientDocuments: string[] }>)[route]?.clientDocuments || [];
  const documents = Object.fromEntries(Object.entries(state.documents).filter(([key]) => needed.includes(key)).map(([key, document]) => [key, { _id: document._id, title: "", route: "", entries: document.entries.map(({ _key, kind, text, number, imageUrl, alt, image }) => ({ _key, kind, source: "", text, number, imageUrl, alt, image })) }]));
  const settings = await (await import("@/sanity/lib/queries")).getSiteSettings();
  const gallery = route.startsWith("/gallery") ? await (await import("@/sanity/lib/gallery")).getGalleryRecords() : undefined;
  return <CopyProvider value={{ documents, preview: state.preview, settings, gallery }}>{children}</CopyProvider>;
}

// Adds the editing context without introducing public DOM elements.
export function editableRoute(route: string, Page: () => ReactNode | Promise<ReactNode>) {
  return function EditableRoute() { return <EditablePage route={route}><Page /></EditablePage>; };
}

export function editableMetadata(route: string, fallback: Metadata) {
  return async (): Promise<Metadata> => {
    const state = await getCopyState();
    const primary = seoRoutes[route]?.document || Object.entries(componentRoutes).find(([, path]) => path === route)?.[0];
    const fallbackDocument = (routeCoverage as Record<string, { documents: string[] }>)[route]?.documents.find((id) => id.startsWith("copy.ui.") && !/^copy\.ui\.(NavigationBar|HeaderBanner|Footer|BreakingNewsBar)$/.test(id));
    const page = (primary ? state.documents[`copy.ui.${primary}`] : undefined) || (fallbackDocument ? state.documents[fallbackDocument] : undefined);
    return pageMetadata(route, fallback, page, state.preview);
  };
}
