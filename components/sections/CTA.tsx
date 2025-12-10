import { siteConfig } from "@/config/site";

interface CTAProps {
  title?: string;
  subtitle?: string;
  variant?: "primary" | "dark";
}

export function CTA({
  title,
  subtitle,
  variant = "primary",
}: CTAProps) {
  const defaultTitle = `Besoin d'un serrurier à ${siteConfig.city} ?`;
  const defaultSubtitle = `Notre équipe intervient 24h/24 et 7j/7. Appelez-nous pour une intervention rapide ou un devis gratuit.`;

  const bgClass = variant === "dark" 
    ? "bg-gray-900" 
    : "bg-gradient-to-r from-primary-600 to-primary-700";

  return (
    <section className={`py-16 md:py-20 ${bgClass} text-white`}>
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title || defaultTitle}
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          {subtitle || defaultSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={siteConfig.phoneLink} className="btn-phone text-lg">
            📞 {siteConfig.phone}
          </a>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-primary-700 transition-colors"
          >
            Demander un devis
          </a>
        </div>
        <p className="text-sm text-white/60 mt-6">
          Disponible 24h/24 • 7j/7 • Intervention en 30 min
        </p>
      </div>
    </section>
  );
}

