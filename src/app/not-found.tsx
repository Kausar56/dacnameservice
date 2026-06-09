import Link from "next/link";
import { ArrowLeft, Compass, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-dac-bg">
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <AuroraBackground />
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="mb-6 flex size-16 items-center justify-center rounded-2xl glass text-dac-cyan">
              <Compass className="size-8" />
            </div>
            <p className="text-overline mb-3">Error 404</p>
            <h1 className="text-h1 text-balance text-foreground">
              Page not found
            </h1>
            <p className="text-body-lg mt-4 max-w-sm text-balance">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="lg" className="rounded-xl">
                <Link href="/search">
                  <Search className="size-4" />
                  Search Domains
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="rounded-xl">
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
