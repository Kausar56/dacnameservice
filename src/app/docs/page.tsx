import type { Metadata } from "next";

import { DocsCenter } from "@/components/docs";

export const metadata: Metadata = {
  title: "Documentation — DACNS",
  description:
    "The official DACNS knowledge hub — guides for domains, profiles, QE rewards, and developer references for building on DAC Quantum Chain.",
};

export default function DocsPage() {
  return (
    <main className="relative min-h-screen bg-dac-bg">
      <DocsCenter />
    </main>
  );
}
