'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

const ANIMATION_PROPS = {
  fadeUp: { y: 32, opacity: 0 },
  fade: { opacity: 0 },
  fadeLeft: { x: -32, opacity: 0 },
  fadeRight: { x: 32, opacity: 0 },
  scale: { scale: 0.95, opacity: 0 },
};

/**
 * Wraps content and reveals it with GSAP ScrollTrigger when it scrolls into view.
 * @param {React.ReactNode} children - Content to reveal
 * @param {string} [className] - Additional CSS class
 * @param {number} [delay=0] - Stagger delay in ms
 * @param {number} [threshold=0.1] - When to trigger (0–1); 0.1 = start when ~10% visible
 * @param {string} [animation='fadeUp'] - 'fadeUp' | 'fade' | 'fadeLeft' | 'fadeRight' | 'scale'
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  animation = 'fadeUp',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromProps = ANIMATION_PROPS[animation] ?? ANIMATION_PROPS.fadeUp;
    const startPosition = `${(1 - threshold) * 100}%`;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { ...fromProps },
        {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: delay / 1000,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: `top ${startPosition}`,
            end: 'bottom 20%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [animation, delay, threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${animation} ${className}`}
    >
      {children}
    </div>
  );
}
