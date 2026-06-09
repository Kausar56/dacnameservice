"use client";

import * as React from "react";
import { List } from "lucide-react";

import { cn } from "@/lib/utils";

export function DocsToc({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const [active, setActive] = React.useState<string>(headings[0]?.id ?? "");

  React.useEffect(() => {
    setActive(headings[0]?.id ?? "");
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-2">
        <List className="size-3.5 text-muted-foreground" />
        <span className="text-label text-muted-foreground">On this page</span>
      </div>
      <ul className="space-y-0.5 border-l border-white/[0.08]">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => scrollTo(h.id)}
                className={cn(
                  "-ml-px block border-l-2 py-1 pl-3 text-left text-sm transition-colors focus-visible:outline-none",
                  isActive
                    ? "border-dac-cyan font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {h.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
