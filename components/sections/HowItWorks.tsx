import { siteConfig } from "@/config/site";

interface Step {
  number: string;
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];

  phone?: string;
  phoneLink?: string;
}

const defaultSteps: Step[] = [
  {
    number: "01",
    icon: "📞",
    title: "Appelez-nous",
    description: "Décrivez votre problème au téléphone. Nous vous donnons un devis immédiat.",
  },
  {
    number: "02",
    icon: "🚗",
    title: "Intervention rapide",
    description: "Un serrurier qualifié arrive chez vous en 20 minutes maximum.",
  },
  {
    number: "03",
    icon: "✅",
    title: "Problème résolu",
    description: "Intervention rapide et soignée. Paiement CB ou espèces, facture fournie.",
  },
];

export function HowItWorks({
  title = "Comment ça marche ?",
  subtitle = "Un service simple et rapide en 3 étapes",
  steps = defaultSteps,
  phone,
  phoneLink,
}: HowItWorksProps) {
  const displayPhone = phone || siteConfig.phone;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="badge-primary mb-4">📋 Processus</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">{subtitle}</p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Ligne de connexion - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative text-center group"
              >
                {/* Number circle */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-xl group-hover:shadow-emerald-500/40 group-hover:scale-105 transition-all duration-300">
                    <span className="text-3xl sm:text-4xl">{step.icon}</span>
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl">
            <div className="text-center sm:text-left">
              <p className="font-bold text-gray-900 text-lg mb-1">
                Prêt à résoudre votre problème ?
              </p>
              <p className="text-gray-600 text-sm">
                Intervention en 20 min · Devis gratuit
              </p>
            </div>
            <a href={displayPhoneLink} className="btn-phone whitespace-nowrap">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              {displayPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
