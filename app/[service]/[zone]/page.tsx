import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, zones, services } from "@/config/site";
import { getPageContent, getZoneBySlug, getServiceBySlug } from "@/lib/content";
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
  params: { service: string; zone: string };
}

// Générer toutes les combinaisons service × zone
export function generateStaticParams() {
  const params: { service: string; zone: string }[] = [];

  for (const service of services) {
    if (!service.hasPage) continue;
    
    for (const zone of zones) {
      params.push({
        service: service.slug,
        zone: zone.slug,
      });
    }
  }

  return params;
}

// Générer les métadonnées
export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.service);
  const zone = getZoneBySlug(params.zone);

  if (!service || !zone) {
    return { title: "Page non trouvée" };
  }

  const title = `${service.name} ${zone.name} - ${siteConfig.name}`;
  const description = `${service.name} à ${zone.name} (${zone.postalCode}). ${service.shortDesc}. Intervention rapide, devis gratuit. ☎️ ${siteConfig.phone}`;

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

export default function ServiceZonePage({ params }: Props) {
  const service = getServiceBySlug(params.service);
  const zone = getZoneBySlug(params.zone);

  if (!service || !zone) {
    notFound();
  }

  // Récupérer le contenu du service
  const rawContent = serviceContents[service.slug];
  if (!rawContent) {
    notFound();
  }

  // Remplacer les variables avec le contexte de zone
  const content = getPageContent(rawContent, {
    zone: zone.name,
    zoneSlug: zone.slug,
    zonePostal: zone.postalCode,
    service: service.name,
    serviceSlug: service.slug,
  });

  // FAQ adaptée à la zone
  const zoneFaq = getPageContent(faqData, {
    zone: zone.name,
    zoneSlug: zone.slug,
    zonePostal: zone.postalCode,
  }).slice(0, 4);

  // Autres zones pour le maillage interne
  const otherZones = zones.filter(z => z.slug !== zone.slug).slice(0, 6);
  
  // Autres services pour le maillage interne
  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage).slice(0, 4);

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-primary-600">Accueil</Link></li>
            <li>/</li>
            <li><Link href={`/${service.slug}`} className="hover:text-primary-600">{service.name}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{zone.name}</li>
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
                📍 Intervention à {zone.name}
              </h3>
              <p className="text-gray-600 mb-4">
                Notre équipe intervient rapidement à {zone.name} ({zone.postalCode}) et dans toutes les communes environnantes du {siteConfig.department}.
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-2">Contactez-nous :</p>
                <a href={siteConfig.phoneLink} className="text-2xl font-bold text-primary-600 hover:text-primary-700">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maillage : Autres services dans cette zone */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-8">
            Nos autres services à {zone.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}/${zone.slug}`}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="font-medium text-gray-900">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage : Ce service dans d'autres zones */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-8">
            {service.name} dans les villes voisines
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {otherZones.map((z) => (
              <Link
                key={z.slug}
                href={`/${service.slug}/${z.slug}`}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {service.name} {z.name}
              </Link>
            ))}
            <Link
              href={`/${service.slug}`}
              className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
              Voir toutes les zones →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={zoneFaq}
        title={`Questions fréquentes - ${service.name} ${zone.name}`}
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

