"use client";

import { cn } from "@/lib/utils";

import type { DomainStatus } from "./mock-data";

export type FilterValue = "all" | DomainStatus;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "premium", label: "Premium" },
  { value: "registered", label: "Registered" },
  { value: "reserved", label: "Reserved" },
];

interface SearchFiltersProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

/** Pill-style status filter tabs with live counts. */
export function SearchFilters({ active, onChange, counts }: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map((f) => {
        const isActive = active === f.value;
        const count = counts[f.value] ?? 0;
        const disabled = f.value !== "all" && count === 0;
        return (
          <button
            key={f.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(f.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-gradient-brand text-white shadow-glow-sm"
                : "glass-subtle text-muted-foreground hover:text-foreground",
              disabled && "cursor-not-allowed opacity-40 hover:text-muted-foreground"
            )}
          >
            {f.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[0.6875rem] tabular-nums",
                isActive ? "bg-white/20" : "bg-white/[0.06]"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
