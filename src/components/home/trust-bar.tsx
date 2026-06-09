"use client";

import { motion } from "framer-motion";
import { FileBox, Globe, Sparkles, Users } from "lucide-react";

import { AnimatedCounter } from "@/components/effects";
import { Container } from "@/components/ui/container";

const metrics = [
  {
    label: "Domains Registered",
    value: 12847,
    suffix: "+",
    icon: Globe,
    color: "text-dac-cyan",
  },
  {
    label: "Active Users",
    value: 5234,
    suffix: "+",
    icon: Users,
    color: "text-dac-green",
  },
  {
    label: "Resolver Records",
    value: 41020,
    suffix: "+",
    icon: FileBox,
    color: "text-dac-quantum",
  },
  {
    label: "QE Points Earned",
    value: 2.4,
    suffix: "M",
    decimals: 1,
    icon: Sparkles,
    color: "text-dac-premium",
  },
];

export function TrustBar() {
  return (
    <section className="relative border-y border-white/[0.06] py-12 sm:py-14">
      <div className="absolute inset-0 bg-dac-bg-secondary/40" aria-hidden />
      <Container className="relative">
        <p className="text-center text-overline mb-8">Trusted by DAC Builders</p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`mb-3 ${m.color}`}>
                <m.icon className="size-5" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <AnimatedCounter
                  value={m.value}
                  suffix={m.suffix}
                  decimals={m.decimals ?? 0}
                />
              </p>
              <p className="text-caption mt-1.5">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
