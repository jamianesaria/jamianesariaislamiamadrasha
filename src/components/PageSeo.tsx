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
  const siteNavigationItems = [
    { name: "জামিয়া পরিচিতি", description: "জামিয়ার ইতিহাস, ঐতিহ্য, লক্ষ্য-উদ্দেশ্য ও পরিচিতি", url: `${SITE_URL}/about` },
    { name: "শিক্ষা বিভাগ", description: "মক্তব, হিফজ, কিতাব ও মাদানি নেসাব বিভাগের বিবরণ", url: `${SITE_URL}/academics` },
    { name: "ভর্তি তথ্য ও ফি", description: "ভর্তির নিয়মাবলি, যোগ্যতা, বয়সসীমা, ফি চার্ট ও অনলাইন আবেদন", url: `${SITE_URL}/admission` },
    { name: "শিক্ষক মণ্ডলী", description: "মুহাদ্দিস, ক্বারী ও সুযোগ্য শিক্ষকবৃন্দের তালিকা", url: `${SITE_URL}/teachers` },
    { name: "পরীক্ষা ও ফলাফল", description: "বার্ষিক ও সাময়িক পরীক্ষার রুটিন এবং অনলাইন ফলাফল", url: `${SITE_URL}/results/academic` },
    { name: "নোটিশ বোর্ড", description: "মাদরাসার সকল জরুরি প্রাতিষ্ঠানিক প্রজ্ঞাপন ও নোটিশ", url: `${SITE_URL}/notices` },
    { name: "এতিমখানা ও সেবা", description: "এতিম ও অসহায় শিক্ষার্থীদের সহায়তা ও অনুদানের ফান্ড", url: `${SITE_URL}/orphanage` },
    { name: "যোগাযোগ ও অবস্থান", description: "মাদরাসার অবস্থান, ফোন নম্বর, হেল্পলাইন ও গুগল ম্যাপ", url: `${SITE_URL}/contact` },
  ];

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: settings.name,
      alternateName: settings.alternateNames,
      inLanguage: "bn-BD",
      publisher: { "@id": `${SITE_URL}/#institution` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/notices?category={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#institution`,
      url: SITE_URL,
      name: settings.fullName,
      alternateName: settings.englishName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(settings.logo),
        width: 339,
        height: 339,
        caption: settings.fullName,
      },
      image: absoluteUrl(settings.image),
      telephone: settings.phone.startsWith("0") ? `+88${settings.phone}` : settings.phone,
      email: settings.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address,
        addressLocality: "টঙ্গী",
        addressRegion: "গাজীপুর",
        addressCountry: "BD",
      },
      sameAs: [settings.facebook, settings.youtube].filter((url) => /^https:\/\//.test(url) && !/^https:\/\/(www\.)?(youtube|facebook)\.com\/?$/.test(url)),
    },
    ...(route === "/"
      ? [
          {
            "@type": "ItemList",
            "@id": `${SITE_URL}/#site-navigation`,
            name: "ওয়েবসাইট প্রধান বিভাগসমূহ ও নেভিগেশন (Main Navigation)",
            description: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার প্রধান তথ্য ও নেভিগেশন লিংকসমূহ",
            itemListElement: siteNavigationItems.map((item, idx) => ({
              "@type": "SiteNavigationElement",
              position: idx + 1,
              name: item.name,
              description: item.description,
              url: item.url,
            })),
          },
        ]
      : []),
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
