import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFieldAttribute } from "@/content/server";
import { clean, getPageSeoRecords } from "@/lib/seo";
import { defaultRelatedLinks, normalizePageLinks, relatedLinksTitle, pageSeoDocumentId } from "@/data/seoData";

export default async function RelatedPageLinks({ route }: { route: string }) {
  const [records, attribute] = await Promise.all([getPageSeoRecords(), getFieldAttribute()]);
  const record = records.find((page) => clean(page.route) === route);
  const links = normalizePageLinks(record?.relatedLinks, defaultRelatedLinks(route), route);
  if (!links.length) return null;
  const title = clean(record?.relatedLinksTitle, relatedLinksTitle);
  const document = record?._id ? record : { _id: pageSeoDocumentId(route), _type: "pageSeo" };
  const headingId = `related-${route.slice(1).replaceAll("/", "-")}`;
  return <section data-related-pages className="mt-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm" aria-labelledby={headingId}>
    <h2 id={headingId} className="mb-3 text-base sm:text-lg font-bold text-[#016332]" data-sanity={attribute(document, "relatedLinksTitle")}>{title}</h2>
    <ul className="flex flex-wrap gap-2 sm:gap-3">
      {links.map((link) => <li key={link.href}>
        <Link href={link.href} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#016332]/20 px-3 py-2 text-sm font-semibold text-[#014d26] hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016332]">
          <span data-sanity={attribute(document, `relatedLinks[_key=="${link._key}"].label`)}>{link.label}</span>
          <ArrowRight size={14} aria-hidden="true" className="text-[#8B111A]" />
        </Link>
      </li>)}
    </ul>
  </section>;
}
