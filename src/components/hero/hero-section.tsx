"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Wallet } from "lucide-react";

import { AuroraBackground, Spotlight } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DomainSearch } from "./domain-search";
import { IdentityVisual } from "./identity-visual";

const EASE = [0.16, 1, 0.3, 1] as const;

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

              {/* Search */}
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-12 flex justify-center lg:justify-start"
              >
                <DomainSearch />
              </motion.div>

              {/* CTAs */}
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
              >
                <Button variant="gradient" size="lg" className="w-full rounded-xl sm:w-auto">
                  Register Domain
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="glass" size="lg" className="w-full rounded-xl sm:w-auto">
                  <Wallet className="size-4" />
                  Connect Wallet
                </Button>
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
