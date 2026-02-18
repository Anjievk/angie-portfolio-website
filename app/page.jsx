import Navbar from './components/Navbar/Navbar';
import StarsBackground from './components/StarsBackground/StarsBackground';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsCarousel from './components/ProjectsCarousel/ProjectsCarousel';
import HeroScrollEffect from './components/HeroScrollEffect/HeroScrollEffect';
import './styles/page.css';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroScrollEffect />
      <div className="fixed inset-0 -z-10 mainBackground" />
      {/* Header section with stars - from top to Portfolio banner */}
      <div className="relative min-h-[150vh]" id="header-section">
        <StarsBackground />
        <Navbar />
        <HeroSection />
      </div>
      <ProjectsCarousel />
    </main>
  );
}
