export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border bg-foreground py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-foreground to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-foreground to-transparent"
      />
      <div className="marquee-track flex w-max items-center gap-10">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.24em] text-background/85">
              {item}
            </span>
            <span aria-hidden className="size-1.5 shrink-0 rounded-full gradient-warm" />
          </span>
        ))}
      </div>
    </div>
  );
}
