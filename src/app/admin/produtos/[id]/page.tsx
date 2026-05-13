import { notFound, redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import { getProductById, listCategories } from "@/lib/queries";
import { updateProductAction } from "../../actions";
import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage(props: PageProps<"/admin/produtos/[id]">) {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const { id } = await props.params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();
  const product = await getProductById(productId);
  if (!product) notFound();

  const categories = await listCategories();
  const action = updateProductAction.bind(null, productId);

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-[var(--brand-deep)]">Editar produto</h1>
      <p className="text-[var(--ink-soft)] mt-1">{product.title}</p>
      <div className="mt-6">
        <ProductForm
          action={action}
          categories={categories}
          product={product}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}
