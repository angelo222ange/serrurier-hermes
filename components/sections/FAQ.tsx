"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getGenericFAQ, type FAQItem } from "@/lib/content";

interface FAQProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  city?: string;
  phone?: string;
  phoneLink?: string;
}

export function FAQ({
  title = "Questions Fréquentes",
  subtitle,
  items,
  city,
  phone,
  phoneLink,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isTarifsPage = pathname === '/tarifs';
  const isGenericServicePage = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length === 1 && ['depannage', 'installation', 'changement-serrure', 'ouverture-de-porte', 'blindage-porte', 'remplacement-cylindre'].includes(segments[0]);
  };
  const isGenericPage = isHomepage || isTarifsPage || isGenericServicePage();
  
  // Sur la homepage, page tarifs ou pages génériques de services, ne pas utiliser de ville
  const displayCity = isGenericPage ? null : (city || siteConfig.city);
  const displayPhone = phone || siteConfig.phone;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  
  // Si on a des items personnalisés, les utiliser, sinon générer les FAQ
  let displayItems: FAQItem[];
  if (items && items.length > 0) {
    displayItems = items;
  } else if (isGenericPage) {
    // Sur les pages génériques, utiliser les FAQ sans ville (skipCity = true)
    const rawFAQ = getGenericFAQ({ zone: "" }, true);
    displayItems = rawFAQ.map(item => {
      // Nettoyer les questions : supprimer " à {city}", "à {city}", "{city}", "à Paris", "Paris"
      let cleanQuestion = item.question
        .replace(/\s*à\s*\{city\}/gi, "")
        .replace(/\s*à\s*Paris/gi, "")
        .replace(/\{city\}/g, "")
        .replace(/\bParis\b/gi, "")
        .replace(/\s+/g, " ")
        .trim();
      
      // Nettoyer les réponses : supprimer toutes les mentions de {city} et "Paris" (codé en dur dans certaines réponses)
      let cleanAnswer = item.answer
        // D'abord supprimer {city} s'il reste
        .replace(/\{city\}/gi, "")
        // Supprimer toutes les variantes avec "Paris" : "à Paris", "pour Paris", "sur Paris", "dans Paris", "de Paris", "du Paris", "le Paris", "la Paris"
        // Utiliser \s+ pour un ou plusieurs espaces et \b pour les limites de mots
        .replace(/\s+à\s+Paris\b/gi, "")
        .replace(/\s+pour\s+Paris\b/gi, "")
        .replace(/\s+sur\s+Paris\b/gi, "")
        .replace(/\s+dans\s+Paris\b/gi, "")
        .replace(/\s+de\s+Paris\b/gi, "")
        .replace(/\s+du\s+Paris\b/gi, "")
        .replace(/\s+le\s+Paris\b/gi, "")
        .replace(/\s+la\s+Paris\b/gi, "")
        // Supprimer "Paris" suivi ou précédé de ponctuation
        .replace(/Paris\s*[,\.;:!?]/gi, "")
        .replace(/[,\.;:!?]\s*Paris/gi, "")
        // Supprimer "Paris" au début ou à la fin d'une phrase
        .replace(/^Paris\s+/gi, "")
        .replace(/\s+Paris$/gi, "")
        .replace(/^Paris,?\s*/gi, "")
        .replace(/\s*,?\s*Paris$/gi, "")
        // Supprimer le mot "Paris" seul (avec gestion des majuscules/minuscules) - doit être après les autres remplacements
        .replace(/\bParis\b/gi, "")
        // Nettoyer les espaces multiples et ponctuation
        .replace(/\s+/g, " ")
        .replace(/,\s*,/g, ",")
        .replace(/\.\s*\./g, ".")
        .replace(/\s*,\s*\./g, ".")
        .replace(/^\s*,\s*/, "")
        .replace(/\s*,\s*$/, "")
        .trim();
      
      // Nettoyer les espaces multiples et les points de ponctuation en double
      cleanQuestion = cleanQuestion.replace(/\s+/g, " ").replace(/\?\s*\?/g, "?");
      cleanAnswer = cleanAnswer.replace(/\s+/g, " ").replace(/\.\s*\./g, ".");
      
      return {
        question: cleanQuestion,
        answer: cleanAnswer,
      };
    });
  } else {
    displayItems = getGenericFAQ({ zone: displayCity || "" });
  }
  
  const defaultSubtitle = isGenericPage 
    ? "Retrouvez les réponses aux questions les plus fréquentes sur nos services de serrurerie."
    : `Retrouvez les réponses aux questions les plus fréquentes sur nos services de serrurerie à ${displayCity}.`;

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left - Header & CTA */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <span className="badge-primary mb-4">❓ FAQ</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle mb-8">
              {subtitle || defaultSubtitle}
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Vous avez une autre question ?
              </h3>
              <p className="text-gray-600 text-sm mb-5">
                Notre équipe est disponible 24h/24 pour répondre à toutes vos questions.
              </p>
              <div className="space-y-3">
                <a href={displayPhoneLink} className="btn-phone w-full justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  {displayPhone}
                </a>
                <a href="/contact" className="btn-secondary w-full justify-center">
                  Nous contacter
                </a>
              </div>
            </div>
          </div>

          {/* Right - FAQ Items */}
          <div className="lg:col-span-3 space-y-3">
            {displayItems.map((item, index) => (
              <div
                key={index}
                className={`
                  rounded-xl overflow-hidden transition-all duration-300
                  ${openIndex === index 
                    ? 'bg-emerald-50 ring-2 ring-emerald-500 ring-opacity-50' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`font-semibold pr-4 transition-colors ${
                    openIndex === index ? 'text-emerald-700' : 'text-gray-900'
                  }`}>
                    {item.question}
                  </span>
                  <span 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      transition-all duration-300
                      ${openIndex === index 
                        ? 'bg-emerald-500 text-white rotate-45' 
                        : 'bg-white text-gray-600'
                      }
                    `}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                
                {/* Answer */}
                <div 
                  className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-5 pb-5">
                    <div 
                      className="text-gray-700 text-sm leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": displayItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
