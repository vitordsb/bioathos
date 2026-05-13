"use client";

import { useTransition } from "react";
import { deleteProductAction } from "../actions";

export function DeleteProductButton({ id, title }: { id: number; title: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      onClick={() => {
        if (!confirm(`Excluir o produto "${title}"?`)) return;
        start(() => deleteProductAction(id));
      }}
      disabled={pending}
      className="text-red-600 hover:text-red-700 font-semibold disabled:opacity-50"
    >
      {pending ? "Excluindo..." : "Excluir"}
    </button>
  );
}
