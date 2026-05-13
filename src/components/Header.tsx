"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./cart-context";
import { Logo } from "./Logo";

export function Header() {
  const { count } = useCart();
  const prev = useRef(count);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (count > 0 && prev.current !== count) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 350);
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" aria-label="Bioathos — início">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--ink-soft)]">
          <Link href="/" className="hover:text-[var(--brand)] transition-colors">Início</Link>
          <Link href="/produtos" className="hover:text-[var(--brand)] transition-colors">Produtos</Link>
          <Link href="/#sobre" className="hover:text-[var(--brand)] transition-colors">Sobre</Link>
          <Link href="/#contato" className="hover:text-[var(--brand)] transition-colors">Contato</Link>
        </nav>

        <Link
          href="/carrinho"
          className="relative inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--brand-deep)] hover:border-[var(--brand-light)] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          Carrinho
          {count > 0 && (
            <span
              key={count}
              className={`absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[var(--brand)] text-white text-xs font-semibold flex items-center justify-center ${
                pulse ? "anim-pulse-once" : "anim-pop"
              }`}
            >
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
