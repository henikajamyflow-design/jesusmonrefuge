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
    <section className="grain relative overflow-hidden border-b border-border bg-secondary/40 px-5 pt-36 pb-16 lg:px-8 lg:pt-44 lg:pb-24">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -right-24 -top-24 size-80 rounded-full gradient-warm opacity-15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px gradient-warm opacity-40"
      />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            <span aria-hidden className="h-px w-10 gradient-warm" />
            {kicker}
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-7xl">{title}</h1>
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
  index,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  flip?: boolean;
  index?: number;
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
          {index ? (
            <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-2xl bg-card/90 font-display text-lg font-extrabold text-primary shadow-soft backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
              0{index}
            </span>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={120} className={cn("order-2", flip && "lg:order-1")}>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          <span aria-hidden className="h-px w-8 gradient-warm" />
          {eyebrow}
        </p>
        <h3 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h3>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{body}</p>
        {children}
      </Reveal>
    </div>
  );
}