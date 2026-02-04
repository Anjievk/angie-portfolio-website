'use client';

import Link from 'next/link';
import BlurSpotGlow from '../BlurSpotGlow/BlurSpotGlow';
import './HeroIntroCard.css';

const TOOLTIP_DATA = {
  uxui: ['Figma', 'FigJam', 'WordPress'],
  productDesigner: ['Photoshop', 'Illustrator', 'InDesign', 'Procreate', 'Premiere Pro', 'After Effects'],
  frontend: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Next.js'],
};

function HighlightWithTooltip({ children, tools, id }) {
  return (
    <span className="introCardHighlightWrap">
      <span className="introCardHighlightText">{children}</span>
      <span className="introCardTooltip" role="tooltip" id={id}>
        {tools.map((tool, i) => (
          <span key={tool} className="introCardTooltipItem">
            {tool}
            {i < tools.length - 1 && <span className="introCardTooltipSep"> · </span>}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function HeroIntroCard() {
  return (
    <div className="introCardContainer">
      <BlurSpotGlow spotBottomLeftColor="#A836F1" spotTopRightColor="#FA758F" />
      <div className="introCard">
        <p className="introCardText">
          A <HighlightWithTooltip tools={TOOLTIP_DATA.uxui} id="tooltip-uxui">UX/UI</HighlightWithTooltip>
          {' & '}
          <HighlightWithTooltip tools={TOOLTIP_DATA.productDesigner} id="tooltip-product">Product Designer</HighlightWithTooltip>
          {' with '}
          <HighlightWithTooltip tools={TOOLTIP_DATA.frontend} id="tooltip-frontend">Frontend Development Skills</HighlightWithTooltip>
          , creating user-centered, visually polished, and scalable digital products.
        </p>
        <Link href="/about" className="introCardAboutMeButton">
          ABOUT ME
        </Link>
      </div>
    </div>
  );
}
