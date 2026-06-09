"use client";

import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shimmering skeleton block. */
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03] bg-[length:200%_100%]",
        className
      )}
    />
  );
}

/** Loading state shown while the resolver "resolves". */
export function SearchLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Searching">
      {/* Header + filters skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* Results grid skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl glass p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
            </div>
            <Skeleton className="mt-5 h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Empty state — invalid input or nothing to show. */
export function SearchEmpty({ onClear }: { onClear?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl glass px-6 py-16 text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-white/[0.04] text-muted-foreground">
        <SearchX className="size-7" />
      </div>
      <h3 className="text-h4 text-foreground">No matches found</h3>
      <p className="text-body-sm mt-2 max-w-sm">
        Try a different name. Use letters, numbers, and hyphens — names must be
        at least one character.
      </p>
      {onClear && (
        <Button
          variant="glass"
          size="sm"
          className="mt-6 rounded-lg"
          onClick={onClear}
        >
          Clear search
        </Button>
      )}
    </div>
  );
}
