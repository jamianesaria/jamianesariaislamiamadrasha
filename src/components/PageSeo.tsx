import Link from "next/link";
import { absoluteUrl, jsonLd, seoRoutes, SITE_URL } from "@/data/seoData";
import { clean, getPageSeoRecords, getSeoSettings } from "@/lib/seo";

export default async function PageSeo({ route, title }: { route: string; title?: string }) {
  const [settings, records] = await Promise.all([getSeoSettings(), getPageSeoRecords()]);
  const record = records.find((page) => clean(page.route) === route);
  const entry = seoRoutes[route];
  const parent = entry?.parent || (route.startsWith("/blog/") ? "/blog" : undefined);
  const labelFor = (path: string) => clean(records.find((page) => clean(page.route) === path)?.breadcrumbLabel, seoRoutes[path]?.label || path);
  const label = clean(record?.breadcrumbLabel, title || entry?.label || settings.name);
  const crumbs = [{ label: settings.homeLabel, path: "/" }, ...(parent ? [{ label: labelFor(parent), path: parent }] : []), { label, path: route }];
  const graph = [
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: settings.name, alternateName: [settings.fullName, settings.englishName], inLanguage: "bn-BD", publisher: { "@id": `${SITE_URL}/#institution` } },
    { "@type": "EducationalOrganization", "@id": `${SITE_URL}/#institution`, url: SITE_URL, name: settings.fullName, alternateName: settings.englishName, logo: absoluteUrl(settings.logo), telephone: settings.phone.startsWith("0") ? `+88${settings.phone}` : settings.phone, email: settings.email, address: { "@type": "PostalAddress", streetAddress: settings.address, addressLocality: "টঙ্গী", addressRegion: "গাজীপুর", addressCountry: "BD" }, sameAs: [settings.facebook, settings.youtube].filter((url) => /^https:\/\//.test(url) && !/^https:\/\/(www\.)?youtube\.com\/?$/.test(url)) },
    ...(route !== "/" ? [{ "@type": "BreadcrumbList", "@id": `${absoluteUrl(route)}#breadcrumb`, itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.label, item: absoluteUrl(crumb.path) })) }] : []),
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@graph": graph }) }} />
    {route !== "/" && <div className="mb-5 space-y-3">
      <nav aria-label={settings.breadcrumbLabel} className="text-xs sm:text-sm text-gray-600">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((crumb, index) => <li key={crumb.path} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="text-gray-400">›</span>}
            {index === crumbs.length - 1 ? <span aria-current="page" className="font-semibold text-[#016332]">{crumb.label}</span> : <Link href={crumb.path} className="hover:underline focus-visible:underline">{crumb.label}</Link>}
          </li>)}
        </ol>
      </nav>
      {entry?.heading && <h1 className="text-xl sm:text-2xl font-bold text-[#016332]">{clean(record?.pageHeading, entry.label)}</h1>}
    </div>}
  </>;
}
