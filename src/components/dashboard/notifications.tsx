"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  BellRing,
  CalendarX,
  RefreshCw,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DOMAINS, type OwnedDomain } from "./mock-dashboard";

type Tone = "reminder" | "warning" | "expired";

interface Notice {
  id: string;
  tone: Tone;
  kicker: string;
  title: string;
  body: string;
  domain: OwnedDomain;
}

const TONE_META: Record<
  Tone,
  {
    icon: React.ElementType;
    ring: string;
    iconWrap: string;
    accent: string;
  }
> = {
  reminder: {
    icon: BellRing,
    ring: "border-dac-cyan/25 bg-dac-cyan/[0.04]",
    iconWrap: "bg-dac-cyan/15 text-dac-cyan",
    accent: "text-dac-cyan",
  },
  warning: {
    icon: AlertTriangle,
    ring: "border-warning/30 bg-warning/[0.05]",
    iconWrap: "bg-warning/15 text-warning",
    accent: "text-warning",
  },
  expired: {
    icon: CalendarX,
    ring: "border-destructive/30 bg-destructive/[0.05]",
    iconWrap: "bg-destructive/15 text-destructive",
    accent: "text-destructive",
  },
};

function buildNotices(): Notice[] {
  const list: Notice[] = [];
  for (const d of DOMAINS) {
    if (d.daysLeft < 0) {
      list.push({
        id: `${d.name}-expired`,
        tone: "expired",
        kicker: "Expired Domain",
        title: `${d.name} has expired`,
        body: `Expired ${Math.abs(d.daysLeft)} days ago. Renew now during the grace period to keep ownership.`,
        domain: d,
      });
    } else if (d.daysLeft <= 7) {
      list.push({
        id: `${d.name}-warning`,
        tone: "warning",
        kicker: "Expiration Warning",
        title: `${d.name} expires in ${d.daysLeft} days`,
        body: `Your domain expires on ${d.expiresAt}. Renew now to avoid losing it.`,
        domain: d,
      });
    } else if (d.daysLeft <= 30) {
      list.push({
        id: `${d.name}-reminder`,
        tone: "reminder",
        kicker: "Renewal Reminder",
        title: `${d.name} is up for renewal`,
        body: `Expires on ${d.expiresAt} (${d.daysLeft} days left). Renew early for peace of mind.`,
        domain: d,
      });
    }
  }
  // expired + warnings first
  const order: Record<Tone, number> = { expired: 0, warning: 1, reminder: 2 };
  return list.sort((a, b) => order[a.tone] - order[b.tone]);
}

export function Notifications() {
  const all = React.useMemo(buildNotices, []);
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());

  const notices = all.filter((n) => !dismissed.has(n.id));
  if (notices.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Bell className="size-4 text-muted-foreground" />
        <h2 className="text-label text-muted-foreground">Notifications</h2>
        <span className="flex size-5 items-center justify-center rounded-full bg-white/[0.06] text-[0.625rem] font-medium text-foreground">
          {notices.length}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {notices.map((n) => {
          const meta = TONE_META[n.tone];
          const Icon = meta.icon;
          return (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-4 backdrop-blur-sm",
                meta.ring
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  meta.iconWrap
                )}
              >
                <Icon className="size-5" />
              </span>

              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    "text-[0.6875rem] font-semibold uppercase tracking-wide",
                    meta.accent
                  )}
                >
                  {n.kicker}
                </span>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {n.title}
                </p>
                <p className="text-body-sm mt-1">{n.body}</p>

                <div className="mt-3 flex items-center gap-2">
                  <Button
                    asChild
                    variant="gradient"
                    size="sm"
                    className="rounded-lg"
                  >
                    <Link href={`/renew/${n.domain.name}`}>
                      <RefreshCw className="size-3.5" />
                      Renew Now
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="rounded-lg"
                  >
                    <Link href={`/domain/${n.domain.name}`}>View</Link>
                  </Button>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDismissed((prev) => new Set(prev).add(n.id))
                }
                aria-label="Dismiss notification"
                className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
