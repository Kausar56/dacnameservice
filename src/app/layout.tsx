import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { ToastProvider } from "@/components/ui/toast";
import { WalletProvider } from "@/components/wallet";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DACNS — DAC Name Service",
  description:
    "Premium naming service for DAC Quantum Chain. Register, manage, and resolve .dac names.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ToastProvider>
          <WalletProvider>
            <Navbar />
            {children}
          </WalletProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
