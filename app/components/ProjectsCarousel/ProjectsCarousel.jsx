'use client';

import { useState } from 'react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './ProjectsCarousel.css';

const projects = [
  { id: 1, category: 'App design & development', title: 'Tandem', description: 'An app for parents in the trades that helps balance work and childcare', image: '/Tandem/recent project Tandem.jpg' },
  { id: 2, category: 'App design & development', title: 'Tandem', description: 'A beautiful web application with modern UI/UX design', image: '/Tandem/tandem.jpg' },
  { id: 3, category: 'Magazine Design', title: 'The Unseen Vietnam', description: 'Explore Vietnam in a unique way', image: '/vietnamese%20magazine%20mock%20up.jpg' },
  { id: 4, category: 'BRANDING', title: 'Project Four', description: 'Complete brand identity and visual design system', image: '/vietnamese%20magazine%20mock%20up.jpg' },
  { id: 5, category: 'UI/UX', title: 'Project Five', description: 'User experience design for enterprise application', image: '/vietnamese%20magazine%20mock%20up.jpg' },
];

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
              const translateX = offset * 340;

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
                            <div className="projectsCarouselCardImageWrap">
                              <img
                                src={project.image}
                                alt=""
                                className="projectsCarouselCardImage"
                              />
                            </div>
                            <span className="projectsCarouselCardHeadline projectsCarouselCardHeadlineOverlay">
                              {project.category} – {project.title}
                            </span>
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
