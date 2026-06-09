import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";

export function DomainNotFound({ name }: { name?: string }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <AuroraBackground />
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl glass text-muted-foreground">
            <SearchX className="size-8" />
          </div>
          <h1 className="text-h2 text-foreground">Invalid domain</h1>
          <p className="text-body-lg mt-3">
            {name ? (
              <>
                <span className="font-mono text-dac-cyan">{name}</span> is not a
                valid .dac name.
              </>
            ) : (
              "That doesn't look like a valid .dac name."
            )}
          </p>
          <Button asChild variant="gradient" size="lg" className="mt-8 rounded-xl">
            <Link href="/search">Search domains</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
