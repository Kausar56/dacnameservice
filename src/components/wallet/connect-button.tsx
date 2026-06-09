"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Loader2,
  LogOut,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useDacWallet } from "./use-dac-wallet";
import { explorerAddressUrl, truncateAddress } from "./wagmi-config";

export interface ConnectButtonProps {
  className?: string;
  /** Stretch the trigger to fill its container (useful in mobile menus). */
  fullWidth?: boolean;
}

export function ConnectButton({ className, fullWidth }: ConnectButtonProps) {
  const {
    address,
    isConnected,
    isConnecting,
    isReconnecting,
    chainName,
    explorerUrl,
    connectorName,
    isWrongNetwork,
    isSwitching,
    openConnectModal,
    disconnect,
    switchToDac,
  } = useDacWallet();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* ── Disconnected ── */
  if (!isConnected) {
    const busy = isConnecting || isReconnecting;
    return (
      <Button
        variant="gradient"
        size="sm"
        onClick={() => openConnectModal?.()}
        disabled={busy || !openConnectModal}
        className={cn("rounded-full px-5", fullWidth && "w-full", className)}
      >
        {busy ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Connecting…
          </>
        ) : (
          <>
            <Wallet className="size-3.5" />
            Connect Wallet
          </>
        )}
      </Button>
    );
  }

  /* ── Connected (correct or wrong network) ── */
  return (
    <div
      ref={wrapRef}
      className={cn("relative", fullWidth && "w-full", className)}
    >
      {isWrongNetwork ? (
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50",
            fullWidth && "w-full justify-center"
          )}
        >
          <AlertTriangle className="size-4" />
          Wrong network
          <ChevronDown className="size-3.5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-sm font-medium text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50",
            fullWidth && "w-full justify-center"
          )}
        >
          <AddressAvatar address={address ?? ""} />
          <span className="font-mono">{truncateAddress(address ?? "")}</span>
          <span className="hidden items-center gap-1.5 rounded-full bg-white/[0.05] px-2 py-0.5 text-xs text-muted-foreground sm:inline-flex">
            <span className="size-1.5 rounded-full bg-dac-green animate-pulse-node" />
            DACC
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-dac-bg-secondary/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            <AccountMenu
              address={address ?? ""}
              connectorName={connectorName}
              chainName={chainName}
              explorerUrl={explorerUrl}
              isWrongNetwork={isWrongNetwork}
              isSwitching={isSwitching}
              onSwitch={switchToDac}
              onDisconnect={() => {
                disconnect();
                setMenuOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Account dropdown ─────────────────────────────────────────── */

function AccountMenu({
  address,
  connectorName,
  chainName,
  explorerUrl,
  isWrongNetwork,
  isSwitching,
  onSwitch,
  onDisconnect,
}: {
  address: string;
  connectorName?: string;
  chainName?: string;
  explorerUrl?: string;
  isWrongNetwork: boolean;
  isSwitching: boolean;
  onSwitch: () => void;
  onDisconnect: () => void;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const explorerHref = explorerAddressUrl(explorerUrl, address);

  return (
    <div>
      {/* Identity */}
      <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
        <AddressAvatar address={address} size={36} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm text-foreground">
            {truncateAddress(address, 6)}
          </p>
          <p className="text-xs text-muted-foreground">
            {connectorName ?? "Connected"}
          </p>
        </div>
      </div>

      {/* Network */}
      <div className="mt-2 rounded-xl bg-white/[0.03] p-3">
        <div className="flex items-center justify-between">
          <span className="text-label text-muted-foreground">Network</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium",
              isWrongNetwork ? "text-destructive" : "text-dac-green"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isWrongNetwork ? "bg-destructive" : "bg-dac-green"
              )}
            />
            {isWrongNetwork ? "Unsupported network" : chainName ?? "DAC Inception Testnet"}
          </span>
        </div>

        {isWrongNetwork && (
          <button
            type="button"
            onClick={onSwitch}
            disabled={isSwitching}
            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isSwitching ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Switching…
              </>
            ) : (
              <>
                <AlertTriangle className="size-3.5" />
                Switch to DAC Testnet
              </>
            )}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="mt-2 space-y-0.5">
        <MenuAction
          icon={copied ? <Check className="size-4 text-dac-green" /> : <Copy className="size-4" />}
          label={copied ? "Address copied" : "Copy address"}
          onClick={copy}
        />
        {explorerHref && (
          <MenuAction
            icon={<ExternalLink className="size-4" />}
            label="View on Explorer"
            href={explorerHref}
          />
        )}
        <MenuAction
          icon={<LogOut className="size-4" />}
          label="Disconnect"
          onClick={onDisconnect}
          destructive
        />
      </div>
    </div>
  );
}

function MenuAction({
  icon,
  label,
  onClick,
  href,
  destructive,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  destructive?: boolean;
}) {
  const className = cn(
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dac-cyan/50",
    destructive
      ? "text-destructive hover:bg-destructive/10"
      : "text-foreground hover:bg-white/[0.06]"
  );
  const inner = (
    <>
      <span className={cn(!destructive && "text-muted-foreground")}>{icon}</span>
      {label}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

/** Deterministic gradient blockie derived from the address. */
function AddressAvatar({
  address,
  size = 24,
}: {
  address: string;
  size?: number;
}) {
  const hue = React.useMemo(() => {
    let h = 0;
    for (let i = 2; i < address.length; i++) {
      h = (h + address.charCodeAt(i)) % 360;
    }
    return h;
  }, [address]);

  return (
    <span
      className="shrink-0 rounded-full ring-1 ring-white/10"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(from 0deg, hsl(${hue} 90% 60%), hsl(${(hue + 120) % 360} 90% 60%), hsl(${(hue + 240) % 360} 90% 60%), hsl(${hue} 90% 60%))`,
      }}
      aria-hidden
    />
  );
}
