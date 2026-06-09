"use client";

import * as React from "react";
import { Network, Repeat, User, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/domain/copy-button";
import { cn } from "@/lib/utils";

import { USER } from "./mock-dashboard";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-gradient-brand" : "bg-white/10"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[1.375rem]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export function ResolverSettings() {
  const [reverse, setReverse] = React.useState(USER.reverseResolution);

  return (
    <div className="rounded-2xl glass p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-dac-cyan">
          <Network className="size-4" />
        </span>
        <h2 className="text-h4 text-foreground">Resolver Settings</h2>
      </div>

      <div className="space-y-3">
        {/* Wallet address */}
        <div>
          <p className="text-label mb-1.5 text-muted-foreground">Wallet address</p>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
            <span className="flex min-w-0 items-center gap-2.5">
              <Wallet className="size-4 shrink-0 text-dac-cyan" />
              <span className="truncate font-mono text-sm text-foreground">
                {USER.wallet}
              </span>
            </span>
            <CopyButton value={USER.walletFull} label="Copy wallet address" />
          </div>
        </div>

        {/* Resolver address */}
        <div>
          <p className="text-label mb-1.5 text-muted-foreground">Resolver</p>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
            <span className="flex min-w-0 items-center gap-2.5">
              <Network className="size-4 shrink-0 text-dac-quantum" />
              <span className="truncate font-mono text-sm text-foreground">
                {USER.resolver}
              </span>
            </span>
            <CopyButton value={USER.resolver} label="Copy resolver" />
          </div>
        </div>

        {/* Public profile */}
        <div>
          <p className="text-label mb-1.5 text-muted-foreground">Public profile</p>
          <a
            href="#"
            className="group flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <User className="size-4 shrink-0 text-dac-green" />
              <span className="truncate font-mono text-sm text-foreground">
                {USER.profileUrl}
              </span>
            </span>
            <span className="text-caption transition-colors group-hover:text-foreground">
              View
            </span>
          </a>
        </div>

        {/* Reverse resolution */}
        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
          <span className="flex items-center gap-2.5">
            <Repeat className="size-4 text-dac-green" />
            <span className="text-sm text-foreground">Reverse Resolution</span>
            <Badge variant={reverse ? "success" : "muted"} size="sm">
              {reverse ? "Active" : "Off"}
            </Badge>
          </span>
          <Toggle checked={reverse} onChange={setReverse} />
        </div>
      </div>
    </div>
  );
}
