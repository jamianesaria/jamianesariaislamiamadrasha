"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCurrentUser } from "sanity";
import { IntentLink, useRouter } from "sanity/router";
import { ArrowUpRight, Bell, CalendarDays, ChevronLeft, ChevronRight, CircleHelp, Eye, FileText, GraduationCap, Inbox, LayoutDashboard, Menu, Plus, RefreshCw, Search, Settings, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import { modules, managementTypes, inboxKinds, statuses, fieldLabels } from "./catalog";
import { useRecords } from "./useRecords";
import DeleteButton from "./DeleteButton";

interface ContentRecord { _id: string; _rev: string; _type: string; _updatedAt: string; title: string; draft: boolean; published: boolean; archived: boolean }
interface Incoming { _id: string; _rev: string; reference: string; kind: string; receivedAt: string; status: string; fields: Record<string, string | boolean>; notes: string; history?: { _key: string; status: string; at: string; by: string }[] }
const date = (value: string) => new Intl.DateTimeFormat("bn-BD", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" }).format(new Date(value));
const statusLabel = (value: string) => statuses.find((entry) => entry.value === value)?.label || value;

function ContentList({ type, initialFilter = "all" }: { type: string; initialFilter?: string }) {
  const moduleInfo = modules.find((entry) => entry.type === type) || { group: "প্রকাশনা", label: "সংরক্ষিত খসড়া", description: "প্রকাশের অপেক্ষায় থাকা সব বিষয়বস্তু।", path: "/" };
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const { data, error, loading, refresh, client } = useRecords<ContentRecord[]>('*[($type == "all" || _type == $type) && _type in $types && ($status == "published" || _id in path("drafts.**") || !("drafts." + _id in *[_id in path("drafts.**")]._id)) && (($status == "archived" && defined(archivedAt)) || ($status != "archived" && !defined(archivedAt))) && ($status in ["all","archived"] || ($status == "draft" && _id in path("drafts.**")) || ($status == "published" && !(_id in path("drafts.**")))) && (!defined($search) || $search == "" || coalesce(title,name,studentName,route,"") match $search)] | order(_updatedAt desc) [$start...$end] {_id,_rev,_type,_updatedAt,"archived":defined(archivedAt),"title":coalesce(title,name,heroHeadline,route,"নামহীন খসড়া"),"draft":_id in path("drafts.**"),"published":defined(*[_id == string::split(^._id,"drafts.")[1]][0])}', { type, types: managementTypes, status: filter, search: search ? `*${search.replace(/[?*\\]/g, "")}*` : "", start: page * 30, end: page * 30 + 31 });
  const visible = (data || []).slice(0, 30);
  return <>
    <div className="m-page-heading"><div><span className="m-eyebrow">{moduleInfo?.group}</span><h1>{moduleInfo?.label}</h1><p>{moduleInfo?.description}</p></div>{type !== "pageContent" && type !== "all" && <IntentLink intent="create" params={{ type }} className="m-button m-primary"><Plus size={18} />নতুন যোগ করুন</IntentLink>}</div>
    <div className="m-toolbar"><label className="m-search"><Search size={18} /><input aria-label="শিরোনাম দিয়ে খুঁজুন" placeholder="শিরোনাম দিয়ে খুঁজুন…" value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} /></label><select aria-label="প্রকাশের অবস্থা" value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0); }}><option value="all">সব প্রকাশনা</option><option value="draft">খসড়া</option><option value="archived">আর্কাইভ</option><option value="published">প্রকাশিত</option></select><button className="m-icon-button" onClick={refresh} aria-label="তথ্য আবার আনুন"><RefreshCw size={18} /></button><a className="m-button" href={moduleInfo?.path || "/"} target="_blank" rel="noreferrer"><Eye size={17} />ওয়েবসাইটে দেখুন</a></div>
    {error && <p role="alert" className="m-alert">{error}</p>}
    {deleted && <p role="status" className="m-success">তথ্যটি স্থায়ীভাবে মুছে ফেলা হয়েছে।</p>}
    <div className="m-panel"><div className="m-table-scroll"><table className="m-table"><thead><tr><th>শিরোনাম</th><th>অবস্থা</th><th>সর্বশেষ পরিবর্তন</th><th /></tr></thead><tbody>{visible.map((record) => <tr key={record._id}><td><strong>{record.title}</strong></td><td><span className={`m-badge ${record.archived ? "আর্কাইভ" : record.archived ? "m-neutral" : record.draft ? "m-amber" : "m-green"}`}>{record.archived ? "আর্কাইভ" : record.draft ? "খসড়া" : "প্রকাশিত"}</span></td><td>{date(record._updatedAt)}</td><td className="m-row-actions"><IntentLink intent="edit" params={{ id: record._id.replace(/^drafts\./, ""), type: record._type }} className="m-text-link">সম্পাদনা <ArrowUpRight size={14} /></IntentLink><DeleteButton client={client} record={record} onDeleted={() => { setDeleted(true); refresh(); }} /></td></tr>)}</tbody></table></div>{!visible.length && <Empty loading={loading} title="এখানে এখনও কোনো প্রকাশনা নেই" detail="নতুন যোগ করুন বোতাম দিয়ে শুরু করুন। খসড়া সংরক্ষণ করে প্রকাশের আগে প্রিভিউ দেখতে পারবেন।" />}</div>
    <div className="m-pagination"><button className="m-button" disabled={!page} onClick={() => setPage(page - 1)}><ChevronLeft size={16} />আগের পাতা</button><span>পাতা {(page + 1).toLocaleString("bn-BD")}</span><button className="m-button" disabled={!data || data.length < 31} onClick={() => setPage(page + 1)}>পরের পাতা<ChevronRight size={16} /></button></div>
  </>;
}

function Empty({ title, detail, loading = false }: { title: string; detail: string; loading?: boolean }) {
  return <div className="m-empty" role="status"><span className="m-empty-icon"><Inbox size={28} /></span><h3>{loading ? "তথ্য আসছে…" : title}</h3><p>{loading ? "একটু অপেক্ষা করুন।" : detail}</p></div>;
}

function SubmissionDetail({ record, close, refresh }: { record: Incoming; close: () => void; refresh: () => Promise<unknown> }) {
  const user = useCurrentUser();
  const { client } = useRecords<null>('null', {}, true);
  const [status, setStatus] = useState(record.status);
  const [notes, setNotes] = useState(record.notes || "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLElement>(null);
  const dirty = status !== record.status || notes !== (record.notes || "");
  const requestClose = () => { if (!busy && (!dirty || window.confirm("পরিবর্তন সংরক্ষিত হয়নি। বন্ধ করতে চান?"))) close(); };
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const container = dialog.current;
    const focusable = () => [...(container?.querySelectorAll<HTMLElement>('button:not(:disabled),input,select,textarea,a[href]') || [])];
    focusable()[0]?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusable(); const first = items[0]; const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    container?.addEventListener("keydown", trap);
    return () => { container?.removeEventListener("keydown", trap); previous?.focus(); };
  }, []);
  async function save() {
    setBusy(true); setMessage("");
    try {
      await client.patch(record._id).ifRevisionId(record._rev).set({ status, notes }).setIfMissing({ history: [] }).append("history", [{ _key: crypto.randomUUID(), status, at: new Date().toISOString(), by: user?.name || user?.id || "কর্মী" }]).commit();
      await refresh(); close();
    } catch { setMessage("পরিবর্তন সংরক্ষণ হয়নি। অন্য কেউ তথ্য বদলে থাকলে তালিকা রিফ্রেশ করে আবার খুলুন। অনুমতি ও সংযোগও পরীক্ষা করুন।"); }
    finally { setBusy(false); }
  }
  return <div className="m-detail-backdrop"><section ref={dialog} onKeyDown={(event) => { if (event.key === "Escape") requestClose(); }} className="m-detail" role="dialog" aria-modal="true" aria-labelledby="submission-title"><header className="m-detail-header"><div><span className="m-eyebrow">ব্যক্তিগত আবেদন</span><h2 id="submission-title">{record.reference}</h2><p>{date(record.receivedAt)}</p></div><button className="m-icon-button" onClick={requestClose} aria-label="বিস্তারিত বন্ধ করুন"><X /></button></header><div className="m-detail-body">
    {typeof record.fields.studentImage === "string" && <Image src={record.fields.studentImage} unoptimized width={120} height={150} alt="আবেদনকারীর ব্যক্তিগত ছবি" className="m-private-photo" />}
    <dl className="m-fields">{Object.entries(record.fields).filter(([key, value]) => key !== "studentImage" && value !== "").map(([key, value]) => <div key={key}><dt>{fieldLabels[key] || key}</dt><dd>{typeof value === "boolean" ? (value ? "হ্যাঁ" : "না") : value}</dd></div>)}</dl>
    {record.kind === "badri" && <p className="m-note">এটি সহযোগিতার আবেদন। অর্থপ্রাপ্তি আলাদাভাবে যাচাই করতে হবে।</p>}
    <div className="m-editor-fields"><label>আবেদনের অগ্রগতি<select value={status} onChange={(event) => setStatus(event.target.value)}>{statuses.filter((entry) => record.kind === "contact" ? !["accepted", "rejected"].includes(entry.value) : entry.value !== "resolved").map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}</select></label><label>অফিসের ব্যক্তিগত মন্তব্য<textarea rows={4} maxLength={8000} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="এই মন্তব্য ওয়েবসাইটে প্রকাশ হবে না।" /></label></div>
    {!!record.history?.length && <div className="m-history"><h3>অগ্রগতির ইতিহাস</h3>{[...record.history].reverse().map((entry) => <p key={entry._key}><strong>{statusLabel(entry.status)}</strong> · {entry.by}<small>{date(entry.at)}</small></p>)}</div>}
    {message && <p role="alert" className="m-alert">{message}</p>}
    </div><footer className="m-detail-footer"><button className="m-button" onClick={requestClose}>ফিরে যান</button><DeleteButton client={client} record={{ _id: record._id, _rev: record._rev, _type: "incomingSubmission", title: record.reference }} disabled={busy} onDeleted={() => { void refresh(); close(); }} /><button className="m-button m-primary" disabled={busy} onClick={save}>{busy ? "সংরক্ষণ হচ্ছে…" : "পরিবর্তন সংরক্ষণ করুন"}</button></footer></section></div>;
}

function Submissions({ kind }: { kind: string }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Incoming | null>(null);
  const { data, loading, error, refresh, reload } = useRecords<Incoming[]>('*[_type=="incomingSubmission" && kind==$kind && ($status=="all" || status==$status) && ($search=="" || reference match $search || fields.studentName match $search || fields.name match $search || fields.phone match $search || fields.fatherMobile match $search)] | order(receivedAt desc) [$start...$end] {_id,_rev,reference,kind,receivedAt,status,fields,notes,history}', { kind, status: filter, search: search ? `*${search.replace(/[?*\\]/g, "")}*` : "", start: page * 25, end: page * 25 + 26 }, true);
  return <><div className="m-page-heading"><div><span className="m-eyebrow">সুরক্ষিত ইনবক্স</span><h1>{inboxKinds.find((entry) => entry.key === kind)?.label}</h1><p>ওয়েবসাইটে জমা দেওয়া তথ্য যাচাই করুন ও অগ্রগতি সংরক্ষণ করুন।</p></div><span className="m-private-label"><ShieldCheck size={17} />শুধু অনুমোদিত কর্মীদের জন্য</span></div><div className="m-toolbar"><label className="m-search"><Search size={18} /><input placeholder="নাম, মোবাইল বা আবেদন নম্বর…" aria-label="আবেদন খুঁজুন" value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} /></label><select aria-label="আবেদনের অবস্থা" value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0); }}>{[{ value: "all", label: "সব আবেদন" }, ...statuses].map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}</select><button className="m-button" onClick={refresh}><RefreshCw size={16} />রিফ্রেশ</button></div>{error && <p role="alert" className="m-alert">{error}</p>}<div className="m-panel"><div className="m-table-scroll"><table className="m-table"><thead><tr><th>আবেদনকারী / প্রেরক</th><th>অবস্থা</th><th>প্রাপ্তির সময়</th><th /></tr></thead><tbody>{data?.slice(0, 25).map((record) => <tr key={record._id}><td><strong>{record.fields.studentName || record.fields.name}</strong><small>{record.reference} · {record.fields.admissionClass || record.fields.subject || record.fields.phone}</small></td><td><span className={`m-badge ${record.status === "new" ? "m-amber" : "m-green"}`}>{statusLabel(record.status)}</span></td><td>{date(record.receivedAt)}</td><td><button className="m-text-link" onClick={() => setSelected(record)}>বিস্তারিত<ArrowUpRight size={14} /></button></td></tr>)}</tbody></table></div>{!data?.length && <Empty loading={loading} title="সবকিছু গুছানো আছে" detail="নতুন তথ্য জমা পড়লে এখানে দেখা যাবে। কোনো আবেদন কৃত্রিমভাবে তৈরি করা হয় না।" />}</div><div className="m-pagination"><button className="m-button" disabled={!page} onClick={() => setPage(page - 1)}>আগের পাতা</button><span>পাতা {(page + 1).toLocaleString("bn-BD")}</span><button className="m-button" disabled={!data || data.length < 26} onClick={() => setPage(page + 1)}>পরের পাতা</button></div>{selected && <SubmissionDetail key={selected._rev} record={selected} close={() => setSelected(null)} refresh={reload} />}</>;
}

function Overview({ open }: { open: (section: string) => void }) {
  const user = useCurrentUser();
  const publicStats = useRecords<{ notices: number; drafts: number; teachers: number; recent: ContentRecord[] }>('{"notices":count(*[_type=="notice" && !defined(archivedAt) && !(_id in path("drafts.**"))]),"drafts":count(*[_type in $types && _id in path("drafts.**") && !defined(archivedAt)]),"teachers":count(*[_type=="teacher" && !(_id in path("drafts.**"))]),"recent":*[_type in $types] | order(_updatedAt desc)[0...6]{_id,_type,_updatedAt,"title":coalesce(title,name,"নামহীন খসড়া")}}', { types: managementTypes });
  const inboxStats = useRecords<{ admission: number; contact: number; badri: number }>('{"admission":count(*[_type=="incomingSubmission" && kind=="admission" && status=="new"]),"contact":count(*[_type=="incomingSubmission" && kind=="contact" && status=="new"]),"badri":count(*[_type=="incomingSubmission" && kind=="badri" && status=="new"])}', {}, true);
  const cards = [
    { label: "নতুন ভর্তি আবেদন", value: inboxStats.data?.admission, section: "inbox:admission", icon: GraduationCap, tone: "m-sage" },
    { label: "নতুন যোগাযোগ বার্তা", value: inboxStats.data?.contact, section: "inbox:contact", icon: Inbox, tone: "m-blue" },
    { label: "প্রকাশিত নোটিশ", value: publicStats.data?.notices, section: "notice", icon: Bell, tone: "m-gold" },
    { label: "সংরক্ষিত খসড়া", value: publicStats.data?.drafts, section: "drafts", icon: FileText, tone: "m-rose" },
  ];
  return <><section className="m-welcome"><div className="m-welcome-pattern" /><div><span className="m-kicker"><span />আপনার প্রতিষ্ঠানের ডিজিটাল অফিস</span><h1>আসসালামু আলাইকুম{user?.name ? `, ${user.name.split(" ")[0]}` : ""}।</h1><p>আজকের কাজগুলো এক জায়গায়। নতুন আবেদন দেখুন, প্রকাশনা গুছিয়ে নিন<br className="m-desktop-only" /> অথবা সরাসরি ওয়েবসাইটের লেখা ও ছবি সম্পাদনা করুন।</p><button className="m-button m-light" onClick={() => open("visual")}><Sparkles size={17} />ওয়েবসাইট সম্পাদনা করুন<ArrowUpRight size={17} /></button></div><div className="m-welcome-mark"><Image src="/jamia-logo-v2.png" alt="জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা" width={112} height={112} /><span>আমানত · শৃঙ্খলা · সেবা</span></div></section><div className="m-stats">{cards.map((card) => <button className="m-stat m-panel" key={card.label} onClick={() => open(card.section)}><span className={`m-stat-icon ${card.tone}`}><card.icon size={23} /></span><div><strong>{card.value === undefined ? "—" : card.value.toLocaleString("bn-BD")}</strong><span>{card.label}</span></div><ArrowUpRight className="m-stat-arrow" size={17} /></button>)}</div>{(publicStats.error || inboxStats.error) && <p className="m-alert" role="alert">{publicStats.error || inboxStats.error}</p>}<div className="m-section-heading"><div><h2>দ্রুত কাজ শুরু করুন</h2><p>যে কাজটি করতে চান, সেটি বেছে নিন।</p></div></div><div className="m-quick-grid">{modules.slice(0, 4).map((entry, index) => <IntentLink className="m-quick-card m-panel" key={entry.type} intent="create" params={{ type: entry.type }}><span className="m-quick-number">০{index + 1}</span><h3>{entry.label}</h3><p>{entry.description}</p><span className="m-text-link">নতুন তৈরি করুন<Plus size={16} /></span></IntentLink>)}</div><div className="m-bottom-grid"><section className="m-panel m-padded"><div className="m-section-heading"><div><h2>প্রতিষ্ঠান ও মিডিয়া</h2><p>পরিচিতি ও প্রকাশিত বিষয়বস্তু হালনাগাদ রাখুন।</p></div></div><div className="m-shortcuts">{modules.slice(5, 12).map((entry) => <button key={entry.type} onClick={() => open(entry.type)}><span>{entry.label}</span><ChevronRight size={16} /></button>)}</div></section><section className="m-help-card"><CircleHelp size={25} /><h2>প্রকাশের আগে একবার দেখুন</h2><p>লেখা বা ছবি পরিবর্তন করলে আগে খসড়া সংরক্ষণ করুন। প্রিভিউ দেখে নিশ্চিত হয়ে প্রকাশ করুন। ব্যক্তিগত আবেদন ইনবক্সেই থাকবে।</p><button className="m-text-link" onClick={() => open("visual")}>প্রিভিউ খুলুন<ArrowUpRight size={16} /></button></section></div></>;
}

export default function ManagementTool() {
  const [section, setSection] = useState("dashboard");
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const user = useCurrentUser();
  const open = (next: string) => {
    setMenu(false);
    if (next === "visual") { router.navigate({ tool: "presentation" }); return; }

    setSection(next);
  };
  return <div className="m-admin"><aside className={`m-sidebar ${menu ? "m-sidebar-open" : ""}`}><div className="m-brand"><Image src="/jamia-logo-v2.png" alt="জামিয়ার লোগো" width={43} height={43} /><div><strong>জামিয়া নেছারিয়া</strong><small>ব্যবস্থাপনা কেন্দ্র</small></div></div><nav aria-label="ব্যবস্থাপনা মেনু"><button className={section === "dashboard" ? "m-nav-active" : ""} onClick={() => open("dashboard")}><LayoutDashboard size={18} />ড্যাশবোর্ড</button><button onClick={() => open("visual")}><Sparkles size={18} />ওয়েবসাইট সম্পাদনা<ArrowUpRight size={14} /></button><p>ইনবক্স</p>{inboxKinds.map((entry) => <button key={entry.key} className={section === `inbox:${entry.key}` ? "m-nav-active" : ""} onClick={() => open(`inbox:${entry.key}`)}><Inbox size={17} />{entry.label}</button>)}<p>প্রকাশনা ও ব্যবস্থাপনা</p>{modules.map((entry) => <button key={entry.type} className={section === entry.type ? "m-nav-active" : ""} onClick={() => open(entry.type)}>{entry.group === "একাডেমিক" ? <CalendarDays size={17} /> : entry.group === "প্রতিষ্ঠান" ? <Users size={17} /> : <FileText size={17} />}{entry.label}</button>)}<p>প্রতিষ্ঠান</p><IntentLink intent="edit" params={{ id: "siteSettings", type: "siteSettings" }}><Settings size={17} />সাধারণ সেটিংস</IntentLink><IntentLink intent="edit" params={{ id: "homepage", type: "homepage" }}><Eye size={17} />হোমপেজ ও ভিডিও</IntentLink></nav><div className="m-sidebar-footer"><ShieldCheck size={15} /><span>অনুমোদিত কর্মীদের নিরাপদ কর্মক্ষেত্র</span></div></aside><div className="m-workspace"><header className="m-topbar"><button className="m-icon-button m-mobile-menu" onClick={() => setMenu(!menu)} aria-label="মেনু খুলুন"><Menu size={21} /></button><span className="m-topbar-title">মাদরাসা কন্ট্রোল প্যানেল</span><div className="m-topbar-actions"><a href="/" target="_blank" rel="noreferrer" className="m-visit">ওয়েবসাইট দেখুন<ArrowUpRight size={15} /></a><span className="m-avatar">{(user?.name || "ক").slice(0, 1)}</span></div></header><main className="m-content">{section === "dashboard" ? <Overview open={open} /> : section.startsWith("inbox:") ? <Submissions key={section} kind={section.split(":")[1]} /> : <ContentList key={section} type={section === "drafts" ? "all" : section} initialFilter={section === "drafts" ? "draft" : "all"} />}<footer className="m-page-footer">জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা <span>সযত্নে পরিচালনা করুন।</span></footer></main></div></div>;
}
