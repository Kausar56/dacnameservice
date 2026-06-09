"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/shared/section-header";

import { DOMAIN_CATEGORIES } from "./mock-data";
import { SuggestionCard } from "./suggestion-card";

/** Idle-state showcase: browse names by category. */
export function CategoryExplorer() {
  return (
    <Container className="pb-24">
      <SectionHeader
        overline="Explore Categories"
        title="Discover names by"
        titleAccent="category"
        description="Browse curated tiers — from ultra-rare 2-character names to protected reserved names."
        className="mb-12"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DOMAIN_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="rounded-2xl glass p-5"
          >
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="text-h4 text-foreground">{cat.title}</h3>
              <span className="text-caption">{cat.examples.length} names</span>
            </div>
            <p className="text-body-sm mb-4">{cat.description}</p>

            <div className="space-y-2">
              {cat.examples.map((ex) => (
                <SuggestionCard key={ex.name} result={ex} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
