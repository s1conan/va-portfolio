---
source: Context7 API (/websites/resend) + resend.com official docs
library: Resend
package: resend
topic: Node.js SDK — install, API key, emails.send(), from/to rules
fetched: 2026-07-21T12:00:00Z
official_docs: https://resend.com/docs/send-with-nodejs
tech_stack: Next.js 15 App Router (Server Actions)
---

# Resend Node.js SDK — Send Email Reference

## Install

```bash
npm install resend
# or: yarn add resend / pnpm add resend / bun add resend
```

> Package name is `resend`, class is `Resend`. Do NOT import from `@resend/node`.

## API key setup

Store the key in an environment variable named `RESEND_API_KEY` (never hardcode):

```sh
# .env.local
RESEND_API_KEY=re_xxxxxxxxx
```

## Initialize client

```ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
```

## Basic send (HTML)

```ts
const { data, error } = await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: ['delivered@resend.dev'],
  subject: 'Hello World',
  html: '<strong>It works!</strong>',
});

if (error) {
  return console.error({ error });
}
console.log({ data }); // { id: '49a3999c-...' }
```

## `emails.send()` parameter reference

### Required

| Parameter | Type                 | Description                                                        |
| --------- | -------------------- | ------------------------------------------------------------------ |
| `from`    | `string`             | Sender address. Supports friendly format: `"Name <email@domain>"`  |
| `to`      | `string \| string[]` | Recipient(s). Max 50 addresses.                                    |
| `subject` | `string`             | Subject line.                                                      |

### Content (at least one required, mutually exclusive with `template`)

| Parameter | Type              | Description                                                |
| --------- | ----------------- | ---------------------------------------------------------- |
| `html`    | `string`          | HTML body.                                                 |
| `text`    | `string`          | Plain text version. Auto-generated from `html` if omitted. |
| `react`   | `React.ReactNode` | React Email component to render. Node.js only.             |

### Optional (camelCase — NOT snake_case)

`cc`, `bcc`, `replyTo`, `scheduledAt` (ISO 8601 or natural language), `headers`, `tags`, `attachments` (max 40MB total), `idempotencyKey` (unique per request, expires 24h, max 256 chars), `template.id` + `template.variables`.

## Response shape (discriminated union — does NOT throw)

```ts
// Success
{ data: { id: string }, error: null }
// Failure
{ data: null, error: { message: string, name: string } }
```

Always check `error` instead of `try/catch` (only network-level failures need `try/catch`).

## `from` address requirements

- **`onboarding@resend.dev`** — shared test address, **testing only**, never use in production.
- **Production** — you must verify your own domain at https://resend.com/domains and use it in `from` (e.g. `Contact <noreply@yourdomain.com>`).

## `to` restrictions / testing without a verified domain

Until you verify a domain, use Resend's test addresses to simulate events without harming domain reputation:

- `delivered@resend.dev` — successful delivery
- `bounced@resend.dev` — bounce
- `complained@resend.dev` — spam complaint
- `suppressed@resend.dev` — suppression list

On the free tier without a verified domain, sending is restricted to test/your-own addresses; a verified domain is required to send to arbitrary recipients. Free tier: 100 emails/day, 3,000/month (see resend.com/pricing).

## Rate limit

Default: **10 requests/second per team**. Exceeding returns HTTP `429`. Contact support for increases.

## React Email integration (summary)

```ts
const { data, error } = await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: ['delivered@resend.dev'],
  subject: 'Welcome',
  react: WelcomeEmail({ name: 'John' }), // Resend docs: pass as function call, not JSX
});
```

Resend renders the component automatically when `react` is passed. Do not combine `react`/`html`/`text` with `template`.
