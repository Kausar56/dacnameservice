"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Hourglass, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DOMAINS } from "./mock-dashboard";

const WINDOWS = [30, 14, 7] as const;
type Window = (typeof WINDOWS)[number];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ExpiringSoon() {
  const [window, setWindow] = React.useState<Window>(30);

  const expiring = React.useMemo(
    () =>
      DOMAINS.filter((d) => d.daysLeft >= 0 && d.daysLeft <= window).sort(
        (a, b) => a.daysLeft - b.daysLeft
      ),
    [window]
  );

  const counts = React.useMemo(
    () =>
      Object.fromEntries(
        WINDOWS.map((w) => [
          w,
          DOMAINS.filter((d) => d.daysLeft >= 0 && d.daysLeft <= w).length,
        ])
      ) as Record<Window, number>,
    []
  );

  return (
    <div className="rounded-2xl glass p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-warning/15 text-warning">
            <Hourglass className="size-4" />
          </span>
          <h2 className="text-h4 text-foreground">Expiring Soon</h2>
        </div>

        {/* Window filters */}
        <div className="flex items-center gap-1 rounded-xl bg-white/[0.03] p-1">
          {WINDOWS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWindow(w)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50",
                window === w
                  ? "bg-white/[0.06] text-foreground shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {w} days
              <span className="ml-1.5 text-[0.625rem] text-muted-foreground">
                {counts[w]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {expiring.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-white/[0.02] px-4 py-6 text-center text-body-sm"
          >
            No domains expiring within {window} days. You’re all set.
          </motion.p>
        ) : (
          <ul className="space-y-2.5">
            {expiring.map((d, i) => {
              const urgent = d.daysLeft <= 7;
              return (
                <motion.li
                  key={d.name}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: EASE }}
                  className="flex flex-col gap-3 rounded-xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/domain/${d.name}`}
                      className="truncate font-mono text-base font-medium text-foreground transition-colors hover:text-dac-cyan"
                    >
                      {d.name}
                    </Link>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 text-caption">
                      <CalendarClock className="size-3.5" />
                      Expires {d.expiresAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <Badge variant={urgent ? "destructive" : "warning"} size="sm">
                      {d.daysLeft}d left
                    </Badge>
                    <Button
                      asChild
                      variant="gradient"
                      size="sm"
                      className="rounded-lg"
                    >
                      <Link href={`/renew/${d.name}`}>
                        <RefreshCw className="size-3.5" />
                        Renew Now
                      </Link>
                    </Button>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
}
