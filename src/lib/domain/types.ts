/**
 * Shared domain types for the DACNS domain layer.
 *
 * These are currently re-exported from the mock data module, which is the
 * temporary source of truth. When the database integration lands, the canonical
 * definitions move here and `components/search/mock-data.ts` is removed — the
 * repository/service contracts below stay unchanged.
 */
export type {
  DomainStatus,
  DomainResult,
  DomainCategory,
  DomainDetails,
  ActivityType,
  ActivityEvent,
  QEReputation,
} from "@/components/search/mock-data";
