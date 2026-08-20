import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Área administrativa, APIs e páginas de resultado de busca ficam fora
        // do índice. A busca ecoa o termo digitado na URL, então indexá-la faz
        // o site "conter" qualquer palavra que alguém jogue no ?q=.
        disallow: ["/admin", "/api/", "/carrinho", "/*?q=", "/produtos?q="],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
