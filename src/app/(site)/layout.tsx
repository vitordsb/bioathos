import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleAds } from "@/components/GoogleAds";
import { WhatsAppConversion } from "@/components/WhatsAppConversion";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <MetaPixel />
      </Suspense>
      <Suspense fallback={null}>
        <GoogleAds />
      </Suspense>
      <WhatsAppConversion />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
