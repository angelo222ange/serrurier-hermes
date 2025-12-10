import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: `Mentions légales du site ${siteConfig.domain}`,
};

export default function MentionsLegalesPage() {
  return (
    <main className="pt-20">
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1>Mentions Légales</h1>
            
            <h2>Éditeur du site</h2>
            <p>
              <strong>{siteConfig.fullName}</strong><br />
              {siteConfig.address}<br />
              Téléphone : {siteConfig.phone}<br />
              Email : {siteConfig.email}
            </p>

            <h2>Hébergement</h2>
            <p>
              {/* À PERSONNALISER */}
              Ce site est hébergé par : [Nom de l&apos;hébergeur]<br />
              Adresse : [Adresse de l&apos;hébergeur]
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble de ce site relève de la législation française et internationale 
              sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de 
              reproduction sont réservés, y compris pour les documents téléchargeables 
              et les représentations iconographiques et photographiques.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Les informations recueillies sur ce site sont enregistrées dans un fichier 
              informatisé par {siteConfig.fullName} pour la gestion de la relation client. 
              Elles sont conservées pendant 3 ans et sont destinées au service commercial.
            </p>
            <p>
              Conformément à la loi « informatique et libertés », vous pouvez exercer 
              votre droit d&apos;accès aux données vous concernant et les faire rectifier 
              en contactant : {siteConfig.email}
            </p>

            <h2>Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et 
              analyser le trafic. Vous pouvez configurer votre navigateur pour refuser 
              les cookies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

