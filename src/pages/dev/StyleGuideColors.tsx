import React from "react";
import { Helmet } from "react-helmet-async";

export default function StyleGuideColors() {
  const swatches = [
    { name: "Foreground", cls: "bg-foreground" },
    { name: "Muted Foreground", cls: "bg-muted-foreground" },
    { name: "Background", cls: "bg-background" },
    { name: "Card", cls: "bg-card" },
    { name: "Border", cls: "bg-border" },
    { name: "Ring", cls: "bg-ring" },
    { name: "Ocean", cls: "bg-ocean" },
    { name: "Sky", cls: "bg-sky" },
    { name: "Sand", cls: "bg-sand" },
    { name: "Sun", cls: "bg-sun" },
    { name: "Earth", cls: "bg-earth" },
    { name: "Leaf", cls: "bg-leaf" },
    { name: "Care", cls: "bg-care" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Style Guide Colors | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Internal style guide for Mosaic color tokens, gradients, and contrast guidance used across the site to keep the UI consistent and accessible."
        />
      </Helmet>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Style Guide — Colors & Tokens</h1>
      <p className="text-muted-foreground mt-2">
        Use semantic tokens for colors across backgrounds, text, borders, rings, and brand accents. Avoid raw hex. Ensure contrast meets WCAG AA.
      </p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {swatches.map((s) => (
          <div key={s.name} className="rounded-xl border border-border p-4">
            <div className={`rounded-lg h-16 ${s.cls}`}></div>
            <div className="mt-3 text-sm text-foreground">{s.name}</div>
            <div className="text-xs text-muted-foreground">Class: {s.cls}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-border p-4">
        <h2 className="text-xl font-semibold text-foreground">Glass Navigation Variables</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Navigation glass uses CSS variables for background, blur, shadow and border. Values adapt to scroll and theme.
        </p>
        <div className="mt-3 text-sm text-muted-foreground">
          --nav-bg-light-base, --nav-bg-dark-base, --nav-bg, --nav-shadow, --nav-border, --nav-blur
        </div>
        <div className="mt-4 nav-glass rounded-lg p-4">
          Example nav-glass box using variables
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-border p-4">
        <h2 className="text-xl font-semibold text-foreground">Usage Guidelines</h2>
        <ul className="mt-2 text-sm text-muted-foreground space-y-2">
          <li>Use `text-foreground`/`text-muted-foreground` for text; avoid inline color styles.</li>
          <li>Use `bg-background`/`bg-card` for surfaces; maintain consistent contrast in both themes.</li>
          <li>Use `border-border` and `focus:ring-2 focus:ring-ring` for accessible focus states.</li>
          <li>Use brand accents sparingly: `bg-ocean`, `bg-sky`, `bg-leaf`, `bg-sun`, `bg-earth`, `bg-care`.</li>
          <li>Avoid `text-white` on light accents in dark mode; prefer `bg-ocean text-white` for primary CTAs.</li>
        </ul>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border p-4">
          <h3 className="text-lg font-semibold text-foreground">Interactive States</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="inline-flex items-center rounded-md bg-ocean text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-ocean/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              Primary
            </button>
            <button className="inline-flex items-center rounded-md border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              Secondary
            </button>
            <button className="inline-flex items-center rounded-md glass-surface px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              Glass
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Hover and focus states should preserve contrast and visible focus rings.</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h3 className="text-lg font-semibold text-foreground">Contrast Checks</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-card p-4">
              <div className="text-foreground text-sm">Text on Card</div>
              <div className="text-muted-foreground text-xs mt-1">Meets AA for body text</div>
            </div>
            <div className="rounded-lg bg-background p-4">
              <div className="text-foreground text-sm">Text on Background</div>
              <div className="text-muted-foreground text-xs mt-1">Meets AA for body text</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">For custom palettes, verify ≥4.5:1 contrast for normal text and ≥3:1 for large text.</p>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border p-4">
          <h3 className="text-lg font-semibold text-foreground">Focus States — Links</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="#" className="mc-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1">
              Standard Link
            </a>
            <a href="#" className="inline-flex items-center rounded-md border border-border bg-background text-foreground px-3 py-1 text-sm hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              Button‑Like Link
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Links must have visible focus styles and maintain contrast in both themes.</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h3 className="text-lg font-semibold text-foreground">Focus States — Inputs</h3>
          <div className="mt-4 space-y-3">
            <input type="text" aria-label="Your name" placeholder="Your name" className="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" />
            <input type="email" aria-label="Email" placeholder="Email" className="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Inputs should use `border-border` and `focus:ring-2 focus:ring-ring` for accessible focus.</p>
        </div>
      </div>
    </div>
  );
}
