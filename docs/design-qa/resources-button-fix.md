# Design QA Report: Resources Page Button Contrast Fix

**Date:** 2026-01-08
**Author:** Trae AI
**Status:** Resolved

## 1. Issue Description
**Location:** `/resources` page
**Element:** "Call 1800 813 205" button (Anchor tag styled as button)
**Problem:** 
The button was using the default primary colour configuration which resulted in poor contrast and brand inconsistency.
- **Visual:** The button appeared with a black/gray background (`bg-primary`) instead of the brand's `ocean` blue.
- **Accessibility:** While the contrast was technically sufficient against white, it did not match the design system's hierarchy for primary calls-to-action (CTAs).

## 2. Resolution Strategy
To ensure consistency across the entire application and fix this specific instance, the global `Button` component configuration was updated.

### Changes Implemented
**File:** `src/components/ui/button.tsx`

1.  **Updated `default` Variant:**
    - **Light Mode:** Changed from `bg-primary` to `bg-ocean text-white`.
    - **Dark Mode:** Changed from `text-primary-foreground` to `bg-sky text-ocean` for better visibility against dark backgrounds.
    - **Hover State:** Added `hover:bg-ocean/90` and `hover:shadow-lg`.
    
2.  **Enhanced Transitions:**
    - Added `transition-all duration-300 ease-in-out` to the base button styles for smoother interactions.

### Code Snippet (After Fix)
```tsx
// src/components/ui/button.tsx
default: "bg-ocean text-white hover:bg-ocean/90 hover:shadow-lg dark:bg-sky dark:text-ocean dark:hover:bg-sky/90",
```

## 3. Verification Results
Automated contrast audits were performed using Playwright to verify WCAG AA compliance.

### Test Configuration
- **Tool:** Playwright
- **Test File:** `tests/ui/button-audit.spec.ts`
- **Target URL:** `http://localhost:4173/resources`
- **Selector:** `a[aria-label="Call Mosaic Multicultural Connections"]`

### Contrast Ratios
| Theme | Element | Foreground | Background | Ratio | Result |
|-------|---------|------------|------------|-------|--------|
| **Light** | Call Button | White (`#ffffff`) | Ocean (`#28367f`) | **10.91:1** | ✅ PASS |
| **Dark** | Call Button | Ocean (`#28367f`) | Sky (`#60c7cc`) | **5.48:1** | ✅ PASS |

*Note: WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text.*

## 4. Next Steps
- Monitor other buttons for similar brand inconsistencies.
- The test file `tests/ui/button-audit.spec.ts` has been retained for future regression testing.
