# Bioathos — Marketplace + Admin

Plataforma monolito (Next.js + SQLite) para a Bioathos Farmácia de Manipulação.
Marketplace público no domínio raiz, painel de administração em `/admin`. Todos
os CTAs de compra direcionam para o WhatsApp — nada de pagamento na plataforma.

## Stack

- Next.js 16 (App Router + Turbopack)
- TypeScript + Tailwind v4
- SQLite via `better-sqlite3` (arquivo local em `./data/bioathos.db`)
- Upload de imagens em `./public/uploads/` (servido estaticamente)
- Server Actions para todo o CRUD do admin

## Rodando

```bash
cd app
pnpm install
pnpm dev          # http://localhost:3000
```

Na primeira execução o banco é criado e populado com os produtos iniciais
(sementes em `src/lib/seed.ts`).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável                      | Default             | Para que serve                        |
| ----------------------------- | ------------------- | ------------------------------------- |
| `ADMIN_PASSWORD`              | `bioathos2026`      | Senha de acesso ao `/admin`           |
| `ADMIN_SECRET`                | (troque em prod)    | Assina o cookie de sessão do admin    |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5511914260203`     | Número usado em todos os CTAs do site |
| `NEXT_PUBLIC_SITE_URL`        | `http://localhost…` | URL pública incluída nos links wpp    |

## Rotas

| Rota                | Descrição                                        |
| ------------------- | ------------------------------------------------ |
| `/`                 | Landing premium + destaques + catálogo + sobre   |
| `/produtos`         | Catálogo com filtro por categoria                |
| `/produtos/[slug]`  | Página do produto + add ao carrinho + wpp direto |
| `/carrinho`         | Carrinho em localStorage + checkout via WhatsApp |
| `/admin/login`      | Login do painel                                  |
| `/admin`            | Dashboard                                        |
| `/admin/produtos`   | Lista, criar, editar e excluir produtos          |
| `/admin/categorias` | Criar e excluir categorias                       |

## Fluxo de compra

1. Visitante navega no catálogo → clica em **Adicionar ao carrinho** ou
   **Comprar pelo WhatsApp**.
2. Carrinho é persistido em `localStorage`.
3. Em `/carrinho`, o botão **Finalizar pelo WhatsApp** abre uma conversa
   pré-formatada para o número da loja com a lista de itens.
4. Atendimento Bioathos confirma valores, frete e forma de pagamento por lá.

Nenhum pagamento é processado na plataforma.

## Persistência

- Banco SQLite em `./data/bioathos.db` (não versionado).
- Imagens enviadas pelo admin em `./public/uploads/` (não versionado, exceto
  `seed/` com os produtos iniciais).

Para resetar tudo: pare o servidor, apague `./data` e suba novamente.

## Estrutura

```
src/
  app/
    page.tsx                 # landing
    produtos/                # catálogo + detalhe
    carrinho/                # carrinho com checkout wpp
    admin/                   # painel (login + crud)
    api/admin/{login,logout,upload}/
  components/                # Header, Footer, Logo, ProductCard, cart context
  lib/
    db.ts                    # better-sqlite3 singleton + schema
    queries.ts               # CRUD em produtos e categorias
    auth.ts                  # cookie assinado p/ admin
    whatsapp.ts              # número + montagem de links wpp
    seed.ts                  # popula DB na primeira execução
data/                        # SQLite (gerado em runtime)
public/uploads/              # imagens enviadas pelo admin
```
