import * as React from "react";

import { cn } from "@/lib/utils";

/** Glass panel wrapper with a titled header. */
export function PanelCard({
  title,
  icon,
  action,
  children,
  className,
}: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl glass p-5 sm:p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-dac-cyan">
              {icon}
            </span>
          )}
          <h2 className="text-h4 text-foreground">{title}</h2>
        </div>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}

/** A label/value row used inside panels. */
export function DetailRow({
  icon,
  label,
  value,
  last,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-3",
        !last && "border-b border-white/[0.06]"
      )}
    >
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-right text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}
