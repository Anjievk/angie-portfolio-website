'use client';

import Image from 'next/image';
import Link from 'next/link';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-8 pt-32 pb-20 overflow-hidden min-h-[80vh]">
      {/* Header area - from top to Portfolio banner */}
      <div className="relative w-full">
      {/* Text Content - "Hi there! I'm" */}
      <div className="heroGreetingContainer">
        <p className="heroGreetingText">Hi there! I&apos;m</p>
      </div>

      {/* Name with Gradient Wave Behind - under the picture */}
      <div className="heroNameContainer">
        {/* Gradient Wave - positioned behind the name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-5xl h-96 heroGradientWave" />
        </div>
        
        <h1 className="heroNameText">
          ANGIE DUONG
        </h1>
      </div>

      {/* Character Illustration - on top layer, positioned so head touches bottom of DUONG */}
      <div className="relative z-30 mb-8 heroCharacterImage">
        <Image
          src="/Angie-drawing.png"
          alt="Angie"
          width={200}
          height={200}
          className="w-auto h-[180px] md:h-[220px] object-contain"
          priority
        />
      </div>

      </div>

      {/* Portfolio Banner - end of header area */}
      <div className="heroPortfolioBanner">
        <div className="heroPortfolioScrollContainer">
          <div className="heroPortfolioInnerContainer">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="heroPortfolioText">
                Portfolio
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Intro Card */}
      <div className="heroIntroCardContainer">
        <div className="heroIntroCard">
          <p className="heroIntroText">
            A <span className="heroIntroHighlightText">UI/UX & Product Designer</span> with{' '}
            <span className="heroIntroHighlightText">Frontend Development Skills</span>, creating user-centered, visually polished, and scalable digital products.
          </p>
        </div>
      </div>
    </section>
  );
}
