import type { Metadata } from "next";
import { regionConfigs } from "@/config/site";
import { Tarifs } from "@/components/sections/Tarifs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

const region = regionConfigs.bordeaux;

// Meta Title optimisé < 60 caractères | Meta Description < 155 caractères
export const metadata: Metadata = {
  title: `Tarifs Serrurier Bordeaux - Dès 69€ | Hermès`,
  description: `Tarifs serrurier Bordeaux : ouverture porte dès 69€, changement serrure dès 89€. Prix transparents, devis gratuit. ☎️ ${region.phone}`,
};

export default function TarifsBordeauxPage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container text-center">
          <span className="badge-primary mb-4">💰 Prix transparents</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tarifs Serrurier Bordeaux
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des prix clairs et transparents pour Bordeaux et la Gironde. Devis gratuit communiqué avant toute intervention.
            Pas de mauvaise surprise.
          </p>
        </div>
      </section>

      {/* Tarifs */}
      <Tarifs 
        title="Nos tarifs indicatifs à Bordeaux"
        subtitle="Les prix peuvent varier selon la complexité de l'intervention. Un devis précis vous sera communiqué par téléphone."
      />

      {/* Informations supplémentaires */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Devis gratuit</h3>
              <p className="text-gray-600 text-sm">
                Nous vous communiquons un devis précis par téléphone avant de nous déplacer.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Paiement flexible</h3>
              <p className="text-gray-600 text-sm">
                CB, espèces ou chèque. Paiement une fois l&apos;intervention terminée.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Facture détaillée</h3>
              <p className="text-gray-600 text-sm">
                Facture complète pour vos démarches d&apos;assurance ou votre comptabilité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ tarifs */}
      <FAQ 
        title="Questions sur nos tarifs à Bordeaux"
      />

      {/* CTA */}
      <CTA />
    </main>
  );
}
