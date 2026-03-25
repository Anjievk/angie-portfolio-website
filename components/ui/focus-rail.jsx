'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react'; //icon library
import { cn } from '@/lib/utils';
import './focus-rail.css';

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

const CARD_OFFSETS = [-2, -1, 0, 1, 2];
const DRAG_THRESHOLD = 80;

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}) {
  const [active, setActive] = useState(initialIndex);
  const [isHovering, setIsHovering] = useState(false);
  const count = items.length;

  const goPrev = useCallback(() => {
    setActive((p) => (loop ? wrapIndex(p - 1, count) : Math.max(0, p - 1)));
  }, [loop, count]);

  const goNext = useCallback(() => {
    setActive((p) => (loop ? wrapIndex(p + 1, count) : Math.min(count - 1, p + 1)));
  }, [loop, count]);

  // for this loop, if true after the last card, it will go back to the first (and the other way around)

  useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, goNext, interval]);

  //interval, move to the next card every few seconds but while the mouse is hovering over the carousel, the autoplay will pause

  const onDragEnd = (_, info) => {
    if (info.offset.x < -DRAG_THRESHOLD) goNext();
    else if (info.offset.x > DRAG_THRESHOLD) goPrev();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  const transition = { type: 'tween', duration: 0.35 };
  //animation

  return (
    <div
      className={cn(
        'focusRailRoot',
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="focusRailInner">
        <motion.div
          className="focusRailViewport"
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


          //3D look of the carousel
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
                  'focusRailCard',
                  isCenter ? 'focusRailCardCenter' : 'focusRailCardSide'
                )}
                initial={false}
                animate={animate}
                transition={transition}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => !isCenter && setActive((p) => p + offset)}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="focusRailCardImage"
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
