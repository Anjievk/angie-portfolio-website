import "./globals.css";
import GSAPInit from "./components/GSAPInit/GSAPInit";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import UnderConstruction from "./components/UnderConstruction/UnderConstruction";
import FooterWrapper from "./components/Footer/FooterWrapper";
import { ProjectSlugProvider } from "./context/ProjectSlugContext";

export const metadata = {
  title: "Angie Duong - Portfolio",
  description: "UI/UX & Product Designer with Frontend Development Skills",
  icons: {
    icon: "/Icon/Logo Favicon/SVG/Logo Gradient.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alan+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body>
        <GSAPInit />
        <UnderConstruction />
        <ProjectSlugProvider>
          {children}
          <FooterWrapper />
          <ScrollToTop />
        </ProjectSlugProvider>
      </body>
    </html>
  );
}
