import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import faqData from "@/content/faq.json";
import pageData from "@/content/pages/installation.json";

// Charger le contenu avec les variables remplacées (sans ville)
const content = getPageContent(pageData, undefined, true);

// Meta optimisés < 60 / 155 caractères (sans mention de ville)
export const metadata: Metadata = {
  title: `Installation Serrure - Serrures A2P | Hermès`,
  description: `Installation serrure professionnelle. Serrures A2P, cylindres haute sécurité, blindage porte. Devis gratuit.`,
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
                  src="/images/services/reparation-serrure-serrurier-hermes.webp"
                  alt="Installation de serrure professionnelle"
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
            {content.prestations.map((item, index) => {
              // Map des images pour chaque prestation
              const prestationImages: Record<string, string> = {
                "Changement de cylindre": "/images/services/changement-de-barillet-serrurier-hermes.webp",
                "Changement de serrure complète": "/images/services/changement-serrure-serrurier-hermes.webp",
                "Blindage de porte": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
                "Porte blindée": "/images/services/reparation-serrure-serrurier-hermes.webp",
              };
              
              return (
                <div key={index} className="card border-2 border-gray-100 hover:border-primary-200 relative overflow-hidden group min-h-[200px]">
                  {/* Image de fond */}
                  <div className="absolute inset-0">
                    <Image
                      src={prestationImages[item.title] || "/images/services/reparation-serrure-serrurier-hermes.webp"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {/* Filtre bleuté léger */}
                    <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/25 transition-colors duration-300"></div>
                  </div>
                  
                  {/* Contenu avec fond semi-transparent pour meilleure lisibilité */}
                  <div className="flex items-start gap-4 relative z-10 p-6">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                      {item.icon}
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-primary-600 font-semibold text-base">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Fichet", logo: "/images/logos/brands/serrurier-heracles-serrure.webp" },
              { name: "Vachette", logo: "/images/logos/brands/serrurier-vachette.webp" },
              { name: "Pollux", logo: "/images/logos/brands/serrurier-pollux.webp" },
              { name: "JPM", logo: "/images/logos/brands/serrurier-jpm.webp" },
              { name: "Abloy", logo: "/images/logos/brands/serrurier-abus-marque.webp" },
              { name: "Bricard", logo: "/images/logos/brands/serrurier-bricard-serrure.webp" },
              { name: "Mul-T-Lock", logo: "/images/logos/brands/serrurier-mult-t-lock-serrure.webp" },
              { name: "Picard", logo: "/images/logos/brands/serrurier-picard-serrure.webp" },
              { name: "Mottura", logo: "/images/logos/brands/serrurier-motura-serrure.webp" },
              { name: "Yale", logo: "/images/logos/brands/serrurier-yale-serrure.webp" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="bg-white rounded-xl p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  width={120}
                  height={80}
                  className="object-contain transition-all duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={getPageContent(faqData.generic, undefined, true).filter((q: { question: string; answer: string }) => 
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
