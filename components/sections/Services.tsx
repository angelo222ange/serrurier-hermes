import Link from "next/link";
import Image from "next/image";
import { siteConfig, services } from "@/config/site";

interface ServicesProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  zoneSlug?: string;
  citySlug?: string;
  city?: string;
  phone?: string;
  phoneLink?: string;
}

// Images par défaut pour chaque service
const serviceImages: Record<string, string> = {
  "depannage": "/images/services/depannage-serrurier-urgence-nuit-hermes.webp",
  "ouverture-de-porte": "/images/services/serrurier-porte-claquer-serrurier-hermes.webp",
  "changement-serrure": "/images/services/changement-serrure-serrurier-hermes.webp",
  "installation-serrure": "/images/services/reparation-serrure-serrurier-hermes.webp",
  "blindage-porte": "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
  "remplacement-cylindre": "/images/services/changement-de-barillet-serrurier-hermes.webp",
};

// Prix de départ par service
const servicePrices: Record<string, number> = {
  "depannage": 59,
  "ouverture-de-porte": 69,
  "changement-serrure": 89,
  "installation-serrure": 119,
  "blindage-porte": 890,
  "remplacement-cylindre": 89,
};

export function Services({
  title = "Nos Services de Serrurerie",
  subtitle,
  showAll = true,
  zoneSlug,
  citySlug,
  city,
  phone,
  phoneLink,
}: ServicesProps) {
  const displayCity = city || siteConfig.city;
  const displayPhone = phone || siteConfig.phone;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  const defaultSubtitle = `Serrurier Hermès propose une gamme complète de services de serrurerie à ${displayCity} et ses environs.`;

  const getServiceUrl = (serviceSlug: string) => {
    // Si on a un citySlug, on redirige vers la page service de la ville
    // Sinon, on redirige vers la page générique
    return citySlug ? `/serrurier-${citySlug}/${serviceSlug}` : `/${serviceSlug}`;
  };

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="badge-primary mb-4">🔧 Services</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Services Grid - avec microdata pour LLM/SEO */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <meta itemProp="name" content={`Services de serrurerie ${displayCity}`} />
          <meta itemProp="numberOfItems" content={String(services.length)} />
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={getServiceUrl(service.slug)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[3/2]"
              itemScope
              itemType="https://schema.org/Service"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <meta itemProp="serviceType" content="Locksmith" />
              <meta itemProp="areaServed" content={displayCity} />
              {/* Background Image */}
              <Image
                src={serviceImages[service.slug] || "/images/services/depannage-serrurier-urgence-nuit-hermes.webp"}
                alt={service.name}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                itemProp="image"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                {/* Icon */}
                <span className="text-3xl mb-2">{service.icon}</span>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors" itemProp="name">
                  {service.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm mb-3 line-clamp-2" itemProp="description">
                  {service.shortDesc}
                </p>
                
                {/* Prix + CTA - avec microdata Offer */}
                <div 
                  className="flex items-center justify-between"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-400 text-xs">À partir de</span>
                    <span className="text-lg font-bold text-emerald-400">
                      <span itemProp="price">{servicePrices[service.slug] || 69}</span>€
                    </span>
                    <meta itemProp="priceCurrency" content="EUR" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                  </div>
                  <span className="flex items-center gap-1 text-white text-sm font-medium group-hover:text-emerald-400 transition-colors">
                    En savoir plus
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        {showAll && (
          <div className="text-center mt-10">
            <a href={displayPhoneLink} className="btn-primary text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              Appelez-nous : {displayPhone}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
