import { siteConfig } from "@/config/site";

interface TarifCategory {
  name: string;
  items: Array<{
    name: string;
    price: number;
  }>;
}

interface TarifsProps {
  title?: string;
  subtitle?: string;
  categories?: TarifCategory[];
  city?: string;
  phone?: string;
  phoneLink?: string;
}

const defaultCategories: TarifCategory[] = [
  {
    name: "Ouverture de porte",
    items: [
      { name: "Porte claquée (sans dégât)", price: 69 },
      { name: "Porte fermée à clé", price: 89 },
      { name: "Porte blindée", price: 149 },
      { name: "Porte cave/garage", price: 79 },
    ],
  },
  {
    name: "Changement de serrure",
    items: [
      { name: "Cylindre simple", price: 89 },
      { name: "Serrure standard", price: 119 },
      { name: "Serrure 3 points", price: 189 },
      { name: "Serrure 5 points", price: 249 },
    ],
  },
  {
    name: "Dépannage & Réparation",
    items: [
      { name: "Extraction clé cassée", price: 69 },
      { name: "Réparation serrure", price: 79 },
      { name: "Dégrippage/ajustement", price: 59 },
      { name: "Serrure A2P", price: 289 },
    ],
  },
];

export function Tarifs({
  title = "Nos Tarifs",
  subtitle,
  categories = defaultCategories,
  city,
  phone,
  phoneLink,
}: TarifsProps) {
  const displayCity = city || siteConfig.city;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  const defaultSubtitle = `Tarifs transparents pour tous nos services de serrurerie à ${displayCity}. Devis gratuit avant intervention.`;

  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="badge-primary mb-4">💰 Transparence</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Tarifs Grid - avec microdata pour LLM/SEO */}
        <div 
          className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-10"
          itemScope 
          itemType="https://schema.org/OfferCatalog"
        >
          <meta itemProp="name" content={`Tarifs serrurerie ${displayCity}`} />
          {categories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
                <h3 className="font-bold text-white text-lg" itemProp="name">
                  {category.name}
                </h3>
              </div>
              
              {/* Items */}
              <div className="p-5">
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      itemScope
                      itemType="https://schema.org/Offer"
                      itemProp="itemListElement"
                    >
                      <span className="text-gray-700 text-sm font-medium" itemProp="name">{item.name}</span>
                      <span 
                        className="flex items-baseline gap-1 flex-shrink-0 ml-2"
                        itemProp="priceSpecification"
                        itemScope
                        itemType="https://schema.org/PriceSpecification"
                      >
                        <span className="text-gray-700 text-xs font-medium">dès</span>
                        <span className="font-bold text-emerald-700">
                          <span itemProp="price">{item.price}</span>€
                        </span>
                        <meta itemProp="priceCurrency" content="EUR" />
                        <meta itemProp="minPrice" content={String(item.price)} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Note importante */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Devis gratuit et sans engagement
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Les tarifs indiqués sont donnés à titre indicatif. Un devis précis vous sera communiqué 
                par téléphone ou sur place avant toute intervention. Pas de frais cachés.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Devis gratuit
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Prix fixe avant intervention
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Paiement CB accepté
                </span>
              </div>
            </div>
            
            <div className="w-full lg:w-auto">
              <a href={displayPhoneLink} className="btn-phone w-full lg:w-auto justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
