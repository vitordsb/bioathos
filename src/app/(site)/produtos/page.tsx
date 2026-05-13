import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategoryBySlug, listCategories, listProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ProductsPage(props: PageProps<"/produtos">) {
  const searchParams = await props.searchParams;
  const categoria =
    typeof searchParams.categoria === "string" ? searchParams.categoria : undefined;

  const categories = await listCategories();
  const currentCategory = categoria ? await getCategoryBySlug(categoria) : undefined;
  const products = await listProducts({ categorySlug: currentCategory?.slug });

  return (
    <>
      <section className="bioathos-gradient">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-14 pb-10">
          <span className="brand-pill">Catálogo Bioathos</span>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--brand-deep)] mt-3 max-w-3xl">
            {currentCategory ? currentCategory.name : "Todos os produtos"}
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] max-w-2xl">
            Manipulação premium em Barueri. Selecione um produto para conhecer
            os detalhes e iniciar a conversa pelo WhatsApp.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/produtos"
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              !currentCategory
                ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                : "bg-white text-[var(--brand-deep)] border-[var(--line)] hover:border-[var(--brand-light)]"
            }`}
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/produtos?categoria=${c.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                currentCategory?.id === c.id
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "bg-white text-[var(--brand-deep)] border-[var(--line)] hover:border-[var(--brand-light)]"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--line)] p-12 text-center text-[var(--ink-soft)]">
            Nenhum produto cadastrado nessa categoria ainda.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
