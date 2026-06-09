"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Menu, Sparkles, X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";
import { Footer } from "@/components/home";

import { DocsContent } from "./docs-content";
import { DocsSearch } from "./docs-search";
import { DocsSidebar } from "./docs-sidebar";
import { DocsToc } from "./docs-toc";
import { ARTICLES, tocOf } from "./docs-data";

const DEFAULT_ARTICLE = "what-is-dacns";
const EASE = [0.16, 1, 0.3, 1] as const;

export function DocsCenter() {
  const [active, setActive] = React.useState<string>(DEFAULT_ARTICLE);
  const [mobileNav, setMobileNav] = React.useState(false);
  const contentTopRef = React.useRef<HTMLDivElement>(null);

  const article = ARTICLES[active];
  const headings = React.useMemo(() => tocOf(article), [article]);

  const select = React.useCallback((id: string) => {
    setActive(id);
    setMobileNav(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <AuroraBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full glass-subtle px-3.5 py-1.5">
              <BookOpen className="size-3.5 text-dac-cyan" />
              <span className="text-[0.8125rem] font-medium text-foreground/80">
                Documentation
              </span>
            </span>
            <h1 className="text-h1 text-balance text-foreground">
              DACNS <span className="text-gradient">Documentation</span>
            </h1>
            <p className="text-body-lg mx-auto mt-4 max-w-xl text-balance">
              Everything you need to use and build with DACNS.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <DocsSearch onSelect={select} />
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile nav toggle */}
      <Container className="relative z-10 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileNav(true)}
          className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-foreground"
        >
          <Menu className="size-4" />
          Browse docs
        </button>
      </Container>

      {/* Layout */}
      <Container className="relative z-10 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_200px]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pr-2">
              <DocsSidebar active={active} onSelect={select} />
            </div>
          </aside>

          {/* Content */}
          <main ref={contentTopRef} className="min-w-0">
            <AnimatePresence mode="wait">
              <DocsContent key={article.id} article={article} onSelect={select} />
            </AnimatePresence>
          </main>

          {/* TOC (desktop xl) */}
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <DocsToc key={article.id} headings={headings} />
            </div>
          </aside>
        </div>
      </Container>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileNav(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute left-0 top-0 h-full w-[78%] max-w-xs overflow-y-auto border-r border-white/10 bg-dac-bg-secondary p-5"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="size-4 text-dac-cyan" />
                  Documentation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileNav(false)}
                  aria-label="Close navigation"
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>
              <DocsSidebar active={active} onSelect={select} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
