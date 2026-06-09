"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Crown, Lock, Share2, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";
import { STATUS_META } from "@/components/search/domain-card";
import { CopyButton } from "./copy-button";

import type { DomainDetails } from "@/components/search/mock-data";

export function DomainHero({ details }: { details: DomainDetails }) {
  const meta = STATUS_META[details.status];
  const Icon = meta.icon;

  return (
    <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-12">
      <AuroraBackground />
      <Container className="relative z-10">
        {/* Back link */}
        <Link
          href="/search"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to search
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Identity */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div
              className={`flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] sm:size-16 ${meta.iconColor}`}
            >
              <Icon className="size-7 sm:size-8" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="truncate font-mono text-3xl font-bold text-foreground sm:text-4xl">
                  {details.name}
                </h1>
                <Badge variant={meta.badge} size="lg">
                  {meta.label}
                </Badge>
              </div>
              <p className="text-body-sm mt-2">
                {details.category} name · {details.length} characters
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3">
            <CopyButton
              value={typeof window !== "undefined" ? window.location.href : details.name}
              label="Share domain"
              className="size-11 rounded-xl"
            />
            <span className="hidden sm:block">
              <Button variant="glass" size="lg" className="rounded-xl">
                <Share2 className="size-4" />
                Share
              </Button>
            </span>

            {details.status === "available" && (
              <Button asChild variant="gradient" size="lg" className="rounded-xl">
                <Link href={`/register/${details.name}`}>
                  Register Domain
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
            {details.status === "premium" && (
              <Button asChild variant="gradient" size="lg" className="rounded-xl">
                <Link href={`/register/${details.name}`}>
                  <Crown className="size-4" />
                  Register Premium Domain
                </Link>
              </Button>
            )}
            {details.status === "registered" && (
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <a href="#owner">
                  <User className="size-4" />
                  View Owner
                </a>
              </Button>
            )}
            {details.status === "reserved" && (
              <Button variant="outline" size="lg" disabled className="rounded-xl">
                <Lock className="size-4" />
                Not Available
              </Button>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
