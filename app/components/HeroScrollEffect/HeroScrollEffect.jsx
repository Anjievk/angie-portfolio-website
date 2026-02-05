'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Ties the hero section to scroll: subtle parallax and opacity as user scrolls.
 * Requires #header-section and .heroSectionReveal in the DOM.
 */
export default function HeroScrollEffect() {
  useEffect(() => {
    const header = document.querySelector('#header-section');
    const hero = document.querySelector('.heroSectionReveal');
    if (!header || !hero) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          trigger: header,
          start: 'top top',
          end: 'bottom top',
        },
      })
        .to(hero, { y: -60, opacity: 0.6, ease: 'none' }, 0);
    }, header);

    return () => ctx.revert();
  }, []);

  return null;
}
