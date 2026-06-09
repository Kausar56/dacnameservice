"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Plus, Shield, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";
import { CopyButton } from "@/components/domain/copy-button";

import { Avatar } from "./avatar";
import { USER } from "./mock-dashboard";

export function DashboardHeader() {
  return (
    <section className="relative overflow-hidden pt-28 pb-8 sm:pt-32">
      <AuroraBackground />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Identity */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Avatar
              initials={USER.initials}
              gradient={USER.avatarGradient}
              className="size-16 shadow-glow sm:size-20"
              textClassName="text-2xl sm:text-3xl"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate font-mono text-2xl font-bold text-foreground sm:text-3xl">
                  {USER.primaryName}
                </h1>
                <Badge variant="gradient" size="sm">
                  <BadgeCheck className="size-3.5" />
                  Primary
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-muted-foreground">
                  <Wallet className="size-3.5 text-dac-cyan" />
                  {USER.wallet}
                  <CopyButton
                    value={USER.walletFull}
                    label="Copy wallet address"
                    className="size-5"
                  />
                </span>
                <span className="text-caption">Joined {USER.joinedAt}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full glass-subtle px-3 py-1.5 text-caption sm:inline-flex">
              <Shield className="size-3.5 text-dac-green" />
              Private to you
            </span>
            <Button variant="gradient" size="lg" className="rounded-xl">
              <Plus className="size-4" />
              Register Domain
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
