/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UTILITAIRES DE CONFIGURATION DES VILLES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Fonctions pour générer les configurations des pages villes à partir
 * des données de zones.
 */

import {
  siteConfig,
  regionConfigs,
  zonesParisArrondissements,
  zonesIDF,
  zonesBordeaux,
  zonesMontpellier,
  zones,
} from "@/config/site";
import { getNeighboringSlugs } from "@/config/neighbors";
import type { CityConfig, CityZone, CityReview, FAQItem } from "@/components/templates";
import { 
  getParisReviews, 
  getBordeauxReviews,
  getMontpellierReviews,
  getDefaultReviews, 
  type Review 
} from "@/lib/reviews";

// Toutes les zones disponibles par région
export const allZones = {
  paris: zonesParisArrondissements,
  idf: zonesIDF,
  bordeaux: zonesBordeaux,
  montpellier: zonesMontpellier,
};

// Type pour les régions
export type RegionKey = keyof typeof regionConfigs;

/**
 * Détermine la région d'une zone à partir de son slug
 */
export function getRegionFromSlug(slug: string): RegionKey {
  // Protection contre les valeurs undefined ou null
  if (!slug || typeof slug !== 'string') {
    return 'paris';
  }
  
  // Paris arrondissements
  if (slug.startsWith('paris-') || slug === 'paris') {
    return 'paris';
  }
  
  // Vérifier les zones IDF
  const idfZone = zonesIDF.find(z => z.slug === slug);
  if (idfZone) return 'paris';
  
  // Vérifier Bordeaux
  const bordeauxZone = zonesBordeaux.find(z => z.slug === slug);
  if (bordeauxZone) return 'bordeaux';
  
  // Vérifier Montpellier
  const montpellierZone = zonesMontpellier.find(z => z.slug === slug);
  if (montpellierZone) return 'montpellier';
  
  // Par défaut Paris
  return 'paris';
}

/**
 * Retourne la ville parent (principale) d'une zone
 * Utilisé pour la navigation du logo dans le header
 * 
 * @param citySlug - Le slug de la ville actuelle
 * @returns Le slug de la ville principale de la région
 */
export function getCityParent(citySlug: string): string {
  // Si pas de slug, retour à l'accueil générique
  if (!citySlug) return '/';
  
  // Déterminer la région
  const region = getRegionFromSlug(citySlug);
  
  // Paris : tous les arrondissements et banlieue → paris
  if (region === 'paris') {
    return '/serrurier-paris/';
  }
  
  // Bordeaux : toutes les villes → bordeaux
  if (region === 'bordeaux') {
    return '/serrurier-bordeaux/';
  }
  
  // Montpellier : toutes les villes → montpellier
  if (region === 'montpellier') {
    return '/serrurier-montpellier/';
  }
  
  // Par défaut, retour à l'accueil
  return '/';
}

/**
 * Récupère la configuration de la région
 */
export function getRegionConfig(region: RegionKey) {
  return regionConfigs[region];
}

/**
 * Récupère une zone par son slug
 */
export function getZoneBySlug(slug: string) {
  // Chercher dans toutes les zones
  const allZonesList = [
    ...zonesParisArrondissements,
    ...zonesIDF,
    ...zonesBordeaux,
    ...zonesMontpellier,
  ];
  
  return allZonesList.find(z => z.slug === slug);
}

/**
 * Récupère les zones voisines d'une zone (géographiquement proches)
 * Utilise la configuration des voisins définie dans config/neighbors.ts
 */
export function getNeighborZones(slug: string, limit = 8): CityZone[] {
  // Récupérer les slugs des voisins depuis la configuration
  const neighborSlugs = getNeighboringSlugs(slug, limit);
  
  // Liste complète des zones
  const allZonesList = [
    ...zonesParisArrondissements,
    ...zonesIDF,
    ...zonesBordeaux,
    ...zonesMontpellier,
  ];
  
  // Mapper les slugs vers les objets complets
  const neighborZones: CityZone[] = [];
  
  for (const neighborSlug of neighborSlugs) {
    const zone = allZonesList.find(z => z.slug === neighborSlug);
    if (zone) {
      neighborZones.push({
        name: zone.name,
        slug: zone.slug,
        postalCode: zone.postalCode,
        time: zone.time,
        image: 'image' in zone ? zone.image : undefined,
      });
    }
  }
  
  return neighborZones;
}

/**
 * FAQ par défaut avec placeholder {city}
 */
export const defaultFAQ: FAQItem[] = [
  {
    question: "Quel est le prix d'un serrurier à {city} ?",
    answer: "Le prix d'une intervention de serrurerie à {city} dépend du type de prestation. Pour une ouverture de porte simple, comptez à partir de 69€. Un changement de serrure démarre à 89€. Un devis gratuit vous sera proposé avant toute intervention.",
  },
  {
    question: "Quel est le délai d'intervention à {city} ?",
    answer: "Nos serruriers interviennent en 20 minutes maximum à {city}. Nous sommes disponibles 24h/24 et 7j/7, y compris les week-ends et jours fériés.",
  },
  {
    question: "Intervenez-vous le week-end et jours fériés à {city} ?",
    answer: "Oui, nous intervenons 7j/7 à {city}, y compris les dimanches et jours fériés. Nos tarifs restent transparents quelle que soit l'heure d'intervention.",
  },
  {
    question: "Comment se passe une intervention de serrurerie à {city} ?",
    answer: "1. Appelez-nous et décrivez votre problème. 2. Recevez un devis gratuit par téléphone. 3. Un serrurier arrive chez vous à {city} en 20 min. 4. Paiement après intervention (CB ou espèces), facture fournie.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous à {city} ?",
    answer: "Nous acceptons le paiement par carte bancaire (CB, Visa, Mastercard) et en espèces. Une facture détaillée vous est systématiquement remise après l'intervention.",
  },
  {
    question: "Proposez-vous un devis avant intervention à {city} ?",
    answer: "Oui, un devis gratuit et sans engagement vous est communiqué par téléphone avant toute intervention. Le prix est fixé avant le déplacement du serrurier.",
  },
  {
    question: "Intervenez-vous pour les portes blindées à {city} ?",
    answer: "Oui, nos serruriers sont équipés et formés pour intervenir sur tous types de portes blindées à {city}. Comptez à partir de 149€ pour une ouverture de porte blindée.",
  },
  {
    question: "Que faire si je suis bloqué dehors à {city} ?",
    answer: "Appelez-nous immédiatement au numéro affiché. Décrivez votre situation et un serrurier sera chez vous à {city} en 20 minutes pour vous ouvrir la porte.",
  },
];

/**
 * Récupère les avis pour une zone donnée
 * Utilise les avis spécifiques si disponibles, sinon les avis par défaut
 */
export function getReviewsForZone(zoneSlug: string, cityName: string): CityReview[] {
  const region = getRegionFromSlug(zoneSlug);
  
  // Utiliser les avis spécifiques par région
  switch (region) {
    case "paris":
      return getParisReviews(zoneSlug) as CityReview[];
    
    case "bordeaux":
      return getBordeauxReviews(zoneSlug) as CityReview[];
    
    case "montpellier":
      return getMontpellierReviews(zoneSlug) as CityReview[];
    
    default:
      return getDefaultReviews(cityName) as CityReview[];
  }
}

/**
 * Avis par défaut avec placeholder {city} (legacy - utilisé comme fallback)
 */
export const defaultReviews: CityReview[] = [
  {
    name: "Marc D.",
    rating: 5,
    date: "il y a 2 semaines",
    text: "Serrurier très professionnel, arrivé en 15 minutes à {city}. Porte ouverte sans dégât. Prix conforme au devis. Je recommande !",
    location: "{city}",
    service: "Ouverture de porte",
  },
  {
    name: "Sophie L.",
    rating: 5,
    date: "il y a 3 semaines",
    text: "Intervention rapide et efficace pour un changement de serrure à {city}. Artisan poli et travail soigné. Merci !",
    location: "{city}",
    service: "Changement serrure",
  },
  {
    name: "Pierre M.",
    rating: 5,
    date: "il y a 1 mois",
    text: "Bloqué dehors à 23h à {city}, ils sont venus en 20 min. Prix correct malgré l'heure tardive. Très satisfait.",
    location: "{city}",
    service: "Urgence nuit",
  },
  {
    name: "Marie C.",
    rating: 5,
    date: "il y a 1 mois",
    text: "Excellent service à {city} ! Clé cassée dans la serrure, intervention propre et rapide. Je garde le numéro.",
    location: "{city}",
    service: "Extraction clé",
  },
  {
    name: "Laurent B.",
    rating: 5,
    date: "il y a 2 mois",
    text: "Remplacement de cylindre haute sécurité à {city}. Travail impeccable et conseils avisés sur les marques.",
    location: "{city}",
    service: "Cylindre sécurité",
  },
  {
    name: "Isabelle R.",
    rating: 5,
    date: "il y a 2 mois",
    text: "Suite à un cambriolage à {city}, sécurisation rapide de ma porte. Équipe réactive et rassurante. Merci.",
    location: "{city}",
    service: "Sécurisation",
  },
];

/**
 * Construit une configuration complète pour une page ville
 */
export function buildCityConfig(
  zoneSlug: string,
  customConfig?: Partial<CityConfig>
): CityConfig | null {
  const zone = getZoneBySlug(zoneSlug);
  if (!zone) return null;
  
  const region = getRegionFromSlug(zoneSlug);
  const regionConfig = getRegionConfig(region);
  
  // Pour les arrondissements de Paris, toujours afficher les 20 arrondissements
  let zonesToDisplay: CityZone[];
  if (region === 'paris' && zoneSlug.startsWith('paris-')) {
    // C'est un arrondissement de Paris, afficher tous les arrondissements
    zonesToDisplay = zonesParisArrondissements.map(z => ({
      name: z.name,
      slug: z.slug,
      postalCode: z.postalCode,
      time: z.time,
      image: 'image' in z ? z.image : undefined,
    }));
  } else {
    // Pour les autres zones, utiliser les zones voisines
    zonesToDisplay = getNeighborZones(zoneSlug);
  }
  
  // Récupère les avis spécifiques à la zone
  const zoneReviews = getReviewsForZone(zoneSlug, zone.name);
  
  return {
    name: zone.name,
    slug: zone.slug,
    postalCode: zone.postalCode,
    region: region, // Ajout de la région pour le Schema LocalBusiness
    phone: regionConfig.phone,
    phoneLink: regionConfig.phoneLink,
    zones: zonesToDisplay,
    faq: defaultFAQ,
    reviews: zoneReviews,
    reviewRating: siteConfig.reviews?.rating || 4.9,
    reviewCount: siteConfig.reviews?.count || 2847,
    ...customConfig,
  };
}

/**
 * Récupère toutes les configurations pour generateStaticParams
 */
export function getAllCityConfigs(): CityConfig[] {
  const allZonesList = [
    ...zonesParisArrondissements,
    ...zonesIDF,
    ...zonesBordeaux,
    ...zonesMontpellier,
  ];
  
  return allZonesList
    .map(zone => buildCityConfig(zone.slug))
    .filter((config): config is CityConfig => config !== null);
}

/**
 * Génère tous les slugs pour generateStaticParams
 */
export function getAllZoneSlugs(): { slug: string }[] {
  const allZonesList = [
    ...zonesParisArrondissements,
    ...zonesIDF,
    ...zonesBordeaux,
    ...zonesMontpellier,
  ];
  
  return allZonesList.map(zone => ({ slug: zone.slug }));
}

/**
 * Formate le H1 pour une page ville selon le type de ville
 * @param cityName - Le nom de la ville (ex: "Paris 19ème", "Mérignac")
 * @param postalCode - Le code postal (ex: "75019", "33700")
 * @returns Le H1 formaté (ex: "Serrurier à Paris 19ème - Dépannage 24h/24")
 */
export function formatCityH1(cityName: string, postalCode?: string): string {
  return `Serrurier à ${cityName} - Dépannage 24h/24`;
}

/**
 * Génère un sous-titre optimisé pour une page ville
 * @param cityName - Le nom de la ville
 * @param time - Le temps d'intervention (ex: "15 min", "20 min")
 * @param postalCode - Le code postal (optionnel)
 * @returns Le sous-titre formaté
 */
export function formatCitySubtitle(cityName: string, time: string = "20 min", postalCode?: string): string {
  if (postalCode) {
    return `Intervention rapide en ${time} à ${cityName} (${postalCode}). Service 24h/24, 7j/7. Devis gratuit par téléphone.`;
  }
  return `Intervention rapide en ${time} à ${cityName}. Service 24h/24, 7j/7. Devis gratuit par téléphone.`;
}
