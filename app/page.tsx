import { Hero } from "@/components/sections/Hero";
import { Urgences } from "@/components/sections/Urgences";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Tarifs } from "@/components/sections/Tarifs";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Brands } from "@/components/sections/Brands";
import { CTA } from "@/components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Serrurier 24h/24 - Intervention 20 min | Hermès`,
  description: `Serrurier disponible 24h/24 en France. Intervention en 20 min. Ouverture porte dès 69€. Devis gratuit. Paris, Bordeaux, Montpellier.`,
  keywords: [
    "serrurier",
    "serrurier 24h/24",
    "dépannage serrurerie",
    "ouverture de porte",
    "changement serrure",
    "serrurier urgence",
    "serrurier paris",
    "serrurier bordeaux",
    "serrurier montpellier",
  ],
  openGraph: {
    title: `Serrurier 24h/24 - Intervention rapide | Hermès`,
    description: `Service de serrurerie 24h/24. Intervention en 20 min. Ouverture porte, changement serrure. Présent à Paris, Bordeaux, Montpellier.`,
    type: "website",
    locale: "fr_FR",
    siteName: "Serrurier Hermès",
  },
  twitter: {
    card: "summary_large_image",
    title: `Serrurier 24h/24 - Service rapide`,
    description: `Intervention 20 min partout en France. Ouverture porte dès 69€. Devis gratuit.`,
  },
  alternates: {
    canonical: `https://serrurier-hermes.com/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <main>
      {/* Hero Section - Version générique */}
      <Hero 
        city="France"
        title="Serrurier Professionnel"
        subtitle="Intervention rapide 24h/24 et 7j/7. Ouverture de porte, changement de serrure, dépannage urgent partout en France."
        showReviews={true}
      />

      {/* Urgences / Points de douleur */}
      <Urgences />

      {/* Nos Services */}
      <Services />

      {/* Pourquoi nous choisir */}
      <WhyUs />

      {/* Comment ça marche */}
      <HowItWorks />

      {/* Tarifs */}
      <Tarifs />

      {/* Avis clients */}
      <Reviews />

      {/* FAQ */}
      <FAQ 
        title="Questions Fréquentes"
      />

      {/* Marques partenaires */}
      <Brands />

      {/* CTA Final */}
      <CTA 
        title="Besoin d'un serrurier ?"
        subtitle="Notre équipe intervient 24h/24 et 7j/7. Appelez-nous pour une intervention rapide ou un devis gratuit."
      />
    </main>
  );
}
