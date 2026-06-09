import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display: "text-display",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      "body-lg": "text-body-lg",
      body: "text-body",
      "body-sm": "text-body-sm",
      label: "text-label",
      caption: "text-caption",
      overline: "text-overline",
      mono: "text-mono",
      gradient: "text-gradient",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;

const defaultElementMap: Record<
  TypographyVariant,
  keyof JSX.IntrinsicElements
> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  label: "label",
  caption: "span",
  overline: "span",
  mono: "code",
  gradient: "span",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as, ...props }, ref) => {
    const Comp =
      as ??
      defaultElementMap[variant as TypographyVariant] ??
      "p";

    return React.createElement(Comp, {
      ref,
      className: cn(typographyVariants({ variant }), className),
      ...props,
    });
  }
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
