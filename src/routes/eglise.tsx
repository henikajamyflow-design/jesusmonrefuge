import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { PageHero, Zigzag } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import churchImg from "@/assets/church.jpg";

export const Route = createFileRoute("/eglise")({
  head: () => ({
    meta: [
      { title: "Notre église — Orphelinat Jésus Mon Refuge" },
      {
        name: "description",
        content:
          "Les enfants de l'orphelinat sont accueillis dans une église évangélique locale à Antananarivo, un lieu de paix et d'espérance.",
      },
      { property: "og:title", content: "Notre église — Orphelinat Jésus Mon Refuge" },
      {
        property: "og:description",
        content: "Une communauté chrétienne qui accompagne les enfants et les veuves à Madagascar.",
      },
    ],
  }),
  component: ChurchPage,
});

function ChurchPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero kicker={t.stories[2].eyebrow} title={t.nav.church} intro={t.stories[2].body} />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Zigzag
          eyebrow={t.pillars[3].title}
          title={t.stories[2].title}
          body={t.pillars[3].body}
          image={churchImg}
          alt={t.nav.church}
        />
      </section>

      <section className="bg-secondary/50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="text-2xl font-medium leading-relaxed italic sm:text-3xl">{t.intro.verse}</p>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{t.intro.body[1]}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}