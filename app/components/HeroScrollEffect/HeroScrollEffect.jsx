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
      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          trigger: header,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            // Khi scroll về top (progress = 0), luôn ép hero visible để tránh bị mất sau refresh + scroll restoration
            if (self.progress <= 0.001) {
              gsap.set(hero, { y: 0, opacity: 1 });
            }
          },
        },
      });
      tl.fromTo(hero, { y: 0, opacity: 1 }, { y: -60, opacity: 0.6, ease: 'none' }, 0);
    }, header);

    // Nếu đang ở top khi setup, ép hero visible ngay
    if (typeof window !== 'undefined' && window.scrollY < 10) {
      gsap.set(hero, { y: 0, opacity: 1 });
    }

    // Khi user scroll về gần top, luôn ép hero visible (fix refresh rồi scroll lên bị mất)
    const onScroll = () => {
      if (window.scrollY < 50) {
        gsap.set(hero, { y: 0, opacity: 1 });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Sau khi load (kể cả khi browser restore scroll), refresh ScrollTrigger và đảm bảo hero visible khi ở top
    const refreshId = setTimeout(() => {
      ScrollTrigger.refresh();
      if (typeof window !== 'undefined' && window.scrollY < 50) {
        gsap.set(hero, { y: 0, opacity: 1 });
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
