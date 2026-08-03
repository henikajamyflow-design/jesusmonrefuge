import { createFileRoute } from "@tanstack/react-router";
import { links, useLang } from "@/lib/i18n";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Orphelinat Jésus Mon Refuge Madagascar" },
      {
        name: "description",
        content:
          "Écrivez-nous à contact@orphelinat-jesus-mon-refuge.com ou appelez-nous : nous répondons à chaque message.",
      },
      { property: "og:title", content: "Contact — Orphelinat Jésus Mon Refuge" },
      {
        property: "og:description",
        content: "Une question, un partenariat, une envie d'aider ? Contactez l'association.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();

  const cards = [
    { label: t.contact.emailLabel, value: links.email, href: `mailto:${links.email}` },
    { label: t.contact.phoneLabel, value: links.phone, href: `tel:${links.phone.replace(/\s/g, "")}` },
    { label: t.contact.addressLabel, value: t.contact.address },
  ];

  return (
    <>
      <PageHero kicker={t.orgSub} title={t.contact.title} intro={t.contact.body} />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 110}>
              <div className="h-full rounded-[1.75rem] border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{card.label}</p>
                {card.href ? (
                  <a href={card.href} className="mt-4 block break-words text-lg font-medium hover:text-primary">
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-4 text-lg font-medium leading-relaxed">{card.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 rounded-[1.75rem] gradient-warm p-8 text-center shadow-lift">
            <p className="font-display text-2xl font-bold text-primary-foreground">{t.contact.follow}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-1"
              >
                Instagram
              </a>
              <a
                href={links.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-1"
              >
                Facebook
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}