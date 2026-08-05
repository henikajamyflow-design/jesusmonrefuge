import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { links, useLang } from "@/lib/i18n";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { PRESETS, paypalUrl, saveDonation, type Frequency } from "@/lib/donation";

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
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [preset, setPreset] = useState<number | null>(30);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const amount = preset ?? Number(custom.replace(",", "."));
  const validAmount = Number.isFinite(amount) && amount >= 1;

  const impact = useMemo(() => {
    if (!validAmount) return "";
    if (amount < 20) return t.flow.impact.low;
    if (amount < 50) return t.flow.impact.mid;
    if (amount < 100) return t.flow.impact.high;
    return t.flow.impact.top;
  }, [amount, validAmount, t]);

  const freqLabel = frequency === "monthly" ? t.flow.monthly : t.flow.once;

  function goStep1() {
    if (!validAmount) {
      setErrors([t.flow.errors.amount]);
      return;
    }
    setErrors([]);
    setStep(1);
  }

  function goStep2() {
    const next: string[] = [];
    if (!anonymous && name.trim().length < 2) next.push(t.flow.errors.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.push(t.flow.errors.email);
    if (message.trim().length > 500) next.push(t.flow.errors.message);
    setErrors(next);
    if (next.length === 0) setStep(2);
  }

  function confirm() {
    saveDonation({
      amount,
      frequency,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      anonymous,
      date: new Date().toISOString(),
    });
    window.open(paypalUrl(links.paypal, amount), "_blank", "noopener,noreferrer");
    void navigate({ to: "/don/merci" });
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-primary";

  return (
    <>
      <PageHero kicker={t.cta.sponsor} title={t.donate.title} intro={t.donate.body} />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
              <ol className="flex items-center gap-3">
                {t.flow.steps.map((label, i) => (
                  <li key={label} className="flex min-w-0 flex-1 items-center gap-2">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full font-display text-xs font-bold transition-all duration-300",
                        i <= step
                          ? "gradient-warm text-primary-foreground shadow-soft"
                          : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "truncate text-xs font-semibold uppercase tracking-[0.16em]",
                        i <= step ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                {step === 0 ? (
                  <div className="animate-in">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {t.flow.frequency}
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {(["once", "monthly"] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFrequency(f)}
                          className={cn(
                            "rounded-2xl border p-4 text-left transition-all duration-300",
                            frequency === f
                              ? "border-primary bg-secondary/60 shadow-soft -translate-y-0.5"
                              : "border-border hover:-translate-y-0.5 hover:border-primary",
                          )}
                        >
                          <span className="block font-semibold">
                            {f === "once" ? t.flow.once : t.flow.monthly}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                            {f === "once" ? t.flow.onceNote : t.flow.monthlyNote}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {t.flow.chooseAmount}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {PRESETS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setPreset(value);
                            setCustom("");
                          }}
                          className={cn(
                            "rounded-2xl border px-3 py-4 font-display text-lg font-bold transition-all duration-300",
                            preset === value
                              ? "gradient-warm -translate-y-0.5 border-transparent text-primary-foreground shadow-soft"
                              : "border-border bg-secondary/50 hover:-translate-y-0.5 hover:border-primary",
                          )}
                        >
                          {value} {t.flow.currency}
                        </button>
                      ))}
                    </div>

                    <label className="mt-5 block text-sm font-medium">
                      {t.flow.custom}
                      <div className="relative">
                        <input
                          type="number"
                          min={1}
                          max={100000}
                          inputMode="decimal"
                          value={custom}
                          placeholder={t.flow.customPlaceholder}
                          onChange={(e) => {
                            setCustom(e.target.value);
                            setPreset(null);
                          }}
                          className={cn(inputClass, "pr-10")}
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          {t.flow.currency}
                        </span>
                      </div>
                    </label>

                    {impact ? (
                      <p className="mt-4 rounded-2xl bg-secondary/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                        {impact}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="animate-in space-y-4">
                    <label className="block text-sm font-medium">
                      {t.flow.nameLabel}
                      <input
                        value={name}
                        maxLength={100}
                        disabled={anonymous}
                        placeholder={t.flow.namePlaceholder}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(inputClass, anonymous && "opacity-50")}
                      />
                    </label>
                    <label className="flex items-center gap-3 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        className="size-4 accent-[hsl(var(--primary))]"
                      />
                      {t.flow.anonymous}
                    </label>
                    <label className="block text-sm font-medium">
                      {t.flow.emailLabel}
                      <input
                        type="email"
                        value={email}
                        maxLength={255}
                        placeholder={t.flow.emailPlaceholder}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                      />
                    </label>
                    <label className="block text-sm font-medium">
                      {t.flow.messageLabel}
                      <textarea
                        value={message}
                        maxLength={500}
                        rows={5}
                        placeholder={t.flow.messagePlaceholder}
                        onChange={(e) => setMessage(e.target.value)}
                        className={cn(inputClass, "resize-none")}
                      />
                    </label>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t.flow.messageNote}</span>
                      <span>{message.length}/500</span>
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="animate-in">
                    <h2 className="text-2xl font-bold">{t.flow.review}</h2>
                    <dl className="mt-5 space-y-3 rounded-2xl bg-secondary/60 p-5 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">{t.flow.amountLabel}</dt>
                        <dd className="font-display text-lg font-bold">
                          {amount} {t.flow.currency}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">{t.flow.frequencyLabel}</dt>
                        <dd className="font-medium">{freqLabel}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">{t.flow.fromLabel}</dt>
                        <dd className="min-w-0 truncate font-medium">
                          {anonymous ? t.flow.anonymousName : name}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">{t.flow.messageReview}</dt>
                        <dd className="mt-1 whitespace-pre-line leading-relaxed">
                          {message.trim() || t.flow.noMessage}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                      {t.donate.transferNote}
                    </p>
                  </div>
                ) : null}
              </div>

              {errors.length > 0 ? (
                <ul className="mt-5 space-y-1 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  {errors.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setErrors([]);
                      setStep(step - 1);
                    }}
                    className="rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    {t.flow.back}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={step === 0 ? goStep1 : step === 1 ? goStep2 : confirm}
                  className="flex-1 rounded-full gradient-warm px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-1"
                >
                  {step === 2 ? t.flow.confirm : t.flow.next}
                </button>
              </div>

              <a
                href={`mailto:${links.email}?subject=${encodeURIComponent(t.donate.transfer)}`}
                className="mt-3 flex w-full items-center justify-center rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                {t.donate.transfer}
              </a>
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
            <Reveal delay={300}>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{t.donate.amountsNote}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}