import { Header } from "@/components/layout/Header";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { regionConfigs } from "@/config/site";
import { ReactNode } from "react";

interface SerrurierParisLayoutProps {
  children: ReactNode;
}

/**
 * Layout spécifique pour la page /serrurier-paris
 * Applique le thème (couleurs) de Paris
 */
export default function SerrurierParisLayout({ children }: SerrurierParisLayoutProps) {
  const colors = regionConfigs.paris.colors;

  // Style inline pour appliquer les variables CSS
  const themeStyle = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
  } as React.CSSProperties;

  return (
    <div style={themeStyle}>
      <Header citySlug="paris" />
      {children}
      <FloatingButton citySlug="paris" />
    </div>
  );
}
