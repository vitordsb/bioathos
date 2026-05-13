"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { cartMessage, whatsappLink } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, count, setQuantity, removeItem, clear } = useCart();

  const whatsHref = whatsappLink(cartMessage(items));
  const empty = items.length === 0;

  return (
    <section className="max-w-5xl mx-auto px-5 lg:px-8 py-14">
      <span className="brand-pill">Seu carrinho</span>
      <h1 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-3">
        Revise seus itens
      </h1>
      <p className="mt-3 text-[var(--ink-soft)] max-w-2xl">
        A finalização do pedido é feita pelo WhatsApp com nosso atendimento humano.
        Confira os produtos, ajuste a quantidade e clique em finalizar.
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {empty ? (
            <div className="rounded-3xl border border-dashed border-[var(--line)] p-12 text-center text-[var(--ink-soft)]">
              <p className="text-lg font-semibold text-[var(--brand-deep)]">
                Seu carrinho está vazio.
              </p>
              <p className="mt-2">Explore o catálogo e adicione produtos para iniciar.</p>
              <Link href="/produtos" className="cta-primary mt-6 inline-flex">
                Ver catálogo
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="card p-4 flex gap-4 items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded-xl bg-[var(--brand-mist)]"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/produtos/${item.slug}`}
                    className="font-display text-lg text-[var(--brand-deep)] hover:text-[var(--brand)] truncate block"
                  >
                    {item.title}
                  </Link>
                  <div className="text-xs text-[var(--muted)] mt-1">
                    Valor sob consulta — confirmado pelo WhatsApp
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="inline-flex items-center rounded-full border border-[var(--line)] bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        className="px-3 py-1.5 text-[var(--brand-deep)] hover:text-[var(--brand)]"
                        aria-label="Diminuir"
                      >−</button>
                      <span className="px-3 min-w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1.5 text-[var(--brand-deep)] hover:text-[var(--brand)]"
                        aria-label="Aumentar"
                      >+</button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-[var(--muted)] hover:text-red-600"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {!empty && (
            <button
              type="button"
              onClick={clear}
              className="text-sm text-[var(--muted)] hover:text-red-600 underline underline-offset-4"
            >
              Esvaziar carrinho
            </button>
          )}
        </div>

        <aside className="card p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl text-[var(--brand-deep)]">Resumo</h2>
          <div className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
            <div className="flex justify-between">
              <span>Itens no carrinho</span>
              <span className="font-semibold text-[var(--ink)]">{count}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete</span>
              <span className="text-[var(--muted)]">A combinar</span>
            </div>
            <div className="flex justify-between">
              <span>Valor</span>
              <span className="text-[var(--muted)]">Confirmado no WhatsApp</span>
            </div>
          </div>
          <div className="divider-soft my-5" />
          <a
            href={empty ? "/produtos" : whatsHref}
            target={empty ? undefined : "_blank"}
            rel={empty ? undefined : "noopener noreferrer"}
            className={`cta-whats w-full ${empty ? "opacity-60 pointer-events-none" : ""}`}
            aria-disabled={empty}
          >
            Finalizar pelo WhatsApp
          </a>
          <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed">
            Ao continuar, você abrirá uma conversa no WhatsApp com a Bioathos
            já contendo seus itens. Nosso atendimento confirma valores, frete e
            forma de pagamento.
          </p>
        </aside>
      </div>
    </section>
  );
}
