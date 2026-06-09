"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { STATUS_META } from "./domain-card";
import type { DomainResult } from "./mock-data";

interface SuggestionCardProps {
  result: DomainResult;
}

/** Compact domain card — navigates to the domain details page. */
export function SuggestionCard({ result }: SuggestionCardProps) {
  const meta = STATUS_META[result.status];
  const interactive = result.status === "available" || result.status === "premium";

  return (
    <Link
      href={`/domain/${result.name}`}
      aria-label={`View details for ${result.name}`}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-xl glass px-4 py-3 text-left transition-colors hover:border-white/15"
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span
          className={cn(
            "size-2 shrink-0 rounded-full",
            meta.dot,
            interactive && "animate-pulse-node"
          )}
        />
        <span className="truncate font-mono text-sm text-foreground">
          {result.name}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-2.5">
        {result.price && interactive && (
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {result.price}
          </span>
        )}
        <Badge variant={meta.badge} size="sm">
          {meta.label}
        </Badge>
        <span className="flex size-6 items-center justify-center rounded-full bg-white/[0.05] text-dac-cyan opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </Link>
  );
}
