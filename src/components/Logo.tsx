// Marca da Bioathos: coracao dividido, metade esquerda solida e metade direita
// so contorno, com capsulas e granulos dentro. O mesmo desenho esta em
// src/app/icon.svg (favicon). Mexeu aqui, mexe la.
const HEART = "M32 56s-22-12.5-22-29A13 13 0 0 1 32 18a13 13 0 0 1 22 9c0 16.5-22 29-22 29Z";
const HEART_LEFT = "M32 56s-22-12.5-22-29A13 13 0 0 1 32 18V56Z";

export function BioathosMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={HEART} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d={HEART_LEFT} fill="currentColor" />
      <g fill="currentColor">
        <rect x="34.6" y="23.2" width="3.6" height="8.4" rx="1.8" transform="rotate(-18 36.4 27.4)" />
        <rect x="40.2" y="20.6" width="4.4" height="11" rx="2.2" transform="rotate(24 42.4 26.1)" />
        <rect x="36.4" y="31.6" width="4.4" height="11" rx="2.2" transform="rotate(44 38.6 37.1)" />
        <rect x="44.1" y="29.4" width="4.4" height="11" rx="2.2" transform="rotate(30 46.3 34.9)" />
        <rect x="36.9" y="40.2" width="4" height="9.2" rx="2" transform="rotate(44 38.9 44.8)" />
        <circle cx="34.6" cy="33.4" r="1.05" />
        <circle cx="49.2" cy="25.6" r="1.05" />
        <circle cx="43.2" cy="41.4" r="1.05" />
        <circle cx="35.4" cy="48.2" r="0.9" />
      </g>
    </svg>
  );
}

export function Logo({ variant = "ink" }: { variant?: "ink" | "light" }) {
  const color = variant === "light" ? "#ffffff" : "var(--brand-deep)";
  return (
    <span className="inline-flex items-center gap-2 font-display" style={{ color }}>
      <BioathosMark />
      <span
        className="text-xl"
        style={{ fontWeight: 800, letterSpacing: "-0.01em" }}
      >
        BIO<span style={{ color: "var(--brand)" }}>ATHOS</span>
      </span>
    </span>
  );
}
