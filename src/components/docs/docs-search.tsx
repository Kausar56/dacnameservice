"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, FileText, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { searchDocs } from "./docs-data";

export function DocsSearch({
  onSelect,
  autoFocus = false,
}: {
  onSelect: (id: string) => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [highlight, setHighlight] = React.useState(0);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => searchDocs(query).slice(0, 6), [query]);

  React.useEffect(() => setHighlight(0), [query]);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (id: string) => {
    onSelect(id);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[highlight].article.id);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search documentation…"
          aria-label="Search documentation"
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-12 pr-12 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-dac-cyan/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-dac-cyan/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-dac-bg-secondary/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {results.length === 0 ? (
              <p className="px-3 py-6 text-center text-body-sm">
                No results for{" "}
                <span className="text-foreground">“{query}”</span>
              </p>
            ) : (
              <ul className="space-y-0.5">
                {results.map((hit, i) => (
                  <li key={hit.article.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => choose(hit.article.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        i === highlight ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-dac-cyan">
                        <FileText className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-medium text-foreground">
                            {hit.article.title}
                          </span>
                          <span className="shrink-0 text-[0.6875rem] text-muted-foreground">
                            {hit.group}
                          </span>
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">
                          {hit.snippet}
                        </span>
                      </span>
                      {i === highlight && (
                        <CornerDownLeft className="mt-1.5 size-3.5 shrink-0 text-muted-foreground" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
