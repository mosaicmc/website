import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  bordered?: boolean;
  style?: React.CSSProperties;
};

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function GlassCard({
  children,
  className,
  as = "div",
  padding = "md",
  hover = true,
  bordered = true,
  style,
}: GlassCardProps) {
  const Comp = as;
  return (
    <Comp
      style={style}
      className={cn(
        "relative isolate overflow-hidden group bg-card/80 dark:bg-card/40 backdrop-blur-md",
        bordered && "border border-border",
        hover && "transition-all duration-500 ease-out hover:shadow-md hover:scale-[1.02] hover:bg-card/90 dark:hover:bg-card/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        "shadow-sm",
        paddingMap[padding],
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      {children}
    </Comp>
  );
}

export default GlassCard;
