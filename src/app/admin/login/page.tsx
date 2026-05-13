"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Login ou senha inválidos.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  function digitsOnly(set: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      set(e.target.value.replace(/\D+/g, ""));
    };
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="font-display text-2xl text-[var(--brand-deep)] text-center">
          Acesso administrativo
        </h1>
        <p className="text-sm text-[var(--ink-soft)] text-center mt-2">
          Informe seu login e senha numéricos para entrar.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
              Login
            </label>
            <input
              type="text"
              required
              autoFocus
              inputMode="numeric"
              autoComplete="username"
              pattern="[0-9]+"
              value={login}
              onChange={digitsOnly(setLogin)}
              placeholder="Apenas números"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brand)] tracking-wider"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
              Senha
            </label>
            <input
              type="password"
              required
              inputMode="numeric"
              autoComplete="current-password"
              pattern="[0-9]+"
              value={password}
              onChange={digitsOnly(setPassword)}
              placeholder="Apenas números"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brand)] tracking-wider"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="cta-primary w-full">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
