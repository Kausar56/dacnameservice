import {
  MockDomainRepository,
  type DomainRepository,
} from "./domain-repository";
import type { DomainCategory, DomainDetails, DomainResult } from "./types";

/** Strip the `.dac` suffix + invalid characters and lowercase the input. */
export function normalizeLabel(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\.dac$/i, "")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * DomainService — orchestration layer for the domain search flow:
 *
 *   Search Domain → DomainService.search() → DomainRepository (DB query) → Result
 *
 * It owns input normalization/validation and delegates all data access to a
 * `DomainRepository`. Components and pages depend on this service only — never
 * on the repository or the mock data source directly — so the storage backend
 * can change without touching the UI.
 */
export class DomainService {
  constructor(private readonly repo: DomainRepository) {}

  /** Search flow entry point. Returns [] for empty/invalid input. */
  async search(query: string): Promise<DomainResult[]> {
    const label = normalizeLabel(query);
    if (!label) return [];
    return this.repo.search(label);
  }

  /** Resolve a single name to its current status. */
  async resolve(query: string): Promise<DomainResult | null> {
    const label = normalizeLabel(query);
    if (!label) return null;
    return this.repo.findByLabel(label);
  }

  /** Full details for a domain page. */
  async getDetails(name: string): Promise<DomainDetails | null> {
    const label = normalizeLabel(name);
    if (!label) return null;
    return this.repo.getDetails(label);
  }

  /** Suggestion variations for a label. */
  async getSuggestions(query: string): Promise<DomainResult[]> {
    const label = normalizeLabel(query);
    if (!label) return [];
    return this.repo.suggest(label);
  }

  /** Showcase categories for the idle state. */
  getCategories(): Promise<DomainCategory[]> {
    return this.repo.listCategories();
  }

  /** Trending labels for the idle state. */
  getTrending(): Promise<string[]> {
    return this.repo.listTrending();
  }
}

/**
 * Default singleton wired to the mock repository.
 * Swap `new MockDomainRepository()` for `new PrismaDomainRepository()` to go
 * live — no caller changes required.
 */
export const domainService = new DomainService(new MockDomainRepository());
