"use client";

import * as React from "react";
import { Loader2, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  loading?: boolean;
}

/** Large premium search field with .dac suffix + clear + submit. */
export function SearchInput({
  value,
  onChange,
  onSubmit,
  loading,
}: SearchInputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={cn(
        "conic-border glass flex items-center gap-2 rounded-2xl p-2 pl-4 transition-shadow sm:gap-3 sm:p-2.5 sm:pl-5",
        focused && "shadow-glow"
      )}
    >
      <span className="shrink-0 text-dac-cyan">
        {loading ? (
          <Loader2 className="size-5 animate-spin sm:size-6" />
        ) : (
          <Search className="size-5 sm:size-6" />
        )}
      </span>

      <div className="flex flex-1 items-baseline">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search for a name"
          aria-label="Search for a .dac domain"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="h-11 w-full min-w-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:h-12 sm:text-lg"
        />
        {value && (
          <span className="shrink-0 font-mono text-base text-dac-cyan sm:text-lg">
            .dac
          </span>
        )}
      </div>

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="shrink-0 rounded-xl px-4 sm:px-6"
      >
        <Search className="size-4 sm:hidden" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
