import { BadgeCheck, Network, Repeat, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PanelCard } from "./panel";
import { CopyButton } from "./copy-button";
import type { DomainDetails } from "@/components/search/mock-data";

export function ResolverCard({ details }: { details: DomainDetails }) {
  const hasResolver = Boolean(details.resolver);

  return (
    <PanelCard
      title="Resolver"
      icon={<Network className="size-4" />}
      action={
        details.verified ? (
          <Badge variant="success" size="sm">
            <BadgeCheck className="size-3.5" />
            Verified
          </Badge>
        ) : (
          <Badge variant="muted" size="sm">
            Unverified
          </Badge>
        )
      }
    >
      {hasResolver ? (
        <div className="space-y-3">
          {/* Resolver address */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
            <span className="flex min-w-0 items-center gap-2.5">
              <Network className="size-4 shrink-0 text-dac-cyan" />
              <span className="truncate font-mono text-sm text-foreground">
                {details.resolver}
              </span>
            </span>
            <CopyButton value={details.resolver ?? ""} label="Copy resolver" />
          </div>

          {/* Reverse resolution */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
            <span className="flex items-center gap-2.5 text-sm text-foreground">
              <Repeat className="size-4 text-dac-green" />
              Reverse Resolution
            </span>
            <Badge variant={details.reverseResolution ? "success" : "muted"} size="sm">
              {details.reverseResolution ? "Active" : "Not set"}
            </Badge>
          </div>

          {/* Verification */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
            <span className="flex items-center gap-2.5 text-sm text-foreground">
              <ShieldCheck className="size-4 text-dac-cyan" />
              Verification
            </span>
            <Badge variant={details.verified ? "success" : "muted"} size="sm">
              {details.verified ? "Verified resolver" : "Unverified"}
            </Badge>
          </div>
        </div>
      ) : (
        <p className="text-body-sm py-2">
          No resolver configured. A resolver is set automatically when the name
          is registered.
        </p>
      )}
    </PanelCard>
  );
}
