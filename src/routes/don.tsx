import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { links, useLang } from "@/lib/i18n";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/don")({
  head: () => ({
    meta: [
      { title: "Parrainer un enfant — Orphelinat Jésus Mon Refuge" },
      {
        name: "description",
        content:
          "Parrainez un enfant ou faites un don à l'orphelinat Jésus Mon Refuge : repas, scolarité et soins à Antananarivo, Madagascar.",
      },
      { property: "og:title", content: "Parrainer un enfant — Jésus Mon Refuge" },
      {
        property: "og:description",
        content: "Chaque don se traduit en repas, en cahiers, en soins et en sourires.",
      },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const { t } = useLang();
  const [selected, setSelected] = useState(1);

  return (
    <>
      <PageHero kicker={t.cta.sponsor} title={t.donate.title} intro={t.donate.body} />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {t.donate.amounts.map((amount, i) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setSelected(i)}
                    className={cn(
                      "rounded-2xl border px-3 py-4 font-display text-lg font-bold transition-all duration-300",
                      selected === i
                        ? "border-transparent gradient-warm text-primary-foreground shadow-soft -translate-y-0.5"
                        : "border-border bg-secondary/50 text-foreground hover:-translate-y-0.5 hover:border-primary",
                    )}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.donate.amountsNote}</p>

              <a
                href={links.paypal}
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex w-full items-center justify-center rounded-full gradient-warm px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                {t.donate.paypal}
              </a>
              <a
                href={`mailto:${links.email}?subject=${encodeURIComponent(t.donate.transfer)}`}
                className="mt-3 flex w-full items-center justify-center rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                {t.donate.transfer}
              </a>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.donate.transferNote}</p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{t.sponsorTitle}</h2>
            </Reveal>
            <div className="mt-8 space-y-5">
              {t.sponsorPoints.map((point, i) => (
                <Reveal key={point} delay={i * 110}>
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-[1.5rem] border border-border bg-secondary/40 p-6">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl gradient-warm font-display text-xs font-bold text-primary-foreground">
                      0{i + 1}
                    </span>
                    <p className="min-w-0 leading-relaxed text-muted-foreground">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}