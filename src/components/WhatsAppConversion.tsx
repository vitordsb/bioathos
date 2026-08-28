"use client";

import { useEffect } from "react";
import {
  WHATSAPP_CONVERSION_CURRENCY,
  WHATSAPP_CONVERSION_SEND_TO,
  WHATSAPP_CONVERSION_VALUE,
} from "@/lib/google-ads";

const WHATSAPP_HREF = /^(https?:\/\/(wa\.me|(api|web|chat)\.whatsapp\.com)|whatsapp:)/i;

// Janela curta pra não contar duas conversões quando o usuário clica duas
// vezes no mesmo botão sem querer.
const DEDUPE_MS = 1500;

/**
 * Dispara a conversão "Clique no WhatsApp" do Google Ads em qualquer link de
 * WhatsApp do site, sem precisar de onClick espalhado por componente. Usa um
 * único listener delegado em fase de captura, então pega inclusive links
 * renderizados depois (cards, carrinho, rodapé).
 */
export function WhatsAppConversion() {
  useEffect(() => {
    let lastHref = "";
    let lastAt = 0;

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!WHATSAPP_HREF.test(href)) return;

      const now = Date.now();
      if (href === lastHref && now - lastAt < DEDUPE_MS) return;
      lastHref = href;
      lastAt = now;

      window.gtag?.("event", "conversion", {
        send_to: WHATSAPP_CONVERSION_SEND_TO,
        value: WHATSAPP_CONVERSION_VALUE,
        currency: WHATSAPP_CONVERSION_CURRENCY,
      });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
