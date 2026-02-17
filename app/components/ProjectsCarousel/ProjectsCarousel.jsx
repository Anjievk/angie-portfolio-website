'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './ProjectsCarousel.css';

const projects = [
  { id: 1, category: 'App design & development', title: 'Tandem', description: 'An app for parents in the trades that helps balance work and childcare', image: '/Recent-project/recent project Tandem.jpg', projectSlug: 'Tandem' },
  { id: 2, category: 'Product Design', title: 'TeaTiny', description: 'Premium flower tea can series with playful character illustrations', image: '/Recent-project/Teatiny-can.jpg', projectSlug: 'teatiny' },
  { id: 3, category: 'Magazine Design', title: 'The Unseen Vietnam', description: 'Explore Vietnam in a unique way', image: '/Recent-project/vietnamese magazine mock up.jpg', projectSlug: null },
  { id: 4, category: 'Branding', title: 'Crimson & Gold', description: 'Brand identity and visual design system', image: '/Recent-project/Crimpson&gold.jpg', projectSlug: null },
  { id: 5, category: 'UI/UX', title: 'Space Animal', description: 'User experience and visual design', image: '/Recent-project/Space-animal.jpg', projectSlug: null },
];

function useCarouselLayout() {
  const [cardWidth, setCardWidth] = useState(340);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
      if (w < 640) {
        setCardWidth(280);
        setIsMobile(true);
      } else if (w < 768) {
        setCardWidth(300);
        setIsMobile(true);
      } else {
        setCardWidth(340);
        setIsMobile(false);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { cardWidth, isMobile };
}

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cardWidth } = useCarouselLayout();

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="projectsCarouselSection">
      <div className="projectsCarouselContainer">
        {/* Section Title */}
        <ScrollReveal animation="fadeUp" delay={0}>
          <div className="projectsCarouselTitleContainer">
            <h2 className="projectsCarouselTitle">
              <span className="projectsCarouselTitleGradient">
                Recent Projects
              </span>
            </h2>
            <p className="projectsCarouselSubtitle">
              Featured Work: See What I've Built Lately
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal animation="fadeUp" delay={120}>
        <div className="projectsCarouselInner">
          {/* Project Cards – circular loop: always 3 slots (prev, current, next) */}
          <div className="projectsCarouselCardsContainer">
            {[-1, 0, 1].map((offset) => {
              const projectIndex = (currentIndex + offset + projects.length) % projects.length;
              const project = projects[projectIndex];
              const isActive = offset === 0;

              const scale = isActive ? 1 : 0.78;
              const opacity = isActive ? 1 : 0.85;
              const translateX = offset * cardWidth;

              const maskClass = isActive
                ? 'projectsCarouselCardMaskNone'
                : offset < 0
                  ? 'projectsCarouselCardMaskLeft'
                  : 'projectsCarouselCardMaskRight';

              return (
                <div
                  key={project.id}
                  className="projectsCarouselCard"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity,
                    zIndex: isActive ? 10 : 5,
                  }}
                >
                  <div
                    className={`projectsCarouselCardItem ${maskClass} ${
                      isActive
                        ? 'projectsCarouselCardActive'
                        : offset < 0
                          ? 'projectsCarouselCardInactiveLeft'
                          : 'projectsCarouselCardInactiveRight'
                    }`}
                  >
                    {isActive && (
                      <div className="projectsCarouselCardActiveInner">
                        {project.image ? (
                          <>
                            <Link
                              href={project.projectSlug ? `/projects/${project.projectSlug}` : '/projects'}
                              className="projectsCarouselCardImageWrap projectsCarouselCardImageLink"
                              aria-label={`View project: ${project.title}`}
                            >
                              <img
                                src={project.image}
                                alt=""
                                className="projectsCarouselCardImage"
                              />
                              <span className="projectsCarouselViewProjectOverlay">
                                <span className="projectsCarouselOverlayHeadline">
                                  {project.category} – {project.title}
                                </span>
                                <span className="projectsCarouselOverlayButton">
                                  View Project
                                </span>
                              </span>
                            </Link>
                          </>
                        ) : (
                          <>
                            <span className="projectsCarouselCardHeadline">
                              {project.category} – {project.title}
                            </span>
                            <div className="projectsCarouselCardPlaceholder" />
                          </>
                        )}
                      </div>
                    )}
                    {!isActive && offset > 0 && (
                      <>
                        {project.image ? (
                          <div className="projectsCarouselCardNextImageWrap">
                            <img
                              src={project.image}
                              alt=""
                              className="projectsCarouselCardNextImage"
                            />
                          </div>
                        ) : (
                          <div className="projectsCarouselCardStacked">
                            <div className="projectsCarouselCardStackedBox" />
                            <div className="projectsCarouselCardStackedBox" />
                            <div className="projectsCarouselCardStackedBox" />
                          </div>
                        )}
                      </>
                    )}
                    {!isActive && offset < 0 && project.image && (
                      <div className="projectsCarouselCardPrevImageWrap">
                        <img
                          src={project.image}
                          alt=""
                          className="projectsCarouselCardPrevImage"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom row: project details left, nav + VIEW ALL right */}
          <div className="projectsCarouselBottomRow">
            <div className="projectsCarouselDetailsContainer">
              <div className="projectsCarouselCategory">
                {currentProject.category}
              </div>
              <h3 className="projectsCarouselProjectTitle">
                {currentProject.title}
              </h3>
              <p className="projectsCarouselProjectDescription">
                {currentProject.description}
              </p>
            </div>
            <div className="projectsCarouselControls">
              <div className="projectsCarouselSliderPill">
                <button
                  onClick={goToPrevious}
                  className="projectsCarouselArrowButton"
                  aria-label="Previous project"
                >
                  <svg className="projectsCarouselArrowIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="projectsCarouselPageIndicator">
                  {currentIndex + 1} / {projects.length}
                </span>
                <button
                  onClick={goToNext}
                  className="projectsCarouselArrowButton"
                  aria-label="Next project"
                >
                  <svg className="projectsCarouselArrowIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <a href="/projects" className="projectsCarouselViewAllButton">
                VIEW ALL
              </a>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
