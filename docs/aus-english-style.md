# Australian English Style Guide

## Spelling Conventions
- colour (not colour)
- honour, honoured, honouring (not honour, honoured, honouring)
- organisation, organise, organised, organising (not organisation, organise, organised, organising)
- behaviour, behaviours (not behaviour, behaviours)
- centre, centres (not centre, centres)
- licence, licences, licenced (not licence, licences, licenced) [noun]
- optimise, optimised, optimiser, optimising, optimisation (not optimise, optimised, optimiser, optimising, optimisation)
- customise, customised, customising, customisation (not customise, customised, customising, customisation)
- personalise, personalised, personalising (not personalise, personalised, personalising)
- catalogue, catalogues (not catalogue, catalogues)
- travelling (not travelling)
- cancelled (not cancelled)

## Usage Notes
- Maintain clarity and original intent; avoid altering domain-specific terms.
- Do not modify framework or library tokens (e.g., Tailwind classes like `text-centre`).
- Prefer local terminology where appropriate (e.g., “lorry” only if contextually accurate; otherwise retain specific program names and sector terms).

## Implementation Guidance
- Apply spelling in user-facing content: headings, body copy, labels, messages, metadata.
- Avoid changes in code identifiers, CSS classes, or API fields.
- Use automated audit (`npm run audit:aus`) to catch regressions.

## QA Checklist
- Spelling conforms to rules above.
- Meaning preserved; no functional changes.
- Links, buttons, and forms still work after edits.

