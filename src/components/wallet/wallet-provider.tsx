"use client";

import * as React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";

import { dacTestnet, WC_PROJECT_ID } from "./wagmi-config";

const wagmiConfig = getDefaultConfig({
  appName: "DACNS — DAC Name Service",
  projectId: WC_PROJECT_ID,
  chains: [dacTestnet],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [rabbyWallet, metaMaskWallet, walletConnectWallet],
    },
  ],
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
