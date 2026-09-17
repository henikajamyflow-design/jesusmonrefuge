import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DonateButton } from "@/components/ui/subtle-button";

export function Header() {
  const { t, lang, setLang } = useLang();

  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/" && atTop && !open;
  const scrolled = !overHero;

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { to: "/", label: t.nav.home },
    { to: "/orphelinat", label: t.nav.orphanage },
    { to: "/mission", label: t.nav.mission },
    { to: "/eglise", label: t.nav.church },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl py-2"
          : "bg-gradient-to-b from-foreground/55 to-transparent py-4 text-primary-foreground",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-warm text-primary-foreground font-display text-sm font-bold shadow-soft">
            JMR
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[0.95rem] font-semibold">{t.org}</span>
            <span
              className={cn(
                "block text-[0.7rem] uppercase tracking-[0.18em]",
                scrolled ? "text-muted-foreground" : "text-primary-foreground/70",
              )}
            >
              {t.orgSub}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: scrolled ? "text-primary" : "opacity-100" }}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                  scrolled
                    ? "text-foreground/75 hover:text-primary after:bg-primary"
                    : "text-primary-foreground/85 hover:text-primary-foreground after:bg-primary-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "ml-1 flex items-center rounded-full border p-0.5 text-xs font-semibold",
              scrolled ? "border-border bg-card" : "border-primary-foreground/30 bg-foreground/25 backdrop-blur",
            )}
          >
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cn(
                  "rounded-full px-2 py-1 uppercase transition-colors",
                  lang === code
                    ? "bg-primary text-primary-foreground"
                    : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground",
                )}
              >
                {code}
              </button>
            ))}
          </div>

          <DonateButton variant="solid" className="hidden px-5 py-2.5 shadow-soft sm:inline-flex">
            {t.cta.give}
          </DonateButton>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full border lg:hidden",
              scrolled ? "border-border bg-card" : "border-primary-foreground/30 bg-foreground/25 backdrop-blur",
            )}
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300",
                  open && "top-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 rounded bg-current transition-transform duration-300",
                  open && "bottom-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden px-5 transition-all duration-500 lg:hidden",
          open ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]",
        )}
      >
        <nav className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 rounded-3xl border border-border bg-card p-3 text-foreground shadow-soft">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <DonateButton
              variant="solid"
              fullWidth
              onClick={() => setOpen(false)}
              className="mt-1 rounded-2xl px-3 py-2.5"
            >
              {t.cta.give}
            </DonateButton>
          </div>
        </nav>
      </div>
    </header>
  );
}