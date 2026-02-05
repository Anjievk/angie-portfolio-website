'use client';

import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './LetsConnect.css';

export default function LetsConnect() {
  const links = [
    { label: 'EMAIL', href: 'mailto:your.email@example.com' },
    { label: 'LINKEDIN', href: 'https://linkedin.com/in/yourprofile' },
    { label: 'BEHANCE', href: 'https://behance.net/yourprofile' },
    { label: 'RESUME', href: '/resume.pdf' },
  ];

  return (
    <section className="letsConnectSection">
      <div className="letsConnectContainer">
        {/* Section Title */}
        <ScrollReveal animation="fadeUp" delay={0}>
          <div className="letsConnectTitle">
            <div className="letsConnectTitleWrapper">
              <div className="letsConnectTitleLine"></div>
              <h2 className="letsConnectTitleText">
                <span className="bg-gradient-to-r from-[#9E2FFF] to-[#FF798B] bg-clip-text text-transparent">
                  Let&apos;s Connect!
                </span>
              </h2>
              <div className="letsConnectTitleLine"></div>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Links Container */}
        <ScrollReveal animation="fadeUp" delay={100}>
        <div className="letsConnectContactLinksContainer">
          {links.map((link, index) => (
            <div key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="letsConnectContactLink"
              >
                <span className="letsConnectContactLinkLabel">
                  {link.label}
                </span>
                <span className="letsConnectContactLinkArrow">
                  →
                </span>
              </a>
              {index < links.length - 1 && (
                <div className="letsConnectContactLinkDivider"></div>
              )}
            </div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
