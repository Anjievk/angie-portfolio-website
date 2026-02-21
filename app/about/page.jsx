import Navbar from '../components/Navbar/Navbar';
import AboutPhoto from './AboutPhoto';
import '../styles/page.css';
import '../styles/about.css';

/* Customize your content below – add your photo to public/about/photo.jpg */

const description = `I'm Angie Duong, a passionate UI/UX & Product Designer with Frontend Development skills. I specialize in creating user-centered, visually polished, and scalable digital products that combine beautiful design with functional development.`;

const experience = [
  { role: 'Lead UX/UI Designer', company: 'Tandem', period: '2024 – Present', description: 'Led design of an AI-powered childcare app for parents in skilled trades.' },
  { role: 'Product Designer', company: 'TeaTiny', period: '2023 – 2024', description: 'Designed premium flower tea packaging and brand visuals.' },
  { role: 'UX/UI Designer', company: 'Space Animal', period: '2023', description: 'User experience and visual design for digital products.' },
];

const interests = ['User-Centered Design', 'Illustration', 'Typography', 'Motion Design', 'Photography', 'Frontend Development', 'Brand Identity', 'Editorial Design'];

export default function About() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <section className="aboutSection">
        <div className="aboutContainer">
          <h1 className="aboutTitle">
            <span className="bg-gradient-to-r from-[var(--gradient-accent-start)] to-[var(--gradient-accent-end)] bg-clip-text text-transparent">
              About Me
            </span>
          </h1>

          {/* Description + Picture */}
          <div className="aboutIntro">
            <AboutPhoto />
            <div className="aboutDescriptionWrap">
              <p className="aboutDescription">{description}</p>
            </div>
          </div>

          {/* Experience */}
          <div className="aboutBlock">
            <h2 className="aboutBlockTitle">Experience</h2>
            <ul className="aboutExperienceList">
              {experience.map((item, i) => (
                <li key={i} className="aboutExperienceItem">
                  <div className="aboutExperienceHeader">
                    <span className="aboutExperienceRole">{item.role}</span>
                    <span className="aboutExperiencePeriod">{item.period}</span>
                  </div>
                  <span className="aboutExperienceCompany">{item.company}</span>
                  <p className="aboutExperienceDescription">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div className="aboutBlock">
            <h2 className="aboutBlockTitle">Interests</h2>
            <div className="aboutInterests">
              {interests.map((interest, i) => (
                <span key={i} className="aboutInterestTag">{interest}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
