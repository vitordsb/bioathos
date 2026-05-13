import { sql } from "./db";

export async function applySchema(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT,
      price TEXT,
      image_url TEXT NOT NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug)`;
  await sql`
    CREATE TABLE IF NOT EXISTS seed_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;
}
