import type { Metadata } from "next";

import { RegisterCheckout, RegisterUnavailable } from "@/components/register";
import { domainService } from "@/lib/domain";

export const metadata: Metadata = {
  title: "Register a .dac domain — DACNS",
  description:
    "Premium checkout to register your .dac name on DAC Quantum Chain — choose a period, connect your wallet, and confirm.",
};

interface PageProps {
  searchParams: { domain?: string };
}

/** Fallback sample name so /register always has a registerable domain to show. */
const DEFAULT_DOMAIN = "mydomain";

export default async function RegisterPage({ searchParams }: PageProps) {
  const raw = searchParams.domain ?? "";
  const resolved = raw ? await domainService.resolve(raw) : null;

  // Linked an owned / reserved name → show the unavailable state.
  if (
    resolved &&
    resolved.status !== "available" &&
    resolved.status !== "premium"
  ) {
    return (
      <main className="relative min-h-screen bg-dac-bg">
        <RegisterUnavailable name={resolved.name} result={resolved} />
      </main>
    );
  }

  const result =
    resolved && (resolved.status === "available" || resolved.status === "premium")
      ? resolved
      : (await domainService.resolve(DEFAULT_DOMAIN))!;

  return (
    <main className="relative min-h-screen bg-dac-bg">
      <RegisterCheckout result={result} />
    </main>
  );
}
