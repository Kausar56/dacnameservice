"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Crown,
  Hash,
  Loader2,
  Lock,
  Ruler,
  Sparkles,
  Tag,
  Wallet,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";
import {
  Modal,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatQE, PERIODS } from "@/components/register/mock-pricing";
import { Stepper } from "@/components/register/stepper";
import { truncateAddress, useDacWallet } from "@/components/wallet";
import { cn } from "@/lib/utils";

import {
  getRenewalQuote,
  renewBadgeOf,
  newExpiryAfter,
  type RenewBadge,
} from "./mock-renew";
import type { OwnedDomain } from "@/components/dashboard/mock-dashboard";

type Tx = "idle" | "pending" | "success" | "error";

const STEPS = ["Review Domain", "Select Period", "Review Cost", "Confirm Renewal"];
const NETWORK = "DAC Inception Testnet";
const EASE = [0.16, 1, 0.3, 1] as const;

const BADGE_META: Record<
  RenewBadge,
  { label: string; variant: "success" | "warning" | "destructive"; dot: string }
> = {
  active: { label: "Active", variant: "success", dot: "bg-dac-green" },
  expiring: { label: "Expiring Soon", variant: "warning", dot: "bg-warning" },
  expired: { label: "Expired", variant: "destructive", dot: "bg-destructive" },
};

const ERROR_REASONS = [
  "Wallet rejected the transaction",
  "Network error on DAC Inception Testnet",
  "Insufficient balance",
];

export function RenewFlow({ domain }: { domain: OwnedDomain }) {
  const { toast } = useToast();

  const [years, setYears] = React.useState<number>(1);
  const [tx, setTx] = React.useState<Tx>("idle");
  const [errorReason, setErrorReason] = React.useState<string>(ERROR_REASONS[0]);

  const {
    address,
    isConnected,
    isConnecting,
    isWrongNetwork,
    isSwitching,
    connectorName,
    openConnectModal,
    switchToDac,
  } = useDacWallet();
  const walletReady = isConnected && !isWrongNetwork;

  const quote = React.useMemo(
    () => getRenewalQuote(domain, years),
    [domain, years]
  );
  const badge = BADGE_META[renewBadgeOf(domain)];
  const isPremium = domain.category === "Premium";

  const currentStep =
    tx === "success" ? 4 : !walletReady ? 1 : tx === "pending" ? 3 : 2;

  const renew = () => {
    setTx("pending");
    setTimeout(() => {
      const failed = Math.random() < 0.2;
      if (failed) {
        setErrorReason(
          ERROR_REASONS[Math.floor(Math.random() * ERROR_REASONS.length)]
        );
        setTx("error");
        toast({
          variant: "error",
          title: "Renewal failed",
          description: "The transaction didn’t go through.",
        });
      } else {
        setTx("success");
        toast({
          variant: "success",
          title: "Domain renewed",
          description: `${domain.name} now expires ${quote.newExpiry}.`,
        });
      }
    }, 2400);
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-8 sm:pt-32">
        <AuroraBackground />
        <Container className="relative z-10">
          <Link
            href={`/domain/${domain.name}`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to domain
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-mono text-3xl font-bold text-foreground sm:text-4xl">
                  {domain.name}
                </h1>
                <Badge variant={badge.variant} size="lg">
                  {badge.label}
                </Badge>
                {isPremium && (
                  <Badge variant="gradient" size="lg">
                    <Crown className="size-3.5" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-body-lg mt-3">Renew your domain before it expires.</p>
            </div>

            {/* Expiry stat */}
            <div className="flex gap-3">
              <div className="rounded-2xl glass px-5 py-4">
                <span className="text-caption flex items-center gap-1.5">
                  <CalendarClock className="size-3.5" />
                  Expires
                </span>
                <span className="mt-1 block font-mono text-lg text-foreground">
                  {domain.expiresAt}
                </span>
              </div>
              <div className="rounded-2xl glass px-5 py-4">
                <span className="text-caption flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {domain.daysLeft < 0 ? "Expired" : "Remaining"}
                </span>
                <span
                  className={cn(
                    "mt-1 block font-mono text-lg",
                    domain.daysLeft < 0
                      ? "text-destructive"
                      : domain.daysLeft <= 30
                        ? "text-warning"
                        : "text-foreground"
                  )}
                >
                  {domain.daysLeft < 0
                    ? `${Math.abs(domain.daysLeft)}d ago`
                    : `${domain.daysLeft} days`}
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container className="relative z-10 pb-16">
        {/* Step tracker */}
        <div className="mb-6 rounded-2xl glass p-4 sm:p-5">
          <Stepper current={currentStep} steps={STEPS} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* ── Left: Domain Summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="h-fit rounded-2xl glass p-5 sm:p-6 lg:sticky lg:top-24"
          >
            <h2 className="text-h4 mb-5 text-foreground">Domain Summary</h2>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-dac-cyan">
                <Hash className="size-6" />
              </span>
              <span className="truncate font-mono text-xl text-foreground">
                {domain.name}
              </span>
            </div>
            <dl className="mt-3 space-y-2.5">
              <SummaryRow
                icon={<CalendarClock className="size-3.5" />}
                label="Registration Date"
                value={domain.registeredAt}
              />
              <SummaryRow
                icon={<CalendarClock className="size-3.5" />}
                label="Current Expiry"
                value={domain.expiresAt}
              />
              <SummaryRow
                icon={<Tag className="size-3.5" />}
                label="Category"
                value={domain.category}
              />
              <SummaryRow
                icon={<Ruler className="size-3.5" />}
                label="Character Length"
                value={`${domain.label.length} characters`}
              />
            </dl>
          </motion.div>

          {/* ── Right: Renewal ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="space-y-6"
          >
            {/* Renewal options */}
            <div className="rounded-2xl glass p-5 sm:p-6">
              <h2 className="text-h4 text-foreground">Renewal Period</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setYears(p)}
                    disabled={tx === "pending"}
                    className={cn(
                      "rounded-xl border p-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50 disabled:opacity-60",
                      years === p
                        ? "border-dac-cyan/50 bg-dac-cyan/10 shadow-glow-sm"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    )}
                  >
                    <div className="text-lg font-semibold text-foreground">{p}</div>
                    <div className="text-caption">{p === 1 ? "Year" : "Years"}</div>
                  </button>
                ))}
              </div>

              {/* Expiry transition */}
              <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] px-4 py-4">
                <div>
                  <p className="text-caption">Current Expiry</p>
                  <p className="mt-0.5 font-mono text-sm text-foreground">
                    {domain.expiresAt}
                  </p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-dac-cyan" />
                <div className="text-right">
                  <p className="text-caption">New Expiry</p>
                  <p className="mt-0.5 font-mono text-sm text-dac-green">
                    {newExpiryAfter(domain, years)}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl glass p-5 sm:p-6">
              <h2 className="text-h4 text-foreground">Pricing</h2>
              <div className="mt-4 divide-y divide-white/[0.06] rounded-xl bg-white/[0.03] px-4">
                <PriceRow label="Renewal Fee" value={formatQE(quote.renewalFee)} />
                <PriceRow label="Network Fee" value={formatQE(quote.networkFee)} />
                <PriceRow label="Estimated Gas" value={formatQE(quote.gas)} />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-gradient-brand-subtle px-4 py-3.5">
                <span className="text-sm font-medium text-foreground">Total Cost</span>
                <span className="text-gradient font-mono text-lg font-semibold">
                  {formatQE(quote.total)}
                </span>
              </div>
              {isPremium && (
                <p className="text-caption mt-3">
                  Premium names renew at a premium annual rate.
                </p>
              )}
            </div>

            {/* Wallet */}
            <div className="rounded-2xl glass p-5 sm:p-6">
              <h2 className="text-h4 text-foreground">Wallet</h2>
              <div className="mt-4">
                {walletReady ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3.5">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-dac-green/15 text-dac-green">
                        <Wallet className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-mono text-sm text-foreground">
                          {truncateAddress(address ?? "")}
                        </span>
                        <span className="flex items-center gap-1.5 text-caption">
                          <span className="size-1.5 rounded-full bg-dac-green animate-pulse-node" />
                          {connectorName ?? "Connected"} · {NETWORK}
                        </span>
                      </span>
                    </span>
                    <Badge variant="success" size="sm">
                      Connected
                    </Badge>
                  </div>
                ) : isWrongNetwork ? (
                  <div className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-center gap-2 text-sm text-destructive">
                      <AlertTriangle className="size-4" />
                      Wrong network
                    </span>
                    <Button
                      variant="gradient"
                      size="sm"
                      className="rounded-lg"
                      onClick={switchToDac}
                      loading={isSwitching}
                      disabled={isSwitching}
                    >
                      Switch to DAC Testnet
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => openConnectModal?.()}
                    disabled={isConnecting || !openConnectModal}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] py-4 text-sm font-medium text-foreground transition-colors hover:border-dac-cyan/40 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50 disabled:opacity-60"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="size-5 animate-spin text-dac-cyan" />
                        Connecting…
                      </>
                    ) : (
                      <>
                        <Wallet className="size-5 text-dac-cyan" />
                        Connect Wallet
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {tx === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5"
                >
                  <div className="flex items-start gap-3">
                    <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Renewal Failed
                      </p>
                      <p className="text-body-sm mt-0.5">{errorReason}.</p>
                      <ul className="mt-3 space-y-1">
                        {ERROR_REASONS.map((r) => (
                          <li
                            key={r}
                            className="flex items-center gap-2 text-caption"
                          >
                            <span className="size-1 rounded-full bg-muted-foreground" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirm */}
            <div className="rounded-2xl glass p-5 sm:p-6">
              {!walletReady ? (
                <p className="text-body-sm mb-4 flex items-center gap-2">
                  <Lock className="size-4 text-muted-foreground" />
                  {isWrongNetwork
                    ? "Switch to DAC Inception Testnet to confirm renewal."
                    : "Connect your wallet to confirm renewal."}
                </p>
              ) : (
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    New expiry {quote.newExpiry}
                  </span>
                  <span className="font-mono text-foreground">
                    {formatQE(quote.total)}
                  </span>
                </div>
              )}

              {tx === "error" ? (
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full rounded-xl"
                  onClick={renew}
                >
                  Try Again
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full rounded-xl"
                  onClick={renew}
                  disabled={!walletReady || tx === "pending"}
                  loading={tx === "pending"}
                >
                  {tx === "pending" ? (
                    "Confirming renewal…"
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Confirm Renewal
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Success Modal */}
      <Modal
        open={tx === "success"}
        onOpenChange={(o) => {
          if (!o) setTx("idle");
        }}
      >
        <DialogContent variant="glass" size="sm" showClose={false}>
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-dac-green/15 text-dac-green shadow-glow"
            >
              <CheckCircle2 className="size-8" />
            </motion.div>
            <DialogTitle className="text-h3">Domain Renewed Successfully</DialogTitle>
            <DialogDescription className="mt-2">
              <span className="font-mono text-dac-cyan">{domain.name}</span> has
              been renewed.
            </DialogDescription>

            <div className="mt-4 flex w-full items-center justify-between gap-2 rounded-xl bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-muted-foreground">New Expiry Date</span>
              <span className="font-mono text-sm text-dac-green">
                {quote.newExpiry}
              </span>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="lg" className="flex-1 rounded-xl">
                <Link href={`/domain/${domain.name}`}>View Domain</Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="flex-1 rounded-xl">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Modal>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-right text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono text-sm text-foreground/90">{value}</span>
    </div>
  );
}
