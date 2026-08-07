import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "spotlight group h-full rounded-[1.75rem] border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
