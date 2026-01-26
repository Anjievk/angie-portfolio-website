import Navbar from '../components/Navbar/Navbar';
import StarsBackground from '../components/StarsBackground/StarsBackground';
import '../styles/page.css';
import '../styles/projects.css';

export default function Projects() {
  return (
    <main className="relative min-h-screen">
      <StarsBackground />
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <section className="projectsSection">
        <div className="projectsContainer">
          <h1 className="projectsTitle">
            <span className="bg-gradient-to-r from-[#9E2FFF] to-[#FF798B] bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <div className="projectsGrid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="projectCard">
                <div className="projectImagePlaceholder"></div>
                <h3 className="projectTitle">Project {i}</h3>
                <p className="projectDescription">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
