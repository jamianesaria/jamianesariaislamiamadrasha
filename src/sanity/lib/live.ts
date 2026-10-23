import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
  // Never serialize a write-capable server credential into a browser subscription.
  browserToken: false,
});
