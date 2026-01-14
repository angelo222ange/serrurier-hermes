import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// Meta optimisés < 60 / 155 caractères
export const metadata: Metadata = {
  title: `Confidentialité - RGPD | Hermès`,
  description: `Politique de confidentialité Serrurier Hermès. Protection données personnelles, cookies, vos droits RGPD.`,
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
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
            <li className="text-gray-900 font-medium">Politique de confidentialité</li>
          </ol>
        </div>
      </nav>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Politique de Confidentialité
            </h1>

            {/* Introduction */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 not-prose">
              <p className="text-blue-800">
                <strong>{siteConfig.name}</strong> s&apos;engage à protéger la vie privée des utilisateurs de son site. 
                Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons 
                vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </div>

            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est :
            </p>
            <p>
              <strong>{siteConfig.name}</strong><br />
              Email : {siteConfig.email}<br />
              Téléphone : {siteConfig.phone}
            </p>

            <h2>2. Données collectées</h2>
            <p>
              Nous collectons les données personnelles suivantes :
            </p>
            
            <h3>2.1 Données fournies volontairement</h3>
            <ul>
              <li><strong>Identité</strong> : nom, prénom</li>
              <li><strong>Coordonnées</strong> : adresse email, numéro de téléphone, adresse postale</li>
              <li><strong>Demande</strong> : nature du problème de serrurerie, détails de l&apos;intervention souhaitée</li>
            </ul>

            <h3>2.2 Données collectées automatiquement</h3>
            <ul>
              <li><strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées</li>
              <li><strong>Données techniques</strong> : type d&apos;appareil, système d&apos;exploitation</li>
              <li><strong>Cookies</strong> : voir la section dédiée ci-dessous</li>
            </ul>

            <h2>3. Finalités du traitement</h2>
            <p>
              Vos données personnelles sont collectées et traitées pour les finalités suivantes :
            </p>
            <ul>
              <li><strong>Mise en relation</strong> : vous mettre en contact avec un artisan serrurier partenaire</li>
              <li><strong>Gestion des demandes</strong> : traiter vos demandes d&apos;intervention ou de devis</li>
              <li><strong>Communication</strong> : vous recontacter suite à une demande</li>
              <li><strong>Amélioration du service</strong> : analyser l&apos;utilisation du site pour l&apos;améliorer</li>
              <li><strong>Obligations légales</strong> : respecter nos obligations légales et réglementaires</li>
            </ul>

            <h2>4. Base légale du traitement</h2>
            <p>
              Le traitement de vos données personnelles repose sur :
            </p>
            <ul>
              <li><strong>Votre consentement</strong> : lorsque vous nous contactez via le formulaire</li>
              <li><strong>L&apos;exécution d&apos;un contrat</strong> : pour la mise en relation avec un artisan</li>
              <li><strong>L&apos;intérêt légitime</strong> : pour améliorer nos services</li>
              <li><strong>Les obligations légales</strong> : conservation des données de facturation</li>
            </ul>

            <h2>5. Destinataires des données</h2>
            <p>
              Vos données personnelles peuvent être partagées avec :
            </p>
            <ul>
              <li><strong>Artisans Partenaires</strong> : pour réaliser l&apos;intervention demandée</li>
              <li><strong>Sous-traitants techniques</strong> : hébergeur (OVH), outils d&apos;analyse</li>
              <li><strong>Autorités publiques</strong> : sur demande légale uniquement</li>
            </ul>
            <p>
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>

            <h2>6. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant :
            </p>
            <ul>
              <li><strong>Données de contact</strong> : 3 ans après le dernier contact</li>
              <li><strong>Données de navigation</strong> : 13 mois maximum</li>
              <li><strong>Données de facturation</strong> : 10 ans (obligation légale)</li>
            </ul>

            <h2>7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Droit de retirer votre consentement</strong> : à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale 
              de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
            </p>

            <h2>8. Cookies</h2>
            <h3>8.1 Qu&apos;est-ce qu&apos;un cookie ?</h3>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur un site web.
            </p>

            <h3>8.2 Types de cookies utilisés</h3>
            <ul>
              <li>
                <strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (session, préférences)
              </li>
              <li>
                <strong>Cookies analytiques</strong> : pour mesurer l&apos;audience et améliorer le site (Google Analytics)
              </li>
              <li>
                <strong>Cookies marketing</strong> : pour mesurer l&apos;efficacité des campagnes publicitaires (Google Ads)
              </li>
            </ul>

            <h3>8.3 Gestion des cookies</h3>
            <p>
              Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. 
              Voici comment procéder selon votre navigateur :
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>

            <h2>9. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données personnelles contre la destruction, la perte, l&apos;altération ou l&apos;accès non autorisé :
            </p>
            <ul>
              <li>Connexion sécurisée HTTPS</li>
              <li>Hébergement sécurisé chez OVH</li>
              <li>Accès restreint aux données</li>
              <li>Sauvegarde régulière des données</li>
            </ul>

            <h2>10. Transfert de données hors UE</h2>
            <p>
              Vos données personnelles sont principalement stockées et traitées au sein de l&apos;Union Européenne. 
              Dans le cas où des données seraient transférées hors UE, nous nous assurons que les garanties 
              appropriées sont en place (clauses contractuelles types, certification Privacy Shield, etc.).
            </p>

            <h2>11. Modification de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
              Les modifications entreront en vigueur dès leur publication sur le site. Nous vous encourageons 
              à consulter régulièrement cette page.
            </p>

            <h2>12. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou l&apos;exercice de vos droits :
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
