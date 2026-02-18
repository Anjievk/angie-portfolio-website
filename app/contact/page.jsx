import Navbar from '../components/Navbar/Navbar';
import LetsConnectCard from '../components/LetsConnectCard/LetsConnectCard';
import '../styles/page.css';

export default function Contact() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      <LetsConnectCard />
    </main>
  );
}
