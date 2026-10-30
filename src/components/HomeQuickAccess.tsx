import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { defaultQuickAccess, normalizePageLinks } from "@/data/seoData";
import { getFieldAttribute } from "@/content/server";

export default async function HomeQuickAccess({ content }: { content: typeof defaultQuickAccess }) {
  const links = normalizePageLinks(content.links, defaultQuickAccess.links, "/");
  if (!content.enabled || !links.length) return null;
  const attribute = await getFieldAttribute();
  const document = { _id: "homepage", _type: "homepage" };
  return <section data-quick-access className="max-w-7xl mx-auto px-3 sm:px-6 pt-6 sm:pt-8" aria-labelledby="home-quick-access">
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      <h2 id="home-quick-access" className="mb-3 text-base sm:text-lg font-bold text-[#016332]" data-sanity={attribute(document, "quickAccess.title")}>{content.title}</h2>
      <nav aria-labelledby="home-quick-access">
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {links.map((link) => <li key={link.href}>
            <Link href={link.href} className="flex min-h-12 h-full items-center justify-between gap-2 rounded-lg border border-[#016332]/15 bg-[#F4F5F0] px-3 py-3 text-sm font-semibold text-[#014d26] transition-colors hover:bg-emerald-50 hover:border-[#016332]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016332]">
              <span data-sanity={attribute(document, `quickAccess.links[_key=="${link._key}"].label`)}>{link.label}</span>
              <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-[#8B111A]" />
            </Link>
          </li>)}
        </ul>
      </nav>
    </div>
  </section>;
}
