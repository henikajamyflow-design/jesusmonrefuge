import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { PageHero, Zigzag } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-children.jpg";
import mealsImg from "@/assets/meals.jpg";

export const Route = createFileRoute("/orphelinat")({
  head: () => ({
    meta: [
      { title: "L'orphelinat — Jésus Mon Refuge, Antananarivo" },
      {
        name: "description",
        content:
          "Découvrez l'orphelinat chrétien Jésus Mon Refuge à Antananarivo : une famille, des repas, une école et des soins pour chaque enfant.",
      },
      { property: "og:title", content: "L'orphelinat — Jésus Mon Refuge" },
      {
        property: "og:description",
        content: "Une famille pour les enfants orphelins d'Antananarivo, Madagascar.",
      },
    ],
  }),
  component: OrphanagePage,
});

function OrphanagePage() {
  const { t } = useLang();

  return (
    <>
      <PageHero kicker={t.hero.kicker} title={t.nav.orphanage} intro={t.intro.body[0]} />

      <section className="mx-auto max-w-7xl space-y-24 px-5 py-20 lg:px-8 lg:py-28">
        <Zigzag
          eyebrow={t.intro.title}
          title={t.stories[0].title}
          body={t.intro.body[1]}
          image={heroImg}
          alt={t.intro.title}
        />
        <Zigzag
          eyebrow={t.stories[1].eyebrow}
          title={t.stories[1].title}
          body={t.stories[1].body}
          image={mealsImg}
          alt={t.stories[1].title}
          flip
        />
      </section>

      <section className="bg-secondary/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">{t.pillarsTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {t.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <article className="h-full rounded-[1.75rem] border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <Link
              to="/don"
              className="mt-12 inline-flex rounded-full gradient-warm px-8 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              {t.cta.sponsor}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}