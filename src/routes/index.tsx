import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { Zigzag } from "@/components/site/Section";
import { Founders } from "@/components/site/Founders";
import { Counter } from "@/components/site/Counter";
import { Marquee } from "@/components/site/Marquee";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import heroImg from "@/assets/hero-children.jpg";
import educationImg from "@/assets/education.jpg";
import mealsImg from "@/assets/meals.jpg";
import churchImg from "@/assets/church.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import { CollectionSurfer } from "@/components/ui/collection-surfer";
import { DonateButton } from "@/components/ui/subtle-button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orphelinat Jésus Mon Refuge — Parrainer un enfant à Madagascar" },
      {
        name: "description",
        content:
          "Orphelinat chrétien à Antananarivo. Éducation, repas, soins et parrainage d'enfants orphelins à Madagascar.",
      },
      { property: "og:title", content: "Orphelinat Jésus Mon Refuge — Parrainer un enfant à Madagascar" },
      {
        property: "og:description",
        content: "Orphelinat chrétien à Antananarivo. Éducation, repas, soins et parrainage d'enfants orphelins à Madagascar.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 700));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const storyImages = [educationImg, mealsImg, churchImg];
  const galleryImages = [
    educationImg,
    mealsImg,
    churchImg,
    gallery4,
    gallery1,
    gallery2,
    gallery3,
    heroImg,
  ];
  const titleWords = t.hero.title.split(/\s+/);
  const marqueeItems = [...t.pillars.map((p) => p.title), t.org, t.hero.kicker];

  return (
    <>
      <section className="grain relative flex min-h-screen items-end overflow-hidden">
        <img
          src={heroImg}
          alt={t.hero.kicker}
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
          style={{
            transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.12)`,
            filter: `saturate(${1 + offset / 2400})`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/45 to-foreground/25"
        />
        <div
          aria-hidden
          className="float-slow pointer-events-none absolute -right-20 top-24 size-[26rem] rounded-full gradient-warm opacity-25 blur-3xl"
        />

        <div
          className="relative mx-auto w-full max-w-7xl px-5 pb-24 lg:px-8 lg:pb-32"
          style={{ opacity: Math.max(0, 1 - offset / 520), transform: `translateY(${offset * -0.08}px)` }}
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary-foreground/85">
            <span aria-hidden className="h-px w-10 bg-primary-foreground/50" />
            {t.hero.kicker}
          </p>

          <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] text-primary-foreground sm:text-6xl lg:text-8xl">
            <span className="sr-only">{t.hero.title}</span>
            <span aria-hidden className="flex flex-wrap">
              {titleWords.map((word, i) => (
                <span key={`${word}-${i}`} className="overflow-hidden pb-1 pr-[0.28em]">
                  <span
                    className="word-rise"
                    style={{ animationDelay: `${120 + i * 90}ms` }}
                  >
                    {i === titleWords.length - 1 ? (
                      <span className="text-gradient-warm">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="border-l-2 border-primary/70 pl-5 text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                {t.hero.verse}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <DonateButton variant="solid">{t.cta.sponsor}</DonateButton>
                <Link
                  to="/orphelinat"
                  className="rounded-full border border-primary-foreground/40 px-8 py-4 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors duration-300 hover:bg-primary-foreground/10"
                >
                  {t.cta.learn}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3 text-primary-foreground/70">
              <span className="relative block h-12 w-6 rounded-full border border-primary-foreground/40">
                <span
                  aria-hidden
                  className="scroll-cue absolute left-1/2 top-2 size-1.5 -translate-x-1/2 rounded-full bg-primary-foreground"
                />
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.28em]">{t.hero.scroll}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-14 lg:grid-cols-4 lg:px-8">
          {t.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className="border-border px-4 py-4 text-center sm:[&:not(:nth-child(2n+1))]:border-l lg:[&:not(:first-child)]:border-l"
            >
              <Counter
                value={stat.value}
                className="font-display text-4xl font-extrabold text-gradient-warm lg:text-6xl"
              />
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee items={marqueeItems} />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t.orgSub}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{t.intro.title}</h2>
            <p className="mt-8 rounded-[1.5rem] border border-border bg-card p-6 text-base italic leading-relaxed text-muted-foreground shadow-soft">
              {t.intro.verse}
            </p>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {t.intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link
              to="/mission"
              className="group inline-flex items-center gap-2 text-base font-semibold text-primary"
            >
              {t.cta.learn}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary/50 py-24 lg:py-32">
        <div
          aria-hidden
          className="float-slow pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full gradient-warm opacity-10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">{t.pillarsTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <SpotlightCard>
                  <span className="grid size-11 place-items-center rounded-2xl bg-secondary font-display text-sm font-bold text-primary transition-colors duration-500 group-hover:gradient-warm group-hover:text-primary-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                  <span
                    aria-hidden
                    className="mt-6 block h-px w-0 gradient-warm transition-all duration-700 group-hover:w-full"
                  />
                </SpotlightCard>
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
            index={i + 1}
            eyebrow={story.eyebrow}
            title={story.title}
            body={story.body}
            image={storyImages[i]!}
            alt={story.title}
            flip={i % 2 === 1}
          />
        ))}
      </section>

      <CollectionSurfer
        variant="magnetic"
        eyebrow={t.gallery.eyebrow}
        label={t.gallery.label}
        hint={t.gallery.hint}
        items={galleryImages.map((image, i) => ({
          id: i + 1,
          image,
          title: t.gallery.items[i] ?? "",
        }))}
      />

      <Founders />

      <section className="grain relative overflow-hidden gradient-warm py-24 lg:py-32">
        <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl">
              {t.sponsorTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
            {t.sponsorPoints.map((point, i) => (
              <Reveal key={point} delay={i * 120}>
                <div className="h-full rounded-[1.75rem] bg-card/95 p-7 shadow-lift backdrop-blur transition-transform duration-500 hover:-translate-y-2">
                  <p className="font-display text-3xl font-extrabold text-primary">0{i + 1}</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <DonateButton variant="outline" className="mt-12 px-8 py-4">
              {t.cta.sponsor}
            </DonateButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
