/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SCHEMA.ORG - REVIEW & AGGREGATE RATING
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Données structurées pour les avis clients.
 * Améliore la visibilité dans les résultats de recherche avec les étoiles.
 * 
 * Schemas inclus:
 * - AggregateRating
 * - Review (liste d'avis individuels)
 */

import { siteConfig } from "@/config/site";

export interface ReviewItem {
  /** Nom de l'auteur de l'avis */
  name: string;
  /** Note (1-5) */
  rating: number;
  /** Date relative (ex: "il y a 2 semaines") */
  date: string;
  /** Texte de l'avis */
  text: string;
  /** Localisation de l'auteur (optionnel) */
  location?: string;
  /** Service concerné (optionnel) */
  service?: string;
  /** Date de visite (optionnel, ex: "janvier 2026") */
  visitDate?: string;
}

export interface ReviewSchemaProps {
  /** Nom de l'entreprise locale */
  businessName: string;
  /** URL de la page */
  pageUrl: string;
  /** Note moyenne */
  rating?: number;
  /** Nombre total d'avis */
  reviewCount?: number;
  /** Liste des avis à afficher dans le schema */
  reviews?: ReviewItem[];
}

/**
 * Convertit une date relative en date ISO
 */
function parseRelativeDate(relativeDate: string): string {
  const now = new Date();
  const lowerDate = relativeDate.toLowerCase();
  
  if (lowerDate.includes("semaine")) {
    const weeks = parseInt(lowerDate.match(/\d+/)?.[0] || "1");
    now.setDate(now.getDate() - weeks * 7);
  } else if (lowerDate.includes("mois")) {
    const months = parseInt(lowerDate.match(/\d+/)?.[0] || "1");
    now.setMonth(now.getMonth() - months);
  } else if (lowerDate.includes("jour")) {
    const days = parseInt(lowerDate.match(/\d+/)?.[0] || "1");
    now.setDate(now.getDate() - days);
  } else if (lowerDate.includes("an")) {
    const years = parseInt(lowerDate.match(/\d+/)?.[0] || "1");
    now.setFullYear(now.getFullYear() - years);
  }
  
  return now.toISOString().split("T")[0];
}

/**
 * Composant Schema Review & AggregateRating
 * Injecte les données structurées JSON-LD dans la page
 */
export function ReviewSchema({
  businessName,
  pageUrl,
  rating = 4.9,
  reviewCount = 2847,
  reviews = [],
}: ReviewSchemaProps) {
  // Schema AggregateRating standalone (pour les pages sans liste d'avis)
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#business`,
    name: businessName,
    url: pageUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviewCount,
      ratingCount: reviewCount,
    },
  };

  // Si on a des avis individuels, on les ajoute
  const reviewSchemas = reviews.map((review, index) => ({
    "@type": "Review",
    "@id": `${pageUrl}#review-${index + 1}`,
    author: {
      "@type": "Person",
      name: review.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: parseRelativeDate(review.date),
    reviewBody: review.text,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: businessName,
      ...(review.service && {
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: review.service,
          },
        },
      }),
    },
  }));

  // Schema combiné avec avis
  const combinedSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#business-reviews`,
    name: businessName,
    url: pageUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviewCount,
      ratingCount: reviewCount,
    },
    ...(reviewSchemas.length > 0 && {
      review: reviewSchemas,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          reviews.length > 0 ? combinedSchema : aggregateRatingSchema,
          null,
          0
        ),
      }}
    />
  );
}

export default ReviewSchema;
