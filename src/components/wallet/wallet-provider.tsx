"use client";

import * as React from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

import { dacTestnet } from "./wagmi-config";

/**
 * WalletConnect is temporarily disabled.
 *
 * The WalletConnect connector pulls in a QR modal whose generator
 * (`@paulmillr/qr`, via the MetaMask SDK path) throws "invalid border=0" and
 * crashes the modal. Until that QR implementation is fixed we ship only the
 * injected connector, which surfaces Rabby and MetaMask via EIP-6963 (the
 * browser-extension popups). No WalletConnect, no QR, no projectId required —
 * so there is no crash path.
 *
 * To re-enable WalletConnect later: add `connectorsForWallets` with
 * `walletConnectWallet` + a valid projectId back into `connectors`.
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
