import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { draftMode } from "next/headers";
import type { QueryParams } from "@sanity/client";
import { client } from "./client";
import { sanityFetch } from "./live";

async function publishedQuery<T>(query: string, params: QueryParams): Promise<T> {
  "use cache";
  cacheTag("madrasha-public-content");
  const { data } = await sanityFetch({ query, params, perspective: "published", stega: false });
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  return data as T;
}

export async function fetchSiteQuery<T = unknown>(query: string, params: QueryParams = {}): Promise<T> {
  // Request-only APIs are resolved before entering any shared cache boundary.
  const draft = await draftMode();
  if (draft.isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
    if (!token) throw new Error("Draft preview requires a server-side Sanity read token.");
    return client.fetch<T>(query, params, { perspective: "drafts", stega: true, token, useCdn: false, cache: "no-store", resultSourceMap: "withKeyArraySelector" });
  }
  return publishedQuery<T>(query, params);
}
