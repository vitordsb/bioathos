import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var __bioathos_sql: ReturnType<typeof postgres> | undefined;
}

function createSql() {
  if (!DATABASE_URL) {
    throw new Error(
      "DATABASE_URL não configurada. Defina a connection string do Supabase (Transaction Pooler, porta 6543)."
    );
  }
  return postgres(DATABASE_URL, {
    prepare: false, // requerido pelo PgBouncer/Supavisor em transaction mode
    max: 10,
    idle_timeout: 30,
  });
}

export const sql = global.__bioathos_sql ?? createSql();
if (process.env.NODE_ENV !== "production") global.__bioathos_sql = sql;

export type Category = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  short_description: string | null;
  price: string | null;
  image_url: string;
  category_id: number | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductWithCategory = Product & {
  category_name: string | null;
  category_slug: string | null;
};
