import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, zones } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import faqData from "@/content/faq.json";

interface Props {
  params: { slug: string };
}

// Générer les pages statiques pour chaque zone
export function generateStaticParams() {
  return zones
    .filter(zone => !zone.isMain)
    .map((zone) => ({
      slug: zone.slug,
    }));
}

// Générer les métadonnées
export function generateMetadata({ params }: Props): Metadata {
  const zone = zones.find((z) => z.slug === params.slug);
  
  if (!zone) {
    return { title: "Zone non trouvée" };
  }

  return {
    title: `Serrurier ${zone.name} - Dépannage 24h/24`,
    description: `Serrurier à ${zone.name} (${zone.postalCode}). Intervention rapide 24h/24 pour dépannage, ouverture de porte, changement de serrure. ☎️ ${siteConfig.phone}`,
  };
}

export default function ZonePage({ params }: Props) {
  const zone = zones.find((z) => z.slug === params.slug);

  if (!zone) {
    notFound();
  }

  // Adapter les FAQ pour la zone
  const zoneFaq = faqData.map(item => ({
    ...item,
    answer: item.answer.replace(/Lille/g, zone.name),
  }));

  return (
    <main>
      {/* Hero adapté à la zone */}
      <Hero
        badge={`📍 Serrurier ${zone.name}`}
        title={`Serrurier ${zone.name}`}
        subtitle={`Intervention rapide en 30 minutes à ${zone.name} (${zone.postalCode}). Dépannage, ouverture de porte, changement de serrure. Disponible 24h/24.`}
      />

      {/* Services */}
      <Services
        title={`Nos services à ${zone.name}`}
        subtitle={`${siteConfig.name} intervient à ${zone.name} pour tous vos besoins en serrurerie.`}
      />

      {/* Contenu SEO */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Votre serrurier à {zone.name}</h2>
            <p>
              Vous recherchez un <strong>serrurier à {zone.name}</strong> ? {siteConfig.name} est à votre service 
              24 heures sur 24 et 7 jours sur 7. Basés à {siteConfig.city}, nous intervenons rapidement 
              à {zone.name} ({zone.postalCode}) et dans toutes les communes avoisinantes.
            </p>
            <p>
              Que vous ayez besoin d&apos;une <strong>ouverture de porte</strong>, d&apos;un <strong>changement de serrure</strong>, 
              ou d&apos;une intervention d&apos;urgence suite à une effraction, notre équipe de serruriers professionnels 
              est équipée pour répondre à toutes vos demandes.
            </p>
            <h3>Pourquoi choisir {siteConfig.name} à {zone.name} ?</h3>
            <ul>
              <li><strong>Intervention en 30 minutes</strong> sur {zone.name}</li>
              <li><strong>Disponible 24h/24</strong>, y compris week-ends et jours fériés</li>
              <li><strong>Devis gratuit</strong> communiqué par téléphone</li>
              <li><strong>Prix transparents</strong>, pas de mauvaise surprise</li>
              <li><strong>Artisans qualifiés</strong> avec plus de 10 ans d&apos;expérience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={zoneFaq.slice(0, 5)}
        title={`Questions fréquentes - Serrurier ${zone.name}`}
      />

      {/* CTA */}
      <CTA
        title={`Besoin d'un serrurier à ${zone.name} ?`}
        subtitle={`Intervention rapide 24h/24. Appelez-nous maintenant !`}
      />
    </main>
  );
}

