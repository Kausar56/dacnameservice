/**
 * DACNS Spacing System
 * 4px base unit — consistent rhythm across layouts.
 */

export const spacing = {
  /** Base unit */
  unit: 4,

  /** Named scale (px values) */
  px: "1px",
  0: "0",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  3.5: "14px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  36: "144px",
  40: "160px",
  44: "176px",
  48: "192px",
  52: "208px",
  56: "224px",
  60: "240px",
  64: "256px",
  72: "288px",
  80: "320px",
  96: "384px",
} as const;

/** Layout-specific spacing presets */
export const layout = {
  /** Page horizontal padding */
  pagePaddingX: {
    mobile: spacing[4],
    tablet: spacing[6],
    desktop: spacing[8],
  },
  /** Section vertical rhythm */
  sectionGap: {
    sm: spacing[12],
    md: spacing[16],
    lg: spacing[24],
    xl: spacing[32],
  },
  /** Component internal padding */
  cardPadding: {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
  },
  /** Stack gaps */
  stackGap: {
    xs: spacing[2],
    sm: spacing[3],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
  },
} as const;

/** Container max-widths */
export const container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
  full: "100%",
} as const;

export type SpacingScale = keyof typeof spacing;
export type ContainerSize = keyof typeof container;
