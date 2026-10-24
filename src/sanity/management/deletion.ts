import type { SanityClient } from "@sanity/client";
import { managementTypes } from "./catalog";

export interface DeletionRecord { _id: string; _rev: string; _type: string; title: string }
interface Version { _id: string; _rev: string; _type: string }
export interface DeletionSnapshot { dataset: string; projectId: string; ids: string[]; versions: Version[] }
const protectedTypes = new Set(["homepage", "siteSettings", "pageContent", "badriKafila"]);
export class DeletionConflictError extends Error {}

export function canDeleteRecord(type: string) {
  return type === "incomingSubmission" || (managementTypes.includes(type) && !protectedTypes.has(type));
}

export async function prepareDeletion(client: SanityClient, record: DeletionRecord, signal?: AbortSignal): Promise<DeletionSnapshot> {
  const { dataset, projectId } = client.config();
  if (!dataset || !projectId || !canDeleteRecord(record._type)) throw new DeletionConflictError("এই তথ্যটি মুছে ফেলা যাবে না। বিষয়বস্তু সম্পাদনা করুন।");
  const isSubmission = record._type === "incomingSubmission";
  if (isSubmission && (dataset !== "submissions" || !/^incoming\.[a-f0-9]{64}$/.test(record._id))) throw new DeletionConflictError("আবেদনের সংরক্ষণ ব্যবস্থা যাচাই করা যায়নি।");
  if (!isSubmission && dataset === "submissions") throw new DeletionConflictError("তথ্যের সংরক্ষণ ব্যবস্থা সঠিক নয়।");
  const id = record._id.replace(/^drafts\./, "");
  const ids = isSubmission ? [record._id] : [id, `drafts.${id}`];
  const versions = await client.fetch<Version[]>('*[_id in $ids]{_id,_rev,_type}', { ids }, { perspective: "raw", useCdn: false, signal });
  if (versions.find(version => version._id === record._id)?._rev !== record._rev || versions.some(version => version._type !== record._type)) throw new DeletionConflictError("তথ্যটি ইতিমধ্যে বদলেছে বা মুছে গেছে। তালিকা রিফ্রেশ করে আবার খুলুন।");
  return { dataset, projectId, ids, versions };
}

export async function deleteConfirmedRecord(client: SanityClient, snapshot: DeletionSnapshot) {
  const config = client.config();
  if (config.dataset !== snapshot.dataset || config.projectId !== snapshot.projectId || !snapshot.versions.length || snapshot.versions.some(version => !canDeleteRecord(version._type) || (snapshot.dataset === "submissions" && (version._type !== "incomingSubmission" || !/^incoming\.[a-f0-9]{64}$/.test(version._id))))) throw new DeletionConflictError("মুছে ফেলার তথ্য যাচাই করা যায়নি।");
  const current = await client.fetch<Version[]>('*[_id in $ids]{_id,_rev,_type}', { ids: snapshot.ids }, { perspective: "raw", useCdn: false });
  if (current.length !== snapshot.versions.length || current.some(version => !snapshot.versions.some(previous => previous._id === version._id && previous._rev === version._rev && previous._type === version._type))) throw new DeletionConflictError("নিশ্চিত করার পর তথ্য বদলেছে। কোনো তথ্য মুছে ফেলা হয়নি। আবার যাচাই করুন।");
  let transaction = client.transaction();
  for (const version of snapshot.versions) {
    transaction = transaction.patch(version._id, patch => patch.ifRevisionId(version._rev).unset(["_managementDeleteGuard"])).delete(version._id);
  }
  // The signed-in Studio user's permissions and Sanity's reference integrity apply.
  await transaction.commit();
}
