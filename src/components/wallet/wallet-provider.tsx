"use client";

import * as React from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

import { dacTestnet } from "./wagmi-config";

/**
 * WalletConnect is intentionally disabled.
 *
 * We use wagmi's native `injected()` connector instead of RainbowKit's wallet
 * modules (`metaMaskWallet` / `rabbyWallet`), because those require a
 * WalletConnect Cloud `projectId` and throw "No projectId found" when it is
 * missing. The injected connector needs no projectId and, with EIP-6963
 * multi-provider discovery (enabled by default), surfaces MetaMask and Rabby
 * as separate options in the RainbowKit modal.
 */
const wagmiConfig = createConfig({
  chains: [dacTestnet],
  connectors: [injected({ shimDisconnect: true })],
  transports: { [dacTestnet.id]: http() },
  ssr: true,
});

const dacTheme = darkTheme({
  accentColor: "#00D4FF",
  accentColorForeground: "#050816",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={dacTheme} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
