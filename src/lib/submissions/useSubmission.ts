"use client";

import { useRef, useState } from "react";

export function useSubmission(endpoint: string) {
  const key = useRef<string | null>(null);
  const busy = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  async function submit(data: unknown): Promise<{ reference: string } | null> {
    if (busy.current) return null;
    busy.current = true;
    key.current ||= crypto.randomUUID();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": key.current }, body: JSON.stringify(data) });
      const result: { success?: boolean; reference?: string; message?: string } = await response.json();
      if (!response.ok || !result.success || !result.reference) throw new Error(result.message || "তথ্য সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।");
      key.current = null;
      return { reference: result.reference };
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।");
      return null;
    } finally { busy.current = false; setIsSubmitting(false); }
  }
  return { submit, isSubmitting, error };
}

export async function preparePrivatePhoto(file: File): Promise<string> {
  if (!/image\/(jpeg|png|webp)/.test(file.type) || file.size > 2_000_000) throw new Error("২ এমবির মধ্যে JPG, PNG অথবা WebP ছবি দিন।");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("ছবি প্রস্তুত করা যায়নি।");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } finally { bitmap.close(); }
}
