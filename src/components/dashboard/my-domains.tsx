"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarClock,
  ExternalLink,
  Globe2,
  RefreshCw,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DOMAINS, HEALTH_META } from "./mock-dashboard";

export function MyDomains() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-dac-cyan">
            <Globe2 className="size-4" />
          </span>
          <h2 className="text-h4 text-foreground">My Domains</h2>
        </div>
        <Badge variant="muted" size="sm">
          {DOMAINS.length} owned
        </Badge>
      </div>

      <div className="space-y-2.5">
        {DOMAINS.map((d, i) => {
          const health = HEALTH_META[d.health];
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group flex flex-col gap-4 rounded-xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Identity */}
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={cn("size-2.5 shrink-0 rounded-full", health.dot)}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/domain/${d.name}`}
                      className="truncate font-mono text-base font-medium text-foreground transition-colors hover:text-dac-cyan"
                    >
                      {d.name}
                    </Link>
                    {d.isPrimary && (
                      <Star className="size-3.5 shrink-0 fill-dac-cyan text-dac-cyan" />
                    )}
                  </div>
                  <p className="text-caption mt-0.5">{d.category}</p>
                </div>
              </div>

              {/* Meta + actions */}
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" />
                  {d.daysLeft < 0
                    ? `Expired ${Math.abs(d.daysLeft)}d ago`
                    : `${d.daysLeft}d left`}
                  <span className="hidden sm:inline">· {d.expiresAt}</span>
                </span>

                <Badge variant={health.badge} size="sm">
                  {health.label}
                </Badge>

                <div className="flex items-center gap-1.5">
                  <Button
                    asChild
                    variant={d.health === "active" ? "ghost" : "gradient"}
                    size="sm"
                    className="rounded-lg"
                  >
                    <Link href={`/renew/${d.name}`}>
                      <RefreshCw className="size-3.5" />
                      Renew
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-lg"
                    aria-label="Manage domain"
                  >
                    <Link href={`/domain/${d.name}`}>
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
