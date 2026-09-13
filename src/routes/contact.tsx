import { createFileRoute } from "@tanstack/react-router";
import { links, useLang } from "@/lib/i18n";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { GradientCardShowcase } from "@/components/ui/gradient-card-showcase";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

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

  const contactCards = [
    {
      title: t.contact.emailLabel,
      desc: links.email,
      gradientFrom: "#d97706",
      gradientTo: "#c2410c",
      href: `mailto:${links.email}`,
      icon: <Mail className="size-6" />,
      cta: "Envoyer un e-mail",
    },
    {
      title: t.contact.phoneLabel,
      desc: links.phone,
      gradientFrom: "#0d9488",
      gradientTo: "#059669",
      href: `tel:${links.phone.replace(/\s/g, "")}`,
      icon: <Phone className="size-6" />,
      cta: "Appeler",
    },
    {
      title: t.contact.addressLabel,
      desc: t.contact.address,
      gradientFrom: "#7c3aed",
      gradientTo: "#db2777",
      icon: <MapPin className="size-6" />,
    },
    {
      title: t.contact.follow,
      desc: "Instagram & Facebook",
      gradientFrom: "#f59e0b",
      gradientTo: "#7c2d12",
      icon: (
        <div className="flex -space-x-2">
          <Instagram className="size-5" />
          <Facebook className="size-5" />
        </div>
      ),
      cta: "Suivre l'actualité",
    },
  ];

  return (
    <>
      <PageHero kicker={t.orgSub} title={t.contact.title} intro={t.contact.body} />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <GradientCardShowcase cards={contactCards} />
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16 rounded-[1.75rem] gradient-warm p-8 text-center shadow-lift">
            <p className="font-display text-2xl font-bold text-primary-foreground">
              {t.contact.follow}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-1"
              >
                <Instagram className="size-4" />
                Instagram
              </a>
              <a
                href={links.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-1"
              >
                <Facebook className="size-4" />
                Facebook
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
