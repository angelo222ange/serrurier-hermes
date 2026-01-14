"use client";

import { useRef } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteConfig, zones } from "@/config/site";

interface ZoneData {
  name: string;
  slug: string;
  postalCode?: string;
  image?: string;
  time?: string;
  isMain?: boolean;
}

interface ZonesProps {
  title?: string;
  subtitle?: string;
  displayZones?: ZoneData[];
  limit?: number;
  city?: string;
  phone?: string;
  phoneLink?: string;
}

export function Zones({
  title = "Zones d'intervention",
  subtitle,
  displayZones,
  limit = 12,
  city,
  phone,
  phoneLink,
}: ZonesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayCity = city || siteConfig.city;
  const displayPhone = phone || siteConfig.phone;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  const defaultSubtitle = `Nous intervenons à ${displayCity} et dans toute l'agglomération. Intervention rapide en 20 minutes.`;
  
  // Utiliser les zones fournies ou les zones par défaut
  const zonesToDisplay: ZoneData[] = displayZones || zones.slice(0, limit).map(z => ({
    name: z.name,
    slug: z.slug,
    postalCode: z.postalCode,
    time: z.time || "20 min",
    image: z.image,
  }));

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="badge-primary mb-4">📍 Zones</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle mt-2">
              {subtitle || defaultSubtitle}
            </p>
          </div>
          
          {/* Navigation buttons - Desktop */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Défiler vers la gauche"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Défiler vers la droite"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carrousel horizontal */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {zonesToDisplay.map((zone, index) => (
            <Link
              key={zone.slug}
              href={`/serrurier-${zone.slug}`}
              className="flex-shrink-0 snap-start w-[200px] sm:w-[240px] group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                {/* Image ou placeholder */}
                {zone.image ? (
                  <>
                    <OptimizedImage
                      src={zone.image}
                      alt={`Serrurier ${zone.name}`}
                      fill
                      loading="lazy"
                      imageType="thumbnail"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay subtil pour meilleure lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                )}
                
                {/* Temps d'intervention */}
                {zone.time && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    {zone.time}
                  </div>
                )}
                
                {/* Nom de la zone */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {zone.name}
                  </h3>
                  {zone.postalCode && (
                    <p className="text-gray-300 text-sm">{zone.postalCode}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Lien voir toutes les zones */}
        <div className="text-center mt-8">
          <Link 
            href="/zones" 
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Voir toutes nos zones d&apos;intervention
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Bandeau urgence */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 sm:p-8 text-white text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            Besoin d&apos;un serrurier en urgence ?
          </h3>
          <p className="text-emerald-100 mb-5">
            Intervention rapide 24h/24 dans toute l&apos;agglomération de {displayCity}
          </p>
          <a href={displayPhoneLink} className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
            {displayPhone}
          </a>
        </div>

        {/* Flèches et bulles décoratives */}
        <div className="relative mt-12 pt-8 pb-4">
          {/* Flèches vers le bas */}
          <div className="flex justify-center gap-4 mb-6">
            <svg className="w-6 h-6 text-emerald-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <svg className="w-6 h-6 text-emerald-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <svg className="w-6 h-6 text-emerald-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Bulles décoratives */}
          <div className="flex justify-center items-center gap-3 flex-wrap">
            <div className="w-3 h-3 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-80 animate-pulse"></div>
            <div className="w-4 h-4 bg-emerald-300 rounded-full opacity-50 animate-pulse"></div>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full opacity-70 animate-pulse"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-300 rounded-full opacity-80 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
