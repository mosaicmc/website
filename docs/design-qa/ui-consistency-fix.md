# Design QA Report: UI Consistency & Hover State Fixes

**Date:** 2026-01-08
**Author:** Trae AI
**Status:** Resolved

## 1. Issue Description
**Locations:** 
1. **Home Page (`/`)**: "Explore Our Services" buttons in Hero and CTA sections.
2. **Resources Page (`/resources`)**: "Call 1800" and "Email" buttons.

**Problem:** 
- **Home Page:** The "Explore Our Services" buttons were using hardcoded Tailwind classes that caused inconsistent hover states (e.g., incorrect text/bg colour combinations) and did not align with the global style guide.
- **Resources Page:** The "Call 1800" button appeared to be retaining old styling (black/gray `bg-primary`) instead of the updated `ocean` brand colour.

## 2. Resolution Strategy
To ensure consistency across the application, hardcoded styles were replaced with the global `Button` component, which centrally manages brand colours and interaction states.

### Changes Implemented

#### A. Home Page (`src/components/Hero.tsx` & `src/components/SimpleCTA.tsx`)
- **Action:** Refactored hardcoded `Link` elements to wrap them in the `Button` component.
- **Variant Used:** `variant="default"` (Ocean background, White text).
- **Outcome:** 
  - Standardized hover effects (`hover:bg-ocean/90`).
  - consistent shadow and transition timing (`duration-300`).
  - Removed duplicate/conflicting hardcoded classes.

#### B. Resources Page (`src/pages/ResourcesPage.tsx`)
- **Action:** Verified implementation uses `Button` component.
- **Context:** The page was correctly using the component, but visual confirmation required ensuring the latest `button.tsx` changes were propagated.
- **Outcome:** Confirmed `default` variant now resolves to `bg-ocean` instead of `bg-primary`.

### Code Snippet (Home Page Fix)
```tsx
// Before (Hardcoded)
<Link className="bg-ocean text-white hover:text-white ...">...</Link>

// After (Component-based)
<Button asChild size="lg" variant="default" className="...">
  <Link to="/services">Explore Our Services</Link>
</Button>
```

## 3. Verification Results
Automated contrast audits were extended to cover the Home Page buttons.

### Test Configuration
- **Tool:** Playwright
- **Test File:** `tests/ui/button-audit.spec.ts`
- **Target URLs:** `/`, `/resources`

### Contrast Ratios
| Page | Element | Theme | Contrast Ratio | Result |
|------|---------|-------|----------------|--------|
| **Home** | Explore Services (Hero) | Light | **10.91:1** | ✅ PASS |
| **Home** | Explore Services (CTA) | Light | **10.91:1** | ✅ PASS |
| **Resources** | Call 1800 Button | Light | **10.91:1** | ✅ PASS |
| **Resources** | Call 1800 Button | Dark | **5.48:1** | ✅ PASS |

## 4. Next Steps
- Continue to replace any remaining hardcoded button styles with the `Button` component as they are discovered.
