'use client';

import { useState, useEffect } from 'react';
import './UnderConstruction.css';

const STORAGE_KEY = 'portfolio-under-construction-dismissed';

export default function UnderConstruction() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  function handleClose() {
    setVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }

  if (!visible) return null;

  return (
    <div className="under-construction" role="dialog" aria-labelledby="under-construction-title" aria-modal="true">
      <div className="under-construction__backdrop" onClick={handleClose} aria-hidden="true" />
      <div className="under-construction__card">
        <div className="under-construction__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M24 24v20M24 24L6 14M24 24l18-10M24 4v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </svg>
        </div>
        <h2 id="under-construction-title" className="under-construction__title">
          Under construction
        </h2>
        <p className="under-construction__text">
          This portfolio is still being updated. Thanks for visiting — check back soon for more work and updates.
        </p>
        <button
          type="button"
          className="under-construction__btn"
          onClick={handleClose}
          aria-label="Close and continue to site"
        >
          Continue to site
        </button>
        <button
          type="button"
          className="under-construction__close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
