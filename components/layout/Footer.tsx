"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig, services } from "@/config/site";
import { getRegionFromSlug, getRegionConfig, getZoneBySlug } from "@/lib/cityConfig";

interface FooterProps {
  /** Slug de la ville courante pour les liens contextuels */
  citySlug?: string;
}

export function Footer({ citySlug: propCitySlug }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // Extraire le citySlug de l'URL si pas fourni en props
  const extractCitySlugFromPath = (): string | null => {
    if (propCitySlug) return propCitySlug;
    
    const match = pathname.match(/^\/serrurier-([^\/]+)/);
    return match ? match[1] : null;
  };
  
  const citySlug = extractCitySlugFromPath();
  
  // Déterminer si on est sur la homepage
  const isHomepage = pathname === '/';
  const isTarifsPage = pathname === '/tarifs';
  const isGenericServicePage = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length === 1 && ['depannage', 'installation', 'changement-serrure', 'ouverture-de-porte', 'blindage-porte', 'remplacement-cylindre'].includes(segments[0]);
  };
  const isGenericPage = isHomepage || isTarifsPage || isGenericServicePage();
  
  // Lien contact contextuel : si on a un citySlug, pointer vers la page contact locale
  const contactLink = citySlug ? `/serrurier-${citySlug}/contact` : "/contact";
  
  // Déterminer le numéro de téléphone et le nom de ville selon le contexte
  let phone: string = siteConfig.phone;
  let phoneLink: string = siteConfig.phoneLink;
  let cityName: string | null = siteConfig.city;
  
  // Sur la homepage, page tarifs ou pages génériques de services, ne pas afficher de ville
  if (isGenericPage) {
    cityName = null;
  } else if (citySlug) {
    const zone = getZoneBySlug(citySlug);
    if (zone) {
      cityName = zone.name;
      const region = getRegionFromSlug(citySlug);
      const regionConfig = getRegionConfig(region);
      phone = regionConfig.phone;
      phoneLink = regionConfig.phoneLink;
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Colonne 1 - À propos */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logos/serrurier-hermes-logo.webp"
                alt={`Logo Serrurier Hermès`}
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <span className="font-bold text-lg block">Serrurier Hermès</span>
                {cityName && (
                  <span className="text-gray-400 text-sm">{cityName}</span>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {cityName ? (
                <>Votre serrurier de confiance à {cityName}. Intervention rapide 24h/24 et 7j/7 pour tous vos besoins en serrurerie.</>
              ) : (
                <>Votre serrurier de confiance. Intervention rapide 24h/24 et 7j/7 pour tous vos besoins en serrurerie.</>
              )}
            </p>
            
            {/* Badges de confiance */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs font-medium">
                <span className="text-emerald-400">✓</span> 24h/24
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs font-medium">
                <span className="text-amber-400">★</span> {siteConfig.reviews?.rating || 4.9}/5
              </span>
            </div>
          </div>

          {/* Colonne 2 - Services */}
          <div>
            <h3 className="font-bold text-base mb-4 text-white">Nos Services</h3>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="text-base">{service.icon}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h3 className="font-bold text-base mb-4 text-white">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={phoneLink} 
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Téléphone</p>
                    <p className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                      {phone}
                    </p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Horaires</p>
                  <p className="text-white font-medium">{siteConfig.openingHours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} Serrurier Hermès. Tous droits réservés.
            </p>
              <p className="text-gray-500 text-xs mt-1">
                Plateforme de mise en relation · Interventions réalisées par des artisans partenaires
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/cgu" className="text-gray-400 hover:text-white transition-colors">
                CGU
              </Link>
              <Link href="/confidentialite" className="text-gray-400 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link href={contactLink} className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
