import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { clearDonation, readDonation, type Donation } from "@/lib/donation";

export const Route = createFileRoute("/don/merci")({
  head: () => ({
    meta: [
      { title: "Merci pour votre don — Orphelinat Jésus Mon Refuge" },
      {
        name: "description",
        content:
          "Confirmation de votre don à l'orphelinat Jésus Mon Refuge : merci de soutenir les enfants d'Antananarivo.",
      },
      { property: "og:title", content: "Merci pour votre don — Jésus Mon Refuge" },
      { property: "og:description", content: "Votre générosité offre repas, école et soins aux enfants." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThanksPage,
});

function ThanksPage() {
  const { t } = useLang();
  const [donation, setDonation] = useState<Donation | null>(null);

  useEffect(() => {
    setDonation(readDonation());
  }, []);

  return (
    <>
      <PageHero kicker={t.thanks.kicker} title={t.thanks.title} intro={t.thanks.body} />

      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          {donation ? (
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {t.thanks.summary}
              </p>
              <p className="mt-4 font-display text-4xl font-bold">
                {donation.amount} € ·{" "}
                <span className="text-2xl font-semibold text-muted-foreground">
                  {donation.frequency === "monthly" ? t.flow.monthly : t.flow.once}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.flow.fromLabel} : {donation.anonymous ? t.flow.anonymousName : donation.name}
              </p>
              {donation.message ? (
                <div className="mt-6 rounded-2xl bg-secondary/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {t.thanks.yourMessage}
                  </p>
                  <p className="mt-2 whitespace-pre-line leading-relaxed">{donation.message}</p>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="rounded-[2rem] border border-border bg-card p-8 leading-relaxed text-muted-foreground shadow-soft">
              {t.thanks.noData}
            </p>
          )}
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-10 text-lg italic leading-relaxed text-muted-foreground">{t.thanks.verse}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full gradient-warm px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              {t.thanks.backHome}
            </Link>
            <Link
              to="/don"
              onClick={() => clearDonation()}
              className="rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              {t.thanks.newDonation}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}