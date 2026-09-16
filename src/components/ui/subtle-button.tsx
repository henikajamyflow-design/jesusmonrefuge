import { Link } from "@tanstack/react-router";
import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type DonateButtonProps = {
  children: ReactNode;
  /** Extra classes for the inner link (padding, visibility, radius tweaks). */
  className?: string;
  /** "solid" = gradient fill, "outline" = card-style bordered button. */
  variant?: "solid" | "outline";
  fullWidth?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Donation call-to-action with the "subtle button" treatment:
 * soft outer glow, rotating conic border on hover, animated dot
 * with ripple, and a pressed state — while remaining a real link
 * to the donation page.
 */
export function DonateButton({
  children,
  className,
  variant = "solid",
  fullWidth = false,
  onClick,
}: DonateButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <span
      className={cn("relative inline-flex", fullWidth && "w-full")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {/* Subtle glow effect */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-1.5 rounded-full gradient-warm blur-lg transition-opacity duration-500",
          hovered ? "opacity-50" : "opacity-0",
        )}
      />

      <Link
        to="/don"
        onClick={onClick}
        className={cn(
          "group relative inline-flex items-center gap-2.5 rounded-full text-sm font-semibold transition-all duration-300",
          pressed ? "translate-y-0 scale-[0.97]" : hovered ? "-translate-y-0.5" : "",
          variant === "solid"
            ? "gradient-warm text-primary-foreground shadow-lift"
            : "border border-border bg-card text-primary",
          fullWidth && "w-full justify-center",
          className,
        )}
      >
        {/* Hover state border animation: rotating conic ring */}
        <span
          aria-hidden
          className={cn(
            "border-spin pointer-events-none absolute -inset-px rounded-full p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            "[background:conic-gradient(from_var(--angle),transparent_0deg,oklch(0.93_0.07_85)_55deg,transparent_115deg,transparent_360deg)]",
            "[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]",
          )}
        />

        {/* Shine sweep (solid variant only) */}
        {variant === "solid" && (
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full rounded-full bg-primary-foreground/25 transition-transform duration-700 group-hover:translate-x-full"
          />
        )}

        <span className="relative z-10">{children}</span>

        {/* Animated dot with ripple */}
        <span
          aria-hidden
          className={cn(
            "relative z-10 flex size-1.5 transition-opacity duration-500",
            hovered ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      </Link>
    </span>
  );
}
