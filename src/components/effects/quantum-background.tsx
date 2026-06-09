"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
}

export interface QuantumBackgroundProps {
  className?: string;
  particleCount?: number;
  showNetwork?: boolean;
}

export function QuantumBackground({
  className,
  particleCount = 40,
  showNetwork = true,
}: QuantumBackgroundProps) {
  const [particles] = React.useState(() => generateParticles(particleCount));

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* Mesh gradient layers */}
      <div className="absolute inset-0 dac-mesh-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-dac-bg via-transparent to-dac-bg-secondary" />

      {/* Quantum glow orbs */}
      <motion.div
        className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-dac-cyan/10 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-dac-quantum/10 blur-[100px]"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-dac-premium/8 blur-[100px]"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-dac-cyan/60"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Network visualization grid */}
      {showNetwork && (
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dac-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(0,212,255,0.5)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dac-grid)" />
          {/* Network nodes */}
          {[
            [15, 25], [35, 15], [55, 30], [75, 20], [85, 45],
            [20, 55], [45, 65], [65, 55], [80, 75], [30, 80],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="3"
                fill="rgba(0,212,255,0.6)"
                className="animate-pulse-node"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
