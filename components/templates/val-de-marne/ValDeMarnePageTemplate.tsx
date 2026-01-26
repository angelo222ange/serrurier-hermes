"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
interface CityConfig {
  name: string;
  slug: string;
  postalCode: string;
  phone: string;
  phoneLink: string;
  heroImage: string;
  neighborCities: { name: string; time: string; image?: string }[];
}

interface ValDeMarnePageProps {
  city: CityConfig;
}

// ═══════════════════════════════════════════════════════════════════════════
// MARQUES PARTENAIRES
// ═══════════════════════════════════════════════════════════════════════════
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
];

// ═══════════════════════════════════════════════════════════════════════════
// ASSURANCES PARTENAIRES
// ═══════════════════════════════════════════════════════════════════════════
const insurances = [
  { name: "AXA", logo: "/images/serrurier-assurance-axa.webp" },
  { name: "Allianz", logo: "/images/serrurier-assurance-allianz.webp" },
  { name: "MAIF", logo: "/images/serrurier-assurance-maif.webp" },
  { name: "MACIF", logo: "/images/serrurier-assurance-macif.webp" },
  { name: "Groupama", logo: "/images/serrurier-assurance-groupama.webp" },
  { name: "Generali", logo: "/images/serrurier-assurance-generali.webp" },
  { name: "Matmut", logo: "/images/serrurier-assurance-matmut.webp" },
  { name: "MMA", logo: "/images/serrurier-assurance-mma.webp" },
  { name: "Aviva", logo: "/images/serrurier-assurance-aviva.webp" },
  { name: "SMACL", logo: "/images/serrurier-assurance-smacl.webp" },
  { name: "Swiss Life", logo: "/images/serrurier-swisslife-assurance.webp" },
  { name: "La Banque Postale", logo: "/images/serrurier-assurance-la-banque-postale.webp" },
  { name: "LCL", logo: "/images/serrurier-assurance-lcl-assurances.webp" },
  { name: "Crédit Agricole", logo: "/images/serrurier-assurances-credit-agricole.webp" },
  { name: "BNP Paribas", logo: "/images/serrurier-assurance-bnp-paribas-cardif.webp" },
  { name: "Société Générale", logo: "/images/serrurier-assurance-societe-generale.webp" },
];

// ═══════════════════════════════════════════════════════════════════════════
// SERVICES AVEC IMAGES
// ═══════════════════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════════════════
// IMAGES D'AVATAR POUR LES AVIS (3 premiers avec photo)
// ═══════════════════════════════════════════════════════════════════════════
const reviewAvatars = [
  "/images/avis-serrurier-hermes-toulouse-lg.webp", // Femme
  "/images/avis-serrurier-hermes-toulouse-2.webp",
  "/images/avis-client-serrurier-hermes-toulouse-md.webp", // Femme
];

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR D'AVIS LOCALISÉS
// ═══════════════════════════════════════════════════════════════════════════
const generateLocalizedReviews = (cityName: string) => [
  {
    name: "Marie Leroy",
    rating: 5,
    date: "il y a 1 semaine",
    visitDate: "janvier 2026",
    text: `Porte claquée à ${cityName}, le serrurier est arrivé en 18 minutes. Travail impeccable, ouverture sans dégât. Prix conforme au devis annoncé. Je recommande vivement !`,
    location: cityName,
    service: "Ouverture de porte",
    hasAvatar: true,
    avatarIndex: 0,
  },
  {
    name: "Thomas Martin",
    rating: 5,
    date: "il y a 2 semaines",
    visitDate: "janvier 2026",
    text: `Suite à une tentative d'effraction à ${cityName}, j'ai fait appel à leurs services. Intervention rapide et professionnelle. La nouvelle serrure est de très bonne qualité.`,
    location: cityName,
    service: "Changement serrure",
    hasAvatar: true,
    avatarIndex: 1,
  },
  {
    name: "Sophie Dubois",
    rating: 5,
    date: "il y a 3 semaines",
    visitDate: "décembre 2025",
    text: `Serrurier très professionnel intervenu à ${cityName} un dimanche soir. Clé cassée dans la serrure, extraite et cylindre changé en moins de 30 minutes. Excellent service !`,
    location: cityName,
    service: "Extraction clé",
    hasAvatar: true,
    avatarIndex: 2,
  },
  {
    name: "Pierre Bernard",
    rating: 5,
    date: "il y a 1 mois",
    visitDate: "décembre 2025",
    text: `Installation d'une serrure multipoints dans mon appartement à ${cityName}. Artisan ponctuel, travail soigné et conseils avisés sur le choix de la serrure. Très satisfait !`,
    location: cityName,
    service: "Serrure multipoints",
    hasAvatar: false,
  },
  {
    name: "Laurent Moreau",
    rating: 5,
    date: "il y a 1 mois",
    visitDate: "décembre 2025",
    text: `Dépannage urgent à ${cityName} en pleine nuit. Le serrurier est arrivé rapidement et a résolu mon problème de porte blindée. Service 5 étoiles !`,
    location: cityName,
    service: "Dépannage urgent",
    hasAvatar: false,
  },
  {
    name: "Nathalie Petit",
    rating: 5,
    date: "il y a 2 mois",
    visitDate: "novembre 2025",
    text: `Blindage de ma porte d'entrée à ${cityName}. Équipe très professionnelle, travail de qualité. Je me sens beaucoup plus en sécurité maintenant. Merci !`,
    location: cityName,
    service: "Porte blindée",
    hasAvatar: false,
  },
];

// FAQ localisée
const generateFAQ = (cityName: string, phone: string) => [
  {
    question: `Quel est le délai d'intervention à ${cityName} ?`,
    answer: `Nous intervenons en moyenne en 15 à 20 minutes à ${cityName} et dans tout le Val-de-Marne. Notre équipe de serruriers est positionnée stratégiquement pour une couverture optimale 24h/24.`,
  },
  {
    question: `Quels sont vos tarifs pour une ouverture de porte à ${cityName} ?`,
    answer: `L'ouverture de porte claquée commence à 69€ à ${cityName}. Pour une porte fermée à clé, comptez à partir de 89€. Une porte blindée démarre à 149€. Devis gratuit et sans engagement.`,
  },
  {
    question: "Intervenez-vous la nuit et le week-end ?",
    answer: `Oui, nos serruriers interviennent 24h/24 et 7j/7 à ${cityName} et dans tout le Val-de-Marne. Les tarifs restent transparents, sans majoration abusive pour les interventions nocturnes.`,
  },
  {
    question: "Comment se déroule une intervention de serrurerie ?",
    answer: `1. Vous nous appelez au ${phone}. 2. Nous vous donnons un devis gratuit par téléphone. 3. Un serrurier arrive en 15-20 minutes. 4. Il réalise l'intervention avec votre accord. 5. Vous payez uniquement le prix convenu.`,
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

// Couleurs d'avatar (pour les avis sans photo)
const avatarColors = [
  "bg-blue-600", "bg-rose-500", "bg-emerald-600", "bg-amber-500",
  "bg-violet-600", "bg-cyan-500", "bg-indigo-600", "bg-teal-500",
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════
export default function ValDeMarnePageTemplate({ city }: ValDeMarnePageProps) {
  const { name: cityName, phone, phoneLink, heroImage, neighborCities } = city;
  const reviewsRef = useRef<HTMLDivElement>(null);
  const reviews = generateLocalizedReviews(cityName);
  const faqItems = generateFAQ(cityName, phone);

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({
        left: direction === "left" ? -350 : 350,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="pt-20 sm:pt-24 font-[family-name:var(--font-dm-sans)]">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION - Design inspiré Plumbee
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92svh] sm:min-h-[88vh] flex items-center overflow-hidden -mt-20 sm:-mt-24">
        {/* Background Image - Image de la ville */}
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src={heroImage}
            alt={`Serrurier ${cityName} - Intervention rapide 24h/24`}
            fill
            className="object-cover object-center"
            priority
            quality={80}
            sizes="100vw"
          />
          {/* Overlay avec dégradé moderne */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-emerald-900/60" />
          {/* Motif géométrique subtil */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            
            {/* Badge DISPONIBLE */}
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white text-sm font-semibold shadow-xl shadow-emerald-500/25 border border-emerald-400/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                Disponible maintenant · 24h/24
              </span>
            </div>

            {/* H1 */}
            <h1 className="mb-4 sm:mb-5">
              <span className="block text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                Serrurier {cityName}
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400 mt-3 tracking-tight">
                Intervention en 15 min · Val-de-Marne
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-base sm:text-lg text-slate-300 mb-7 max-w-xl leading-relaxed">
              Service de serrurerie d'urgence à {cityName} ({city.postalCode}).
              Ouverture de porte, changement de serrure, dépannage.
              <strong className="block text-white font-semibold mt-2">Devis gratuit · Intervention garantie</strong>
            </p>

            {/* CTA Principal */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-lg sm:text-xl font-bold rounded-2xl shadow-2xl shadow-emerald-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <span>{phone}</span>
              </div>
              <p className="mt-3 text-emerald-400/90 text-sm font-medium">
                ✓ Devis gratuit · ✓ Sans engagement · ✓ Paiement CB accepté
              </p>
            </div>

            {/* Badges de réassurance */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {[
                { icon: "⚡", text: "15 min" },
                { icon: "🕐", text: "24h/24" },
                { icon: "💰", text: "Dès 69€" },
                { icon: "✓", text: "Sans dégât" },
                { icon: "🛡️", text: "Agréé assurance" },
                { icon: "★", text: "4.9/5", highlight: true },
              ].map((badge, i) => (
                <span 
                  key={i}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    badge.highlight 
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                      : "bg-white/10 backdrop-blur-sm text-white border border-white/10"
                  }`}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AGRÉÉ TOUTES ASSURANCES
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-10 bg-white overflow-hidden border-b border-slate-100">
        <div className="container mb-5">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-blue-700 text-sm font-bold">Agréé toutes assurances</span>
            </div>
            <p className="text-slate-600 text-sm">Prise en charge directe avec votre assurance habitation</p>
          </div>
        </div>

        {/* Carousel infini assurances */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...insurances, ...insurances].map((insurance, index) => (
              <div key={`${insurance.name}-${index}`} className="flex-shrink-0 mx-3 sm:mx-4">
                <div className="w-20 h-14 sm:w-24 sm:h-16 relative flex items-center justify-center bg-slate-50 rounded-lg p-2">
                  <Image
                    src={insurance.logo}
                    alt={`Logo ${insurance.name}`}
                    fill
                    className="object-contain p-2"
                    loading="lazy"
                    sizes="96px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MARQUES PARTENAIRES
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-10 bg-slate-50 overflow-hidden">
        <div className="container mb-5">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Marques partenaires certifiées</h2>
            <p className="text-slate-600 text-sm">Serrures haute sécurité des meilleures marques</p>
          </div>
        </div>

        {/* Carousel infini */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10" />
          
          <div className="flex animate-marquee" style={{ animationDirection: 'reverse' }}>
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 mx-4 sm:mx-6">
                <div className="w-24 h-16 sm:w-32 sm:h-20 relative flex items-center justify-center bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                  <Image
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    fill
                    className="object-contain p-3"
                    loading="lazy"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-12 sm:py-20 bg-white scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
              🔧 Nos Services
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Services de Serrurerie à {cityName}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Intervention rapide et professionnelle. Devis gratuit, prix transparents.
            </p>
          </div>

          {/* Services Grid avec images de fond */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl aspect-[1/1.1] sm:aspect-[4/3] cursor-default"
              >
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/20" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                  <span className="text-2xl sm:text-3xl mb-2">{service.icon}</span>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-3 line-clamp-2 hidden sm:block">
                    {service.shortDesc}
                  </p>
                  
                  {/* Prix + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-slate-400 text-xs font-medium">dès</span>
                      <span className="text-lg sm:text-xl font-bold text-white">{service.priceFrom}€</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs sm:text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                      <span className="hidden sm:inline">{phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Central */}
          <div className="text-center mt-10 sm:mt-14">
            <div className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-600/25">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              Devis gratuit : {phone}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ZONES D'INTERVENTION (Villes voisines avec images)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-slate-50 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
              📍 Zones d'intervention
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Serrurier à {cityName} et environs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Intervention rapide dans tout le Val-de-Marne (94)
            </p>
          </div>

          {/* Villes voisines avec images de fond */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {neighborCities.map((neighbor, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-xl aspect-[3/2] cursor-default"
              >
                {/* Image de fond de la ville */}
                {neighbor.image ? (
                  <Image
                    src={neighbor.image}
                    alt={`Serrurier ${neighbor.name}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20" />
                
                {/* Content */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
                  <p className="font-bold text-white text-sm sm:text-base leading-tight">{neighbor.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-emerald-400 text-xs font-medium">{neighbor.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bandeau urgence */}
          <div className="mt-10 sm:mt-12 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 sm:p-8 text-white text-center shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              Besoin d'un serrurier en urgence à {cityName} ?
            </h3>
            <p className="text-emerald-100 mb-5 text-sm sm:text-base">
              Intervention rapide 24h/24 dans tout le Val-de-Marne
            </p>
            <div className="inline-flex items-center gap-2.5 bg-white text-emerald-600 px-6 py-3.5 rounded-xl font-bold shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              {phone}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AVIS CLIENTS LOCALISÉS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="avis" className="py-12 sm:py-20 bg-slate-900 overflow-hidden scroll-mt-20">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* Google Logo */}
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-white/80 text-sm font-medium">Avis Google vérifiés</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Avis clients {cityName}</h2>
              <p className="text-white/60 mt-2 text-sm sm:text-base">
                Ce que disent nos clients à {cityName} et dans le Val-de-Marne
              </p>
            </div>
            
            {/* Note + Navigation */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl border border-slate-700">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="border-l border-slate-600 pl-3">
                  <p className="font-bold text-white">4.9/5</p>
                  <p className="text-xs text-white/50">127 avis</p>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => scrollReviews("left")}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Défiler vers la gauche"
                >
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollReviews("right")}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-colors"
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
                className="flex-shrink-0 snap-start w-[300px] sm:w-[350px] bg-slate-800 rounded-2xl p-5 border border-slate-700"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar - Photo pour les 3 premiers, lettre pour les autres */}
                    {review.hasAvatar && review.avatarIndex !== undefined ? (
                      <div className="w-11 h-11 rounded-full overflow-hidden relative">
                        <Image
                          src={reviewAvatars[review.avatarIndex]}
                          alt={review.name}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="44px"
                        />
                      </div>
                    ) : (
                      <div className={`w-11 h-11 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-semibold text-lg`}>
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-white text-sm">{review.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-white/50">Avis de</span>
                        {/* Google Logo Blue */}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-xs text-blue-400 font-medium">Google</span>
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
                        className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-slate-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/40 text-xs">·</span>
                  <span className="text-white/50 text-xs">{review.date}</span>
                </div>

                {/* Texte */}
                <p className="text-white/90 text-sm leading-relaxed mb-3">
                  {review.text}
                </p>

                {/* Service et localisation */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-slate-700/50 rounded-lg text-xs text-white/70 font-medium">
                    {review.service}
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-500/20 rounded-lg text-xs text-emerald-400 font-medium">
                    📍 {review.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TARIFS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="tarifs" className="py-12 sm:py-20 bg-white scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
              💰 Tarifs transparents
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nos Tarifs à {cityName}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Prix clairs et sans surprise. Devis gratuit avant toute intervention.
            </p>
          </div>

          {/* Grille tarifs */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {/* Ouverture de porte */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  🚪 Ouverture de porte
                </h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Porte claquée</span>
                    <span className="font-bold text-emerald-600 text-lg">69€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Porte fermée à clé</span>
                    <span className="font-bold text-emerald-600 text-lg">89€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Porte blindée</span>
                    <span className="font-bold text-emerald-600 text-lg">149€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5">
                    <span className="text-slate-700 text-sm font-medium">Porte cave/garage</span>
                    <span className="font-bold text-emerald-600 text-lg">79€</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Changement serrure */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  🔐 Changement serrure
                </h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Cylindre simple</span>
                    <span className="font-bold text-emerald-600 text-lg">89€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Serrure standard</span>
                    <span className="font-bold text-emerald-600 text-lg">119€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Serrure 3 points</span>
                    <span className="font-bold text-emerald-600 text-lg">189€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5">
                    <span className="text-slate-700 text-sm font-medium">Serrure 5 points</span>
                    <span className="font-bold text-emerald-600">sur devis</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dépannage */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  🔧 Dépannage & Réparation
                </h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Extraction clé cassée</span>
                    <span className="font-bold text-emerald-600 text-lg">69€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Réparation serrure</span>
                    <span className="font-bold text-emerald-600 text-lg">79€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-700 text-sm font-medium">Dégrippage/ajustement</span>
                    <span className="font-bold text-emerald-600 text-lg">59€</span>
                  </li>
                  <li className="flex items-center justify-between py-2.5">
                    <span className="text-slate-700 text-sm font-medium">Serrure A2P</span>
                    <span className="font-bold text-emerald-600">sur devis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Note importante */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Devis gratuit et sans engagement
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Les tarifs sont indicatifs. Un devis précis vous sera communiqué par téléphone ou sur place. Pas de frais cachés.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {["Devis gratuit", "Prix fixe avant intervention", "Paiement CB accepté"].map((item, i) => (
                    <span key={i} className="flex items-center gap-2 text-slate-700">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="w-full lg:w-auto">
                <div className="flex items-center justify-center gap-2.5 w-full lg:w-auto bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-600/25">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  Demander un devis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-12 sm:py-20 bg-slate-50 scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left - Header & CTA */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                ❓ FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-slate-600 mb-8 text-sm sm:text-base">
                Retrouvez les réponses aux questions les plus fréquentes sur nos services de serrurerie à {cityName}.
              </p>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">
                  Une autre question ?
                </h3>
                <p className="text-slate-600 text-sm mb-5">
                  Notre équipe est disponible 24h/24 pour répondre à toutes vos questions.
                </p>
                <div className="flex items-center justify-center gap-2.5 w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  {phone}
                </div>
              </div>
            </div>

            {/* Right - FAQ Items */}
            <div className="lg:col-span-3 space-y-3">
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════════════════════════════════════
function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className={`
            rounded-xl overflow-hidden transition-all duration-300
            ${openIndex === index 
              ? 'bg-white ring-2 ring-emerald-500 ring-opacity-50 shadow-lg' 
              : 'bg-white border border-slate-200 hover:border-slate-300'
            }
          `}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className={`font-semibold pr-4 transition-colors ${
              openIndex === index ? 'text-emerald-700' : 'text-slate-900'
            }`}>
              {item.question}
            </span>
            <span 
              className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                transition-all duration-300
                ${openIndex === index 
                  ? 'bg-emerald-500 text-white rotate-45' 
                  : 'bg-slate-100 text-slate-600'
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          
          <div 
            className={`
              overflow-hidden transition-all duration-300 ease-out
              ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="px-5 pb-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
