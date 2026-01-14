import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildCityConfig, getAllZoneSlugs } from "@/lib/cityConfig";
import { ContactForm } from "@/components/sections/ContactForm";

interface PageProps {
  params: { city: string };
}

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllZoneSlugs().map(({ slug }) => ({ city: slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cityConfig = buildCityConfig(params.city);
  if (!cityConfig) return {};

  return {
    title: `Contact Serrurier ${cityConfig.name} 24h/24 | Hermès`,
    description: `Contactez votre serrurier à ${cityConfig.name}. Urgences 24h/24 - ${cityConfig.phone}. Intervention en 20 min. Devis gratuit.`,
  };
}

export default function ContactCityPage({ params }: PageProps) {
  const cityConfig = buildCityConfig(params.city);
  
  if (!cityConfig) {
    notFound();
  }

  return (
    <main className="pt-20">
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href={`/serrurier-${params.city}`} className="hover:text-primary-600">
                Serrurier {cityConfig.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Contact</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="container text-center">
          <span className="badge-primary mb-4">📞 Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez votre serrurier à {cityConfig.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Besoin d&apos;un serrurier à {cityConfig.name} ? 
            Notre équipe est disponible 24h/24 pour répondre à vos urgences et vos demandes de devis.
          </p>
        </div>
      </section>

      <ContactForm region={cityConfig.region} cityName={cityConfig.name} />
    </main>
  );
}
