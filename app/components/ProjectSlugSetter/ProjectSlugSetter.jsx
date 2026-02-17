'use client';

import { useEffect } from 'react';
import { useProjectSlug } from '../../context/ProjectSlugContext';

export default function ProjectSlugSetter({ projectSlug }) {
  const [, setProjectSlug] = useProjectSlug();

  useEffect(() => {
    setProjectSlug(projectSlug ?? null);
    return () => setProjectSlug(null);
  }, [projectSlug, setProjectSlug]);

  return null;
}
