import { useMemo } from "react";
import { useClient, type ObjectInputProps } from "sanity";
import { useRouter } from "sanity/router";
import { apiVersion } from "../env";
import DeleteButton from "./DeleteButton";

/** A visible delete control in the editor, using the dashboard's checked deletion flow. */
export function DeletableDocumentInput(props: ObjectInputProps) {
  const baseClient = useClient({ apiVersion });
  const client = useMemo(() => baseClient.withConfig({ useCdn: false, perspective: "raw" }), [baseClient]);
  const router = useRouter();
  const value = props.value as { _id?: string; _rev?: string; _type?: string; title?: string; name?: string } | undefined;
  const record = value?._id && value._rev && value._type
    ? { _id: value._id, _rev: value._rev, _type: value._type, title: value.title || value.name || "নামহীন প্রকাশনা" }
    : null;

  return <>
    {record && <div className="m-studio-delete"><DeleteButton client={client} record={record} onDeleted={() => router.navigate({ tool: "structure" })} /></div>}
    {props.renderDefault(props)}
  </>;
}
