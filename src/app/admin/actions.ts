"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  updateProduct,
} from "@/lib/queries";

async function guard() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
}

function s(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function optional(v: string): string | null {
  return v.length ? v : null;
}

function catId(v: FormDataEntryValue | null): number | null {
  const str = s(v);
  if (!str) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

export async function createProductAction(formData: FormData) {
  await guard();
  const title = s(formData.get("title"));
  const description = s(formData.get("description"));
  const image_url = s(formData.get("image_url"));
  if (!title || !description || !image_url) {
    throw new Error("Campos obrigatórios: título, descrição e imagem.");
  }
  await createProduct({
    title,
    description,
    short_description: optional(s(formData.get("short_description"))),
    price: optional(s(formData.get("price"))),
    image_url,
    category_id: catId(formData.get("category_id")),
    featured: formData.get("featured") === "on",
  });
  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
  redirect("/admin/produtos");
}

export async function updateProductAction(id: number, formData: FormData) {
  await guard();
  const title = s(formData.get("title"));
  const description = s(formData.get("description"));
  const image_url = s(formData.get("image_url"));
  if (!title || !description || !image_url) {
    throw new Error("Campos obrigatórios: título, descrição e imagem.");
  }
  await updateProduct(id, {
    title,
    description,
    short_description: optional(s(formData.get("short_description"))),
    price: optional(s(formData.get("price"))),
    image_url,
    category_id: catId(formData.get("category_id")),
    featured: formData.get("featured") === "on",
  });
  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
  redirect("/admin/produtos");
}

export async function deleteProductAction(id: number) {
  await guard();
  await deleteProduct(id);
  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
}

export async function createCategoryAction(formData: FormData) {
  await guard();
  const name = s(formData.get("name"));
  if (!name) throw new Error("Nome obrigatório.");
  await createCategory(name);
  revalidatePath("/admin/categorias");
  revalidatePath("/produtos");
  revalidatePath("/");
}

export async function deleteCategoryAction(id: number) {
  await guard();
  await deleteCategory(id);
  revalidatePath("/admin/categorias");
  revalidatePath("/produtos");
  revalidatePath("/");
}
