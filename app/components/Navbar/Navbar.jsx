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

  return (
    <nav
      className={`navbarContainer ${scrolled ? 'navbarContainerScrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="navbarInner">
        <a href="/" className="navbarLogoLink" aria-label="Home">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="navbarLogo"
          />
        </a>
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
      </div>
      <div className="navbarGlowLine" aria-hidden />
    </nav>
  );
}
