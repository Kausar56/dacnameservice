"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Crown,
  Lock,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { DomainResult, DomainStatus } from "./mock-data";

const STATUS_META: Record<
  DomainStatus,
  {
    label: string;
    badge: "success" | "gradient" | "warning" | "muted";
    dot: string;
    ring: string;
    icon: typeof CheckCircle2;
    iconColor: string;
  }
> = {
  available: {
    label: "Available",
    badge: "success",
    dot: "bg-dac-green",
    ring: "hover:border-dac-green/30",
    icon: CheckCircle2,
    iconColor: "text-dac-green",
  },
  premium: {
    label: "Premium",
    badge: "gradient",
    dot: "bg-dac-premium",
    ring: "hover:border-dac-premium/30",
    icon: Crown,
    iconColor: "text-dac-premium",
  },
  registered: {
    label: "Registered",
    badge: "muted",
    dot: "bg-muted-foreground",
    ring: "hover:border-white/15",
    icon: User,
    iconColor: "text-muted-foreground",
  },
  reserved: {
    label: "Reserved",
    badge: "warning",
    dot: "bg-warning",
    ring: "hover:border-warning/30",
    icon: Lock,
    iconColor: "text-warning",
  },
};

/** Primary, full-width result card (the searched name). */
export function DomainCard({ result }: { result: DomainResult }) {
  const meta = STATUS_META[result.status];
  const Icon = meta.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl glass p-5 transition-colors sm:p-6",
        meta.ring
      )}
    >
      {/* status accent glow */}
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full blur-[80px] opacity-40",
          result.status === "available" && "bg-dac-green/30",
          result.status === "premium" && "bg-dac-premium/30",
          result.status === "reserved" && "bg-warning/20",
          result.status === "registered" && "bg-white/5"
        )}
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Identity */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]",
              meta.iconColor
            )}
          >
            <Icon className="size-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-mono text-xl font-semibold text-foreground sm:text-2xl">
                {result.name}
              </h3>
              <Badge variant={meta.badge} size="sm">
                {meta.label}
              </Badge>
            </div>

            {/* Status detail line */}
            <p className="text-body-sm mt-1">
              {result.status === "available" &&
                "This name is available to register now."}
              {result.status === "premium" &&
                "Premium name — limited availability."}
              {result.status === "reserved" &&
                "Protected by the DAC ecosystem."}
              {result.status === "registered" && (
                <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5" />
                    {result.owner}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="size-3.5" />
                    Registered {result.registeredAt}
                  </span>
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
          {(result.status === "available" || result.status === "premium") && (
            <span className="font-mono text-sm text-foreground">
              {result.price}
            </span>
          )}
          {result.status === "registered" && result.expiresAt && (
            <span className="text-caption">Expires {result.expiresAt}</span>
          )}

          {result.status === "available" && (
            <Button variant="gradient" size="lg" className="rounded-xl">
              Register
              <ArrowRight className="size-4" />
            </Button>
          )}
          {result.status === "premium" && (
            <Button variant="gradient" size="lg" className="rounded-xl">
              <Crown className="size-4" />
              Buy Premium
            </Button>
          )}
          {result.status === "registered" && (
            <Button variant="outline" size="lg" className="rounded-xl">
              View Profile
            </Button>
          )}
          {result.status === "reserved" && (
            <Button
              variant="outline"
              size="lg"
              disabled
              className="rounded-xl"
            >
              <Lock className="size-4" />
              Unavailable
            </Button>
          )}

          <Link
            href={`/domain/${result.name}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-dac-cyan"
          >
            View details
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export { STATUS_META };
