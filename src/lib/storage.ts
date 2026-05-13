import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_BYTES = 8 * 1024 * 1024;
const BUCKET = process.env.SUPABASE_BUCKET || "bioathos";

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: "invalid_type" | "too_large" | "no_file" | "upload_failed" };

function extFor(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/avif") return "avif";
  return "jpg";
}

function validateFile(file: File): UploadResult | null {
  if (!ALLOWED.has(file.type)) return { ok: false, error: "invalid_type" };
  if (file.size > MAX_BYTES) return { ok: false, error: "too_large" };
  return null;
}

export function isUsingSupabase(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function saveImage(file: File): Promise<UploadResult> {
  const invalid = validateFile(file);
  if (invalid) return invalid;

  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${extFor(file.type)}`;

  if (isUsingSupabase()) {
    const client = supabaseAdmin();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await client.storage
      .from(BUCKET)
      .upload(name, bytes, { contentType: file.type, upsert: false });
    if (error) {
      console.error("supabase upload failed", error);
      return { ok: false, error: "upload_failed" };
    }
    const { data } = client.storage.from(BUCKET).getPublicUrl(name);
    return { ok: true, url: data.publicUrl };
  }

  // fallback local (VPS / dev sem credenciais)
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, name), bytes);
  return { ok: true, url: `/uploads/${name}` };
}
