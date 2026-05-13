import { sql } from "./db";
import { createCategory, createProduct, listCategories } from "./queries";

type SeedProduct = {
  slug: string;
  title: string;
  description: string;
  short_description: string;
  price?: string;
  image_url: string;
  category: string;
  featured?: boolean;
};

const CATEGORIES = [
  "Suplementação",
  "Estética / Cuidados com a Pele",
  "Bem-estar",
];

const SEED: SeedProduct[] = [
  // === Suplementação ===
  {
    slug: "creatina-brigadeiro",
    title: "Creatina Brigadeiro",
    short_description: "Nem todo suplemento precisa ser difícil de consumir.",
    description:
      "Sua dose diária de creatina em formato de brigadeiro — zero açúcar, sabor que agrada e praticidade pra rotina de quem treina. Manipulado na Bioathos com matéria-prima certificada e dosagem ajustável conforme orientação. Uma forma deliciosa de manter a constância do suplemento sem abrir mão do paladar.",
    image_url: "/uploads/seed/brigadeiro-de-creatina.jpg",
    category: "Suplementação",
    featured: true,
  },
  {
    slug: "pre-treino",
    title: "Pré-treino Bioathos",
    short_description: "Pensado para respeitar seu corpo e acompanhar o seu ritmo.",
    description:
      "Um pré-treino manipulado sob medida, com dosagens ajustadas ao seu objetivo, rotina e tolerância. Combina cafeína, beta-alanina e ativos sinérgicos selecionados pela farmácia. Energia, foco e performance sem excessos — porque cada corpo tem um ritmo.",
    image_url: "/uploads/seed/pre-treino.jpg",
    category: "Suplementação",
    featured: true,
  },

  // === Estética / Cuidados com a Pele ===
  {
    slug: "serum-melasma-menoglow",
    title: "Sérum Melasma — Menoglow",
    short_description: "Sua pele tem história. O cuidado também precisa ter.",
    description:
      "Menoglow é o sérum premium da Bioathos para tratamento de melasma e hiperpigmentação. Combina clareadores de alta performance que atuam na uniformização do tom, devolvem luminosidade e respeitam a barreira cutânea. Uso noturno, após a higienização. Manipulado com matéria-prima certificada e laudo técnico.",
    image_url: "/uploads/seed/menoglow.jpg",
    category: "Estética / Cuidados com a Pele",
    featured: true,
  },
  {
    slug: "serum-pdrn",
    title: "Sérum PDRN",
    short_description: "Sua pele sabe se regenerar. Ela só precisa do estímulo certo.",
    description:
      "Sérum regenerador com polidesoxirribonucleotídeos (PDRN), moléculas bioativas que estimulam a renovação celular, melhoram textura e potencializam a produção natural de colágeno. Recomendado para peles em busca de viço, recuperação e densidade. Uso diário, conforme orientação.",
    image_url: "/uploads/seed/pdrn-serum.jpg",
    category: "Estética / Cuidados com a Pele",
    featured: true,
  },
  {
    slug: "serum-colageno",
    title: "Sérum Colágeno",
    short_description: "Uma pele firme se constrói com cuidado.",
    description:
      "Sérum firmador com colágeno hidrolisado e ativos sinérgicos que ajudam a melhorar a elasticidade, hidratar profundamente e suavizar linhas finas. Indicado para o uso contínuo em rotinas que buscam firmeza e densidade da pele.",
    image_url: "/uploads/seed/colageno-serum.jpg",
    category: "Estética / Cuidados com a Pele",
  },
  {
    slug: "gloss-labial-1",
    title: "Gloss Labial — Linha 1",
    short_description: "Cada pessoa tem uma identidade. Seus lábios também.",
    description:
      "Gloss labial manipulado pela Bioathos com cores exclusivas personalizadas. Acabamento de brilho intenso, hidratação e conforto sem sensação pegajosa. Edição Linha 1 — escolha a cor e textura com nossa farmacêutica pelo WhatsApp.",
    image_url: "/uploads/seed/gloss-1.jpg",
    category: "Estética / Cuidados com a Pele",
  },
  {
    slug: "gloss-labial-2",
    title: "Gloss Labial — Linha 2",
    short_description: "Cores personalizadas, textura premium.",
    description:
      "Edição Linha 2 dos glosses Bioathos. Mesma base hidratante e nutritiva, com paleta diferente para combinar com o seu estilo. Manipulação em farmácia, controle de qualidade lote a lote.",
    image_url: "/uploads/seed/gloss-2.jpg",
    category: "Estética / Cuidados com a Pele",
  },

  // === Bem-estar ===
  {
    slug: "biosil",
    title: "Biosil",
    short_description: "Beleza que começa de dentro para fora.",
    description:
      "Biosil traz o ácido ortosilícico, ativo conhecido por estimular naturalmente a produção de colágeno, fortalecer cabelos e unhas e contribuir para a densidade da pele. Suplementação oral premium, manipulada com matéria-prima certificada.",
    image_url: "/uploads/seed/biosil.jpg",
    category: "Bem-estar",
  },
  {
    slug: "motility",
    title: "Motility",
    short_description: "Seu bem-estar começa no equilíbrio.",
    description:
      "Motility é o suplemento Bioathos que atua no eixo intestino-cérebro. Combina ativos que favorecem o trânsito intestinal, o equilíbrio da microbiota e a sensação de bem-estar — um cuidado integral para quem entende que tudo começa dentro.",
    image_url: "/uploads/seed/motility.jpg",
    category: "Bem-estar",
  },
  {
    slug: "theolim",
    title: "Theolim",
    short_description: "Não é sobre fazer mais, é sobre fazer melhor.",
    description:
      "Theolim potencializa os resultados de quem segue uma rotina alimentar planejada. Fórmula manipulada com ativos selecionados para apoiar metabolismo, saciedade e composição corporal, sempre como suporte a uma dieta orientada por profissional de saúde.",
    image_url: "/uploads/seed/theolim.jpg",
    category: "Bem-estar",
  },
];

const SEED_VERSION = "v3-supabase-2026-05-13";

export async function runSeed(): Promise<{
  inserted: number;
  alreadySeeded: boolean;
}> {
  const cur = await sql<{ value: string }[]>`
    SELECT value FROM seed_state WHERE key = 'version'
  `;
  if (cur[0]?.value === SEED_VERSION) {
    return { inserted: 0, alreadySeeded: true };
  }

  const existingCats = new Map((await listCategories()).map((c) => [c.name, c.id]));
  for (const name of CATEGORIES) {
    if (!existingCats.has(name)) {
      const c = await createCategory(name);
      existingCats.set(c.name, c.id);
    }
  }

  let inserted = 0;
  for (const p of SEED) {
    const exists = await sql<{ id: number }[]>`
      SELECT id FROM products WHERE slug = ${p.slug} LIMIT 1
    `;
    if (exists.length > 0) continue;

    const created = await createProduct({
      title: p.title,
      description: p.description,
      short_description: p.short_description,
      price: p.price,
      image_url: p.image_url,
      category_id: existingCats.get(p.category) ?? null,
      featured: p.featured,
    });
    if (created.slug !== p.slug) {
      await sql`UPDATE products SET slug = ${p.slug} WHERE id = ${created.id}`;
    }
    inserted++;
  }

  await sql`
    INSERT INTO seed_state (key, value) VALUES ('version', ${SEED_VERSION})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;

  return { inserted, alreadySeeded: false };
}
