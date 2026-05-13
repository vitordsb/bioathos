"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  /** Delay em ms para encadear elementos próximos. */
  delay?: number;
  /** Tag HTML do wrapper. Default: div. */
  as?: "div" | "section" | "article" | "aside";
};

export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      {...rest}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal-on-scroll ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, ...(delay ? { transitionDelay: `${delay}ms` } : {}) }}
    >
      {children}
    </Tag>
  );
}
