"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Gift,
  KeyRound,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { AuroraBackground, Spotlight } from "@/components/effects";
import { Container } from "@/components/ui/container";
import { DomainSearch } from "./domain-search";
import { IdentityVisual } from "./identity-visual";

const EASE = [0.16, 1, 0.3, 1] as const;

const POPULAR = ["gm.dac", "builder.dac", "alpha.dac", "satoshi.dac"];

const TRUST = [
  { icon: KeyRound, label: "Real Wallet Ownership" },
  { icon: Network, label: "DAC Testnet Ready" },
  { icon: Gift, label: "QE Rewards Enabled" },
  { icon: ShieldCheck, label: "Secure Registration" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
      <AuroraBackground lines />

      <Spotlight color="rgba(0, 212, 255, 0.10)" size={500} className="w-full">
        <Container className="relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* ── Left ── */}
            <div className="text-center lg:text-left">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-8 inline-flex items-center gap-2 rounded-full glass-subtle px-4 py-2"
              >
                <Sparkles className="size-3.5 text-dac-cyan" />
                <span className="text-[0.8125rem] font-medium tracking-wide text-foreground/80">
                  DAC Quantum Identity
                </span>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-display leading-[0.95] tracking-tight"
              >
                <span className="block text-foreground">Own Your</span>
                <span className="block text-gradient-hero">Digital Identity</span>
                <span className="block text-foreground/90">
                  on DAC Quantum Chain
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-body-lg mx-auto mt-8 max-w-xl text-balance text-muted-foreground lg:mx-0"
              >
                Register a{" "}
                <span className="font-mono text-dac-cyan">.dac</span> name, build
                your decentralized profile, and become part of the DAC ecosystem.
              </motion.p>

              {/* Search — the single primary action */}
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-12 flex justify-center lg:justify-start"
              >
                <DomainSearch />
              </motion.div>

              {/* Popular domains */}
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              >
                <span className="text-caption mr-1">Popular</span>
                {POPULAR.map((name) => (
                  <Link
                    key={name}
                    href={`/domain/${name}`}
                    className="group inline-flex items-center gap-1.5 rounded-full glass-subtle px-3 py-1.5 font-mono text-sm text-foreground/80 transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  >
                    {name}
                    <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-dac-cyan" />
                  </Link>
                ))}
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 lg:justify-start"
              >
                {TRUST.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="text-caption inline-flex items-center gap-1.5 text-muted-foreground"
                  >
                    <Icon className="size-4 shrink-0 text-dac-cyan" />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── Right ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <IdentityVisual />
            </motion.div>
          </div>
        </Container>
      </Spotlight>
    </section>
  );
}
