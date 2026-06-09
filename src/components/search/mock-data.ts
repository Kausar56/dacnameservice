/**
 * Mock data + resolver for the DACNS Domain Search page.
 * No blockchain — purely deterministic client-side mocks.
 */

export type DomainStatus = "available" | "registered" | "premium" | "reserved";

export interface DomainResult {
  /** Full name including the .dac suffix, e.g. "satoshi.dac" */
  name: string;
  /** Bare label without suffix, e.g. "satoshi" */
  label: string;
  status: DomainStatus;
  /** Price string for available / premium names */
  price?: string;
  /** Owner address for registered names (masked for display) */
  owner?: string;
  /** Full owner address for registered names (copyable) */
  ownerFull?: string;
  /** ISO-ish display date for registered names */
  registeredAt?: string;
  expiresAt?: string;
  /** Character length of the label */
  length: number;
}

const SUFFIX = ".dac";

/** Names that are already taken (with mock owner + dates). */
const REGISTERED: Record<
  string,
  {
    owner: string;
    ownerFull: string;
    registeredAt: string;
    expiresAt: string;
  }
> = {
  satoshi: {
    owner: "0x7a3F…b21c",
    ownerFull: "0x7a3F9c2e4D8b1A6f0E5c9D2b7a4F8e1c3b21c",
    registeredAt: "Mar 14, 2024",
    expiresAt: "Mar 14, 2027",
  },
  vitalik: {
    owner: "0x4D9a…8E11",
    ownerFull: "0x4D9a2B7c0F1e3A8d6C5b4A9e2D7c1F0b3a8E11",
    registeredAt: "Jan 02, 2024",
    expiresAt: "Jan 02, 2026",
  },
  builder: {
    owner: "0xC1f2…77Ad",
    ownerFull: "0xC1f29D4a7B3e0C8f1A6d5B2e9C4a7F0b3d77Ad",
    registeredAt: "Aug 09, 2024",
    expiresAt: "Aug 09, 2026",
  },
  quantum: {
    owner: "0x9bE4…0F3d",
    ownerFull: "0x9bE41A7c2D8f0B3e6C5a4D9b2E7c1F8a0b0F3d",
    registeredAt: "Nov 21, 2024",
    expiresAt: "Nov 21, 2027",
  },
  dao: {
    owner: "0x33Aa…C9b8",
    ownerFull: "0x33Aa1c7E4b9D2f0A8c6B5d3E1a7C9f0b2dC9b8",
    registeredAt: "Feb 18, 2024",
    expiresAt: "Feb 18, 2026",
  },
};

/** Names protected by the DAC ecosystem — cannot be registered. */
const RESERVED = new Set([
  "dac",
  "admin",
  "root",
  "wallet",
  "explorer",
  "testnet",
  "mainnet",
  "support",
  "official",
  "system",
]);

/** Curated premium labels regardless of length. */
const PREMIUM = new Set([
  "ai",
  "gm",
  "web3",
  "crypto",
  "alpha",
  "money",
  "vault",
  "id",
  "pay",
  "dex",
]);

function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\.dac$/i, "")
    .replace(/[^a-z0-9-]/g, "");
}

function premiumPriceForLength(len: number): string {
  if (len <= 2) return "1,200 QE";
  if (len === 3) return "320 QE";
  if (len === 4) return "120 QE";
  return "80 QE";
}

/** Resolve a single label into a typed DomainResult. */
export function resolveDomain(input: string): DomainResult | null {
  const label = normalize(input);
  if (!label) return null;

  const base = {
    name: `${label}${SUFFIX}`,
    label,
    length: label.length,
  };

  if (RESERVED.has(label)) {
    return { ...base, status: "reserved" };
  }

  if (REGISTERED[label]) {
    return { ...base, status: "registered", ...REGISTERED[label] };
  }

  if (PREMIUM.has(label) || label.length <= 3) {
    return {
      ...base,
      status: "premium",
      price: premiumPriceForLength(label.length),
    };
  }

  return { ...base, status: "available", price: "4 QE / yr" };
}

/**
 * Full search — returns the exact match (first) plus a diverse set of related
 * names spanning every status so the results grid + filters feel alive.
 */
export function searchDomains(input: string): DomainResult[] {
  const label = normalize(input);
  if (!label) return [];

  const candidates = [
    label,
    `${label}hq`,
    `${label}dao`,
    `${label}labs`,
    `my${label}`,
    `${label}x`,
    `the${label}`,
    `${label}wallet`,
    `${label}id`,
    `get${label}`,
    `${label}pay`,
    `${label}app`,
    `${label}network`,
    `${label}vault`,
    `${label}finance`,
  ];

  const seen = new Set<string>();
  const results: DomainResult[] = [];

  for (const c of candidates) {
    if (seen.has(c)) continue;
    seen.add(c);
    const r = resolveDomain(c);
    if (r) results.push(r);
    if (results.length >= 12) break;
  }

  return results;
}

/** Generate AI-style suggestion variations for a label. */
export function getSuggestions(input: string): DomainResult[] {
  const label = normalize(input);
  if (!label) return [];

  const candidates = [
    `${label}hq`,
    `${label}dao`,
    `${label}labs`,
    `my${label}`,
    `${label}x`,
    `the${label}`,
    `${label}wallet`,
    `${label}id`,
  ];

  const seen = new Set([label]);
  const results: DomainResult[] = [];

  for (const c of candidates) {
    if (seen.has(c)) continue;
    seen.add(c);
    const r = resolveDomain(c);
    if (r) results.push(r);
    if (results.length >= 6) break;
  }

  return results;
}

export interface DomainCategory {
  id: string;
  title: string;
  description: string;
  examples: DomainResult[];
}

function build(label: string): DomainResult {
  return resolveDomain(label)!;
}

/** Static category showcase used on the empty/idle state. */
export const DOMAIN_CATEGORIES: DomainCategory[] = [
  {
    id: "2-char",
    title: "2 Character",
    description: "Ultra-rare two-character identities",
    examples: [build("id"), build("ai"), build("ok"), build("z9")],
  },
  {
    id: "3-char",
    title: "3 Character",
    description: "Short, premium triples",
    examples: [build("dao"), build("dex"), build("pay"), build("lab")],
  },
  {
    id: "5-char",
    title: "5 Character",
    description: "Balanced, brandable names",
    examples: [build("nexus"), build("orbit"), build("pulse"), build("vertex")],
  },
  {
    id: "premium",
    title: "Premium",
    description: "Curated high-value names",
    examples: [build("web3"), build("vault"), build("alpha"), build("money")],
  },
  {
    id: "reserved",
    title: "Reserved",
    description: "Protected ecosystem names",
    examples: [build("dac"), build("wallet"), build("explorer"), build("root")],
  },
];

/** Trending / popular searches for the idle state. */
export const TRENDING: string[] = [
  "satoshi",
  "alpha",
  "quantum",
  "nexus",
  "builder",
  "vault",
];

/* ──────────────────────────────────────────────────────────────
 * Domain Details
 * ────────────────────────────────────────────────────────────── */

export type ActivityType =
  | "registration"
  | "renewal"
  | "resolver"
  | "profile"
  | "transfer"
  | "listing";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  actor?: string;
}

export interface QEReputation {
  /** 0–1000 reputation score. */
  score: number;
  /** Tier label derived from the score. */
  level: string;
  /** Identity verification status. */
  identityStatus: string;
}

export interface DomainDetails extends DomainResult {
  /** Human label e.g. "3 Character", "Premium", "Reserved" */
  category: string;
  /** How the name is/was registered, e.g. "Standard Registration". */
  registrationType: string;
  /** Resolver contract address (registered only) */
  resolver: string | null;
  /** Whether reverse resolution is configured (registered only) */
  reverseResolution: boolean;
  /** Whether the resolver record is verified (registered only) */
  verified: boolean;
  /** Public profile path */
  profileUrl?: string;
  /** QE reputation summary for the identity. */
  qe: QEReputation;
  activity: ActivityEvent[];
  related: DomainResult[];
}

/** Classify a result into a category label. */
export function categoryOf(result: DomainResult): string {
  if (result.status === "reserved") return "Reserved";
  if (result.length <= 2) return "2 Character";
  if (result.length === 3) return "3 Character";
  if (result.length === 5) return "5 Character";
  if (result.status === "premium") return "Premium";
  return "Standard";
}

function buildActivity(result: DomainResult): ActivityEvent[] {
  switch (result.status) {
    case "registered":
      return [
        {
          id: "reg",
          type: "registration",
          title: "Domain registered",
          description: `${result.name} was registered on DAC Quantum Chain.`,
          date: result.registeredAt ?? "—",
          actor: result.owner,
        },
        {
          id: "resolver",
          type: "resolver",
          title: "Resolver updated",
          description: "Wallet and profile records were set.",
          date: result.registeredAt ?? "—",
          actor: result.owner,
        },
        {
          id: "renewal",
          type: "renewal",
          title: "Registration renewed",
          description: "Ownership extended for an additional term.",
          date: result.expiresAt ? "1 year ago" : "—",
          actor: result.owner,
        },
        {
          id: "reverse",
          type: "resolver",
          title: "Reverse resolution enabled",
          description: "Primary name set for the owning wallet.",
          date: "8 months ago",
          actor: result.owner,
        },
        {
          id: "profile",
          type: "profile",
          title: "Profile updated",
          description: "Avatar, bio, and social links were updated.",
          date: "3 months ago",
          actor: result.owner,
        },
      ];
    case "premium":
      return [
        {
          id: "listing",
          type: "listing",
          title: "Listed as premium",
          description: "Curated as a premium DAC identity.",
          date: "Listed",
        },
      ];
    case "reserved":
      return [
        {
          id: "reserved",
          type: "listing",
          title: "Reserved by DAC",
          description: "Protected for the DAC ecosystem and partners.",
          date: "Protected",
        },
      ];
    default:
      return [
        {
          id: "available",
          type: "listing",
          title: "Available to register",
          description: "This name has never been registered.",
          date: "Now",
        },
      ];
  }
}

/** Deterministic 32-bit hash for a label (djb2). */
function hashLabel(label: string): number {
  return Array.from(label).reduce(
    (acc, ch) => (acc * 33 + ch.charCodeAt(0)) >>> 0,
    5381
  );
}

/** Deterministic resolver address from a label. */
function resolverFor(label: string): string {
  const hex = hashLabel(label).toString(16).padStart(8, "0");
  return `0xRes0${hex}…Dac`;
}

/** How a name is/was registered. */
function registrationTypeOf(result: DomainResult): string {
  switch (result.status) {
    case "reserved":
      return "Protocol Reserved";
    case "premium":
      return "Premium Auction";
    case "available":
      return "Open Registration";
    default:
      return result.length <= 3 || result.length === 5
        ? "Premium Registration"
        : "Standard Registration";
  }
}

/** Map a 0–1000 score to a reputation tier. */
function reputationLevel(score: number): string {
  if (score >= 800) return "Quantum Elite";
  if (score >= 600) return "Quantum Builder";
  if (score >= 300) return "Contributor";
  return "Explorer";
}

/** QE reputation summary, deterministic per identity. */
function qeReputationOf(result: DomainResult): QEReputation {
  if (result.status === "registered") {
    const score = 480 + (hashLabel(result.label) % 481); // 480–960
    return {
      score,
      level: reputationLevel(score),
      identityStatus: "Verified Identity",
    };
  }
  if (result.status === "premium") {
    return { score: 0, level: "Unclaimed", identityStatus: "Premium Identity" };
  }
  if (result.status === "reserved") {
    return { score: 0, level: "Protocol", identityStatus: "Reserved Identity" };
  }
  return { score: 0, level: "Unclaimed", identityStatus: "No Identity Yet" };
}

/** Full details for a domain (server-safe, pure). */
export function getDomainDetails(input: string): DomainDetails | null {
  const result = resolveDomain(input);
  if (!result) return null;

  const isRegistered = result.status === "registered";

  return {
    ...result,
    category: categoryOf(result),
    registrationType: registrationTypeOf(result),
    resolver: isRegistered ? resolverFor(result.label) : null,
    reverseResolution: isRegistered,
    verified: isRegistered,
    profileUrl: isRegistered ? `dac.id/${result.label}` : undefined,
    qe: qeReputationOf(result),
    activity: buildActivity(result),
    related: getSuggestions(result.label),
  };
}
