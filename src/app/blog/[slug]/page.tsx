import { cache, Suspense } from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import { EditablePage, EditableImage, getFieldAttribute } from "@/content/server";
import { fieldSource } from "@/content/model";
import { getBlogPosts, getSiteSettings, getNewsTicker } from "@/sanity/lib/queries";
import { clean, getPageSeoRecords, getSeoSettings, socialImage } from "@/lib/seo";
import { absoluteUrl, blogPath, jsonLd, SITE_URL } from "@/data/seoData";

type Props = { params: Promise<{ slug: string }> };
const getArticle = cache(async (slug: string) => (await getBlogPosts()).find((post) => clean(post.slug) === slug));
const validDate = (value?: string) => value && !Number.isNaN(Date.parse(value)) ? new Date(value).toISOString() : undefined;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getArticle((await params).slug);
  if (!post) notFound();
  const settings = await getSeoSettings();
  const title = clean(post.seoTitle, `${clean(post.title)} | ${settings.name}`);
  const description = clean(post.seoDescription, clean(post.excerpt, settings.description));
  const url = absoluteUrl(blogPath(clean(post.slug)));
  const image = socialImage(post.seoImageUrl || post.thumbnail || settings.image);
  const preview = (await draftMode()).isEnabled;
  return {
    title: { absolute: title }, description, alternates: { canonical: url },
    robots: { index: !preview && !post.noIndex, follow: true },
    openGraph: { type: "article", locale: "bn_BD", siteName: settings.name, title, description, url, images: [{ url: image, alt: clean(post.title) }], publishedTime: validDate(post.publishedAt), modifiedTime: validDate(post.updatedAt), authors: [clean(post.author)] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

async function ArticleContent({ params }: Props) {
  const post = await getArticle((await params).slug);
  if (!post) notFound();
  const [settings, news, seoPages, attribute] = await Promise.all([getSiteSettings(), getNewsTicker(), getPageSeoRecords(), getFieldAttribute()]);
  const labels = seoPages.find((page) => clean(page.route) === "/blog");
  const url = absoluteUrl(blogPath(clean(post.slug)));
  const article = {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${url}#article`, url,
    headline: clean(post.title), description: clean(post.excerpt), inLanguage: "bn-BD",
    image: socialImage(post.seoImageUrl || post.thumbnail),
    author: { "@type": /পরিষদ|কর্তৃপক্ষ|মাদরাসা/.test(clean(post.author)) ? "Organization" : "Person", name: clean(post.author) },
    publisher: { "@id": `${SITE_URL}/#institution` }, mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: validDate(post.publishedAt), dateModified: validDate(post.updatedAt),
  };
  return <EditablePage route="/blog"><div className="min-h-screen bg-[#FAF7F0] flex flex-col">
    <HeaderBanner initialSettings={settings} /><NavigationBar /><BreakingNewsBar newsItems={news} />
    <main className="max-w-5xl mx-auto w-full flex-1 px-3 sm:px-6 py-6 sm:py-8">
      <PageSeo route={blogPath(clean(post.slug))} title={clean(post.title)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(article) }} />
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="p-5 sm:p-10 space-y-5">
          <p className="font-semibold text-sm text-[#8B111A]" data-sanity={attribute(post, "category")}>{post.category}</p>
          <h1 className="text-2xl sm:text-4xl leading-snug font-bold text-[#016332]" data-sanity={attribute(post, "title")}>{post.title}</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
            <p>{clean(labels?.articleAuthorLabel, "লেখক")}: <span data-sanity={attribute(post, "author")}>{post.author}</span></p>
            <p>{clean(labels?.articleDateLabel, "প্রকাশ")}: <time dateTime={validDate(post.publishedAt)} data-sanity={attribute(post, "date")}>{post.date}</time></p>
          </div>
          <p className="border-l-4 border-[#016332] pl-4 text-base text-gray-700 leading-relaxed" data-sanity={attribute(post, "excerpt")}>{post.excerpt}</p>
        </div>
        <div className="relative aspect-video">
          <EditableImage source={fieldSource(post, "thumbnail")} src={clean(post.thumbnail)} alt={clean(post.title)} fill sizes="(max-width: 1024px) 94vw, 976px" preload className="object-cover" />
        </div>
        <div className="p-5 sm:p-10 text-base sm:text-lg leading-loose text-gray-800 space-y-5" data-sanity={attribute(post, "content")}>
          {post.content.split(/\n\s*\n|\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </article>
      <Link href="/blog" className="mt-6 inline-block font-semibold text-[#016332] underline">{clean(labels?.backToBlogLabel, "সকল প্রবন্ধে ফিরে যান")}</Link>
    </main>
    <Footer initialSettings={settings} />
  </div></EditablePage>;
}

export default function ArticlePage(props: Props) {
  return <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0]" aria-busy="true" />}><ArticleContent {...props} /></Suspense>;
}
