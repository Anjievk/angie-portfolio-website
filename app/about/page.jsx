import Navbar from '../components/Navbar/Navbar';
import AboutPhoto from './AboutPhoto';
import Typewriter from '../components/Typewriter/Typewriter';
import '../styles/page.css';
import '../styles/about.css';

const titleRoles = ['Angie Duong', 'UX/UI Designer', 'Graphic Designer', 'Digital Artist', 'Front end Developer'];

/* Customize your content below – add your photo to public/about/photo.jpg */

const nutshellItems = [
  { emoji: '🧋', text: 'Boba + matcha = happy Angie' },
  { emoji: '🕯️', text: 'Scent candles = work mode ON' },
  { emoji: '🍜', text: 'Food = love language' },
  { emoji: '🎬', text: 'Manga + Movies = escape from reality' },
];

const truthParagraph = `I feel so much. About everything. And design is how I let it all out. Right now, I'm more passionate than ever, excited about every project, every problem to solve, every story to tell. This is exactly where I'm meant to be.`;

const experience = [
  {
  role: 'Computer Science',
  company: 'Seneca Polytechnic',
  period: 'Sept 2026 – June 2029',
  description: 'A three-year bachelor’s degree program focused on software development, programming, algorithms, databases, and computer systems, building a strong foundation in computer science and emerging technologies.'
},
  { role: 'Digital Design & Development', company: 'British Columbia Institution of Technology', period: 'Sept 2024 – June 2026', description: 'Graduated with Distinction. A two-year diploma program (110.5 credits) that covers UX/UI design, graphic design, front-end development, typography, branding, and interactive media, providing a strong foundation to bring creative ideas to life.' },
  { role: 'Secondary School', company: 'Thomas Haney Secondary School', period: 'Sept 2022 – June 2024', description: 'Graduated with a 97% average in grade 12. The school is a member of the Canadian Coalition for Self-Directed Learning (SDL), which gave me the space to take ownership of my learning and grow on my own terms.' },
  { role: 'Move to Canada', company: '', period: 'Aug 2022', description: 'Moved to Canada alone at a young age to study and build a new life. Leaving everything familiar behind wasn’t easy, but it pushed me to grow, become independent, and chase the design career I’d always dreamed of.' },
];

const interests = ['Drawing', 'Watching movies', 'Reading manga', 'Painting', 'Designing', 'Photography', 'Drinking Bubble Tea', 'Eating', 'Sleeping', 'Smelling money'];

export default function About() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <section className="aboutSection">
        <div className="aboutContainer">
          <header className="aboutHeader">
            <h1 className="aboutTitle">
              <span className="aboutTitleStatic">Xin Chào! I&apos;m </span>
              <span className="aboutTitleTyping">
                <Typewriter words={titleRoles} typeSpeed={80} deleteSpeed={50} delayAfterType={2000} delayAfterDelete={400} />
              </span>
            </h1>
          </header>

          {/* Intro card: Photo + Nutshell + Truth */}
          <div className="aboutIntroCard">
            <div className="aboutIntro">
              <AboutPhoto />
              <div className="aboutDescriptionWrap">
              <h2 className="aboutNutshellTitle">Me in a nutshell:</h2>
              <ul className="aboutNutshellList">
                {nutshellItems.map((item, i) => (
                  <li key={i} className="aboutNutshellItem">
                    <span className="aboutNutshellEmoji">{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="aboutTruthWrap">
                <span className="aboutTruthLabel">The truth is:</span>
                <p className="aboutTruthText">{truthParagraph}</p>
              </div>
            </div>
          </div>
          </div>

          {/* Background */}
          <div className="aboutBlock">
            <h2 className="aboutBlockTitle">Background</h2>
            <ul className="aboutExperienceList">
              {experience.map((item, i) => (
                <li key={i} className="aboutExperienceItem">
                  <div className="aboutExperienceHeader">
                    <span className="aboutExperienceRole">{item.role}</span>
                    <span className="aboutExperiencePeriod">{item.period}</span>
                  </div>
                  {item.company && <span className="aboutExperienceCompany">{item.company}</span>}
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
