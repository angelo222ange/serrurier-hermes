import { Hero } from "@/components/sections/Hero";
import { Urgences } from "@/components/sections/Urgences";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Zones } from "@/components/sections/Zones";
import { Tarifs } from "@/components/sections/Tarifs";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Brands } from "@/components/sections/Brands";
import { CTA } from "@/components/sections/CTA";
import { regionConfigs, zonesMontpellier } from "@/config/site";
import { defaultFAQ, getReviewsForZone } from "@/lib/cityConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Serrurier Montpellier 24h/24 - Intervention 20 min | Hermès`,
  description: `Serrurier Montpellier disponible 24h/24. Intervention en 20 min. Ouverture porte dès 69€. Devis gratuit ☎️ ${regionConfigs.montpellier.phone}`,
  keywords: [
    "serrurier montpellier",
    "serrurier montpellier 24h/24",
    "dépannage serrurerie montpellier",
    "ouverture de porte montpellier",
    "changement serrure montpellier",
    "serrurier urgence montpellier",
  ],
  openGraph: {
    title: `Serrurier Montpellier - Intervention 24h/24`,
    description: `Serrurier à Montpellier. Intervention en 20 min. Ouverture porte, changement serrure. ☎️ ${regionConfigs.montpellier.phone}`,
    type: "website",
    locale: "fr_FR",
    siteName: "Serrurier Hermès",
  },
  twitter: {
    card: "summary_large_image",
    title: `Serrurier Montpellier 24h/24`,
    description: `Intervention 20 min à Montpellier. Ouverture porte dès 69€. Devis gratuit.`,
  },
  alternates: {
    canonical: `https://serrurier-hermes.com/serrurier-montpellier/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SerrurierMontpellierPage() {
  // Convertir les zones de Montpellier au format attendu
  const montpellierZones = zonesMontpellier.map(z => ({
    name: z.name,
    slug: z.slug,
    postalCode: z.postalCode,
    time: z.time || "20 min",
    image: 'image' in z ? z.image : undefined,
  }));

  // Préparer les FAQ avec le nom de la ville
  const montpellierFAQ = defaultFAQ.map(item => ({
    question: item.question.replace(/\{city\}/g, "Montpellier"),
    answer: item.answer.replace(/\{city\}/g, "Montpellier"),
  }));

  // Récupérer les avis pour Montpellier
  const montpellierReviews = getReviewsForZone("montpellier", "Montpellier");

  return (
    <main>
      {/* Hero Section */}
      <Hero 
        city="Montpellier"
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />

      {/* Urgences / Points de douleur */}
      <Urgences 
        city="Montpellier"
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />

      {/* Nos Services */}
      <Services 
        city="Montpellier"
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />

      {/* Pourquoi nous choisir */}
      <WhyUs 
        city="Montpellier"
      />

      {/* Comment ça marche */}
      <HowItWorks 
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />

      {/* Tarifs */}
      <Tarifs 
        city="Montpellier"
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />

      {/* Zones d'intervention */}
      <Zones 
        displayZones={montpellierZones}
        city="Montpellier"
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />

      {/* Avis clients */}
      <Reviews 
        city="Montpellier"
        reviews={montpellierReviews}
      />

      {/* FAQ */}
      <FAQ 
        title={`Questions Fréquentes - Serrurier Montpellier`}
        city="Montpellier"
        items={montpellierFAQ}
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />

      {/* Marques partenaires */}
      <Brands />

      {/* CTA Final */}
      <CTA 
        city="Montpellier"
        phone={regionConfigs.montpellier.phone}
        phoneLink={regionConfigs.montpellier.phoneLink}
      />
    </main>
  );
}
