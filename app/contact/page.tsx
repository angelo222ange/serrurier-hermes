import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/sections/ContactForm";

// ⚠️ ATTENTION : Cette page globale est DEPRECATED
// Les utilisateurs devraient utiliser /serrurier-[city]/contact
// Cette page sert uniquement de fallback (non indexée)

// Meta Title optimisé < 60 caractères | Meta Description < 155 caractères
export const metadata: Metadata = {
  title: `Contact Serrurier 24h/24 | Hermès`,
  description: `Contactez Serrurier Hermès 24h/24. Urgences et devis gratuit. Intervention 20 min.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Contact</li>
          </ol>
        </div>
      </nav>

      {/* Formulaire de contact - utilise le composant ContactForm avec région par défaut (Paris) */}
      <ContactForm region="paris" />
    </main>
  );
}