"use client";

import * as React from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./focus-rail.css";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

const CARD_OFFSETS = [-2, -1, 0, 1, 2] as const;
const DRAG_THRESHOLD = 80;

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const count = items.length;

  const goPrev = React.useCallback(() => {
    setActive((p) => (loop ? wrapIndex(p - 1, count) : Math.max(0, p - 1)));
  }, [loop, count]);

  const goNext = React.useCallback(() => {
    setActive((p) => (loop ? wrapIndex(p + 1, count) : Math.min(count - 1, p + 1)));
  }, [loop, count]);

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, goNext, interval]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -DRAG_THRESHOLD) goNext();
    else if (info.offset.x > DRAG_THRESHOLD) goPrev();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  const transition = { type: "tween" as const, duration: 0.35 };

  return (
    <div
      className={cn(
        "group relative flex h-[480px] w-full flex-col overflow-visible bg-transparent text-white outline-none select-none",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center w-full px-4 md:px-8">
        <motion.div
          className="relative flex h-[360px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {CARD_OFFSETS.map((offset) => {
            const index = loop ? wrapIndex(active + offset, count) : active + offset;
            if (!loop && (index < 0 || index >= count)) return null;

            const item = items[index];
            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            const animate = {
              x: offset * 280,
              y: isCenter ? 0 : -dist * 55,
              z: -dist * 180,
              scale: isCenter ? 1 : 0.7,
              rotateY: offset * -20,
              opacity: isCenter ? 1 : Math.max(0.5, 1 - dist * 0.25),
              filter: `blur(${dist * 3}px) brightness(${isCenter ? 1 : Math.max(0.65, 1 - dist * 0.2)})`,
            };

            return (
              <motion.div
                key={`${offset}-${item.id}`}
                className={cn(
                  "absolute aspect-[3/4] w-[260px] md:w-[300px] rounded-2xl overflow-hidden",
                  isCenter ? "z-20" : "z-10"
                )}
                initial={false}
                animate={animate}
                transition={transition}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => !isCenter && setActive((p) => p + offset)}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full object-cover pointer-events-none"
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="focusRailArrowControls">
          <button type="button" onClick={goPrev} className="focusRailArrowBtn" aria-label="Previous">
            <ChevronLeft strokeWidth={2.5} />
          </button>
          <button type="button" onClick={goNext} className="focusRailArrowBtn" aria-label="Next">
            <ChevronRight strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
