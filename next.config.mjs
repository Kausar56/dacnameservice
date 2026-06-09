/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Silence optional-dependency warnings from wagmi/RainbowKit connector
    // packages. These deps are only used by code paths we don't ship
    // (WalletConnect logger pretty-printing, MetaMask SDK React Native
    // storage). The app uses injected wallets only, so they're never loaded.
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
    };
    return config;
  },
};

export default nextConfig;
