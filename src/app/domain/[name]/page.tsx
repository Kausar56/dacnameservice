import type { Metadata } from "next";

import { DomainDetails, DomainNotFound } from "@/components/domain";
import { domainService } from "@/lib/domain";

interface PageProps {
  params: { name: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const details = await domainService.getDetails(decodeURIComponent(params.name));
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

export default async function DomainPage({ params }: PageProps) {
  const details = await domainService.getDetails(decodeURIComponent(params.name));

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
