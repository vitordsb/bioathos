import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import { listProducts } from "@/lib/queries";
import { DeleteProductButton } from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const products = await listProducts();

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-[var(--brand-deep)]">Produtos</h1>
          <p className="text-[var(--ink-soft)] mt-1">
            {products.length} produto(s) cadastrado(s).
          </p>
        </div>
        <Link href="/admin/produtos/novo" className="cta-primary">+ Novo produto</Link>
      </div>

      <div className="mt-8 card overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-[var(--ink-soft)]">
            Nenhum produto ainda. Clique em <strong>+ Novo produto</strong> para começar.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[var(--brand-mist)] text-[var(--brand-deep)]">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Produto</th>
                <th className="text-left px-5 py-3 font-semibold">Categoria</th>
                <th className="text-left px-5 py-3 font-semibold">Destaque</th>
                <th className="text-right px-5 py-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-[var(--line)]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image_url} alt="" className="w-12 h-14 rounded-lg object-cover bg-[var(--brand-mist)]" />
                      <div>
                        <Link
                          href={`/produtos/${p.slug}`}
                          target="_blank"
                          className="font-semibold text-[var(--brand-deep)] hover:text-[var(--brand)]"
                        >
                          {p.title}
                        </Link>
                        <div className="text-xs text-[var(--muted)]">/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--ink-soft)]">
                    {p.category_name ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    {p.featured ? (
                      <span className="brand-pill">Destaque</span>
                    ) : (
                      <span className="text-[var(--muted)]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/produtos/${p.id}`}
                        className="text-[var(--brand-deep)] hover:text-[var(--brand)] font-semibold"
                      >
                        Editar
                      </Link>
                      <DeleteProductButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
