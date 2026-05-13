import Link from "next/link";
import type { ProductWithCategory } from "@/lib/db";

export function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="card group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/5] bg-[var(--brand-mist)] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        {product.featured ? (
          <span className="absolute top-3 left-3 brand-pill bg-white text-[var(--brand-deep)] shadow-sm">
            Destaque
          </span>
        ) : null}
      </div>
      <div className="p-5 flex-1 flex flex-col gap-2">
        {product.category_name && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)]">
            {product.category_name}
          </span>
        )}
        <h3 className="font-display text-lg leading-snug text-[var(--ink)]">
          {product.title}
        </h3>
        {product.short_description && (
          <p className="text-sm text-[var(--ink-soft)] line-clamp-2">
            {product.short_description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm font-semibold text-[var(--brand-deep)]">
            {product.price ? product.price : "Comprar"}
          </span>
          <span className="text-sm btn-ghost">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}
