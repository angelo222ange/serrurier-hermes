/**
 * Custom Image Loader pour Next.js avec support responsive
 * Génère automatiquement les URLs des versions optimisées
 */

export default function imageLoader({ src, width, quality }) {
  // Si l'image est déjà une version responsiv (contient -sm, -md, -lg, -xl), la retourner telle quelle
  if (src.match(/-(sm|md|lg|xl)\.(webp|jpg|png)$/)) {
    return src;
  }

  // Extraire l'extension et le nom de base
  const ext = src.substring(src.lastIndexOf('.'));
  const baseSrc = src.substring(0, src.lastIndexOf('.'));

  // Mapping des largeurs vers les suffixes
  // Correspond aux tailles générées par le script d'optimisation
  let suffix = '';
  if (width <= 400) {
    suffix = '-sm';
  } else if (width <= 640) {
    suffix = '-md';
  } else if (width <= 800) {
    suffix = '-lg';
  } else if (width <= 1280) {
    suffix = '-lg';
  }
  
  // Pour les logos et très petites images, ne pas ajouter de suffix
  if (src.includes('logo') || width <= 128) {
    return src;
  }

  // Construire l'URL avec le suffix approprié
  return `${baseSrc}${suffix}${ext}`;
}
