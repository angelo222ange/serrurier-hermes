/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TEMPLATE PAGE VILLE PRINCIPALE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Assemblage des sections pour les pages villes :
 * Hero → Urgences → Services → WhyUs → HowItWorks → Tarifs → Zones → Avis → FAQ → CTA
 * 
 * Props dynamiques : ville, région, numéro de téléphone, zones, avis
 */

import { Hero } from "@/components/sections/Hero";
import { Urgences } from "@/components/sections/Urgences";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Tarifs } from "@/components/sections/Tarifs";
import { Zones } from "@/components/sections/Zones";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Brands } from "@/components/sections/Brands";
import { CTA } from "@/components/sections/CTA";
import { LocalBusinessSchema } from "@/components/seo";
import { formatCityH1, formatCitySubtitle } from "@/lib/cityConfig";

// Types pour la configuration de la ville
export interface CityZone {
  name: string;
  slug: string;
  postalCode?: string;
  time?: string;
  image?: string;
  isMain?: boolean;
}

export interface CityReview {
  name: string;
  rating: number;
  date: string;
  text: string;
  location?: string;
  service?: string;
  avatarImage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CityConfig {
  /** Nom de la ville (ex: "Paris 1er", "Bordeaux") */
  name: string;
  /** Slug de la ville pour les URLs */
  slug: string;
  /** Code postal */
  postalCode: string;
  /** Département ou région */
  department?: string;
  /** Région pour la configuration (paris, bordeaux, montpellier) */
  region?: "paris" | "bordeaux" | "montpellier" | "toulouse";
  /** Numéro de téléphone à afficher */
  phone: string;
  /** Lien téléphone (tel:+33...) */
  phoneLink: string;
  /** Zones d'intervention voisines */
  zones?: CityZone[];
  /** Avis clients pour cette ville */
  reviews?: CityReview[];
  /** FAQ personnalisées */
  faq?: FAQItem[];
  /** Image de fond du hero */
  heroImage?: string;
  /** Note moyenne Google */
  reviewRating?: number;
  /** Nombre d'avis Google */
  reviewCount?: number;
}

interface CityPageTemplateProps {
  config: CityConfig;
  /** Afficher la section marques */
  showBrands?: boolean;
  /** Nombre de zones à afficher */
  zonesLimit?: number;
}

export function CityPageTemplate({
  config,
  showBrands = true,
  zonesLimit = 12,
}: CityPageTemplateProps) {
  const {
    name,
    slug,
    postalCode,
    department,
    region = "paris",
    phone,
    phoneLink,
    zones,
    reviews,
    faq,
    heroImage,
    reviewRating = 4.9,
    reviewCount = 2847,
  } = config;
  
  // Récupérer le temps d'intervention depuis les zones ou par défaut
  const zone = zones?.[0];
  const interventionTime = zone?.time || "20 min";
  
  // Générer le H1 et le subtitle optimisés
  const heroTitle = formatCityH1(name, postalCode);
  const heroSubtitle = formatCitySubtitle(name, interventionTime, postalCode);

  // Remplacer les placeholders {city} dans les FAQ
  const processedFaq = faq?.map(item => ({
    ...item,
    question: item.question.replace(/\{city\}/g, name),
    answer: item.answer.replace(/\{city\}/g, name),
  }));

  // Remplacer les placeholders dans les avis
  const processedReviews = reviews?.map(review => ({
    ...review,
    text: review.text.replace(/\{city\}/g, name),
    location: review.location?.replace(/\{city\}/g, name),
  }));

  return (
    <main>
      {/* Schema.org LocalBusiness - Données structurées */}
      <LocalBusinessSchema
        cityName={name}
        citySlug={slug}
        postalCode={postalCode}
        region={region}
        rating={reviewRating}
        reviewCount={reviewCount}
      />
      
      {/* Hero Section */}
      <Hero
        city={name}
        badge={`🔐 Serrurier ${name}`}
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage}
        showReviews={true}
        phone={phone}
        phoneLink={phoneLink}
      />

      {/* Urgences / Points de douleur */}
      <Urgences 
        city={name}
        title="Vous êtes bloqué ? On arrive."
        subtitle={`Intervention en 20 minutes à ${name}. Nos serruriers sont disponibles 24h/24 pour résoudre votre urgence.`}
        phone={phone}
        phoneLink={phoneLink}
      />

      {/* Nos Services */}
      <Services
        citySlug={slug}
        city={name}
        title={`Nos Services de Serrurerie à ${name}`}
        subtitle={`Serrurier Hermès propose une gamme complète de services de serrurerie à ${name} et ses environs.`}
        phone={phone}
        phoneLink={phoneLink}
      />

      {/* Pourquoi nous choisir */}
      <WhyUs
        city={name}
        title={`Pourquoi choisir Serrurier Hermès ${name} ?`}
        subtitle="Nous nous engageons à vous offrir un service de qualité, rapide et transparent."
      />

      {/* Comment ça marche */}
      <HowItWorks 
        phone={phone}
        phoneLink={phoneLink}
      />

      {/* Tarifs */}
      <Tarifs
        city={name}
        title={`Nos Tarifs à ${name}`}
        subtitle={`Tarifs transparents pour tous nos services de serrurerie à ${name}. Devis gratuit avant intervention.`}
        phone={phone}
        phoneLink={phoneLink}
      />

      {/* Zones d'intervention */}
      {zones && zones.length > 0 && (
        <Zones
          city={name}
          title={`Zone d'intervention autour de ${name}`}
          subtitle={`Nous intervenons à ${name} et dans toute l'agglomération. Intervention rapide en 20 minutes.`}
          displayZones={
            // Pour les arrondissements de Paris, afficher toutes les zones (20 arrondissements)
            // Sinon, limiter selon zonesLimit
            region === "paris" && slug.startsWith("paris-") 
              ? zones 
              : zones.slice(0, zonesLimit)
          }
          phone={phone}
          phoneLink={phoneLink}
        />
      )}

      {/* Avis clients */}
      <Reviews
        city={name}
        title={`Avis de nos clients à ${name}`}
        subtitle={`Découvrez les témoignages de nos clients à ${name} et environs.`}
        reviews={processedReviews}
      />

      {/* FAQ */}
      <FAQ
        title={`Questions Fréquentes - Serrurier ${name}`}
        items={processedFaq}
        phone={phone}
        phoneLink={phoneLink}
      />

      {/* Marques partenaires */}
      {showBrands && <Brands />}

      {/* CTA Final */}
      <CTA
        city={name}
        title={`Besoin d'un serrurier à ${name} ?`}
        subtitle="Notre équipe intervient 24h/24 et 7j/7. Appelez-nous pour une intervention rapide ou un devis gratuit."
        phone={phone}
        phoneLink={phoneLink}
      />
    </main>
  );
}

export default CityPageTemplate;
