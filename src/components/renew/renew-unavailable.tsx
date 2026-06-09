import Link from "next/link";
import { CalendarX, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";

/** Shown when a name can't be renewed (not owned / not registered). */
export function RenewUnavailable({ name }: { name: string }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <AuroraBackground />
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl glass text-muted-foreground">
            <CalendarX className="size-8" />
          </div>
          <h1 className="text-h2 text-foreground">Nothing to renew</h1>
          <p className="text-body-lg mt-3">
            <span className="font-mono text-dac-cyan">{name}</span> isn’t a
            registered domain you own, so there’s no renewal to process.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gradient" size="lg" className="rounded-xl">
              <Link href={`/domain/${name}`}>View Domain</Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="rounded-xl">
              <Link href="/dashboard">
                <Search className="size-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
