import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const LOCALES: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  de: "de-DE",
  it: "it-IT",
  es: "es-ES",
};

/** Animates the numeric part of a value like "2023", "33.3M", "100%". */
export function Counter({ value, className }: { value: string; className?: string }) {
  const { lang } = useLang();
  const match = /^(\D*)([\d.,]+)(.*)$/.exec(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const normalized = match ? match[2]!.replace(/\s/g, "").replace(",", ".") : "";
  const target = normalized !== "" && Number.isFinite(Number(normalized)) ? Number(normalized) : 0;
  const decimals = normalized.includes(".") ? normalized.split(".")[1]!.length : 0;
  const locale = LOCALES[lang] ?? "fr-FR";
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || normalized === "" || !Number.isFinite(target)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(target * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, normalized]);

  if (!match || normalized === "" || !Number.isFinite(target)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {match[1]}
      {n.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {match[3]}
    </span>
  );
}
