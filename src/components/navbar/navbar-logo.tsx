import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavbarLogoProps {
  className?: string;
  onClick?: () => void;
}

export function NavbarLogo({ className, onClick }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90",
        className
      )}
      aria-label="DACNS home"
    >
      <span className="relative flex size-9 items-center justify-center rounded-lg bg-gradient-brand shadow-glow-sm">
        <svg viewBox="0 0 32 32" fill="none" className="size-5" aria-hidden>
          <path
            d="M16 2L28 9v14L16 30 4 23V9L16 2z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="4" fill="#00D4FF" />
          <circle cx="16" cy="16" r="1.5" fill="white" />
        </svg>
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-gradient">
          DACNS
        </span>
        <span className="text-[0.625rem] text-muted-foreground tracking-wider uppercase mt-0.5">
          Identity Layer
        </span>
      </div>
    </Link>
  );
}
