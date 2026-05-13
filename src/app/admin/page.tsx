import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed } from "@/lib/auth";
import { listCategories, listProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  const products = await listProducts();
  const categories = await listCategories();
  const featured = products.filter((p) => p.featured).length;

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--brand-deep)]">Painel</h1>
      <p className="text-[var(--ink-soft)] mt-2">
        Gerencie o catálogo da Bioathos: imagens, títulos, descrições e categorias.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="card p-6">
          <div className="text-sm uppercase tracking-wider text-[var(--brand)] font-semibold">Produtos</div>
          <div className="font-display text-4xl text-[var(--brand-deep)] mt-1">{products.length}</div>
        </div>
        <div className="card p-6">
          <div className="text-sm uppercase tracking-wider text-[var(--brand)] font-semibold">Categorias</div>
          <div className="font-display text-4xl text-[var(--brand-deep)] mt-1">{categories.length}</div>
        </div>
        <div className="card p-6">
          <div className="text-sm uppercase tracking-wider text-[var(--brand)] font-semibold">Em destaque</div>
          <div className="font-display text-4xl text-[var(--brand-deep)] mt-1">{featured}</div>
        </div>
      </div>

      <div className="mt-10 flex gap-3 flex-wrap">
        <Link href="/admin/produtos/novo" className="cta-primary">+ Novo produto</Link>
        <Link href="/admin/produtos" className="cta-secondary">Ver produtos</Link>
        <Link href="/admin/categorias" className="cta-secondary">Gerenciar categorias</Link>
      </div>
    </div>
  );
}
