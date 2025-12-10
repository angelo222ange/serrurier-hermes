import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: `Politique de confidentialité du site ${siteConfig.domain}`,
};

export default function ConfidentialitePage() {
  return (
    <main className="pt-20">
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1>Politique de Confidentialité</h1>
            
            <p>
              <strong>{siteConfig.fullName}</strong> s&apos;engage à protéger la vie privée 
              des utilisateurs de son site internet {siteConfig.domain}.
            </p>

            <h2>Collecte des données</h2>
            <p>
              Nous collectons les données suivantes lorsque vous utilisez notre formulaire de contact :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse email</li>
              <li>Message / Description du besoin</li>
            </ul>

            <h2>Utilisation des données</h2>
            <p>
              Les données collectées sont utilisées uniquement pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de devis</li>
              <li>Vous recontacter concernant nos services</li>
              <li>Améliorer notre service client</li>
            </ul>

            <h2>Conservation des données</h2>
            <p>
              Vos données personnelles sont conservées pendant une durée maximale de 3 ans 
              à compter de votre dernier contact avec nous.
            </p>

            <h2>Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), 
              vous disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : {siteConfig.email}
            </p>

            <h2>Cookies</h2>
            <p>
              Notre site utilise des cookies techniques nécessaires au fonctionnement 
              du site. Aucun cookie publicitaire n&apos;est utilisé.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité :<br />
              Email : {siteConfig.email}<br />
              Téléphone : {siteConfig.phone}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

