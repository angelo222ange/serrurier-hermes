import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact - Serrurier`,
  description: `Contactez votre serrurier à ${siteConfig.city}. Disponible 24h/24 pour urgences et devis gratuit. ☎️ ${siteConfig.phone}`,
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="container text-center">
          <span className="badge-primary mb-4">📞 Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Besoin d&apos;un serrurier ? Notre équipe est disponible 24h/24 pour répondre 
            à vos urgences et vos demandes de devis.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Infos de contact */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Nos coordonnées
              </h2>

              <div className="space-y-6">
                {/* Téléphone */}
                <a
                  href={siteConfig.phoneLink}
                  className="flex items-start gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{siteConfig.phone}</p>
                    <p className="text-green-700 text-sm">Disponible 24h/24 - 7j/7</p>
                    <p className="text-gray-500 text-xs mt-1">Appel gratuit depuis un fixe</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{siteConfig.email}</p>
                    <p className="text-gray-500 text-sm">Réponse sous 24h</p>
                  </div>
                </a>

                {/* Adresse */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{siteConfig.address}</p>
                    <p className="text-gray-500 text-sm">Zone d&apos;intervention : {siteConfig.city} et agglomération</p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Horaires</p>
                    <p className="text-gray-500 text-sm">{siteConfig.openingHours}</p>
                    <p className="text-orange-600 text-xs mt-1">Y compris jours fériés</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Demande de devis
              </h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Type d&apos;intervention
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="urgence">Urgence / Porte claquée</option>
                    <option value="changement">Changement de serrure</option>
                    <option value="installation">Installation serrure</option>
                    <option value="blindage">Blindage de porte</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Décrivez votre besoin..."
                  />
                </div>

                <button type="submit" className="w-full btn-primary">
                  Envoyer ma demande
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Pour une urgence, appelez directement le{" "}
                  <a href={siteConfig.phoneLink} className="text-primary-600 font-semibold">
                    {siteConfig.phone}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

