'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && closeMenu();
    const handleResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={`navbarContainer ${scrolled ? 'navbarContainerScrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="navbarInner">
        <a href="/" className="navbarLogoLink" aria-label="Home">
          <span className="navbarLogoWrap">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="navbarLogo"
            />
            <Image
              src="/Icon/Logo Favicon/SVG/Logo Gradient.svg"
              alt=""
              width={40}
              height={40}
              className="navbarLogoGradient"
              aria-hidden
            />
          </span>
        </a>
        {/* Desktop: links + theme toggle */}
        <div className="navbarLinksContainer">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`navbarLink ${isActive ? 'navbarLinkActive' : ''}`}
              >
                <span className="navbarLinkText">{label}</span>
                <span className="navbarLinkLine" aria-hidden />
              </Link>
            );
          })}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="navbarThemeToggle"
              aria-label="Toggle theme"
            >
              <Image
                src="/Icon/Sun.svg"
                alt=""
                width={18}
                height={18}
                className={`navbarSunIcon ${theme === 'dark' ? 'navbarSunIconInactive' : 'navbarSunIconActive'}`}
                aria-hidden
              />
              <Image
                src="/Icon/Moon.svg"
                alt=""
                width={18}
                height={18}
                className={`navbarMoonIcon ${theme === 'dark' ? 'navbarMoonIconActive' : 'navbarMoonIconInactive'}`}
                aria-hidden
              />
              <div
                className={`navbarToggleIndicator ${theme === 'dark' ? 'navbarToggleIndicatorDark' : 'navbarToggleIndicatorLight'}`}
              />
            </button>
          )}
        </div>
        {/* Mobile: hamburger button */}
        <button
          type="button"
          className={`navbarMenuButton ${menuOpen ? 'navbarMenuButtonOpen' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="navbarMenuIconBar" aria-hidden />
          <span className="navbarMenuIconBar" aria-hidden />
          <span className="navbarMenuIconBar" aria-hidden />
        </button>
      </div>
      {/* Mobile menu overlay */}
      <div
        className={`navbarMobileOverlay ${menuOpen ? 'navbarMobileOverlayOpen' : ''}`}
        aria-hidden
        onClick={closeMenu}
      />
      <div className={`navbarMobileMenu ${menuOpen ? 'navbarMobileMenuOpen' : ''}`}>
        <div className="navbarMobileMenuInner">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`navbarMobileLink ${isActive ? 'navbarLinkActive' : ''}`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            );
          })}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="navbarThemeToggle navbarMobileThemeToggle"
              aria-label="Toggle theme"
            >
              <Image
                src="/Icon/Sun.svg"
                alt=""
                width={18}
                height={18}
                className={`navbarSunIcon ${theme === 'dark' ? 'navbarSunIconInactive' : 'navbarSunIconActive'}`}
                aria-hidden
              />
              <Image
                src="/Icon/Moon.svg"
                alt=""
                width={18}
                height={18}
                className={`navbarMoonIcon ${theme === 'dark' ? 'navbarMoonIconActive' : 'navbarMoonIconInactive'}`}
                aria-hidden
              />
              <div
                className={`navbarToggleIndicator ${theme === 'dark' ? 'navbarToggleIndicatorDark' : 'navbarToggleIndicatorLight'}`}
              />
            </button>
          )}
        </div>
      </div>
      <div className="navbarGlowLine" aria-hidden />
    </nav>
  );
}
