'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Ties the project hero section to scroll: subtle parallax and opacity as user scrolls.
 * Requires .projectHeroSection and .projectHeroSectionReveal in the DOM (hero layout pages).
 */
export default function ProjectHeroScrollEffect() {
  useEffect(() => {
    const section = document.querySelector('.projectHeroSection');
    const reveal = document.querySelector('.projectHeroSectionReveal');
    if (!section || !reveal) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        reveal,
        { y: 0, opacity: 1 },
        {
          y: -60,
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: {
            scrub: 1,
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            onUpdate: (self) => {
              if (self.progress <= 0.001) {
                gsap.set(reveal, { y: 0, opacity: 1 });
              }
            },
          },
        }
      );
    }, section);

    if (typeof window !== 'undefined' && window.scrollY < 10) {
      gsap.set(reveal, { y: 0, opacity: 1 });
    }

    const onScroll = () => {
      if (window.scrollY < 50) {
        gsap.set(reveal, { y: 0, opacity: 1 });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const refreshId = setTimeout(() => {
      ScrollTrigger.refresh();
      if (typeof window !== 'undefined' && window.scrollY < 50) {
        gsap.set(reveal, { y: 0, opacity: 1 });
      }
    }, 150);

    return () => {
      clearTimeout(refreshId);
      window.removeEventListener('scroll', onScroll);
      ctx.revert();
    };
  }, []);

  return null;
}
