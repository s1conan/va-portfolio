---
source: Context7 API (/vercel/next.js) + official Next.js docs
library: Next.js
package: nextjs
topic: create-next-app setup + v14→v15 breaking changes
fetched: 2026-07-21T00:00:00Z
official_docs: https://nextjs.org/docs/app/getting-started/installation | https://nextjs.org/docs/app/guides/upgrading/version-15
---

# Next.js 15 — create-next-app & Breaking Changes from v14

> NOTE: As of mid-2026, Next.js 16.x is the current major (Context7 lists versions up to v16.2.x; the v15 upgrade guide page is served under docs version 16.2.10). Everything below applies to 15.x. In **Next.js 16, synchronous access to request APIs is fully removed** (no temporary sync fallback) — so write async from day one.

## 1. Create a new project

```bash
npx create-next-app@latest my-app
```

### Interactive prompts (v15)

```text
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

### Non-interactive flags (recommended for this stack)

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-npm
```

Key flags (from create-next-app CLI source):

| Flag | Effect |
|---|---|
| `--ts, --typescript` | TypeScript project (default) |
| `--tailwind` | Tailwind CSS config (default) |
| `--eslint` / `--biome` / `--no-eslint` | Linter choice |
| `--app` | App Router project |
| `--src-dir` | Code inside `src/` directory (app goes to `src/app`, alias points to `./src/*`) |
| `--turbopack` | Turbopack for `next dev` |
| `--import-alias <prefix/*>` | Import alias (default `@/*`) |
| `--react-compiler` | Enable React Compiler |
| `--empty` | Empty project (no boilerplate) |
| `--use-npm` / `--use-pnpm` / `--use-yarn` / `--use-bun` | Package manager |
| `--yes` | Use saved preferences/defaults for unprovided options |
| `--skip-install` | Skip installing packages |

Negated forms exist: `--no-eslint`, `--no-tailwind`, `--no-src-dir`, `--no-app`.

## 2. Breaking changes v14 → v15

### React 19 (minimum)

- Minimum `react` / `react-dom` is now **19**.
- `useFormState` → replaced by `useActionState` (old hook deprecated; new one exposes `pending` directly).
- `useFormStatus` now includes `data`, `method`, `action` keys.
- TypeScript users: also upgrade `@types/react` and `@types/react-dom`.

### Async Request APIs (BREAKING)

Previously synchronous request-time APIs are now **async**: `cookies()`, `headers()`, `draftMode()`, `params` (layout/page/route/default/metadata images), `searchParams` (page).

```tsx
// cookies / headers — BEFORE
const cookieStore = cookies()
const headersList = headers()

// AFTER
const cookieStore = await cookies()
const headersList = await headers()
```

```tsx
// params & searchParams are now Promises
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = await props.params
  const { query } = await props.searchParams
}

// Client components: unwrap with React's use()
'use client'
import { use } from 'react'
export default function Page(props: { params: Params; searchParams: SearchParams }) {
  const { slug } = use(props.params)
  const { query } = use(props.searchParams)
}

// Route handlers
export async function GET(request: Request, segmentData: { params: Params }) {
  const { slug } = await segmentData.params
}
```

- Codemod available: `npx @next/codemod@canary upgrade latest`
- In 15.x, temporary sync access still works with a dev warning (`UnsafeUnwrappedCookies` etc.). **Removed entirely in 16.**

### Caching defaults changed (BREAKING)

- **`fetch` requests are no longer cached by default.** Opt in per-request with `{ cache: 'force-cache' }`, or per segment with `export const fetchCache = 'default-cache'`.
- **GET Route Handlers are no longer cached by default.** Opt in with `export const dynamic = 'force-static'`.
- **Client Router Cache no longer reuses page segments** on `<Link>`/`useRouter` navigation (layouts and loading states still cached; back/forward nav still uses cache). Opt back in via:

```js
// next.config.js
const nextConfig = {
  experimental: {
    staleTimes: { dynamic: 30, static: 180 },
  },
}
```

### Other changes

- `runtime = 'experimental-edge'` removed → use `'edge'` (codemod available).
- `@next/font` package removed → use built-in `next/font`.
- `experimental.bundlePagesExternals` → stable `bundlePagesRouterDependencies`.
- `experimental.serverComponentsExternalPackages` → stable `serverExternalPackages`.
- Speed Insights auto-instrumentation removed (use `@vercel/speed-insights`).
- `NextRequest` `geo` and `ip` properties removed → use `@vercel/functions` `geolocation()`/`ipAddress()` on Vercel.

## 3. Manual install (if not using create-next-app)

```bash
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

Peer-dep warnings with React 19: update react/react-dom to suggested versions, or use `--force` / `--legacy-peer-deps`.
