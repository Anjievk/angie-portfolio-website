'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar/Navbar';
import { FocusRail } from '@/components/ui/focus-rail';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';
import '../styles/page.css';
import '../styles/gallery.css';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Assignment 05',
    imageSrc: '/featured-artwork/Angie_Duong_Assignment05-01.jpg',
  },
  {
    id: 2,
    title: 'Assignment 08',
    imageSrc: '/featured-artwork/angie_duong_assignment08-01.jpg',
  },
  {
    id: 3,
    title: 'Book Cover',
    imageSrc: '/featured-artwork/Book Cover - New edited.jpg',
  },
  {
    id: 4,
    title: 'Drawing',
    imageSrc: '/featured-artwork/drawing-realsitic.jpg',
  },
  {
    id: 5,
    title: 'Drawing',
    imageSrc: '/featured-artwork/Drawing.jpeg',
  },
  {
    id: 6,
    title: 'Re-imagining',
    imageSrc: '/featured-artwork/re-imagining.jpg',
  },
  {
    id: 7,
    title: 'Whales with Shapes',
    imageSrc: '/featured-artwork/Whales-with-shapes.png',
  },
];

const SCROLL_SECTION_HEIGHT = 8; // Scroll distance for Design & Artwork section

export default function Gallery() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [allArtworkShown, setAllArtworkShown] = useState(false);
  const designSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = designSectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollableHeight = SCROLL_SECTION_HEIGHT * vh;
      // sectionTop: distance from top of viewport to top of section
      // When section enters from bottom: sectionTop = vh (progress 0)
      // When we've scrolled scrollableHeight: sectionTop = -scrollableHeight + vh (progress 1)
      const sectionTop = rect.top;
      const scrolled = vh - sectionTop;
      const progress = Math.max(0, scrolled / scrollableHeight); // Allow >1 so slower image movement still completes full cycle
      setScrollProgress(progress);
      if (progress >= 2.9) setAllArtworkShown(true); // Full cycle at ~progress 3 with 0.35 speed
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <section className="gallerySection">
        <div className="galleryContainer">
          {/* Title + Description row */}
          <div className="galleryHeader">
            <h1 className="galleryTitle">
              <span className="galleryTitleGradient">Gallery</span>
            </h1>
            <p className="galleryDescription">
              Artworks, designs, and projects I've made along the way.
              <br />
              Some are big, some are small!
              <br />
              But all of them are very meaningful to me.
            </p>
          </div>

          {/* Featured Artwork - FocusRail carousel */}
          <div className="featuredArtworkSection">
            <h2 className="featuredArtworkTitle">Featured Artwork</h2>
            <div className="focusRailWrapper">
              <FocusRail
                items={GALLERY_ITEMS}
                autoPlay={false}
                loop={true}
              />
            </div>
          </div>

          {/* Glowing pink divider */}
          <div className="galleryDivider" aria-hidden />

          {/* Design & Artwork - sticky section, scroll drives images */}
          <div
            ref={designSectionRef}
            className="designArtworkScrollSection"
            style={{ height: `${SCROLL_SECTION_HEIGHT * 100}vh` }}
          >
            <div className="designArtworkStickyInner">
              <div className="designArtworkGalleryWrap">
                <InfiniteGallery
                  images={GALLERY_ITEMS.map((item) => item.imageSrc)}
                  scrollProgress={scrollProgress}
                  visibleCount={8}
                  onAllImagesShown={() => setAllArtworkShown(true)}
                  className="h-[70vh] w-full rounded-lg overflow-hidden designArtworkCanvas"
                />
                <div className="designArtworkOverlay">
                  <Image
                    src="/Design&artwork.svg"
                    alt="Design & Artwork"
                    width={300}
                    height={90}
                    className="designArtworkSvg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
