/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURATION DES ZONES VOISINES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Définit les zones géographiquement voisines pour chaque ville/arrondissement
 * Utilisé pour afficher les zones pertinentes dans la section "Zones d'intervention"
 */

// ─────────────────────────────────────────────────────────────────────────
// PARIS - ARRONDISSEMENTS VOISINS
// ─────────────────────────────────────────────────────────────────────────
const parisNeighbors: Record<string, string[]> = {
  // Paris principal - montrer les arrondissements centraux
  'paris': ['paris-1', 'paris-2', 'paris-3', 'paris-4', 'paris-8', 'paris-9'],
  
  // Arrondissements
  'paris-1': ['paris-2', 'paris-4', 'paris-8', 'paris-9', 'paris-7'],
  'paris-2': ['paris-1', 'paris-3', 'paris-9', 'paris-10', 'paris-8'],
  'paris-3': ['paris-2', 'paris-4', 'paris-10', 'paris-11', 'paris-1'],
  'paris-4': ['paris-1', 'paris-3', 'paris-5', 'paris-11', 'paris-12'],
  'paris-5': ['paris-4', 'paris-6', 'paris-13', 'paris-14', 'paris-12'],
  'paris-6': ['paris-5', 'paris-7', 'paris-14', 'paris-15', 'paris-1'],
  'paris-7': ['paris-6', 'paris-8', 'paris-15', 'paris-16', 'paris-1'],
  'paris-8': ['paris-1', 'paris-7', 'paris-9', 'paris-16', 'paris-17'],
  'paris-9': ['paris-2', 'paris-8', 'paris-10', 'paris-17', 'paris-18'],
  'paris-10': ['paris-2', 'paris-3', 'paris-9', 'paris-11', 'paris-18', 'paris-19'],
  'paris-11': ['paris-3', 'paris-4', 'paris-10', 'paris-12', 'paris-20'],
  'paris-12': ['paris-4', 'paris-5', 'paris-11', 'paris-13', 'paris-20'],
  'paris-13': ['paris-5', 'paris-12', 'paris-14', 'vitry-sur-seine', 'creteil'],
  'paris-14': ['paris-5', 'paris-6', 'paris-13', 'paris-15', 'montrouge'],
  'paris-15': ['paris-6', 'paris-7', 'paris-14', 'paris-16', 'boulogne-billancourt'],
  'paris-16': ['paris-7', 'paris-8', 'paris-15', 'paris-17', 'boulogne-billancourt'],
  'paris-17': ['paris-8', 'paris-9', 'paris-16', 'paris-18', 'colombes'],
  'paris-18': ['paris-9', 'paris-10', 'paris-17', 'paris-19', 'saint-denis'],
  'paris-19': ['paris-10', 'paris-18', 'paris-20', 'montreuil', 'saint-denis'],
  'paris-20': ['paris-11', 'paris-12', 'paris-19', 'montreuil', 'creteil'],
};

// ─────────────────────────────────────────────────────────────────────────
// BANLIEUE IDF - ZONES VOISINES
// ─────────────────────────────────────────────────────────────────────────
const idfNeighbors: Record<string, string[]> = {
  'boulogne-billancourt': ['paris-15', 'paris-16', 'nanterre', 'colombes', 'versailles'],
  'montreuil': ['paris-19', 'paris-20', 'paris-11', 'saint-denis', 'creteil'],
  'saint-denis': ['paris-18', 'paris-19', 'montreuil', 'argenteuil', 'colombes'],
  'argenteuil': ['saint-denis', 'colombes', 'nanterre', 'paris-17', 'paris-18'],
  'versailles': ['boulogne-billancourt', 'paris-15', 'paris-16', 'nanterre', 'colombes'],
  'nanterre': ['boulogne-billancourt', 'paris-16', 'paris-17', 'colombes', 'argenteuil'],
  'creteil': ['paris-12', 'paris-13', 'paris-20', 'montreuil', 'vitry-sur-seine'],
  'vitry-sur-seine': ['paris-13', 'creteil', 'paris-12', 'paris-20', 'montreuil'],
  'colombes': ['paris-17', 'paris-16', 'nanterre', 'argenteuil', 'asnieres-sur-seine'],
  'asnieres-sur-seine': ['paris-17', 'colombes', 'nanterre', 'argenteuil', 'saint-denis'],
};

// ─────────────────────────────────────────────────────────────────────────
// BORDEAUX - ZONES VOISINES
// ─────────────────────────────────────────────────────────────────────────
const bordeauxNeighbors: Record<string, string[]> = {
  // Bordeaux principal - montrer les zones principales
  'bordeaux': ['merignac', 'pessac', 'talence', 'begles', 'le-bouscat', 'cenon'],
  
  // Communes voisines
  'merignac': ['bordeaux', 'le-bouscat', 'pessac', 'talence', 'blanquefort'],
  'pessac': ['bordeaux', 'merignac', 'talence', 'gradignan', 'begles'],
  'talence': ['bordeaux', 'pessac', 'begles', 'villenave-d-ornon', 'gradignan'],
  'begles': ['bordeaux', 'talence', 'villenave-d-ornon', 'floirac', 'pessac'],
  'villenave-d-ornon': ['talence', 'begles', 'gradignan', 'floirac', 'bordeaux'],
  'le-bouscat': ['bordeaux', 'merignac', 'blanquefort', 'cenon', 'lormont'],
  'gradignan': ['pessac', 'talence', 'villenave-d-ornon', 'begles', 'bordeaux'],
  'cenon': ['bordeaux', 'le-bouscat', 'lormont', 'floirac', 'blanquefort'],
  'lormont': ['cenon', 'le-bouscat', 'bordeaux', 'floirac', 'blanquefort'],
  'floirac': ['bordeaux', 'cenon', 'lormont', 'begles', 'villenave-d-ornon'],
  'blanquefort': ['le-bouscat', 'merignac', 'cenon', 'bordeaux', 'lormont'],
};

// ─────────────────────────────────────────────────────────────────────────
// MONTPELLIER - ZONES VOISINES
// ─────────────────────────────────────────────────────────────────────────
const montpellierNeighbors: Record<string, string[]> = {
  // Montpellier principal - montrer les zones principales
  'montpellier': ['lattes', 'castelnau-le-lez', 'juvignac', 'le-cres', 'saint-jean-de-vedas'],
  
  // Communes voisines
  'lattes': ['montpellier', 'perols', 'saint-jean-de-vedas', 'villeneuve-les-maguelone', 'mauguio'],
  'castelnau-le-lez': ['montpellier', 'le-cres', 'mauguio', 'perols', 'lattes'],
  'juvignac': ['montpellier', 'grabels', 'saint-jean-de-vedas', 'lattes', 'le-cres'],
  'le-cres': ['montpellier', 'castelnau-le-lez', 'mauguio', 'grabels', 'juvignac'],
  'perols': ['lattes', 'montpellier', 'mauguio', 'castelnau-le-lez', 'villeneuve-les-maguelone'],
  'mauguio': ['perols', 'lattes', 'castelnau-le-lez', 'le-cres', 'montpellier'],
  'grabels': ['juvignac', 'montpellier', 'le-cres', 'saint-jean-de-vedas', 'castelnau-le-lez'],
  'saint-jean-de-vedas': ['montpellier', 'juvignac', 'lattes', 'villeneuve-les-maguelone', 'grabels'],
  'villeneuve-les-maguelone': ['lattes', 'saint-jean-de-vedas', 'montpellier', 'perols', 'mauguio'],
};

// ─────────────────────────────────────────────────────────────────────────
// EXPORT CONSOLIDÉ
// ─────────────────────────────────────────────────────────────────────────
export const neighborsMap: Record<string, string[]> = {
  ...parisNeighbors,
  ...idfNeighbors,
  ...bordeauxNeighbors,
  ...montpellierNeighbors,
};

/**
 * Récupère les slugs des zones voisines pour une ville donnée
 * @param citySlug - Le slug de la ville
 * @param limit - Nombre maximum de voisins à retourner (défaut: 5)
 * @returns Un tableau de slugs des zones voisines
 */
export function getNeighboringSlugs(citySlug: string, limit: number = 5): string[] {
  const neighbors = neighborsMap[citySlug] || [];
  return neighbors.slice(0, limit);
}
