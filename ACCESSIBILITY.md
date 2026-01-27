# Accessibility (a11y) Guidelines & Standards

This project is committed to ensuring digital accessibility for people with disabilities. We aim to meet **WCAG 2.1 Level AA** compliance across all devices and platforms.

## Core Standards

### 1. Cross-Device Compatibility
*   **Target Devices:** Desktop (macOS/Windows), Tablet (iPad/Android), Mobile (iOS/Android).
*   **Requirement:** All features must be fully functional and accessible on all viewports.
*   **Verification:** Automated Axe tests run on Mobile (375px), Tablet (768px), and Desktop (1280px) viewports.

### 2. Color Contrast
*   **Standard:** WCAG 1.4.3 (Contrast Minimum).
*   **Text:** 4.5:1 ratio for normal text, 3:1 for large text (18pt+ or 14pt+ bold).
*   **UI Components:** 3:1 ratio for user interface components and graphical objects (WCAG 1.4.11).
*   **Tooling:** We use `tests/ui/button-audit.spec.ts` and `tests/ui/accessibility.spec.ts` to enforce this.

### 3. Responsive Design & Reflow
*   **Standard:** WCAG 1.4.10 (Reflow).
*   **Requirement:** Content must not require scrolling in two dimensions (horizontal scroll) at a width equivalent to 320 CSS pixels.
*   **Zoom:** Application must support text resizing up to 200% without loss of content or functionality.

### 4. Keyboard Navigation
*   **Standard:** WCAG 2.1.1 (Keyboard).
*   **Requirement:** All interactive elements (links, buttons, inputs) must be reachable and operable via keyboard (Tab/Enter/Space).
*   **Focus Visible:** Focus indicators must be clearly visible (WCAG 2.4.7).
*   **No Traps:** No keyboard traps (WCAG 2.1.2). Modals/Menus must contain focus until closed.

## Testing & Continuous Monitoring

We employ a "Shift Left" accessibility strategy with continuous monitoring in our CI pipeline.

### Automated Testing
We use **Axe-core** integrated with Playwright for automated compliance checks.

**Run Accessibility Tests:**
```bash
npm run test:a11y
```

**What is tested:**
*   **WCAG 2.0 A & AA**
*   **WCAG 2.1 A & AA**
*   **Best Practices**

This script scans key routes (`/`, `/about`, `/services`, etc.) across multiple viewports.

### Manual Audits
Automated tools catch ~30-50% of issues. Manual testing is required for:
*   **Screen Reader Navigation:** Test with NVDA (Windows) or VoiceOver (macOS/iOS).
*   **Complex Interactions:** Drag-and-drop, custom widgets.
*   **Logical Reading Order:** Ensure tab order matches visual order.

### Issue Tracking
*   Report all accessibility defects in the project issue tracker with the label `a11y`.
*   Include:
    *   **Device/Browser:** e.g., iPhone 12 / Safari
    *   **Assistive Tech:** e.g., VoiceOver
    *   **Steps to Reproduce:**
    *   **Expected vs Actual:**

## Developer Checklist
Before submitting a PR, ensure:
- [ ] `npm run test:a11y` passes.
- [ ] All images have `alt` text (or `aria-hidden="true"` if decorative).
- [ ] Interactive elements have accessible names (`aria-label` or visible text).
- [ ] Focus rings are visible on all interactive elements.
- [ ] Color contrast meets AA standards (check with DevTools).
- [ ] Semantic HTML is used (`<button>` vs `<div>`, `<nav>`, `<main>`, etc.).
