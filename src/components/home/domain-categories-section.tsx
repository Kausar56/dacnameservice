"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Crown, Hash, Lock, Sparkles, Type } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const categories = [
  {
    icon: Crown,
    name: "Premium Names",
    description: "Short, brandable, high-value identities.",
    example: "dac.dac",
    price: "From 120 QE",
    badge: "Premium",
    badgeVariant: "gradient" as const,
    glow: "group-hover:shadow-glow-premium",
    iconColor: "text-dac-premium",
    featured: true,
  },
  {
    icon: Type,
    name: "2-Character",
    description: "Ultra-rare two-character names.",
    example: "gm.dac",
    price: "Auction",
    badge: "Rare",
    badgeVariant: "default" as const,
    glow: "group-hover:shadow-glow-sm",
    iconColor: "text-dac-cyan",
  },
  {
    icon: Hash,
    name: "3-Character",
    description: "Highly sought-after triples.",
    example: "dao.dac",
    price: "From 60 QE",
    badge: "Limited",
    badgeVariant: "info" as const,
    glow: "group-hover:shadow-glow-quantum",
    iconColor: "text-dac-quantum",
  },
  {
    icon: Lock,
    name: "Reserved",
    description: "Protected ecosystem & partner names.",
    example: "wallet.dac",
    price: "Protected",
    badge: "Reserved",
    badgeVariant: "warning" as const,
    glow: "",
    iconColor: "text-warning",
  },
  {
    icon: Sparkles,
    name: "Free Names",
    description: "Standard names at base registration cost.",
    example: "builder.dac",
    price: "4 QE / yr",
    badge: "Available",
    badgeVariant: "success" as const,
    glow: "group-hover:shadow-glow-green",
    iconColor: "text-dac-green",
  },
];

export function DomainCategoriesSection() {
  return (
    <Section spacing="lg" id="categories" className="relative">
      <Container>
        <SectionHeader
          overline="Domain Categories"
          title="Find your perfect"
          titleAccent=".dac identity"
          description="Every tier — from ultra-rare single characters to free standard names — built for the DAC ecosystem."
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl glass p-6 text-left transition-colors hover:border-white/15",
                cat.featured && "sm:col-span-2 lg:col-span-1 lg:row-span-2"
              )}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl bg-white/[0.04] transition-shadow",
                    cat.iconColor,
                    cat.glow
                  )}
                >
                  <cat.icon className="size-5" />
                </div>
                <Badge variant={cat.badgeVariant} size="sm">
                  {cat.badge}
                </Badge>
              </div>

              <h3 className="mt-5 text-h4 text-foreground">{cat.name}</h3>
              <p className="text-body-sm mt-1.5">{cat.description}</p>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="font-mono text-sm text-dac-cyan">
                  {cat.example}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {cat.price}
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>
    </Section>
  );
}
