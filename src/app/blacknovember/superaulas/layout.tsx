import type { Metadata } from "next";
import "@fontsource/barlow/latin-400.css";
import "@fontsource/barlow/latin-500.css";
import "@fontsource/barlow/latin-600.css";
import "@fontsource/barlow/latin-700.css";
import "@fontsource/barlow/latin-800.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "./superaulas.css";
import { PrivacyConsent } from "@/src/app/blacknovember/superaulas/_components/privacy-consent";

export const metadata: Metadata = {
  title: "WOA Exclusive | Black November 2026 — 4 Superaulas",
  description: "Quatro superaulas práticas em inglês. Conheça os planos de conversação WOA Exclusive e prepare-se para o seu próximo nível.",
  robots: { index: false, follow: false },
};

export default function SuperaulasLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="superaulas-page-shell">
      <div className="superaulas-page">
        {children}
        <PrivacyConsent />
      </div>
    </div>
  );
}
