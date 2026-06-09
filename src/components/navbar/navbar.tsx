"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConnectButton } from "@/components/wallet";
import { cn } from "@/lib/utils";

import { defaultSearchPlaceholder, navLinks } from "./nav-config";
import { NavbarLogo } from "./navbar-logo";

const SCROLL_THRESHOLD = 16;

export interface NavbarProps {
  className?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export function Navbar({
  className,
  searchPlaceholder = defaultSearchPlaceholder,
  onSearch,
}: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,box-shadow,border-color] duration-300",
          scrolled
            ? "glass border-b border-white/10 shadow-glass"
            : "bg-transparent border-b border-transparent",
          className
        )}
      >
        <nav
          className={cn(
            "mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 transition-[height] duration-300",
            scrolled ? "h-14" : "h-16"
          )}
          aria-label="Main navigation"
        >
          {/* Left — Logo */}
          <NavbarLogo />

          {/* Center — Desktop nav links */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1 glass-subtle rounded-full px-1.5 py-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white/[0.06] hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Desktop wallet */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ConnectButton />
          </div>

          {/* Mobile — Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <ConnectButton />

            <Button
              variant="glass"
              size="icon-sm"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
              aria-hidden
            />

            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col glass border-l border-white/10 shadow-elevated lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 h-16">
                <NavbarLogo onClick={closeMobile} />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={closeMobile}
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="flex flex-1 flex-col gap-6 p-5 overflow-y-auto">
                <form onSubmit={handleSearchSubmit}>
                  <label className="text-label text-muted-foreground mb-2 block">
                    Search
                  </label>
                  <Input
                    variant="glass"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search className="size-4" />}
                    aria-label="Search names"
                  />
                </form>

                <div className="flex flex-col gap-1">
                  <span className="text-overline mb-2">Navigate</span>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * (i + 1) }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        className="flex items-center rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-white/[0.06]"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 p-5">
                <ConnectButton fullWidth />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
