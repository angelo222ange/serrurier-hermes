import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

// Optimisation des polices avec next/font
// - Preload automatique
// - font-display: swap par défaut
// - Subset minimal pour réduire la taille
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  // Uniquement les weights utilisés pour réduire la taille
  weight: ["400", "500", "600", "700"],
});

// Viewport optimisé pour mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

// Meta optimisés pour Quality Score Google Ads
// Title < 60 caractères | Description < 155 caractères
export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `Serrurier ${siteConfig.city} 24h/24 - 20 min | Hermès`,
    template: `%s`,
  },
  description: `Serrurier ${siteConfig.city} 24h/24. Intervention 20 min. Ouverture porte dès 69€, changement serrure dès 89€. Devis gratuit ☎️ ${siteConfig.phone}`,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Serrurier Hermès",
  },
  icons: {
    icon: [
      { url: "/images/logo-favicon-serrurier-hermes.webp", type: "image/webp" },
    ],
    apple: [
      { url: "/images/logo-favicon-serrurier-hermes.webp", type: "image/webp" },
    ],
  },
  // Optimisation pour les moteurs de recherche
  other: {
    "format-detection": "telephone=yes",
  },
};

// CSS critique inline pour First Contentful Paint
const criticalCSS = `
  *,::before,::after{box-sizing:border-box;border:0 solid}
  html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
  body{margin:0;font-family:var(--font-inter),system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.5;color:#111827;background:#fff}
  h1,h2,h3,h4,h5,h6{font-weight:700;line-height:1.2}
  img{max-width:100%;height:auto;display:block}
  a{color:inherit;text-decoration:none}
  button{font-family:inherit;cursor:pointer}
  .container{max-width:1280px;margin:0 auto;padding:0 1rem}
  @media(min-width:640px){.container{padding:0 1.5rem}}
  @media(min-width:1024px){.container{padding:0 2rem}}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* Critical CSS inline pour FCP rapide */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Favicon & PWA - Utilise le logo du site */}
        <link rel="icon" type="image/webp" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="apple-touch-icon" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect aux ressources tierces critiques */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Resource hints pour optimiser le chargement */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <FloatingButton />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
