import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Privacy Policy — DACNS",
  description: "How DACNS handles your data and protects your privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-dac-bg">
      <PlaceholderPage
        eyebrow="Legal"
        title="Privacy Policy"
        description="Our privacy policy detailing how DACNS handles data is being finalized and will be published here."
        icon={ShieldCheck}
      />
    </main>
  );
}
