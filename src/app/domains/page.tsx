import type { Metadata } from "next";
import { Globe2 } from "lucide-react";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Domains — DACNS",
  description:
    "Browse and discover .dac domains across the DAC Quantum Chain ecosystem.",
};

export default function DomainsPage() {
  return (
    <main className="relative min-h-screen bg-dac-bg">
      <PlaceholderPage
        title="Domains"
        description="A curated marketplace to browse, filter, and discover .dac names across the DAC ecosystem."
        icon={Globe2}
        highlights={[
          "Browse trending and recently registered names",
          "Filter by category, length, and status",
          "Discover premium and reserved collections",
        ]}
      />
    </main>
  );
}
