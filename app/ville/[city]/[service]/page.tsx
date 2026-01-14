/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PAGE SERVICE PAR VILLE (DYNAMIQUE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Route interne: /ville/[city]/[service]/
 * Mappée vers: /serrurier-[city]/[service]/ via rewrites
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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

const serviceContents: Record<string, ServiceContent> = {
  "depannage": depannageContent as ServiceContent,
  "ouverture-de-porte": ouvertureContent as ServiceContent,
  "changement-serrure": changementContent as ServiceContent,
  "installation-serrure": installationContent as ServiceContent,
  "blindage-porte": blindageContent as ServiceContent,
  "remplacement-cylindre": cylindreContent as ServiceContent,
};

const allCityZones = [
  ...zonesParisArrondissements,
  ...zonesIDF,
  ...zonesBordeaux,
  ...zonesMontpellier,
];

const servicesWithPage = services.filter(s => s.hasPage);

interface Props {
  params: { city: string; service: string };
}

export const dynamicParams = true;

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

export function generateMetadata({ params }: Props): Metadata {
  const zone = getZoneBySlug(params.city);
  const service = getServiceBySlug(params.service);
  
  if (!zone || !service) {
    return { title: "Page non trouvée" };
  }

  const region = getRegionFromSlug(params.city);
  const regionConfig = getRegionConfig(region);

  const title = `${service.name} ${zone.name} Dès ${service.priceFrom}€ | Hermès`;
  const description = `${service.name} ${zone.name} 24h/24. Intervention 20 min. ${service.shortDesc} Dès ${service.priceFrom}€. ☎️ ${regionConfig.phone}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${siteConfig.domain}/serrurier-${zone.slug}/${service.slug}/`,
    },
    robots: { index: true, follow: true },
  };
}

export default function CityServicePage({ params }: Props) {
  const zone = getZoneBySlug(params.city);
  const service = getServiceBySlug(params.service);

  if (!zone || !service) {
    notFound();
  }

  const rawContent = serviceContents[service.slug];
  if (!rawContent) {
    notFound();
  }

  const region = getRegionFromSlug(params.city);
  const regionConfig = getRegionConfig(region);

  const content = getPageContent(rawContent, {
    zone: zone.name,
    zoneSlug: zone.slug,
    zonePostal: zone.postalCode,
    service: service.name,
    serviceSlug: service.slug,
  });

  const reviews = getReviewsForZone(zone.slug, zone.name);
  const neighborZones = getNeighborZones(zone.slug, 8);

  const faq = content.faq ? getPageContent(content.faq, {
    zone: zone.name,
    zoneSlug: zone.slug,
    zonePostal: zone.postalCode,
    service: service.name,
    serviceSlug: service.slug,
  }) : [];

  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage);

  return (
    <main className="pt-20">
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

      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-primary-600">Accueil</Link></li>
            <li>/</li>
            <li><Link href={`/serrurier-${zone.slug}`} className="hover:text-primary-600">Serrurier {zone.name}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{service.name}</li>
          </ol>
        </div>
      </nav>

      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-gray-50">
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

            <div className="mb-8">
              <span className="inline-flex items-baseline gap-2 px-5 py-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-gray-600 text-sm">À partir de</span>
                <span className="text-3xl md:text-4xl font-bold text-emerald-600">{service.priceFrom}€</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={regionConfig.phoneLink} className="btn-phone text-lg">📞 {regionConfig.phone}</a>
              <Link href="/contact" className="btn-secondary">Demander un devis</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>{service.name} à {zone.name} - Service professionnel 24h/24</h2>
            <p>Vous recherchez un professionnel pour {service.name.toLowerCase()} à {zone.name} ({zone.postalCode}) ? Notre équipe de serruriers qualifiés est à votre disposition 24h/24 et 7j/7.</p>
            {content.intro?.paragraphs?.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">{service.name} à {zone.name} - Nos interventions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.situations?.items?.slice(0, 6).map((item, index) => (
              <div key={index} className="card">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                {item.price && <p className="text-emerald-600 font-bold">Dès {item.price}€</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Pourquoi choisir notre service de {service.name.toLowerCase()} à {zone.name} ?</h2>
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
              <h3 className="font-bold text-xl text-gray-900 mb-4">📞 Appelez-nous à {zone.name}</h3>
              <p className="text-gray-600 mb-4">Notre équipe est disponible 24h/24 et 7j/7.</p>
              <div className="bg-white rounded-xl p-4 text-center">
                <a href={regionConfig.phoneLink} className="text-2xl font-bold text-primary-600 hover:text-primary-700">{regionConfig.phone}</a>
                <p className="text-sm text-gray-500 mt-1">Disponible 24h/24</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {neighborZones.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <h2 className="section-title text-center mb-4">{service.name} - Zones d&apos;intervention</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {neighborZones.map((z) => (
                <Link key={z.slug} href={`/serrurier-${z.slug}/${service.slug}`} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-primary-50 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-primary-600">{z.name}</p>
                      {z.postalCode && <p className="text-sm text-gray-500">{z.postalCode}</p>}
                    </div>
                    <span className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-8">Nos autres services à {zone.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link key={s.id} href={`/serrurier-${zone.slug}/${s.slug}`} className="card hover:border-primary-200 transition-colors group">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 mb-1">{s.name}</h3>
                    <p className="text-gray-600 text-sm">{s.shortDesc}</p>
                    <p className="text-emerald-600 font-semibold mt-2">Dès {s.priceFrom}€</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {reviews && reviews.length > 0 && (
        <Reviews city={zone.name} title={`Avis clients - ${service.name} à ${zone.name}`} subtitle={`Découvrez les témoignages de nos clients à ${zone.name}.`} reviews={reviews} />
      )}

      {faq && faq.length > 0 && (
        <FAQ items={faq} title={`Questions sur ${service.name.toLowerCase()} à ${zone.name}`} />
      )}

      <CTA city={zone.name} title={`Besoin d'un ${service.name.toLowerCase()} à ${zone.name} ?`} subtitle={`Intervention rapide 24h/24. Appelez-nous au ${regionConfig.phone} !`} variant="dark" />
    </main>
  );
}
