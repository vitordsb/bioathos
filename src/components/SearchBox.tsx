"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Result = {
  id: number;
  slug: string;
  title: string;
  short_description: string | null;
  price: string | null;
  image_url: string;
  category_name: string | null;
};

export function SearchBox() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<number>(-1);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // debounced fetch
  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(Array.isArray(data.results) ? data.results : []);
        setActive(-1);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  // close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function navigateTo(slug: string) {
    setOpen(false);
    setQ("");
    router.push(`/produtos/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(-1, i - 1));
      return;
    }
    if (e.key === "Enter") {
      if (active >= 0 && results[active]) {
        e.preventDefault();
        navigateTo(results[active].slug);
      } else if (q.trim()) {
        e.preventDefault();
        setOpen(false);
        router.push(`/produtos?q=${encodeURIComponent(q.trim())}`);
      }
    }
  }

  const showDropdown = open && q.trim().length > 0;

  return (
    <div ref={wrapRef} className="relative flex-1 max-w-md mx-2 sm:mx-4">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Buscar produtos..."
          aria-label="Buscar produtos"
          className="w-full h-10 pl-9 pr-9 rounded-full border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--brand)] placeholder:text-[var(--muted)]"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-[var(--brand-mist)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--brand-deep)]"
            aria-label="Limpar busca"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-white border border-[var(--line)] shadow-[0_24px_60px_-20px_rgba(15,17,64,0.25)] overflow-hidden z-40 anim-fade-up">
          {loading && (
            <div className="px-4 py-3 text-sm text-[var(--muted)]">Buscando…</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-6 text-sm text-[var(--muted)] text-center">
              Nada encontrado para <strong className="text-[var(--brand-deep)]">{q}</strong>.
            </div>
          )}
          {!loading && results.length > 0 && (
            <ul role="listbox" className="max-h-[70vh] overflow-y-auto">
              {results.map((p, idx) => (
                <li key={p.id}>
                  <Link
                    href={`/produtos/${p.slug}`}
                    onClick={() => {
                      setOpen(false);
                      setQ("");
                    }}
                    role="option"
                    aria-selected={idx === active}
                    onMouseEnter={() => setActive(idx)}
                    className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${
                      idx === active ? "bg-[var(--brand-mist)]" : "hover:bg-[var(--brand-mist)]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image_url}
                      alt=""
                      className="w-11 h-12 rounded-lg object-cover bg-[var(--brand-mist)] flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm text-[var(--brand-deep)] truncate">
                        {p.title}
                      </div>
                      <div className="text-xs text-[var(--muted)] truncate">
                        {p.category_name ?? "Sem categoria"}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[var(--brand)] whitespace-nowrap">
                      {p.price ?? "Comprar"}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/produtos?q=${encodeURIComponent(q.trim())}`}
                  onClick={() => {
                    setOpen(false);
                    setQ("");
                  }}
                  className="block px-4 py-2.5 text-center text-xs font-semibold text-[var(--brand)] hover:bg-[var(--brand-mist)] border-t border-[var(--line)]"
                >
                  Ver todos os resultados →
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
