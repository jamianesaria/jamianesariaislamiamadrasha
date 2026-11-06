import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Fall back promptly instead of holding public pages through a long CMS outage.
  timeout: 10_000,
  maxRetries: 1,
  stega: {
    enabled: false,
    studioUrl: "/studio",
    filter: (props) => props.resultPath.at(-1) === "text" || props.filterDefault(props),
  },
});
