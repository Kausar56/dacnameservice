import { cn } from "@/lib/utils";

export interface AuroraBackgroundProps {
  className?: string;
  /** Show the dotted grid overlay */
  grid?: boolean;
  /** Show the line grid (masked) overlay */
  lines?: boolean;
}

/**
 * Aurora background — layered animated gradient field + noise + optional grid.
 * Pure CSS (no JS) so it is SSR-safe and cheap to render.
 */
export function AuroraBackground({
  className,
  grid = true,
  lines = false,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {/* Base deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dac-bg via-dac-bg-secondary to-dac-bg" />

      {/* Aurora light field */}
      <div className="absolute inset-0 aurora opacity-70" />

      {/* Optional grids */}
      {lines && <div className="absolute inset-0 grid-lines" />}
      {grid && <div className="absolute inset-0 grid-dots opacity-60" />}

      {/* Film grain */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Vignette to focus content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,8,22,0.6)_100%)]" />
    </div>
  );
}
