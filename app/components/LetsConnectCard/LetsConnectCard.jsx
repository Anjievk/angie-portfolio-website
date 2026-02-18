'use client';

import Link from 'next/link';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import './LetsConnectCard.css';

const CONNECT_ITEMS = [
  { label: 'EMAIL', href: 'mailto:angieduong.vk@gmail.com', external: true },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/angie-duong-vk', external: true },
  { label: 'BEHANCE', href: 'https://www.behance.net/angieduong3', external: true },
  { label: 'RESUME', href: '/resume', external: false },
];

function ArrowIcon() {
  return (
    <span className="connectCardArrow connectCardArrowSvg" aria-hidden>
      <MaterialIcon icon="arrow_forward" size={40} />
    </span>
  );
}

export default function LetsConnectCard() {
  return (
    <section className="connectCardSection" aria-labelledby="connect-card-heading">
      <fieldset className="connectCardFieldset">
        <legend id="connect-card-heading" className="connectCardLegend">
          Let&apos;s Connect!
        </legend>
        <div className="connectCardContent">
          {CONNECT_ITEMS.map(({ label, href, external }) => (
            <div key={label} className="connectCardRowWrapper">
              {external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connectCardRow"
                >
                  <span className="connectCardLabel">{label}</span>
                  <ArrowIcon />
                </a>
              ) : (
                <Link href={href} className="connectCardRow">
                  <span className="connectCardLabel">{label}</span>
                  <ArrowIcon />
                </Link>
              )}
              <div className="connectCardDivider" />
            </div>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
