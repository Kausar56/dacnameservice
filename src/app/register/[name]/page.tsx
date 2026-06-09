import type { Metadata } from "next";

import { RegisterFlow, RegisterUnavailable } from "@/components/register";
import { resolveDomain } from "@/components/search/mock-data";

interface PageProps {
  params: { name: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const name = decodeURIComponent(params.name);
  const result = resolveDomain(name);
  return {
    title: result
      ? `Register ${result.name} — DACNS`
      : "Register a domain — DACNS",
    description:
      "Register your .dac name on DAC Quantum Chain — review pricing, connect your wallet, and confirm.",
  };
}

export default function RegisterPage({ params }: PageProps) {
  const name = decodeURIComponent(params.name);
  const result = resolveDomain(name);
  const canRegister =
    result && (result.status === "available" || result.status === "premium");

  return (
    <main className="relative min-h-screen bg-dac-bg">
      {canRegister ? (
        <RegisterFlow result={result} />
      ) : (
        <RegisterUnavailable name={result?.name ?? name} result={result} />
      )}
    </main>
  );
}
