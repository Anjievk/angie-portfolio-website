'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Registers GSAP ScrollTrigger once for the app.
 * Renders nothing; include in layout so scroll plugins work everywhere.
 * Also resets scroll to top on full page load/refresh.
 */
export default function GSAPInit() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
