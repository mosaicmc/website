# Color Usage – Midnight Background (#11182e)

## Scope
- Apply `#11182e` as the primary page background for modified pages’ hero and major sections.
- Keep component surfaces (cards, buttons) using existing tokens (`bg-card`, brand accents) for hierarchy.

## Implementation
- Use Tailwind arbitrary color: `bg-[#11182e]` with `text-white` for body text.
- Replace previous gradient backgrounds on modified pages’ hero/major sections.
- Avoid heavy overlays that reduce contrast; keep subtle `bg-white/10` for badges only.

## Updated Pages
- Services: `src/pages/ServicesPage.tsx` hero → `bg-[#11182e] text-white`
- Family Support: `src/pages/services/FamilySupportPage.tsx` hero, eligibility, showcase → `bg-[#11182e] text-white`
- Community Engagement: `src/pages/services/CommunityEngagementPage.tsx` hero, eligibility → `bg-[#11182e] text-white`
- Aged Care: `src/pages/services/AgedCarePage.tsx` hero, eligibility, programs → `bg-[#11182e] text-white`
- About: `src/pages/AboutPage.tsx` hero → `bg-[#11182e] text-white`
- Helpful Links: `src/pages/resources/HelpfulLinksPage.tsx` section → `bg-[#11182e] text-white`

## Accessibility
- Body text: `#ffffff` on `#11182e` meets WCAG AA for normal text.
- Muted text: `text-white/70–85` used sparingly; check against AA for body copy.
- Focus rings: continue using `focus:ring-ocean focus:ring-offset-background`.

## Verification Steps
1. Run `npm run lint && npm run build` to verify.
2. Visual QA across breakpoints for legibility and hierarchy.
3. Confirm no overlays reduce contrast below AA.

## Rollback Plan
- Source of truth backups in `backups/`.
- Revert hero/major sections back to previous gradients.
- Test via `npm run build`; deploy only after QA.

