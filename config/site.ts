/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURATION DU SITE - SERRURIER HERMÈS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Architecture multi-régions :
 * - Paris (20 arrondissements + banlieue IDF)
 * - Bordeaux (~30 zones)
 * - Montpellier (~18 zones)
 */

// ─────────────────────────────────────────────────────────────────────────
// CONFIGURATION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────
export const siteConfig = {
  // Identité
  name: "Serrurier Hermès",
  fullName: "Serrurier Hermès Paris",
  domain: "serrurier-hermes.com",
  
  // Contact (numéro par défaut - Paris/IDF)
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  email: "contact@serrurier-hermes.com",
  
  // Localisation par défaut (Paris)
  city: "Paris",
  postalCode: "75000",
  department: "Paris",
  departmentCode: "75",
  region: "Île-de-France",
  address: "Paris, France",
  
  // Coordonnées GPS (Paris centre)
  geo: {
    lat: 48.8566,
    lng: 2.3522,
  },
  
  // Horaires
  openingHours: "24h/24, 7j/7",
  openingHoursSchema: ["Mo-Su 00:00-23:59"],
  
  // Réseaux sociaux
  social: {
    facebook: "",
    instagram: "",
    google: "",
  },
  
  // Avis Google
  reviews: {
    rating: 4.9,
    count: 2847,
    googleUrl: "#",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// CONFIGURATION PAR RÉGION
// ─────────────────────────────────────────────────────────────────────────
export const regionConfigs = {
  paris: {
    name: "Paris",
    phone: "01 85 09 97 74",
    phoneLink: "tel:+33185099774",
    colors: {
      primary: "#1E3A5F",    // Bleu nuit
      secondary: "#C9A227",  // Or
      accent: "#F97316",     // Orange CTA
      background: "#F8FAFC",
    },
  },
  bordeaux: {
    name: "Bordeaux",
    phone: "05 35 54 30 26",
    phoneLink: "tel:+33535543026",
    colors: {
      primary: "#722F37",    // Lie de vin
      secondary: "#D4A574",  // Pierre blonde
      accent: "#F97316",     // Orange CTA
      background: "#FDF8F5",
    },
  },
  montpellier: {
    name: "Montpellier",
    phone: "04 11 93 91 40",
    phoneLink: "tel:+33411939140",
    colors: {
      primary: "#0EA5E9",    // Bleu méditerranée
      secondary: "#FBBF24",  // Soleil
      accent: "#F97316",     // Orange CTA
      background: "#F0F9FF",
    },
  },
  toulouse: {
    name: "Toulouse",
    phone: "05 35 54 30 26",
    phoneLink: "tel:+33535543026",
    colors: {
      primary: "#E30613",    // Rouge toulousain (brique)
      secondary: "#FFD700",  // Or occitan
      accent: "#F97316",     // Orange CTA
      background: "#FFF9F5",
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// ZONES D'INTERVENTION - PARIS
// ─────────────────────────────────────────────────────────────────────────
export const zonesParisArrondissements = [
  { name: "Paris 1er", slug: "paris-1", postalCode: "75001", time: "15 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-1-75001.webp" },
  { name: "Paris 2ème", slug: "paris-2", postalCode: "75002", time: "15 min", image: "/images/zones/paris/DRM-depannage-rideau-metallique-paris-2-75002.webp" },
  { name: "Paris 3ème", slug: "paris-3", postalCode: "75003", time: "15 min", image: "/images/zones/paris/DRM-depannage-rideau-metallique-paris-3-75003.webp" },
  { name: "Paris 4ème", slug: "paris-4", postalCode: "75004", time: "15 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-4-75004.webp" },
  { name: "Paris 5ème", slug: "paris-5", postalCode: "75005", time: "15 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-5-75005.webp" },
  { name: "Paris 6ème", slug: "paris-6", postalCode: "75006", time: "15 min", image: "/images/zones/paris/DRM-depannage-rideau-metallique-paris-6-75006.webp" },
  { name: "Paris 7ème", slug: "paris-7", postalCode: "75007", time: "15 min", image: "/images/zones/paris/DRM-depannage-rideau-metallique-paris-7-75007.webp" },
  { name: "Paris 8ème", slug: "paris-8", postalCode: "75008", time: "15 min", image: "/images/zones/paris/DRM-depannage-rideau-metallique-paris-8-75008.webp" },
  { name: "Paris 9ème", slug: "paris-9", postalCode: "75009", time: "15 min", image: "/images/zones/paris/DRM-depannage-rideau-metallique-paris-9-75009.webp" },
  { name: "Paris 10ème", slug: "paris-10", postalCode: "75010", time: "15 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-10-75010-DRM.webp" },
  { name: "Paris 11ème", slug: "paris-11", postalCode: "75011", time: "15 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-11-75011-DRM.webp" },
  { name: "Paris 12ème", slug: "paris-12", postalCode: "75012", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-12-75012-DRM.webp" },
  { name: "Paris 13ème", slug: "paris-13", postalCode: "75013", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-13-75013.webp" },
  { name: "Paris 14ème", slug: "paris-14", postalCode: "75014", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-14-75014.webp" },
  { name: "Paris 15ème", slug: "paris-15", postalCode: "75015", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-15-75015.webp" },
  { name: "Paris 16ème", slug: "paris-16", postalCode: "75016", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-16-75016.webp" },
  { name: "Paris 17ème", slug: "paris-17", postalCode: "75017", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-17-75017-DRM.webp" },
  { name: "Paris 18ème", slug: "paris-18", postalCode: "75018", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-18-75018.webp" },
  { name: "Paris 19ème", slug: "paris-19", postalCode: "75019", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-19-75019.webp" },
  { name: "Paris 20ème", slug: "paris-20", postalCode: "75020", time: "20 min", image: "/images/zones/paris/depannage-rideau-metallique-paris-20-75020.webp" },
] as const;

export const zonesIDF = [
  { name: "Boulogne-Billancourt", slug: "boulogne-billancourt", postalCode: "92100", time: "20 min" },
  { name: "Montreuil", slug: "montreuil", postalCode: "93100", time: "20 min" },
  { name: "Saint-Denis", slug: "saint-denis", postalCode: "93200", time: "25 min" },
  { name: "Argenteuil", slug: "argenteuil", postalCode: "95100", time: "30 min" },
  { name: "Versailles", slug: "versailles", postalCode: "78000", time: "35 min" },
  { name: "Nanterre", slug: "nanterre", postalCode: "92000", time: "25 min" },
  { name: "Créteil", slug: "creteil", postalCode: "94000", time: "25 min" },
  { name: "Vitry-sur-Seine", slug: "vitry-sur-seine", postalCode: "94400", time: "25 min" },
  { name: "Colombes", slug: "colombes", postalCode: "92700", time: "25 min" },
  { name: "Asnières-sur-Seine", slug: "asnieres-sur-seine", postalCode: "92600", time: "20 min" },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// ZONES D'INTERVENTION - BORDEAUX
// ─────────────────────────────────────────────────────────────────────────
export const zonesBordeaux = [
  { name: "Bordeaux Centre", slug: "bordeaux", postalCode: "33000", isMain: true, time: "15 min", image: "/images/zones/bordeaux/bordeaux-centre-33-gironde.webp" },
  { name: "Mérignac", slug: "merignac", postalCode: "33700", time: "15 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-Merignac.webp" },
  { name: "Pessac", slug: "pessac", postalCode: "33600", time: "15 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-bordeaux-pessac.webp" },
  { name: "Talence", slug: "talence", postalCode: "33400", time: "15 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-bordeaux-talence.webp" },
  { name: "Bègles", slug: "begles", postalCode: "33130", time: "15 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-bordeaux-begles.webp" },
  { name: "Villenave-d'Ornon", slug: "villenave-d-ornon", postalCode: "33140", time: "20 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-Villenave-d'Ornon-33.webp" },
  { name: "Le Bouscat", slug: "le-bouscat", postalCode: "33110", time: "15 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-Le-Bouscat.webp" },
  { name: "Gradignan", slug: "gradignan", postalCode: "33170", time: "20 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-Gradignan.webp" },
  { name: "Cenon", slug: "cenon", postalCode: "33150", time: "15 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-bordeaux-cenon.webp" },
  { name: "Lormont", slug: "lormont", postalCode: "33310", time: "20 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-bordeaux-lormont.webp" },
  { name: "Floirac", slug: "floirac", postalCode: "33270", time: "15 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-bordeaux-floirac.webp" },
  { name: "Blanquefort", slug: "blanquefort", postalCode: "33290", time: "20 min", image: "/images/zones/bordeaux/depannage-rideau-metallique-Blanquefort.webp" },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// ZONES D'INTERVENTION - MONTPELLIER
// ─────────────────────────────────────────────────────────────────────────
export const zonesMontpellier = [
  { name: "Montpellier Centre", slug: "montpellier", postalCode: "34000", isMain: true, time: "15 min", image: "/images/zones/montpellier/depannage-rideau-metallique-montpellier-centre.webp" },
  { name: "Lattes", slug: "lattes", postalCode: "34970", time: "15 min", image: "/images/zones/montpellier/depannage-rideau-metallique-lattes-montpellier.webp" },
  { name: "Castelnau-le-Lez", slug: "castelnau-le-lez", postalCode: "34170", time: "15 min", image: "/images/zones/montpellier/depannage-rideau-metallique-castelnau-le-lez-montpellier.webp" },
  { name: "Juvignac", slug: "juvignac", postalCode: "34990", time: "15 min", image: "/images/zones/montpellier/Juvignac-depannage-rideau-metallique.webp" },
  { name: "Le Crès", slug: "le-cres", postalCode: "34920", time: "15 min", image: "/images/zones/montpellier/le-cres-depannage-rideau-metallique-drm.webp" },
  { name: "Pérols", slug: "perols", postalCode: "34470", time: "20 min", image: "/images/zones/montpellier/depannage-rideau-metallique-perols-montpellier.webp" },
  { name: "Mauguio", slug: "mauguio", postalCode: "34130", time: "20 min", image: "/images/zones/montpellier/depannage-rideau-metallique-Mauguio.webp" },
  { name: "Grabels", slug: "grabels", postalCode: "34790", time: "20 min", image: "/images/zones/montpellier/Grabels-depannage-rideau-metallique.webp" },
  { name: "Saint-Jean-de-Védas", slug: "saint-jean-de-vedas", postalCode: "34430", time: "15 min", image: "/images/zones/montpellier/depannage-rideau-metallique-saint-jean-de-vedas-montpellier.webp" },
  { name: "Villeneuve-lès-Maguelone", slug: "villeneuve-les-maguelone", postalCode: "34750", time: "20 min", image: "/images/zones/montpellier/Villeneuve-les-Maguelone-depannage-rideau-metallique.webp" },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// ZONES D'INTERVENTION - TOULOUSE
// ─────────────────────────────────────────────────────────────────────────
export const zonesToulouse = [
  { name: "Toulouse Centre", slug: "toulouse-centre", postalCode: "31000", isMain: true, time: "15 min", image: "/images/zones/toulouse/toulouse-centre.webp" },
  { name: "Toulouse Nord", slug: "toulouse-nord", postalCode: "31200", time: "15 min", image: "/images/zones/toulouse/toulouse-nord.webp" },
  { name: "Toulouse Sud", slug: "toulouse-sud", postalCode: "31400", time: "15 min", image: "/images/zones/toulouse/toulouse-sud.webp" },
  { name: "Toulouse Est", slug: "toulouse-est", postalCode: "31500", time: "15 min", image: "/images/zones/toulouse/toulouse-est.webp" },
  { name: "Toulouse Ouest", slug: "toulouse-ouest", postalCode: "31300", time: "15 min", image: "/images/zones/toulouse/toulouse-ouest.webp" },
  { name: "Toulouse Sud-Est", slug: "toulouse-sud-est", postalCode: "31400", time: "20 min", image: "/images/zones/toulouse/toulouse-sud-est.webp" },
  { name: "Blagnac", slug: "blagnac", postalCode: "31700", time: "15 min", image: "/images/zones/toulouse/blagnac.webp" },
  { name: "Colomiers", slug: "colomiers", postalCode: "31770", time: "20 min", image: "/images/zones/toulouse/colomiers.webp" },
  { name: "Tournefeuille", slug: "tournefeuille", postalCode: "31170", time: "20 min", image: "/images/zones/toulouse/tournefeuille.webp" },
  { name: "Balma", slug: "balma", postalCode: "31130", time: "15 min", image: "/images/zones/toulouse/balma.webp" },
  { name: "Muret", slug: "muret", postalCode: "31600", time: "25 min", image: "/images/zones/toulouse/muret.webp" },
  { name: "Ramonville-Saint-Agne", slug: "ramonville-saint-agne", postalCode: "31520", time: "15 min", image: "/images/zones/toulouse/ramonville-saint-agne.webp" },
  { name: "Saint-Orens-de-Gameville", slug: "saint-orens-de-gameville", postalCode: "31650", time: "20 min", image: "/images/zones/toulouse/saint-orens-de-gameville.webp" },
  { name: "Cugnaux", slug: "cugnaux", postalCode: "31270", time: "20 min", image: "/images/zones/toulouse/cugnaux.webp" },
  { name: "Plaisance-du-Touch", slug: "plaisance-du-touch", postalCode: "31830", time: "25 min", image: "/images/zones/toulouse/plaisance-du-touch.webp" },
  { name: "L'Union", slug: "lunion", postalCode: "31240", time: "15 min", image: "/images/zones/toulouse/lunion.webp" },
  { name: "Launaguet", slug: "launaguet", postalCode: "31140", time: "15 min", image: "/images/zones/toulouse/launaguet.webp" },
  { name: "Aucamville", slug: "aucamville", postalCode: "31140", time: "15 min", image: "/images/zones/toulouse/aucamville.webp" },
  { name: "Castanet-Tolosan", slug: "castanet-tolosan", postalCode: "31320", time: "20 min", image: "/images/zones/toulouse/castanet-tolosan.webp" },
  { name: "Portet-sur-Garonne", slug: "portet-sur-garonne", postalCode: "31120", time: "20 min", image: "/images/zones/toulouse/portet-sur-garonne.webp" },
  { name: "Saint-Jean", slug: "saint-jean", postalCode: "31240", time: "15 min", image: "/images/zones/toulouse/saint-jean.webp" },
  { name: "Fonsorbes", slug: "fonsorbes", postalCode: "31470", time: "25 min", image: "/images/zones/toulouse/fonsorbes.webp" },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// ZONES PAR DÉFAUT (pour le template)
// ─────────────────────────────────────────────────────────────────────────
export const zones = zonesParisArrondissements;

// ─────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────
export const navigation = [
  { label: "Dépannage", href: "/depannage" },
  { label: "Installation", href: "/installation" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Contact", href: "/contact" },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "ouverture-porte",
    slug: "ouverture-de-porte",
    name: "Ouverture de Porte",
    shortDesc: "Porte claquée, fermée à clé, porte blindée...",
    longDesc: "Ouverture de porte claquée, bloquée ou suite à perte de clés. Sans dégât dans 95% des cas.",
    icon: "🚪",
    priceFrom: 69,
    hasPage: true,
  },
  {
    id: "changement-serrure",
    slug: "changement-serrure",
    name: "Changement de Serrure",
    shortDesc: "Remplacement toutes marques",
    longDesc: "Remplacement de serrure usée, cassée ou pour renforcer la sécurité. Toutes marques.",
    icon: "🔐",
    priceFrom: 89,
    hasPage: true,
  },
  {
    id: "depannage",
    slug: "depannage",
    name: "Dépannage Urgent",
    shortDesc: "Intervention rapide 24h/24",
    longDesc: "Service de dépannage serrurerie en urgence, disponible 24h/24 et 7j/7.",
    icon: "🔧",
    priceFrom: 59,
    hasPage: true,
  },
  {
    id: "blindage",
    slug: "blindage-porte",
    name: "Blindage de Porte",
    shortDesc: "Sécurisation renforcée",
    longDesc: "Blindage de porte existante pour une protection anti-effraction maximale.",
    icon: "🛡️",
    priceFrom: 890,
    hasPage: true,
  },
  {
    id: "cylindre",
    slug: "remplacement-cylindre",
    name: "Remplacement Cylindre",
    shortDesc: "Cylindres haute sécurité",
    longDesc: "Remplacement de cylindre par des modèles haute sécurité anti-crochetage.",
    icon: "🔑",
    priceFrom: 89,
    hasPage: true,
  },
  {
    id: "installation",
    slug: "installation-serrure",
    name: "Installation Serrure",
    shortDesc: "Pose de serrures sécurisées",
    longDesc: "Installation de serrures neuves, multipoints, certifiées A2P.",
    icon: "🛠️",
    priceFrom: 119,
    hasPage: true,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// TYPES EXPORTS
// ─────────────────────────────────────────────────────────────────────────
export type SiteConfig = typeof siteConfig;
export type Zone = typeof zones[number];
export type NavItem = typeof navigation[number];
export type Service = typeof services[number];
export type RegionConfig = typeof regionConfigs[keyof typeof regionConfigs];
