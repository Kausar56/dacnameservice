"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SpotlightProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Glow color (rgba/hex). Defaults to DAC cyan. */
  color?: string;
  /** Radius of the glow in px. */
  size?: number;
}

/**
 * Mouse-reactive glow container. Tracks the pointer within its bounds and
 * renders a soft radial highlight that follows the cursor. Falls back to a
 * static, invisible state until the user moves their mouse (SSR-safe).
 */
export function Spotlight({
  className,
  color = "rgba(0, 212, 255, 0.15)",
  size = 400,
  children,
  ...props
}: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [active, setActive] = React.useState(false);

  const handleMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("relative", className)}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
