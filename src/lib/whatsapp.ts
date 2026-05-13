export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511914260203";
export const STORE_PHONE_DISPLAY = "(11) 91426-0203";
export const STORE_PHONE_LANDLINE = "(11) 4195-0883";
export const STORE_ADDRESS = "Colégio das Avestruzes, 91 — Centro, Barueri — SP";
export const STORE_INSTAGRAM = "@bioathos";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productInquiryMessage(title: string, slug: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = base ? `${base}/produtos/${slug}` : "";
  return `Olá, Bioathos! Tenho interesse no produto *${title}*.${url ? `\n${url}` : ""}\nPoderia me passar mais informações e o valor?`;
}

export function cartMessage(items: { title: string; quantity: number; slug: string }[]): string {
  const lines = items.map(
    (i, idx) => `${idx + 1}. ${i.title} — qtd: ${i.quantity}`
  );
  return [
    "Olá, Bioathos! Gostaria de finalizar a compra dos itens abaixo:",
    "",
    ...lines,
    "",
    "Aguardo retorno com valores e formas de pagamento. Obrigado!",
  ].join("\n");
}
