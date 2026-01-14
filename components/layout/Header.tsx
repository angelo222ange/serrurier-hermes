"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteConfig, navigation, zones, services } from "@/config/site";
import { getRegionFromSlug, getRegionConfig, getZoneBySlug, getCityParent } from "@/lib/cityConfig";

const servicesSlugs: string[] = services.map(s => s.slug);

interface HeaderProps {
  /** Slug de la ville courante pour le numéro de téléphone contextuel */
  citySlug?: string;
}

export function Header({ citySlug: propCitySlug }: HeaderProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Extraire le citySlug de l'URL si pas fourni en props
  const extractCitySlugFromPath = (): string | null => {
    if (propCitySlug) return propCitySlug;
    
    // Détecter les URLs /serrurier-[city]
    const match = pathname.match(/^\/serrurier-([^\/]+)/);
    if (match) return match[1];
    
    // Détecter les URLs /service/paris
    const serviceParisMatch = pathname.match(/^\/([^\/]+)\/paris/);
    if (serviceParisMatch && servicesSlugs.includes(serviceParisMatch[1])) {
      return 'paris-1'; // Utiliser paris-1 comme slug par défaut pour Paris
    }
    
    return null;
  };
  
  const citySlug = extractCitySlugFromPath();
  
  // Calculer l'URL du logo (retour à la page parent de la région)
  const homeUrl = citySlug ? getCityParent(citySlug) : '/';
  
  // Déterminer si on est sur la homepage
  const isHomepage = pathname === '/';
  
  // Liste des routes de services statiques (pages génériques sans ville)
  const genericServiceRoutes = [
    '/depannage',
    '/installation',
    '/changement-serrure',
    '/ouverture-de-porte',
    '/blindage-porte',
    '/remplacement-cylindre',
    '/tarifs',
  ];
  
  // Déterminer si on est sur une page de service générique (sans ville) ou tarifs
  const isGenericServicePage = () => {
    const segments = pathname.split('/').filter(Boolean);
    // Normaliser le pathname (enlever le slash final)
    const normalizedPath = pathname.replace(/\/$/, '') || '/';
    // Si on est sur une route de service générique
    if (genericServiceRoutes.includes(normalizedPath)) {
      return true;
    }
    // Si le premier segment est un service et qu'il n'y a pas de deuxième segment (ville)
    if (segments.length === 1 && servicesSlugs.includes(segments[0])) {
      return true;
    }
    // Si le premier segment est un service et le deuxième n'est pas une zone connue
    if (segments.length === 2 && servicesSlugs.includes(segments[0])) {
      const secondSegment = segments[1];
      // Si c'est "paris", c'est une page service/paris, donc on affiche Paris (pas générique)
      if (secondSegment === 'paris') {
        return false;
      }
      // Si ce n'est pas une zone connue, c'est une page générique
      const isZone = zones.some(z => z.slug === secondSegment);
      return !isZone;
    }
    return false;
  };
  
  const isGenericService = isGenericServicePage();
  
  // Déterminer le numéro de téléphone selon le contexte
  let phone: string = siteConfig.phone;
  let phoneLink: string = siteConfig.phoneLink;
  let cityName: string | null = siteConfig.city;
  
  // Sur la homepage ou les pages génériques de services, ne pas afficher de ville
  if (isHomepage || isGenericService) {
    cityName = null;
  } else if (citySlug) {
    // Pour les pages /service/paris, afficher "Paris"
    if (pathname.match(/^\/([^\/]+)\/paris/)) {
      cityName = 'Paris';
      const regionConfig = getRegionConfig('paris');
      phone = regionConfig.phone;
      phoneLink = regionConfig.phoneLink;
    } else {
      const zone = getZoneBySlug(citySlug);
      if (zone) {
        cityName = zone.name;
        const region = getRegionFromSlug(citySlug);
        const regionConfig = getRegionConfig(region);
        phone = regionConfig.phone;
        phoneLink = regionConfig.phoneLink;
      }
    }
  }

  // Détecter le scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Détecter le slug de zone depuis l'URL
  const getZoneSlugFromPath = (): string | null => {
    const segments = pathname.split('/').filter(Boolean);
    
    if (segments[0] === 'zones' && segments[1]) {
      const zone = zones.find(z => z.slug === segments[1]);
      if (zone && !('isMain' in zone && zone.isMain)) return zone.slug;
    }
    
    if (segments.length >= 2 && servicesSlugs.includes(segments[0])) {
      const zone = zones.find(z => z.slug === segments[1]);
      if (zone && !('isMain' in zone && zone.isMain)) return zone.slug;
    }
    
    return null;
  };

  const currentZoneSlug = getZoneSlugFromPath();

  const getNavHref = (href: string): string => {
    // Si on a un citySlug (page de ville), on crée des liens contextuels
    if (citySlug) {
      const region = getRegionFromSlug(citySlug);
      const regionName = region === 'paris' ? 'paris' : region === 'bordeaux' ? 'bordeaux' : 'montpellier';
      
      // Gestion du lien Contact
      if (href === '/contact') {
        return `/serrurier-${citySlug}/contact`;
      }
      
      // Gestion des liens Services
      const path = href.replace(/^\//, '');
      const service = services.find(s => s.slug === path);
      if (service && service.hasPage) {
        return `/serrurier-${citySlug}/${service.slug}`;
      }
      
      // Gestion du lien Dépannage
      if (href === '/depannage') {
        return `/${regionName}/depannage`;
      }
      
      // Gestion du lien Installation
      if (href === '/installation') {
        return `/${regionName}/installation`;
      }
      
      // Gestion du lien Tarifs
      if (href === '/tarifs') {
        return `/${regionName}/tarifs`;
      }
      
      // Gestion du lien Zones
      if (path === 'zones') {
        return `/serrurier-${citySlug}`;
      }
    }
    
    // Sinon, utiliser les liens par défaut
    return href;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md' 
            : 'bg-white'
        }`}
      >
        {/* Bandeau de réassurance - Desktop */}
        <div className="hidden sm:block bg-gray-900 text-white py-1.5">
          <div className="container">
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                24h/24, 7j/7
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                Intervention en 20 min
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400">★</span>
                {siteConfig.reviews?.rating || 4.9}/5 ({siteConfig.reviews?.count || 127} avis)
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                Devis gratuit
              </span>
            </div>
          </div>
        </div>

        {/* Header principal */}
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href={homeUrl} className="flex items-center gap-2 sm:gap-3">
              <OptimizedImage
                src="/images/logos/serrurier-hermes-logo.webp"
                alt={`Logo ${siteConfig.name}`}
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                priority
                imageType="logo"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg text-gray-900 leading-tight">
                  Serrurier Hermès
                </span>
                {cityName && (
                  <span className="text-xs text-gray-500 leading-tight">
                    {cityName}
                  </span>
                )}
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={getNavHref(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    pathname === item.href ? 'text-primary-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Téléphone - Desktop */}
            <div className="flex items-center gap-3">
              <a
                href={phoneLink}
                className="hidden sm:flex btn-phone-pulse"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <span>{phone}</span>
              </a>

              {/* Menu Mobile Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 -mr-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
        </div>
      </header>

      {/* Menu Mobile - Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu Mobile - Slide Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header du menu */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="font-bold text-gray-900">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-gray-900"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={getNavHref(item.href)}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-6 py-4 text-base font-medium transition-colors border-l-4 ${
                  pathname === item.href 
                    ? 'bg-primary-50 text-primary-600 border-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50 border-transparent'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <a
              href={phoneLink}
              className="flex items-center justify-center gap-2 w-full btn-phone text-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              {phone}
            </a>
            <p className="text-center text-xs text-gray-500 mt-2">
              Disponible 24h/24 • Intervention 20 min
            </p>
          </div>
        </div>
      </div>

      {/* Spacer pour le contenu - réduit car le Hero est collé */}
      <div className="sm:h-[38px]" />
    </>
  );
}
