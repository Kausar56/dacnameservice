"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export const STEPS = ["Summary", "Pricing", "Wallet", "Confirm"] as const;

export function Stepper({
  current,
  steps = STEPS,
}: {
  current: number;
  steps?: readonly string[];
}) {
  return (
    <ol className="flex items-center">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;
        return (
          <li
            key={label}
            className={cn("flex items-center", !isLast && "flex-1")}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  done && "border-transparent bg-gradient-brand text-white",
                  active &&
                    "border-dac-cyan/50 bg-dac-cyan/10 text-dac-cyan shadow-glow-sm",
                  !done && !active && "border-white/10 text-muted-foreground"
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:inline",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <span
                className={cn(
                  "mx-2 h-px flex-1 transition-colors sm:mx-3",
                  done ? "bg-dac-cyan/40" : "bg-white/10"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
