"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Loader2, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type Availability = "available" | "premium" | "reserved";

interface Suggestion {
  name: string;
  status: Availability;
  price?: string;
}

const STATUS_META: Record<
  Availability,
  { label: string; badge: "success" | "gradient" | "warning"; dot: string }
> = {
  available: { label: "Available", badge: "success", dot: "bg-dac-green" },
  premium: { label: "Premium", badge: "gradient", dot: "bg-dac-premium" },
  reserved: { label: "Reserved", badge: "warning", dot: "bg-warning" },
};

/** Deterministic mock resolver so the UI feels live without a backend. */
function resolveSuggestions(query: string): Suggestion[] {
  const root = query.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!root) return [];

  const base: Suggestion[] = [
    { name: `${root}.dac`, status: "available", price: "4 QE / yr" },
  ];

  if (root.length <= 3) {
    base[0] = { name: `${root}.dac`, status: "premium", price: "120 QE" };
  }
  if (["dac", "admin", "root", "wallet", "explorer"].includes(root)) {
    base[0] = { name: `${root}.dac`, status: "reserved" };
  }

  base.push(
    { name: `${root}quantum.dac`, status: "available", price: "4 QE / yr" },
    { name: `the${root}.dac`, status: "available", price: "4 QE / yr" },
    { name: `${root}.dac`.replace(".dac", "x.dac"), status: "premium", price: "60 QE" }
  );

  return base.slice(0, 4);
}

const PLACEHOLDERS = ["satoshi", "builder", "gm", "alpha"];

export function DomainSearch({ className }: { className?: string }) {
  const router = useRouter();
  const { toast } = useToast();

  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [placeholderIdx, setPlaceholderIdx] = React.useState(0);

  // Rotating placeholder when empty
  React.useEffect(() => {
    if (query) return;
    const t = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length),
      2500
    );
    return () => clearInterval(t);
  }, [query]);

  // Simulated resolve latency
  React.useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [query]);

  const suggestions = React.useMemo(
    () => (query.trim() ? resolveSuggestions(query) : []),
    [query]
  );

  const showPanel = focused && query.trim().length > 0;

  /** Validate + navigate to the search results page. */
  const runSearch = React.useCallback(
    (raw: string) => {
      const trimmed = raw.trim();

      // 1. Empty
      if (!trimmed) {
        setError("Please enter a domain name");
        toast({
          variant: "error",
          title: "Please enter a domain name",
          description: "Type a name to search the DAC registry.",
        });
        return;
      }

      const lower = trimmed.toLowerCase().replace(/\.dac$/i, "");
      const label = lower.replace(/[^a-z0-9-]/g, "");

      // 2. Invalid characters
      if (label !== lower) {
        toast({
          variant: "warning",
          title: "Invalid characters removed",
          description: "Names can only use letters, numbers, and hyphens.",
        });
      }

      // 3. Too short
      if (label.length < 2) {
        setError("Name must be at least 2 characters");
        toast({
          variant: "warning",
          title: "Name too short",
          description: "Enter at least 2 characters to search.",
        });
        return;
      }

      // Success → convert to .dac and navigate
      setError(null);
      router.push(`/search?q=${encodeURIComponent(`${label}.dac`)}`);
    },
    [router, toast]
  );

  const handleChange = (value: string) => {
    setQuery(value);
    if (error) setError(null);
  };

  return (
    <div className={cn("relative w-full max-w-xl", className)}>
      {/* Search field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query);
        }}
        className={cn(
          "conic-border glass flex items-center gap-2 rounded-2xl p-2 pl-4 transition-shadow",
          focused && "shadow-glow",
          error && "ring-1 ring-destructive/50"
        )}
      >
        <Search className="size-5 shrink-0 text-dac-cyan" />
        <input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={`${PLACEHOLDERS[placeholderIdx]}.dac`}
          aria-label="Search for a .dac name"
          aria-invalid={Boolean(error)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="h-10 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <Button type="submit" variant="gradient" size="lg" className="shrink-0 rounded-xl">
          <span className="hidden sm:inline">Search</span>
          <ArrowRight className="size-4" />
        </Button>
      </form>

      {/* Inline validation message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 flex items-center gap-1.5 px-1 text-sm text-destructive"
            role="alert"
          >
            <AlertCircle className="size-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Live suggestions panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-2xl glass shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <span className="text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                {loading ? "Resolving…" : "Suggestions"}
              </span>
              {loading && (
                <Loader2 className="size-3.5 animate-spin text-dac-cyan" />
              )}
            </div>

            <ul className="p-1.5">
              {suggestions.map((s, i) => {
                const meta = STATUS_META[s.status];
                return (
                  <li key={`${s.name}-${i}`}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => runSearch(s.name)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "size-2 rounded-full",
                            meta.dot,
                            s.status !== "reserved" && "animate-pulse-node"
                          )}
                        />
                        <span className="font-mono text-sm text-foreground">
                          {s.name}
                        </span>
                      </span>
                      <span className="flex items-center gap-3">
                        {s.price && (
                          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                            {s.price}
                          </span>
                        )}
                        <Badge variant={meta.badge} size="sm">
                          {meta.label}
                        </Badge>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
