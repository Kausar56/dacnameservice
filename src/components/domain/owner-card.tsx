import { ExternalLink, User, Wallet } from "lucide-react";

import { PanelCard } from "./panel";
import { CopyButton } from "./copy-button";
import type { DomainDetails } from "@/components/search/mock-data";

export function OwnerCard({ details }: { details: DomainDetails }) {
  const owned = details.status === "registered";

  return (
    <PanelCard title="Owner Information" icon={<User className="size-4" />}>
      {owned ? (
        <div className="space-y-3">
          {/* Wallet */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
            <span className="flex min-w-0 items-center gap-2.5">
              <Wallet className="size-4 shrink-0 text-dac-cyan" />
              <span className="truncate font-mono text-sm text-foreground">
                {details.owner}
              </span>
            </span>
            <CopyButton
              value={details.ownerFull ?? details.owner ?? ""}
              label="Copy address"
            />
          </div>

          {/* Public profile */}
          <a
            href="#"
            className="group flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <User className="size-4 shrink-0 text-dac-green" />
              <span className="truncate font-mono text-sm text-foreground">
                {details.profileUrl}
              </span>
            </span>
            <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          </a>
        </div>
      ) : (
        <p className="text-body-sm py-2">
          {details.status === "reserved"
            ? "This name is reserved by the DAC ecosystem and has no public owner."
            : "This name has no owner yet — it is available to claim."}
        </p>
      )}
    </PanelCard>
  );
}
