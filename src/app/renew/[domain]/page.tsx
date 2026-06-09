import type { Metadata } from "next";

import { RenewFlow, RenewUnavailable, getOwnedDomain } from "@/components/renew";

interface PageProps {
  params: { domain: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const input = decodeURIComponent(params.domain);
  const owned = getOwnedDomain(input);
  return {
    title: owned ? `Renew ${owned.name} — DACNS` : "Renew a domain — DACNS",
    description:
      "Renew your .dac name on DAC Quantum Chain before it expires — choose a period, review pricing, and confirm.",
  };
}

export default function RenewPage({ params }: PageProps) {
  const input = decodeURIComponent(params.domain);
  const owned = getOwnedDomain(input);

  return (
    <main className="relative min-h-screen bg-dac-bg">
      {owned ? (
        <RenewFlow domain={owned} />
      ) : (
        <RenewUnavailable name={input.replace(/\.dac$/i, "") + ".dac"} />
      )}
    </main>
  );
}
