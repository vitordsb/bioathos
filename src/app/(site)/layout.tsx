import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MetaPixel } from "@/components/MetaPixel";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <MetaPixel />
      </Suspense>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
