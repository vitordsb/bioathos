import { applySchema } from "../src/lib/schema";
import { runSeed } from "../src/lib/seed";
import { sql } from "../src/lib/db";

async function main() {
  console.log("→ Aplicando schema...");
  await applySchema();
  console.log("✓ Schema OK");

  console.log("→ Rodando seed...");
  const result = await runSeed();
  if (result.alreadySeeded) {
    console.log("✓ Seed já tinha sido aplicado nessa versão — nada a fazer.");
  } else {
    console.log(`✓ Seed concluído: ${result.inserted} produtos novos inseridos.`);
  }

  await sql.end();
}

main().catch((err) => {
  console.error("Migration falhou:", err);
  process.exit(1);
});
