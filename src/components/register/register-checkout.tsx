"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
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
import { STATUS_META } from "@/components/search/domain-card";
import { categoryOf, type DomainResult } from "@/components/search/mock-data";
import { truncateAddress, useDacWallet } from "@/components/wallet";
import { cn } from "@/lib/utils";

import { formatQE, getQuote, PERIODS } from "./mock-pricing";
import { Stepper } from "./stepper";

type Tx = "idle" | "pending" | "success" | "error";

const STEPS = ["Domain Selected", "Wallet Connected", "Review", "Confirm"];
const NETWORK = "DAC Inception Testnet";
const EASE = [0.16, 1, 0.3, 1] as const;

export function RegisterCheckout({ result }: { result: DomainResult }) {
  const { toast } = useToast();

  const [years, setYears] = React.useState<number>(1);
  const [tx, setTx] = React.useState<Tx>("idle");

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

  const quote = React.useMemo(() => getQuote(result, years), [result, years]);
  const meta = STATUS_META[result.status];
  const StatusIcon = meta.icon;

  const currentStep =
    tx === "success" ? 4 : !walletReady ? 1 : tx === "pending" ? 3 : 2;

  const register = () => {
    setTx("pending");
    setTimeout(() => {
      const failed = Math.random() < 0.2;
      if (failed) {
        setTx("error");
        toast({
          variant: "error",
          title: "Registration failed",
          description: "The transaction was rejected. Please try again.",
        });
      } else {
        setTx("success");
        toast({
          variant: "success",
          title: "Domain registered",
          description: `${result.name} is now yours.`,
        });
      }
    }, 2400);
  };

  return (
    <div className="relative min-h-screen">
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <AuroraBackground />
        <Container className="relative z-10">
          {/* Heading */}
          <div className="mb-8">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full glass-subtle px-3.5 py-1.5">
              <Sparkles className="size-3.5 text-dac-cyan" />
              <span className="text-[0.8125rem] font-medium text-foreground/80">
                Secure checkout
              </span>
            </span>
            <h1 className="text-h1 text-foreground">
              Register <span className="text-gradient">{result.name}</span>
            </h1>
          </div>

          {/* Step tracker */}
          <div className="mb-8 rounded-2xl glass p-4 sm:p-5">
            <Stepper current={currentStep} steps={STEPS} />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* ── Left: Domain Summary ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="h-fit rounded-2xl glass p-5 sm:p-6 lg:sticky lg:top-24"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-h4 text-foreground">Domain Summary</h2>
                {result.status === "premium" ? (
                  <Badge variant="gradient" size="sm">
                    <Crown className="size-3.5" />
                    Premium
                  </Badge>
                ) : (
                  <Badge variant="success" size="sm">
                    Available
                  </Badge>
                )}
              </div>

              {/* Domain identity */}
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-4">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]",
                    meta.iconColor
                  )}
                >
                  <StatusIcon className="size-6" />
                </div>
                <span className="truncate font-mono text-xl text-foreground">
                  {result.name}
                </span>
              </div>

              {/* Meta */}
              <dl className="mt-3 space-y-2.5">
                <SummaryRow
                  icon={<Tag className="size-3.5" />}
                  label="Category"
                  value={categoryOf(result)}
                />
                <SummaryRow
                  icon={<Ruler className="size-3.5" />}
                  label="Character Length"
                  value={`${result.length} characters`}
                />
                <SummaryRow
                  icon={<Hash className="size-3.5" />}
                  label="Status"
                  value={
                    <Badge variant={meta.badge} size="sm">
                      {meta.label}
                    </Badge>
                  }
                />
              </dl>
            </motion.div>

            {/* ── Right: Registration Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="space-y-6"
            >
              {/* Registration period + pricing */}
              <div className="rounded-2xl glass p-5 sm:p-6">
                <h2 className="text-h4 text-foreground">Registration Period</h2>
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
                      <div className="text-lg font-semibold text-foreground">
                        {p}
                      </div>
                      <div className="text-caption">
                        {p === 1 ? "Year" : "Years"}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Pricing breakdown */}
                <div className="mt-6">
                  <h3 className="text-label mb-2 text-muted-foreground">
                    Pricing Breakdown
                  </h3>
                  <div className="divide-y divide-white/[0.06] rounded-xl bg-white/[0.03] px-4">
                    <PriceRow
                      label="Registration Fee"
                      value={formatQE(quote.registrationFee)}
                    />
                    {quote.isPremium && (
                      <PriceRow
                        label="Premium Fee"
                        value={formatQE(quote.premiumFee)}
                      />
                    )}
                    <PriceRow
                      label="Network Fee"
                      value={formatQE(quote.networkFee)}
                    />
                    <PriceRow
                      label="Estimated Gas"
                      value={formatQE(quote.gas)}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-gradient-brand-subtle px-4 py-3.5">
                    <span className="text-sm font-medium text-foreground">
                      Total Cost
                    </span>
                    <span className="text-gradient font-mono text-lg font-semibold">
                      {formatQE(quote.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wallet section */}
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

              {/* Error state */}
              <AnimatePresence>
                {tx === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-5"
                  >
                    <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Registration Failed
                      </p>
                      <p className="text-body-sm mt-0.5">
                        The transaction didn&apos;t go through. No funds were
                        charged.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm / Review action */}
              <div className="rounded-2xl glass p-5 sm:p-6">
                {!walletReady ? (
                  <p className="text-body-sm mb-4 flex items-center gap-2">
                    <Lock className="size-4 text-muted-foreground" />
                    {isWrongNetwork
                      ? "Switch to DAC Inception Testnet to confirm registration."
                      : "Connect your wallet to review and confirm registration."}
                  </p>
                ) : (
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Registering for {years} {years === 1 ? "year" : "years"}
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
                    onClick={register}
                  >
                    Try Again
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full rounded-xl"
                    onClick={register}
                    disabled={!walletReady || tx === "pending"}
                    loading={tx === "pending"}
                  >
                    {tx === "pending" ? (
                      "Confirming on " + NETWORK + "…"
                    ) : (
                      <>
                        <Sparkles className="size-4" />
                        Confirm Registration
                      </>
                    )}
                  </Button>
                )}

                {tx === "pending" && (
                  <p className="text-caption mt-3 text-center">
                    Awaiting on-chain confirmation. This can take a few moments.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

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
            <DialogTitle className="text-h3">
              Domain Registered Successfully
            </DialogTitle>
            <DialogDescription className="mt-2">
              <span className="font-mono text-dac-cyan">{result.name}</span> is
              now registered to your wallet for {years}{" "}
              {years === 1 ? "year" : "years"}.
            </DialogDescription>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/[0.03] px-4 py-2 font-mono text-sm text-muted-foreground">
              Total paid
              <span className="text-foreground">{formatQE(quote.total)}</span>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="gradient"
                size="lg"
                className="flex-1 rounded-xl"
              >
                <Link href={`/domain/${result.name}`}>View Domain</Link>
              </Button>
              <Button
                asChild
                variant="glass"
                size="lg"
                className="flex-1 rounded-xl"
              >
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
