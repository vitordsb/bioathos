"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { deleteCategoryAction } from "../actions";

export function DeleteCategoryButton({ id, name }: { id: number; name: string }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
      >
        Excluir
      </button>
      <ConfirmDialog
        open={open}
        title={`Excluir categoria "${name}"?`}
        message="Os produtos vinculados perderão o vínculo com essa categoria, mas continuam existindo."
        confirmLabel="Excluir categoria"
        destructive
        pending={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() =>
          start(async () => {
            await deleteCategoryAction(id);
            setOpen(false);
          })
        }
      />
    </>
  );
}
