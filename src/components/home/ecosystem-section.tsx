"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Compass,
  FlaskConical,
  Wallet,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Container, Section } from "@/components/ui/container";

const integrations = [
  {
    id: "wallet",
    name: "DAC Wallet",
    description: "Connect and manage your .dac identity",
    icon: Wallet,
    color: "#00D4FF",
    position: { x: 0, y: 0 },
  },
  {
    id: "explorer",
    name: "DAC Explorer",
    description: "Track registrations and on-chain records",
    icon: Compass,
    color: "#00FFA3",
    position: { x: 1, y: 0 },
  },
  {
    id: "testnet",
    name: "DAC Testnet",
    description: "Deploy and test before mainnet launch",
    icon: FlaskConical,
    color: "#5B8CFF",
    position: { x: 0, y: 1 },
  },
  {
    id: "quantum",
    name: "DAC Quantum Chain",
    description: "The core blockchain powering all identity",
    icon: Blocks,
    color: "#7C3AED",
    position: { x: 1, y: 1 },
  },
];

export function EcosystemSection() {
  return (
    <Section spacing="lg" id="ecosystem">
      <Container>
        <SectionHeader
          overline="DAC Ecosystem Integration"
          title="Native to the"
          titleAccent="DAC stack"
          description="DACNS sits at the identity layer — deeply integrated with every core DAC product."
          className="mb-12 sm:mb-16"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Connection diagram — desktop */}
          <div className="hidden md:block relative">
            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                initial={false}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="flex size-28 items-center justify-center rounded-2xl glass gradient-border shadow-glow"
              >
                <div className="text-center">
                  <p className="text-gradient text-lg font-bold">DACNS</p>
                  <p className="text-[0.625rem] text-muted-foreground uppercase tracking-wider mt-0.5">
                    Identity
                  </p>
                </div>
              </motion.div>
            </div>

            {/* SVG connection lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 400"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              {[
                "M300,200 L120,80",
                "M300,200 L480,80",
                "M300,200 L120,320",
                "M300,200 L480,320",
              ].map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="url(#line-gradient)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 4"
                  initial={false}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
                />
              ))}
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Integration nodes */}
            <div className="grid grid-cols-2 gap-x-32 gap-y-24 py-8">
              {integrations.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={false}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <IntegrationNode item={item} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile — stacked cards */}
          <div className="md:hidden space-y-3">
            <div className="glass gradient-border rounded-2xl p-5 text-center mb-6">
              <p className="text-gradient text-xl font-bold">DACNS</p>
              <p className="text-caption mt-1">Identity Layer</p>
            </div>

            {integrations.map((item) => (
              <div key={item.id}>
                <IntegrationNode item={item} fullWidth />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IntegrationNode({
  item,
  fullWidth,
}: {
  item: (typeof integrations)[0];
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`glass rounded-xl p-4 hover:border-white/15 transition-colors group ${
        fullWidth ? "w-full" : "w-52"
      }`}
      style={{ borderColor: `${item.color}20` }}
    >
      <div
        className="flex size-9 items-center justify-center rounded-lg mb-3 transition-shadow group-hover:shadow-glow-sm"
        style={{ backgroundColor: `${item.color}15`, color: item.color }}
      >
        <item.icon className="size-4" />
      </div>
      <p className="text-sm font-semibold text-foreground">{item.name}</p>
      <p className="text-caption mt-1">{item.description}</p>
    </div>
  );
}
