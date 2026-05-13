"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  pending = false,
  onConfirm,
  onCancel,
}: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !pending) onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, pending, onCancel]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(15,44,42,0.55)] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !pending) onCancel();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="modal-panel w-full max-w-md bg-white rounded-3xl shadow-[0_30px_80px_-30px_rgba(15,44,42,0.55)] p-6 outline-none"
      >
        <h2 id="confirm-title" className="font-display text-xl text-[var(--brand-deep)]">
          {title}
        </h2>
        {message && (
          <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{message}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="cta-secondary text-sm py-2 px-4 disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={
              destructive
                ? "inline-flex items-center justify-center gap-2 rounded-full bg-red-600 text-white font-semibold text-sm py-2 px-4 hover:bg-red-700 transition disabled:opacity-60"
                : "cta-primary text-sm py-2 px-4 disabled:opacity-60"
            }
          >
            {pending ? "Aguarde..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
