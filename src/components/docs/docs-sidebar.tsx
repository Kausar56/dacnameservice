"use client";

import { cn } from "@/lib/utils";

import { ARTICLES, GROUPS } from "./docs-data";

export function DocsSidebar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Documentation" className="space-y-7">
      {GROUPS.map((group) => {
        const Icon = group.icon;
        return (
          <div key={group.id}>
            <div className="mb-2 flex items-center gap-2 px-2">
              <Icon className="size-3.5 text-dac-cyan" />
              <span className="text-label text-muted-foreground">
                {group.label}
              </span>
            </div>
            <ul className="space-y-0.5">
              {group.items.map((id) => {
                const article = ARTICLES[id];
                const isActive = id === active;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onSelect(id)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative flex w-full items-center rounded-lg px-3 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50",
                        isActive
                          ? "bg-dac-cyan/10 font-medium text-foreground"
                          : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-dac-cyan" />
                      )}
                      {article.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
