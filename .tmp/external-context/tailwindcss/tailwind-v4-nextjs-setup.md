---
source: Context7 API (/tailwindlabs/tailwindcss.com) + official tailwindcss.com docs
library: Tailwind CSS
package: tailwindcss
topic: Tailwind CSS v4 installation with Next.js (PostCSS), CSS-first config, tailwind.config status
fetched: 2026-07-21T00:00:00Z
official_docs: https://tailwindcss.com/docs/installation/framework-guides/nextjs | https://tailwindcss.com/docs/functions-and-directives
---

# Tailwind CSS v4 — Next.js Setup

## 1. With create-next-app (easiest)

`create-next-app` ships with Tailwind v4 by default — `--tailwind` is a **default** flag. The scaffolded project already includes `@tailwindcss/postcss`, `postcss.config.mjs`, and a `globals.css` with `@import "tailwindcss"`. No manual steps needed.

```bash
npx create-next-app@latest my-project --typescript --eslint --app
```

## 2. Manual install into an existing Next.js app

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

**postcss.config.mjs** (project root):

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**app/globals.css**:

```css
@import "tailwindcss";
```

Then `npm run dev`. That's it — no content globs, no other config.

## 3. What changed from v3

- **PostCSS plugin moved**: in v3 the `tailwindcss` package itself was the PostCSS plugin; in v4 it lives in the dedicated **`@tailwindcss/postcss`** package. (For Vite projects there's instead a first-party `@tailwindcss/vite` plugin — not needed for Next.js.)
- **`@tailwind base/components/utilities` directives are gone** → single `@import "tailwindcss";`.
- **`postcss-import` and `autoprefixer` are no longer needed** — v4 handles imports and vendor prefixing automatically. Remove them.
- **Automatic content detection** — no `content` array needed; use `@source "../path"` only for files outside auto-detection (e.g. in `node_modules`).
- **Custom utilities**: `@utility tab-4 { tab-size: 4; }` (works with variants like `hover:`).
- **Custom variants**: `@custom-variant theme-midnight (&:where([data-theme="midnight"] *));`
- **CSS functions**: `--alpha(var(--color-lime-300) / 50%)`, `--spacing(4)`.
- `@apply` still exists. In CSS Modules / Vue/Svelte style blocks, use `@reference "../../app.css";` to access theme values without duplicating output CSS.

## 4. CSS-first configuration (`@theme`)

Config now lives in CSS via `@theme` design tokens:

```css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
```

Tokens generate utilities automatically (e.g. `--color-avocado-500` → `bg-avocado-500`).

## 5. Is `tailwind.config.ts` still used?

**No — not for new v4 projects.** v4 is CSS-first; shadcn/ui leaves `tailwind.config` blank in `components.json`. A legacy JS config can still be loaded for backward compatibility only:

```css
@config "../../tailwind.config.js";
```

Compatibility caveats:

- `corePlugins`, `safelist`, and `separator` options are **not supported** in v4. To safelist, use `@source inline("...")`.
- Legacy JS plugins load via `@plugin "@tailwindcss/typography";`.
- The `theme()` CSS function is deprecated → use CSS theme variables (`var(--color-*)`) instead.
- CSS-defined values take precedence over JS-config values where they conflict.

So: new Next.js 15 + Tailwind v4 + shadcn project = **no `tailwind.config.ts` file at all**.
