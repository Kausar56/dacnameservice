"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, Repeat, TrendingUp, Trophy } from "lucide-react";

import { AnimatedCounter, Spotlight } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";

const rewards = [
  {
    icon: Gift,
    title: "Earn on registration",
    description: "Get QE points every time you register or renew a .dac name.",
  },
  {
    icon: Repeat,
    title: "Activity multipliers",
    description: "Setting records, resolving, and building boosts your rate.",
  },
  {
    icon: TrendingUp,
    title: "Reputation tiers",
    description: "Climb tiers to unlock premium drops and lower fees.",
  },
];

export function QERewardsSection() {
  return (
    <Section spacing="lg" id="rewards" className="relative overflow-hidden">
      <Container>
        <div className="relative overflow-hidden rounded-3xl glass p-8 sm:p-12 lg:p-16">
          {/* Glow accents */}
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-dac-premium/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-dac-cyan/15 blur-[100px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — pitch */}
            <div>
              <p className="text-overline mb-3">QE Rewards</p>
              <h2 className="text-h2 text-foreground text-balance">
                Your identity{" "}
                <span className="text-gradient">earns as it grows</span>
              </h2>
              <p className="text-body-lg mt-4 max-w-md">
                QE (Quantum Efficiency) points reward you for participating in the
                DAC ecosystem — from your first name to your thousandth resolve.
              </p>

              <div className="mt-8 flex items-center gap-6">
                <Spotlight
                  color="rgba(124, 58, 237, 0.15)"
                  size={260}
                  className="rounded-2xl"
                >
                  <div className="flex items-center gap-4 rounded-2xl bg-white/[0.03] px-6 py-5">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand shadow-glow-sm">
                      <Trophy className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">
                        <AnimatedCounter value={2.4} suffix="M" decimals={1} />
                      </p>
                      <p className="text-caption">QE points earned by builders</p>
                    </div>
                  </div>
                </Spotlight>
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="mt-8 rounded-xl"
              >
                Start earning QE
                <ArrowRight className="size-4" />
              </Button>
            </div>

            {/* Right — reward list */}
            <div className="space-y-3">
              {rewards.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex items-start gap-4 rounded-2xl bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-dac-cyan transition-shadow group-hover:shadow-glow-sm">
                    <r.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-foreground">{r.title}</h3>
                    <p className="text-body-sm mt-1">{r.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
