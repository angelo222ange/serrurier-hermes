import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, zones, services } from "@/config/site";
import { getPageContent, getServiceBySlug } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { ServiceSchema } from "@/components/seo";
import faqData from "@/content/faq.json";
import serviceContent from "@/content/pages/services/changement-serrure.json";

const SERVICE_SLUG = "changement-serrure";
const service = getServiceBySlug(SERVICE_SLUG)!;

const content = getPageContent(serviceContent, {
  zone: "",
  zoneSlug: "",
  zonePostal: "",
  service: service.name,
  serviceSlug: service.slug,
}, true);

export const metadata: Metadata = {
  title: `${service.name} 24h/24 Dès ${service.priceFrom}€ | Hermès`,
  description: `${service.name} professionnel 24h/24. ${service.shortDesc} Intervention rapide. Dès ${service.priceFrom}€. Devis gratuit.`,
};

export default function ChangementSerrurePage() {
  const faq = getPageContent(content.faq || faqData.generic.slice(0, 5), {
    zone: "",
    service: service.name,
  }, true);
  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage);

  return (
    <main className="pt-20">
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
        serviceTypes={content.situations?.items?.map((s: { title: string; description: string; price: number }) => ({
          name: s.title,
          description: s.description,
          price: s.price,
        })) || []}
      />

      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-primary-600">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{service.name}</li>
          </ol>
        </div>
      </nav>

      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-gray-50">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
              {content.hero?.badge || `🔐 ${service.name} 24h/24`}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {content.hero?.title || service.name}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {content.hero?.subtitle || service.longDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={siteConfig.phoneLink} className="btn-phone text-lg">📞 {siteConfig.phone}</a>
              <Link href="/contact" className="btn-secondary">Demander un devis</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-8">Nos autres services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link key={s.id} href={`/${s.slug}`} className="card hover:border-primary-200 transition-colors group">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 mb-1">{s.name}</h3>
                    <p className="text-gray-600 text-sm">{s.shortDesc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faq} title={`Questions sur ${service.name.toLowerCase()}`} />
      <CTA title={content.cta?.title || `Besoin d'un ${service.name.toLowerCase()} ?`} subtitle={content.cta?.subtitle} variant="dark" />
    </main>
  );
}
