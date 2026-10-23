import { draftMode } from "next/headers";
import PreviewOverlays from "./PreviewOverlays";
import { SanityLive } from "@/sanity/lib/live";

export default async function SanityVisualEditing() {
  const draft = await draftMode();
  return <><SanityLive includeDrafts={false} />{draft.isEnabled && <PreviewOverlays />}</>;
}
