"use client";

import { motion } from "framer-motion";
import {
  AtSign,
  Boxes,
  KeyRound,
  Link2,
  ScanFace,
  Star,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Container, Section } from "@/components/ui/container";

const features = [
  {
    icon: AtSign,
    title: "Human-readable names",
    description:
      "Replace 0x addresses with a memorable .dac name across every DAC surface.",
  },
  {
    icon: Link2,
    title: "Multi-record resolver",
    description:
      "Map one name to wallets, profiles, content hashes, social links, and metadata.",
  },
  {
    icon: ScanFace,
    title: "Decentralized profiles",
    description:
      "A portable, on-chain profile that you fully own and control.",
  },
  {
    icon: Star,
    title: "On-chain reputation",
    description:
      "Verifiable reputation scores that follow your identity everywhere.",
  },
  {
    icon: KeyRound,
    title: "Self-custodial",
    description:
      "Secured by your wallet on DAC Quantum Chain — no custodians.",
  },
  {
    icon: Boxes,
    title: "Composable by default",
    description:
      "Open standards so any DAC app can read and build on your identity.",
  },
];

export function IdentityFeaturesSection() {
  return (
    <Section spacing="lg" id="features" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-dots opacity-40" aria-hidden />
      <Container className="relative">
        <SectionHeader
          overline="Identity Features"
          title="Everything an identity"
          titleAccent="should be"
          description="A complete, self-custodial identity primitive — designed for the quantum era of DAC."
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative bg-dac-bg p-6 transition-colors hover:bg-dac-bg-secondary sm:p-8"
            >
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-white/[0.04] text-dac-cyan transition-shadow group-hover:shadow-glow-sm">
                <f.icon className="size-5" />
              </div>
              <h3 className="text-h4 mb-2 text-foreground">{f.title}</h3>
              <p className="text-body-sm">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
