# Mosaic Design System

This document outlines the standardized design system specifications for the Mosaic website, focusing on core UI components to ensure consistency, accessibility, and brand alignment.

## 1. Buttons & CTAs

Standardized styling for buttons and Call-to-Action (CTA) links across the application.

### Primary CTA (Solid)
Used for the main action on a page (e.g., "Call Now", "Make a Referral").

- **Visuals**:
  - **Background**: Solid brand colour (e.g., `bg-care`, `bg-sky`, `bg-sun`, `bg-leaf`). No gradients.
  - **Text**: White (`text-white`).
  - **Font**: Semibold (`font-semibold`).
  - **Padding**: `px-8 py-4` (Standard size).
  - **Radius**: `rounded-lg`.
  - **Icon**: Flex layout with icon (`flex items-centre justify-centre`, icon `mr-2`).
- **Interaction**:
  - **Hover**: Slightly darker/transparent background (`hover:bg-{colour}/90`).
  - **Scale**: Subtle scale up (`hover:scale-105`).
  - **Shadow**: Colored shadow on hover (`hover:shadow-lg hover:shadow-{colour}/25`).
  - **Transition**: Smooth transition (`transition-all duration-300`).
- **Accessibility**:
  - **Focus**: Visible focus ring (`focus:ring-2 focus:ring-{colour} focus:ring-offset-2`).

**Example Usage:**
```tsx
<a
  href="tel:1800813205"
  className="bg-care hover:bg-care/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-centre justify-centre hover:scale-105 hover:shadow-lg hover:shadow-care/25 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2 focus:ring-offset-background"
>
  <Phone className="h-5 w-5 mr-2" />
  Call 1800 813 205
</a>
```

### Secondary CTA (Outline)
Used for alternative actions (e.g., "Contact Us", "Read More").

- **Visuals**:
  - **Border**: 2px solid brand colour (`border-2 border-{colour}`).
  - **Text**: Brand colour (`text-{colour}`).
  - **Background**: Transparent (`bg-transparent`).
- **Interaction**:
  - **Hover**: Filled background (`hover:bg-{colour}`), White text (`hover:text-white`).
  - **Scale**: Subtle scale up (`hover:scale-105`).

**Example Usage:**
```tsx
<Link
  to="/contact-us"
  className="border-2 border-care text-care hover:bg-care hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-centre justify-centre hover:scale-105 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2 focus:ring-offset-background"
>
  Contact Us
  <ArrowRight className="h-5 w-5 ml-2" />
</Link>
```

---

## 2. FAQ System

The FAQ system provides a consistent, accessible, and responsive user experience for Frequently Asked Questions.

### Components

#### `AccordionItem` (`src/components/ui/AccordionItem.tsx`)
The core interactive component for a single FAQ item.

- **Visuals**:
  - Rounded corners (`rounded-2xl`).
  - Frosted glass effect (`backdrop-blur-md`, `bg-white/60`).
  - Expand/collapse animation (`transition-all`).
  - Custom colour themes via props.
- **Interaction**:
  - Click to toggle.
  - Keyboard accessible (Tab focus, Enter/Space to toggle).
  - ARIA attributes (`aria-expanded`, `aria-controls`).
- **Props**:
  - `question`: String.
  - `answer`: ReactNode (supports text, links, buttons).
  - `isOpen`: Boolean state.
  - `onToggle`: Callback function.
  - `colours`: Object `{ bg, border }` defining theme colours.

#### `FAQSection` (`src/components/FAQSection.tsx`)
A section wrapper for displaying a list of FAQs, typically used on service pages.

- **Layout**:
  - Two-column grid on large screens (`lg:grid-cols-2`).
  - Single column on smaller screens.
- **Features**:
  - Auto-generated Schema.org structured data (`FAQSchema`).
  - Configurable accent colours (`care`, `leaf`, `sun`, `sky`, `earth`).
  - Optional badge and subtitle.

#### `FAQPage` (`src/pages/resources/FAQPage.tsx`)
The dedicated FAQ page with search functionality.

- **Features**:
  - Search bar for filtering questions.
  - Feedback buttons (Helpful / Needs improvement).
  - Analytics logging on view and feedback.

### Design Patterns

#### Colours
Service pages use specific accent colours to match their branding:
- **Aged Care**: `care` (Rose/Red)
- **Settlement**: `sky` (Blue)
- **Family Support**: `sun` (Yellow/Orange)
- **Community Engagement**: `leaf` (Green) or `earth` (Brown)
- **General**: `ocean` (Deep Blue)

#### Accessibility (WCAG AA)
- **Contrast**: Text colours meet WCAG AA standards against backgrounds.
- **Focus Indicators**: Visible focus rings on interactive elements.
- **Screen Readers**: Proper use of `button` for toggles, `aria-expanded` state, and `aria-controls` for content association.
- **Motion**: Respects reduced motion settings.

#### Responsive Behaviour
- **Mobile**: Single column stack.
- **Tablet/Desktop**: Two-column grid (for `FAQSection`) or constrained max-width (for `FAQPage`).
- **Touch Targets**: Min 44px height for toggle buttons.
