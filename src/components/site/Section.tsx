import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40 px-5 pt-36 pb-16 lg:px-8 lg:pt-44 lg:pb-24">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -right-24 -top-24 size-80 rounded-full gradient-warm opacity-15 blur-3xl"
      />
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{kicker}</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

export function Zigzag({
  eyebrow,
  title,
  body,
  image,
  alt,
  flip,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  flip?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn("order-1", flip && "lg:order-2")}>
        <div className="group relative overflow-hidden rounded-[2rem] shadow-lift">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            width={1280}
            height={1024}
            className="aspect-[5/4] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent opacity-70"
          />
        </div>
      </Reveal>
      <Reveal delay={120} className={cn("order-2", flip && "lg:order-1")}>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <h3 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h3>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{body}</p>
        {children}
      </Reveal>
    </div>
  );
}