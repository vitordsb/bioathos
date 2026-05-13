"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { deleteProductAction } from "../actions";

export function DeleteProductButton({ id, title }: { id: number; title: string }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-700 font-semibold transition-colors"
      >
        Excluir
      </button>
      <ConfirmDialog
        open={open}
        title={`Excluir "${title}"?`}
        message="Esta ação não pode ser desfeita. O produto desaparece imediatamente do catálogo."
        confirmLabel="Excluir produto"
        destructive
        pending={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() =>
          start(async () => {
            await deleteProductAction(id);
            setOpen(false);
          })
        }
      />
    </>
  );
}
