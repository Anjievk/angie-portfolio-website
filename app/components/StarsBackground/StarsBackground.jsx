'use client';

import { useEffect, useRef } from 'react';
import './StarsBackground.css';

export default function StarsBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      // Find the header section (from top to Portfolio banner)
      const headerSection = document.getElementById('header-section');
      if (!headerSection) {
        // Fallback: use container height
        const containerRect = container.getBoundingClientRect();
        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
        return;
      }
      
      // Find where Portfolio banner starts - stars end right before it
      const portfolioBanner = headerSection.querySelector('.heroPortfolioBanner');
      let headerHeight;
      
      if (portfolioBanner) {
        const portfolioRect = portfolioBanner.getBoundingClientRect();
        const headerRect = headerSection.getBoundingClientRect();
        headerHeight = Math.max(100, portfolioRect.top - headerRect.top);
      } else {
        // Fallback: use header section height
        const headerRect = headerSection.getBoundingClientRect();
        headerHeight = headerRect.height;
      }
      
      canvas.width = window.innerWidth;
      canvas.height = headerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const stars = [];
    let startTime = performance.now();

    // Create stars evenly across background (grid + jitter)
    const cols = 6;
    const rows = 5;
    const createStars = () => {
      stars.length = 0; // Clear existing stars
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;
      const jitter = 0.4; // 0 = strict grid, 1 = full random within cell

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = (col + 0.5) * cellW;
          const baseY = (row + 0.5) * cellH;
          const x = baseX + (Math.random() - 0.5) * cellW * jitter;
          const y = baseY + (Math.random() - 0.5) * cellH * jitter;

          stars.push({
            x,
            y,
            size: Math.random() * 14 + 3,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            baseOpacity: Math.random() * 0.25 + 0.35,
            phase: Math.random() * Math.PI * 2,
            sparkleSpeed: 0.0003 + Math.random() * 0.0006,
          });
        }
      }
    };

    createStars();

    // Function to draw four-pointed star: vertically elongated, rounded points, pinched sides
    const drawStar = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, 1.5);
      
      const radius = size;
      const roundness = radius * 0.26;
      
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.quadraticCurveTo(roundness, -roundness, radius, 0);
      ctx.quadraticCurveTo(roundness, roundness, 0, radius);
      ctx.quadraticCurveTo(-roundness, roundness, -radius, 0);
      ctx.quadraticCurveTo(-roundness, -roundness, 0, -radius);
      ctx.closePath();
      ctx.fillStyle = `rgba(195, 185, 215, ${opacity})`;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = performance.now() - startTime;

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Sparkle: pulse opacity between 30% and 100% of base
        const sparkle = 0.35 + 0.65 * (Math.sin(time * star.sparkleSpeed + star.phase) + 1) / 2;
        const opacity = star.baseOpacity * sparkle;

        drawStar(star.x, star.y, star.size, opacity);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Recreate stars when canvas size changes
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
      createStars();
    });
    
    const headerSection = document.getElementById('header-section');
    if (headerSection) {
      resizeObserver.observe(headerSection);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 right-0 pointer-events-none starsContainer" 
      id="stars-container"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
