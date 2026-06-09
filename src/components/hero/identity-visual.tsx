"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Fingerprint,
  Globe,
  Wallet,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

const floatingDomains = [
  { name: "satoshi.dac", top: "6%", left: "2%", delay: 0 },
  { name: "builder.dac", top: "14%", right: "0%", delay: 0.6 },
  { name: "gm.dac", bottom: "10%", left: "-2%", delay: 1.2 },
  { name: "alpha.dac", bottom: "2%", right: "6%", delay: 0.3 },
];

/**
 * Right-side hero visual: a holographic identity card with an animated
 * conic ring, floating .dac domain pills, and a quantum node halo.
 */
export function IdentityVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full", className)} aria-hidden>
      {/* Halo glow */}
      <div className="absolute inset-[12%] rounded-full bg-dac-cyan/10 blur-[80px]" />
      <div className="absolute inset-[24%] rounded-full bg-dac-premium/10 blur-[70px]" />

      {/* Orbital rings */}
      <motion.div
        className="absolute inset-[8%] rounded-full border border-white/[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dac-cyan shadow-[0_0_12px_rgba(0,212,255,0.8)]" />
      </motion.div>
      <motion.div
        className="absolute inset-[20%] rounded-full border border-white/[0.05]"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-dac-premium shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
      </motion.div>

      {/* Center identity card */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[72%] max-w-xs -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="conic-border glass rounded-2xl p-5 shadow-elevated">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-brand shadow-glow-sm">
              <Fingerprint className="size-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-mono text-sm font-semibold text-foreground">
                  satoshi.dac
                </span>
                <BadgeCheck className="size-4 shrink-0 text-dac-cyan" />
              </div>
              <p className="text-[0.6875rem] text-muted-foreground">
                DAC Quantum Identity
              </p>
            </div>
          </div>

          {/* Record rows */}
          <div className="mt-4 space-y-2">
            <RecordRow
              icon={<Wallet className="size-3.5" />}
              label="Wallet"
              value="0x7a…4F2c"
            />
            <RecordRow
              icon={<Globe className="size-3.5" />}
              label="Profile"
              value="dac.id/satoshi"
            />
            <RecordRow
              icon={<Star className="size-3.5 text-dac-green" />}
              label="Reputation"
              value="982 QE"
              valueClass="text-dac-green"
            />
          </div>

          {/* Status footer */}
          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="inline-flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-dac-green animate-pulse-node" />
              On-chain · Resolved
            </span>
            <span className="font-mono text-[0.625rem] text-dac-cyan/70">
              QE Chain
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating domain pills */}
      {floatingDomains.map((d) => (
        <motion.div
          key={d.name}
          className="absolute"
          style={{
            top: d.top,
            bottom: d.bottom,
            left: d.left,
            right: d.right,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 5 + d.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
        >
          <span className="glass-subtle rounded-full px-3 py-1.5 font-mono text-xs text-foreground/80 shadow-glass">
            {d.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function RecordRow({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
      <span className="flex items-center gap-2 text-[0.6875rem] text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className={cn("font-mono text-xs text-foreground/90", valueClass)}>
        {value}
      </span>
    </div>
  );
}
