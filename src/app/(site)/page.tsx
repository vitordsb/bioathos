import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { listCategories, listProducts } from "@/lib/queries";
import {
  whatsappLink,
  STORE_ADDRESS,
  STORE_PHONE_DISPLAY,
} from "@/lib/whatsapp";

const DIFERENCIAIS = [
  { t: "Dupla checagem de qualidade", d: "Laudos técnicos em cada lote." },
  { t: "Matéria-prima certificada", d: "Rastreabilidade do fornecedor ao frasco." },
  { t: "Fórmulas inteligentes", d: "Sinergia entre ativos pensada caso a caso." },
  { t: "+100 mil fórmulas", d: "Décadas de prática em manipulação." },
  { t: "Atendimento farmacêutico", d: "Conversa direta com profissional responsável." },
  { t: "Envio para todo o Brasil", d: "Logística cuidadosa, entrega em 3–5 dias úteis." },
  { t: "Cruelty-free", d: "Nenhuma fórmula testada em animais." },
  { t: "Gestantes e crianças", d: "Protocolos exclusivos com segurança redobrada." },
  { t: "Inovação responsável", d: "Tecnologia farmacêutica com propósito." },
];

const DEPOIMENTOS = [
  {
    nome: "Camila R.",
    papel: "Cliente fiel há 4 anos",
    texto:
      "A Bioathos transformou minha rotina de skincare. O sérum de melasma fez diferença real e o atendimento é outro nível.",
  },
  {
    nome: "Rafael M.",
    papel: "Atleta amador",
    texto:
      "O pré-treino manipulado é incomparável com qualquer industrializado. Dosado pra mim, sem excessos. E a creatina brigadeiro virou vício.",
  },
  {
    nome: "Dra. Letícia S.",
    papel: "Dermatologista parceira",
    texto:
      "Prescrevo Bioathos pra minhas pacientes porque sei que vão receber uma fórmula com qualidade clínica e acabamento premium.",
  },
];

export default async function HomePage() {
  const featured = (await listProducts({ featuredOnly: true })).slice(0, 4);
  const all = await listProducts();
  const categories = await listCategories();

  const heroWhats = whatsappLink(
    "Olá, Bioathos! Vim pelo site e gostaria de conhecer as fórmulas personalizadas."
  );
  const specialistWhats = whatsappLink(
    "Olá, Bioathos! Quero conversar com um especialista pra montar a fórmula ideal pra mim."
  );

  return (
    <>
      {/* HERO */}
      <section className="bioathos-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="brand-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
              Farmácia de manipulação · Barueri
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[var(--brand-deep)]">
              Você não precisa escolher entre{" "}
              <span className="italic text-[var(--brand)]">Saúde e Estética.</span>{" "}
              <span className="block mt-2">Aqui, os dois andam juntos.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--ink-soft)] max-w-xl leading-relaxed">
              +100 mil fórmulas manipuladas. Referência em manipulação e saúde
              em SP, com precisão, cuidado e excelência técnica.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/produtos" className="cta-primary">
                Conheça nossas fórmulas
              </Link>
              <a
                href={specialistWhats}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-whats"
              >
                Conversar com um especialista
              </a>
            </div>

            {/* SLA strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
              <SlaItem label="Manipulação" value="em até 48h" />
              <SlaItem label="Entrega média" value="3 a 5 dias úteis" />
              <SlaItem label="Envio" value="Brasil todo" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-6 w-40 h-40 rounded-full bg-[var(--brand-light)] blur-3xl opacity-60" />
            <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[var(--accent)] blur-3xl opacity-30" />
            <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,44,42,0.4)] border border-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/banner-1.jpg"
                alt="Bioathos"
                className="w-full h-[460px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:flex bg-white rounded-2xl shadow-xl p-4 border border-[var(--line)] items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-mist)] flex items-center justify-center text-[var(--brand)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--ink)]">Atendimento humano</div>
                <div className="text-xs text-[var(--ink-soft)]">Farmacêutica no WhatsApp.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section id="categorias" className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="brand-pill">Linhas</span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-3">
                Encontre por linha de cuidado
              </h2>
            </div>
            <Link href="/produtos" className="btn-ghost">Todo o catálogo →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/produtos?categoria=${cat.slug}`}
                className="card p-6 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--brand)] font-semibold">
                    Linha
                  </div>
                  <div className="font-display text-xl text-[var(--brand-deep)] mt-1">
                    {cat.name}
                  </div>
                </div>
                <span className="text-[var(--brand)]">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="brand-pill">Destaques</span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-3">
                Os queridinhos da casa
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* DIFERENCIAIS */}
      <section className="bg-white border-y border-[var(--line)] mt-10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="brand-pill">Por que Bioathos</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-3">
              Ciência, cuidado e personalização em cada fórmula
            </h2>
            <p className="mt-4 text-[var(--ink-soft)]">
              Os nove princípios que sustentam mais de 100 mil fórmulas manipuladas.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIFERENCIAIS.map((d) => (
              <div key={d.t} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-[var(--brand-mist)] flex items-center justify-center text-[var(--brand)] mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div className="font-display text-lg text-[var(--brand-deep)]">{d.t}</div>
                <p className="text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <span className="brand-pill">Catálogo</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-3">
              Todos os produtos
            </h2>
          </div>
          <Link href="/produtos" className="btn-ghost">Ver catálogo completo →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {all.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-[var(--brand-mist)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="brand-pill">Depoimentos</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-3">
              O que dizem sobre a Bioathos
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {DEPOIMENTOS.map((d) => (
              <figure key={d.nome} className="card p-6">
                <svg className="text-[var(--brand-light)] mb-3" width="36" height="28" viewBox="0 0 36 28" fill="currentColor">
                  <path d="M0 28V14C0 6.27 6.27 0 14 0v6c-4.42 0-8 3.58-8 8h8v14H0Zm22 0V14c0-7.73 6.27-14 14-14v6c-4.42 0-8 3.58-8 8h8v14H22Z" />
                </svg>
                <blockquote className="text-[var(--ink-soft)] leading-relaxed">
                  “{d.texto}”
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <div className="font-semibold text-[var(--brand-deep)]">{d.nome}</div>
                  <div className="text-[var(--muted)]">{d.papel}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="max-w-7xl mx-auto px-5 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden border border-[var(--line)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/equipe.jpg"
            alt="Equipe Bioathos"
            className="w-full h-[480px] object-cover"
          />
        </div>
        <div>
          <span className="brand-pill">Sobre a Bioathos</span>
          <h2 className="font-display text-3xl md:text-4xl text-[var(--brand-deep)] mt-4">
            Referência em manipulação e saúde em SP.
          </h2>
          <p className="mt-5 text-lg text-[var(--ink-soft)] leading-relaxed">
            Somos uma farmácia de manipulação em Barueri dedicada a transformar
            prescrições em experiências sensoriais. Cada produto Bioathos é
            pensado para entregar resultado clínico com acabamento premium —
            do ativo à embalagem.
          </p>
          <div className="mt-6 rounded-2xl border border-[var(--brand-light)] bg-[var(--brand-mist)] p-5">
            <div className="font-display text-lg text-[var(--brand-deep)]">
              Cuidado especializado para gestantes e crianças
            </div>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Protocolos exclusivos, com segurança redobrada e acompanhamento
              farmacêutico desde a primeira conversa.
            </p>
          </div>
          <div className="mt-8 flex gap-3 flex-wrap">
            <a href={heroWhats} target="_blank" rel="noopener noreferrer" className="cta-primary">
              Conheça nossas fórmulas
            </a>
            <Link href="/produtos" className="cta-secondary">
              Ver produtos
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT BLOCK */}
      <section className="bg-gradient-to-br from-[var(--brand-deep)] to-[var(--brand)] text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Pronto para a sua fórmula sob medida?
            </h2>
            <p className="mt-4 text-[var(--brand-light)] max-w-xl">
              Fale com a Bioathos pelo WhatsApp {STORE_PHONE_DISPLAY}. Nosso time
              vai te ajudar a montar o protocolo certo para a sua rotina.
            </p>
            <p className="mt-3 text-sm text-white/80">{STORE_ADDRESS}</p>
          </div>
          <div className="flex md:justify-end">
            <a
              href={specialistWhats}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-whats text-base"
            >
              Conversar com um especialista
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SlaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-[var(--brand)] font-semibold">
        {label}
      </div>
      <div className="text-sm font-semibold text-[var(--brand-deep)] mt-0.5">
        {value}
      </div>
    </div>
  );
}
