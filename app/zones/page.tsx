import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, zones } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: `Zones d'intervention - Serrurier`,
  description: `Serrurier à ${siteConfig.city} et environs. Intervention rapide dans toute l'agglomération : ${zones.slice(0, 5).map(z => z.name).join(', ')}... ☎️ ${siteConfig.phone}`,
};

export default function ZonesPage() {
  // Séparer la ville principale des autres
  const mainCity = zones.find(z => z.isMain);
  const otherZones = zones.filter(z => !z.isMain);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="container text-center">
          <span className="badge-primary mb-4">📍 Zones d&apos;intervention</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Serrurier {siteConfig.city} et environs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre équipe intervient dans tout {siteConfig.city} et son agglomération.
            Intervention rapide en 30 minutes.
          </p>
        </div>
      </section>

      {/* Ville principale */}
      {mainCity && (
        <section className="section bg-white">
          <div className="container">
            <div className="bg-primary-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Serrurier {mainCity.name}
              </h2>
              <p className="text-primary-100 text-lg mb-6 max-w-2xl mx-auto">
                Basés à {mainCity.name}, nous intervenons rapidement dans tout le {mainCity.postalCode} 
                pour tous vos besoins en serrurerie : dépannage, installation, changement de serrure.
              </p>
              <a href={siteConfig.phoneLink} className="btn-phone inline-flex">
                📞 {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Autres zones */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">
            Toutes nos zones d&apos;intervention
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherZones.map((zone) => (
              <Link
                key={zone.slug}
                href={`/zones/${zone.slug}`}
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-primary-200 border border-gray-100 transition-all"
              >
                <svg 
                  className="w-8 h-8 text-primary-600 mx-auto mb-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {zone.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {zone.postalCode}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infos intervention */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Intervention rapide</h3>
              <p className="text-gray-600 text-sm">
                Nos serruriers arrivent en 30 minutes en moyenne sur toutes les communes listées.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Déplacement inclus</h3>
              <p className="text-gray-600 text-sm">
                Le déplacement est inclus dans le devis pour toutes les communes de l&apos;agglomération.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Disponible 24h/24</h3>
              <p className="text-gray-600 text-sm">
                Nos équipes sont disponibles jour et nuit, week-ends et jours fériés compris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </main>
  );
}

