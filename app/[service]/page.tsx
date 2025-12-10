import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, zones, services } from "@/config/site";
import { getPageContent, getServiceBySlug } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import faqData from "@/content/faq.json";

// Import des contenus de chaque service
import depannageContent from "@/content/pages/services/depannage.json";
import ouvertureContent from "@/content/pages/services/ouverture-de-porte.json";
import changementContent from "@/content/pages/services/changement-serrure.json";
import installationContent from "@/content/pages/services/installation-serrure.json";
import blindageContent from "@/content/pages/services/blindage-porte.json";
import cylindreContent from "@/content/pages/services/remplacement-cylindre.json";

// Map des contenus par slug de service
const serviceContents: Record<string, typeof depannageContent> = {
  "depannage": depannageContent,
  "ouverture-de-porte": ouvertureContent,
  "changement-serrure": changementContent,
  "installation-serrure": installationContent,
  "blindage-porte": blindageContent,
  "remplacement-cylindre": cylindreContent,
};

interface Props {
  params: { service: string };
}

// Générer les pages statiques pour chaque service
export function generateStaticParams() {
  return services
    .filter(service => service.hasPage)
    .map((service) => ({
      service: service.slug,
    }));
}

// Générer les métadonnées
export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.service);

  if (!service) {
    return { title: "Service non trouvé" };
  }

  const title = `${service.name} ${siteConfig.city} - ${siteConfig.name}`;
  const description = `${service.name} à ${siteConfig.city} et environs. ${service.longDesc} Intervention rapide 24h/24. ☎️ ${siteConfig.phone}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    notFound();
  }

  // Récupérer le contenu du service
  const rawContent = serviceContents[service.slug];
  if (!rawContent) {
    notFound();
  }

  // Remplacer les variables avec la ville principale comme zone
  const content = getPageContent(rawContent, {
    zone: siteConfig.city,
    zoneSlug: siteConfig.city.toLowerCase(),
    zonePostal: siteConfig.postalCode,
    service: service.name,
    serviceSlug: service.slug,
  });

  // FAQ générale
  const faq = getPageContent(faqData).slice(0, 5);

  // Autres services pour le maillage
  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage);

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-primary-600">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{service.name}</li>
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
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
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
                Notre équipe est disponible 24h/24 et 7j/7 pour intervenir à {siteConfig.city} et dans tout le {siteConfig.department}.
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

      {/* Zones d'intervention pour ce service */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            {service.name} - Zones d&apos;intervention
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Nous intervenons pour {service.name.toLowerCase()} dans toutes ces communes du {siteConfig.department}.
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
                    <p className="text-sm text-gray-500">{zone.postalCode}</p>
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
        title={`Questions sur ${service.name.toLowerCase()}`}
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

