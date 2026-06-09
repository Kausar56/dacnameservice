"use client";

import { Crown, Fuel, Receipt } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { formatQE, type Quote } from "./mock-pricing";
import type { DomainResult } from "@/components/search/mock-data";

interface OrderSummaryProps {
  result: DomainResult;
  quote: Quote;
  className?: string;
}

function Row({
  label,
  value,
  strong,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right font-mono text-sm",
          strong ? "text-foreground" : "text-foreground/90"
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function OrderSummary({ result, quote, className }: OrderSummaryProps) {
  return (
    <div className={cn("rounded-2xl glass p-5 sm:p-6", className)}>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-dac-cyan">
          <Receipt className="size-4" />
        </span>
        <h2 className="text-h4 text-foreground">Order Summary</h2>
      </div>

      {/* Domain name */}
      <div className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
        <span className="truncate font-mono text-base text-foreground">
          {result.name}
        </span>
        {quote.isPremium ? (
          <Badge variant="gradient" size="sm">
            <Crown className="size-3.5" />
            Premium
          </Badge>
        ) : (
          <Badge variant="success" size="sm">
            Standard
          </Badge>
        )}
      </div>

      <div className="divide-y divide-white/[0.06]">
        <Row
          label="Registration Period"
          value={`${quote.years} ${quote.years === 1 ? "year" : "years"}`}
        />
        <Row label="Registration Fee" value={formatQE(quote.registrationFee)} />
        {quote.isPremium && (
          <Row label="Premium Fee" value={formatQE(quote.premiumFee)} />
        )}
        <Row label="Network Fee" value={formatQE(quote.networkFee)} />
        <Row
          label={
            <span className="inline-flex items-center gap-1.5">
              <Fuel className="size-3.5" />
              Estimated Gas
            </span>
          }
          value={formatQE(quote.gas)}
        />
      </div>

      {/* Total */}
      <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-gradient-brand-subtle px-4 py-3.5">
        <span className="text-sm font-medium text-foreground">Total</span>
        <span className="text-gradient font-mono text-lg font-semibold">
          {formatQE(quote.total)}
        </span>
      </div>
    </div>
  );
}
