import { createFileRoute } from "@tanstack/react-router";
import { links, useLang } from "@/lib/i18n";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { GradientCardShowcase } from "@/components/ui/gradient-card-showcase";
import contactPhone from "@/assets/contact-telephone.png.asset.json";
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

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    t.contact.address,
  )}`;

  const contactCards = [
    {
      title: t.contact.emailLabel,
      desc: links.email,
      gradientFrom: "#4285F4",
      gradientTo: "#34A853",
      glowFrom: "#4285F4",
      glowTo: "#EA4335",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.email)}`,
      icon: <Mail className="size-6" />,
      cta: t.contact.emailCta,
    },
    {
      title: t.contact.phoneLabel,
      desc: links.phone,
      gradientFrom: "#0d9488",
      gradientTo: "#059669",
      glowFrom: "#22c55e",
      glowTo: "#16a34a",
      href: `tel:${links.phone.replace(/\s/g, "")}`,
      icon: <Phone className="size-6" />,
      cta: t.contact.phoneCta,
    },
    {
      title: t.contact.addressLabel,
      desc: t.contact.address,
      gradientFrom: "#FBBC05",
      gradientTo: "#EA4335",
      glowFrom: "#FBBC05",
      glowTo: "#34A853",
      href: mapsUrl,
      icon: <MapPin className="size-6" />,
    },
    {
      title: "Instagram",
      desc: t.contact.instagramDesc,
      gradientFrom: "#833AB4",
      gradientTo: "#E1306C",
      glowFrom: "#833AB4",
      glowTo: "#FCAF45",
      href: links.instagram,
      icon: <Instagram className="size-6" />,
      cta: t.contact.instagramCta,
    },
    {
      title: "Facebook",
      desc: t.contact.facebookDesc,
      gradientFrom: "#1877F2",
      gradientTo: "#1877F2",
      glowFrom: "#1877F2",
      glowTo: "#42B72A",
      href: links.facebook,
      icon: <Facebook className="size-6" />,
      cta: t.contact.facebookCta,
    },
  ];

  return (
    <>
      <PageHero
        kicker={t.orgSub}
        title={t.contact.title}
        intro={t.contact.body}
        image={contactPhone.url}
        imageAlt={t.contact.title}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <GradientCardShowcase cards={contactCards} />
        </Reveal>
      </section>
    </>
  );
}
