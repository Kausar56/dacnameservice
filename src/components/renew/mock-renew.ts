/**
 * Mock data + pricing for the DACNS domain renewal flow.
 * Pure, deterministic — no backend.
 */

import {
  DOMAINS,
  type OwnedDomain,
} from "@/components/dashboard/mock-dashboard";
import { resolveDomain } from "@/components/search/mock-data";
import { ESTIMATED_GAS, NETWORK_FEE } from "@/components/register/mock-pricing";

export type RenewBadge = "active" | "expiring" | "expired";

const STANDARD_ANNUAL = 4;
const PREMIUM_ANNUAL = 40;

export interface RenewQuote {
  years: number;
  renewalFee: number;
  networkFee: number;
  gas: number;
  total: number;
  isPremium: boolean;
  /** Expiry date string after applying the renewal. */
  newExpiry: string;
}

/** Look up an owned domain (or synthesize one from the registry). */
export function getOwnedDomain(input: string): OwnedDomain | null {
  const label = input.trim().toLowerCase().replace(/\.dac$/i, "");
  if (!label) return null;

  const found = DOMAINS.find((d) => d.label === label);
  if (found) return found;

  // Fall back to the registry for other registered names.
  const r = resolveDomain(label);
  if (r && r.status === "registered") {
    return {
      name: r.name,
      label: r.label,
      category: r.length <= 3 || r.length === 5 ? "Premium" : "Standard",
      registeredAt: r.registeredAt ?? "—",
      expiresAt: r.expiresAt ?? "—",
      daysLeft: 120,
      health: "active",
      isPrimary: false,
    };
  }

  return null;
}

export function isPremiumDomain(d: OwnedDomain): boolean {
  return d.category === "Premium";
}

export function isExpired(d: OwnedDomain): boolean {
  return d.daysLeft < 0;
}

/** Badge classification for the renewal hero. */
export function renewBadgeOf(d: OwnedDomain): RenewBadge {
  if (d.daysLeft < 0) return "expired";
  if (d.daysLeft <= 30) return "expiring";
  return "active";
}

function parseDate(s: string): Date | null {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/** New expiry after renewing N years (extends from current expiry, or now if expired). */
export function newExpiryAfter(d: OwnedDomain, years: number): string {
  const base = parseDate(d.expiresAt);
  const now = new Date();
  const from = !base || base.getTime() < now.getTime() ? now : base;
  const next = new Date(from);
  next.setFullYear(next.getFullYear() + years);
  return formatDate(next);
}

/** Compute a renewal quote. Premium names renew at a premium annual rate. */
export function getRenewalQuote(d: OwnedDomain, years: number): RenewQuote {
  const isPremium = isPremiumDomain(d);
  const annual = isPremium ? PREMIUM_ANNUAL : STANDARD_ANNUAL;
  const renewalFee = annual * years;
  const total = renewalFee + NETWORK_FEE + ESTIMATED_GAS;

  return {
    years,
    renewalFee,
    networkFee: NETWORK_FEE,
    gas: ESTIMATED_GAS,
    total,
    isPremium,
    newExpiry: newExpiryAfter(d, years),
  };
}

/** Domains expiring within `days` (and not yet expired), soonest first. */
export function expiringWithin(days: number): OwnedDomain[] {
  return DOMAINS.filter((d) => d.daysLeft >= 0 && d.daysLeft <= days).sort(
    (a, b) => a.daysLeft - b.daysLeft
  );
}

/** All expired domains. */
export function expiredDomains(): OwnedDomain[] {
  return DOMAINS.filter((d) => d.daysLeft < 0);
}
