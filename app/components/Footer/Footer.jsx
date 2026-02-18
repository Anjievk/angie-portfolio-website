import LetsConnectCard from '../LetsConnectCard/LetsConnectCard';
import LetsConnect from '../LetsConnect/LetsConnect';

export default function Footer() {
  return (
    <footer role="contentinfo" className="siteFooter">
      <LetsConnectCard />
      <LetsConnect />
    </footer>
  );
}
