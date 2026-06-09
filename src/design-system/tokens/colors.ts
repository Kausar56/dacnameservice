/**
 * DAC Ecosystem Color System
 * Official palette for DACNS — Identity Layer of DAC Quantum Chain.
 */

export const colors = {
  background: {
    primary: "#050816",
    secondary: "#0B1220",
    card: "#111827",
  },

  accent: {
    primary: "#00D4FF",
    secondary: "#00FFA3",
    quantum: "#5B8CFF",
    premium: "#7C3AED",
  },

  text: {
    primary: "#FFFFFF",
    secondary: "#94A3B8",
  },

  border: "rgba(255, 255, 255, 0.08)",

  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },

  glow: {
    cyan: "rgba(0, 212, 255, 0.35)",
    green: "rgba(0, 255, 163, 0.25)",
    quantum: "rgba(91, 140, 255, 0.35)",
    premium: "rgba(124, 58, 237, 0.3)",
  },

  gradient: {
    brand: "linear-gradient(135deg, #00D4FF 0%, #5B8CFF 50%, #7C3AED 100%)",
    accent: "linear-gradient(135deg, #00D4FF 0%, #00FFA3 100%)",
    mesh:
      "radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(91,140,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(124,58,237,0.06) 0%, transparent 50%)",
  },
} as const;
