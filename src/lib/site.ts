// Domínio oficial do site em produção. Serve de fallback quando
// NEXT_PUBLIC_SITE_URL não está configurada (ou está apontando pra localhost
// num ambiente de produção, o que quebra os links enviados pelo WhatsApp).
export const CANONICAL_SITE_URL = "https://www.bioathos.com.br";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ?? "";
  const isLocal = fromEnv === "" || /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(fromEnv);

  if (process.env.NODE_ENV === "production") {
    return isLocal ? CANONICAL_SITE_URL : fromEnv;
  }

  return fromEnv || "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
