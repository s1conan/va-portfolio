# Task Context: Neo-Brutalist Senior Developer Portfolio

Session ID: 2026-07-21-brutalist-portfolio
Created: 2026-07-21T00:00:00Z
Status: in_progress

## Current Request
Build a senior developer portfolio that shows off frontend and web design skills through how the portfolio itself is built. DESIGN.md is the design guide, code.html is the structural base. Hosted on Vercel. Stack: latest shadcn/ui, React, Next.js, Tailwind CSS.

**User decisions (locked):**
1. Visual direction: **Exact code.html brutalist look** (light neo-brutalism). DESIGN.md has been rewritten to document this system — it is now the authoritative style guide.
2. Content: **Realistic placeholders** centralized in `src/lib/data.ts` for easy editing.
3. Contact form: **Resend email integration** via Server Action.

## Context Files (Standards to Follow)
- `A:\Projects\portofolio\AGENTS.md` — coding standards (surgical edits, NO `any`, interface-over-type for object shapes, camelCase identifiers, cva for variants, reusable CSS utilities over inline Tailwind flooding, import ordering: react/next → external → internal components → utils/types → styles, server components by default, WCAG 2.1 AA, no silent failures)
- `A:\Projects\portofolio\DESIGN.md` — **the design system (authoritative style guide, rewritten for neo-brutalism)**

## Reference Files (Source Material to Look At)
- `A:\Projects\portofolio\code.html` — structural/layout reference (sections, grid, copy tone). Do NOT copy its CDN Tailwind config; translate to Tailwind v4 CSS-first tokens.
- `.tmp/external-context/` — fetched current docs (Next.js 16, shadcn/ui latest, Tailwind v4 theming, Resend SDK, Server Actions + useActionState + zod, Vercel env vars)

## External Docs Fetched (key facts)
- **Next.js 16 is latest.** `create-next-app@latest` scaffolds it. Async request APIs are mandatory (await params/searchParams/cookies/headers). React 19 minimum. `useFormState` → `useActionState`. fetch not cached by default.
- **shadcn/ui latest:** `npx shadcn@latest init` (style `new-york`, cssVariables: true, tailwind.config blank for v4). Add: `button input textarea select dialog label sonner`. npm + React 19 needs `legacy-peer-deps=true` (write `.npmrc`).
- **Tailwind v4:** CSS-first config in `globals.css`. Custom tokens via `@theme` (`--color-brutal-*`, `--font-display`, `--font-mono`, `--shadow-brutal`, `--animate-marquee` with `@keyframes` inside `@theme`). Custom utilities via `@utility` (works with hover:/md:). shadcn token bridge via `@theme inline` referencing `:root` vars. Sharp corners: `:root { --radius: 0rem }`. Border widths are dynamic (border-4 works).
- **Resend:** `npm install resend`. `new Resend(process.env.RESEND_API_KEY)`. `resend.emails.send({ from, to, subject, html })` returns `{ data, error }` (does not throw). Test from: `onboarding@resend.dev`; free tier `to` limited to own address until domain verified. Plain HTML template string is sufficient (no react-email needed).
- **Server Action pattern:** `'use server'` file, zod `safeParse`, return `{ errors: flattened.fieldErrors }` or `{ message }`; client uses `useActionState(action, undefined)` → `[state, formAction, pending]`; no useTransition needed with form action.
- **Vercel:** add `RESEND_API_KEY` in project env vars, redeploy.

## Design System Summary (from DESIGN.md)
- Colors: brutal-black `#000000`, brutal-white `#FFFFFF`, brutal-yellow `#FFD700`, brutal-gray `#1A1A1A`. Nothing else.
- Fonts: Space Grotesk (display, 700–900, uppercase, tracking-tighter) + JetBrains Mono (body/labels/tags) via `next/font/google` with CSS variables.
- 4px solid black borders (`brutal-border` + directional variants via `@utility`).
- Shadows: `shadow-brutal` 8px 8px 0 #000; hover compresses to 4px 4px + `translate-x-1 translate-y-1`; `shadow-brutal-yellow` for modal.
- 0px border radius globally (`--radius: 0rem`).
- Noise SVG texture on body at 5% opacity. Marquee animation. Grayscale→color image hover. Terminal panel in hero.
- Sections (in order): Header (sticky) → Hero → Marquee → Projects (`#projects`, horizontal scroll-snap + modal) → Skills (`#skills`) → Certifications → Contact (`#contact`, proposal form) → Footer.

## Components
1. Scaffold & config (create-next-app in-place, .npmrc, shadcn init, resend+zod install, fonts)
2. Design system (`src/app/globals.css` — brutal tokens, utilities, marquee, noise, selection)
3. Data layer (`src/types/index.ts`, `src/lib/data.ts` — site config, projects, skills, certifications, socials)
4. Placeholder images (`public/images/*.svg` — grayscale geometric placeholders)
5. Layout (`src/components/layout/header.tsx`, `mobile-nav.tsx`, `footer.tsx`)
6. Sections (`src/components/sections/`: `hero.tsx`, `marquee.tsx`, `projects.tsx`, `project-card.tsx`, `project-modal.tsx`, `skills.tsx`, `certifications.tsx`, `contact.tsx`)
7. Form backend (`src/app/actions/contact.ts` — Server Action + zod + Resend; `src/lib/validations.ts`)
8. Assembly (`src/app/page.tsx`, `src/app/layout.tsx` metadata, `README.md`, `.env.example`)
9. QA (lint, tsc --noEmit, next build)

## Constraints
- TypeScript strict. NEVER `any` — use `unknown` + guards or proper types.
- `interface` for object shapes, `type` for unions. camelCase identifiers.
- Server components by default; `'use client'` only where hooks/interactivity needed (mobile nav, project modal, contact form).
- Use `@utility`-based reusable classes (brutal-border, brutal-shadow etc.) instead of repeating long inline Tailwind chains (per AGENTS.md).
- Icons: `lucide-react` (NOT Material Symbols CDN).
- Images: `next/image` with local SVG placeholders.
- Marquee respects `prefers-reduced-motion`.
- No silent failures — server action returns typed error states.
- Section numbering/copy follows code.html tone: "01 // TARGETS", "DEPLOYED ASSETS", "NO FLUFF. JUST CODE.", etc.

## Exit Criteria
- [ ] DESIGN.md rewritten (DONE)
- [ ] Next.js 16 + Tailwind v4 + shadcn/ui app builds (`npm run build` passes)
- [ ] All 8 sections render matching code.html structure with brutalist styling
- [ ] Project modal opens/closes with correct data per project
- [ ] Contact form validates (zod) and sends via Resend with typed error/success states
- [ ] `npm run lint` and `npx tsc --noEmit` pass with zero errors
- [ ] Responsive at sm/md/lg/xl breakpoints
- [ ] README documents Vercel deploy + RESEND_API_KEY setup
- [ ] Placeholder content isolated to `src/lib/data.ts`
