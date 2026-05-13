import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import { listCategories } from "@/lib/queries";
import { createCategoryAction } from "../actions";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const categories = await listCategories();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-[var(--brand-deep)]">Categorias</h1>
      <p className="text-[var(--ink-soft)] mt-1">
        Organize os produtos em linhas. Mostradas no menu de filtros do catálogo.
      </p>

      <form action={createCategoryAction} className="card p-5 mt-6 flex gap-3">
        <input
          name="name"
          required
          placeholder="Ex: Skincare"
          className="flex-1 rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 outline-none focus:border-[var(--brand)]"
        />
        <button type="submit" className="cta-primary">Adicionar</button>
      </form>

      <div className="mt-6 card overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-10 text-center text-[var(--ink-soft)]">
            Nenhuma categoria ainda.
          </div>
        ) : (
          <ul className="divide-y divide-[var(--line)]">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <div className="font-semibold text-[var(--brand-deep)]">{c.name}</div>
                  <div className="text-xs text-[var(--muted)]">/{c.slug}</div>
                </div>
                <DeleteCategoryButton id={c.id} name={c.name} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
