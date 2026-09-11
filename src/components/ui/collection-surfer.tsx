"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

export interface CollectionItem {
  id: number;
  image: string;
  title: string;
}

export type CollectionSurferVariant = "magnetic" | "uplift" | "simple";

interface CollectionSurferProps {
  items: CollectionItem[];
  variant?: CollectionSurferVariant;
  eyebrow?: string;
  label?: string;
  hint?: string;
}

const stepX = 240;
const stepY = -84;
const stepZ = -288;

export function CollectionSurfer({
  items,
  variant = "magnetic",
  eyebrow = "GALERIE",
  label = "COLLECTION",
  hint = "scroll",
}: CollectionSurferProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  const span = Math.max(items.length - 2, 1);
  const x = useTransform(smooth, [0, 1], [stepX, -span * stepX]);
  const y = useTransform(smooth, [0, 1], [stepY, -span * stepY]);
  const z = useTransform(smooth, [0, 1], [stepZ, -span * stepZ]);

  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant === "simple") return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(-10000);
    mouseY.set(-10000);
  };

  return (
    <div ref={sectionRef} style={{ height: `${items.length * 60}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground text-primary-foreground">
        <div
          aria-hidden
          className="float-slow pointer-events-none absolute -left-24 top-1/3 size-96 rounded-full gradient-warm opacity-20 blur-3xl"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-5 pt-28 lg:px-10">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary-foreground/70">
            <span aria-hidden className="h-px w-10 gradient-warm" />
            {eyebrow}
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary-foreground/70">
            {label} <span className="text-primary">({items.length})</span>
          </p>
        </div>

        <p className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.34em] text-primary-foreground/60">
          {hint}
        </p>

        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="relative"
            style={{ x, y, z, transformStyle: "preserve-3d" }}
          >
            {items.map((item, i) => (
              <Card
                key={`${item.id}-${i}`}
                item={item}
                i={i}
                count={items.length}
                mouseX={mouseX}
                mouseY={mouseY}
                scrollSpring={smooth}
                variant={variant}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Card({
  item,
  i,
  count,
  mouseX,
  mouseY,
  scrollSpring,
  variant,
}: {
  item: CollectionItem;
  i: number;
  count: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollSpring: MotionValue<number>;
  variant: CollectionSurferVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform<number, number>(
    [mouseX, mouseY, scrollSpring],
    ([mx, my]: number[]) => {
      if (!ref.current || variant === "simple") return 400;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return Math.sqrt(Math.pow((mx ?? 0) - cx, 2) + Math.pow((my ?? 0) - cy, 2));
    },
  );

  const targetScale = useTransform(distance, [0, 400], [1.35, 1]);
  const springScale = useSpring(targetScale, { mass: 0.5, stiffness: 300, damping: 20 });

  const targetUplift = useTransform(distance, [0, 400], [-80, 0]);
  const springUplift = useSpring(targetUplift, { mass: 0.5, stiffness: 300, damping: 20 });

  const transform = useTransform<number, string>(
    [springScale, springUplift],
    ([s, u]: number[]) => {
      const scaleValue = variant === "magnetic" ? Number(s) : 1;
      const upliftValue = variant === "uplift" ? Number(u) : 0;
      return `translate3d(${i * stepX}px, ${i * stepY + upliftValue}px, ${i * stepZ}px) rotateY(-50deg) scale(${scaleValue})`;
    },
  );

  return (
    <motion.div
      ref={ref}
      className="group absolute left-0 top-0 h-[340px] w-[250px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] shadow-lift lg:h-[420px] lg:w-[310px]"
      style={{ transform, transformStyle: "preserve-3d" }}
    >
      <span className="absolute left-4 top-4 z-10 font-display text-xs font-bold tracking-[0.2em] text-primary-foreground/80">
        {String((i % count) + 1).padStart(2, "0")}
      </span>
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        width={800}
        height={1000}
        className="size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent"
      />
      <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground">
        {item.title}
      </p>
    </motion.div>
  );
}

export default CollectionSurfer;
