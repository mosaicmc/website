import * as React from "react";
import { cn } from "../../lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  padding?: "sm" | "md" | "lg";
  overlay?: boolean;
  overlayClassName?: string;
  variant?: "default" | "alt" | "surface" | "transparent";
  divider?: "none" | "top" | "bottom" | "both";
  fade?: "none" | "top" | "bottom" | "both";
  center?: boolean;
};

const paddingMap = {
  sm: "py-6 md:py-8",
  md: "section-spacing",
  lg: "section-spacing",
} as const;

export function Section({
  children,
  id,
  className,
  containerClassName,
  padding = "md",
  overlay = false,
  overlayClassName,
  variant = "default",
  divider = "none",
  fade = "none",
  center = false,
}: SectionProps) {
  const variantClass =
    variant === "transparent"
      ? "bg-transparent"
      : variant === "surface"
      ? "bg-section"
      : variant === "alt"
      ? "bg-section-alt"
      : "bg-page";

  const dividerClass =
    divider === "top"
      ? "border-t border-divider"
      : divider === "bottom"
      ? "border-b border-divider"
      : divider === "both"
      ? "border-y border-divider"
      : "";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden transition-colors duration-300",
        variantClass,
        dividerClass,
        paddingMap[padding],
        center && "section-center",
        className
      )}
    >
      {(overlay || fade === "top" || fade === "both") && (
        <div
          aria-hidden
          className={cn(
            fade === "top" || fade === "both"
              ? "section-fade-top"
              : "pointer-events-none",
            overlayClassName
          )}
        />
      )}
      {fade === "bottom" || fade === "both" ? (
        <div aria-hidden className="section-fade-bottom" />
      ) : null}
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>{children}</div>
    </section>
  );
}

export default Section;
