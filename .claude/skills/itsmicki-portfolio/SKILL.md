---
name: itsmicki-portfolio
description: Maintain, extend, optimize, audit, or prepare deployment of the Itsmicki Astro design portfolio. Use for project content, routes, styling, responsive behavior, images, Vimeo embeds, Figma fidelity, accessibility, performance, or Vercel readiness in this repository.
---

# Itsmicki Portfolio

Preserve the project's deliberately editorial visual identity while keeping its implementation small, static, accessible, and easy to maintain.

## Start Here

1. Read `README.md` and `references/project-map.md`.
2. Inspect the affected page, component, data entry, and global styles before editing.
3. For Figma-driven work, use the connected Figma tooling and treat the linked design as the visual source of truth.
4. Keep the change within the existing architecture unless the user explicitly approves an architectural change.

## Architecture Rules

- Keep Astro, TypeScript, native CSS, and static output.
- Do not introduce React, Tailwind, a CMS, a database, or SSR merely for convenience.
- Use `src/data/projects.ts` as the canonical project-content model.
- Reuse `src/pages/projects/[slug].astro` for standard case studies.
- Prefer focused Astro components over duplicated page markup.
- Avoid dependencies when browser APIs or the existing code solve the problem cleanly.

## Media Rules

- Keep only production-used images and documents in `public/`.
- Keep source material and old HTML in the sibling `../Referencias originales` directory.
- Embed videos from Vimeo by ID; never commit downloaded video files.
- Give meaningful images useful alternative text and decorative images empty alt text.
- Give every iframe a descriptive title.
- Preserve a recoverable source before optimizing images.
- Confirm font licensing before public deployment.

## Visual and Interaction Rules

- Preserve hierarchy, whitespace, typography, rhythm, and project imagery from Figma.
- Check every affected view at mobile and desktop widths.
- Preserve keyboard navigation, visible focus, semantic landmarks, and readable contrast.
- Respect `prefers-reduced-motion`; do not make motion essential to understanding.
- Use the installed `frontend-design` skill for substantial UI work and `web-design-guidelines` for a formal quality review.
- Use the installed `astro` skill for framework-level changes.

## Validation

Run both commands before handing off code:

```bash
pnpm check
pnpm build
```

Also inspect broken asset paths and the affected page visually when a server is already authorized. Do not start a persistent server or deploy unless requested. Use `deploy-to-vercel` only after explicit deployment approval.
