import { Header } from "@/components/layout/Header";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { regionConfigs } from "@/config/site";
import { ReactNode } from "react";

interface SerrurierBordeauxLayoutProps {
  children: ReactNode;
}

/**
 * Layout spécifique pour la page /serrurier-bordeaux
 * Applique le thème (couleurs) de Bordeaux
 */
export default function SerrurierBordeauxLayout({ children }: SerrurierBordeauxLayoutProps) {
  const colors = regionConfigs.bordeaux.colors;

  // Style inline pour appliquer les variables CSS
  const themeStyle = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
  } as React.CSSProperties;

  return (
    <div style={themeStyle}>
      <Header citySlug="bordeaux" />
      {children}
      <FloatingButton citySlug="bordeaux" />
    </div>
  );
}
