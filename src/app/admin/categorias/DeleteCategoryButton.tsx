"use client";

import { useTransition } from "react";
import { deleteCategoryAction } from "../actions";

export function DeleteCategoryButton({ id, name }: { id: number; name: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      onClick={() => {
        if (!confirm(`Excluir a categoria "${name}"? Os produtos perderão o vínculo.`)) return;
        start(() => deleteCategoryAction(id));
      }}
      disabled={pending}
      className="text-red-600 hover:text-red-700 font-semibold text-sm disabled:opacity-50"
    >
      {pending ? "..." : "Excluir"}
    </button>
  );
}
