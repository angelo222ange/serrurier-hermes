import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// Meta optimisés < 60 / 155 caractères
export const metadata: Metadata = {
  title: `Mentions Légales | Hermès`,
  description: `Mentions légales Serrurier Hermès. Éditeur, hébergeur OVH, conditions d'utilisation. Plateforme de mise en relation.`,
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
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
            <li className="text-gray-900 font-medium">Mentions légales</li>
          </ol>
        </div>
      </nav>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Mentions Légales
            </h1>

            {/* Nature de la plateforme - IMPORTANT */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 not-prose">
              <h2 className="font-bold text-amber-800 text-lg mb-2">
                ⚠️ Nature de la plateforme
              </h2>
              <p className="text-amber-700">
                <strong>{siteConfig.name}</strong> est une <strong>plateforme de mise en relation</strong> entre 
                particuliers et artisans serruriers indépendants. Toutes les interventions sont réalisées 
                par des professionnels partenaires sous-traitants.
              </p>
            </div>

            <h2>1. Éditeur du site</h2>
            <p>
              <strong>Nom du site :</strong> {siteConfig.name}<br />
              <strong>URL :</strong> {siteConfig.domain}<br />
              <strong>Téléphone :</strong> {siteConfig.phone}<br />
              <strong>Email :</strong> {siteConfig.email}
            </p>
            <p>
              <strong>Directeur de la publication :</strong> Didier Blanc
            </p>

            <h2>2. Activité et statut</h2>
            <p>
              {siteConfig.name} est une plateforme de mise en relation dans le domaine de la serrurerie. 
              Notre rôle consiste à mettre en contact des particuliers avec des artisans serruriers 
              indépendants et qualifiés.
            </p>
            <p>
              <strong>Important :</strong>
            </p>
            <ul>
              <li>Nous ne réalisons pas directement les interventions de serrurerie</li>
              <li>Toutes les prestations sont effectuées par des artisans partenaires indépendants</li>
              <li>Chaque artisan partenaire dispose de sa propre assurance responsabilité civile professionnelle</li>
              <li>Les tarifs affichés sur ce site sont indicatifs (&quot;à partir de&quot;)</li>
              <li>Le tarif final est déterminé par l&apos;artisan après diagnostic sur place</li>
            </ul>

            <h2>3. Tarification</h2>
            <p>
              Les prix affichés sur ce site sont donnés <strong>à titre indicatif</strong> et correspondent 
              à des tarifs de base (&quot;à partir de&quot;). Le prix final d&apos;une intervention dépend de plusieurs 
              facteurs :
            </p>
            <ul>
              <li>La nature exacte du problème</li>
              <li>Le type de serrure ou de porte concerné</li>
              <li>Les pièces éventuellement à remplacer</li>
              <li>La complexité de l&apos;intervention</li>
            </ul>
            <p>
              Un devis gratuit et sans engagement est systématiquement communiqué avant toute intervention.
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble de ce site (structure, textes, logos, images, vidéos, sons, bases de données, etc.) 
              est protégé par les dispositions du Code de la Propriété Intellectuelle et relève de la 
              législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, transmission, dénaturation, 
              totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur 
              quelque support que ce soit, est interdite sans l&apos;autorisation écrite préalable de l&apos;éditeur.
            </p>

            <h2>5. Données personnelles</h2>
            <p>
              Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé 
              par {siteConfig.name} pour la gestion de la relation client et la mise en relation avec 
              nos artisans partenaires.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
              &quot;Informatique et Libertés&quot; du 6 janvier 1978 modifiée, vous disposez d&apos;un droit d&apos;accès, 
              de rectification, de suppression et de portabilité de vos données.
            </p>
            <p>
              Pour exercer ces droits, contactez-nous à : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              Pour plus d&apos;informations, consultez notre{" "}
              <Link href="/confidentialite" className="text-primary-600 hover:text-primary-700">
                Politique de Confidentialité
              </Link>.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et analyser le trafic. 
              Les cookies sont de petits fichiers texte stockés sur votre appareil.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti 
              lorsqu&apos;un cookie est envoyé. Toutefois, certaines fonctionnalités du site pourraient 
              ne plus fonctionner correctement.
            </p>

            <h2>7. Responsabilité</h2>
            <p>
              {siteConfig.name} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations 
              diffusées sur ce site. Toutefois, nous ne pouvons garantir l&apos;exactitude, la précision 
              ou l&apos;exhaustivité des informations mises à disposition.
            </p>
            <p>
              <strong>En tant que plateforme de mise en relation :</strong>
            </p>
            <ul>
              <li>Nous ne sommes pas responsables de la qualité des interventions réalisées par les artisans partenaires</li>
              <li>Chaque artisan est responsable de ses propres prestations</li>
              <li>Les garanties sur les travaux sont celles fournies par l&apos;artisan intervenant</li>
            </ul>

            <h2>8. Litiges</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, 
              les tribunaux français seront seuls compétents.
            </p>

            <h2>9. Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales ou l&apos;utilisation du site, 
              vous pouvez nous contacter :
            </p>
            <ul>
              <li>Par téléphone : {siteConfig.phone}</li>
              <li>Par email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              <li>Via notre <Link href="/contact" className="text-primary-600 hover:text-primary-700">page de contact</Link></li>
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

