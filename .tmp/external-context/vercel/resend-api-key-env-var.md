---
source: vercel.com official docs
library: Vercel
package: vercel (platform)
topic: Adding RESEND_API_KEY environment variable for deployment
fetched: 2026-07-21T12:00:00Z
official_docs: https://vercel.com/docs/environment-variables/managing-environment-variables
tech_stack: Next.js 15 App Router deployed on Vercel
---

# Vercel — Adding `RESEND_API_KEY`

## Dashboard steps

1. From the Vercel dashboard, select your **project**.
2. Go to **Settings → Environment Variables** (sidebar).
3. Enter the **Name**: `RESEND_API_KEY` → available as `process.env.RESEND_API_KEY` in server code.
4. Enter the **Value**: `re_xxxxxxxxx` (encrypted at rest — safe for secrets).
5. Select the **environment(s)**: Production / Preview / Development.
6. Click **Save**.
7. **Redeploy** — env var changes only apply to new deployments, never retroactively.

## Environments

| Environment | Applies to |
| ----------- | ---------- |
| Production  | Deploys of the production branch (usually `main`) or `vercel --prod` |
| Preview     | All non-production branch deploys (can be branch-specific; branch vars override generic preview vars) |
| Development | Local dev via `vercel dev` or `vercel env pull` |

## Local development

```sh
# .env.local (project root, git-ignored)
RESEND_API_KEY=re_xxxxxxxxx
```

- `vercel env pull` — downloads Development env vars from the project into a local `.env` file.
- `vercel dev` — automatically loads Development env vars into memory (no pull needed).

## Next.js-specific notes

- **No `NEXT_PUBLIC_` prefix** — the key stays server-only. Server Actions and Route Handlers can read it; it is never bundled to the browser.
- Team-level env vars are available to all projects in the team; project-level vars override for that project.
- Size limits: 64 KB total per deployment (Node.js runtime); edge runtime limited to 5 KB per variable — irrelevant for a Resend key but noted for completeness.
- The Resend Vercel integration (vercel.com/integrations/resend) can auto-provision `RESEND_API_KEY` into project settings as an alternative to manual entry.
