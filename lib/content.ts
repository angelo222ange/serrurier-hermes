import { siteConfig } from "@/config/site";

/**
 * Remplace les variables dans le contenu
 * Variables supportées : {city}, {name}, {phone}, {email}, {department}, {region}
 */
export function replaceVariables(text: string): string {
  return text
    .replace(/{city}/g, siteConfig.city)
    .replace(/{name}/g, siteConfig.name)
    .replace(/{fullName}/g, siteConfig.fullName)
    .replace(/{phone}/g, siteConfig.phone)
    .replace(/{email}/g, siteConfig.email)
    .replace(/{department}/g, siteConfig.department)
    .replace(/{region}/g, siteConfig.region)
    .replace(/{postalCode}/g, siteConfig.postalCode);
}

/**
 * Remplace les variables dans un objet (récursif)
 */
export function replaceVariablesInObject<T>(obj: T): T {
  if (typeof obj === "string") {
    return replaceVariables(obj) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceVariablesInObject(item)) as T;
  }
  
  if (typeof obj === "object" && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceVariablesInObject(value);
    }
    return result as T;
  }
  
  return obj;
}

/**
 * Charge et parse le contenu d'une page avec remplacement des variables
 */
export function getPageContent<T>(content: T): T {
  return replaceVariablesInObject(content);
}

