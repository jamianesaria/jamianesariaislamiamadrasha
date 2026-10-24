import { useEffect, useRef, useState } from "react";
import type { SanityClient } from "@sanity/client";
import { Trash2 } from "lucide-react";
import { canDeleteRecord, deleteConfirmedRecord, DeletionConflictError, prepareDeletion, type DeletionRecord, type DeletionSnapshot } from "./deletion";

export default function DeleteButton({ client, record, onDeleted, disabled = false }: { client: SanityClient; record: DeletionRecord; onDeleted: () => void; disabled?: boolean }) {
  const [target, setTarget] = useState<DeletionRecord | null>(null);
  if (!canDeleteRecord(record._type)) return null;
  return <><button type="button" className="m-button m-danger" disabled={disabled} onClick={() => setTarget({ ...record })}><Trash2 size={16} />মুছে ফেলুন</button>{target && <DeleteConfirmation client={client} record={target} close={() => setTarget(null)} onDeleted={() => { setTarget(null); onDeleted(); }} />}</>;
}

function DeleteConfirmation({ client, record, close, onDeleted }: { client: SanityClient; record: DeletionRecord; close: () => void; onDeleted: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [snapshot, setSnapshot] = useState<DeletionSnapshot | null>(null);
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const controller = new AbortController();
    void prepareDeletion(client, record, controller.signal).then(setSnapshot).catch(() => {
      if (!controller.signal.aborted) setError("তথ্যটি বদলে থাকলে তালিকা রিফ্রেশ করুন। আপনার অনুমতি ও সংযোগও পরীক্ষা করুন।");
    });
    return () => { controller.abort(); element?.close(); };
  }, [client, record]);
  async function remove() {
    if (!checked || !snapshot || busy) return;
    setBusy(true); setError("");
    try { await deleteConfirmedRecord(client, snapshot); onDeleted(); }
    catch (failure) { setError(failure instanceof DeletionConflictError ? failure.message : "মুছে ফেলা যায়নি। তথ্যটি অন্য কোথাও ব্যবহৃত হতে পারে, অথবা আপনার অনুমতি নেই। রিফ্রেশ করে আবার যাচাই করুন।"); }
    finally { setBusy(false); }
  }
  return <dialog ref={dialog} role="alertdialog" aria-labelledby="delete-record-title" aria-describedby="delete-record-description" className="m-delete-dialog" onKeyDownCapture={event => event.stopPropagation()} onCancel={event => { event.preventDefault(); if (!busy) close(); }}>
    <h2 id="delete-record-title">স্থায়ীভাবে মুছে ফেলবেন?</h2><p className="m-delete-record-name">{record.title}</p>
    <p id="delete-record-description">{record._type === "incomingSubmission" ? "এই আবেদন, ব্যক্তিগত তথ্য, ছবি ও অফিসের মন্তব্য মুছে যাবে।" : "এই প্রকাশনার খসড়া ও প্রকাশিত সংস্করণ মুছে যাবে। ওয়েবসাইটেও তথ্যটি আর দেখা যাবে না।"} এই প্যানেল থেকে তা ফিরিয়ে আনা যাবে না।</p>
    {record._type !== "incomingSubmission" && <p className="m-note">অন্য প্রকাশনায় ব্যবহৃত ছবি বা PDF নিরাপদ রাখতে সংযুক্ত ফাইল আলাদাভাবে সংরক্ষিত থাকবে।</p>}
    {record._type !== "incomingSubmission" && <p className="m-note">ওয়েবসাইট থেকে সরতে প্রায় এক মিনিট লাগতে পারে।</p>}
    {!snapshot && !error && <p role="status">তথ্য যাচাই হচ্ছে…</p>}
    {error && <p role="alert" className="m-alert">{error}</p>}
    <label className="m-delete-ack"><input type="checkbox" checked={checked} disabled={busy || !snapshot} onChange={event => setChecked(event.target.checked)} />আমি বুঝেছি এবং এই তথ্য স্থায়ীভাবে মুছতে চাই।</label>
    <div className="m-delete-actions"><button type="button" className="m-button" disabled={busy} onClick={close} autoFocus>ফিরে যান</button><button type="button" className="m-button m-danger" disabled={!checked || !snapshot || busy} onClick={() => { void remove(); }}>{busy ? "মুছে ফেলা হচ্ছে…" : "স্থায়ীভাবে মুছুন"}</button></div>
  </dialog>;
}
