'use client';

import { createContext, useContext, useState } from 'react';

const ProjectSlugContext = createContext([null, () => {}]);

export function ProjectSlugProvider({ children }) {
  const [projectSlug, setProjectSlug] = useState(null);
  return (
    <ProjectSlugContext.Provider value={[projectSlug, setProjectSlug]}>
      {children}
    </ProjectSlugContext.Provider>
  );
}

export function useProjectSlug() {
  return useContext(ProjectSlugContext);
}
