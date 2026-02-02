'use client';

import Image from 'next/image';
import Link from 'next/link';
import './HeroSection.css';

const TOOLTIP_DATA = {
  uxui: ['Figma', 'FigJam', 'WordPress'],
  productDesigner: ['Photoshop', 'Illustrator', 'InDesign', 'Procreate', 'Premiere Pro', 'After Effects'],
  frontend: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Next.js'],
};

function HighlightWithTooltip({ children, tools, id }) {
  return (
    <span className="heroIntroHighlightWrap">
      <span className="heroIntroHighlightText">{children}</span>
      <span className="heroIntroTooltip" role="tooltip" id={id}>
        {tools.map((tool, i) => (
          <span key={tool} className="heroIntroTooltipItem">
            {tool}
            {i < tools.length - 1 && <span className="heroIntroTooltipSep"> · </span>}
          </span>
        ))}
      </span>
    </span>
  );
}

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
          ANGIE<br></br> DUONG
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
            {/* Banner text loop copies */}
            {[1, 2, 3, 4].flatMap((copy) =>
              ['UX/UI Design', 'Graphic Design', 'Branding Design', 'Digital Artist', 'Front-end Develop'].map(
                (text, i) => (
                  <span key={`${copy}-${i}`} className="heroPortfolioText">
                    {text}
                  </span>
                )
              )
            )}
          </div>
        </div>
      </div>

      {/* Intro Card */}
      <div className="heroIntroCardContainer">
        <div className="heroIntroCard">
          <p className="heroIntroText">
            A <HighlightWithTooltip tools={TOOLTIP_DATA.uxui} id="tooltip-uxui">UX/UI</HighlightWithTooltip>
            {' & '}
            <HighlightWithTooltip tools={TOOLTIP_DATA.productDesigner} id="tooltip-product">Product Designer</HighlightWithTooltip>
            {' with '}
            <HighlightWithTooltip tools={TOOLTIP_DATA.frontend} id="tooltip-frontend">Frontend Development Skills</HighlightWithTooltip>
            , creating user-centered, visually polished, and scalable digital products.
          </p>
          <Link href="/about" className="heroAboutMeButton">
            ABOUT ME
          </Link>
        </div>
      </div>
    </section>
  );
}
