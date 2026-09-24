import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // Fotos dos produtos ficam no Storage do Supabase. Passando pelo
    // next/image, a Vercel redimensiona e guarda em cache, e o Supabase
    // só é consultado quando a imagem ainda não está no cache.
    remotePatterns: [new URL("https://ruchxgtcitkargclyqsh.supabase.co/storage/v1/object/public/**")],
    // Os arquivos têm nome único (timestamp + hash), então nunca mudam.
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
};

export default nextConfig;
