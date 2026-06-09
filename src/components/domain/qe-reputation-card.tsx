"use client";

import { motion } from "framer-motion";
import { Award, Fingerprint, Gauge, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PanelCard } from "./panel";
import type { DomainDetails } from "@/components/search/mock-data";

export function QEReputationCard({ details }: { details: DomainDetails }) {
  const { score, level, identityStatus } = details.qe;
  const pct = Math.min(100, Math.round((score / 1000) * 100));
  const hasScore = score > 0;

  return (
    <PanelCard title="QE Reputation" icon={<Sparkles className="size-4" />}>
      {/* Score */}
      <div className="rounded-xl bg-white/[0.03] p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="size-4 text-dac-cyan" />
            QE Score
          </span>
          <span className="font-mono text-sm text-muted-foreground">
            {score} <span className="text-muted-foreground/60">/ 1000</span>
          </span>
        </div>
        <div className="mt-3 text-3xl font-bold text-foreground">
          {hasScore ? score : "—"}
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-brand"
          />
        </div>
      </div>

      {/* Level + identity */}
      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
          <span className="flex items-center gap-2.5 text-sm text-foreground">
            <Award className="size-4 text-dac-premium" />
            Reputation Level
          </span>
          <Badge variant={hasScore ? "gradient" : "muted"} size="sm">
            {level}
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
          <span className="flex items-center gap-2.5 text-sm text-foreground">
            <Fingerprint className="size-4 text-dac-green" />
            Identity Status
          </span>
          <Badge
            variant={
              identityStatus === "Verified Identity" ? "success" : "muted"
            }
            size="sm"
          >
            {identityStatus}
          </Badge>
        </div>
      </div>
    </PanelCard>
  );
}
