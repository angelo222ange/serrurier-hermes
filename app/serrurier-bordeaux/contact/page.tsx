import type { Metadata } from "next";
import Link from "next/link";
import { regionConfigs } from "@/config/site";
import { ContactForm } from "@/components/sections/ContactForm";

// Meta Title optimisé < 60 caractères | Meta Description < 155 caractères
export const metadata: Metadata = {
  title: `Contact Serrurier Bordeaux 24h/24 | Hermès`,
  description: `Contactez votre serrurier à Bordeaux. Urgences 24h/24 - ${regionConfigs.bordeaux.phone}. Intervention en 20 min. Devis gratuit.`,
  keywords: [
    "contact serrurier bordeaux",
    "serrurier bordeaux urgence",
    "devis serrurier bordeaux",
    "téléphone serrurier bordeaux",
  ],
  openGraph: {
    title: `Contact Serrurier Bordeaux - Urgences 24h/24`,
    description: `Contactez votre serrurier à Bordeaux. Intervention 20 min. ☎️ ${regionConfigs.bordeaux.phone}`,
    type: "website",
    locale: "fr_FR",
    siteName: "Serrurier Hermès",
  },
  alternates: {
    canonical: `https://serrurier-hermes.com/serrurier-bordeaux/contact/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactBordeauxPage() {
  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/serrurier-bordeaux" className="hover:text-primary-600">
                Serrurier Bordeaux
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Contact</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="container text-center">
          <span className="badge-primary mb-4">📞 Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez votre serrurier à Bordeaux
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Besoin d&apos;un serrurier à Bordeaux ? 
            Notre équipe est disponible 24h/24 pour répondre à vos urgences et vos demandes de devis.
          </p>
        </div>
      </section>

      {/* Formulaire de contact avec région spécifique */}
      <ContactForm region="bordeaux" cityName="Bordeaux" />
    </main>
  );
}
