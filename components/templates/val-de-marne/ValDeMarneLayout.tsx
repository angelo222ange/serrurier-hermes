"use client";

import { DM_Sans } from "next/font/google";
import Image from "next/image";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

interface ValDeMarneLayoutProps {
  children: React.ReactNode;
  cityName: string;
  phone: string;
  phoneLink: string;
}

export function ValDeMarneLayout({ children, cityName, phone, phoneLink }: ValDeMarneLayoutProps) {
  return (
    <div className={`${dmSans.variable} font-[family-name:var(--font-dm-sans)]`} suppressHydrationWarning>
      {/* Header minimaliste - pas de navigation vers d'autres pages */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Non cliquable pour garder l'utilisateur sur la page */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Image
                src="/images/logos/serrurier-hermes-logo.webp"
                alt="Logo Serrurier Hermès"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                priority
              />
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base block leading-tight tracking-tight">Serrurier Hermès</span>
                <span className="text-emerald-600 text-xs sm:text-sm font-semibold">{cityName}</span>
              </div>
            </div>

            {/* Navigation ancres - Desktop uniquement */}
            <nav className="hidden lg:flex items-center gap-5">
              <a href="#services" className="text-slate-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                Services
              </a>
              <a href="#tarifs" className="text-slate-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                Tarifs
              </a>
              <a href="#avis" className="text-slate-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                Avis
              </a>
              <a href="#faq" className="text-slate-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                FAQ
              </a>
            </nav>

            {/* Numéro de téléphone - non cliquable */}
            <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/25">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span className="hidden sm:inline">{phone}</span>
              <span className="sm:hidden">{phone}</span>
            </div>
          </div>
        </div>
      </header>

      {children}

      {/* Footer minimaliste - SANS liens cliquables pour garder l'utilisateur sur la page */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6">
            {/* Logo et info */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/logos/serrurier-hermes-logo.webp"
                alt="Logo Serrurier Hermès"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div className="text-left">
                <p className="font-bold text-lg">Serrurier Hermès</p>
                <p className="text-emerald-400 text-sm font-medium">{cityName}</p>
              </div>
            </div>

            {/* Info sans lien */}
            <div className="space-y-1">
              <p className="text-slate-300 text-sm">Intervention 24h/24, 7j/7</p>
              <p className="text-slate-400 text-sm">Val-de-Marne (94) · Agréé toutes assurances</p>
            </div>

            {/* Numéro de téléphone - non cliquable pour garder l'utilisateur sur la page */}
            <div className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              {phone}
            </div>

            {/* Badges de confiance */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Agréé assurances
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.9/5 sur Google
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Intervention 15 min
              </span>
            </div>

            {/* Copyright */}
            <div className="pt-6 border-t border-slate-800 w-full">
              <p className="text-slate-500 text-xs">
                © 2026 Serrurier Hermès {cityName}. Tous droits réservés. · Artisan serrurier qualifié
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
