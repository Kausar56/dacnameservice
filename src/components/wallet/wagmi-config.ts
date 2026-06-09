/**
 * Real wagmi + viem + RainbowKit configuration for DACNS.
 *
 * Defines the DAC Inception Testnet chain and exposes RSC-safe helpers + the
 * WalletConnect project id. Connectors are assembled in `wallet-provider.tsx`:
 * Rabby + MetaMask + WalletConnect when a project id is present, otherwise a
 * safe injected-only fallback (no crash).
 */

import { defineChain } from "viem";

/** Official DAC Inception Testnet (viem chain). */
export const dacTestnet = defineChain({
  id: 21894,
  name: "DAC Inception Testnet",
  nativeCurrency: { name: "DAC Coin", symbol: "DACC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpctest.dachain.tech"] },
  },
  blockExplorers: {
    default: { name: "DAC Explorer", url: "https://exptest.dachain.tech" },
  },
  testnet: true,
});

/**
 * WalletConnect Cloud project id, read from the public env var.
 * Empty when unset — the wallet provider falls back to injected-only.
 */
export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim() ?? "";

/** Whether the WalletConnect connector should be initialized. */
export const hasWalletConnect = WALLETCONNECT_PROJECT_ID.length > 0;

/** Shorten an address like 0x9F2c…A41d. */
export function truncateAddress(address: string, chars = 4): string {
  if (!address?.startsWith("0x") || address.length < 2 + chars * 2) {
    return address;
  }
  return `${address.slice(0, 2 + chars)}…${address.slice(-chars)}`;
}

/** Block-explorer URL for an address, derived from a wagmi/viem chain. */
export function explorerAddressUrl(
  explorerUrl: string | undefined,
  address: string
): string | null {
  if (!explorerUrl) return null;
  return `${explorerUrl.replace(/\/$/, "")}/address/${address}`;
}
