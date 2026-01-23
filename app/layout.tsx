import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

// Optimisation des polices avec next/font
// - Preload automatique
// - font-display: swap pour éviter FOIT
// - Subset minimal pour réduire la taille
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  // Uniquement les weights utilisés pour réduire la taille
  weight: ["400", "600", "700"],
  // Ajustement pour éviter le layout shift
  adjustFontFallback: true,
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

// CSS critique inline pour First Contentful Paint (minimisé et optimisé)
const criticalCSS = `
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,sans-serif;scroll-behavior:smooth}
body{margin:0;line-height:inherit;font-family:var(--font-inter),system-ui,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#111827;background:#fff}
h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:700;line-height:1.2}
img{display:block;max-width:100%;height:auto}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;background:0 0;padding:0}
.container{max-width:1280px;margin:0 auto;padding:0 1rem}
@media(min-width:640px){.container{padding:0 1.5rem}}
@media(min-width:1024px){.container{padding:0 2rem}}
.btn-phone{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:.75rem;background-color:#10b981;padding:.875rem 1.5rem;font-size:1rem;font-weight:700;color:#fff;box-shadow:0 10px 15px -3px rgba(16,185,129,.3);transition:all .2s}
.btn-phone:hover{background-color:#059669;box-shadow:0 20px 25px -5px rgba(16,185,129,.4)}
.btn-phone-pulse{animation:pulse-ring 2s cubic-bezier(.4,0,.6,1) infinite}
@keyframes pulse-ring{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.7)}50%{box-shadow:0 0 0 8px rgba(16,185,129,0)}}
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Critical CSS inline pour FCP rapide */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Preload image hero pour LCP rapide */}
        <link
          rel="preload"
          as="image"
          href="/images/services/depannage-serrurier-urgence-nuit-hermes-sm.webp"
          imageSrcSet="/images/services/depannage-serrurier-urgence-nuit-hermes-sm.webp 640w, /images/services/depannage-serrurier-urgence-nuit-hermes-md.webp 768w, /images/services/depannage-serrurier-urgence-nuit-hermes-lg.webp 1280w"
          imageSizes="100vw"
          type="image/webp"
        />
        
        {/* Preload logo */}
        <link
          rel="preload"
          as="image"
          href="/images/logos/serrurier-hermes-logo.webp"
          type="image/webp"
        />
        
        {/* Preconnect aux ressources tierces (si nécessaire) */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Resource hints pour optimiser le chargement */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
