import Navbar from '../components/Navbar/Navbar';
import StarsBackground from '../components/StarsBackground/StarsBackground';
import '../styles/page.css';
import '../styles/about.css';

export default function About() {
  return (
    <main className="relative min-h-screen">
      <StarsBackground />
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <section className="aboutSection">
        <div className="aboutContainer">
          <h1 className="aboutTitle">
            <span className="bg-gradient-to-r from-[#9E2FFF] to-[#FF798B] bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          <div className="aboutContent">
            <p className="aboutText">
              Welcome to my portfolio! I&apos;m Angie Duong, a passionate UI/UX & Product Designer
              with Frontend Development Skills.
            </p>
            <p className="aboutText">
              I specialize in creating user-centered, visually polished, and scalable digital products
              that combine beautiful design with functional development.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
