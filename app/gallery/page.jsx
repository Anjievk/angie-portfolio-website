import Navbar from '../components/Navbar/Navbar';
import StarsBackground from '../components/StarsBackground/StarsBackground';
import '../styles/page.css';
import '../styles/gallery.css';

export default function Gallery() {
  return (
    <main className="relative min-h-screen">
      <StarsBackground />
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <section className="gallerySection">
        <div className="galleryContainer">
          <h1 className="galleryTitle">
            <span className="bg-gradient-to-r from-[var(--gradient-accent-start)] to-[var(--gradient-accent-end)] bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <div className="galleryGrid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="galleryItem">
                <div className="galleryImagePlaceholder"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
