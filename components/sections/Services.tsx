import Link from "next/link";
import { siteConfig, services } from "@/config/site";

interface ServicesProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export function Services({
  title = "Nos Services",
  subtitle,
  showAll = true,
}: ServicesProps) {
  const defaultSubtitle = `${siteConfig.name} propose une gamme complète de services de serrurerie à ${siteConfig.city} et ses environs.`;

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="card group hover:border-primary-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.shortDesc}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-primary-600 text-sm font-semibold">
                <span>En savoir plus</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        {showAll && (
          <div className="text-center mt-10">
            <a href={siteConfig.phoneLink} className="btn-primary">
              Appelez-nous : {siteConfig.phone}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

