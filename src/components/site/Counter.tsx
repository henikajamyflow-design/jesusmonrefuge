import { useEffect, useRef, useState } from "react";

/** Animates the numeric part of a value like "2022", "30M", "100%". */
export function Counter({ value, className }: { value: string; className?: string }) {
  const match = /^(\D*)([\d.,]+)(.*)$/.exec(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const target = match ? Number(match[2]!.replace(/[,\s]/g, "")) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !Number.isFinite(target)) return;
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
          setN(Math.round(target * eased));
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
  }, [target, match]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {match[1]}
      {n.toLocaleString("fr-FR")}
      {match[3]}
    </span>
  );
}
