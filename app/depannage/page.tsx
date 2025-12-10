import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import faqData from "@/content/faq.json";
import pageData from "@/content/pages/depannage.json";

// Charger le contenu avec les variables remplacées
const content = getPageContent(pageData);

export const metadata: Metadata = {
  title: `Dépannage Serrurier Urgence 24h/24`,
  description: `Serrurier d'urgence à ${siteConfig.city}. Intervention en 30 min pour ouverture de porte, serrure bloquée, effraction. Disponible 24h/24 et 7j/7. ☎️ ${siteConfig.phone}`,
};

export default function DepannagePage() {
  return (
    <main className="pt-20">
      {/* Hero Dépannage */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
                {content.hero.badge}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {content.hero.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                {content.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a href={siteConfig.phoneLink} className="btn-phone text-lg">
                  📞 {siteConfig.phone}
                </a>
                <a href="/contact" className="btn-secondary">
                  Demander un devis
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {content.stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/depannage-urgence.webp"
                  alt={`Dépannage serrurier urgence ${siteConfig.city}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types d'interventions */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Nos interventions d&apos;urgence</h2>
            <p className="section-subtitle mx-auto">
              Nous intervenons rapidement pour tous types de problèmes de serrurerie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.interventions.map((item, index) => (
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

      {/* FAQ */}
      <FAQ 
        items={getPageContent(faqData).slice(0, 4)}
        title="Questions sur le dépannage"
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
