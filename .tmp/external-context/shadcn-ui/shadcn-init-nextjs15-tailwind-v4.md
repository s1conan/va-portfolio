---
source: Context7 API (/shadcn-ui/ui) + official ui.shadcn.com docs
library: shadcn/ui
package: shadcn-ui
topic: init flow on Next.js 15 + Tailwind CSS v4, components.json, adding components, React 19 peer deps
fetched: 2026-07-21T00:00:00Z
official_docs: https://ui.shadcn.com/docs/installation/next | https://ui.shadcn.com/docs/components-json
---

# shadcn/ui (latest CLI) — Next.js 15 + Tailwind CSS v4

## 1. Init flow

### Option A — scaffold a new project via shadcn CLI

```bash
npx shadcn@latest init -t next
# non-interactive defaults: --template=next --preset=base-nova
npx shadcn@latest init --defaults
```

CLI options (`init` command, from source):

| Flag | Values / effect |
|---|---|
| `-t, --template <template>` | `next`, `start`, `vite`, `react-router`, `laravel`, `astro` |
| `-b, --base <base>` | Component library: `base`, `radix`, `aria` |
| `-p, --preset [name]` | Preset configuration |
| `-d, --defaults` | `--template=next --preset=base-nova` |
| `--monorepo` / `--no-monorepo` | Scaffold as monorepo |
| `-y, --yes` | Skip confirmation prompt (default true) |
| `-f, --force` | Overwrite existing configuration |
| `-c, --cwd <cwd>` | Working directory |
| `--css-variables` / `--no-css-variables` | CSS-variable theming (default true) |
| `--rtl` / `--no-rtl` | RTL support |
| `--reinstall` | Re-install existing UI components |

On an **existing** Next.js App Router + Tailwind v4 project, just run `npx shadcn@latest init` — it auto-detects Next.js from `next.config.*` and the `app/` directory.

### Option B — existing create-next-app project

```bash
npx create-next-app@latest          # choose recommended defaults (Tailwind, App Router, @/* alias)
# with src dir: npx create-next-app@latest --src-dir  → app in src/app, alias @/* → ./src/*

npx shadcn@latest init
```

If adding to an older/custom app: ensure Tailwind v4 is installed and `tsconfig.json` has the alias:

```json
{ "compilerOptions": { "paths": { "@/*": ["./*"] } } }
// with --src-dir: "@/*": ["./src/*"]
```

### React 19 peer dependencies (STILL RELEVANT for npm)

When using **npm** with React 19, init prompts:

```text
It looks like you are using React 19.
Some packages may fail to install due to peer dependency issues (see https://ui.shadcn.com/react-19).

? How would you like to proceed?
❯   Use --force
    Use --legacy-peer-deps
```

Choose **`--legacy-peer-deps`** (or use pnpm, which handles this more gracefully).

## 2. Tailwind CSS v4 specifics

- `components.json` → `tailwind.config` field is **left blank** for v4 (Tailwind is configured entirely via CSS).
- Base `globals.css` is just:

```css
@import "tailwindcss";
```

- Requires `postcss.config.mjs` with the `@tailwindcss/postcss` plugin and devDeps `tailwindcss: ^4` + `@tailwindcss/postcss: ^4`.
- **No `tailwind.config.*` file exists in v4.**

## 3. components.json options

Created by `shadcn init`. Only required when using the CLI (not for copy-paste).

| Field | Notes |
|---|---|
| `$schema` | `https://ui.shadcn.com/schema.json` |
| `style` | `"new-york"` — the `default` style is **deprecated**. Cannot be changed after init. |
| `tailwind.config` | Path to config file. **Blank for Tailwind v4.** |
| `tailwind.css` | Path to the CSS file importing Tailwind (e.g. `app/globals.css`) |
| `tailwind.baseColor` | `neutral` \| `stone` \| `zinc` \| `mauve` \| `olive` \| `mist` \| `taupe`. Cannot be changed after init. |
| `tailwind.cssVariables` | `true` (recommended) → semantic tokens (`background`, `foreground`, `primary`, …). `false` → inline utilities. Cannot change without reinstalling components. |
| `tailwind.prefix` | e.g. `"tw-"` prefix on utility classes |
| `rsc` | `true` → CLI adds `'use client'` to client components |
| `tsx` | `false` → generate `.jsx` instead |
| `aliases.utils` | e.g. `@/lib/utils` |
| `aliases.components` | e.g. `@/components` |
| `aliases.ui` | Where `ui` components go, e.g. `@/components/ui` |
| `aliases.lib` | e.g. `@/lib` |
| `aliases.hooks` | e.g. `@/hooks` |
| `registries` | Namespaced registries, e.g. `{ "@v0": "https://v0.dev/chat/b/{name}" }`; supports auth headers + `${ENV_VAR}` expansion |

Aliases can be backed by `tsconfig.json` `paths` or `package.json#imports` (needs `"moduleResolution": "bundler"` + `"resolvePackageJsonImports": true`).

## 4. Adding components

```bash
npx shadcn@latest add button input textarea select dialog label sonner
```

`add` flags: `-y/--yes` (skip prompt), `-o/--overwrite`, `-a/--all`, `-c/--cwd`.

- Monorepo: run from `apps/web` or `npx shadcn@latest add button -c apps/web`.
- Namespaced registries: `npx shadcn@latest add @v0/dashboard`.
- **Sonner** is the toast component (the old `toast`/`use-toast` is deprecated in favor of `sonner`).

Usage:

```tsx
import { Button } from "@/components/ui/button"
```
