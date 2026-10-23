import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: false,
    studioUrl: "/studio",
    filter: (props) => props.resultPath.at(-1) === "text" || props.filterDefault(props),
  },
});
