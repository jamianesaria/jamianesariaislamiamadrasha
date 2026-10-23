import { useCallback, useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { apiVersion } from "../env";

export function useRecords<T>(query: string, params: Record<string, string | number | string[]> = {}, isPrivate = false) {
  const baseClient = useClient({ apiVersion });
  const client = useMemo(() => baseClient.withConfig({ useCdn: false, perspective: "raw", ...(isPrivate ? { dataset: "submissions" } : {}) }), [baseClient, isPrivate]);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generation, setGeneration] = useState(0);
  const paramsKey = JSON.stringify(params);
  const refresh = useCallback(() => setGeneration((value) => value + 1), []);
  const reload = useCallback(async () => {
    try {
      const result = await client.fetch<T>(query, JSON.parse(paramsKey));
      setData(result); setError("");
      return result;
    } catch { setError("তথ্য হালনাগাদ করা যায়নি। রিফ্রেশ করুন।"); return null; }
  }, [client, query, paramsKey]);
  useEffect(() => {
    const abort = new AbortController();
    void client.fetch<T>(query, JSON.parse(paramsKey), { signal: abort.signal }).then((result) => {
      setData(result); setLoading(false); setError("");
    }).catch(() => { if (!abort.signal.aborted) { setLoading(false); setError(isPrivate ? "ইনবক্স খোলা যায়নি। এই অ্যাকাউন্টের ব্যক্তিগত তথ্য দেখার অনুমতি ও সংযোগ পরীক্ষা করুন।" : "তথ্য লোড করা যায়নি। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"); } });
    return () => abort.abort();
  }, [client, query, paramsKey, generation, isPrivate]);
  useEffect(() => {
    const subscription = client.listen('*[!(_type in ["sanity.imageAsset", "sanity.fileAsset"])]', {}, { includeResult: false, visibility: "query" }).subscribe({ next: refresh, error: () => { /* Manual refresh remains available after a disconnected live subscription. */ } });
    return () => subscription.unsubscribe();
  }, [client, refresh]);
  return { data, loading, error, refresh, reload, client };
}
