/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SCHEMA.ORG - SERVICE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Données structurées pour les pages de services.
 * Améliore le SEO et la visibilité dans les résultats de recherche.
 * 
 * Schemas inclus:
 * - Service
 * - Offer
 * - PriceSpecification
 * - AggregateRating
 * - Provider (Locksmith)
 */

import { siteConfig, regionConfigs } from "@/config/site";

export interface ServiceSchemaProps {
  /** Nom du service */
  serviceName: string;
  /** Slug du service pour les URLs */
  serviceSlug: string;
  /** Description du service */
  description: string;
  /** Prix minimum du service */
  priceFrom: number;
  /** Nom de la ville/zone */
  cityName: string;
  /** Slug de la ville */
  citySlug: string;
  /** Code postal */
  postalCode?: string;
  /** Région pour la config */
  region?: "paris" | "bordeaux" | "montpellier" | "toulouse" | "val-de-marne";
  /** Note moyenne des avis */
  rating?: number;
  /** Nombre d'avis */
  reviewCount?: number;
  /** Image du service */
  image?: string;
  /** Catégorie du service */
  category?: string;
  /** Sous-types de services avec prix */
  serviceTypes?: {
    name: string;
    description: string;
    price: number;
  }[];
}

/**
 * Composant Schema Service
 * Injecte les données structurées JSON-LD pour les pages de services
 */
export function ServiceSchema({
  serviceName,
  serviceSlug,
  description,
  priceFrom,
  cityName,
  citySlug,
  postalCode = "",
  region = "paris",
  rating = 4.9,
  reviewCount = 2847,
  image,
  category = "Serrurerie",
  serviceTypes,
}: ServiceSchemaProps) {
  const regionConfig = regionConfigs[region] || regionConfigs.paris;
  const baseUrl = `https://${siteConfig.domain}`;
  
  // URL canonique du service
  const serviceUrl = citySlug 
    ? `${baseUrl}/serrurier-${citySlug}/${serviceSlug}/`
    : `${baseUrl}/${serviceSlug}/`;

  // Image par défaut si non fournie
  const serviceImage = image || `${baseUrl}/images/services/${serviceSlug}.webp`;

  // Schema Service principal
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: `${serviceName} à ${cityName}`,
    alternateName: serviceName,
    description: description,
    url: serviceUrl,
    image: serviceImage,
    category: category,
    serviceType: "Serrurerie",
    
    // Fournisseur du service
    provider: {
      "@type": "Locksmith",
      "@id": `${baseUrl}/serrurier-${citySlug}/#localbusiness`,
      name: `Serrurier Hermès ${cityName}`,
      telephone: regionConfig.phone,
      url: `${baseUrl}/serrurier-${citySlug}/`,
      image: `${baseUrl}/images/logos/serrurier-hermes-logo.webp`,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        addressLocality: cityName,
        postalCode: postalCode,
        addressCountry: "FR",
      },
    },
    
    // Zone de service
    areaServed: {
      "@type": "City",
      name: cityName,
      ...(postalCode && { postalCode }),
    },
    
    // Disponibilité
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: serviceUrl,
      servicePhone: regionConfig.phone,
      serviceSmsNumber: regionConfig.phone.replace(/\s/g, ""),
      availableLanguage: {
        "@type": "Language",
        name: "French",
        alternateName: "fr",
      },
    },
    
    // Horaires
    hoursAvailable: {
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
    
    // Offre de prix
    offers: {
      "@type": "Offer",
      "@id": `${serviceUrl}#offer`,
      url: serviceUrl,
      priceCurrency: "EUR",
      price: priceFrom,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split('T')[0],
      priceSpecification: {
        "@type": "PriceSpecification",
        price: priceFrom,
        priceCurrency: "EUR",
        minPrice: priceFrom,
        valueAddedTaxIncluded: true,
        description: `${serviceName} à ${cityName} à partir de ${priceFrom}€`,
      },
      seller: {
        "@type": "Locksmith",
        name: `Serrurier Hermès ${cityName}`,
      },
      itemOffered: {
        "@type": "Service",
        name: serviceName,
      },
    },
    
    // Avis agrégés
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviewCount,
      itemReviewed: {
        "@type": "Service",
        name: `${serviceName} à ${cityName}`,
      },
    },
    
    // Caractéristiques du service
    hasOfferCatalog: serviceTypes && serviceTypes.length > 0 ? {
      "@type": "OfferCatalog",
      name: `Types de ${serviceName.toLowerCase()}`,
      itemListElement: serviceTypes.map((type, index) => ({
        "@type": "Offer",
        "@id": `${serviceUrl}#subservice-${index + 1}`,
        itemOffered: {
          "@type": "Service",
          name: type.name,
          description: type.description,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: type.price,
          priceCurrency: "EUR",
          minPrice: type.price,
          description: `À partir de ${type.price}€`,
        },
      })),
    } : undefined,
    
    // Termes et conditions
    termsOfService: `${baseUrl}/cgu/`,
    
    // Mots-clés SEO
    keywords: [
      serviceName.toLowerCase(),
      `${serviceName.toLowerCase()} ${cityName}`,
      `${serviceName.toLowerCase()} ${postalCode}`,
      "serrurier",
      `serrurier ${cityName}`,
      "24h/24",
      "urgence",
    ].join(", "),
  };

  // Nettoyer les propriétés undefined
  const cleanSchema = JSON.parse(JSON.stringify(serviceSchema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanSchema, null, 0),
      }}
    />
  );
}

export default ServiceSchema;
