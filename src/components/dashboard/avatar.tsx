import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  gradient: string;
  className?: string;
  textClassName?: string;
}

/** Gradient identicon-style avatar with initials. */
export function Avatar({
  initials,
  gradient,
  className,
  textClassName,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
      <div className="absolute inset-0 noise-overlay opacity-40" />
      <span
        className={cn(
          "relative font-bold tracking-tight text-dac-bg",
          textClassName
        )}
      >
        {initials}
      </span>
    </div>
  );
}
