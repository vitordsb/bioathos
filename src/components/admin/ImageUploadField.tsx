"use client";

import { useState } from "react";

export function ImageUploadField({ initial = "" }: { initial?: string }) {
  const [url, setUrl] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setBusy(false);
    if (!res.ok) {
      setError("Não consegui enviar a imagem.");
      return;
    }
    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="image_url" value={url} />
      <div className="flex items-center gap-4">
        <div className="w-28 h-32 rounded-xl border border-dashed border-[var(--line)] bg-[var(--brand-mist)] overflow-hidden flex items-center justify-center text-xs text-[var(--muted)]">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="prévia" className="w-full h-full object-cover" />
          ) : (
            "sem imagem"
          )}
        </div>
        <div className="flex-1">
          <label className="cta-secondary cursor-pointer">
            {busy ? "Enviando..." : url ? "Trocar imagem" : "Enviar imagem"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              onChange={handleFile}
              disabled={busy}
            />
          </label>
          <p className="text-xs text-[var(--muted)] mt-2">
            JPG, PNG, WEBP ou AVIF — até 8 MB.
          </p>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
