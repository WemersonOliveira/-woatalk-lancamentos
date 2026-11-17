import type { ReactNode } from "react";
import CampaignLayoutGate from "./_components/CampaignLayoutGate";
import styles from "./campaign.module.css";

export const metadata = { referrer: "no-referrer" };

export default function CampaignLayout({ children }: { children: ReactNode }) {
  return <CampaignLayoutGate className={styles.campaign}>{children}</CampaignLayoutGate>;
}
