import "./globals.css";
import GSAPInit from "./components/GSAPInit/GSAPInit";

export const metadata = {
  title: "Angie Duong - Portfolio",
  description: "UI/UX & Product Designer with Frontend Development Skills",
  icons: {
    icon: "/Icon/Logo Favicon/SVG/Logo Gradient.svg",
  },
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
      </head>
      <body>
        <GSAPInit />
        {children}
      </body>
    </html>
  );
}
