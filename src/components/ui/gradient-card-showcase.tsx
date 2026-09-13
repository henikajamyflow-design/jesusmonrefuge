import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GradientCardData {
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
  /** Optional glow colors. Falls back to gradientFrom/gradientTo when omitted. */
  glowFrom?: string;
  glowTo?: string;
  href?: string;
  icon?: ReactNode;
  cta?: string;
}

interface GradientCardShowcaseProps {
  cards: GradientCardData[];
  className?: string;
}

export function GradientCardShowcase({ cards, className }: GradientCardShowcaseProps) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {cards.map((card, idx) => (
        <a
          key={card.title + idx}
          href={card.href}
          target={card.href?.startsWith("http") ? "_blank" : undefined}
          rel={card.href?.startsWith("http") ? "noreferrer" : undefined}
          className="group relative block h-full min-h-[16rem] overflow-hidden rounded-[1.75rem] border border-border bg-card p-[1px] shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
          style={{ textDecoration: "none" }}
        >
          {/* Outer glow on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[2.25rem] bg-gradient-to-br from-[var(--glow-from)] to-[var(--glow-to)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
            style={
              {
                "--glow-from": card.glowFrom ?? card.gradientFrom,
                "--glow-to": card.glowTo ?? card.gradientTo,
              } as React.CSSProperties
            }
          />

          {/* Skewed gradient panel */}
          <span
            aria-hidden
            className="absolute inset-0 origin-bottom-left -translate-x-full -translate-y-full skew-y-[-12deg] bg-gradient-to-br from-[var(--card-from)] to-[var(--card-to)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-10"
            style={
              {
                "--card-from": card.gradientFrom,
                "--card-to": card.gradientTo,
              } as React.CSSProperties
            }
          />

          {/* Top-right gradient skew */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--card-from)] to-[var(--card-to)] opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
            style={
              {
                "--card-from": card.gradientFrom,
                "--card-to": card.gradientTo,
              } as React.CSSProperties
            }
          />

          {/* Animated blurs */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-6 bottom-8 h-20 w-20 rounded-full bg-gradient-to-br from-[var(--card-from)] to-[var(--card-to)] opacity-30 blur-xl animate-blob"
            style={
              {
                "--card-from": card.gradientFrom,
                "--card-to": card.gradientTo,
              } as React.CSSProperties
            }
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-16 h-16 w-16 rounded-full bg-gradient-to-br from-[var(--card-to)] to-[var(--card-from)] opacity-25 blur-lg animate-blob animation-delay-1000"
            style={
              {
                "--card-from": card.gradientFrom,
                "--card-to": card.gradientTo,
              } as React.CSSProperties
            }
          />

          {/* Content */}
          <div className="relative flex h-full flex-col justify-between rounded-[1.65rem] bg-card/80 p-7 backdrop-blur-sm">
            <div>
              {card.icon ? (
                <div
                  className="mb-5 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--card-from)] to-[var(--card-to)] text-primary-foreground shadow-md"
                  style={
                    {
                      "--card-from": card.gradientFrom,
                      "--card-to": card.gradientTo,
                    } as React.CSSProperties
                  }
                >
                  {card.icon}
                </div>
              ) : null}
              <h3 className="font-display text-xl font-bold leading-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
            </div>

            {card.cta ? (
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-[var(--card-from)]">
                {card.cta}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}

export default GradientCardShowcase;
