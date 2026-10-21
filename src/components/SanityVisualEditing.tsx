import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

export default async function SanityVisualEditing() {
  return (await draftMode()).isEnabled ? <VisualEditing /> : null;
}
