"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Crown,
  Loader2,
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
import { useToast } from "@/components/ui/toast";
import { truncateAddress, useDacWallet } from "@/components/wallet";
import { cn } from "@/lib/utils";

import { OrderSummary } from "./order-summary";
import { Stepper } from "./stepper";
import { formatQE, getQuote, PERIODS } from "./mock-pricing";
import type { DomainResult } from "@/components/search/mock-data";

type TxStatus = "idle" | "processing" | "success" | "error";

const FADE = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const };

export function RegisterFlow({ result }: { result: DomainResult }) {
  const { toast } = useToast();

  const [step, setStep] = React.useState(0);
  const [years, setYears] = React.useState<number>(1);
  const [tx, setTx] = React.useState<TxStatus>("idle");

  const {
    address,
    isConnected,
    isConnecting,
    isWrongNetwork,
    isSwitching,
    chainId,
    chainName,
    connectorName,
    openConnectModal,
    switchToDac,
  } = useDacWallet();
  const walletReady = isConnected && !isWrongNetwork;

  const quote = React.useMemo(() => getQuote(result, years), [result, years]);

  const register = () => {
    setTx("processing");
    setTimeout(() => {
      // Simulate occasional network failure to exercise the error state.
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
    }, 2200);
  };

  // ── Terminal states ───────────────────────────────────────────
  if (tx === "success") {
    return (
      <FlowShell>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={FADE}
          className="mx-auto max-w-lg rounded-2xl glass p-8 text-center sm:p-10"
        >
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-dac-green/15 text-dac-green shadow-glow">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="text-h2 text-foreground">Registration complete</h1>
          <p className="text-body-lg mt-3">
            <span className="font-mono text-dac-cyan">{result.name}</span> is now
            registered to your wallet for {years}{" "}
            {years === 1 ? "year" : "years"}.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/[0.03] px-4 py-2.5 font-mono text-sm text-muted-foreground">
            Total paid
            <span className="text-foreground">{formatQE(quote.total)}</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="gradient" size="lg" className="rounded-xl">
              <Link href={`/domain/${result.name}`}>
                View Domain
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="rounded-xl">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </motion.div>
      </FlowShell>
    );
  }

  if (tx === "error") {
    return (
      <FlowShell>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={FADE}
          className="mx-auto max-w-lg rounded-2xl glass p-8 text-center sm:p-10"
        >
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
            <XCircle className="size-8" />
          </div>
          <h1 className="text-h2 text-foreground">Registration failed</h1>
          <p className="text-body-lg mt-3">
            The transaction for{" "}
            <span className="font-mono text-dac-cyan">{result.name}</span> didn’t
            go through. No funds were charged.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="gradient"
              size="lg"
              className="rounded-xl"
              onClick={register}
            >
              <Loader2 className="hidden size-4" />
              Try Again
            </Button>
            <Button
              variant="glass"
              size="lg"
              className="rounded-xl"
              onClick={() => setTx("idle")}
            >
              Back to Review
            </Button>
          </div>
        </motion.div>
      </FlowShell>
    );
  }

  // ── Wizard ────────────────────────────────────────────────────
  return (
    <FlowShell>
      <div className="mb-8">
        <Link
          href={`/domain/${result.name}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to domain
        </Link>
        <h1 className="text-h1 text-foreground">
          Register <span className="text-gradient">{result.name}</span>
        </h1>
      </div>

      {/* Stepper */}
      <div className="mb-8 rounded-2xl glass p-4 sm:p-5">
        <Stepper current={step} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Step content */}
        <div className="rounded-2xl glass p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {/* Step 0 — Summary */}
            {step === 0 && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={FADE}
              >
                <StepHeading
                  title="Domain Summary"
                  subtitle="Review the name you're about to register."
                />
                <div className="mt-5 rounded-xl bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xl text-foreground sm:text-2xl">
                      {result.name}
                    </span>
                    {quote.isPremium ? (
                      <Badge variant="gradient">
                        <Crown className="size-3.5" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="success">Available</Badge>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Meta icon={<Tag className="size-3.5" />} label="Status">
                      {quote.isPremium ? "Premium" : "Available"}
                    </Meta>
                    <Meta icon={<Ruler className="size-3.5" />} label="Length">
                      {result.length} chars
                    </Meta>
                  </div>
                </div>
                <StepNav onNext={() => setStep(1)} nextLabel="Continue to Pricing" />
              </motion.div>
            )}

            {/* Step 1 — Pricing */}
            {step === 1 && (
              <motion.div
                key="pricing"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={FADE}
              >
                <StepHeading
                  title="Pricing"
                  subtitle="Choose how long you'd like to register this name."
                />
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {PERIODS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setYears(p)}
                      className={cn(
                        "rounded-xl border p-4 text-center transition-all",
                        years === p
                          ? "border-dac-cyan/50 bg-dac-cyan/10 shadow-glow-sm"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      )}
                    >
                      <div className="text-lg font-semibold text-foreground">
                        {p}
                      </div>
                      <div className="text-caption">
                        {p === 1 ? "year" : "years"}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-caption mt-3">
                  Base fee {formatQE(4)} per year
                  {quote.isPremium && " + one-time premium fee"}.
                </p>
                <StepNav
                  onBack={() => setStep(0)}
                  onNext={() => setStep(2)}
                  nextLabel="Continue to Wallet"
                />
              </motion.div>
            )}

            {/* Step 2 — Wallet */}
            {step === 2 && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={FADE}
              >
                <StepHeading
                  title="Connect Wallet"
                  subtitle="Connect a wallet to pay for and own this name."
                />
                <div className="mt-5">
                  {walletReady ? (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-4">
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-dac-green/15 text-dac-green">
                            <CheckCircle2 className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-mono text-sm text-foreground">
                              {truncateAddress(address ?? "")}
                            </span>
                            <span className="text-caption">
                              {connectorName ?? "Connected"}
                            </span>
                          </span>
                        </span>
                        <Badge variant="success" size="sm">
                          Connected
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <Meta icon={<Wallet className="size-3.5" />} label="Network">
                          {chainName ?? "DAC Inception Testnet"}
                        </Meta>
                        <Meta icon={<Tag className="size-3.5" />} label="Chain ID">
                          {chainId ?? "—"}
                        </Meta>
                      </div>
                    </div>
                  ) : isWrongNetwork ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/[0.05] p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                        <AlertTriangle className="size-4" />
                        Wrong Network
                      </div>
                      <p className="text-body-sm mt-1">
                        Connected to chain {chainId}. DACNS runs on DAC Inception
                        Testnet (21894).
                      </p>
                      <Button
                        variant="gradient"
                        size="sm"
                        className="mt-3 rounded-lg"
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
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] py-5 text-sm font-medium text-foreground transition-colors hover:border-dac-cyan/40 hover:bg-white/[0.04] disabled:opacity-60"
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
                <StepNav
                  onBack={() => setStep(1)}
                  onNext={walletReady ? () => setStep(3) : undefined}
                  nextLabel="Review & Confirm"
                  nextDisabled={!walletReady}
                />
              </motion.div>
            )}

            {/* Step 3 — Confirm */}
            {step === 3 && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={FADE}
              >
                <StepHeading
                  title="Confirm Registration"
                  subtitle="Review everything, then register your name."
                />
                <div className="mt-5 space-y-3">
                  <ConfirmRow label="Domain" value={result.name} mono />
                  <ConfirmRow
                    label="Period"
                    value={`${years} ${years === 1 ? "year" : "years"}`}
                  />
                  <ConfirmRow
                    label="Premium status"
                    value={quote.isPremium ? "Premium" : "Standard"}
                  />
                  <ConfirmRow
                    label="Wallet"
                    value={address ? truncateAddress(address) : "—"}
                    mono
                  />
                  <ConfirmRow
                    label="Total"
                    value={formatQE(quote.total)}
                    mono
                    strong
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-xl sm:flex-none"
                    onClick={() => setStep(2)}
                    disabled={tx === "processing"}
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button
                    variant="gradient"
                    size="lg"
                    className="rounded-xl sm:flex-1"
                    onClick={register}
                    loading={tx === "processing"}
                  >
                    {tx === "processing" ? (
                      "Registering…"
                    ) : (
                      <>
                        <Sparkles className="size-4" />
                        Register Domain
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <OrderSummary
          result={result}
          quote={quote}
          className="h-fit lg:sticky lg:top-24"
        />
      </div>
    </FlowShell>
  );
}

/* ── Layout + helpers ─────────────────────────────────────────── */

function FlowShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <AuroraBackground />
        <Container className="relative z-10">{children}</Container>
      </section>
    </div>
  );
}

function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-h3 text-foreground">{title}</h2>
      <p className="text-body-sm mt-1">{subtitle}</p>
    </div>
  );
}

function Meta({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white/[0.03] px-3 py-2.5">
      <span className="text-caption flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <span className="mt-0.5 block text-sm font-medium text-foreground">
        {children}
      </span>
    </div>
  );
}

function ConfirmRow({
  label,
  value,
  mono,
  strong,
}: {
  label: string;
  value: string;
  mono?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "truncate text-right text-sm",
          mono && "font-mono",
          strong ? "text-gradient font-semibold" : "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center gap-3">
      {onBack && (
        <Button variant="ghost" size="lg" className="rounded-xl" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
      )}
      <Button
        variant="gradient"
        size="lg"
        className="flex-1 rounded-xl"
        onClick={onNext}
        disabled={nextDisabled || !onNext}
      >
        {nextLabel}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
