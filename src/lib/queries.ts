import { sql, type Category, type Product, type ProductWithCategory } from "./db";

export function slugify(input: string): string {
  return (
    input
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "produto"
  );
}

export async function ensureUniqueProductSlug(base: string, ignoreId?: number): Promise<string> {
  let candidate = base;
  let n = 2;
  while (true) {
    const rows = ignoreId
      ? await sql<{ id: number }[]>`SELECT id FROM products WHERE slug = ${candidate} AND id <> ${ignoreId}`
      : await sql<{ id: number }[]>`SELECT id FROM products WHERE slug = ${candidate}`;
    if (rows.length === 0) return candidate;
    candidate = `${base}-${n++}`;
  }
}

export async function ensureUniqueCategorySlug(base: string, ignoreId?: number): Promise<string> {
  let candidate = base;
  let n = 2;
  while (true) {
    const rows = ignoreId
      ? await sql<{ id: number }[]>`SELECT id FROM categories WHERE slug = ${candidate} AND id <> ${ignoreId}`
      : await sql<{ id: number }[]>`SELECT id FROM categories WHERE slug = ${candidate}`;
    if (rows.length === 0) return candidate;
    candidate = `${base}-${n++}`;
  }
}

export async function listProducts(opts?: {
  categorySlug?: string;
  featuredOnly?: boolean;
}): Promise<ProductWithCategory[]> {
  const { categorySlug, featuredOnly } = opts ?? {};
  if (categorySlug && featuredOnly) {
    return sql<ProductWithCategory[]>`
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE c.slug = ${categorySlug} AND p.featured = true
      ORDER BY p.featured DESC, p.created_at DESC
    `;
  }
  if (categorySlug) {
    return sql<ProductWithCategory[]>`
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE c.slug = ${categorySlug}
      ORDER BY p.featured DESC, p.created_at DESC
    `;
  }
  if (featuredOnly) {
    return sql<ProductWithCategory[]>`
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.featured = true
      ORDER BY p.featured DESC, p.created_at DESC
    `;
  }
  return sql<ProductWithCategory[]>`
    SELECT p.*, c.name AS category_name, c.slug AS category_slug
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    ORDER BY p.featured DESC, p.created_at DESC
  `;
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | undefined> {
  const rows = await sql<ProductWithCategory[]>`
    SELECT p.*, c.name AS category_name, c.slug AS category_slug
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.slug = ${slug}
    LIMIT 1
  `;
  return rows[0];
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const rows = await sql<Product[]>`SELECT * FROM products WHERE id = ${id} LIMIT 1`;
  return rows[0];
}

export async function listCategories(): Promise<Category[]> {
  return sql<Category[]>`SELECT * FROM categories ORDER BY name ASC`;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const rows = await sql<Category[]>`SELECT * FROM categories WHERE slug = ${slug} LIMIT 1`;
  return rows[0];
}

export async function createCategory(name: string): Promise<Category> {
  const slug = await ensureUniqueCategorySlug(slugify(name));
  const rows = await sql<Category[]>`
    INSERT INTO categories (name, slug) VALUES (${name}, ${slug})
    RETURNING *
  `;
  return rows[0];
}

export async function updateCategory(id: number, name: string): Promise<Category> {
  const slug = await ensureUniqueCategorySlug(slugify(name), id);
  const rows = await sql<Category[]>`
    UPDATE categories SET name = ${name}, slug = ${slug}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteCategory(id: number): Promise<void> {
  await sql`DELETE FROM categories WHERE id = ${id}`;
}

export type ProductInput = {
  title: string;
  description: string;
  short_description?: string | null;
  price?: string | null;
  image_url: string;
  category_id?: number | null;
  featured?: boolean;
};

export async function createProduct(data: ProductInput): Promise<Product> {
  const slug = await ensureUniqueProductSlug(slugify(data.title));
  const rows = await sql<Product[]>`
    INSERT INTO products (
      slug, title, description, short_description, price,
      image_url, category_id, featured
    ) VALUES (
      ${slug}, ${data.title}, ${data.description},
      ${data.short_description ?? null}, ${data.price ?? null},
      ${data.image_url}, ${data.category_id ?? null}, ${data.featured ?? false}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function updateProduct(id: number, data: ProductInput): Promise<Product> {
  const slug = await ensureUniqueProductSlug(slugify(data.title), id);
  const rows = await sql<Product[]>`
    UPDATE products SET
      slug = ${slug},
      title = ${data.title},
      description = ${data.description},
      short_description = ${data.short_description ?? null},
      price = ${data.price ?? null},
      image_url = ${data.image_url},
      category_id = ${data.category_id ?? null},
      featured = ${data.featured ?? false},
      updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteProduct(id: number): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`;
}
