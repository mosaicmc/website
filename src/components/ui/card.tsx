import * as React from 'react';
import { cn } from '@/lib/utils';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative group overflow-hidden rounded-2xl border border-white/50 dark:border-white/20 bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-2xl',
        'hover-lift hover:bg-white/80 dark:hover:bg-white/15',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      {props.children}
    </div>
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn('p-6', className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('px-6 pb-6', className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardProps) {
  return <div className={cn('px-6 pb-6 flex items-center justify-between', className)} {...props} />;
}
