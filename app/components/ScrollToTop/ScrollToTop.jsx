'use client';

import { useState, useEffect } from 'react';
import { useProjectSlug } from '../../context/ProjectSlugContext';
import './ScrollToTop.css';

const SCROLL_THRESHOLD = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [projectSlug] = useProjectSlug();
  const isTeatiny = projectSlug === 'teatiny';

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
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''} ${isTeatiny ? 'scroll-to-top--teatiny' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!visible}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
