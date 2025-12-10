import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import faqData from "@/content/faq.json";
import pageData from "@/content/pages/installation.json";

// Charger le contenu avec les variables remplacées
const content = getPageContent(pageData);

export const metadata: Metadata = {
  title: `Installation & Changement de Serrure`,
  description: `Installation et changement de serrure à ${siteConfig.city}. Serrures certifiées A2P, cylindres haute sécurité, blindage de porte. Devis gratuit. ☎️ ${siteConfig.phone}`,
};

export default function InstallationPage() {
  return (
    <main className="pt-20">
      {/* Hero Installation */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-primary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                {content.hero.badge}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {content.hero.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                {content.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a href={siteConfig.phoneLink} className="btn-primary">
                  📞 Devis gratuit
                </a>
                <a href="/tarifs" className="btn-secondary">
                  Voir nos tarifs
                </a>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-4">
                {content.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                    <span className="text-2xl">{cert.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/installation-serrure.webp"
                  alt={`Installation de serrure ${siteConfig.city}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Installation */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Nos prestations d&apos;installation</h2>
            <p className="section-subtitle mx-auto">
              Du simple changement de cylindre au blindage complet de porte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.prestations.map((item, index) => (
              <div key={index} className="card border-2 border-gray-100 hover:border-primary-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {item.description}
                    </p>
                    <p className="text-primary-600 font-semibold">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Marques de serrures</h2>
            <p className="section-subtitle mx-auto">
              Nous installons toutes les grandes marques de serrurerie.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {content.brands.map((brand) => (
              <div
                key={brand}
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-gray-900">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={getPageContent(faqData).filter(q => 
          q.question.toLowerCase().includes('serrure') || 
          q.question.toLowerCase().includes('marque') ||
          q.question.toLowerCase().includes('garantie')
        )}
        title="Questions sur l'installation"
      />

      {/* CTA */}
      <CTA
        title={content.cta.title}
        subtitle={content.cta.subtitle}
      />
    </main>
  );
}
