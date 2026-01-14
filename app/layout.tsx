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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* Favicon & PWA - Utilise le logo du site */}
        <link rel="icon" type="image/webp" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="apple-touch-icon" href="/images/logo-favicon-serrurier-hermes.webp" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS Prefetch pour les ressources tierces */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
