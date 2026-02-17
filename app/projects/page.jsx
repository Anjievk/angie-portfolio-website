'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import { CATEGORIES, RECENT_PROJECTS } from '../data/projects';
import '../styles/page.css';
import '../styles/projects.css';
import { useState, useMemo } from 'react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return RECENT_PROJECTS;
    return RECENT_PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <section className="projectsSection">
        <div className="projectsContainer">
          <h1 className="projectsTitle">
            <span className="projectsTitleGradient">Recent Projects</span>
          </h1>
          <div className="projectsFilters" role="tablist" aria-label="Project categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat.id}
                className={`projectsFilterBtn ${activeFilter === cat.id ? 'projectsFilterBtnActive' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="projectsGrid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="projectCard">
                <div className="projectCardImageWrap">
                  <div className="projectCardImageInner">
                    <Image
                      src={project.image}
                      alt=""
                      width={400}
                      height={225}
                      className="projectCardImage"
                    />
                  </div>
                </div>
                <div className="projectCardContent">
                  <h3 className="projectCardTitle">{project.title}</h3>
                  <div className="projectCardTags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="projectCardTag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="projectCardButtonWrap">
                    {project.projectSlug ? (
                      <Link href={`/projects/${project.projectSlug}`} className="projectCardButton">
                        View Project
                      </Link>
                    ) : (
                      <span className="projectCardButton projectCardButtonComingSoon" aria-disabled="true">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
