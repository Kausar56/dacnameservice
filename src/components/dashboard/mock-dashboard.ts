/**
 * Mock data for the DACNS User Dashboard.
 * Scoped to a single "connected" user — no backend, no chain.
 */

export type DomainHealth = "active" | "expiring" | "grace";

export interface OwnedDomain {
  name: string;
  label: string;
  category: string;
  registeredAt: string;
  expiresAt: string;
  /** Days until expiry (negative = in grace period). */
  daysLeft: number;
  health: DomainHealth;
  isPrimary: boolean;
}

export type DashActivityType =
  | "registration"
  | "renewal"
  | "resolver"
  | "transfer";

export interface DashActivity {
  id: string;
  type: DashActivityType;
  domain: string;
  title: string;
  date: string;
  points: number;
}

export interface SocialLinks {
  x: string;
  github: string;
  website: string;
  discord: string;
}

export interface DashboardUser {
  primaryName: string;
  profileUrl: string;
  wallet: string;
  walletFull: string;
  resolver: string;
  reverseResolution: boolean;
  initials: string;
  avatarGradient: string;
  bio: string;
  joinedAt: string;
  socials: SocialLinks;
}

export const USER: DashboardUser = {
  primaryName: "satoshi.dac",
  profileUrl: "dac.id/satoshi",
  wallet: "0x7a3F…b21c",
  walletFull: "0x7a3F9c2e4D8b1A6f0E5c9D2b7a4F8e1c3b21c",
  resolver: "0xRes09f3a21c…Dac",
  reverseResolution: true,
  initials: "SA",
  avatarGradient: "from-dac-cyan via-dac-quantum to-dac-premium",
  bio: "Builder on DAC Quantum Chain. Exploring decentralized identity, on-chain reputation, and quantum-secure naming.",
  joinedAt: "Mar 2024",
  socials: {
    x: "satoshi",
    github: "satoshi",
    website: "satoshi.xyz",
    discord: "satoshi#0001",
  },
};

export const DOMAINS: OwnedDomain[] = [
  {
    name: "satoshi.dac",
    label: "satoshi",
    category: "Premium",
    registeredAt: "Mar 14, 2024",
    expiresAt: "Mar 14, 2028",
    daysLeft: 643,
    health: "active",
    isPrimary: true,
  },
  {
    name: "builder.dac",
    label: "builder",
    category: "Standard",
    registeredAt: "Jun 21, 2024",
    expiresAt: "Jun 21, 2026",
    daysLeft: 12,
    health: "expiring",
    isPrimary: false,
  },
  {
    name: "quantum.dac",
    label: "quantum",
    category: "5 Character",
    registeredAt: "Jul 07, 2024",
    expiresAt: "Jul 07, 2026",
    daysLeft: 28,
    health: "expiring",
    isPrimary: false,
  },
  {
    name: "gm.dac",
    label: "gm",
    category: "2 Character",
    registeredAt: "Jun 14, 2024",
    expiresAt: "Jun 14, 2026",
    daysLeft: 5,
    health: "expiring",
    isPrimary: false,
  },
  {
    name: "vault.dac",
    label: "vault",
    category: "Premium",
    registeredAt: "Jun 06, 2024",
    expiresAt: "Jun 06, 2026",
    daysLeft: -3,
    health: "grace",
    isPrimary: false,
  },
];

export const ACTIVITY: DashActivity[] = [
  {
    id: "a1",
    type: "renewal",
    domain: "satoshi.dac",
    title: "Renewed registration",
    date: "Mar 14, 2026",
    points: 120,
  },
  {
    id: "a2",
    type: "registration",
    domain: "vault.dac",
    title: "Registered domain",
    date: "Feb 18, 2025",
    points: 320,
  },
  {
    id: "a3",
    type: "resolver",
    domain: "builder.dac",
    title: "Updated resolver records",
    date: "Dec 02, 2024",
    points: 25,
  },
  {
    id: "a4",
    type: "registration",
    domain: "quantum.dac",
    title: "Registered domain",
    date: "Nov 21, 2024",
    points: 80,
  },
  {
    id: "a5",
    type: "registration",
    domain: "builder.dac",
    title: "Registered domain",
    date: "Aug 09, 2024",
    points: 60,
  },
  {
    id: "a6",
    type: "transfer",
    domain: "gm.dac",
    title: "Received transfer",
    date: "Jun 15, 2024",
    points: 40,
  },
  {
    id: "a7",
    type: "registration",
    domain: "satoshi.dac",
    title: "Registered domain",
    date: "Mar 14, 2024",
    points: 200,
  },
];

export interface QEBreakdown {
  label: string;
  points: number;
  /** Share of total, 0–100, for the progress bar. */
  share: number;
}

export const QE = {
  total: 845,
  /** 0–100 engagement score. */
  activityScore: 78,
  tier: "Quantum Builder",
  rank: 1284,
  streakDays: 23,
  nextTierAt: 1000,
  breakdown: [
    { label: "Registrations", points: 660, share: 78 },
    { label: "Renewals", points: 120, share: 14 },
    { label: "Resolver updates", points: 25, share: 3 },
    { label: "Referrals", points: 40, share: 5 },
  ] as QEBreakdown[],
};

export const HEALTH_META: Record<
  DomainHealth,
  { label: string; badge: "success" | "warning" | "muted"; dot: string }
> = {
  active: { label: "Active", badge: "success", dot: "bg-dac-green" },
  expiring: { label: "Expiring soon", badge: "warning", dot: "bg-warning" },
  grace: { label: "Grace period", badge: "muted", dot: "bg-muted-foreground" },
};
