import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DonationSlide {
  amount: number;
  image: string;
  title: string;
  description: string;
  badge: string;
}

interface CarouselConfig {
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return { xMultiplier: 68, yMultiplier: 18, rotationMultiplier: 7, scaleReduction: 0.08 };
  }
  if (width < 1024) {
    return { xMultiplier: 104, yMultiplier: 26, rotationMultiplier: 9, scaleReduction: 0.1 };
  }
  return { xMultiplier: 132, yMultiplier: 32, rotationMultiplier: 10, scaleReduction: 0.11 };
};

interface DonationAmountCarouselProps {
  slides: DonationSlide[];
  value: number | null;
  onValueChange: (amount: number) => void;
  currency: string;
  hint: string;
  previousLabel: string;
  nextLabel: string;
  selectedLabel: string;
  className?: string;
}

export function DonationAmountCarousel({
  slides,
  value,
  onValueChange,
  currency,
  hint,
  previousLabel,
  nextLabel,
  selectedLabel,
  className,
}: DonationAmountCarouselProps) {
  const selectedIndex = Math.max(0, slides.findIndex((slide) => slide.amount === value));
  const progress = useMotionValue(selectedIndex);
  const dragStart = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(1024);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  React.useEffect(() => {
    if (selectedIndex < 0) return;
    const controls = animate(progress, selectedIndex, {
      type: reduceMotion ? "tween" : "spring",
      duration: reduceMotion ? 0 : undefined,
      stiffness: 220,
      damping: 28,
    });
    return () => controls.stop();
  }, [progress, reduceMotion, selectedIndex]);

  const config = React.useMemo(() => getCarouselConfig(windowWidth), [windowWidth]);
  const total = slides.length;

  const selectIndex = React.useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      const normalized = ((nextIndex % total) + total) % total;
      const slide = slides[normalized];
      if (!slide) return;
      onValueChange(slide.amount);
      animate(progress, normalized, {
        type: reduceMotion ? "tween" : "spring",
        duration: reduceMotion ? 0 : undefined,
        stiffness: 220,
        damping: 28,
      });
    },
    [onValueChange, progress, reduceMotion, slides, total],
  );

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shift = Math.round(-info.offset.x / 130 - info.velocity.x / 900);
    const limitedShift = Math.max(-2, Math.min(2, shift));
    selectIndex(Math.round(dragStart.current) + limitedShift);
  };

  if (total === 0) return null;

  return (
    <div className={cn("relative", className)} aria-label={hint}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{hint}</p>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label={previousLabel}
            onClick={() => selectIndex(selectedIndex - 1)}
          >
            <ArrowLeft aria-hidden />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label={nextLabel}
            onClick={() => selectIndex(selectedIndex + 1)}
          >
            <ArrowRight aria-hidden />
          </Button>
        </div>
      </div>

      <motion.div
        className="relative h-[390px] touch-pan-y overflow-hidden rounded-2xl bg-secondary/35 sm:h-[430px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragStart={() => {
          dragStart.current = progress.get();
        }}
        onDrag={(_, info) => {
          progress.set(dragStart.current - info.offset.x / (windowWidth < 640 ? 150 : 210));
        }}
        onDragEnd={handleDragEnd}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-secondary/80 to-transparent" />
        {slides.map((slide, index) => (
          <DonationCard
            key={slide.amount}
            slide={slide}
            index={index}
            total={total}
            progress={progress}
            config={config}
            selected={value === slide.amount}
            selectedLabel={selectedLabel}
            currency={currency}
            onSelect={() => selectIndex(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}

interface DonationCardProps {
  slide: DonationSlide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  selected: boolean;
  selectedLabel: string;
  currency: string;
  onSelect: () => void;
}

function DonationCard({
  slide,
  index,
  total,
  progress,
  config,
  selected,
  selectedLabel,
  currency,
  onSelect,
}: DonationCardProps) {
  const offset = useTransform(progress, (position) => {
    let difference = (index - position) % total;
    if (difference > total / 2) difference -= total;
    if (difference < -total / 2) difference += total;
    return difference;
  });
  const x = useTransform(offset, (value) => value * config.xMultiplier);
  const y = useTransform(offset, (value) => Math.abs(value) * config.yMultiplier);
  const rotate = useTransform(offset, (value) => (Math.abs(value) < 0.05 ? 0 : value * config.rotationMultiplier));
  const scale = useTransform(offset, (value) => 1 - Math.abs(value) * config.scaleReduction);
  const opacity = useTransform(offset, (value) => (Math.abs(value) > total / 2 - 0.1 ? 0 : 1));
  const zIndex = useTransform(offset, (value) => Math.round(50 - Math.abs(value) * 10));

  return (
    <motion.button
      type="button"
      aria-label={`${slide.amount} ${currency} — ${slide.description}`}
      aria-pressed={selected}
      onClick={onSelect}
      style={{ x, y, rotate, scale, opacity, zIndex }}
      className={cn(
        "absolute inset-x-0 top-4 mx-auto h-[350px] w-[min(76vw,250px)] cursor-pointer overflow-hidden rounded-2xl border bg-card text-left shadow-lift outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:top-5 sm:h-[390px] sm:w-[280px]",
        selected ? "border-primary" : "border-border",
      )}
    >
      <img
        src={slide.image}
        alt=""
        draggable={false}
        width={800}
        height={1000}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
        <Badge className="bg-card/90 text-card-foreground backdrop-blur">{slide.badge}</Badge>
        {selected ? (
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft" title={selectedLabel}>
            <Check className="size-4" aria-hidden />
            <span className="sr-only">{selectedLabel}</span>
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <p className="font-display text-4xl font-bold">
          {slide.amount} {currency}
        </p>
        <h3 className="mt-2 text-xl font-semibold">{slide.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-primary-foreground/85">{slide.description}</p>
      </div>
    </motion.button>
  );
}

export default DonationAmountCarousel;