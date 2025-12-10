import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import homeContent from "@/content/pages/home.json";

// Charger le contenu avec variables remplacées
const content = getPageContent(homeContent);

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

interface WhyUsProps {
  title?: string;
  subtitle?: string;
  advantages?: Advantage[];
}

export function WhyUs({
  title,
  subtitle,
  advantages,
}: WhyUsProps) {
  // Utiliser les props ou les valeurs du fichier de contenu
  const displayTitle = title || content.whyUs.title;
  const displaySubtitle = subtitle || content.whyUs.subtitle;
  const displayAdvantages = advantages || content.whyUs.advantages;

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/serrurier-travail.webp"
                alt={`Serrurier professionnel ${siteConfig.city}`}
                fill
                className="object-cover"
              />
            </div>
            {/* Badge superposé */}
            <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-2xl p-6 shadow-xl">
              <p className="text-4xl font-bold">10+</p>
              <p className="text-primary-100 text-sm">ans d&apos;expérience</p>
            </div>
          </div>

          {/* Contenu */}
          <div className="order-1 lg:order-2">
            <span className="badge-primary mb-4">✨ Nos engagements</span>
            <h2 className="section-title">{displayTitle}</h2>
            <p className="section-subtitle mb-8">
              {displaySubtitle}
            </p>

            <div className="space-y-4">
              {displayAdvantages.map((advantage, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                    {advantage.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a href={siteConfig.phoneLink} className="btn-primary">
                Contactez-nous maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
