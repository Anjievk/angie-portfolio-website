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
      
      // Find where Portfolio banner starts
      const portfolioBanner = headerSection.querySelector('.bg-black');
      let headerHeight;
      
      if (portfolioBanner) {
        const portfolioRect = portfolioBanner.getBoundingClientRect();
        const headerRect = headerSection.getBoundingClientRect();
        headerHeight = portfolioRect.bottom - headerRect.top;
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

    // Create stars only in header area
    const numStars = 25;
    const createStars = () => {
      stars.length = 0; // Clear existing stars
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 3,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.6,
        });
      }
    };

    createStars();

    // Function to draw four-pointed rounded star
    const drawStar = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      
      const radius = size;
      const roundness = radius * 0.3;
      
      ctx.beginPath();
      
      // Create four-pointed star with rounded points
      // Start from top point
      ctx.moveTo(0, -radius);
      
      // Top-right curve
      ctx.quadraticCurveTo(roundness, -roundness, radius, 0);
      
      // Right-bottom curve
      ctx.quadraticCurveTo(roundness, roundness, 0, radius);
      
      // Bottom-left curve
      ctx.quadraticCurveTo(-roundness, roundness, -radius, 0);
      
      // Left-top curve
      ctx.quadraticCurveTo(-roundness, -roundness, 0, -radius);
      
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges (only within header area)
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw four-pointed rounded star
        drawStar(star.x, star.y, star.size, star.opacity);
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
