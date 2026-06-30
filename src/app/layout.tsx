import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";

export const metadata: Metadata = {
  title: "Bioathos — Farmácia de Manipulação Premium",
  description:
    "Manipulação premium em Barueri. Cosméticos, suplementação e fórmulas personalizadas com qualidade Bioathos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        {/* wts.chat — widget de atendimento (marketing/SEO acompanha o fluxo de compras).
            beforeInteractive é obrigatório aqui: o loader registra um listener de
            window.load e só inicializa nele; precisa executar antes do load disparar. */}
        <Script
          id="wts-chat-widget"
          src="https://cdn.wts.chat/scripts/widget/v2/h-widget-min.js"
          strategy="beforeInteractive"
          data-companyid="b9428fa3-5c1c-4140-8c43-8399a1c70746"
          data-widgetid="4fc7ded1-734b-4bfd-a7d6-b8022ebc6789"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
