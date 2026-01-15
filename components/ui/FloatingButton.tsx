"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getRegionFromSlug, getRegionConfig, getZoneBySlug } from "@/lib/cityConfig";

interface FloatingButtonProps {
  /** Slug de la ville courante pour le numéro de téléphone contextuel */
  citySlug?: string;
}

export function FloatingButton({ citySlug: propCitySlug }: FloatingButtonProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  
  // Extraire le citySlug de l'URL si pas fourni en props
  const extractCitySlugFromPath = (): string | null => {
    if (propCitySlug) return propCitySlug;
    
    const match = pathname.match(/^\/serrurier-([^\/]+)/);
    return match ? match[1] : null;
  };
  
  const citySlug = extractCitySlugFromPath();
  
  // Déterminer le numéro de téléphone selon le contexte
  let phone: string = siteConfig.phone;
  let phoneLink: string = siteConfig.phoneLink;
  
  if (citySlug) {
    const zone = getZoneBySlug(citySlug);
    if (zone) {
      const region = getRegionFromSlug(citySlug);
      const regionConfig = getRegionConfig(region);
      phone = regionConfig.phone;
      phoneLink = regionConfig.phoneLink;
    }
  }

  useEffect(() => {
    // Afficher après un léger délai pour l'animation d'entrée
    const showTimer = setTimeout(() => setIsVisible(true), 500);
    
    // Réduire automatiquement après 5 secondes
    const collapseTimer = setTimeout(() => setIsExpanded(false), 5000);

    // Afficher/masquer en fonction du scroll
    const handleScroll = () => {
      // Masquer si on est tout en haut
      if (window.scrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(collapseTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href={phoneLink}
      className={`
        fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50
        flex items-center gap-2.5
        bg-emerald-600 text-white
        rounded-full shadow-2xl shadow-emerald-600/40
        hover:bg-emerald-700 hover:scale-105 hover:shadow-emerald-600/50
        active:scale-95
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        ${isExpanded ? 'px-5 py-4' : 'p-4'}
      `}
      aria-label={`Appeler le ${phone}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full animate-ping bg-emerald-500 opacity-30" />
      
      {/* Icon */}
      <span className="relative flex items-center justify-center">
        <svg 
          className={`transition-transform duration-300 ${isExpanded ? 'w-5 h-5' : 'w-6 h-6'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
          />
        </svg>
      </span>
      
      {/* Text - visible when expanded */}
      <span 
        className={`
          relative font-bold whitespace-nowrap overflow-hidden transition-all duration-300
          ${isExpanded ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
        `}
      >
        <span className="block text-sm sm:text-base">Urgence 24/7</span>
        <span className="block text-xs font-medium text-emerald-50">
          {phone}
        </span>
      </span>
    </a>
  );
}
