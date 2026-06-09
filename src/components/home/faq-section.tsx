"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is a .dac name?",
    a: "A .dac name is your human-readable identity on DAC Quantum Chain. It replaces long wallet addresses and acts as your portable, self-custodial profile across the entire DAC ecosystem.",
  },
  {
    q: "Do I truly own my .dac name?",
    a: "Yes. Names are minted directly to your wallet and secured on-chain. There are no custodians and no central authority that can revoke your name as long as it's registered.",
  },
  {
    q: "What are QE points?",
    a: "QE (Quantum Efficiency) points are ecosystem rewards earned for registering names, setting resolver records, and participating in DAC. They contribute to your reputation tier and unlock benefits.",
  },
  {
    q: "How much does registration cost?",
    a: "Standard names start at 4 QE per year. Premium, 2-character, and 3-character names are priced by rarity. Reserved names are protected for the DAC ecosystem and partners.",
  },
  {
    q: "Which wallets are supported?",
    a: "DACNS works natively with DAC Wallet and any wallet compatible with DAC Quantum Chain. Connect your wallet to register and manage your identity.",
  },
  {
    q: "Can apps resolve my identity?",
    a: "Absolutely. DACNS uses open resolver standards, so any DAC app can read your records — wallets, profiles, content, and metadata — to build richer experiences.",
  },
];

export function FAQSection() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <Section spacing="lg" id="faq" className="relative">
      <Container size="lg">
        <SectionHeader
          overline="FAQ"
          title="Questions, "
          titleAccent="answered"
          description="Everything you need to know about owning your identity on DAC."
          className="mb-12 sm:mb-16"
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={cn(
                  "overflow-hidden rounded-2xl glass transition-colors",
                  isOpen && "border-dac-cyan/20"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-foreground">
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-dac-cyan transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-body-sm px-5 pb-5 sm:px-6 sm:pb-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
