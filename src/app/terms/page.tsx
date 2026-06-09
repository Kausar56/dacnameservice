import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Terms of Service — DACNS",
  description: "The terms governing your use of the DAC Name Service.",
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-dac-bg">
      <PlaceholderPage
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that govern your use of DACNS are being finalized and will be published here."
        icon={FileText}
      />
    </main>
  );
}
