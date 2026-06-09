"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  History,
  Network,
  RefreshCw,
  UserPlus,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { ACTIVITY, type DashActivityType } from "./mock-dashboard";

const ICONS: Record<DashActivityType, typeof UserPlus> = {
  registration: UserPlus,
  renewal: RefreshCw,
  resolver: Network,
  transfer: ArrowLeftRight,
};

const COLORS: Record<DashActivityType, string> = {
  registration: "text-dac-cyan",
  renewal: "text-dac-green",
  resolver: "text-dac-quantum",
  transfer: "text-dac-premium",
};

type Filter = "all" | "registration" | "renewal";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "registration", label: "Registrations" },
  { value: "renewal", label: "Renewals" },
];

export function ActivityHistory() {
  const [filter, setFilter] = React.useState<Filter>("all");

  const events = React.useMemo(
    () =>
      filter === "all"
        ? ACTIVITY
        : ACTIVITY.filter((e) => e.type === filter),
    [filter]
  );

  return (
    <div className="rounded-2xl glass p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-dac-cyan">
            <History className="size-4" />
          </span>
          <h2 className="text-h4 text-foreground">Activity History</h2>
        </div>
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.value
                  ? "bg-gradient-brand text-white"
                  : "glass-subtle text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative">
        {events.map((event, i) => {
          const Icon = ICONS[event.type];
          const isLast = i === events.length - 1;
          return (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              {!isLast && (
                <span
                  className="absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-px bg-white/[0.08]"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.04]",
                  COLORS[event.type]
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {event.title}{" "}
                    <span className="font-mono text-dac-cyan">
                      {event.domain}
                    </span>
                  </p>
                  <span className="text-caption shrink-0">{event.date}</span>
                </div>
                <p className="text-body-sm mt-0.5">
                  <span className="font-mono text-dac-green">
                    +{event.points} QE
                  </span>{" "}
                  earned
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
