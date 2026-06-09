/**
 * Mock documentation content for the DACNS Documentation Center.
 * Pure content — no backend. Articles are switched client-side.
 */

import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Globe2,
  HelpCircle,
  Rocket,
  Sparkles,
  UserCircle,
} from "lucide-react";

export type DocBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; lang: string; code: string }
  | { type: "callout"; tone: "info" | "warn" | "success"; text: string };

export interface DocArticle {
  id: string;
  title: string;
  /** Group id this article belongs to. */
  group: string;
  summary: string;
  readingTime: string;
  blocks: DocBlock[];
}

export interface DocGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  items: string[];
}

export const GROUPS: DocGroup[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Rocket,
    items: ["what-is-dacns", "why-dacns"],
  },
  {
    id: "domains",
    label: "Domains",
    icon: Globe2,
    items: [
      "search-domain",
      "register-domain",
      "renew-domain",
      "domain-categories",
    ],
  },
  {
    id: "profiles",
    label: "Profiles",
    icon: UserCircle,
    items: ["resolver-settings", "profile-settings"],
  },
  {
    id: "qe-rewards",
    label: "QE Rewards",
    icon: Sparkles,
    items: ["how-qe-works", "reward-system"],
  },
  {
    id: "developers",
    label: "Developers",
    icon: Code2,
    items: ["smart-contracts", "apis", "integration-guide"],
  },
  {
    id: "faq",
    label: "FAQ",
    icon: HelpCircle,
    items: ["faq"],
  },
];

export const ARTICLES: Record<string, DocArticle> = {
  "what-is-dacns": {
    id: "what-is-dacns",
    title: "What is DACNS",
    group: "getting-started",
    summary:
      "DACNS is the identity layer of DAC Quantum Chain — human-readable .dac names mapped to wallets, profiles, and on-chain reputation.",
    readingTime: "3 min read",
    blocks: [
      {
        type: "paragraph",
        text: "DACNS (DAC Name Service) is the official naming and identity layer for the DAC Quantum Chain ecosystem. It turns long, error-prone wallet addresses into memorable, human-readable names like satoshi.dac.",
      },
      { type: "heading", id: "overview", text: "Overview" },
      {
        type: "paragraph",
        text: "Every .dac name is a portable on-chain identity. It can resolve to a wallet address, host a decentralized profile, and accumulate QE reputation across the DAC ecosystem.",
      },
      {
        type: "list",
        items: [
          "Human-readable identities for wallets and contracts",
          "A resolver system mapping names to addresses and records",
          "On-chain reputation through QE points",
          "Native integration with DAC Wallet and DAC Explorer",
        ],
      },
      { type: "heading", id: "how-names-resolve", text: "How names resolve" },
      {
        type: "paragraph",
        text: "A lookup walks from the name to its resolver, then reads the requested record. Reverse resolution maps an address back to its primary name.",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { resolve } from "@dacns/sdk";

// forward resolution: name -> address
const address = await resolve("satoshi.dac");

// reverse resolution: address -> primary name
const name = await resolve.reverse("0x9F2c...A41d");`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Names are case-insensitive and always normalized to lowercase before resolution.",
      },
    ],
  },
  "why-dacns": {
    id: "why-dacns",
    title: "Why DACNS",
    group: "getting-started",
    summary:
      "Why a naming layer matters: usability, ownership, reputation, and a unified identity across the DAC ecosystem.",
    readingTime: "2 min read",
    blocks: [
      {
        type: "paragraph",
        text: "Raw addresses are hostile to humans. DACNS replaces them with names you actually remember, while keeping ownership fully in your wallet.",
      },
      { type: "heading", id: "benefits", text: "Key benefits" },
      {
        type: "list",
        items: [
          "Usability — share gm.dac instead of a 42-character address",
          "Ownership — names are assets you control, renew, and transfer",
          "Reputation — build a verifiable QE score tied to your identity",
          "Interoperability — one identity across DAC apps and tooling",
        ],
      },
      { type: "heading", id: "who-its-for", text: "Who it's for" },
      {
        type: "paragraph",
        text: "Builders, communities, and everyday users who want a single, trusted identity on DAC Quantum Chain.",
      },
      {
        type: "callout",
        tone: "success",
        text: "You keep custody at all times — DACNS never holds your funds or keys.",
      },
    ],
  },
  "search-domain": {
    id: "search-domain",
    title: "Search Domain",
    group: "domains",
    summary:
      "Find available .dac names, check status, and explore suggestions and categories.",
    readingTime: "2 min read",
    blocks: [
      {
        type: "paragraph",
        text: "The search page lets you check any name instantly. Type a name and DACNS resolves its live status: available, premium, reserved, or registered.",
      },
      { type: "heading", id: "statuses", text: "Understanding statuses" },
      {
        type: "list",
        items: [
          "Available — open for registration right now",
          "Premium — short or high-demand names with premium pricing",
          "Reserved — protected by the DAC ecosystem, not registrable",
          "Registered — already owned; view its public details",
        ],
      },
      { type: "heading", id: "tips", text: "Search tips" },
      {
        type: "paragraph",
        text: "Use filters to narrow results, and browse category explorers for 2, 3, and 5-character names. You can open any result card to view full domain details.",
      },
      {
        type: "code",
        lang: "bash",
        code: `# programmatic lookup
curl https://api.dacns.dev/v1/resolve/satoshi.dac`,
      },
    ],
  },
  "register-domain": {
    id: "register-domain",
    title: "Register Domain",
    group: "domains",
    summary:
      "Register an available .dac name: choose a period, review pricing, connect a wallet, and confirm.",
    readingTime: "3 min read",
    blocks: [
      {
        type: "paragraph",
        text: "Registration is a guided checkout. Pick how many years you want, review the full cost breakdown, connect your wallet, and confirm the transaction.",
      },
      { type: "heading", id: "steps", text: "Registration steps" },
      {
        type: "list",
        ordered: true,
        items: [
          "Select an available name from search",
          "Choose a registration period (1, 2, 3, or 5 years)",
          "Review the pricing breakdown and estimated gas",
          "Connect your wallet and confirm the registration",
        ],
      },
      { type: "heading", id: "pricing", text: "Pricing" },
      {
        type: "paragraph",
        text: "Total cost is the registration fee (annual × years) plus a small protocol network fee and estimated gas. Premium names add a one-time premium fee.",
      },
      {
        type: "code",
        lang: "ts",
        code: `const total =
  annualFee * years + // registration
  networkFee +        // protocol fee
  estimatedGas +      // chain gas
  premiumFee;         // 0 for standard names`,
      },
      {
        type: "callout",
        tone: "warn",
        text: "Registrations are on-chain and final. Double-check the name spelling before confirming.",
      },
    ],
  },
  "renew-domain": {
    id: "renew-domain",
    title: "Renew Domain",
    group: "domains",
    summary:
      "Extend ownership before expiry. Choose a renewal period and confirm a new expiry date.",
    readingTime: "2 min read",
    blocks: [
      {
        type: "paragraph",
        text: "Renewing extends your name's expiry date. You can renew at any time — the new period is added on top of your current expiry.",
      },
      { type: "heading", id: "windows", text: "Renewal windows" },
      {
        type: "list",
        items: [
          "Active — plenty of time left; renew early for peace of mind",
          "Expiring soon — within 30 days; renew to avoid interruption",
          "Grace period — recently expired; renew now to keep ownership",
        ],
      },
      { type: "heading", id: "reminders", text: "Reminders" },
      {
        type: "paragraph",
        text: "The dashboard surfaces renewal reminders, expiration warnings, and an Expiring Soon list with one-click renewal for names due within 30, 14, or 7 days.",
      },
      {
        type: "callout",
        tone: "info",
        text: "If a name fully expires past its grace period, it may return to the open market.",
      },
    ],
  },
  "domain-categories": {
    id: "domain-categories",
    title: "Domain Categories",
    group: "domains",
    summary:
      "How names are classified: character length, premium, and reserved tiers.",
    readingTime: "2 min read",
    blocks: [
      {
        type: "paragraph",
        text: "DACNS organizes names into categories that affect availability and pricing.",
      },
      { type: "heading", id: "tiers", text: "Category tiers" },
      {
        type: "list",
        items: [
          "2 Character — ultra-rare, premium pricing",
          "3 Character — short and high-demand",
          "5 Character — popular, balanced pricing",
          "Premium — curated high-value names",
          "Reserved — protected by the DAC ecosystem",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Shorter names are scarcer and therefore carry premium pricing.",
      },
    ],
  },
  "resolver-settings": {
    id: "resolver-settings",
    title: "Resolver Settings",
    group: "profiles",
    summary:
      "Point your name at an address, manage records, and enable reverse resolution.",
    readingTime: "3 min read",
    blocks: [
      {
        type: "paragraph",
        text: "The resolver maps your name to data. The most common record is the address your name resolves to, but resolvers can hold many record types.",
      },
      { type: "heading", id: "records", text: "Record types" },
      {
        type: "list",
        items: [
          "Address — the wallet your name resolves to",
          "Reverse — sets this name as your address's primary name",
          "Text records — avatar, url, and social handles",
        ],
      },
      { type: "heading", id: "reverse", text: "Reverse resolution" },
      {
        type: "paragraph",
        text: "Enable reverse resolution so apps can display your name instead of your address. Each address can have one primary name.",
      },
      {
        type: "code",
        lang: "ts",
        code: `await dacns.setRecords("satoshi.dac", {
  address: "0x9F2c...A41d",
  avatar: "ipfs://...",
  url: "https://satoshi.dev",
});`,
      },
    ],
  },
  "profile-settings": {
    id: "profile-settings",
    title: "Profile Settings",
    group: "profiles",
    summary:
      "Build your decentralized profile: avatar, bio, and verified social links.",
    readingTime: "2 min read",
    blocks: [
      {
        type: "paragraph",
        text: "Your profile is the public face of your identity. It's stored as resolver text records and rendered across DAC apps.",
      },
      { type: "heading", id: "fields", text: "Profile fields" },
      {
        type: "list",
        items: [
          "Avatar — image displayed next to your name",
          "Bio — a short description of who you are",
          "Social links — X, GitHub, website, and Discord",
        ],
      },
      {
        type: "callout",
        tone: "success",
        text: "Profiles are optional and fully under your control — update or clear them anytime.",
      },
    ],
  },
  "how-qe-works": {
    id: "how-qe-works",
    title: "How QE Works",
    group: "qe-rewards",
    summary:
      "QE points are the reputation primitive of DACNS — earned through real ecosystem activity.",
    readingTime: "2 min read",
    blocks: [
      {
        type: "paragraph",
        text: "QE (Quantum Engagement) points form an on-chain reputation score tied to your identity. They reflect genuine participation in the DAC ecosystem.",
      },
      { type: "heading", id: "earning", text: "Earning QE" },
      {
        type: "list",
        items: [
          "Registering and renewing names",
          "Completing your profile and resolver records",
          "Long-term ownership and ecosystem activity",
        ],
      },
      { type: "heading", id: "levels", text: "Reputation levels" },
      {
        type: "paragraph",
        text: "Accumulated QE maps to reputation levels that signal trust and seniority within the ecosystem.",
      },
    ],
  },
  "reward-system": {
    id: "reward-system",
    title: "Reward System",
    group: "qe-rewards",
    summary:
      "How QE translates into rewards, perks, and standing across DAC apps.",
    readingTime: "2 min read",
    blocks: [
      {
        type: "paragraph",
        text: "The reward system recognizes consistent, authentic engagement. Higher QE unlocks recognition and perks across participating DAC applications.",
      },
      { type: "heading", id: "perks", text: "Example perks" },
      {
        type: "list",
        items: [
          "Verified identity badges",
          "Priority access to new features and drops",
          "Higher standing in community and governance contexts",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        text: "QE is designed to resist gaming — rewards favor sustained, real activity over bursts.",
      },
    ],
  },
  "smart-contracts": {
    id: "smart-contracts",
    title: "Smart Contracts",
    group: "developers",
    summary:
      "Core DACNS contracts: the registry, resolvers, and registrar.",
    readingTime: "3 min read",
    blocks: [
      {
        type: "paragraph",
        text: "DACNS is a set of contracts on DAC Quantum Chain. The registry stores ownership, resolvers store records, and the registrar handles registration and renewal.",
      },
      { type: "heading", id: "architecture", text: "Architecture" },
      {
        type: "list",
        items: [
          "Registry — source of truth for name ownership",
          "Resolver — maps names to addresses and records",
          "Registrar — manages registration, renewal, and pricing",
        ],
      },
      { type: "heading", id: "interface", text: "Registry interface" },
      {
        type: "code",
        lang: "solidity",
        code: `interface IDACRegistry {
  function owner(bytes32 node) external view returns (address);
  function resolver(bytes32 node) external view returns (address);
  function setResolver(bytes32 node, address resolver) external;
}`,
      },
      {
        type: "callout",
        tone: "warn",
        text: "Addresses below are illustrative. Always use the published addresses for your target network.",
      },
    ],
  },
  apis: {
    id: "apis",
    title: "APIs",
    group: "developers",
    summary:
      "The DACNS REST API for resolution, profiles, and domain metadata.",
    readingTime: "3 min read",
    blocks: [
      {
        type: "paragraph",
        text: "The HTTP API offers a fast, cached read layer over the contracts — ideal for frontends that need resolution without an RPC round-trip.",
      },
      { type: "heading", id: "resolve", text: "Resolve a name" },
      {
        type: "code",
        lang: "bash",
        code: `GET /v1/resolve/:name

curl https://api.dacns.dev/v1/resolve/satoshi.dac`,
      },
      { type: "heading", id: "response", text: "Response" },
      {
        type: "code",
        lang: "json",
        code: `{
  "name": "satoshi.dac",
  "address": "0x9F2c4A7b...A41d",
  "resolver": "0x21Ad...90Fe",
  "records": { "avatar": "ipfs://...", "url": "https://satoshi.dev" }
}`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Responses are cached at the edge. Use the contracts directly when you need real-time guarantees.",
      },
    ],
  },
  "integration-guide": {
    id: "integration-guide",
    title: "Integration Guide",
    group: "developers",
    summary:
      "Add .dac resolution to your app in minutes with the DACNS SDK.",
    readingTime: "4 min read",
    blocks: [
      {
        type: "paragraph",
        text: "This guide walks through adding name resolution to a web app using the DACNS SDK.",
      },
      { type: "heading", id: "install", text: "Install" },
      {
        type: "code",
        lang: "bash",
        code: `npm install @dacns/sdk`,
      },
      { type: "heading", id: "usage", text: "Resolve and display" },
      {
        type: "code",
        lang: "tsx",
        code: `import { resolve } from "@dacns/sdk";

export async function NameTag({ address }: { address: string }) {
  const name = await resolve.reverse(address);
  return <span>{name ?? address}</span>;
}`,
      },
      { type: "heading", id: "next-steps", text: "Next steps" },
      {
        type: "list",
        items: [
          "Cache resolutions for snappy UIs",
          "Render avatars from resolver text records",
          "Fall back to the raw address when no name is set",
        ],
      },
      {
        type: "callout",
        tone: "success",
        text: "That's it — your app now speaks .dac.",
      },
    ],
  },
  faq: {
    id: "faq",
    title: "FAQ",
    group: "faq",
    summary: "Answers to the most common questions about DACNS.",
    readingTime: "3 min read",
    blocks: [
      { type: "heading", id: "ownership", text: "Do I really own my name?" },
      {
        type: "paragraph",
        text: "Yes. Names are on-chain assets held by your wallet. DACNS can't take, freeze, or transfer them on your behalf.",
      },
      { type: "heading", id: "expiry", text: "What happens when a name expires?" },
      {
        type: "paragraph",
        text: "There's a grace period during which only you can renew. After that, the name may return to the open market.",
      },
      { type: "heading", id: "transfer", text: "Can I transfer a name?" },
      {
        type: "paragraph",
        text: "Yes. Because names are assets in your wallet, you can transfer ownership to another address at any time.",
      },
      { type: "heading", id: "cost", text: "How much does a name cost?" },
      {
        type: "paragraph",
        text: "Standard names use a flat annual fee. Premium and short names carry additional pricing based on scarcity.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Still stuck? Reach out in the DAC community Discord for help.",
      },
    ],
  },
};

/** Flat ordering of all article ids (for prev/next navigation). */
export const ARTICLE_ORDER: string[] = GROUPS.flatMap((g) => g.items);

/** Resolve an article id to its group label. */
export function groupLabelOf(article: DocArticle): string {
  return GROUPS.find((g) => g.id === article.group)?.label ?? "";
}

/** Headings of an article, used to build the table of contents. */
export function tocOf(article: DocArticle): { id: string; text: string }[] {
  return article.blocks
    .filter((b): b is Extract<DocBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: b.id, text: b.text }));
}

export interface DocSearchHit {
  article: DocArticle;
  group: string;
  snippet: string;
}

/** Lightweight client-side search across titles, summaries, and body text. */
export function searchDocs(query: string): DocSearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: DocSearchHit[] = [];
  for (const id of ARTICLE_ORDER) {
    const article = ARTICLES[id];
    const bodyText = article.blocks
      .map((b) => {
        if (b.type === "paragraph" || b.type === "callout") return b.text;
        if (b.type === "heading") return b.text;
        if (b.type === "list") return b.items.join(" ");
        if (b.type === "code") return b.code;
        return "";
      })
      .join(" ");

    const haystack = `${article.title} ${article.summary} ${bodyText}`.toLowerCase();
    if (!haystack.includes(q)) continue;

    // Build a short snippet around the first match.
    const source = `${article.summary} ${bodyText}`;
    const idx = source.toLowerCase().indexOf(q);
    const start = Math.max(0, idx - 40);
    const snippet =
      (start > 0 ? "…" : "") +
      source.slice(start, start + 110).trim() +
      "…";

    hits.push({
      article,
      group: groupLabelOf(article),
      snippet,
    });
  }
  return hits;
}
