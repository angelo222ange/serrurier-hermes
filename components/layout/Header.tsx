"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, navigation, zones, services } from "@/config/site";

// Map des services pour identifier les slugs de service dans l'URL
const servicesSlugs: string[] = services.map(s => s.slug);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Détecter le slug de zone depuis l'URL pour maintenir le contexte de navigation
  // Patterns : /zones/[zone] ou /[service]/[zone]
  const getZoneSlugFromPath = (): string | null => {
    const segments = pathname.split('/').filter(Boolean);
    
    // Pattern: /zones/[zone]
    if (segments[0] === 'zones' && segments[1]) {
      const zone = zones.find(z => z.slug === segments[1]);
      if (zone && !('isMain' in zone && zone.isMain)) return zone.slug;
    }
    
    // Pattern: /[service]/[zone]
    if (segments.length >= 2 && servicesSlugs.includes(segments[0])) {
      const zone = zones.find(z => z.slug === segments[1]);
      if (zone && !('isMain' in zone && zone.isMain)) return zone.slug;
    }
    
    return null;
  };

  const currentZoneSlug = getZoneSlugFromPath();

  // Adapter l'URL d'un lien de navigation en fonction de la zone actuelle
  const getNavHref = (href: string): string => {
    if (!currentZoneSlug) return href;
    
    // Adapter les liens de services pour inclure la zone
    // /depannage -> /depannage/saint-malo
    // /installation -> /installation/saint-malo (si c'est un service)
    const path = href.replace(/^\//, '');
    
    // Vérifier si c'est un lien de service
    const service = services.find(s => s.slug === path);
    if (service && service.hasPage) {
      return `/${service.slug}/${currentZoneSlug}`;
    }
    
    // Pour les pages zones, rediriger vers la zone actuelle
    if (path === 'zones') {
      return `/zones/${currentZoneSlug}`;
    }
    
    return href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.webp"
              alt={`Logo ${siteConfig.name}`}
              width={50}
              height={50}
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span className="font-bold text-lg md:text-xl text-gray-900">
              {siteConfig.name}
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={getNavHref(item.href)}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Téléphone */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.phoneLink}
              className="hidden sm:flex items-center gap-2 btn-phone"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span>{siteConfig.phone}</span>
            </a>

            {/* Menu Mobile Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={getNavHref(item.href)}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={siteConfig.phoneLink}
                className="mx-4 mt-2 btn-phone text-center"
              >
                📞 {siteConfig.phone}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

