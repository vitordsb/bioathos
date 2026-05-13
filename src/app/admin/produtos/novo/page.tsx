import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import { listCategories } from "@/lib/queries";
import { createProductAction } from "../../actions";
import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const categories = await listCategories();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-[var(--brand-deep)]">Novo produto</h1>
      <p className="text-[var(--ink-soft)] mt-1">
        Preencha os campos. A imagem é enviada na hora.
      </p>
      <div className="mt-6">
        <ProductForm
          action={createProductAction}
          categories={categories}
          submitLabel="Criar produto"
        />
      </div>
    </div>
  );
}
