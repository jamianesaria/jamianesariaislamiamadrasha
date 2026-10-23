import { useState } from "react";
import { useClient, type DocumentActionComponent } from "sanity";
import { Archive, RotateCcw } from "lucide-react";
import { apiVersion } from "../env";

// Archive preserves the record; the public queries exclude archived documents.
export const ArchiveAction: DocumentActionComponent = ({ id, draft, published, onComplete }) => {
  const client = useClient({ apiVersion });
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const archived = Boolean((draft || published)?.archivedAt);
  async function save() {
    setBusy(true); setError("");
    try {
      const pair = await client.getDocuments([id, `drafts.${id}`]);
      let transaction = client.transaction();
      for (const record of pair) if (record) transaction = transaction.patch(record._id, (patch) => archived ? patch.ifRevisionId(record._rev).unset(["archivedAt"]) : patch.ifRevisionId(record._rev).set({ archivedAt: new Date().toISOString() }));
      await transaction.commit(); setConfirm(false); onComplete();
    } catch { setError("পরিবর্তন সংরক্ষিত হয়নি। আপনার অনুমতি ও সংযোগ যাচাই করে আবার চেষ্টা করুন।"); }
    finally { setBusy(false); }
  }
  return {
    label: archived ? "আর্কাইভ থেকে ফিরিয়ে আনুন" : "আর্কাইভ করুন", icon: archived ? RotateCcw : Archive,
    disabled: busy || (!draft && !published), onHandle: () => setConfirm(true),
    dialog: confirm ? { type: "confirm", tone: "caution", message: error || (archived ? "এই প্রকাশনাটি আবার ওয়েবসাইটের তালিকায় দেখাতে চান?" : "প্রকাশনাটি ওয়েবসাইটের তালিকা থেকে সরবে। মূল তথ্য সংরক্ষিত থাকবে।"), confirmButtonText: archived ? "ফিরিয়ে আনুন" : "আর্কাইভ করুন", cancelButtonText: "ফিরে যান", onConfirm: () => { void save(); }, onCancel: () => { if (!busy) { setConfirm(false); onComplete(); } } } : undefined,
  };
};
