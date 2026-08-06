import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import foundersAsset from "@/assets/fondateurs.png.asset.json";

export function Founders() {
  const { t } = useLang();
  const f = t.founders;

  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/40 py-24 lg:py-32">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -left-32 top-10 size-96 rounded-full gradient-warm opacity-10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <figure className="group relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2.5rem] gradient-warm opacity-20 blur-xl transition-opacity duration-700 group-hover:opacity-40"
            />
            <div className="relative overflow-hidden rounded-[2.25rem] shadow-lift">
              <img
                src={foundersAsset.url}
                alt={f.photoAlt}
                loading="lazy"
                width={1152}
                height={768}
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-2xl font-extrabold text-primary-foreground">{f.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary-foreground/80">{f.role}</p>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <div>
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{f.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{f.title}</h2>
          </Reveal>
          <Reveal delay={180} className="mt-7 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{f.body[0]}</p>
            <p>{f.body[1]}</p>
          </Reveal>
          <Reveal delay={260}>
            <blockquote className="mt-7 rounded-[1.75rem] border border-border bg-card p-7 text-base italic leading-relaxed text-foreground/80 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              {f.verse}
            </blockquote>
          </Reveal>
          <Reveal delay={340}>
            <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{f.body[2]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
