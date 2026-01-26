'use client';

import { useState } from 'react';
import './ProjectsCarousel.css';

const projects = [
  { id: 1, category: 'APP DESIGN', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { id: 2, category: 'WEB DESIGN', title: 'Project Two', description: 'A beautiful web application with modern UI/UX design' },
  { id: 3, category: 'MOBILE APP', title: 'Project Three', description: 'Mobile-first design for iOS and Android platforms' },
  { id: 4, category: 'BRANDING', title: 'Project Four', description: 'Complete brand identity and visual design system' },
  { id: 5, category: 'UI/UX', title: 'Project Five', description: 'User experience design for enterprise application' },
];

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

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
        <div className="projectsCarouselTitleContainer">
          <h2 className="projectsCarouselTitle">
            <span className="projectsCarouselTitleGradient">
              Recent Projects
            </span>
          </h2>
          <p className="projectsCarouselSubtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Carousel Controls Row */}
          <div className="projectsCarouselControls">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="projectsCarouselArrowButton"
              aria-label="Previous project"
            >
              <svg className="projectsCarouselArrowIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Indicator */}
            <span className="projectsCarouselPageIndicator">
              {currentIndex + 1}/{projects.length}
            </span>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="projectsCarouselArrowButton"
              aria-label="Next project"
            >
              <svg className="projectsCarouselArrowIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* View All Button */}
            <a
              href="/projects"
              className="projectsCarouselViewAllButton"
            >
              VIEW ALL
            </a>
          </div>

          {/* Project Cards Container */}
          <div className="projectsCarouselCardsContainer">
            {projects.map((project, index) => {
              const offset = index - currentIndex;
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              if (!isVisible) return null;

              const scale = isActive ? 1 : 0.85;
              const opacity = isActive ? 1 : 0.3;
              const translateX = offset * 120;

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
                        : 'projectsCarouselCardInactive'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Project Details */}
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
        </div>
      </div>
    </section>
  );
}
