import { siteConfig, zones, services } from "@/config/site";

/**
 * Context pour les remplacements dynamiques (zone, service)
 */
interface ReplaceContext {
  zone?: string;      // Nom de la zone (ex: "Vincennes")
  zoneSlug?: string;  // Slug de la zone (ex: "vincennes")
  zonePostal?: string; // Code postal de la zone
  service?: string;   // Nom du service (ex: "Ouverture de Porte")
  serviceSlug?: string; // Slug du service (ex: "ouverture-de-porte")
}

/**
 * Remplace les variables dans le contenu
 * Variables supportées : {city}, {name}, {phone}, {email}, {department}, {region}, {zone}, {service}
 */
export function replaceVariables(text: string, context?: ReplaceContext, skipCity?: boolean): string {
  let result = text;
  
  // Remplacer {city} : soit par la ville, soit par une chaîne vide si skipCity est true
  if (skipCity) {
    // Remplacer {city} par un espace et nettoyer
    result = result.replace(/\s*{city}\s*/g, " ");
    result = result.replace(/\s+/g, " ").trim();
    // Nettoyer les virgules orphelines
    result = result.replace(/,\s*,/g, ",");
    result = result.replace(/^\s*,\s*/, "");
    result = result.replace(/\s*,\s*$/, "");
  } else {
    result = result.replace(/{city}/g, siteConfig.city);
  }
  
  result = result
    .replace(/{name}/g, siteConfig.name)
    .replace(/{fullName}/g, siteConfig.fullName)
    .replace(/{phone}/g, siteConfig.phone)
    .replace(/{email}/g, siteConfig.email)
    .replace(/{department}/g, siteConfig.department)
    .replace(/{region}/g, siteConfig.region)
    .replace(/{postalCode}/g, siteConfig.postalCode);

  // Variables contextuelles (zone et service)
  if (context?.zone) {
    result = result.replace(/{zone}/g, context.zone);
  }
  if (context?.zonePostal) {
    result = result.replace(/{zonePostal}/g, context.zonePostal);
  }
  if (context?.service) {
    result = result.replace(/{service}/g, context.service);
  }

  return result;
}

/**
 * Récupère une zone par son slug
 */
export function getZoneBySlug(slug: string) {
  return zones.find(z => z.slug === slug);
}

/**
 * Récupère un service par son slug
 */
export function getServiceBySlug(slug: string) {
  return services.find(s => s.slug === slug);
}

/**
 * Remplace les variables dans un objet (récursif)
 */
export function replaceVariablesInObject<T>(obj: T, context?: ReplaceContext, skipCity?: boolean): T {
  if (typeof obj === "string") {
    return replaceVariables(obj, context, skipCity) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceVariablesInObject(item, context, skipCity)) as T;
  }
  
  if (typeof obj === "object" && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceVariablesInObject(value, context, skipCity);
    }
    return result as T;
  }
  
  return obj;
}

/**
 * Charge et parse le contenu d'une page avec remplacement des variables
 */
export function getPageContent<T>(content: T, context?: ReplaceContext, skipCity?: boolean): T {
  return replaceVariablesInObject(content, context, skipCity);
}

/**
 * Charge les FAQ génériques avec remplacement des variables
 */
import faqData from "@/content/faq.json";

export interface FAQItem {
  question: string;
  answer: string;
}

export function getGenericFAQ(context?: ReplaceContext, skipCity?: boolean): FAQItem[] {
  return replaceVariablesInObject(faqData.generic, context, skipCity);
}

export function getServiceFAQ(serviceSlug: string, context?: ReplaceContext, skipCity?: boolean): FAQItem[] {
  const serviceFaqs = faqData.service_specific[serviceSlug as keyof typeof faqData.service_specific];
  if (!serviceFaqs) {
    return [];
  }
  return replaceVariablesInObject(serviceFaqs, context, skipCity);
}

// Export du type pour utilisation dans les pages
export type { ReplaceContext };

