"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Search, Sparkles, Wallet } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Container, Section } from "@/components/ui/container";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Search a name",
    description:
      "Find an available .dac name. Live availability shows Available, Premium, or Reserved instantly.",
  },
  {
    n: "02",
    icon: Wallet,
    title: "Connect your wallet",
    description:
      "Link your DAC Wallet to claim ownership. Your name is minted directly to your address.",
  },
  {
    n: "03",
    icon: CheckCircle2,
    title: "Register on-chain",
    description:
      "Confirm the transaction on DAC Quantum Chain. Your identity is now self-custodial and permanent.",
  },
  {
    n: "04",
    icon: Sparkles,
    title: "Build & earn",
    description:
      "Set resolver records, grow your reputation, and earn QE points as you use the ecosystem.",
  },
];

export function HowItWorksSection() {
  return (
    <Section spacing="lg" id="how-it-works" className="relative">
      <Container>
        <SectionHeader
          overline="How Registration Works"
          title="From search to ownership in"
          titleAccent="four steps"
          description="A streamlined flow designed to get you a fully-owned DAC identity in under a minute."
          className="mb-12 sm:mb-16"
        />

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Connecting line on desktop */}
          <div
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
            aria-hidden
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="group h-full rounded-2xl glass p-6 transition-colors hover:border-white/15">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand-subtle text-dac-cyan transition-shadow group-hover:shadow-glow-sm">
                    <s.icon className="size-5" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-white/10">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-h4 mb-2 text-foreground">{s.title}</h3>
                <p className="text-body-sm">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
