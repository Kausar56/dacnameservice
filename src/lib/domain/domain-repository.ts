import {
  DOMAIN_CATEGORIES,
  TRENDING,
  getDomainDetails as mockGetDomainDetails,
  getSuggestions as mockGetSuggestions,
  resolveDomain as mockResolveDomain,
  searchDomains as mockSearchDomains,
} from "@/components/search/mock-data";

import type { DomainCategory, DomainDetails, DomainResult } from "./types";

/**
 * DomainRepository — the data-access boundary for .dac names.
 *
 * Every method is async to mirror real database queries, so swapping the mock
 * implementation for a Prisma-backed one requires no changes in `DomainService`
 * or any caller. To go live, implement `PrismaDomainRepository` (against the
 * Prisma client in `@/lib/prisma`) and export it as `domainRepository` below.
 */
export interface DomainRepository {
  /** Resolve a single normalized label into a typed result. */
  findByLabel(label: string): Promise<DomainResult | null>;
  /** Full search — exact match plus related names across statuses. */
  search(label: string): Promise<DomainResult[]>;
  /** Suggestion variations for a label. */
  suggest(label: string): Promise<DomainResult[]>;
  /** Full details (resolver, activity, reputation, related) for a name. */
  getDetails(label: string): Promise<DomainDetails | null>;
  /** Showcase categories for the idle state. */
  listCategories(): Promise<DomainCategory[]>;
  /** Trending labels for the idle state. */
  listTrending(): Promise<string[]>;
}

/**
 * In-memory implementation backed by deterministic mock data.
 *
 * This is the only place that touches the mock data source. Replace with a
 * `PrismaDomainRepository` once the database is provisioned — the mock
 * functions map 1:1 onto future SQL queries (findByLabel → SELECT … WHERE
 * name = $1, search → SELECT … WHERE name ILIKE $1, etc.).
 */
export class MockDomainRepository implements DomainRepository {
  async findByLabel(label: string): Promise<DomainResult | null> {
    return mockResolveDomain(label);
  }

  async search(label: string): Promise<DomainResult[]> {
    return mockSearchDomains(label);
  }

  async suggest(label: string): Promise<DomainResult[]> {
    return mockGetSuggestions(label);
  }

  async getDetails(label: string): Promise<DomainDetails | null> {
    return mockGetDomainDetails(label);
  }

  async listCategories(): Promise<DomainCategory[]> {
    return DOMAIN_CATEGORIES;
  }

  async listTrending(): Promise<string[]> {
    return TRENDING;
  }
}
