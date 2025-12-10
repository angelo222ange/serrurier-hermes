import { siteConfig } from "@/config/site";

interface TarifItem {
  name: string;
  priceFrom: number;
  priceTo?: number;
  description?: string;
  isPopular?: boolean;
}

interface TarifsProps {
  title?: string;
  subtitle?: string;
  items: TarifItem[];
}

export function Tarifs({
  title = "Nos Tarifs",
  subtitle,
  items,
}: TarifsProps) {
  const defaultSubtitle = `Tarifs transparents et devis gratuit. Pas de mauvaise surprise, nous vous communiquons le prix avant intervention.`;

  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-primary mb-4">💰 Transparence</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Tarifs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                relative bg-white rounded-2xl p-6 shadow-sm border-2 transition-all
                ${item.isPopular 
                  ? 'border-primary-500 shadow-lg shadow-primary-100' 
                  : 'border-gray-100 hover:border-primary-200'
                }
              `}
            >
              {item.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Le plus demandé
                </span>
              )}
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {item.name}
              </h3>
              
              {item.description && (
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
              )}

              <div className="flex items-baseline gap-1">
                <span className="text-sm text-gray-500">À partir de</span>
                <span className="text-3xl font-bold text-primary-600">
                  {item.priceFrom}€
                </span>
                {item.priceTo && (
                  <>
                    <span className="text-gray-400">-</span>
                    <span className="text-xl font-semibold text-gray-700">
                      {item.priceTo}€
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note importante */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">
                Devis gratuit et sans engagement
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Les tarifs indiqués sont donnés à titre indicatif. Un devis précis vous sera communiqué 
                par téléphone ou sur place avant toute intervention. Pas de frais cachés, pas de mauvaise surprise.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Devis gratuit
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Prix fixe avant intervention
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Paiement CB accepté
                </span>
              </div>
            </div>
            <a href={siteConfig.phoneLink} className="btn-primary whitespace-nowrap">
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

