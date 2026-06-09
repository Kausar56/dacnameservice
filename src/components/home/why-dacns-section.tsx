"use client";

import { motion } from "framer-motion";
import { Fingerprint, Globe, ShieldCheck, Sparkles } from "lucide-react";

import { Spotlight } from "@/components/effects";
import { SectionHeader } from "@/components/shared/section-header";
import { Container, Section } from "@/components/ui/container";

const pillars = [
  {
    icon: Fingerprint,
    title: "One identity, everywhere",
    description:
      "Your .dac name is a single, portable identity that works across every app, wallet, and service in the DAC ecosystem.",
    accent: "text-dac-cyan",
    span: "lg:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "True ownership",
    description:
      "Secured by DAC Quantum Chain. No renew-or-lose tricks, no intermediaries — you hold the keys.",
    accent: "text-dac-green",
    span: "",
  },
  {
    icon: Sparkles,
    title: "Reputation that compounds",
    description:
      "Every interaction strengthens your on-chain reputation and earns QE points.",
    accent: "text-dac-premium",
    span: "",
  },
  {
    icon: Globe,
    title: "Built for the whole stack",
    description:
      "Native resolver records connect your name to wallets, profiles, content, and quantum-native apps.",
    accent: "text-dac-quantum",
    span: "lg:col-span-2",
  },
];

export function WhyDacnsSection() {
  return (
    <Section spacing="lg" id="why" className="relative">
      <Container>
        <SectionHeader
          overline="Why DACNS"
          title="The identity layer DAC was"
          titleAccent="missing"
          description="Not a domain registrar — the foundational identity infrastructure for everything built on DAC Quantum Chain."
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={p.span}
            >
              <Spotlight
                color="rgba(0, 212, 255, 0.10)"
                size={300}
                className="group h-full overflow-hidden rounded-2xl glass p-6 transition-colors hover:border-white/15 sm:p-8"
              >
                <div className="relative z-10">
                  <div
                    className={`mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-white/[0.04] ${p.accent} transition-shadow group-hover:shadow-glow-sm`}
                  >
                    <p.icon className="size-6" />
                  </div>
                  <h3 className="text-h3 mb-2 text-foreground">{p.title}</h3>
                  <p className="text-body-sm max-w-md">{p.description}</p>
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
