import type { Metadata } from "next";

import { DomainDetails, DomainNotFound } from "@/components/domain";
import { getDomainDetails } from "@/components/search/mock-data";

interface PageProps {
  params: { name: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const details = getDomainDetails(decodeURIComponent(params.name));
  if (!details) {
    return {
      title: "Domain not found — DACNS",
    };
  }
  const status = details.status[0].toUpperCase() + details.status.slice(1);
  return {
    title: `${details.name} — ${status} · DACNS`,
    description: `View ownership, resolver, and activity for ${details.name} on DAC Quantum Chain.`,
  };
}

export default function DomainPage({ params }: PageProps) {
  const details = getDomainDetails(decodeURIComponent(params.name));

  return (
    <main className="relative min-h-screen bg-dac-bg">
      {details ? (
        <DomainDetails details={details} />
      ) : (
        <DomainNotFound name={decodeURIComponent(params.name)} />
      )}
    </main>
  );
}
