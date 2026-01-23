import { Inter } from "next/font/google";
import Image from "next/image";
import { regionConfigs } from "@/config/site";
import type { Metadata } from "next";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Serrurier Toulouse 24h/24 - Intervention 20 min | Dès 69€`,
  description: `Serrurier Toulouse disponible 24h/24 et 7j/7. Intervention en 20 min. Ouverture de porte dès 69€, porte blindée dès 149€. Devis gratuit ☎️ ${regionConfigs.toulouse.phone}`,
  keywords: [
    "serrurier toulouse",
    "serrurier toulouse 24h/24",
    "dépannage serrurerie toulouse",
    "ouverture de porte toulouse",
    "changement serrure toulouse",
    "serrurier urgence toulouse",
    "serrurier toulouse pas cher",
  ],
  robots: {
    index: false, // Pas d'indexation pour les pages ads
    follow: false,
  },
  openGraph: {
    title: `Serrurier Toulouse - Intervention Urgente 24h/24`,
    description: `Serrurier à Toulouse. Intervention en 20 min. Ouverture porte dès 69€. Devis gratuit. ☎️ ${regionConfigs.toulouse.phone}`,
    type: "website",
    locale: "fr_FR",
    siteName: "Serrurier Hermès",
  },
};

export default function ToulouseAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { phone, phoneLink } = regionConfigs.toulouse;

  return (
    <div className={`${inter.variable} font-sans`} suppressHydrationWarning>
      {/* Header minimaliste - uniquement logo et téléphone */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo avec image */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/logos/serrurier-hermes-logo.webp"
                alt="Logo Serrurier Hermès"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                priority
              />
              <div>
                <span className="font-bold text-gray-900 text-sm sm:text-base block leading-tight">Serrurier Hermès</span>
                <span className="text-emerald-600 text-xs sm:text-sm font-medium">Toulouse</span>
              </div>
            </div>

            {/* Navigation ancres - Desktop */}
            <nav className="hidden lg:flex items-center gap-4">
              <a href="#services" className="text-gray-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                Services
              </a>
              <a href="#tarifs" className="text-gray-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                Tarifs
              </a>
              <a href="#zones" className="text-gray-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                Zones
              </a>
              <a href="#avis" className="text-gray-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                Avis
              </a>
              <a href="#faq" className="text-gray-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                FAQ
              </a>
            </nav>

            {/* CTA Téléphone */}
            <a 
              href={phoneLink} 
              className="btn-phone text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span className="hidden sm:inline">{phone}</span>
              <span className="sm:hidden">Appeler</span>
            </a>
          </div>

          {/* Navigation mobile - Menu hamburger */}
          <div className="lg:hidden border-t border-gray-100">
            <nav className="flex items-center justify-around py-2 overflow-x-auto scrollbar-hide">
              <a href="#services" className="text-gray-700 hover:text-emerald-600 text-xs font-medium px-2 py-1 whitespace-nowrap transition-colors">
                Services
              </a>
              <a href="#tarifs" className="text-gray-700 hover:text-emerald-600 text-xs font-medium px-2 py-1 whitespace-nowrap transition-colors">
                Tarifs
              </a>
              <a href="#zones" className="text-gray-700 hover:text-emerald-600 text-xs font-medium px-2 py-1 whitespace-nowrap transition-colors">
                Zones
              </a>
              <a href="#avis" className="text-gray-700 hover:text-emerald-600 text-xs font-medium px-2 py-1 whitespace-nowrap transition-colors">
                Avis
              </a>
              <a href="#faq" className="text-gray-700 hover:text-emerald-600 text-xs font-medium px-2 py-1 whitespace-nowrap transition-colors">
                FAQ
              </a>
            </nav>
          </div>
        </div>
      </header>

      {children}

      {/* Footer simplifié - pas de liens de navigation */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Contact */}
            <div className="text-center md:text-left">
              <p className="font-bold text-lg mb-1">Serrurier Hermès Toulouse</p>
              <p className="text-gray-400 text-sm">Intervention 24h/24, 7j/7</p>
            </div>

            {/* Téléphone CTA */}
            <a 
              href={phoneLink} 
              className="btn-phone-pulse text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              {phone}
            </a>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs">
              © 2026 Serrurier Hermès. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Bouton flottant téléphone */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href={phoneLink}
          className="flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/40 animate-pulse hover:bg-emerald-600 transition-colors"
          aria-label="Appeler maintenant"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
