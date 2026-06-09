import Link from "next/link";
import { Lock, ShieldX, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";
import type { DomainResult } from "@/components/search/mock-data";

/** Shown when a name can't be registered (registered / reserved / invalid). */
export function RegisterUnavailable({
  name,
  result,
}: {
  name: string;
  result?: DomainResult | null;
}) {
  const reserved = result?.status === "reserved";
  const registered = result?.status === "registered";

  const Icon = reserved ? Lock : registered ? User : ShieldX;
  const title = reserved
    ? "Reserved name"
    : registered
      ? "Already registered"
      : "Cannot register";

  const message = reserved
    ? "This name is protected by the DAC ecosystem and isn’t open for registration."
    : registered
      ? "This name is already owned. You can view its public details instead."
      : "This name isn’t available to register.";

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <AuroraBackground />
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl glass text-muted-foreground">
            <Icon className="size-8" />
          </div>
          <h1 className="text-h2 text-foreground">{title}</h1>
          <p className="text-body-lg mt-3">
            <span className="font-mono text-dac-cyan">{name}</span> — {message}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {result && (
              <Button asChild variant="gradient" size="lg" className="rounded-xl">
                <Link href={`/domain/${result.name}`}>View Domain</Link>
              </Button>
            )}
            <Button asChild variant="glass" size="lg" className="rounded-xl">
              <Link href="/search">Search other names</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
