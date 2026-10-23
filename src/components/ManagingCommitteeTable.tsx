import ManagingCommitteeSection from "./ManagingCommitteeSection";
import { getCommitteeMembers, getSiteSettings } from "@/sanity/lib/queries";

export default async function ManagingCommitteeTable() {
  const [members, settings] = await Promise.all([getCommitteeMembers(), getSiteSettings()]);
  return <ManagingCommitteeSection initialMembers={members} initialSettings={settings} />;
}
