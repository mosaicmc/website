import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}

// Card skeleton for service cards
export function CardSkeleton() {
  return (
    <div className="flex flex-row items-start gap-4 p-5 rounded-2xl border bg-white/80 dark:bg-white/10">
      <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// Hero skeleton
export function HeroSkeleton() {
  return (
    <div className="w-full h-[500px] animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
  );
}

// Text block skeleton
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i == lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

// Page skeleton (for Suspense fallback)
export function PageSkeleton() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <Skeleton className="h-10 w-1/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
