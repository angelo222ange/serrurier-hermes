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
import { regionConfigs, zonesBordeaux } from "@/config/site";
import { defaultFAQ, getReviewsForZone } from "@/lib/cityConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Serrurier Bordeaux 24h/24 - Intervention 20 min | Hermès`,
  description: `Serrurier Bordeaux disponible 24h/24. Intervention en 20 min. Ouverture porte dès 69€. Devis gratuit ☎️ ${regionConfigs.bordeaux.phone}`,
  keywords: [
    "serrurier bordeaux",
    "serrurier bordeaux 24h/24",
    "dépannage serrurerie bordeaux",
    "ouverture de porte bordeaux",
    "changement serrure bordeaux",
    "serrurier urgence bordeaux",
  ],
  openGraph: {
    title: `Serrurier Bordeaux - Intervention 24h/24`,
    description: `Serrurier à Bordeaux. Intervention en 20 min. Ouverture porte, changement serrure. ☎️ ${regionConfigs.bordeaux.phone}`,
    type: "website",
    locale: "fr_FR",
    siteName: "Serrurier Hermès",
  },
  twitter: {
    card: "summary_large_image",
    title: `Serrurier Bordeaux 24h/24`,
    description: `Intervention 20 min à Bordeaux. Ouverture porte dès 69€. Devis gratuit.`,
  },
  alternates: {
    canonical: `https://serrurier-hermes.com/serrurier-bordeaux/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SerrurierBordeauxPage() {
  // Convertir les zones de Bordeaux au format attendu
  const bordeauxZones = zonesBordeaux.map(z => ({
    name: z.name,
    slug: z.slug,
    postalCode: z.postalCode,
    time: z.time || "20 min",
    image: 'image' in z ? z.image : undefined,
  }));

  // Préparer les FAQ avec le nom de la ville
  const bordeauxFAQ = defaultFAQ.map(item => ({
    question: item.question.replace(/\{city\}/g, "Bordeaux"),
    answer: item.answer.replace(/\{city\}/g, "Bordeaux"),
  }));

  // Récupérer les avis pour Bordeaux
  const bordeauxReviews = getReviewsForZone("bordeaux", "Bordeaux");

  return (
    <main>
      {/* Hero Section */}
      <Hero 
        city="Bordeaux"
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />

      {/* Urgences / Points de douleur */}
      <Urgences 
        city="Bordeaux"
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />

      {/* Nos Services */}
      <Services 
        city="Bordeaux"
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />

      {/* Pourquoi nous choisir */}
      <WhyUs 
        city="Bordeaux"
      />

      {/* Comment ça marche */}
      <HowItWorks 
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />

      {/* Tarifs */}
      <Tarifs 
        city="Bordeaux"
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />

      {/* Zones d'intervention */}
      <Zones 
        displayZones={bordeauxZones}
        city="Bordeaux"
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />

      {/* Avis clients */}
      <Reviews 
        city="Bordeaux"
        reviews={bordeauxReviews}
      />

      {/* FAQ */}
      <FAQ 
        title={`Questions Fréquentes - Serrurier Bordeaux`}
        city="Bordeaux"
        items={bordeauxFAQ}
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />

      {/* Marques partenaires */}
      <Brands />

      {/* CTA Final */}
      <CTA 
        city="Bordeaux"
        phone={regionConfigs.bordeaux.phone}
        phoneLink={regionConfigs.bordeaux.phoneLink}
      />
    </main>
  );
}
