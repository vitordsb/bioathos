import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const bucket = process.env.SUPABASE_BUCKET || "bioathos";

if (!url || !key) {
  console.error("Faltam NEXT_PUBLIC_SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY no .env.local");
  process.exit(1);
}

const client = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  const { data: buckets, error: listErr } = await client.storage.listBuckets();
  if (listErr) throw listErr;

  const found = buckets.find((b) => b.name === bucket);
  if (found) {
    console.log(`✓ Bucket "${bucket}" já existe.`);
    if (!found.public) {
      console.log(`→ Marcando bucket como público...`);
      const { error } = await client.storage.updateBucket(bucket, { public: true });
      if (error) throw error;
      console.log(`✓ Bucket agora é público.`);
    } else {
      console.log(`✓ Bucket já é público.`);
    }
    return;
  }

  console.log(`→ Criando bucket "${bucket}" público...`);
  const { error } = await client.storage.createBucket(bucket, { public: true });
  if (error) throw error;
  console.log(`✓ Bucket criado.`);
}

main().catch((err) => {
  console.error("setup-bucket falhou:", err);
  process.exit(1);
});
