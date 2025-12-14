import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function ColorContrastTestPage() {
  const [useTestColor, setUseTestColor] = useState(false);

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Colour Contrast Test</title>
        <meta name="description" content="Isolated block to test switching background using semantic tokens with readability checks." />
      </Helmet>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Colour Contrast Test Block</h1>
        <p className="text-muted-foreground mb-6">This page isolates a single block and allows toggling its background between original black and the proposed #11182e for visual evaluation across breakpoints.</p>

        <div
          id="test-block"
          role="region"
          aria-label="Colour Contrast Test Block"
          className={`rounded-2xl overflow-hidden border border-border shadow-lg ${useTestColor ? 'bg-card' : 'bg-background'}`}
        >
          <div className="p-8">
            <div className="mb-4">
              <button
                id="toggle-bg"
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background bg-background/10 text-foreground border border-border"
                onClick={() => setUseTestColor((v) => !v)}
              >
                {useTestColor ? 'Revert surface' : 'Apply surface'}
              </button>
            </div>

            <h2 className="text-2xl font-bold text-foreground">Sample Heading</h2>
            <p className="mt-3 max-w-prose text-foreground">
              This text checks readability on a dark background. Links and buttons below use accessible contrast colours.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center rounded-lg px-4 py-2 font-semibold transition-all bg-ocean text-white"
              >
                Primary CTA
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-lg px-4 py-2 font-semibold border border-sky text-sky"
              >
                Secondary Link
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Use the button above to toggle between original black and #11182e.</p>
        </div>
      </section>
    </div>
  );
}
