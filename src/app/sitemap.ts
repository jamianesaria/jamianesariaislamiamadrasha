import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { client } from "@/sanity/lib/client";
import { absoluteUrl, blogPath, seoRoutes } from "@/data/seoData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });
  cacheTag("madrasha-public-content");
  let data: { pages: { route: string; noIndex?: boolean; _updatedAt?: string }[]; posts: { slug: string; _updatedAt?: string }[] } = { pages: [], posts: [] };
  try {
    data = await client.fetch('{"pages":*[_type=="pageSeo" && !defined(archivedAt)]{route,noIndex,_updatedAt},"posts":*[_type=="blogPost" && !defined(archivedAt) && defined(slug.current) && noIndex!=true]{"slug":slug.current,_updatedAt}}', {}, { perspective: "published", stega: false });
  } catch { /* Keep the canonical static pages available when the CMS is offline. */ }
  return [
    ...Object.keys(seoRoutes).filter((route) => !data.pages.some((page) => page.route === route && page.noIndex)).map((route) => ({ url: absoluteUrl(route) })),
    ...data.posts.map((post) => ({ url: absoluteUrl(blogPath(post.slug)), ...(post._updatedAt ? { lastModified: post._updatedAt } : {}) })),
  ];
}
