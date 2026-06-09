/**
 * Real wagmi + viem + RainbowKit configuration for DACNS.
 *
 * Defines the DAC Inception Testnet chain and a wagmi config wired with the
 * Rabby, MetaMask, and WalletConnect connectors. No contract interactions —
 * this layer only provides real wallet connectivity.
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
 * WalletConnect Cloud project id.
 * Set NEXT_PUBLIC_WC_PROJECT_ID in `.env.local` to enable WalletConnect /
 * mobile wallets. Injected wallets (MetaMask, Rabby) work without it.
 */
export const WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID || "DACNS_DEMO_PROJECT_ID";

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
