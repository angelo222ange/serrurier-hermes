"use client";

import { useRef, useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { regionConfigs, zonesToulouse } from "@/config/site";

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION TOULOUSE
// ═══════════════════════════════════════════════════════════════════════════
const toulouseConfig = regionConfigs.toulouse;
const { phone, phoneLink } = toulouseConfig;

// Marques partenaires avec images du dossier marques
const brands = [
  { name: "Vachette", logo: "/images/marques/serrurier-vachette.webp" },
  { name: "Bricard", logo: "/images/marques/serrurier-bricard-serrure.webp" },
  { name: "Picard", logo: "/images/marques/serrurier-picard-serrure.webp" },
  { name: "Fichet", logo: "/images/marques/serrure-fichet-serrurier-toulouse.webp" },
  { name: "Yale", logo: "/images/marques/serrurier-yale-serrure.webp" },
  { name: "Mul-T-Lock", logo: "/images/marques/serrurier-mult-t-lock-serrure.webp" },
  { name: "Abus", logo: "/images/marques/serrurier-abus-marque.webp" },
  { name: "JPM", logo: "/images/marques/serrurier-jpm.webp" },
  { name: "DOM", logo: "/images/marques/serrure-dom-serrurier-toulouse.webp" },
  { name: "Héraclès", logo: "/images/marques/serrurier-heracles-serrure.webp" },
  { name: "Pollux", logo: "/images/marques/serrurier-pollux.webp" },
  { name: "Motura", logo: "/images/marques/serrurier-motura-serrure.webp" },
];

// Services avec prix attractifs pour Google Ads
const services = [
  {
    id: "ouverture-porte",
    name: "Ouverture de Porte",
    shortDesc: "Porte claquée, fermée à clé, perte de clés...",
    icon: "🚪",
    priceFrom: 69,
    image: "/images/services/serrurier-porte-claquer-serrurier-hermes.webp",
  },
  {
    id: "porte-blindee",
    name: "Porte Blindée",
    shortDesc: "Ouverture et installation porte blindée",
    icon: "🛡️",
    priceFrom: 149,
    image: "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
  },
  {
    id: "changement-serrure",
    name: "Changement de Serrure",
    shortDesc: "Remplacement serrure toutes marques",
    icon: "🔐",
    priceFrom: 89,
    image: "/images/services/changement-serrure-serrurier-hermes.webp",
  },
  {
    id: "depannage",
    name: "Dépannage Urgent",
    shortDesc: "Intervention rapide 24h/24, 7j/7",
    icon: "🔧",
    priceFrom: 59,
    image: "/images/services/depannage-serrurier-urgence-nuit-hermes.webp",
  },
  {
    id: "cylindre",
    name: "Remplacement Cylindre",
    shortDesc: "Cylindre haute sécurité anti-crochetage",
    icon: "🔑",
    priceFrom: 79,
    image: "/images/services/changement-de-barillet-serrurier-hermes.webp",
  },
  {
    id: "serrure-multipoints",
    name: "Serrure Multipoints",
    shortDesc: "Installation serrure 3 ou 5 points",
    icon: "🛠️",
    priceFrom: 189,
    image: "/images/services/reparation-serrure-serrurier-hermes.webp",
  },
];

// Avis clients Toulouse
const reviews = [
  {
    name: "Pierre Duval",
    rating: 5,
    date: "il y a 1 semaine",
    visitDate: "janvier 2026",
    text: "Bloqué devant ma porte à 22h, le serrurier est arrivé en 15 minutes. Travail propre, porte ouverte sans aucun dégât. Prix conforme au devis. Excellent service !",
    location: "Toulouse Centre",
    service: "Ouverture de porte",
  },
  {
    name: "Marie-Claire Lefebvre",
    rating: 5,
    date: "il y a 2 semaines",
    visitDate: "janvier 2026",
    text: "Changement de serrure suite à cambriolage. L'artisan était très professionnel et rassurant. Travail soigné avec une serrure de qualité. Je recommande !",
    location: "Balma",
    service: "Changement serrure",
  },
  {
    name: "Jean-Michel Roux",
    rating: 5,
    date: "il y a 3 semaines",
    visitDate: "décembre 2025",
    text: "Intervention rapide pour une clé cassée dans la serrure. Le serrurier a extrait la clé et remplacé le cylindre. Très satisfait du service.",
    location: "Blagnac",
    service: "Extraction clé",
  },
  {
    name: "Sophie Bernard",
    rating: 5,
    date: "il y a 1 mois",
    visitDate: "décembre 2025",
    text: "Installation d'une porte blindée dans mon appartement. Équipe ponctuelle et travail impeccable. Le rapport qualité-prix est excellent.",
    location: "Colomiers",
    service: "Porte blindée",
  },
  {
    name: "Laurent Martinez",
    rating: 5,
    date: "il y a 1 mois",
    visitDate: "décembre 2025",
    text: "Dépannage serrurerie en urgence un dimanche. Réponse immédiate et intervention en 20 min. Très bon service, prix raisonnable.",
    location: "Tournefeuille",
    service: "Dépannage urgent",
  },
  {
    name: "Isabelle Garcia",
    rating: 5,
    date: "il y a 2 mois",
    visitDate: "novembre 2025",
    text: "Remplacement de la serrure 3 points de ma porte d'entrée. Le serrurier m'a bien conseillé sur les marques. Travail propre et garanti.",
    location: "Ramonville",
    service: "Serrure multipoints",
  },
];

// FAQ Toulouse
const faqItems = [
  {
    question: "Quel est le délai d'intervention à Toulouse ?",
    answer: "Nous intervenons en moyenne en 20 minutes sur Toulouse et son agglomération. Notre équipe de serruriers est répartie stratégiquement pour couvrir toute la métropole toulousaine 24h/24.",
  },
  {
    question: "Quels sont vos tarifs pour une ouverture de porte à Toulouse ?",
    answer: "L'ouverture de porte claquée commence à 69€ à Toulouse. Pour une porte fermée à clé, comptez à partir de 89€. Une porte blindée nécessite un équipement spécifique et démarre à 149€. Devis gratuit et sans engagement.",
  },
  {
    question: "Intervenez-vous la nuit et le week-end ?",
    answer: "Oui, nos serruriers interviennent 24h/24 et 7j/7 à Toulouse et dans toute l'agglomération. Les tarifs restent transparents, sans majoration abusive pour les interventions nocturnes.",
  },
  {
    question: "Comment se déroule une intervention de serrurerie ?",
    answer: "1. Vous nous appelez au " + phone + ". 2. Nous vous donnons un devis gratuit par téléphone. 3. Un serrurier arrive en 20 minutes. 4. Il réalise l'intervention avec votre accord. 5. Vous payez uniquement le prix convenu.",
  },
  {
    question: "Quelles marques de serrures installez-vous ?",
    answer: "Nous travaillons avec toutes les grandes marques : Fichet, Bricard, Vachette, Yale, Mul-T-Lock, Picard, DOM, JPM... Nous vous conseillons la serrure la plus adaptée à votre besoin et budget.",
  },
  {
    question: "Proposez-vous une garantie sur vos interventions ?",
    answer: "Oui, toutes nos interventions sont garanties. Les pièces installées (serrures, cylindres) bénéficient de la garantie fabricant. Nous fournissons une facture détaillée pour chaque intervention.",
  },
];

// Couleurs d'avatar pour les avis (style Google)
const avatarColors = [
  "bg-blue-600", "bg-red-500", "bg-green-600", "bg-yellow-500",
  "bg-purple-600", "bg-pink-500", "bg-indigo-600", "bg-teal-500",
];

export default function ToulouseAdsPage() {
  const zonesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollZones = (direction: "left" | "right") => {
    if (zonesRef.current) {
      zonesRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({
        left: direction === "left" ? -350 : 350,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="pt-20 sm:pt-24">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION - Optimisé Mobile & Performance
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="accueil" className="relative min-h-[90svh] sm:min-h-[85vh] flex items-center overflow-hidden -mt-20 sm:-mt-24">
        {/* Background Image - lazy loaded with placeholder color */}
        <div className="absolute inset-0 bg-gray-900">
          <OptimizedImage
            src="/images/services/depannage-serrurier-urgence-nuit-hermes.webp"
            alt="Serrurier Toulouse - Intervention rapide 24h/24"
            fill
            className="object-cover object-center"
            priority
            quality={75}
            imageType="hero"
            fetchPriority="high"
          />
          {/* Overlay optimisé pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90 sm:bg-gradient-to-r sm:from-gray-900/95 sm:via-gray-900/75 sm:to-gray-900/50" />
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            
            {/* Badge DISPONIBLE MAINTENANT */}
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Disponible maintenant
              </span>
            </div>

            {/* H1 - SERRURIER TOULOUSE */}
            <h1 className="mb-3 sm:mb-4">
              <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                Serrurier Toulouse
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400 mt-2">
                Intervention en 20 min
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-xl leading-relaxed">
              Urgence serrurerie 24h/24, 7j/7 à Toulouse et agglomération.
              Ouverture de porte, changement de serrure, dépannage.
              <strong className="block text-white font-semibold mt-1">Devis gratuit.</strong>
            </p>

            {/* CTA Principal */}
            <div className="mb-5">
              <a 
                href={phoneLink} 
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg sm:text-xl font-bold rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-[0.98]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <span>{phone}</span>
              </a>
              <p className="mt-2.5 text-emerald-400/90 text-sm font-medium">
                ✓ Devis gratuit · ✓ Sans engagement · ✓ Disponible maintenant
              </p>
            </div>

            {/* Badges de réassurance - Ligne unique horizontale */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                ⚡ 20 min
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                🕐 24h/24
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                💰 Devis gratuit
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                ✓ Sans dégât
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                🛡️ Agréé assurance
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                <span className="text-amber-400">★</span> 4.9/5
              </span>
            </div>

            {/* Liens sections - Desktop only */}
            <div className="hidden md:flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
              <a href="#ouverture-de-porte" className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm transition-colors">
                🚪 Ouverture porte
              </a>
              <a href="#tarifs" className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm transition-colors">
                💰 Tarifs
              </a>
              <a href="#avis" className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm transition-colors">
                ⭐ Avis clients
              </a>
              <a href="#zones" className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm transition-colors">
                📍 Zones
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MARQUES SLIDESHOW
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-10 bg-gray-50 overflow-hidden">
        <div className="container mb-6">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Nos marques partenaires</h2>
            <p className="text-gray-600 text-sm">Serrures certifiées des meilleures marques</p>
          </div>
        </div>

        {/* Carousel infini */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 mx-4 sm:mx-6">
                <div className="w-20 h-14 sm:w-28 sm:h-18 relative flex items-center justify-center bg-white rounded-lg p-2 shadow-sm">
                  <OptimizedImage
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    fill
                    className="object-contain p-2 transition-all duration-300"
                    imageType="logo"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="container mt-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Marques certifiées
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Pièces d&apos;origine
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Garantie fabricant
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-10 sm:py-16 bg-white scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="badge-primary mb-3">🔧 Services</span>
            <h2 className="section-title">Nos Services de Serrurerie</h2>
            <p className="section-subtitle mx-auto text-sm sm:text-base">
              Intervention rapide à Toulouse. Prix transparents, devis gratuit.
            </p>
          </div>

          {/* Services Grid - 2 colonnes mobile, 3 desktop - Cards compactes */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id === "ouverture-porte" ? "ouverture-de-porte" : service.id}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[1/1] sm:aspect-[4/3] cursor-default scroll-mt-24"
              >
                {/* Background Image */}
                <OptimizedImage
                  src={service.image}
                  alt={service.name}
                  fill
                  loading="lazy"
                  imageType="service"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                
                {/* Content - Plus compact sur mobile */}
                <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-end">
                  <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{service.icon}</span>
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5 sm:mb-1 leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-gray-300 text-[10px] sm:text-sm mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                    {service.shortDesc}
                  </p>
                  
                  {/* Prix + CTA téléphone */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-0.5 sm:gap-1">
                      <span className="text-gray-400 text-[9px] sm:text-xs font-medium">dès</span>
                      <span className="text-base sm:text-lg font-bold text-white">{service.priceFrom}€</span>
                    </div>
                    <a
                      href={phoneLink}
                      className="flex items-center gap-1 text-emerald-400 text-xs sm:text-sm font-medium hover:text-emerald-300 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                      <span className="hidden sm:inline">Appeler</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 sm:mt-10">
            <a href={phoneLink} className="btn-phone text-base sm:text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              Devis gratuit : {phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ZONES D'INTERVENTION CAROUSEL
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="zones" className="section bg-gray-50 overflow-hidden scroll-mt-20">
        <div className="container">
          {/* Header avec flèches de navigation */}
          <div className="mb-6 sm:mb-10">
            {/* Titre et navigation sur la même ligne */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <span className="badge-primary">📍 Zones d&apos;intervention</span>
              
              {/* Navigation buttons - Visible sur mobile ET desktop */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => scrollZones("left")}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-colors shadow-sm active:scale-95"
                  aria-label="Défiler vers la gauche"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollZones("right")}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-colors shadow-sm active:scale-95"
                  aria-label="Défiler vers la droite"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <h2 className="section-title text-xl sm:text-2xl md:text-3xl">Serrurier dans toute l&apos;agglomération toulousaine</h2>
            <p className="section-subtitle mt-2 text-sm sm:text-base">
              Intervention en 20 min à Toulouse et communes environnantes.
            </p>
          </div>

          {/* Carrousel horizontal */}
          <div
            ref={zonesRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
          >
            {zonesToulouse.map((zone) => (
              <div
                key={zone.slug}
                className="flex-shrink-0 snap-start w-[200px] sm:w-[240px] group cursor-default"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  {/* Image */}
                  <OptimizedImage
                    src={zone.image}
                    alt={`Serrurier ${zone.name}`}
                    fill
                    loading="lazy"
                    imageType="thumbnail"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Temps d'intervention */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    {zone.time}
                  </div>
                  
                  {/* Nom de la zone */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      Serrurier {zone.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{zone.postalCode}</p>
                  </div>
                </div>

                {/* CTA téléphone sous la card */}
                <a
                  href={phoneLink}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  Appeler
                </a>
              </div>
            ))}
          </div>

          {/* Bandeau urgence */}
          <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              Besoin d&apos;un serrurier en urgence à Toulouse ?
            </h3>
            <p className="text-emerald-100 mb-5">
              Intervention rapide 24h/24 dans toute l&apos;agglomération toulousaine
            </p>
            <a href={phoneLink} className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AVIS CLIENTS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="avis" className="section bg-[#0f0f0f] overflow-hidden scroll-mt-20">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <OptimizedImage
                  src="/images/avis-google-rideau-metallique.webp"
                  alt="Google"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="rounded"
                  imageType="thumbnail"
                />
                <span className="text-white/80 text-sm font-medium">Avis Google</span>
              </div>
              <h2 className="section-title text-white">Avis clients Toulouse</h2>
              <p className="section-subtitle mt-2 text-white/60">
                Découvrez les témoignages de nos clients à Toulouse et environs.
              </p>
            </div>
            
            {/* Note Google + Navigation */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] rounded-xl border border-white/10">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="border-l border-white/20 pl-3">
                  <p className="font-bold text-white">4.9/5</p>
                  <p className="text-xs text-white/50">127 avis</p>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => scrollReviews("left")}
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex items-center justify-center transition-colors"
                  aria-label="Défiler vers la gauche"
                >
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollReviews("right")}
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex items-center justify-center transition-colors"
                  aria-label="Défiler vers la droite"
                >
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Carrousel des avis */}
          <div
            ref={reviewsRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start w-[300px] sm:w-[350px] bg-[#1a1a1a] rounded-xl p-5 border border-white/10"
              >
                {/* Header de l'avis */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-medium text-lg`}>
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{review.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-white/60">Avis de</span>
                        <OptimizedImage
                          src="/images/avis-google-rideau-metallique.webp"
                          alt="Google"
                          width={14}
                          height={14}
                          loading="lazy"
                          className="rounded-sm"
                          imageType="thumbnail"
                        />
                        <span className="text-xs text-white/60">Google</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Note et date */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white font-medium text-sm">{review.rating}/5</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-white/20'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/50 text-xs">·</span>
                  <span className="text-white/50 text-xs">{review.date}</span>
                </div>

                {/* Texte de l'avis */}
                <p className="text-white/90 text-sm leading-relaxed mb-3">
                  {review.text}
                </p>

                {/* Service et localisation */}
                <div className="flex flex-wrap gap-2">
                  {review.service && (
                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/70">
                      {review.service}
                    </span>
                  )}
                  {review.location && (
                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/70">
                      📍 {review.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TARIFS SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="tarifs" className="section bg-white scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="badge-primary mb-4">💰 Tarifs</span>
            <h2 className="section-title">Nos Tarifs Transparents</h2>
            <p className="section-subtitle mx-auto">
              Tarifs transparents pour tous nos services de serrurerie à Toulouse. Devis gratuit avant intervention.
            </p>
          </div>

          {/* Tarifs Grid */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {/* Ouverture de porte */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
                <h3 className="font-bold text-white text-lg">Ouverture de porte</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Porte claquée (sans dégât)</span>
                    <span className="font-bold text-emerald-700">69€</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Porte fermée à clé</span>
                    <span className="font-bold text-emerald-700">89€</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Porte blindée</span>
                    <span className="font-bold text-emerald-700">149€</span>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-700 text-sm font-medium">Porte cave/garage</span>
                    <span className="font-bold text-emerald-700">79€</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Changement de serrure */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
                <h3 className="font-bold text-white text-lg">Changement de serrure</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Cylindre simple</span>
                    <span className="font-bold text-emerald-700">89€</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Serrure standard</span>
                    <span className="font-bold text-emerald-700">119€</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Serrure 3 points</span>
                    <span className="font-bold text-emerald-700">189€</span>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-700 text-sm font-medium">Serrure 5 points</span>
                    <span className="font-bold text-emerald-700">sur devis</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dépannage & Réparation */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
                <h3 className="font-bold text-white text-lg">Dépannage & Réparation</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Extraction clé cassée</span>
                    <span className="font-bold text-emerald-700">69€</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Réparation serrure</span>
                    <span className="font-bold text-emerald-700">79€</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm font-medium">Dégrippage/ajustement</span>
                    <span className="font-bold text-emerald-700">59€</span>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-700 text-sm font-medium">Serrure A2P</span>
                    <span className="font-bold text-emerald-700">sur devis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Note importante */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Devis gratuit et sans engagement
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Les tarifs indiqués sont donnés à titre indicatif. Un devis précis vous sera communiqué 
                  par téléphone ou sur place avant toute intervention. Pas de frais cachés.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Devis gratuit
                  </span>
                  <span className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Prix fixe avant intervention
                  </span>
                  <span className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Paiement CB accepté
                  </span>
                </div>
              </div>
              
              <div className="w-full lg:w-auto">
                <a href={phoneLink} className="btn-phone w-full lg:w-auto justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  Demander un devis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <FAQSection items={faqItems} phone={phone} phoneLink={phoneLink} />
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT FAQ (inline pour éviter les liens)
// ═══════════════════════════════════════════════════════════════════════════
function FAQSection({ items, phone, phoneLink }: { items: typeof faqItems, phone: string, phoneLink: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  return (
    <section id="faq" className="section bg-white scroll-mt-20">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left - Header & CTA */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <span className="badge-primary mb-4">❓ FAQ</span>
            <h2 className="section-title">Questions Fréquentes</h2>
            <p className="section-subtitle mb-8">
              Retrouvez les réponses aux questions les plus fréquentes sur nos services de serrurerie à Toulouse.
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Vous avez une autre question ?
              </h3>
              <p className="text-gray-600 text-sm mb-5">
                Notre équipe est disponible 24h/24 pour répondre à toutes vos questions.
              </p>
              <a href={phoneLink} className="btn-phone w-full justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                {phone}
              </a>
            </div>
          </div>

          {/* Right - FAQ Items */}
          <div className="lg:col-span-3 space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className={`
                  rounded-xl overflow-hidden transition-all duration-300
                  ${openIndex === index 
                    ? 'bg-emerald-50 ring-2 ring-emerald-500 ring-opacity-50' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`font-semibold pr-4 transition-colors ${
                    openIndex === index ? 'text-emerald-700' : 'text-gray-900'
                  }`}>
                    {item.question}
                  </span>
                  <span 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      transition-all duration-300
                      ${openIndex === index 
                        ? 'bg-emerald-500 text-white rotate-45' 
                        : 'bg-white text-gray-600'
                      }
                    `}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                
                {/* Answer */}
                <div 
                  className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-5 pb-5">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
