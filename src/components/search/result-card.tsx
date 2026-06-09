"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Crown, Lock, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { STATUS_META } from "./domain-card";
import { categoryOf, type DomainResult } from "./mock-data";

interface ResultCardProps {
  result: DomainResult;
  /** Marks the exact match with a "Best match" ribbon + accent ring. */
  highlight?: boolean;
}

/** Uniform grid card: status, category, length, price/owner + action. */
export function ResultCard({ result, highlight }: ResultCardProps) {
  const meta = STATUS_META[result.status];
  const Icon = meta.icon;
  const category = categoryOf(result);
  const href = `/domain/${result.name}`;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated",
        meta.ring,
        highlight && "border-dac-cyan/40 shadow-glow"
      )}
    >
      {/* Whole-card link (prefetched). Stretched overlay keeps nested action
          buttons valid + clickable instead of nesting links inside an anchor. */}
      <Link
        href={href}
        aria-label={`View details for ${result.name}`}
        className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50"
      />

      {/* accent glow */}
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 size-32 rounded-full blur-[70px] opacity-40",
          result.status === "available" && "bg-dac-green/30",
          result.status === "premium" && "bg-dac-premium/30",
          result.status === "reserved" && "bg-warning/20",
          result.status === "registered" && "bg-white/5"
        )}
      />

      {highlight && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-dac-cyan/15 px-2.5 py-1 text-[0.6875rem] font-medium text-dac-cyan">
          <Sparkles className="size-3" />
          Best match
        </span>
      )}

      {/* Identity */}
      <div className="relative flex items-center gap-3">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]",
            meta.iconColor
          )}
        >
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-mono text-lg font-semibold text-foreground">
            {result.name}
          </h3>
          <Badge variant={meta.badge} size="sm" className="mt-1">
            {meta.label}
          </Badge>
        </div>
      </div>

      {/* Meta */}
      <dl className="relative mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-white/[0.03] px-3 py-2">
          <dt className="text-caption">Category</dt>
          <dd className="mt-0.5 font-medium text-foreground">{category}</dd>
        </div>
        <div className="rounded-lg bg-white/[0.03] px-3 py-2">
          <dt className="text-caption">Length</dt>
          <dd className="mt-0.5 font-medium text-foreground">
            {result.length} chars
          </dd>
        </div>
      </dl>

      {/* Status detail */}
      <p className="relative mt-3 min-h-[1.25rem] text-sm">
        {(result.status === "available" || result.status === "premium") &&
          result.price && (
            <span className="font-mono text-foreground">{result.price}</span>
          )}
        {result.status === "registered" && (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            Owner
            <span className="font-mono text-foreground">{result.owner}</span>
          </span>
        )}
        {result.status === "reserved" && (
          <span className="text-muted-foreground">Protected by DAC</span>
        )}
      </p>

      {/* Action */}
      <div className="relative z-30 mt-5 flex items-center gap-2 pt-1">
        {result.status === "available" && (
          <Button asChild variant="gradient" className="flex-1 rounded-xl">
            <Link href={`/register/${result.name}`}>
              Register Domain
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
        {result.status === "premium" && (
          <Button asChild variant="gradient" className="flex-1 rounded-xl">
            <Link href={`/domain/${result.name}`}>
              <Crown className="size-4" />
              View Premium Details
            </Link>
          </Button>
        )}
        {result.status === "registered" && (
          <Button asChild variant="outline" className="flex-1 rounded-xl">
            <Link href={`/domain/${result.name}`}>View Details</Link>
          </Button>
        )}
        {result.status === "reserved" && (
          <Button variant="outline" disabled className="flex-1 rounded-xl">
            <Lock className="size-4" />
            Unavailable
          </Button>
        )}

        <Button
          asChild
          variant="ghost"
          size="icon"
          className="size-10 shrink-0 rounded-xl"
          aria-label="View details"
        >
          <Link href={`/domain/${result.name}`}>
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
