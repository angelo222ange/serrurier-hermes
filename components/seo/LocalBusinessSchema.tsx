/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SCHEMA.ORG - LOCAL BUSINESS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Données structurées pour les pages locales (villes, zones).
 * Améliore le Quality Score Google Ads et le SEO.
 * 
 * Schemas inclus:
 * - LocalBusiness (Locksmith)
 * - Service
 * - PriceSpecification
 * - GeoCoordinates
 * - OpeningHoursSpecification
 */

import { siteConfig, regionConfigs } from "@/config/site";

export interface LocalBusinessSchemaProps {
  /** Nom de la ville/zone */
  cityName: string;
  /** Slug de la ville pour les URLs */
  citySlug: string;
  /** Code postal */
  postalCode: string;
  /** Région pour la config */
  region?: "paris" | "bordeaux" | "montpellier" | "toulouse" | "val-de-marne";
  /** Note moyenne des avis */
  rating?: number;
  /** Nombre d'avis */
  reviewCount?: number;
  /** Services proposés (optionnel, utilise les services par défaut sinon) */
  services?: {
    name: string;
    description: string;
    priceFrom: number;
  }[];
}

/**
 * Génère les coordonnées GPS approximatives pour une zone
 * (basées sur les coordonnées du centre de la région principale)
 */
function getGeoCoordinates(region: string, citySlug: string) {
  const coords: Record<string, { lat: number; lng: number }> = {
    // Paris centre
    paris: { lat: 48.8566, lng: 2.3522 },
    // Bordeaux centre
    bordeaux: { lat: 44.8378, lng: -0.5792 },
    // Montpellier centre
    montpellier: { lat: 43.6108, lng: 3.8767 },
    // Toulouse centre
    toulouse: { lat: 43.6047, lng: 1.4442 },
  };
  
  // Ajuster légèrement les coordonnées par arrondissement parisien
  if (citySlug.startsWith("paris-")) {
    const arrNum = parseInt(citySlug.replace("paris-", ""), 10);
    if (!isNaN(arrNum)) {
      // Petite variation selon l'arrondissement
      const latOffset = (arrNum - 10) * 0.005;
      const lngOffset = (arrNum % 5) * 0.008;
      return {
        lat: 48.8566 + latOffset,
        lng: 2.3522 + lngOffset,
      };
    }
  }
  
  return coords[region] || coords.paris;
}

/**
 * Services par défaut avec prix
 */
const defaultServices = [
  {
    name: "Ouverture de porte",
    description: "Ouverture de porte claquée, fermée à clé ou porte blindée. Sans dégât dans 95% des cas.",
    priceFrom: 69,
  },
  {
    name: "Changement de serrure",
    description: "Remplacement de serrure toutes marques : Vachette, Bricard, Fichet, cylindres haute sécurité A2P.",
    priceFrom: 89,
  },
  {
    name: "Dépannage serrurerie urgent",
    description: "Dépannage urgent 24h/24 : clé cassée, serrure bloquée, extraction de clé, réparation serrure.",
    priceFrom: 59,
  },
  {
    name: "Blindage de porte",
    description: "Installation de blindage de porte, pose de porte blindée certifiée A2P pour sécuriser votre domicile.",
    priceFrom: 890,
  },
  {
    name: "Remplacement cylindre",
    description: "Remplacement de cylindre haute sécurité, cylindre A2P, cylindre anti-crochetage et anti-perçage.",
    priceFrom: 89,
  },
  {
    name: "Installation serrure",
    description: "Installation de serrure neuve, serrure multipoints, serrure connectée, serrure certifiée A2P.",
    priceFrom: 119,
  },
];

/**
 * Composant Schema LocalBusiness
 * Injecte les données structurées JSON-LD dans la page
 */
export function LocalBusinessSchema({
  cityName,
  citySlug,
  postalCode,
  region = "paris",
  rating = 4.9,
  reviewCount = 2847,
  services = defaultServices,
}: LocalBusinessSchemaProps) {
  const regionConfig = regionConfigs[region] || regionConfigs.paris;
  const geo = getGeoCoordinates(region, citySlug);
  
  // Construire le schema LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "@id": `https://${siteConfig.domain}/serrurier-${citySlug}/#localbusiness`,
    name: `Serrurier Hermès ${cityName}`,
    alternateName: `Serrurier ${cityName}`,
    description: `Serrurier professionnel à ${cityName}. Intervention en 20 minutes, 24h/24. Ouverture de porte, changement de serrure, dépannage urgent, blindage de porte.`,
    url: `https://${siteConfig.domain}/serrurier-${citySlug}/`,
    telephone: regionConfig.phone,
    email: siteConfig.email,
    image: `https://${siteConfig.domain}/images/logos/serrurier-hermes-logo.webp`,
    logo: {
      "@type": "ImageObject",
      url: `https://${siteConfig.domain}/images/logos/serrurier-hermes-logo.webp`,
      width: 200,
      height: 60,
    },
    // Adresse
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      postalCode: postalCode,
      addressCountry: "FR",
      addressRegion: region === "paris" ? "Île-de-France" : region === "bordeaux" ? "Nouvelle-Aquitaine" : region === "montpellier" ? "Occitanie" : region === "toulouse" ? "Occitanie" : "Occitanie",
    },
    // Coordonnées géographiques
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    // Zone de service
    areaServed: {
      "@type": "City",
      name: cityName,
      postalCode: postalCode,
    },
    // Horaires d'ouverture - 24h/24, 7j/7
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    // Moyens de paiement acceptés
    paymentAccepted: "Cash, Credit Card",
    currenciesAccepted: "EUR",
    // Prix
    priceRange: "€€",
    // Avis agrégés
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviewCount,
    },
    // Services proposés
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services de serrurerie à ${cityName}`,
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        "@id": `https://${siteConfig.domain}/serrurier-${citySlug}/#service-${index + 1}`,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: {
            "@type": "Locksmith",
            name: `Serrurier Hermès ${cityName}`,
          },
          areaServed: {
            "@type": "City",
            name: cityName,
          },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.priceFrom,
          priceCurrency: "EUR",
          minPrice: service.priceFrom,
          description: `À partir de ${service.priceFrom}€`,
        },
        availability: "https://schema.org/InStock",
      })),
    },
    // Informations sur l'entreprise
    sameAs: [
      siteConfig.social?.facebook,
      siteConfig.social?.instagram,
      siteConfig.social?.google,
    ].filter(Boolean),
    // Mots-clés
    keywords: [
      `serrurier ${cityName}`,
      `serrurier ${postalCode}`,
      `serrurier urgence ${cityName}`,
      "ouverture de porte",
      "changement serrure",
      "dépannage serrurerie",
      "serrurier 24h/24",
      "serrurier pas cher",
    ].join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema, null, 0),
      }}
    />
  );
}

export default LocalBusinessSchema;
