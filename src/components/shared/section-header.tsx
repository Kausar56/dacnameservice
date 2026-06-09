import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  overline?: string;
  title: string;
  /** Optional trailing fragment rendered with the brand gradient. */
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  overline,
  title,
  titleAccent,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {overline && <p className="text-overline mb-3">{overline}</p>}
      <h2 className="text-h2 text-balance text-foreground">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="text-gradient">{titleAccent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-body-lg mt-4 text-balance">{description}</p>
      )}
    </div>
  );
}
