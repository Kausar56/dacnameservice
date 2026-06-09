import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/15 text-primary hover:bg-primary/25",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        glass: "glass border-white/10 text-foreground",
        gradient:
          "border-transparent bg-gradient-brand text-white",
        success:
          "border-transparent bg-success/15 text-success",
        warning:
          "border-transparent bg-warning/15 text-warning",
        destructive:
          "border-transparent bg-destructive/15 text-destructive",
        info: "border-transparent bg-info/15 text-info",
        muted:
          "border-transparent bg-muted text-muted-foreground",
        dot: "border-transparent bg-secondary text-secondary-foreground pl-1.5 gap-1.5",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[0.625rem] px-2 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dotColor?: string;
}

function Badge({
  className,
  variant,
  size,
  dotColor,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {variant === "dot" && (
        <span
          className="size-1.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor ?? "hsl(var(--success))" }}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
