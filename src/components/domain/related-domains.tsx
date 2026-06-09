"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { Container, Section } from "@/components/ui/container";
import { STATUS_META } from "@/components/search/domain-card";
import { cn } from "@/lib/utils";

import type { DomainResult } from "@/components/search/mock-data";

export function RelatedDomains({ domains }: { domains: DomainResult[] }) {
  if (domains.length === 0) return null;

  return (
    <Section spacing="default">
      <Container>
        <SectionHeader
          align="left"
          overline="Related"
          title="Similar"
          titleAccent=".dac names"
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => {
            const meta = STATUS_META[d.status];
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/domain/${d.name}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl glass px-5 py-4 transition-colors hover:border-white/15"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        meta.dot
                      )}
                    />
                    <span className="truncate font-mono text-sm text-foreground">
                      {d.name}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2.5">
                    <Badge variant={meta.badge} size="sm">
                      {meta.label}
                    </Badge>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
