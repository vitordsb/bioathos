import Link from "next/link";
import {
  STORE_ADDRESS,
  STORE_INSTAGRAM,
  STORE_PHONE_DISPLAY,
  STORE_PHONE_LANDLINE,
  whatsappLink,
} from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const whats = whatsappLink(
    "Olá, Bioathos! Vim pelo site e gostaria de mais informações."
  );

  return (
    <footer id="contato" className="border-t border-[var(--line)] bg-white mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-[var(--ink-soft)] leading-relaxed">
            Farmácia de manipulação premium. Skincare, suplementação e fórmulas
            personalizadas com a qualidade Bioathos.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-deep)] mb-3">
            Navegação
          </h4>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li><Link href="/produtos" className="hover:text-[var(--brand)]">Catálogo completo</Link></li>
            <li><Link href="/#categorias" className="hover:text-[var(--brand)]">Categorias</Link></li>
            <li><Link href="/#sobre" className="hover:text-[var(--brand)]">Sobre a Bioathos</Link></li>
            <li><Link href="/carrinho" className="hover:text-[var(--brand)]">Carrinho</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-deep)] mb-3">
            Contato
          </h4>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li>WhatsApp {STORE_PHONE_DISPLAY}</li>
            <li>Fixo {STORE_PHONE_LANDLINE}</li>
            <li>Instagram {STORE_INSTAGRAM}</li>
            <li className="leading-relaxed">{STORE_ADDRESS}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-deep)] mb-3">
            Fale agora
          </h4>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            Atendimento personalizado pelo WhatsApp para tirar dúvidas, montar
            fórmulas e fechar pedidos.
          </p>
          <a href={whats} target="_blank" rel="noopener noreferrer" className="cta-whats">
            <WhatsAppIcon />
            Atendimento WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-5 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Bioathos — Farmácia de Manipulação. Todos os direitos reservados.
      </div>
    </footer>
  );
}
