import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// Meta optimisés < 60 / 155 caractères
export const metadata: Metadata = {
  title: `CGU - Conditions Générales | Hermès`,
  description: `CGU Serrurier Hermès. Conditions d'utilisation, statut plateforme mise en relation, tarifs indicatifs, responsabilités.`,
  robots: { index: false, follow: true },
};

export default function CGUPage() {
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
            <li className="text-gray-900 font-medium">CGU</li>
          </ol>
        </div>
      </nav>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Conditions Générales d&apos;Utilisation
            </h1>

            {/* Préambule */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 not-prose">
              <p className="text-gray-700">
                Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;utilisation du site 
                internet <strong>{siteConfig.domain}</strong> édité par {siteConfig.name}. En utilisant 
                ce site, vous acceptez sans réserve les présentes conditions.
              </p>
            </div>

            <h2>Article 1 - Objet</h2>
            <p>
              Les présentes CGU ont pour objet de définir les conditions d&apos;utilisation du site 
              internet {siteConfig.domain} (ci-après &quot;le Site&quot;) et les services proposés par 
              {siteConfig.name} (ci-après &quot;la Plateforme&quot;).
            </p>

            <h2>Article 2 - Nature de la Plateforme</h2>
            <p>
              <strong>{siteConfig.name} est une plateforme de mise en relation.</strong>
            </p>
            <p>
              Notre rôle consiste exclusivement à mettre en contact des particuliers (ci-après &quot;les Utilisateurs&quot;) 
              avec des artisans serruriers indépendants et qualifiés (ci-après &quot;les Artisans Partenaires&quot;).
            </p>
            <p>
              <strong>Il est expressément précisé que :</strong>
            </p>
            <ul>
              <li>La Plateforme ne réalise aucune intervention de serrurerie</li>
              <li>Toutes les prestations sont effectuées par les Artisans Partenaires sous leur propre responsabilité</li>
              <li>Les Artisans Partenaires sont des professionnels indépendants, non salariés de la Plateforme</li>
              <li>Chaque Artisan Partenaire dispose de sa propre assurance responsabilité civile professionnelle</li>
            </ul>

            <h2>Article 3 - Services proposés</h2>
            <p>
              La Plateforme propose un service de mise en relation permettant aux Utilisateurs d&apos;entrer 
              en contact avec des Artisans Partenaires pour les prestations suivantes :
            </p>
            <ul>
              <li>Ouverture de porte (porte claquée, fermée à clé, porte blindée)</li>
              <li>Changement de serrure</li>
              <li>Remplacement de cylindre</li>
              <li>Installation de serrures</li>
              <li>Blindage de porte</li>
              <li>Dépannage urgent</li>
              <li>Sécurisation après effraction</li>
            </ul>

            <h2>Article 4 - Tarification</h2>
            <h3>4.1 Prix indicatifs</h3>
            <p>
              Les prix affichés sur le Site sont donnés <strong>à titre indicatif</strong> et correspondent 
              à des tarifs de base (&quot;à partir de&quot;). Ces prix ne constituent pas une offre contractuelle.
            </p>
            
            <h3>4.2 Devis</h3>
            <p>
              Un devis gratuit et sans engagement est systématiquement proposé avant toute intervention. 
              Ce devis peut être communiqué :
            </p>
            <ul>
              <li>Par téléphone lors de la prise de contact</li>
              <li>Sur place par l&apos;Artisan Partenaire après diagnostic</li>
            </ul>
            
            <h3>4.3 Prix final</h3>
            <p>
              Le prix final d&apos;une intervention est déterminé par l&apos;Artisan Partenaire après évaluation 
              de la situation et peut varier en fonction de :
            </p>
            <ul>
              <li>La nature exacte du problème</li>
              <li>Le type de serrure ou de porte</li>
              <li>Les pièces à remplacer</li>
              <li>La complexité de l&apos;intervention</li>
              <li>L&apos;heure de l&apos;intervention</li>
            </ul>

            <h2>Article 5 - Responsabilité</h2>
            <h3>5.1 Responsabilité de la Plateforme</h3>
            <p>
              En tant que plateforme de mise en relation, {siteConfig.name} :
            </p>
            <ul>
              <li>N&apos;est pas responsable de la qualité des interventions réalisées par les Artisans Partenaires</li>
              <li>N&apos;est pas responsable des dommages éventuels causés lors des interventions</li>
              <li>N&apos;est pas partie au contrat de prestation entre l&apos;Utilisateur et l&apos;Artisan Partenaire</li>
              <li>Ne garantit pas la disponibilité permanente des Artisans Partenaires</li>
            </ul>

            <h3>5.2 Responsabilité des Artisans Partenaires</h3>
            <p>
              Chaque Artisan Partenaire :
            </p>
            <ul>
              <li>Est seul responsable de ses prestations</li>
              <li>Dispose d&apos;une assurance responsabilité civile professionnelle</li>
              <li>S&apos;engage à respecter les règles de l&apos;art de son métier</li>
              <li>Fournit les garanties légales sur ses prestations et fournitures</li>
            </ul>

            <h2>Article 6 - Garanties</h2>
            <p>
              Les garanties sur les travaux et les pièces fournies sont celles accordées par l&apos;Artisan 
              Partenaire ayant réalisé l&apos;intervention. En cas de litige, l&apos;Utilisateur doit s&apos;adresser 
              directement à l&apos;Artisan Partenaire.
            </p>

            <h2>Article 7 - Utilisation du Site</h2>
            <h3>7.1 Accès au Site</h3>
            <p>
              L&apos;accès au Site est gratuit. Les frais d&apos;accès et d&apos;utilisation du réseau de 
              télécommunication sont à la charge de l&apos;Utilisateur.
            </p>

            <h3>7.2 Comportement de l&apos;Utilisateur</h3>
            <p>
              L&apos;Utilisateur s&apos;engage à utiliser le Site de manière loyale et conforme aux présentes CGU. 
              Il s&apos;interdit notamment de :
            </p>
            <ul>
              <li>Fournir des informations fausses ou trompeuses</li>
              <li>Perturber le bon fonctionnement du Site</li>
              <li>Porter atteinte à la sécurité du Site</li>
              <li>Utiliser le Site à des fins illicites</li>
            </ul>

            <h2>Article 8 - Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments du Site (textes, images, logos, graphismes, etc.) sont protégés 
              par les droits de propriété intellectuelle. Toute reproduction, même partielle, est interdite 
              sans autorisation préalable.
            </p>

            <h2>Article 9 - Données personnelles</h2>
            <p>
              Le traitement des données personnelles est effectué conformément à notre{" "}
              <Link href="/confidentialite" className="text-primary-600 hover:text-primary-700">
                Politique de Confidentialité
              </Link>.
            </p>

            <h2>Article 10 - Modification des CGU</h2>
            <p>
              {siteConfig.name} se réserve le droit de modifier les présentes CGU à tout moment. 
              Les modifications prennent effet dès leur publication sur le Site.
            </p>

            <h2>Article 11 - Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur 
              interprétation ou leur exécution relève de la compétence exclusive des tribunaux français.
            </p>

            <h2>Article 12 - Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU :
            </p>
            <ul>
              <li>Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              <li>Téléphone : {siteConfig.phone}</li>
            </ul>

            <p className="text-sm text-gray-500 mt-8">
              Dernière mise à jour : Janvier 2024
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
