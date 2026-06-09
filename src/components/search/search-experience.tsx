"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Search, Sparkles, TrendingUp, X } from "lucide-react";

import { AuroraBackground } from "@/components/effects";
import { Container } from "@/components/ui/container";

import { CategoryExplorer } from "./category-explorer";
import {
  searchDomains,
  TRENDING,
  type DomainResult,
} from "./mock-data";
import { ResultCard } from "./result-card";
import { SearchFilters, type FilterValue } from "./search-filters";
import { SearchInput } from "./search-input";
import { SearchEmpty, SearchLoading } from "./search-states";
import { useSearchHistory } from "./use-search-history";

type Phase = "idle" | "loading" | "results" | "empty";

const RESOLVE_MS = 1000;
const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchExperience() {
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(() => searchParams.get("q") ?? "");
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [results, setResults] = React.useState<DomainResult[]>([]);
  const [filter, setFilter] = React.useState<FilterValue>("all");

  const { history, add, remove, clear } = useSearchHistory();
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync from the URL (?q=) on navigation (e.g. from the homepage hero).
  React.useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Debounced, simulated search on every keystroke (real-time experience).
  React.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setPhase("idle");
      setResults([]);
      setFilter("all");
      return;
    }

    setPhase("loading");
    timerRef.current = setTimeout(() => {
      const found = searchDomains(trimmed);
      if (found.length === 0) {
        setResults([]);
        setPhase("empty");
        return;
      }
      setResults(found);
      setFilter("all");
      setPhase("results");
      add(trimmed);
    }, RESOLVE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, add]);

  const handleSelect = (label: string) => {
    setQuery(label);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Per-status counts for the filter bar.
  const counts = React.useMemo(() => {
    const base: Record<FilterValue, number> = {
      all: results.length,
      available: 0,
      premium: 0,
      registered: 0,
      reserved: 0,
    };
    for (const r of results) base[r.status] += 1;
    return base;
  }, [results]);

  const filtered = React.useMemo(
    () => (filter === "all" ? results : results.filter((r) => r.status === filter)),
    [results, filter]
  );

  return (
    <div className="relative min-h-screen">
      {/* Search header */}
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-12">
        <AuroraBackground />
        <Container size="lg" className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full glass-subtle px-3.5 py-1.5">
                <Sparkles className="size-3.5 text-dac-cyan" />
                <span className="text-[0.8125rem] font-medium text-foreground/80">
                  Find your DAC identity
                </span>
              </span>
              <h1 className="text-h1 text-balance text-foreground">
                Search <span className="text-gradient">.dac</span> domains
              </h1>
              <p className="text-body-lg mx-auto mt-4 max-w-xl text-balance">
                Discover available names, check ownership, and claim your
                identity on DAC Quantum Chain.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mt-8"
            >
              <SearchInput
                value={query}
                onChange={setQuery}
                loading={phase === "loading"}
              />

              {/* Idle helpers: history + trending */}
              {phase === "idle" && (
                <div className="mt-5 space-y-3">
                  {history.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-caption">
                        <Clock className="size-3.5" />
                        Recent:
                      </span>
                      {history.map((name) => (
                        <span
                          key={name}
                          className="group inline-flex items-center gap-1 rounded-full glass-subtle py-1 pl-3 pr-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-dac-cyan"
                        >
                          <button
                            type="button"
                            onClick={() => handleSelect(name)}
                          >
                            {name}.dac
                          </button>
                          <button
                            type="button"
                            aria-label={`Remove ${name}`}
                            onClick={() => remove(name)}
                            className="flex size-4 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground"
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={clear}
                        className="text-caption underline-offset-2 transition-colors hover:text-foreground hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-caption">
                      <TrendingUp className="size-3.5" />
                      Trending:
                    </span>
                    {TRENDING.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleSelect(name)}
                        className="rounded-full glass-subtle px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-dac-cyan"
                      >
                        {name}.dac
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Results area */}
      <Container size="lg" className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pb-24"
            >
              <SearchLoading />
            </motion.div>
          )}

          {phase === "empty" && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pb-24"
            >
              <SearchEmpty onClear={() => setQuery("")} />
            </motion.div>
          )}

          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pb-24"
            >
              {/* Results header + filters */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Search className="size-4 text-dac-cyan" />
                  <h2 className="text-h4 text-foreground">
                    {filtered.length} result{filtered.length === 1 ? "" : "s"}
                    <span className="text-muted-foreground">
                      {" "}
                      for{" "}
                    </span>
                    <span className="font-mono text-dac-cyan">
                      {query.trim().toLowerCase()}.dac
                    </span>
                  </h2>
                </div>
                <SearchFilters
                  active={filter}
                  onChange={setFilter}
                  counts={counts}
                />
              </div>

              {/* Grid */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((r, i) => (
                    <motion.div
                      key={r.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35, ease: EASE }}
                    >
                      <ResultCard
                        result={r}
                        highlight={filter === "all" && i === 0}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl glass px-6 py-14 text-center">
                  <p className="text-body-sm">
                    No{" "}
                    <span className="text-foreground">{filter}</span> names in
                    these results. Try another filter.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CategoryExplorer />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
