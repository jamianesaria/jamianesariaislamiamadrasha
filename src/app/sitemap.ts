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
  const getPriority = (route: string): number => {
    if (route === "/") return 1.0;
    if (["/admission", "/academics", "/teachers", "/notices", "/contact", "/orphanage", "/about"].includes(route)) return 0.9;
    if (["/results/academic", "/results/admission", "/exam-routine", "/apply", "/committee", "/badri-kafila", "/gallery", "/blog"].includes(route)) return 0.8;
    return 0.7;
  };

  const getChangeFreq = (route: string): "daily" | "weekly" | "monthly" => {
    if (route === "/" || route === "/notices") return "daily";
    if (["/admission", "/academics", "/teachers", "/contact", "/results/academic", "/results/admission", "/exam-routine", "/blog"].includes(route)) return "weekly";
    return "monthly";
  };

  return [
    ...Object.keys(seoRoutes)
      .filter((route) => !data.pages.some((page) => page.route === route && page.noIndex))
      .map((route) => {
        const pageRecord = data.pages.find((p) => p.route === route);
        return {
          url: absoluteUrl(route),
          ...(pageRecord?._updatedAt ? { lastModified: pageRecord._updatedAt } : {}),
          changeFrequency: getChangeFreq(route),
          priority: getPriority(route),
        };
      }),
    ...data.posts.map((post) => ({
      url: absoluteUrl(blogPath(post.slug)),
      ...(post._updatedAt ? { lastModified: post._updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
