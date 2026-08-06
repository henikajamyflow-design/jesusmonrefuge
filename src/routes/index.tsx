import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { Zigzag } from "@/components/site/Section";
import { Founders } from "@/components/site/Founders";
import heroImg from "@/assets/hero-children.jpg";
import educationImg from "@/assets/education.jpg";
import mealsImg from "@/assets/meals.jpg";
import churchImg from "@/assets/church.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orphelinat Jésus Mon Refuge — Parrainer un enfant à Madagascar" },
      {
        name: "description",
        content:
          "Orphelinat chrétien à Antananarivo. Éducation, repas, soins et parrainage d'enfants orphelins à Madagascar.",
      },
      { property: "og:title", content: "Orphelinat Jésus Mon Refuge — Madagascar" },
      {
        property: "og:description",
        content: "Prenons soin des orphelins : éducation, repas, soins et parrainage à Antananarivo.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 600));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const storyImages = [educationImg, mealsImg, churchImg];

  return (
    <>
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={heroImg}
          alt={t.hero.kicker}
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
          style={{ transform: `translate3d(0, ${offset * 0.25}px, 0) scale(1.08)` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/45 to-foreground/25"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary-foreground/80">
              {t.hero.kicker}
            </p>
            <h1 className="mt-5 whitespace-pre-line text-5xl font-extrabold leading-[0.98] text-primary-foreground sm:text-6xl lg:text-8xl">
              {t.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              {t.hero.verse}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/don"
                className="rounded-full gradient-warm px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-1"
              >
                {t.cta.sponsor}
              </Link>
              <Link
                to="/orphelinat"
                className="rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground/10"
              >
                {t.cta.learn}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-12 lg:grid-cols-4 lg:px-8">
          {t.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="px-4 py-4 text-center">
              <p className="font-display text-4xl font-extrabold text-primary lg:text-5xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">{t.intro.title}</h2>
            <p className="mt-8 border-l-2 border-primary pl-5 text-base italic leading-relaxed text-muted-foreground">
              {t.intro.verse}
            </p>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {t.intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link
              to="/mission"
              className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-transform duration-300 hover:translate-x-1"
            >
              {t.cta.learn} →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">{t.pillarsTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <article className="group h-full rounded-[1.75rem] border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <span className="grid size-11 place-items-center rounded-2xl bg-secondary font-display text-sm font-bold text-primary transition-colors duration-500 group-hover:gradient-warm group-hover:text-primary-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-24 px-5 py-24 lg:space-y-32 lg:px-8 lg:py-32">
        <Reveal>
          <h2 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">{t.storyTitle}</h2>
        </Reveal>
        {t.stories.map((story, i) => (
          <Zigzag
            key={story.title}
            eyebrow={story.eyebrow}
            title={story.title}
            body={story.body}
            image={storyImages[i]!}
            alt={story.title}
            flip={i % 2 === 1}
          />
        ))}
      </section>

      <Founders />

      <section className="relative overflow-hidden gradient-warm py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl">
              {t.sponsorTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
            {t.sponsorPoints.map((point, i) => (
              <Reveal key={point} delay={i * 120}>
                <div className="h-full rounded-[1.75rem] bg-card/95 p-7 shadow-lift backdrop-blur">
                  <p className="font-display text-3xl font-extrabold text-primary">0{i + 1}</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <Link
              to="/don"
              className="mt-12 inline-flex rounded-full bg-card px-8 py-4 text-sm font-semibold text-primary shadow-lift transition-transform duration-300 hover:-translate-y-1"
            >
              {t.cta.sponsor}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
