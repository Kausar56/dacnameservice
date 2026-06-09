/**
 * Mock pricing for the DACNS registration flow.
 * Pure, deterministic — no backend.
 */

import type { DomainResult } from "@/components/search/mock-data";

/** Annual base fee in QE. */
export const ANNUAL_FEE = 4;

/** Protocol network fee in QE. */
export const NETWORK_FEE = 0.5;

/** Estimated network/gas fee in QE. */
export const ESTIMATED_GAS = 0.0021;

/** Selectable registration periods (years). */
export const PERIODS = [1, 2, 3, 5] as const;
export type Period = (typeof PERIODS)[number];

export interface Quote {
  years: number;
  /** Base registration fee: annual × years. */
  registrationFee: number;
  /** One-time premium fee (0 for standard names). */
  premiumFee: number;
  /** Protocol network fee in QE. */
  networkFee: number;
  /** Estimated gas in QE. */
  gas: number;
  /** Grand total in QE. */
  total: number;
  isPremium: boolean;
}

/** Parse a premium price string like "1,200 QE" into a number. */
function parsePremium(price?: string): number {
  if (!price) return 0;
  const n = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Format a QE amount for display. */
export function formatQE(amount: number): string {
  const rounded = Math.round(amount * 10000) / 10000;
  return `${rounded.toLocaleString(undefined, {
    maximumFractionDigits: 4,
  })} QE`;
}

/** Compute a registration quote for a domain + period. */
export function getQuote(result: DomainResult, years: number): Quote {
  const isPremium = result.status === "premium";
  const premiumFee = isPremium ? parsePremium(result.price) : 0;
  const registrationFee = ANNUAL_FEE * years;
  const total = registrationFee + premiumFee + NETWORK_FEE + ESTIMATED_GAS;

  return {
    years,
    registrationFee,
    premiumFee,
    networkFee: NETWORK_FEE,
    gas: ESTIMATED_GAS,
    total,
    isPremium,
  };
}
