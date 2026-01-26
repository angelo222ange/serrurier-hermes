/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GESTION DES AVIS CLIENTS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Utilitaires pour charger et utiliser les avis clients par région et zone.
 */

import parisReviewsData from "@/content/reviews/paris.json";
import bordeauxReviewsData from "@/content/reviews/bordeaux.json";
import montpellierReviewsData from "@/content/reviews/montpellier.json";

// Type pour un avis
export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  location?: string;
  service?: string;
  visitDate?: string;
  avatarImage?: string;
}

// Type pour les données d'avis par région
interface ReviewsData {
  meta: {
    region: string;
    totalReviews: number;
    reviewsPerZone: number;
    averageRating: number;
  };
  reviews: Record<string, Review[]>;
}

// Données typées
const parisReviews = parisReviewsData as ReviewsData;
const bordeauxReviews = bordeauxReviewsData as ReviewsData;
const montpellierReviews = montpellierReviewsData as ReviewsData;

/**
 * Récupère les avis pour une zone de Paris
 */
export function getParisReviews(zoneSlug: string): Review[] {
  const reviews = parisReviews.reviews[zoneSlug];
  if (reviews && reviews.length > 0) {
    return reviews;
  }
  // Fallback sur des avis génériques si la zone n'existe pas
  return getDefaultReviews("Paris");
}

/**
 * Récupère tous les avis Paris (pour utilisation globale)
 */
export function getAllParisReviews(): Review[] {
  const allReviews: Review[] = [];
  Object.values(parisReviews.reviews).forEach((zoneReviews) => {
    allReviews.push(...zoneReviews);
  });
  return allReviews;
}

/**
 * Récupère un échantillon aléatoire d'avis Paris
 */
export function getRandomParisReviews(count: number = 10): Review[] {
  const allReviews = getAllParisReviews();
  const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Récupère les avis pour une zone de Bordeaux
 */
export function getBordeauxReviews(zoneSlug: string): Review[] {
  const reviews = bordeauxReviews.reviews[zoneSlug];
  if (reviews && reviews.length > 0) {
    return reviews;
  }
  // Fallback sur des avis génériques si la zone n'existe pas
  return getDefaultReviews("Bordeaux");
}

/**
 * Récupère tous les avis Bordeaux (pour utilisation globale)
 */
export function getAllBordeauxReviews(): Review[] {
  const allReviews: Review[] = [];
  Object.values(bordeauxReviews.reviews).forEach((zoneReviews) => {
    allReviews.push(...zoneReviews);
  });
  return allReviews;
}

/**
 * Récupère un échantillon aléatoire d'avis Bordeaux
 */
export function getRandomBordeauxReviews(count: number = 10): Review[] {
  const allReviews = getAllBordeauxReviews();
  const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Récupère les avis pour une zone de Montpellier
 */
export function getMontpellierReviews(zoneSlug: string): Review[] {
  const reviews = montpellierReviews.reviews[zoneSlug];
  if (reviews && reviews.length > 0) {
    return reviews;
  }
  // Fallback sur des avis génériques si la zone n'existe pas
  return getDefaultReviews("Montpellier");
}

/**
 * Récupère tous les avis Montpellier (pour utilisation globale)
 */
export function getAllMontpellierReviews(): Review[] {
  const allReviews: Review[] = [];
  Object.values(montpellierReviews.reviews).forEach((zoneReviews) => {
    allReviews.push(...zoneReviews);
  });
  return allReviews;
}

/**
 * Récupère un échantillon aléatoire d'avis Montpellier
 */
export function getRandomMontpellierReviews(count: number = 10): Review[] {
  const allReviews = getAllMontpellierReviews();
  const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Récupère les avis pour une région donnée
 */
export function getReviewsByRegion(region: "paris" | "bordeaux" | "montpellier" | "toulouse" | "val-de-marne", zoneSlug?: string): Review[] {
  switch (region) {
    case "paris":
      if (zoneSlug) {
        return getParisReviews(zoneSlug);
      }
      return getRandomParisReviews(10);
    case "bordeaux":
      if (zoneSlug) {
        return getBordeauxReviews(zoneSlug);
      }
      return getRandomBordeauxReviews(10);
    case "montpellier":
      if (zoneSlug) {
        return getMontpellierReviews(zoneSlug);
      }
      return getRandomMontpellierReviews(10);
    case "toulouse":
      // For now, use default reviews for Toulouse until specific reviews are added
      return getDefaultReviews("Toulouse");
    default:
      return getDefaultReviews("Paris");
  }
}

/**
 * Avis par défaut avec le nom de la ville (fallback)
 */
export function getDefaultReviews(city: string): Review[] {
  return [
    {
      name: "Marc D.",
      rating: 5,
      date: "il y a 2 semaines",
      text: `Serrurier très professionnel, arrivé en 15 minutes à ${city}. Porte ouverte sans dégât. Prix conforme au devis. Je recommande !`,
      location: city,
      service: "Ouverture de porte",
      avatarImage: "/images/avis-serrurier-hermes-toulouse.webp",
    },
    {
      name: "Sophie L.",
      rating: 5,
      date: "il y a 3 semaines",
      text: `Intervention rapide et efficace pour un changement de serrure à ${city}. Artisan poli et travail soigné. Merci !`,
      location: city,
      service: "Changement serrure",
      avatarImage: "/images/avis-serrurier-hermes-toulouse-2.webp",
    },
    {
      name: "Pierre M.",
      rating: 5,
      date: "il y a 1 mois",
      text: `Bloqué dehors à 23h à ${city}, ils sont venus en 20 min. Prix correct malgré l'heure tardive. Très satisfait.`,
      location: city,
      service: "Urgence nuit",
      avatarImage: "/images/avis-client-serrurier-hermes-toulouse.webp",
    },
    {
      name: "Marie C.",
      rating: 5,
      date: "il y a 1 mois",
      text: `Excellent service à ${city} ! Clé cassée dans la serrure, intervention propre et rapide. Je garde le numéro.`,
      location: city,
      service: "Extraction clé",
    },
    {
      name: "Laurent B.",
      rating: 5,
      date: "il y a 2 mois",
      text: `Remplacement de cylindre haute sécurité à ${city}. Travail impeccable et conseils avisés sur les marques.`,
      location: city,
      service: "Cylindre sécurité",
    },
    {
      name: "Isabelle R.",
      rating: 5,
      date: "il y a 2 mois",
      text: `Suite à un cambriolage à ${city}, sécurisation rapide de ma porte. Équipe réactive et rassurante. Merci.`,
      location: city,
      service: "Sécurisation",
    },
    {
      name: "Thomas G.",
      rating: 5,
      date: "il y a 3 mois",
      text: `Installation d'une serrure 5 points à ${city}. Artisan ponctuel et travail de qualité.`,
      location: city,
      service: "Installation serrure",
    },
    {
      name: "Émilie P.",
      rating: 5,
      date: "il y a 3 mois",
      text: `Dépannage serrure grippée à ${city}. Intervention rapide et efficace. Prix très correct.`,
      location: city,
      service: "Dépannage",
    },
    {
      name: "Nicolas H.",
      rating: 5,
      date: "il y a 4 mois",
      text: `Ouverture porte blindée à ${city}. Technique impeccable, aucun dégât. Je recommande vivement.`,
      location: city,
      service: "Ouverture porte blindée",
    },
    {
      name: "Céline F.",
      rating: 5,
      date: "il y a 4 mois",
      text: `Pose de verrou de sécurité à ${city}. Travail propre et conseils utiles. Très satisfaite.`,
      location: city,
      service: "Installation verrou",
    },
  ];
}

/**
 * Récupère les méta-informations des avis Paris
 */
export function getParisReviewsMeta() {
  return parisReviews.meta;
}

/**
 * Récupère les méta-informations des avis Bordeaux
 */
export function getBordeauxReviewsMeta() {
  return bordeauxReviews.meta;
}

/**
 * Récupère les méta-informations des avis Montpellier
 */
export function getMontpellierReviewsMeta() {
  return montpellierReviews.meta;
}
