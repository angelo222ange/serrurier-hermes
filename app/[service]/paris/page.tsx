import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, services } from "@/config/site";
import { getPageContent, getServiceBySlug } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { ServiceSchema } from "@/components/seo";
import faqData from "@/content/faq.json";

// Import des contenus de chaque service
import depannageContent from "@/content/pages/services/depannage.json";
import ouvertureContent from "@/content/pages/services/ouverture-de-porte.json";
import changementContent from "@/content/pages/services/changement-serrure.json";
import installationContent from "@/content/pages/services/installation-serrure.json";
import blindageContent from "@/content/pages/services/blindage-porte.json";
import cylindreContent from "@/content/pages/services/remplacement-cylindre.json";

// Type générique pour le contenu des services
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

interface Props {
  params: { service: string };
}

// Force Next.js à ne pas générer dynamiquement des pages non listées
export const dynamicParams = false;

// Générer les pages statiques pour chaque service
export function generateStaticParams() {
  return services
    .filter(service => service.hasPage)
    .map((service) => ({
      service: service.slug,
    }));
}

// Générer les métadonnées SEO optimisées pour Paris
export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.service);

  if (!service) {
    return { title: "Service non trouvé" };
  }

  // Meta Title optimisé < 60 caractères
  const title = `${service.name} Paris 24h/24 Dès ${service.priceFrom}€ | Hermès`;
  
  // Meta Description optimisée < 155 caractères avec CTA
  const description = `${service.name} Paris 24h/24. ${service.shortDesc} Intervention 20 min. Dès ${service.priceFrom}€. ☎️ ${siteConfig.phone}`;

  return {
    title,
    description,
    openGraph: {
      title: `${service.name} Paris - 24h/24`,
      description,
      type: "website",
      locale: "fr_FR",
      siteName: "Serrurier Hermès",
    },
  };
}

export default function ServiceParisPage({ params }: Props) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    notFound();
  }

  // Récupérer le contenu du service
  const rawContent = serviceContents[service.slug];
  if (!rawContent) {
    notFound();
  }

  // Remplacer les variables avec Paris comme zone
  const content = getPageContent(rawContent, {
    zone: "Paris",
    zoneSlug: "paris",
    zonePostal: "75000",
    service: service.name,
    serviceSlug: service.slug,
  });

  // FAQ : utiliser les FAQ spécifiques au service si disponibles, sinon FAQ générale avec Paris
  const serviceFaq = content.faq ? getPageContent(content.faq, {
    zone: "Paris",
    zoneSlug: "paris",
    zonePostal: "75000",
    service: service.name,
    serviceSlug: service.slug,
  }) : null;
  const faq = serviceFaq || getPageContent(faqData.generic, {
    zone: "Paris",
    zoneSlug: "paris",
    zonePostal: "75000",
    service: service.name,
    serviceSlug: service.slug,
  }).slice(0, 5);

  // Autres services pour le maillage
  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage);

  return (
    <main className="pt-20">
      {/* Schema.org Service - Données structurées */}
      <ServiceSchema
        serviceName={service.name}
        serviceSlug={service.slug}
        description={service.longDesc}
        priceFrom={service.priceFrom}
        cityName="Paris"
        citySlug="paris"
        postalCode="75000"
        region="paris"
        rating={4.9}
        reviewCount={2847}
        serviceTypes={content.situations.items.map(s => ({
          name: s.title,
          description: s.description,
          price: s.price,
        }))}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-primary-600">Accueil</Link></li>
            <li>/</li>
            <li><Link href={`/${service.slug}`} className="hover:text-primary-600">{service.name}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Paris</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-gray-50">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
              {content.hero.badge}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {content.hero.title}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={siteConfig.phoneLink} className="btn-phone text-lg">
                📞 {siteConfig.phone}
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
            <h2>{content.intro.title}</h2>
            {content.intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Situations / Types d'intervention */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">{content.situations.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.situations.items.map((item, index) => (
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
              <h2 className="section-title">{content.advantages.title}</h2>
              <ul className="space-y-4 mt-8">
                {content.advantages.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl">✓</span>
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
                Notre équipe est disponible 24h/24 et 7j/7 pour intervenir à Paris et dans toute l&apos;Île-de-France.
              </p>
              <div className="bg-white rounded-xl p-4">
                <a href={siteConfig.phoneLink} className="text-2xl font-bold text-primary-600 hover:text-primary-700">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autres services */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-8">
            Nos autres services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}/paris`}
                className="card hover:border-primary-200 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 mb-1">
                      {s.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{s.shortDesc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={faq}
        title={`Questions sur ${service.name.toLowerCase()} à Paris`}
      />

      {/* CTA */}
      <CTA
        title={content.cta.title}
        subtitle={content.cta.subtitle}
        variant="dark"
      />
    </main>
  );
}
