import { Header } from "@/components/layout/Header";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { regionConfigs } from "@/config/site";
import { ReactNode } from "react";

interface SerrurierMontpellierLayoutProps {
  children: ReactNode;
}

/**
 * Layout spécifique pour la page /serrurier-montpellier
 * Applique le thème (couleurs) de Montpellier
 */
export default function SerrurierMontpellierLayout({ children }: SerrurierMontpellierLayoutProps) {
  const colors = regionConfigs.montpellier.colors;

  // Style inline pour appliquer les variables CSS
  const themeStyle = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
  } as React.CSSProperties;

  return (
    <div style={themeStyle}>
      <Header citySlug="montpellier" />
      {children}
      <FloatingButton citySlug="montpellier" />
    </div>
  );
}
