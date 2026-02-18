'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import Matter from 'matter-js';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
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

const ICON_SIZE = 24;

function BehanceIcon() {
  return (
    <Image
      src="/Tandem/behance-icon.svg"
      alt=""
      width={ICON_SIZE}
      height={ICON_SIZE}
      aria-hidden
    />
  );
}

function LinkedInIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3.003-.404 1.02.005 2.047.137 3.006.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function SocialIcon({ icon }) {
  switch (icon) {
    case 'behance':
      return <BehanceIcon />;
    case 'linkedin':
      return <LinkedInIcon />;
    case 'email':
      return <MaterialIcon icon="mail" size={ICON_SIZE} />;
    case 'github':
      return <GitHubIcon />;
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

export default function LetsConnect({ showFooter = true }) {
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
        <Link href="/contact" className="readyCtaButton">
          Get in Touch
        </Link>
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

      {showFooter && (
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
            {/* Desktop: pronounced curve */}
            <path
              className="readyFooterCurvePath readyFooterCurvePathDesktop"
              d="M1440.5 506.958H-0.5V0.730957L0.178711 0.990723C513.065 196.958 926.437 198.998 1439.82 0.990723L1440.5 0.729004V506.958Z"
              fill="#1E0038"
              stroke="white"
            />
            {/* Mobile: flatter curve (ít cong hơn) */}
            <path
              className="readyFooterCurvePath readyFooterCurvePathMobile"
              d="M1440.5 506.958H-0.5V0.730957L0.178711 0.990723C513.065 105 926.437 105 1439.82 0.990723L1440.5 0.729004V506.958Z"
              fill="#1E0038"
              stroke="white"
            />
          </svg>
        </div>
        <div className="readyFooterInner" ref={footerInnerRef}>
          <div className="readyFooterBrand">
            <a href="/" className="readyFooterLogo" aria-label="Home">
              <span className="readyFooterLogoWrap">
                <Image src="/Logo.svg" alt="AD" width={80} height={80} className="readyFooterLogoImg" />
                <Image
                  src="/Icon/Logo Favicon/SVG/Logo Gradient.svg"
                  alt=""
                  width={80}
                  height={80}
                  className="readyFooterLogoGradient"
                  aria-hidden
                />
              </span>
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
      )}
    </section>
  );
}
