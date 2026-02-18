'use client';

import { useState, useEffect } from 'react';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
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
          <MaterialIcon icon="construction" size={48} />
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
