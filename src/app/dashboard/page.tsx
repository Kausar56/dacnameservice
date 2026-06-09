import type { Metadata } from "next";

import { Dashboard } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard — DACNS",
  description:
    "Manage your .dac domains, resolver settings, profile, activity, and QE points on DAC Quantum Chain.",
};

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen bg-dac-bg">
      <Dashboard />
    </main>
  );
}
