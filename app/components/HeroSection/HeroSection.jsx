'use client';

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
    <section className="relative flex flex-col items-center justify-center px-8 pt-16 pb-20 overflow-x-hidden overflow-y-visible min-h-[80vh]">
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

      {/* Character illustration – in front of gradient shape */}
      <div className="heroCharacterContainer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Angie-drawing.png"
          alt="Character illustration"
          className="heroCharacterImage"
        />
      </div>

      </div>

      {/* Gradient shape (behind character) + roller line */}
      <div className="heroPortfolioBanner">
        {/* 1. Curve block – banner image clipped to bell shape, gradient on top for tint */}
        <div className="heroPortfolioCurveBlock" aria-hidden="true">
          <svg className="heroPortfolioBellCurveSvg" viewBox="0 0 1564 433" fill="none" preserveAspectRatio="none">
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
                <stop stopColor="#9E2FFF" />
                <stop offset="0.365385" stopColor="#CD51C5" />
                <stop offset="1" stopColor="#FF798B" />
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
                ['UX/UI Design', 'Graphic Design', 'Branding Design', 'Digital Artist', 'Front-end Dev'].map(
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
