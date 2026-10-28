import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seoData";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
