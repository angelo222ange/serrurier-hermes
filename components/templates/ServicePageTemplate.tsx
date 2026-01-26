/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TEMPLATE PAGE SERVICE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Structure de la page service :
 * Hero Service → Types de situations → Notre méthode → Tarifs service → 
 * Autres services → Avis → FAQ → CTA
 */

import Link from "next/link";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";
import { services, type Service } from "@/config/site";
import { LocalBusinessSchema, ServiceSchema } from "@/components/seo";
import type { CityZone, CityReview, FAQItem } from "./CityPageTemplate";

export interface ServiceSituation {
  icon: string;
  title: string;
  description: string;
  price?: number;
}

export interface ServiceAdvantage {
  text: string;
}

export interface ServiceConfig {
  /** Données du service */
  service: Service;
  /** Ville où s'affiche le service */
  cityName: string;
  /** Slug de la ville */
  citySlug: string;
  /** Code postal */
  postalCode?: string;
  /** Région pour le Schema LocalBusiness */
  region?: "paris" | "bordeaux" | "montpellier" | "toulouse" | "val-de-marne";
  /** Numéro de téléphone */
  phone: string;
  /** Lien téléphone */
  phoneLink: string;
  /** Situations d'intervention */
  situations?: ServiceSituation[];
  /** Avantages du service */
  advantages?: string[];
  /** Description longue */
  description?: string[];
  /** Zones d'intervention pour ce service */
  zones?: CityZone[];
  /** FAQ du service */
  faq?: FAQItem[];
  /** Avis clients */
  reviews?: CityReview[];
  /** Note moyenne */
  reviewRating?: number;
  /** Nombre d'avis */
  reviewCount?: number;
}

export interface ServicePageProps {
  config: ServiceConfig;
}

export function ServicePageTemplate({ config }: ServicePageProps) {
  const {
    service,
    cityName,
    citySlug,
    postalCode,
    region = "paris",
    phone,
    phoneLink,
    situations,
    advantages,
    description,
    zones,
    faq,
    reviews,
    reviewRating = 4.9,
    reviewCount = 2847,
  } = config;

  // Services connexes
  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage);

  // Situations par défaut selon le service
  const defaultSituations: ServiceSituation[] = [
    { icon: "🚪", title: "Intervention standard", description: "Pour les cas classiques", price: service.priceFrom },
    { icon: "🔒", title: "Cas complexe", description: "Serrure haute sécurité", price: service.priceFrom + 50 },
    { icon: "🚨", title: "Urgence", description: "Disponible 24h/24", price: service.priceFrom + 20 },
    { icon: "🛡️", title: "Sécurisation", description: "Protection renforcée", price: service.priceFrom + 80 },
  ];

  const displaySituations = situations || defaultSituations;

  // Avantages par défaut
  const defaultAdvantages = [
    "Intervention en 20 minutes maximum",
    "Devis gratuit et transparent",
    "Sans dégât dans 95% des cas",
    "Artisans qualifiés et assurés",
    "Garantie satisfaction",
    "Paiement CB accepté",
  ];

  const displayAdvantages = advantages || defaultAdvantages;

  // Description par défaut
  const defaultDescription = [
    `Vous recherchez un professionnel pour ${service.name.toLowerCase()} à ${cityName} ? Notre équipe de serruriers qualifiés est à votre disposition 24h/24 et 7j/7.`,
    `Nous intervenons rapidement à ${cityName}${postalCode ? ` (${postalCode})` : ''} et dans toutes les communes environnantes. Notre objectif : résoudre votre problème dans les meilleurs délais avec un service de qualité.`,
  ];

  const displayDescription = description || defaultDescription;

  // FAQ par défaut
  const defaultFaq: FAQItem[] = [
    {
      question: `Quel est le prix pour ${service.name.toLowerCase()} à ${cityName} ?`,
      answer: `Le tarif pour ${service.name.toLowerCase()} à ${cityName} commence à partir de ${service.priceFrom}€. Un devis gratuit et détaillé vous sera communiqué avant toute intervention.`,
    },
    {
      question: `Quel est le délai d'intervention à ${cityName} ?`,
      answer: `Nos serruriers interviennent en 20 minutes maximum à ${cityName}. Nous sommes disponibles 24h/24 et 7j/7, y compris les jours fériés.`,
    },
    {
      question: `Intervenez-vous en urgence à ${cityName} ?`,
      answer: `Oui, nous assurons des interventions d'urgence à ${cityName} à toute heure du jour et de la nuit. Appelez-nous et un technicien sera chez vous rapidement.`,
    },
  ];

  const displayFaq = faq || defaultFaq;

  return (
    <main className="pt-20">
      {/* Schema.org LocalBusiness - Données structurées */}
      <LocalBusinessSchema
        cityName={cityName}
        citySlug={citySlug}
        postalCode={postalCode || ""}
        region={region}
        rating={reviewRating}
        reviewCount={reviewCount}
        services={[{
          name: service.name,
          description: service.longDesc,
          priceFrom: service.priceFrom,
        }]}
      />

      {/* Schema.org Service - Données structurées pour la page service */}
      <ServiceSchema
        serviceName={service.name}
        serviceSlug={service.slug}
        description={service.longDesc}
        priceFrom={service.priceFrom}
        cityName={cityName}
        citySlug={citySlug}
        postalCode={postalCode}
        region={region}
        rating={reviewRating}
        reviewCount={reviewCount}
        serviceTypes={displaySituations.filter(s => s.price).map(s => ({
          name: s.title,
          description: s.description,
          price: s.price!,
        }))}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href={`/serrurier-${citySlug}`} className="hover:text-primary-600">
                {cityName}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{service.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Service */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-gray-50">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
              {service.icon} {service.name} 24h/24
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {service.name} à {cityName}
              <span className="block text-emerald-600 text-2xl md:text-3xl mt-2">
                Intervention rapide en 20 minutes
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {service.longDesc}
            </p>

            {/* Prix */}
            <div className="mb-8">
              <span className="inline-flex items-baseline gap-2 px-5 py-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-gray-600 text-sm">À partir de</span>
                <span className="text-3xl md:text-4xl font-bold text-emerald-600">
                  {service.priceFrom}€
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={phoneLink} className="btn-phone text-lg">
                📞 {phone}
              </a>
              <Link href={`/serrurier-${citySlug}/contact`} className="btn-secondary">
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction / Description */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>{service.name} à {cityName} - Service professionnel</h2>
            {displayDescription.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Types de situations */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">
            Nos interventions {service.name.toLowerCase()}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displaySituations.map((item, index) => (
              <div key={index} className="card">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {item.description}
                </p>
                {item.price && (
                  <p className="text-emerald-600 font-bold">
                    Dès {item.price}€
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">
                Pourquoi choisir notre service de {service.name.toLowerCase()} ?
              </h2>
              <ul className="space-y-4 mt-8">
                {displayAdvantages.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-emerald-600 text-xl">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-50 rounded-2xl p-8">
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                📞 Contactez-nous
              </h3>
              <p className="text-gray-600 mb-4">
                Notre équipe est disponible 24h/24 et 7j/7 pour intervenir à {cityName}.
              </p>
              <div className="bg-white rounded-xl p-4">
                <a
                  href={phoneLink}
                  className="text-2xl font-bold text-primary-600 hover:text-primary-700"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones d'intervention pour ce service */}
      {zones && zones.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <h2 className="section-title text-center mb-4">
              {service.name} - Zones d&apos;intervention
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Nous intervenons pour {service.name.toLowerCase()} dans toutes ces communes.
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {zones.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/${service.slug}/${zone.slug}`}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-primary-50 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-primary-600">
                        {zone.name}
                      </p>
                      {zone.postalCode && (
                        <p className="text-sm text-gray-500">{zone.postalCode}</p>
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

      {/* Autres services */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-8">
            Nos autres services à {cityName}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}`}
                className="card hover:border-primary-200 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 mb-1">
                      {s.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{s.shortDesc}</p>
                    <p className="text-emerald-600 font-semibold mt-2">
                      Dès {s.priceFrom}€
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Avis */}
      {reviews && reviews.length > 0 && (
        <Reviews
          city={cityName}
          title={`Avis clients - ${service.name} à ${cityName}`}
          reviews={reviews}
        />
      )}

      {/* FAQ */}
      <FAQ
        items={displayFaq}
        title={`Questions sur ${service.name.toLowerCase()} à ${cityName}`}
      />

      {/* CTA */}
      <CTA
        city={cityName}
        title={`Besoin d'un ${service.name.toLowerCase()} à ${cityName} ?`}
        subtitle="Intervention rapide 24h/24. Appelez-nous maintenant !"
        variant="dark"
      />
    </main>
  );
}

export default ServicePageTemplate;
