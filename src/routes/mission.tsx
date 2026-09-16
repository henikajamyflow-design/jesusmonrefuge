import { createFileRoute } from "@tanstack/react-router";
import { DonateButton } from "@/components/ui/subtle-button";
import { useLang } from "@/lib/i18n";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import educationImg from "@/assets/education.jpg";

const missionFr = [
  "Participer à la création d'orphelinats à Madagascar et mettre en place des programmes de parrainage pour les enfants issus de milieux défavorisés ou orphelins.",
  "Assurer la prise en charge éducative et sanitaire des mineurs dans des structures agréées, dans le respect des lois et règlements en vigueur à Madagascar.",
  "Initier et soutenir des projets en synergie dans plusieurs domaines : éducation, santé, agriculture, économie et services religieux chrétiens.",
  "Apporter une aide directe ou indirecte aux populations locales par tous moyens, dans un cadre de partenariat.",
  "Favoriser toute initiative créatrice d'emplois et de revenus, notamment par l'emploi salarié des personnes vulnérables au sein de l'orphelinat.",
  "Développer des programmes de formation facilitant la responsabilité et l'autonomie des bénéficiaires, y compris des formations religieuses.",
  "Développer des liens de solidarité, de coopération et d'amitié avec Madagascar, en nous enrichissant mutuellement de nos différences.",
];

const missionEn = [
  "Take part in creating orphanages in Madagascar and set up sponsorship programmes for orphaned or disadvantaged children.",
  "Provide education and healthcare for minors in authorized facilities, in line with the laws and regulations in force in Madagascar.",
  "Initiate and support projects working in synergy across education, health, agriculture, economy and Christian religious services.",
  "Provide direct or indirect assistance to local populations through any means within a partnership framework.",
  "Support every initiative that creates jobs and income, notably salaried employment for vulnerable people within the orphanage.",
  "Develop training programmes that build responsibility and autonomy for beneficiaries, including religious training.",
  "Build ties of solidarity, cooperation and friendship with Madagascar, enriching one another through our differences.",
];

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Notre mission — Orphelinat Jésus Mon Refuge" },
      {
        name: "description",
        content:
          "Éducation, santé, emploi et solidarité : les engagements de l'association Jésus Mon Refuge à Madagascar.",
      },
      { property: "og:title", content: "Notre mission — Orphelinat Jésus Mon Refuge" },
      {
        property: "og:description",
        content: "Les engagements concrets de notre association auprès des enfants et des veuves à Madagascar.",
      },
    ],
  }),
  component: MissionPage,
});

function MissionPage() {
  const { t, lang } = useLang();
  const items = lang === "fr" ? missionFr : missionEn;

  return (
    <>
      <PageHero kicker={t.orgSub} title={t.nav.mission} intro={t.stories[1].body} />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <ol className="space-y-8">
            {items.map((item, i) => (
              <Reveal key={item} delay={i * 70} as="li">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary font-display text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="min-w-0 text-lg leading-relaxed text-muted-foreground">{item}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={educationImg}
                alt={t.pillars[0].title}
                loading="lazy"
                width={1280}
                height={1024}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <DonateButton variant="solid" className="mt-6 px-7 py-3.5">
              {t.cta.partner}
            </DonateButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}