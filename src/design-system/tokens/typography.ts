/**
 * DACNS Typography System
 * Linear-inspired hierarchy with Geist (Vercel) typeface.
 */

export const fontFamily = {
  sans: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, monospace",
} as const;

export const fontSize = {
  /** Hero display — landing headlines */
  display: {
    size: "4.5rem",
    lineHeight: "1.05",
    letterSpacing: "-0.04em",
    weight: "600",
  },
  /** Page titles */
  h1: {
    size: "3rem",
    lineHeight: "1.1",
    letterSpacing: "-0.03em",
    weight: "600",
  },
  h2: {
    size: "2.25rem",
    lineHeight: "1.15",
    letterSpacing: "-0.025em",
    weight: "600",
  },
  h3: {
    size: "1.5rem",
    lineHeight: "1.25",
    letterSpacing: "-0.02em",
    weight: "600",
  },
  h4: {
    size: "1.125rem",
    lineHeight: "1.35",
    letterSpacing: "-0.015em",
    weight: "600",
  },
  /** Body copy */
  bodyLg: {
    size: "1.125rem",
    lineHeight: "1.6",
    letterSpacing: "-0.01em",
    weight: "400",
  },
  body: {
    size: "1rem",
    lineHeight: "1.6",
    letterSpacing: "-0.01em",
    weight: "400",
  },
  bodySm: {
    size: "0.875rem",
    lineHeight: "1.5",
    letterSpacing: "0",
    weight: "400",
  },
  /** Labels & metadata */
  label: {
    size: "0.8125rem",
    lineHeight: "1.4",
    letterSpacing: "0.02em",
    weight: "500",
  },
  caption: {
    size: "0.75rem",
    lineHeight: "1.4",
    letterSpacing: "0.01em",
    weight: "400",
  },
  overline: {
    size: "0.6875rem",
    lineHeight: "1.3",
    letterSpacing: "0.08em",
    weight: "600",
  },
  /** Monospace — addresses, hashes, ENS names */
  mono: {
    size: "0.875rem",
    lineHeight: "1.5",
    letterSpacing: "0",
    weight: "400",
  },
  monoSm: {
    size: "0.8125rem",
    lineHeight: "1.45",
    letterSpacing: "0",
    weight: "400",
  },
} as const;

export type TypographyScale = keyof typeof fontSize;
