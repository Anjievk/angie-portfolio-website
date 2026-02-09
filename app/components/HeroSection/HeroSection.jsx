'use client';

import { Fragment, useEffect, useState } from 'react';
import HeroIntroCard from '../HeroIntroCard/HeroIntroCard';
import './HeroSection.css';

const skills = ['UX/UI Design', 'Graphic Design', 'Branding Design', 'Digital Artist', 'Front-end Dev'];

function StarIcon({ className }) {
  return (
    <span className={className} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}

export default function HeroSection() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHasLoaded(true));
    });
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className={`relative flex flex-col items-center justify-center px-8 pt-16 pb-20 overflow-x-hidden overflow-y-visible min-h-[80vh] heroSectionReveal ${hasLoaded ? 'heroSectionReveal--visible' : ''}`}>
      {/* Header area - from top to Portfolio banner */}
      <div className="relative w-full">
      {/* Text Content - "Hi there! I'm" */}
      <div className="heroGreetingContainer">
        <p className="heroGreetingText">Hi there! I&apos;m</p>
      </div>

      {/* Name */}
      <div className="heroNameContainer">
        <h1 className="heroNameText">
          ANGIE<br></br> DUONG
        </h1>
      </div>

      </div>

      {/* Gradient shape + roller line */}
      <div className="heroPortfolioBanner">
        {/* 1. Curve block – banner image clipped to bell shape, gradient on top for tint */}
        <div className="heroPortfolioCurveBlock" aria-hidden="true">
          <svg className="heroPortfolioBellCurveSvg" viewBox="0 0 1564 433" fill="none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <clipPath id="heroBellClipPath">
                <path d="M61.6001 370.6C451.387 314.998 603.6 61.6 783.6 61.6C963.6 61.6 1154.22 351.998 1501.6 370.6H61.6001Z" />
              </clipPath>
              <filter id="heroBellFilter" x="0" y="0" width="1563.2" height="432.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="30.8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_480_356" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_480_356" result="shape" />
              </filter>
              <linearGradient id="heroBellGradient" x1="61.6001" y1="216.1" x2="1501.6" y2="216.1" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--gradient-accent-start)" />
                <stop offset="0.365385" stopColor="#CD51C5" />
                <stop offset="1" stopColor="var(--gradient-accent-end)" />
              </linearGradient>
            </defs>
            {/* Gradient shape (behind the image) + shadow */}
            <g filter="url(#heroBellFilter)">
              <path
                d="M61.6001 370.6C451.387 314.998 603.6 61.6 783.6 61.6C963.6 61.6 1154.22 351.998 1501.6 370.6H61.6001Z"
                fill="url(#heroBellGradient)"
                
              />
            </g>
            {/* Banner image clipped to bell shape – rendered ABOVE the gradient */}
            <image
              href="/Banner-image.png"
              x="420"
              y="-250"
              width="700"
              height="700"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#heroBellClipPath)"
            />
          </svg>
        </div>
        {/* 2. Dark bar – below the wave, contains only the skill labels */}
        <div className="heroPortfolioDarkBar">
          <div className="heroPortfolioScrollContainer">
            <div className="heroPortfolioInnerContainer">
              {[1, 2, 3, 4].flatMap((copy) =>
                skills.map((text, i) => (
                  <Fragment key={`${copy}-${i}`}>
                    <span className="heroPortfolioText">{text}</span>
                    <StarIcon className="heroPortfolioStar" />
                  </Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <HeroIntroCard />
    </section>
  );
}
