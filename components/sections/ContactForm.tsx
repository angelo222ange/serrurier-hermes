"use client";

import { useState, FormEvent, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { RegionKey } from "@/lib/cityConfig";
import { regionConfigs } from "@/config/site";

interface ContactFormProps {
  /** Région pour afficher uniquement les villes de cette région */
  region?: RegionKey;
  /** Nom de la ville/zone courante */
  cityName?: string;
}

const WEBHOOK_URL = "https://lioai.app.n8n.cloud/webhook/drm-contact";

export function ContactForm({ region = 'paris', cityName }: ContactFormProps) {
  const currentRegion = regionConfigs[region];
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget || formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const formValues = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string || '',
      city: formData.get('city') as string,
      requestType: formData.get('request-type') as string,
      service: formData.get('service') as string || '',
      message: formData.get('message') as string || '',
    };

    // Construire le payload selon le format attendu par le webhook
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const submittedAt = new Date().toISOString();

    // Construire la source à partir de l'URL
    const domain = typeof window !== 'undefined' ? window.location.hostname : 'serrurier-hermes.com';
    const source = `${domain}-contact-form`;

    // Construire le nom du formulaire
    const formulaire = cityName 
      ? `Demande de devis gratuit ${cityName}`
      : 'Demande de devis gratuit';

    // Mapper le service vers le format attendu
    const prestationMap: Record<string, string> = {
      'ouverture': 'ouverture-de-porte',
      'changement': 'changement-serrure',
      'cylindre': 'remplacement-cylindre',
      'installation': 'installation-serrure',
      'blindage': 'blindage-porte',
      'depannage': 'depannage',
      'autre': 'autre',
    };
    const prestation = formValues.service ? prestationMap[formValues.service] || formValues.service : '';

    // Construire le message final
    let finalMessage = formValues.message;
    if (!finalMessage) {
      const requestTypeLabels: Record<string, string> = {
        'urgence': '🚨 URGENCE: Demande de contact urgente',
        'devis': '📋 Demande de devis',
        'renseignement': '❓ Demande de renseignement',
      };
      finalMessage = requestTypeLabels[formValues.requestType] || 'Demande de contact';
    } else if (formValues.requestType === 'urgence') {
      finalMessage = `🚨 URGENCE: ${finalMessage}`;
    }

    const payload = {
      nom: formValues.name,
      telephone: formValues.phone,
      email: formValues.email,
      adresse: '', // Pas de champ adresse dans le formulaire actuel
      prestation: prestation,
      message: finalMessage,
      source: source,
      formulaire: formulaire,
      brand: siteConfig.name,
      city: formValues.city || cityName || currentRegion.name,
      sitePhone: currentRegion.phone,
      siteEmail: siteConfig.email,
      submittedAt: submittedAt,
      pageUrl: pageUrl,
      userAgent: userAgent,
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      setSubmitStatus('success');
      // Réinitialiser le formulaire
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Réinitialiser le statut après 5 secondes
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Urgence - Téléphone de LA région */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 md:p-10 text-white mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              📞 URGENCE ? Appelez-nous directement
            </h2>
            <p className="text-emerald-100">
              Disponible 24h/24, 7j/7 - Intervention en 20 minutes à {cityName || currentRegion.name}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <a
              href={currentRegion.phoneLink}
              className="block bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors text-center"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-1">{cityName || currentRegion.name}</h3>
              <p className="text-3xl font-bold text-white mb-2">{currentRegion.phone}</p>
              <p className="text-sm text-emerald-100 opacity-80">Cliquez pour appeler</p>
            </a>
          </div>
        </div>

        {/* Contact Info + Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Infos de contact */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ou laissez-nous un message
            </h2>

            <p className="text-gray-600 mb-6">
              Pour une urgence, nous vous recommandons d&apos;appeler directement pour une prise en 
              charge immédiate. Pour toute autre demande (devis, renseignements), vous pouvez 
              utiliser le formulaire ci-dessous.
            </p>

            <div className="space-y-6">
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

              {/* Horaires */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Horaires d&apos;intervention</p>
                  <p className="text-gray-500 text-sm">{siteConfig.openingHours}</p>
                  <p className="text-orange-600 text-xs mt-1">Y compris jours fériés</p>
                </div>
              </div>

              {/* Note importante */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm">
                  <strong>⚠️ Note :</strong> Pour une urgence (porte claquée, clé cassée, etc.), 
                  appelez directement le numéro ci-dessus. Le formulaire est réservé aux 
                  demandes non urgentes.
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Demande de devis
            </h2>
            
            {/* Message de succès */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✅ Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.
                </p>
              </div>
            )}

            {/* Message d'erreur */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  ❌ {errorMessage || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'}
                </p>
              </div>
            )}

            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
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
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  defaultValue={cityName || ""}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Votre ville"
                />
              </div>

              <div>
                <label htmlFor="request-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de demande *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-primary-300">
                    <input type="radio" name="request-type" value="urgence" required className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-700">🚨 Urgence (besoin immédiat)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-primary-300">
                    <input type="radio" name="request-type" value="devis" required className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-700">📋 Devis (intervention planifiée)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-primary-300">
                    <input type="radio" name="request-type" value="renseignement" required className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-700">❓ Renseignement</span>
                  </label>
                </div>
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
                  <option value="ouverture">Ouverture de porte</option>
                  <option value="changement">Changement de serrure</option>
                  <option value="cylindre">Remplacement de cylindre</option>
                  <option value="installation">Installation serrure</option>
                  <option value="blindage">Blindage de porte</option>
                  <option value="depannage">Dépannage / Réparation</option>
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

              {/* Consentement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 mt-1 text-primary-600 rounded" />
                  <span className="text-sm text-gray-600">
                    J&apos;accepte la{" "}
                    <Link href="/confidentialite" className="text-primary-600 hover:underline">
                      politique de confidentialité
                    </Link>{" "}
                    et j&apos;autorise {siteConfig.name} à me recontacter. *
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                ⚠️ Pour une urgence, appelez directement le numéro ci-dessus.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
