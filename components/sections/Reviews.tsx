"use client";

import { useRef, useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteConfig } from "@/config/site";
import { ReviewSchema } from "@/components/seo";

interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  location?: string;
  service?: string;
  visitDate?: string;
  avatarImage?: string;
}

interface ReviewsProps {
  title?: string;
  subtitle?: string;
  reviews?: Review[];
  city?: string;
}

// Couleurs d'avatar variées pour les initiales (style Google)
const avatarColors = [
  "bg-blue-600",
  "bg-red-500",
  "bg-green-600",
  "bg-yellow-500",
  "bg-purple-600",
  "bg-pink-500",
  "bg-indigo-600",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-600",
];

const defaultReviews: Review[] = [
  {
    name: "Marc Dupont",
    rating: 5,
    date: "il y a 2 semaines",
    visitDate: "janvier 2026",
    text: "Serrurier très professionnel, arrivé en 15 minutes. Porte ouverte sans dégât. Prix conforme au devis. Je recommande vivement ce service !",
    location: "Centre-ville",
    service: "Ouverture de porte",
    avatarImage: "/images/avis-serrurier-hermes-toulouse.webp",
  },
  {
    name: "Sophie Laurent",
    rating: 5,
    date: "il y a 3 semaines",
    visitDate: "décembre 2025",
    text: "Intervention rapide et efficace pour un changement de serrure. Artisan poli et travail soigné. Merci !",
    location: "Quartier Nord",
    service: "Changement serrure",
    avatarImage: "/images/avis-serrurier-hermes-toulouse-2.webp",
  },
  {
    name: "Pierre Martin",
    rating: 5,
    date: "il y a 1 mois",
    visitDate: "décembre 2025",
    text: "Bloqué dehors à 23h, ils sont venus en 20 min. Prix correct malgré l'heure tardive. Très satisfait.",
    service: "Urgence nuit",
    avatarImage: "/images/avis-client-serrurier-hermes-toulouse.webp",
  },
  {
    name: "Marie Chevalier",
    rating: 5,
    date: "il y a 1 mois",
    visitDate: "décembre 2025",
    text: "Excellent service ! Clé cassée dans la serrure, intervention propre et rapide. Je garde le numéro.",
    service: "Extraction clé",
  },
  {
    name: "Laurent Bernard",
    rating: 5,
    date: "il y a 2 mois",
    visitDate: "novembre 2025",
    text: "Remplacement de cylindre haute sécurité. Travail impeccable et conseils avisés sur les marques.",
    service: "Cylindre sécurité",
  },
  {
    name: "Isabelle Robert",
    rating: 5,
    date: "il y a 2 mois",
    visitDate: "novembre 2025",
    text: "Suite à un cambriolage, sécurisation rapide de ma porte. Équipe réactive et rassurante. Merci.",
    service: "Sécurisation",
  },
];

// Composant pour tronquer le texte avec "...Plus"
function TruncatedText({ text, maxLength = 120 }: { text: string; maxLength?: number }) {
  const [expanded, setExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }
  
  if (expanded) {
    return <span>{text}</span>;
  }
  
  return (
    <span>
      {text.slice(0, maxLength).trim()}...
      <button 
        onClick={() => setExpanded(true)}
        className="text-blue-500 hover:text-blue-600 ml-1"
      >
        Plus
      </button>
    </span>
  );
}

export function Reviews({
  title = "Avis de nos clients",
  subtitle,
  reviews = defaultReviews,
  city,
}: ReviewsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayCity = city || siteConfig.city;
  const defaultSubtitle = `Découvrez les témoignages de nos clients à ${displayCity} et environs.`;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Fonction pour obtenir la couleur de l'avatar basée sur le nom
  const getAvatarColor = (name: string) => {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <section id="reviews" className="section bg-[#0f0f0f] overflow-hidden">
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
            <h2 className="section-title text-white">{title}</h2>
            <p className="section-subtitle mt-2 text-white/60">
              {subtitle || defaultSubtitle}
            </p>
          </div>
          
          {/* Note globale + Navigation */}
          <div className="flex items-center gap-4">
            {/* Note Google */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] rounded-xl border border-white/10">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="border-l border-white/20 pl-3">
                <p className="font-bold text-white">{siteConfig.reviews?.rating || 4.9}/5</p>
                <p className="text-xs text-white/50">{siteConfig.reviews?.count || 127} avis</p>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Défiler vers la gauche"
              >
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
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

        {/* Carrousel des avis - Style Google Reviews dark mode */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-start w-[300px] sm:w-[350px] bg-[#1a1a1a] rounded-xl p-5 border border-white/10"
            >
              {/* Header de l'avis - Style Google exact */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Avatar avec image ou initiale - Style Google */}
                  {review.avatarImage ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <OptimizedImage
                        src={review.avatarImage}
                        alt={review.name}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        imageType="thumbnail"
                      />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.name)} flex items-center justify-center text-white font-medium text-lg`}>
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-white text-sm">{review.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-white/60">Avis de</span>
                      {/* Logo Google coloré */}
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
                {/* Menu 3 points */}
                <button 
                  className="text-white/60 hover:text-white/80 p-1"
                  aria-label="Options de l'avis"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>

              {/* Note et date - Style Google */}
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

              {/* Texte de l'avis avec troncature */}
              <p className="text-white/90 text-sm leading-relaxed mb-3">
                <TruncatedText text={review.text} maxLength={130} />
              </p>

              {/* Date de visite - Style Google */}
              {review.visitDate && (
                <p className="text-white/50 text-xs">
                  Visité en {review.visitDate}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={siteConfig.reviews?.googleUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            Voir tous nos avis sur Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Schema.org Review & AggregateRating */}
      <ReviewSchema
        businessName={`Serrurier Hermès ${displayCity}`}
        pageUrl={typeof window !== 'undefined' ? window.location.href : `https://${siteConfig.domain}/`}
        rating={siteConfig.reviews?.rating || 4.9}
        reviewCount={siteConfig.reviews?.count || 127}
        reviews={reviews.map(review => ({
          name: review.name,
          rating: review.rating,
          date: review.date,
          text: review.text,
          location: review.location,
          service: review.service,
          visitDate: review.visitDate,
        }))}
      />
    </section>
  );
}
