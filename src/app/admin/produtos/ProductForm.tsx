import Link from "next/link";
import type { Category, Product } from "@/lib/db";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  product?: Product;
  submitLabel: string;
};

export function ProductForm({ action, categories, product, submitLabel }: Props) {
  return (
    <form action={action} className="card p-6 space-y-5">
      <div>
        <label className="text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
          Imagem do produto *
        </label>
        <div className="mt-2">
          <ImageUploadField initial={product?.image_url ?? ""} />
        </div>
      </div>

      <Field label="Título *">
        <input
          name="title"
          required
          defaultValue={product?.title ?? ""}
          className="input"
          placeholder="Ex: Sérum Vitamina C"
        />
      </Field>

      <Field label="Descrição curta">
        <input
          name="short_description"
          defaultValue={product?.short_description ?? ""}
          className="input"
          placeholder="Resumo aparece no card do catálogo."
        />
      </Field>

      <Field label="Descrição completa *">
        <textarea
          name="description"
          required
          rows={6}
          defaultValue={product?.description ?? ""}
          className="input"
          placeholder="Detalhe os ativos, indicação e modo de uso."
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Preço (texto livre)">
          <input
            name="price"
            defaultValue={product?.price ?? ""}
            className="input"
            placeholder="Ex: R$ 189,00 ou 'Sob consulta'"
          />
        </Field>
        <Field label="Categoria">
          <select
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            className="input"
          >
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={!!product?.featured}
          className="w-4 h-4 accent-[var(--brand)]"
        />
        Marcar como destaque
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="cta-primary">{submitLabel}</button>
        <Link href="/admin/produtos" className="cta-secondary">Cancelar</Link>
      </div>

      <style>{`
        .input {
          width: 100%;
          margin-top: 0.25rem;
          border: 1px solid var(--line);
          background: #fff;
          border-radius: 0.75rem;
          padding: 0.65rem 0.85rem;
          outline: none;
          transition: border-color 120ms ease;
        }
        .input:focus { border-color: var(--brand); }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
        {label}
      </span>
      {children}
    </label>
  );
}
