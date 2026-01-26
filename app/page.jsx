import Navbar from './components/Navbar/Navbar';
import StarsBackground from './components/StarsBackground/StarsBackground';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsCarousel from './components/ProjectsCarousel/ProjectsCarousel';
import LetsConnect from './components/LetsConnect/LetsConnect';
import './styles/page.css';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 mainBackground" />
      {/* Header section with stars - from top to Portfolio banner */}
      <div className="relative min-h-[150vh]" id="header-section">
        <StarsBackground />
        <Navbar />
        <HeroSection />
      </div>
      <ProjectsCarousel />
      <LetsConnect />
    </main>
  );
}
