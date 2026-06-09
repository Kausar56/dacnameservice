"use client";

/**
 * Central wallet state for DACNS, built on real wagmi + RainbowKit hooks.
 * One hook the rest of the app consumes for connect / disconnect / network
 * detection / switching — keeps page code free of low-level wiring.
 */

import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";

import { dacTestnet } from "./wagmi-config";

export interface DacWallet {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  chainId: number | undefined;
  chainName: string | undefined;
  explorerUrl: string | undefined;
  connectorName: string | undefined;
  /** Connected to a chain other than DAC Inception Testnet. */
  isWrongNetwork: boolean;
  isSwitching: boolean;
  /** Open the RainbowKit connect modal (undefined while connecting). */
  openConnectModal: (() => void) | undefined;
  openChainModal: (() => void) | undefined;
  disconnect: () => void;
  switchToDac: () => void;
}

export function useDacWallet(): DacWallet {
  const { address, isConnected, isConnecting, isReconnecting, chainId, chain, connector } =
    useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const isWrongNetwork = isConnected && chainId !== dacTestnet.id;

  return {
    address,
    isConnected,
    isConnecting,
    isReconnecting,
    chainId,
    chainName: chain?.name,
    explorerUrl: chain?.blockExplorers?.default.url,
    connectorName: connector?.name,
    isWrongNetwork,
    isSwitching,
    openConnectModal,
    openChainModal,
    disconnect,
    switchToDac: () => switchChain({ chainId: dacTestnet.id }),
  };
}
