# Breadcrumbs Style Guide

## Intent
- Transparent background; no borders or backdrop effects.
- High-contrast text using `text-foreground`; separators use `text-muted-foreground`.
- Responsive spacing via container utilities; no hard-coded pixels beyond scale tokens.

## Accessibility
- Contrast: normal text set via `--hero-foreground` inheritance or `text-foreground` (≥4.5:1 in both themes).
- Focus: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- Hover: `hover:underline` for links; no color-only state.

## Implementation Tokens
- Colors: `text-current`/`text-inherit`, `text-muted-foreground`, `ring`, `ring-offset-background`, `--hero-foreground`.
- Layout: `flex items-center gap-2 flex-wrap`, container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3`.
 - Optional contrast aid: `rounded-md px-2 py-1 bg-background/40 dark:bg-background/20 backdrop-blur-sm`.

## Notes
- Preserve existing link destinations and routing behavior.
- Works across modern browsers; graceful fallback for focus outline.
