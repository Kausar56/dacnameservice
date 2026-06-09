"use client";

import { motion } from "framer-motion";
import { Activity, Flame, Globe2, Sparkles, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { cn } from "@/lib/utils";

import { DOMAINS, QE } from "./mock-dashboard";

const STATS = [
  {
    icon: Sparkles,
    label: "Total QE Points",
    value: QE.total,
    accent: "text-dac-cyan",
    glow: "bg-dac-cyan/20",
  },
  {
    icon: Activity,
    label: "Activity Score",
    value: QE.activityScore,
    suffix: "/100",
    accent: "text-dac-green",
    glow: "bg-dac-green/20",
  },
  {
    icon: Globe2,
    label: "Domains Owned",
    value: DOMAINS.length,
    accent: "text-dac-quantum",
    glow: "bg-dac-quantum/20",
  },
  {
    icon: Flame,
    label: "Day Streak",
    value: QE.streakDays,
    accent: "text-dac-premium",
    glow: "bg-dac-premium/20",
  },
];

export function QEPoints() {
  const tierProgress = Math.min(100, Math.round((QE.total / QE.nextTierAt) * 100));

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl glass p-5"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-8 -top-8 size-24 rounded-full blur-[60px] opacity-50",
                  s.glow
                )}
              />
              <div
                className={cn(
                  "relative mb-4 flex size-10 items-center justify-center rounded-xl bg-white/[0.04]",
                  s.accent
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="relative text-2xl font-bold text-foreground sm:text-3xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="relative text-caption mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* QE breakdown + tier */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Breakdown */}
        <div className="rounded-2xl glass p-5 sm:p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-h4 text-foreground">Points breakdown</h3>
            <Badge variant="muted" size="sm">
              This period
            </Badge>
          </div>
          <div className="space-y-4">
            {QE.breakdown.map((b, i) => (
              <div key={b.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="font-mono text-foreground">
                    +{b.points} QE
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.share}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-brand"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier progress */}
        <div className="relative overflow-hidden rounded-2xl glass p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-dac-premium/20 blur-[70px]" />
          <div className="relative">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-white/[0.04] text-dac-premium">
              <Trophy className="size-5" />
            </div>
            <p className="text-caption">Current tier</p>
            <p className="text-h4 mt-0.5 text-foreground">{QE.tier}</p>
            <p className="text-body-sm mt-1">Global rank #{QE.rank.toLocaleString()}</p>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Next tier</span>
                <span className="font-mono text-foreground">
                  {QE.total} / {QE.nextTierAt}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tierProgress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-dac-premium to-dac-cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
