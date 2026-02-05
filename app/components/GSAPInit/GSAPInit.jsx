'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Registers GSAP ScrollTrigger once for the app.
 * Renders nothing; include in layout so scroll plugins work everywhere.
 */
export default function GSAPInit() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  return null;
}
