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
export function replaceVariables(text: string, context?: ReplaceContext): string {
  let result = text
    .replace(/{city}/g, siteConfig.city)
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
export function replaceVariablesInObject<T>(obj: T, context?: ReplaceContext): T {
  if (typeof obj === "string") {
    return replaceVariables(obj, context) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceVariablesInObject(item, context)) as T;
  }
  
  if (typeof obj === "object" && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceVariablesInObject(value, context);
    }
    return result as T;
  }
  
  return obj;
}

/**
 * Charge et parse le contenu d'une page avec remplacement des variables
 */
export function getPageContent<T>(content: T, context?: ReplaceContext): T {
  return replaceVariablesInObject(content, context);
}

// Export du type pour utilisation dans les pages
export type { ReplaceContext };

