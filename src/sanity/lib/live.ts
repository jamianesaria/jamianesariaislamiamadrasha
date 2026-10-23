import "server-only";
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const serverToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  // Namespaced page-copy singletons need authenticated server reads even when published.
  client: client.withConfig({ token: serverToken }),
  serverToken,
  // Never serialize a write-capable server credential into a browser subscription.
  browserToken: false,
});
