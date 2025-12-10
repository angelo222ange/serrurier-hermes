import Link from "next/link";
import { siteConfig, zones } from "@/config/site";

interface ZonesProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export function Zones({
  title = "Zones d'intervention",
  subtitle,
  limit = 12,
}: ZonesProps) {
  const defaultSubtitle = `Nous intervenons à ${siteConfig.city} et dans toute l'agglomération. Intervention rapide en 30 minutes.`;
  const displayedZones = zones.slice(0, limit);

  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayedZones.map((zone) => (
            <Link
              key={zone.slug}
              href={`/zones/${zone.slug}`}
              className={`
                flex flex-col items-center p-4 rounded-xl text-center
                transition-all duration-200 hover:scale-105
                ${zone.isMain 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                  : 'bg-white shadow-sm hover:shadow-md border border-gray-100'
                }
              `}
            >
              <svg 
                className={`w-6 h-6 mb-2 ${zone.isMain ? 'text-white' : 'text-primary-600'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={`font-medium text-sm ${zone.isMain ? 'text-white' : 'text-gray-900'}`}>
                {zone.name}
              </span>
              <span className={`text-xs ${zone.isMain ? 'text-white/80' : 'text-gray-500'}`}>
                {zone.postalCode}
              </span>
            </Link>
          ))}
        </div>

        {/* Lien vers toutes les zones */}
        {zones.length > limit && (
          <div className="text-center mt-8">
            <Link href="/zones" className="btn-secondary">
              Voir toutes nos zones ({zones.length} villes)
            </Link>
          </div>
        )}

        {/* Bandeau urgence */}
        <div className="mt-12 bg-primary-600 rounded-2xl p-6 md:p-8 text-white text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Besoin d&apos;un serrurier en urgence ?
          </h3>
          <p className="text-primary-100 mb-4">
            Intervention rapide 24h/24 dans toute l&apos;agglomération de {siteConfig.city}
          </p>
          <a href={siteConfig.phoneLink} className="btn-phone inline-flex">
            📞 {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

