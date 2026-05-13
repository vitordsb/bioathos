"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-context";
import { productInquiryMessage, whatsappLink } from "@/lib/whatsapp";

type Props = {
  productId: number;
  slug: string;
  title: string;
  image_url: string;
};

export function ProductActions({ productId, slug, title, image_url }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const router = useRouter();

  const directWhats = whatsappLink(productInquiryMessage(title, slug));

  function handleAdd() {
    addItem({ productId, slug, title, image_url }, qty);
    router.push("/carrinho");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-[var(--ink-soft)]">Quantidade</span>
        <div className="inline-flex items-center rounded-full border border-[var(--line)] bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-[var(--brand-deep)] hover:text-[var(--brand)]"
            aria-label="Diminuir"
          >−</button>
          <span key={qty} className="px-3 min-w-8 text-center font-semibold anim-flip inline-block">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-[var(--brand-deep)] hover:text-[var(--brand)]"
            aria-label="Aumentar"
          >+</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleAdd} className="cta-primary">
          Adicionar ao carrinho
        </button>
        <a
          href={directWhats}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-whats"
        >
          Comprar pelo WhatsApp
        </a>
      </div>

      <p className="text-xs text-[var(--muted)] leading-relaxed">
        Todos os pedidos são finalizados pelo WhatsApp com nosso atendimento
        humano. Aqui você monta o seu carrinho e enviamos os valores e formas
        de pagamento por lá.
      </p>
    </div>
  );
}
