'use client';

import { useEffect } from 'react';

/**
 * Scrolls to top when the component mounts.
 * Use on project detail pages so navigation from carousel/homepage lands at the top,
 * showing the project name and banner first.
 */
export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
