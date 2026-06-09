"use client";

import * as React from "react";
import { AlertTriangle, Loader2, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useDacWallet } from "./use-dac-wallet";

export interface NetworkGuardProps {
  children?: React.ReactNode;
  /**
   * "gate" (default): only renders children when connected to DAC Testnet,
   *   otherwise shows a connect / switch prompt in their place.
   * "banner": renders a slim inline alert when not connected / wrong network,
   *   and renders nothing (or children) when everything is fine.
   */
  mode?: "gate" | "banner";
  className?: string;
  connectTitle?: string;
  connectDescription?: string;
}

export function NetworkGuard({
  children,
  mode = "gate",
  className,
  connectTitle = "Connect your wallet",
  connectDescription = "Connect a wallet on DAC Inception Testnet to continue.",
}: NetworkGuardProps) {
  const {
    isConnected,
    isConnecting,
    isReconnecting,
    isWrongNetwork,
    isSwitching,
    openConnectModal,
    switchToDac,
  } = useDacWallet();

  const ok = isConnected && !isWrongNetwork;

  if (ok) {
    return <>{children ?? null}</>;
  }

  const busy = isConnecting || isReconnecting;

  // ── Banner mode ──
  if (mode === "banner") {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between",
          isWrongNetwork
            ? "border-destructive/30 bg-destructive/[0.05]"
            : "border-dac-cyan/25 bg-dac-cyan/[0.04]",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg",
              isWrongNetwork
                ? "bg-destructive/15 text-destructive"
                : "bg-dac-cyan/15 text-dac-cyan"
            )}
          >
            {isWrongNetwork ? (
              <AlertTriangle className="size-4" />
            ) : (
              <Wallet className="size-4" />
            )}
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isWrongNetwork ? "Wrong network" : connectTitle}
            </p>
            <p className="text-body-sm mt-0.5">
              {isWrongNetwork
                ? "Switch to DAC Inception Testnet to manage your domains."
                : connectDescription}
            </p>
          </div>
        </div>
        <GuardAction
          isWrongNetwork={isWrongNetwork}
          busy={busy}
          isSwitching={isSwitching}
          openConnectModal={openConnectModal}
          switchToDac={switchToDac}
        />
      </div>
    );
  }

  // ── Gate mode ──
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl glass p-8 text-center sm:p-10",
        className
      )}
    >
      <span
        className={cn(
          "mb-5 flex size-14 items-center justify-center rounded-2xl",
          isWrongNetwork
            ? "bg-destructive/15 text-destructive"
            : "bg-dac-cyan/15 text-dac-cyan"
        )}
      >
        {isWrongNetwork ? (
          <AlertTriangle className="size-7" />
        ) : (
          <Wallet className="size-7" />
        )}
      </span>
      <h3 className="text-h4 text-foreground">
        {isWrongNetwork ? "Wrong network" : connectTitle}
      </h3>
      <p className="text-body-sm mt-2 max-w-sm">
        {isWrongNetwork
          ? "You're connected to an unsupported network. Switch to DAC Inception Testnet to continue."
          : connectDescription}
      </p>
      <div className="mt-6">
        <GuardAction
          isWrongNetwork={isWrongNetwork}
          busy={busy}
          isSwitching={isSwitching}
          openConnectModal={openConnectModal}
          switchToDac={switchToDac}
          size="lg"
        />
      </div>
    </div>
  );
}

function GuardAction({
  isWrongNetwork,
  busy,
  isSwitching,
  openConnectModal,
  switchToDac,
  size = "sm",
}: {
  isWrongNetwork: boolean;
  busy: boolean;
  isSwitching: boolean;
  openConnectModal: (() => void) | undefined;
  switchToDac: () => void;
  size?: "sm" | "lg";
}) {
  if (isWrongNetwork) {
    return (
      <Button
        variant="gradient"
        size={size}
        onClick={switchToDac}
        disabled={isSwitching}
        loading={isSwitching}
        className="rounded-xl shrink-0"
      >
        {!isSwitching && <AlertTriangle className="size-4" />}
        Switch to DAC Testnet
      </Button>
    );
  }

  return (
    <Button
      variant="gradient"
      size={size}
      onClick={() => openConnectModal?.()}
      disabled={busy || !openConnectModal}
      className="rounded-xl shrink-0"
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Wallet className="size-4" />
      )}
      Connect Wallet
    </Button>
  );
}
