import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { cookies, draftMode } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { resolvePerspectiveFromCookies } from "next-sanity/live";
import type { QueryParams } from "@sanity/client";
import { client } from "./client";
import { sanityFetch } from "./live";

type PublishedResult<T> = { ok: true; data: T } | { ok: false };

async function publishedQuery<T>(query: string, params: QueryParams): Promise<PublishedResult<T>> {
  "use cache";
  cacheTag("madrasha-public-content");
  try {
    const { data } = await sanityFetch({ query, params, perspective: "published", stega: false });
    cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
    return { ok: true, data: data as T };
  } catch (error) {
    unstable_rethrow(error);
    // Return a serializable failure across the cache boundary. Throwing here can
    // interrupt prerendering even when the caller has a fallback. Retry promptly.
    // Never cache an SDK error object: it can contain authorization headers.
    cacheLife({ stale: 0, revalidate: 5, expire: 10 });
    return { ok: false };
  }
}

export async function fetchSiteQuery<T = unknown>(query: string, params: QueryParams = {}): Promise<T> {
  // Request-only APIs are resolved before entering any shared cache boundary.
  const draft = await draftMode();
  if (draft.isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
    if (!token) throw new Error("Draft preview requires a server-side Sanity read token.");
    const perspective = await resolvePerspectiveFromCookies({ cookies: await cookies() });
    try {
      return await client.fetch<T>(query, params, { perspective, stega: true, token, useCdn: false, cache: "no-store", resultSourceMap: "withKeyArraySelector" });
    } catch (error) {
      unstable_rethrow(error);
      throw new Error("Sanity preview content request failed.");
    }
  }
  const result = await publishedQuery<T>(query, params);
  if (!result.ok) throw new Error("Sanity published content request failed.");
  return result.data;
}
