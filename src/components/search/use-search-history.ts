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

  const writeStorage = React.useCallback((next: string[]) => {
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
      setHistory((prev) => {
        const next = [t, ...prev.filter((h) => h !== t)].slice(0, MAX);
        writeStorage(next);
        return next;
      });
    },
    [writeStorage]
  );

  const remove = React.useCallback(
    (term: string) => {
      setHistory((prev) => {
        const next = prev.filter((h) => h !== term);
        writeStorage(next);
        return next;
      });
    },
    [writeStorage]
  );

  const clear = React.useCallback(() => {
    setHistory([]);
    writeStorage([]);
  }, [writeStorage]);

  return { history, add, remove, clear };
}
