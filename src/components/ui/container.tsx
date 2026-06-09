import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-[1400px]",
      full: "max-w-full",
    },
    padding: {
      none: "",
      sm: "px-4 sm:px-6",
      default: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "2xl",
    padding: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, as: Comp = "div", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(containerVariants({ size, padding, className }))}
      {...props}
    />
  )
);
Container.displayName = "Container";

const sectionVariants = cva("", {
  variants: {
    spacing: {
      none: "",
      sm: "py-12 sm:py-16",
      default: "py-16 sm:py-24",
      lg: "py-24 sm:py-32",
      xl: "py-32 sm:py-40",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ spacing, className }))}
      {...props}
    />
  )
);
Section.displayName = "Section";

const stackGapMap = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
} as const;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: keyof typeof stackGapMap;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      gap = "md",
      align = "stretch",
      justify = "start",
      ...props
    },
    ref
  ) => {
    const alignMap = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };
    const justifyMap = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          stackGapMap[gap],
          alignMap[align],
          justifyMap[justify],
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: keyof typeof stackGapMap;
  responsive?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 1,
      gap = "md",
      responsive = true,
      ...props
    },
    ref
  ) => {
    const colsMap = {
      1: responsive ? "grid-cols-1" : "grid-cols-1",
      2: responsive ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2",
      3: responsive ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-3",
      4: responsive ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-4",
      6: responsive ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "grid-cols-6",
      12: responsive ? "grid-cols-4 sm:grid-cols-6 lg:grid-cols-12" : "grid-cols-12",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", colsMap[cols], stackGapMap[gap], className)}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

/** Page shell — full viewport wrapper with optional gradient background */
export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
}

const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  ({ className, gradient = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative min-h-screen bg-background",
        gradient && "bg-gradient-radial",
        className
      )}
      {...props}
    >
      {gradient && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 h-[80%] w-[80%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-[20%] -right-[20%] h-[50%] w-[50%] rounded-full bg-accent/5 blur-[100px]" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
);
PageShell.displayName = "PageShell";

export {
  Container,
  Section,
  Stack,
  Grid,
  PageShell,
  containerVariants,
  sectionVariants,
};
