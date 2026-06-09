import Link from "next/link";
import { ArrowLeft, Clock, Search, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/effects";
import { Footer } from "@/components/home";

export interface PlaceholderPageProps {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Optional "what's coming" bullet points. */
  highlights?: string[];
}

/**
 * Reusable "Coming Soon" page built from the DACNS design system.
 * Used for routes that are linked but not yet implemented, so navigation
 * never lands on a 404.
 */
export function PlaceholderPage({
  eyebrow = "On the roadmap",
  title,
  description,
  icon: Icon = Clock,
  highlights,
}: PlaceholderPageProps) {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32">
        <AuroraBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full glass-subtle px-3.5 py-1.5">
              <Clock className="size-3.5 text-dac-cyan" />
              <span className="text-[0.8125rem] font-medium text-foreground/80">
                {eyebrow}
              </span>
            </span>

            <h1 className="text-h1 text-balance text-foreground">{title}</h1>
            <p className="text-body-lg mx-auto mt-4 max-w-xl text-balance">
              {description}
            </p>

            {/* Coming Soon card */}
            <div className="mx-auto mt-10 max-w-lg rounded-2xl glass p-8 text-left sm:p-10">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-white/[0.04] text-dac-cyan">
                  <Icon className="size-6" />
                </span>
                <Badge variant="gradient" size="lg">
                  Coming Soon
                </Badge>
              </div>

              <h2 className="text-h4 mt-6 text-foreground">
                We&apos;re building this experience
              </h2>
              <p className="text-body-sm mt-2">
                This part of DACNS isn&apos;t live yet. It&apos;s actively in
                development and will arrive in an upcoming release.
              </p>

              {highlights && highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-dac-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

      <Footer />
    </>
  );
}
