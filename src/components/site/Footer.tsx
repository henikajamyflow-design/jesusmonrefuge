import { Link } from "@tanstack/react-router";
import { links, useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.25rem] gradient-warm px-8 py-12 text-center shadow-lift lg:px-16 lg:py-16">
            <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl">
              {t.footerCta}
            </h2>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/don"
                className="rounded-full bg-card px-8 py-4 text-sm font-semibold text-primary shadow-lift transition-transform duration-300 hover:-translate-y-1"
              >
                {t.cta.sponsor}
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-primary-foreground/50 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground/10"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-warm font-display text-sm font-bold text-primary-foreground">
                JMR
              </span>
              <span className="font-display text-base font-semibold">{t.org}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.footerTagline}</p>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/orphelinat" className="text-muted-foreground transition-colors hover:text-primary">
              {t.nav.orphanage}
            </Link>
            <Link to="/mission" className="text-muted-foreground transition-colors hover:text-primary">
              {t.nav.mission}
            </Link>
            <Link to="/eglise" className="text-muted-foreground transition-colors hover:text-primary">
              {t.nav.church}
            </Link>
            <Link to="/don" className="text-muted-foreground transition-colors hover:text-primary">
              {t.cta.sponsor}
            </Link>
          </nav>

          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${links.email}`}
              className="break-all text-muted-foreground transition-colors hover:text-primary"
            >
              {links.email}
            </a>
            <a
              href={`tel:${links.phone.replace(/\s/g, "")}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {links.phone}
            </a>
            <p className="text-muted-foreground">{t.contact.address}</p>
            <div className="mt-2 flex gap-3">
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
              >
                Instagram
              </a>
              <a
                href={links.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.org} — {t.rights}
          </p>
          <a
            href="https://www.orphelinat-jesus-mon-refuge.com/mentions-legales-cookies/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            {t.legal}
          </a>
        </div>
      </div>
    </footer>
  );
}