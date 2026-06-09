import { Suspense } from "react";
import type { Metadata } from "next";

import { SearchExperience } from "@/components/search";

export const metadata: Metadata = {
  title: "Search .dac Domains — DACNS",
  description:
    "Search and discover .dac domains on DAC Quantum Chain. Find available names, check ownership, and claim your identity.",
};

export default function SearchPage() {
  return (
    <main className="relative bg-dac-bg">
      <Suspense fallback={<div className="min-h-screen" />}>
        <SearchExperience />
      </Suspense>
    </main>
  );
}
