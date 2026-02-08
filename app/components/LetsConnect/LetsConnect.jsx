'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import Matter from 'matter-js';
import { getCurveFloorSegments, getCurvePoints } from './curveFloor';
import './LetsConnect.css';

const DEBUG_PHYSICS = typeof window !== 'undefined' && window.location.search.includes('debug=physics');

const TAGS = [
  'UX/UI Design',
  'Graphic Design',
  'Frontend Develop',
  'Digital Artist',
  'Prototyping',
  'Wireframe',
  'Branding',
  'Typography',
  'Interaction design',
  'HTML5',
  'CSS3',
  'JavaScript',
  'Next.js',
  'React',
  'Bootstrap',
  'Tailwind CSS',
  'Character Drawing',
];

const FOOTER_NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
];

const SOCIAL_LINKS = [
  { label: 'Behance', href: 'https://www.behance.net/angieduong3', icon: 'behance' },
  { label: 'LinkedIn', href: 'www.linkedin.com/in/angie-duong-vk', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:angieduong.vk@gmail.com', icon: 'email' },
  { label: 'GitHub', href: 'https://github.com/Anjievk', icon: 'github' },
];

function SocialIcon({ icon }) {
  const size = 24;
  switch (icon) {
    case 'behance':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.124zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'email':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    default:
      return null;
  }
}

const PHYSICS = {
  gravity: 0.6,
  friction: 0.02,
  frictionAir: 0.008,
  restitution: 0.35,
  wallThickness: 20,
  curveDepth: 50,
  spawnYOffset: -80,
  randomForceScale: 0.015,
};

const MIN_CONTAINER_HEIGHT = 80;
const SPAWN_Y_ABOVE_CONTAINER = -80;

const FALLBACK_PHYSICS_HEIGHT = 130; // matches CSS [data-physics-ready] height

function initPhysics(containerEl, tagEls) {
  const rect = containerEl.getBoundingClientRect();
  let width = containerEl.clientWidth || rect.width;
  let height = containerEl.clientHeight || rect.height;
  if (width <= 0) width = rect.width || 800;
  if (height < MIN_CONTAINER_HEIGHT) height = FALLBACK_PHYSICS_HEIGHT;
  if (width <= 0) return null;

  if (process.env.NODE_ENV === 'development') {
    console.log('[LetsConnect physics] init', { width, height, tagCount: tagEls.length });
  }

  const engine = Matter.Engine.create({
    gravity: { x: 0, y: 1.4 },
  });
  const { world } = engine;

  const wallOpts = { isStatic: true, render: { visible: false } };
  const leftWall = Matter.Bodies.rectangle(-PHYSICS.wallThickness / 2, height / 2, PHYSICS.wallThickness, height + 100, wallOpts);
  const rightWall = Matter.Bodies.rectangle(width + PHYSICS.wallThickness / 2, height / 2, PHYSICS.wallThickness, height + 100, wallOpts);
  Matter.World.add(world, [leftWall, rightWall]);

  // Curve at bottom of container: depth scales with height (larger = cong hơn)
  const curveDepth = Math.max(100, Math.min(160, height * 0.88));
  const curveOffset = 115; // positive = move curve down (px)
  const floorSegments = getCurveFloorSegments(width, height, curveDepth, 52, curveOffset);
  const floorBodies = floorSegments.map((seg) =>
    Matter.Bodies.rectangle(seg.x, seg.y, seg.width, seg.height, {
      isStatic: true,
      angle: seg.angle,
      render: { visible: true },
      friction: PHYSICS.friction,
      restitution: PHYSICS.restitution * 0.5,
    })
  );
  Matter.World.add(world, floorBodies);

  // Tag bodies: pill shape (rectangle with chamfer), distributed horizontally, no overlap
  const tagBodies = [];
  const count = tagEls.length;
  const padding = 12;
  const totalWidth = width - padding * 2;
  const spacing = count > 1 ? totalWidth / (count + 1) : totalWidth / 2;

  for (let i = 0; i < count; i++) {
    const el = tagEls[i];
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const w = Math.max(rect.width, 40);
    const h = Math.max(rect.height, 24);
    const x = padding + spacing * (i + 1) + (Math.random() - 0.5) * 16;
    const y = SPAWN_Y_ABOVE_CONTAINER + (Math.random() - 0.5) * 20; // Above container so they fall into view

    const body = Matter.Bodies.rectangle(x, y, w, h, {
      chamfer: { radius: h / 2 },
      friction: PHYSICS.friction,
      frictionAir: PHYSICS.frictionAir,
      restitution: PHYSICS.restitution,
      density: 0.0012,
      render: { visible: true },
    });
    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * PHYSICS.randomForceScale * width,
      y: 0,
    });
    Matter.World.add(world, body);
    tagBodies.push({ body, el, w, h });
  }

  let debugRender = null;
  if (DEBUG_PHYSICS) {
    const debugWrap = document.createElement('div');
    debugWrap.className = 'physicsDebugOverlay';
    debugWrap.setAttribute('aria-hidden', 'true');
    containerEl.appendChild(debugWrap);
    debugRender = Matter.Render.create({
      element: debugWrap,
      engine,
      options: {
        width,
        height,
        wireframes: true,
        background: 'transparent',
        wireframeBackground: 'transparent',
        wireframeStrokeStyle: 'rgba(0,255,100,0.6)',
        showBounds: true,
      },
    });
    Matter.Render.run(debugRender);
  }

  return {
    engine,
    world,
    tagBodies,
    bounds: { width, height },
    curveDepth,
    floorSegments,
    curvePoints: getCurvePoints(width, height, curveDepth, 48, curveOffset),
    debugRender,
  };
}

export default function LetsConnect() {
  const ctaRef = useRef(null);
  const ideaToLifeRef = useRef(null);
  const footerInnerRef = useRef(null);
  const tagsWrapRef = useRef(null);
  const tagRefs = useRef([]);
  const physicsRef = useRef(null);
  const rafRef = useRef(null);
  const [tagsMounted, setTagsMounted] = useState(false);

  // GSAP: CTA and footer only (tags are driven by physics)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
      if (ideaToLifeRef.current) {
        gsap.from(ideaToLifeRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
        });
      }
      if (footerInnerRef.current) {
        gsap.from(footerInnerRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.9,
          ease: 'power2.out',
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Matter.js: init when tags section is mounted so refs are set
  useEffect(() => {
    if (!tagsMounted) return;
    const container = tagsWrapRef.current;
    if (!container) return;

    let cleanup = () => {};
    let cancelled = false;
    const FIXED_DELTA = 1000 / 60; // ms per engine step

    const tryInit = () => {
      if (cancelled) return;
      const tagEls = tagRefs.current.filter(Boolean);
      if (tagEls.length !== TAGS.length) {
        requestAnimationFrame(tryInit);
        return;
      }

      // 1. Mark container ready (CSS min-height for collapsed state)
      container.setAttribute('data-physics-ready', 'true');
      container.style.position = 'relative';

      // 2. Make all tags absolute so container collapses to min-height
      tagEls.forEach((el) => {
        el.style.position = 'absolute';
        el.style.left = '0';
        el.style.top = '0';
        el.style.willChange = 'transform';
        el.style.transformOrigin = 'center center';
      });

      // 3. Wait for layout (two frames so min-height/height is applied)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          const physics = initPhysics(container, tagEls);
        if (!physics) return;

        physicsRef.current = physics;
        const { engine } = physics;

        const mouse = Matter.Mouse.create(container);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.2, render: { visible: false } },
        });
        Matter.World.add(engine.world, mouseConstraint);

        // Game loop: update engine then sync DOM
        function tick() {
          if (cancelled || !physicsRef.current) return;
          Matter.Engine.update(physicsRef.current.engine, FIXED_DELTA);
          physicsRef.current.tagBodies.forEach(({ body, el, w, h }) => {
            if (!el || !body) return;
            el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
          });
          rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);

        const resizeObserver = new ResizeObserver(() => {
          rafRef.current && cancelAnimationFrame(rafRef.current);
          if (physicsRef.current?.debugRender) {
            Matter.Render.stop(physicsRef.current.debugRender);
            physicsRef.current.debugRender.element?.remove?.();
          }
          Matter.World.clear(engine.world);
          Matter.Engine.clear(engine);
          physicsRef.current = null;

          const nextTagEls = tagRefs.current.filter(Boolean);
          if (nextTagEls.length === 0) return;
          const next = initPhysics(container, nextTagEls);
          if (!next) return;

          physicsRef.current = next;
          if (next.debugRender) Matter.Render.run(next.debugRender);
          const nextMouse = Matter.Mouse.create(container);
          const nextMouseConstraint = Matter.MouseConstraint.create(next.engine, {
            mouse: nextMouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
          });
          Matter.World.add(next.engine.world, nextMouseConstraint);

          function tickNext() {
            if (!physicsRef.current) return;
            Matter.Engine.update(physicsRef.current.engine, FIXED_DELTA);
            physicsRef.current.tagBodies.forEach(({ body, el, w, h }) => {
              if (!el || !body) return;
              el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
            });
            rafRef.current = requestAnimationFrame(tickNext);
          }
          rafRef.current = requestAnimationFrame(tickNext);
        });

        resizeObserver.observe(container);

        cleanup = () => {
          resizeObserver.disconnect();
          rafRef.current && cancelAnimationFrame(rafRef.current);
          if (physicsRef.current?.debugRender) {
            Matter.Render.stop(physicsRef.current.debugRender);
            physicsRef.current.debugRender.element?.remove?.();
          }
          Matter.World.clear(engine.world);
          Matter.Engine.clear(engine);
          physicsRef.current = null;
        };
        });
      });
    };

    // Start init on next frame so layout is ready
    const rafId = requestAnimationFrame(tryInit);

    return () => {
      cancelled = true;
      rafId && cancelAnimationFrame(rafId);
      cleanup();
    };
  }, [tagsMounted]);

  return (
    <section className="readyFooterSection" aria-label="Ready to connect and footer">
      <div className="readyCtaLineWrap" aria-hidden>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="readyCtaLine"
          width="80%"
          height="2"
          viewBox="0 0 1275 2"
          fill="none"
          stroke="rgba(255, 255, 255, 0.70)"
          strokeWidth="2"
        >
          <path d="M0 1C21.25 1.06667 42.5 1.13 63.75 1.19C255 1.73 446.25 2 637.5 2C828.75 2 1020 1.73 1211.25 1.19C1232.5 1.13 1253.75 1.06667 1275 1" />
        </svg>
      </div>
      <div className="readyCtaBlock" ref={ctaRef}>
        <h2 className="readyHeadline">
          Ready to bring your
          <br />
          <span ref={ideaToLifeRef} className="readyHeadlineGradient">
            idea to life
          </span>
        </h2>
        <p className="readySubheadline">Let&apos;s chat about your next project.</p>
        <a href="#footer-contact" className="readyCtaButton">
          Get in Touch
        </a>
      </div>

      <div
        className="readyTagsWrap"
        ref={(el) => {
          tagsWrapRef.current = el;
          if (el && !tagsMounted) setTagsMounted(true);
        }}
        aria-hidden
      >
        <div className="readyTagsCurve">
          {TAGS.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="readyTag"
              ref={(el) => { tagRefs.current[i] = el; }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <footer className="readyFooter" id="footer-contact">
        <div className="readyFooterSvgWrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 1440 507"
            fill="none"
            className="readyFooterCurve"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M1440.5 506.958H-0.5V0.730957L0.178711 0.990723C513.065 196.958 926.437 198.998 1439.82 0.990723L1440.5 0.729004V506.958Z"
              fill="#1E0038"
              stroke="white"
            />
          </svg>
        </div>
        <div className="readyFooterInner" ref={footerInnerRef}>
          <div className="readyFooterBrand">
            <a href="/" className="readyFooterLogo" aria-label="Home">
              <Image src="/Logo.svg" alt="AD" width={48} height={48} className="readyFooterLogoImg" />
            </a>
            <p className="readyFooterCite">© Angie Duong | 2026</p>
          </div>
          <div className="readyFooterConnect">
            <h3 className="readyFooterConnectTitle">Let&apos;s Connect!</h3>
            <div className="readyFooterSocialIcons">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={icon}
                  href={href}
                  target={href.startsWith('http') || href.startsWith('mailto') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="readyFooterSocialIcon"
                  aria-label={label}
                >
                  <SocialIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
          <nav className="readyFooterNav" aria-label="Footer navigation">
            {FOOTER_NAV.map(({ href, label }) => (
              <Link key={href} href={href} className="readyFooterNavLink">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </section>
  );
}
