"use client";

import * as React from "react";

const KEY = "dacns:search-history";
const MAX = 8;

/** Persistent recent-search history (localStorage, client-only). */
export function useSearchHistory() {
  const [history, setHistory] = React.useState<string[]>([]);

  // Hydrate after mount to stay SSR-safe.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = React.useCallback((next: string[]) => {
    setHistory(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const add = React.useCallback(
    (term: string) => {
      const t = term.trim().toLowerCase();
      if (!t) return;
      persist([t, ...history.filter((h) => h !== t)].slice(0, MAX));
    },
    [history, persist]
  );

  const remove = React.useCallback(
    (term: string) => {
      persist(history.filter((h) => h !== term));
    },
    [history, persist]
  );

  const clear = React.useCallback(() => persist([]), [persist]);

  return { history, add, remove, clear };
}
