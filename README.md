This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
=======
# DEV_ARCHITECT — Neo-Brutalist Developer Portfolio

A senior frontend engineer portfolio built with **Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui (Base UI)**.  
Deploys instantly to [Vercel](https://vercel.com).

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — App Router, Turbopack, Server Actions
- **[React 19](https://react.dev)** — `useActionState`, React Compiler
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first config, `@theme`, `@utility`
- **[shadcn/ui](https://ui.shadcn.com)** — Base UI primitives (Dialog, Input, Textarea, Label, Sonner)
- **[Resend](https://resend.com)** — Contact form email delivery
- **[Lucide React](https://lucide.dev)** — Icon library
>>>>>>> 4beb48a (Initial commit)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```bash
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=you@example.com
```

| Variable         | Required | Description                                       |
|------------------|----------|---------------------------------------------------|
| `RESEND_API_KEY` | Yes      | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_EMAIL`  | Yes      | Email address that receives proposal submissions   |

> **Note:** The Resend free tier only allows sending to your own verified email.  
> For production, [add a verified domain](https://resend.com/domains) and update the `from` address in `src/app/actions/contact.ts`.

## Project Structure

```
src/
├── app/
│   ├── actions/
│   │   └── contact.ts        # Server Action (Resend send)
│   ├── globals.css            # Tailwind v4 tokens + @utility + noise
│   ├── layout.tsx             # Fonts, metadata, Toaster
│   └── page.tsx               # Section assembly
├── components/
│   ├── layout/
│   │   ├── header.tsx         # Sticky nav header
│   │   ├── mobile-nav.tsx     # Mobile menu (client)
│   │   └── footer.tsx         # Footer with socials
│   ├── sections/
│   │   ├── hero.tsx           # Hero + terminal panel
│   │   ├── marquee.tsx        # Infinite scrolling slogans
│   │   ├── projects.tsx       # Horizontal scroll cards + modal state
│   │   ├── project-card.tsx   # Individual project card
│   │   ├── project-modal.tsx  # Full-screen project detail (Dialog)
│   │   ├── skills.tsx         # 3-column skill grid
│   │   ├── certifications.tsx # 2-column cert grid
│   │   └── contact.tsx        # Proposal request form (client)
│   └── ui/                    # shadcn/ui primitives (Button, Dialog, etc.)
├── lib/
│   ├── data.ts                # SINGLE SOURCE OF TRUTH — all content
│   ├── utils.ts               # cn() helper
│   └── validations.ts         # Zod schema + contact form types
├── types/
│   └── index.ts               # TypeScript interfaces
└── public/images/             # Placeholder SVGs
```

## Customization

Edit **`src/lib/data.ts`** to replace all placeholder content with your real information:
- Site name, nav links, socials, email
- Project entries (title, stack, outcomes, images)
- Skills categories
- Certifications
- Contact form project types

## Design System

See [`DESIGN.md`](./DESIGN.md) for the complete neo-brutalist design documentation.

## Deploy on Vercel

1. Push the repo to GitHub
2. Import into [Vercel](https://vercel.com/new)
3. Add environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL`) in Project Settings → Environment Variables
4. Redeploy

