"use client";

import Link from "next/link";
import { useCart } from "./cart-context";
import { Logo } from "./Logo";

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" aria-label="Bioathos — início">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--ink-soft)]">
          <Link href="/" className="hover:text-[var(--brand)]">Início</Link>
          <Link href="/produtos" className="hover:text-[var(--brand)]">Produtos</Link>
          <Link href="/#sobre" className="hover:text-[var(--brand)]">Sobre</Link>
          <Link href="/#contato" className="hover:text-[var(--brand)]">Contato</Link>
        </nav>

        <Link
          href="/carrinho"
          className="relative inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--brand-deep)] hover:border-[var(--brand-light)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          Carrinho
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[var(--brand)] text-white text-xs font-semibold flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
