'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

const ProjectImageExpandContext = createContext(null);

export function useProjectImageExpand() {
  return useContext(ProjectImageExpandContext);
}

export function ProjectImageExpandProvider({ children }) {
  const [expandedImage, setExpandedImage] = useState(null);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const check = () => setIsPhone(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (expandedImage) {
      document.body.style.overflow = 'hidden';
      const onEscape = (e) => { if (e.key === 'Escape') setExpandedImage(null); };
      window.addEventListener('keydown', onEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onEscape);
      };
    }
    return () => { document.body.style.overflow = ''; };
  }, [expandedImage]);

  return (
    <ProjectImageExpandContext.Provider value={{ expandedImage, setExpandedImage, isPhone }}>
      {children}
      {expandedImage && typeof document !== 'undefined' && createPortal(
        <div
          className="progressPersonaExpandOverlay"
          onClick={() => setExpandedImage(null)}
          role="button"
          tabIndex={0}
          aria-label="Close expanded image"
        >
          <div className="progressPersonaExpandContent" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="progressPersonaExpandClose"
              onClick={() => setExpandedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={expandedImage}
              alt="Expanded view"
              width={1200}
              height={1200}
              className="progressPersonaExpandImage"
            />
          </div>
        </div>,
        document.body
      )}
    </ProjectImageExpandContext.Provider>
  );
}
