import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, listProducts } from "@/lib/queries";
import { ProductActions } from "@/components/ProductActions";
import { ProductCard } from "@/components/ProductCard";
import { productInquiryMessage, whatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function ProductDetail(props: PageProps<"/produtos/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await listProducts({ categorySlug: product.category_slug ?? undefined }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const whats = whatsappLink(productInquiryMessage(product.title, product.slug));

  return (
    <>
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pt-10 pb-6">
        <nav className="text-sm text-[var(--ink-soft)] flex gap-2">
          <Link href="/" className="hover:text-[var(--brand)]">Início</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-[var(--brand)]">Produtos</Link>
          {product.category_name && (
            <>
              <span>/</span>
              <Link href={`/produtos?categoria=${product.category_slug}`} className="hover:text-[var(--brand)]">
                {product.category_name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[var(--ink)]">{product.title}</span>
        </nav>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 pb-16">
        <div className="rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--brand-mist)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          {product.category_name && (
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
              {product.category_name}
            </span>
          )}
          <h1 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-2 leading-tight">
            {product.title}
          </h1>
          {product.short_description && (
            <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
              {product.short_description}
            </p>
          )}

          <div className="my-6 divider-soft" />

          <p className="text-[var(--ink-soft)] leading-relaxed whitespace-pre-line">
            {product.description}
          </p>

          <div className="my-6 divider-soft" />

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-display text-[var(--brand-deep)]">
              {product.price ? product.price : "Valor sob consulta"}
            </span>
            {!product.price && (
              <a href={whats} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
                consulte pelo WhatsApp →
              </a>
            )}
          </div>

          <ProductActions
            productId={product.id}
            slug={product.slug}
            title={product.title}
            image_url={product.image_url}
          />

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-[var(--ink-soft)]">
            <div className="rounded-2xl border border-[var(--line)] p-3">
              <div className="font-semibold text-[var(--brand-deep)]">Manipulação própria</div>
              Controle de qualidade lote a lote.
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-3">
              <div className="font-semibold text-[var(--brand-deep)]">Atendimento humano</div>
              WhatsApp com farmacêutica.
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-3">
              <div className="font-semibold text-[var(--brand-deep)]">Retirada / entrega</div>
              Barueri e região.
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
          <h2 className="font-display text-2xl md:text-3xl text-[var(--brand-deep)] mb-6">
            Produtos relacionados
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
