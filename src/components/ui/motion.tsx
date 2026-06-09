"use client";

import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

/** Shared easing — Apple/Linear-style spring feel */
export const easings = {
  smooth: [0.16, 1, 0.3, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  snappy: [0.25, 0.1, 0.25, 1] as const,
};

/** Preset animation variants — visible by default for SSR safety */
export const fadeInUp: Variants = {
  hidden: { opacity: 1, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.smooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easings.smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 1, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: easings.smooth },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export interface MotionDivProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

/** Fade-in-up wrapper — content always visible; animates position only */
export function FadeIn({
  className,
  delay = 0,
  children,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 1, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: easings.smooth }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Stagger children animation container — SSR-safe (never opacity:0) */
export function Stagger({
  className,
  children,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial="visible"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Stagger child item */
export function StaggerItem({
  className,
  children,
  ...props
}: MotionDivProps) {
  return (
    <motion.div className={cn(className)} variants={fadeInUp} {...props}>
      {children}
    </motion.div>
  );
}

/** Hover lift effect for interactive cards */
export function HoverLift({
  className,
  children,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Glow pulse for Web3 accent elements */
export function GlowPulse({
  className,
  children,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      animate={{
        boxShadow: [
          "0 0 20px var(--glow-cyan)",
          "0 0 40px var(--glow-cyan)",
          "0 0 20px var(--glow-cyan)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { motion };
