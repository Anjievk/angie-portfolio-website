'use client';

import { useState, useEffect } from 'react';
import { useProjectSlug } from '../../context/ProjectSlugContext';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import './ScrollToTop.css';

const SCROLL_THRESHOLD = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [projectSlug] = useProjectSlug();
  const isTeatiny = projectSlug === 'teatiny';
  const isVietnam = projectSlug === 'the-unseen-vietnam';
  const isCrimsonGold = projectSlug === 'crimson-gold';

  useEffect(() => {
    function handleScroll() {
      setVisible(typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''} ${isTeatiny ? 'scroll-to-top--teatiny' : ''} ${isVietnam ? 'scroll-to-top--the-unseen-vietnam' : ''} ${isCrimsonGold ? 'scroll-to-top--crimson-gold' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!visible}
    >
      <MaterialIcon icon="keyboard_arrow_up" size={24} />
    </button>
  );
}
