/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PAGE SERVICE PAR VILLE (DYNAMIQUE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Génère automatiquement les pages service pour chaque ville :
 * - /serrurier-paris-1/ouverture-de-porte/
 * - /serrurier-paris-1/changement-serrure/
 * - etc.
 * 
 * Total : ~272 villes × 6 services = ~1632 pages
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, services } from "@/config/site";
import { getPageContent, getServiceBySlug } from "@/lib/content";
import { 
  getZoneBySlug, 
  getRegionFromSlug,
  getRegionConfig,
  getNeighborZones,
  getReviewsForZone,
} from "@/lib/cityConfig";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceSchema } from "@/components/seo";
import { 
  zonesParisArrondissements, 
  zonesIDF, 
  zonesBordeaux, 
  zonesMontpellier 
} from "@/config/site";

// Import des contenus de chaque service
import depannageContent from "@/content/pages/services/depannage.json";
import ouvertureContent from "@/content/pages/services/ouverture-de-porte.json";
import changementContent from "@/content/pages/services/changement-serrure.json";
import installationContent from "@/content/pages/services/installation-serrure.json";
import blindageContent from "@/content/pages/services/blindage-porte.json";
import cylindreContent from "@/content/pages/services/remplacement-cylindre.json";

// Type générique pour le contenu des services (certains champs optionnels)
interface ServiceContent {
  hero: { badge: string; title: string; subtitle: string };
  intro: { title: string; paragraphs: string[] };
  situations: { title: string; items: { icon: string; title: string; description: string; price: number }[] };
  method: { title: string; steps: { number: number; title: string; description: string }[] };
  advantages: { title: string; items: string[] };
  brands: { title: string; items: string[] };
  faq: { question: string; answer: string }[];
  cta: { title: string; subtitle: string };
  emergencyTypes?: { title: string; items: { type: string; description: string }[] };
}

// Map des contenus par slug de service
const serviceContents: Record<string, ServiceContent> = {
  "depannage": depannageContent as ServiceContent,
  "ouverture-de-porte": ouvertureContent as ServiceContent,
  "changement-serrure": changementContent as ServiceContent,
  "installation-serrure": installationContent as ServiceContent,
  "blindage-porte": blindageContent as ServiceContent,
  "remplacement-cylindre": cylindreContent as ServiceContent,
};

// Toutes les zones combinées
const allCityZones = [
  ...zonesParisArrondissements,
  ...zonesIDF,
  ...zonesBordeaux,
  ...zonesMontpellier,
];

// Services avec page
const servicesWithPage = services.filter(s => s.hasPage);

interface Props {
  params: { city: string; service: string };
}

// Force Next.js à ne générer que les pages listées
export const dynamicParams = false;

// Générer les pages statiques pour chaque combinaison ville × service
export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  
  for (const zone of allCityZones) {
    for (const service of servicesWithPage) {
      params.push({
        city: zone.slug,
        service: service.slug,
      });
    }
  }
  
  return params;
}

// Générer les métadonnées SEO optimisées
// Format Title : < 60 caractères | Service + Ville + Prix
// Format Description : < 155 caractères | CTA inclus
export function generateMetadata({ params }: Props): Metadata {
  const zone = getZoneBySlug(params.city);
  const service = getServiceBySlug(params.service);
  
  if (!zone || !service) {
    return { title: "Page non trouvée" };
  }

  const region = getRegionFromSlug(params.city);
  const regionConfig = getRegionConfig(region);

  // Meta Title optimisé < 60 caractères
  // "Ouverture de Porte Paris 1er Dès 69€ | Hermès" = ~46 caractères
  const title = `${service.name} ${zone.name} Dès ${service.priceFrom}€ | Hermès`;
  
  // Meta Description optimisée < 155 caractères avec CTA
  const description = `${service.name} ${zone.name} 24h/24. Intervention 20 min. ${service.shortDesc} Dès ${service.priceFrom}€. ☎️ ${regionConfig.phone}`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${zone.name}`,
      `serrurier ${zone.name}`,
      `${service.slug} ${zone.postalCode}`,
      `${service.name.toLowerCase()} urgence`,
      "serrurier 24h/24",
    ],
    openGraph: {
      title: `${service.name} ${zone.name} - 24h/24`,
      description: `${service.name} à ${zone.name}. Intervention 20 min. Dès ${service.priceFrom}€. ☎️ ${regionConfig.phone}`,
      type: "website",
      locale: "fr_FR",
      siteName: "Serrurier Hermès",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} ${zone.name}`,
      description: `Intervention 24h/24 à ${zone.name}. Dès ${service.priceFrom}€.`,
    },
    alternates: {
      canonical: `https://${siteConfig.domain}/serrurier-${zone.slug}/${service.slug}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Composant de page service par ville
export default function CityServicePage({ params }: Props) {
  const zone = getZoneBySlug(params.city);
  const service = getServiceBySlug(params.service);

  if (!zone || !service) {
    notFound();
  }

  // Récupérer le contenu du service
  const rawContent = serviceContents[service.slug];
  if (!rawContent) {
    notFound();
  }

  // Récupérer la config de région
  const region = getRegionFromSlug(params.city);
  const regionConfig = getRegionConfig(region);

  // Remplacer les variables avec la zone actuelle
  const content = getPageContent(rawContent, {
    zone: zone.name,
    zoneSlug: zone.slug,
    zonePostal: zone.postalCode,
    service: service.name,
    serviceSlug: service.slug,
  });

  // Récupérer les avis de cette zone
  const reviews = getReviewsForZone(zone.slug, zone.name);

  // Récupérer les zones voisines pour ce service
  const neighborZones = getNeighborZones(zone.slug, 8);

  // FAQ : utiliser les FAQ spécifiques au service si disponibles
  const faq = content.faq ? getPageContent(content.faq, {
    zone: zone.name,
    zoneSlug: zone.slug,
    zonePostal: zone.postalCode,
    service: service.name,
    serviceSlug: service.slug,
  }) : [];

  // Autres services pour le maillage
  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage);

  return (
    <main>
      {/* Schema.org Service - Données structurées */}
      <ServiceSchema
        serviceName={service.name}
        serviceSlug={service.slug}
        description={service.longDesc}
        priceFrom={service.priceFrom}
        cityName={zone.name}
        citySlug={zone.slug}
        postalCode={zone.postalCode}
        region={region}
        rating={4.9}
        reviewCount={reviews?.length ? reviews.length * 10 : 2847}
        serviceTypes={content.situations?.items?.slice(0, 6).map(s => ({
          name: s.title,
          description: s.description,
          price: s.price,
        }))}
      />

      {/* Breadcrumb - collé sous le header */}
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/serrurier-${zone.slug}`} className="hover:text-primary-600">
                Serrurier {zone.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{service.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Service - collé sous le breadcrumb */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-primary-50 via-white to-gray-50">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
              {service.icon} {service.name} à {zone.name}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {service.name} à {zone.name}
              <span className="block text-emerald-600 text-2xl md:text-3xl mt-2">
                Intervention rapide en {zone.time || "20 min"}
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {service.longDesc} Intervention à {zone.name} ({zone.postalCode}) et environs.
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
              <a href={regionConfig.phoneLink} className="btn-phone text-lg">
                📞 {regionConfig.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>{service.name} à {zone.name} - Service professionnel 24h/24</h2>
            <p>
              Vous recherchez un professionnel pour {service.name.toLowerCase()} à {zone.name} ({zone.postalCode}) ? 
              Notre équipe de serruriers qualifiés est à votre disposition 24h/24 et 7j/7.
            </p>
            <p>
              Nous intervenons rapidement à {zone.name} et dans toutes les communes environnantes. 
              Notre objectif : résoudre votre problème dans les meilleurs délais avec un service de qualité.
            </p>
            {content.intro?.paragraphs?.slice(0, 2).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Situations / Types d'intervention */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">
            {service.name} à {zone.name} - Nos interventions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.situations?.items?.slice(0, 6).map((item, index) => {
              // Map des images pour chaque type d'intervention
              const interventionImages: Record<string, string> = {
                // Dépannage
                "Clé cassée dans la serrure": "/images/services/cle-casse-serrure-serrurier-toulouse.webp",
                "Serrure grippée ou difficile": "/images/services/porte-bloquer-serrurier.webp",
                "Serrure bloquée": "/images/services/porte-bloquer-serrurier.webp",
                "Porte qui ne ferme plus": "/images/services/serrurier-porte-claquer-serrurier-hermes.webp",
                "Sécurisation après effraction": "/images/services/apres-effraction-serrurier.webp",
                "Dépannage serrure multipoints": "/images/services/changement-serrure-serrurier-hermes.webp",
                // Ouverture de porte
                "Porte claquée": "/images/services/serrurier-porte-claquer-serrurier-hermes.webp",
                "Clés perdues ou volées": "/images/services/ouverture-de-porte-classique-hermes.webp",
                "Porte fermée à clé": "/images/services/ouverture-de-porte-classique-hermes.webp",
                "Porte blindée": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "Serrure bloquée ou grippée": "/images/services/porte-bloquer-serrurier.webp",
                // Changement serrure
                "Serrure 3 points": "/images/services/changement-serrure-serrurier-hermes.webp",
                "Serrure 5 points": "/images/services/changement-serrure-serrurier-hermes.webp",
                "Serrure 7 points": "/images/services/changement-serrure-serrurier-hermes.webp",
                "Serrure monopoint": "/images/services/changement-serrure-serrurier-hermes.webp",
                "Serrure encastrée": "/images/services/changement-serrure-serrurier-hermes.webp",
                "Serrure carénée": "/images/services/changement-serrure-serrurier-hermes.webp",
                // Installation
                "Installation serrure multipoint": "/images/services/changement-serrure-serrurier-hermes.webp",
                "Installation serrure monopoint": "/images/services/reparation-serrure-serrurier-hermes.webp",
                "Installation serrure connectée": "/images/services/reparation-serrure-serrurier-hermes.webp",
                "Installation verrou supplémentaire": "/images/services/reparation-serrure-serrurier-hermes.webp",
                "Installation judas et entrebâilleur": "/images/services/reparation-serrure-serrurier-hermes.webp",
                // Blindage
                "Blindage porte simple": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "Porte blindée complète": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "Bloc-porte blindé": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "Porte blindée A2P BP1": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "Porte blindée A2P BP2": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "Porte blindée A2P BP3": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                // Cylindre
                "Cylindre européen standard": "/images/services/changement-de-barillet-serrurier-hermes.webp",
                "Cylindre haute sécurité": "/images/services/changement-de-barillet-serrurier-hermes.webp",
                "Cylindre à bouton": "/images/services/changement-de-barillet-serrurier-hermes.webp",
                "Cylindre débrayable": "/images/services/changement-de-barillet-serrurier-hermes.webp",
                "Cylindre anti-casse": "/images/services/changement-de-barillet-serrurier-hermes.webp",
                "Cylindre certifié A2P": "/images/services/changement-de-barillet-serrurier-hermes.webp",
              };
              
              return (
                <div key={index} className="relative overflow-hidden rounded-2xl shadow-lg group min-h-[320px] flex items-end hover:shadow-2xl transition-all duration-300">
                  {/* Image de fond */}
                  <div className="absolute inset-0">
                    <Image
                      src={interventionImages[item.title] || "/images/services/depannage-serrurier-urgence-nuit-hermes.webp"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Filtre de couleur émeraude avec effet de survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/70 to-emerald-900/40 group-hover:from-emerald-900/85 group-hover:via-emerald-900/60 group-hover:to-emerald-900/30 transition-all duration-300" />
                  </div>
                  
                  {/* Contenu */}
                  <div className="relative z-10 p-6 w-full">
                    <div className="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:bg-white/30 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2 group-hover:text-emerald-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/95 text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    {item.price && (
                      <p className="text-white font-bold text-lg bg-emerald-500/30 backdrop-blur-sm inline-block px-4 py-2 rounded-lg">
                        Dès {item.price}€
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">
                Pourquoi choisir notre service de {service.name.toLowerCase()} à {zone.name} ?
              </h2>
              <ul className="space-y-4 mt-8">
                {content.advantages?.items?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-emerald-600 text-xl">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-primary-50 rounded-2xl p-8">
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                📞 Appelez-nous à {zone.name}
              </h3>
              <p className="text-gray-600 mb-4">
                Notre équipe est disponible 24h/24 et 7j/7 pour intervenir à {zone.name} et dans tout le secteur.
              </p>
              <div className="bg-white rounded-xl p-4 text-center">
                <a 
                  href={regionConfig.phoneLink} 
                  className="text-2xl font-bold text-primary-600 hover:text-primary-700"
                >
                  {regionConfig.phone}
                </a>
                <p className="text-sm text-gray-500 mt-1">Disponible 24h/24</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones d'intervention voisines pour ce service */}
      {neighborZones.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <h2 className="section-title text-center mb-4">
              {service.name} - Zones d&apos;intervention
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Nous intervenons également pour {service.name.toLowerCase()} dans ces zones proches de {zone.name}.
            </p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {neighborZones.map((z) => {
                // Fonction pour obtenir l'image de la zone
                const getZoneImage = (zoneSlug: string, zoneName: string) => {
                  // Déterminer la région
                  if (zoneSlug.includes('bordeaux') || region === 'bordeaux') {
                    // Pour Bordeaux Centre
                    if (zoneName === 'Bordeaux Centre') {
                      return '/images/zones/bordeaux/bordeaux-centre-33-gironde.webp';
                    }
                    // Pour les autres zones de Bordeaux
                    const fileName = zoneName
                      .replace(/^Le /, '')
                      .replace(/^Saint-/, 'Saint-')
                      .replace(/ /g, '-');
                    return `/images/zones/bordeaux/depannage-rideau-metallique-${fileName}.webp`;
                  } else if (zoneSlug.includes('montpellier') || region === 'montpellier') {
                    // Pour Montpellier Centre
                    if (zoneName === 'Montpellier Centre') {
                      return '/images/zones/montpellier/depannage-rideau-metallique-montpellier-centre.webp';
                    }
                    // Pour les autres zones de Montpellier
                    const fileName = zoneName
                      .toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/'/g, '-');
                    return `/images/zones/montpellier/depannage-rideau-metallique-${fileName}-montpellier.webp`;
                  } else if (zoneSlug.match(/^paris-\d+$/)) {
                    // Pour Paris (arrondissements)
                    const arrondissement = zoneSlug.replace('paris-', '');
                    const postalCode = `7500${arrondissement.padStart(2, '0')}`.slice(0, 5);
                    // Essayer différentes variantes de noms de fichiers
                    const variants = [
                      `/images/zones/paris/depannage-rideau-metallique-paris-${arrondissement}-${postalCode}.webp`,
                      `/images/zones/paris/depannage-rideau-metallique-paris-${arrondissement}-${postalCode}-DRM.webp`,
                      `/images/zones/paris/DRM-depannage-rideau-metallique-paris-${arrondissement}-${postalCode}.webp`,
                    ];
                    // Retourner la première variante (Next.js gérera les images manquantes)
                    return variants[0];
                  }
                  // Image par défaut pour IDF et autres zones
                  return '/images/services/ouverture-de-porte-classique-hermes.webp';
                };

                const zoneImage = getZoneImage(z.slug, z.name);

                return (
                  <Link
                    key={z.slug}
                    href={`/serrurier-${z.slug}/${service.slug}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all group relative overflow-hidden min-h-[140px] flex items-center"
                  >
                    {/* Image de fond avec effet */}
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-all duration-300">
                      <Image
                        src={zoneImage}
                        alt={z.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay gradient pour améliorer la lisibilité */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/50" />
                    </div>
                    
                    {/* Contenu */}
                    <div className="relative z-10 p-5 w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                            {z.name}
                          </p>
                          {z.postalCode && (
                            <p className="text-sm text-gray-600 font-medium">{z.postalCode}</p>
                          )}
                        </div>
                        <span className="text-primary-600 text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Autres services */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-8">
            Nos autres services à {zone.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => {
              // Map des images pour chaque service
              const serviceImages: Record<string, string> = {
                "depannage": "/images/services/depannage-serrurier-urgence-nuit-hermes.webp",
                "ouverture-de-porte": "/images/services/serrurier-porte-claquer-serrurier-hermes.webp",
                "changement-serrure": "/images/services/changement-serrure-serrurier-hermes.webp",
                "installation-serrure": "/images/services/reparation-serrure-serrurier-hermes.webp",
                "blindage-porte": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "remplacement-cylindre": "/images/services/changement-de-barillet-serrurier-hermes.webp",
              };
              
              return (
                <Link
                  key={s.id}
                  href={`/serrurier-${zone.slug}/${s.slug}`}
                  className="card hover:border-primary-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden min-h-[160px]"
                >
                  {/* Image de fond avec effet */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-45 transition-all duration-300">
                    <Image
                      src={serviceImages[s.slug] || "/images/services/depannage-serrurier-urgence-nuit-hermes.webp"}
                      alt={s.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient pour améliorer la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-white/70" />
                  </div>
                  
                  {/* Contenu */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="text-4xl p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 transition-colors">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 mb-2 transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{s.shortDesc}</p>
                      <p className="text-emerald-600 font-bold text-base bg-emerald-50 inline-block px-3 py-1 rounded-lg">
                        Dès {s.priceFrom}€
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avis clients */}
      {reviews && reviews.length > 0 && (
        <Reviews
          city={zone.name}
          title={`Avis clients - ${service.name} à ${zone.name}`}
          subtitle={`Découvrez les témoignages de nos clients à ${zone.name} et environs.`}
          reviews={reviews}
        />
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <FAQ
          items={faq}
          title={`Questions sur ${service.name.toLowerCase()} à ${zone.name}`}
        />
      )}

      {/* CTA */}
      <CTA
        city={zone.name}
        title={`Besoin d'un ${service.name.toLowerCase()} à ${zone.name} ?`}
        subtitle={`Intervention rapide 24h/24. Appelez-nous au ${regionConfig.phone} !`}
        variant="dark"
      />
    </main>
  );
}
