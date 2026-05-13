export function Logo({ variant = "ink" }: { variant?: "ink" | "light" }) {
  const color = variant === "light" ? "#ffffff" : "var(--brand-deep)";
  return (
    <span className="inline-flex items-center gap-2 font-display" style={{ color }}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M32 56s-22-12.5-22-29A13 13 0 0 1 32 18a13 13 0 0 1 22 9c0 16.5-22 29-22 29Z"
          fill="currentColor"
        />
        <circle cx="40" cy="26" r="2.2" fill="#fff" />
        <circle cx="34" cy="32" r="1.6" fill="#fff" />
        <circle cx="43" cy="34" r="1.4" fill="#fff" />
        <circle cx="38" cy="40" r="1.8" fill="#fff" />
      </svg>
      <span
        className="text-xl"
        style={{ fontWeight: 800, letterSpacing: "-0.01em" }}
      >
        BIO<span style={{ color: "var(--brand)" }}>ATHOS</span>
      </span>
    </span>
  );
}
