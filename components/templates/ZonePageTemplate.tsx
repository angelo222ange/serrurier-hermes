/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TEMPLATE PAGE ZONE SECONDAIRE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Version allégée de la page ville principale :
 * Hero → Services → Contenu SEO → Zones voisines → FAQ → CTA
 */

import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { LocalBusinessSchema } from "@/components/seo";
import type { CityZone, FAQItem } from "./CityPageTemplate";

export interface ZoneConfig {
  /** Nom de la zone */
  name: string;
  /** Slug de la zone */
  slug: string;
  /** Code postal */
  postalCode: string;
  /** Temps d'intervention */
  time?: string;
  /** Ville principale de rattachement */
  mainCity: string;
  /** Département */
  department?: string;
  /** Région pour le Schema LocalBusiness */
  region?: "paris" | "bordeaux" | "montpellier";
  /** Numéro de téléphone */
  phone: string;
  /** Lien téléphone */
  phoneLink: string;
  /** Zones voisines */
  neighborZones?: CityZone[];
  /** FAQ personnalisées */
  faq?: FAQItem[];
  /** Image de fond du hero */
  heroImage?: string;
  /** Note moyenne */
  reviewRating?: number;
  /** Nombre d'avis */
  reviewCount?: number;
}

interface ZonePageTemplateProps {
  config: ZoneConfig;
}

export function ZonePageTemplate({ config }: ZonePageTemplateProps) {
  const {
    name,
    slug,
    postalCode,
    time = "20 min",
    mainCity,
    department,
    region = "paris",
    phone,
    phoneLink,
    neighborZones,
    faq,
    heroImage,
    reviewRating = 4.9,
    reviewCount = 2847,
  } = config;

  // FAQ par défaut pour la zone
  const defaultFaq: FAQItem[] = [
    {
      question: `Quel est le prix d'un serrurier à ${name} ?`,
      answer: `Le prix d'une intervention de serrurerie à ${name} dépend du type de prestation. Pour une ouverture de porte simple, comptez à partir de 69€. Un devis gratuit vous sera proposé avant toute intervention.`,
    },
    {
      question: `Quel est le délai d'intervention à ${name} ?`,
      answer: `Nos serruriers interviennent en ${time} à ${name} (${postalCode}). Nous sommes disponibles 24h/24 et 7j/7.`,
    },
    {
      question: `Intervenez-vous le week-end à ${name} ?`,
      answer: `Oui, nos serruriers sont disponibles 7j/7 à ${name}, y compris les week-ends et jours fériés, sans majoration excessive.`,
    },
    {
      question: `Quels services proposez-vous à ${name} ?`,
      answer: `À ${name}, nous proposons : ouverture de porte, changement de serrure, dépannage urgent, blindage de porte, remplacement de cylindre et installation de serrures.`,
    },
    {
      question: `Comment se passe une intervention à ${name} ?`,
      answer: `Appelez-nous, décrivez votre problème, recevez un devis gratuit. Un serrurier arrive chez vous à ${name} en ${time}. Paiement CB ou espèces, facture fournie.`,
    },
  ];

  const displayFaq = faq || defaultFaq;

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
      
      {/* Hero adapté à la zone */}
      <Hero
        city={name}
        badge={`📍 Serrurier ${name}`}
        title={`Serrurier ${name}`}
        subtitle={`Intervention rapide en ${time} à ${name} (${postalCode}). Dépannage, ouverture de porte, changement de serrure. Disponible 24h/24.`}
        backgroundImage={heroImage}
      />

      {/* Services avec liens vers la zone */}
      <Services
        city={name}
        title={`Nos services à ${name}`}
        subtitle={`Serrurier Hermès intervient à ${name} pour tous vos besoins en serrurerie.`}
        zoneSlug={slug}
      />

      {/* Contenu SEO */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Votre serrurier à {name}</h2>
            <p>
              Vous recherchez un <strong>serrurier à {name}</strong> ? Serrurier Hermès est à votre service 
              24 heures sur 24 et 7 jours sur 7. Basés à {mainCity}, nous intervenons rapidement 
              à {name} ({postalCode}){department ? ` dans le ${department}` : ''} et dans toutes les communes avoisinantes.
            </p>
            <p>
              Que vous ayez besoin d&apos;une <strong>ouverture de porte</strong>, d&apos;un <strong>changement de serrure</strong>, 
              ou d&apos;une intervention d&apos;urgence suite à une effraction, notre équipe de serruriers professionnels 
              est équipée pour répondre à toutes vos demandes.
            </p>
            
            <h3>Pourquoi choisir Serrurier Hermès à {name} ?</h3>
            <ul>
              <li><strong>Intervention en {time}</strong> sur {name}</li>
              <li><strong>Disponible 24h/24</strong>, y compris week-ends et jours fériés</li>
              <li><strong>Devis gratuit</strong> communiqué par téléphone</li>
              <li><strong>Prix transparents</strong>, pas de mauvaise surprise</li>
              <li><strong>Artisans qualifiés</strong> avec plus de 10 ans d&apos;expérience</li>
            </ul>

            <h3>Nos tarifs à {name}</h3>
            <p>
              Nos tarifs sont transparents et sans surprise. Pour une ouverture de porte simple 
              à {name}, comptez à partir de 69€. Un devis précis vous sera toujours communiqué 
              avant intervention.
            </p>
          </div>
        </div>
      </section>

      {/* Zones voisines */}
      {neighborZones && neighborZones.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <h2 className="section-title text-center mb-8">
              Nous intervenons aussi près de {name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {neighborZones.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/zones/${zone.slug}`}
                  className="bg-gray-50 p-4 rounded-xl hover:bg-primary-50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-primary-600">
                        {zone.name}
                      </p>
                      {zone.postalCode && (
                        <p className="text-sm text-gray-500">{zone.postalCode}</p>
                      )}
                      {zone.time && (
                        <p className="text-xs text-emerald-600 mt-1">{zone.time}</p>
                      )}
                    </div>
                    <span className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQ
        items={displayFaq}
        title={`Questions fréquentes - Serrurier ${name}`}
      />

      {/* CTA */}
      <CTA
        city={name}
        title={`Besoin d'un serrurier à ${name} ?`}
        subtitle="Intervention rapide 24h/24. Appelez-nous maintenant !"
      />
    </main>
  );
}

export default ZonePageTemplate;
