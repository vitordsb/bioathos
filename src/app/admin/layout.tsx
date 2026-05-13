import Link from "next/link";
import { Logo } from "@/components/Logo";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthed();

  if (!authed) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-5">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="bg-white border-b border-[var(--line)] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin"><Logo /></Link>
            <span className="brand-pill">Admin</span>
          </div>
          <nav className="flex items-center gap-5 text-sm font-medium text-[var(--ink-soft)]">
            <Link href="/admin/produtos" className="hover:text-[var(--brand)]">Produtos</Link>
            <Link href="/admin/categorias" className="hover:text-[var(--brand)]">Categorias</Link>
            <Link href="/" className="hover:text-[var(--brand)]">Ver site</Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="text-[var(--brand-deep)] font-semibold hover:text-red-600">
                Sair
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10">{children}</div>
    </div>
  );
}
