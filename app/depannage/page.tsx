import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import faqData from "@/content/faq.json";
import pageData from "@/content/pages/depannage.json";

// Charger le contenu avec les variables remplacées (sans ville)
const content = getPageContent(pageData, undefined, true);

// Meta optimisés < 60 / 155 caractères (sans mention de ville)
export const metadata: Metadata = {
  title: `Dépannage Serrurier 24h/24 - Urgence | Hermès`,
  description: `Dépannage serrurier urgence. Intervention 20 min. Porte claquée, serrure bloquée. 24h/24 et 7j/7. Devis gratuit.`,
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
                  src="/images/services/depannage-serrurier-urgence-nuit-hermes.webp"
                  alt="Dépannage serrurier urgence"
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
            {content.interventions.map((item, index) => {
              // Map des images pour chaque type d'intervention
              const interventionImages: Record<string, string> = {
                "Porte claquée": "/images/services/serrurier-porte-claquer-serrurier-hermes.webp",
                "Serrure bloquée": "/images/services/porte-bloquer-serrurier.webp",
                "Clés perdues": "/images/services/ouverture-de-porte-classique-hermes.webp",
                "Après effraction": "/images/services/apres-effraction-serrurier.webp",
                "Clé cassée": "/images/services/cle-casse-serrure-serrurier-toulouse.webp",
                "Porte blindée": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
              };
              
              return (
                <div key={index} className="relative overflow-hidden rounded-2xl shadow-md group min-h-[280px] flex items-end">
                  {/* Image de fond */}
                  <div className="absolute inset-0">
                    <Image
                      src={interventionImages[item.title] || "/images/services/depannage-serrurier-urgence-nuit-hermes.webp"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {/* Filtre de couleur émeraude */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/60 to-emerald-900/30 group-hover:from-emerald-900/95 group-hover:via-emerald-900/70 transition-all duration-300" />
                  </div>
                  
                  {/* Contenu */}
                  <div className="relative z-10 p-6 w-full">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ 
        items={getPageContent(faqData.generic, undefined, true).slice(0, 4)}
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
