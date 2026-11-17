"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import TrackingConsent from "./TrackingConsent";

export default function CampaignLayoutGate({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const pathname = usePathname();

  // Superaulas has its own isolated design system and consent interface.
  if (pathname?.startsWith("/blacknovember/superaulas")) {
    return <>{children}</>;
  }

  return (
    <div className={className} data-blacknovember-campaign>
      {children}
      <Suspense fallback={null}>
        <TrackingConsent />
      </Suspense>
    </div>
  );
}
