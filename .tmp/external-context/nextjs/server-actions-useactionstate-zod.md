---
source: Context7 API (/vercel/next.js v15.1.11) + nextjs.org official docs
library: Next.js
package: next (v15.x, App Router, React 19)
topic: Server Actions + useActionState + zod validation pattern for forms
fetched: 2026-07-21T12:00:00Z
official_docs: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
tech_stack: Next.js 15 App Router, React 19, TypeScript, zod
---

# Server Actions + `useActionState` + zod — Exact Patterns (Next.js 15 / React 19)

## 1. `'use server'` module pattern

Place the directive at the top of a dedicated file; every exported async function becomes a Server Action callable from Client and Server Components:

```ts
// app/actions/contact.ts
'use server'

export async function sendContactEmail(/* ... */) {}
```

## 2. Action signature for `useActionState`

When bound via `useActionState`, the action receives **previous state first, then FormData**:

```ts
export async function signup(state: FormState, formData: FormData) {
  // ...
}
```

## 3. zod schema + validation (exact doc pattern)

```ts
// app/lib/definitions.ts
import * as z from 'zod'

export const SignupFormSchema = z.object({
  name: z.string().min(2, { error: 'Name must be at least 2 characters long.' }).trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string().min(8, { error: 'Be at least 8 characters long' }).trim(),
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
```

> For a contact form, swap fields: `name`, `email`, `message` (and matching keys in `FormState.errors`). You can also extend the state with a success flag, e.g. `{ success?: boolean; message?: string; errors?: {...} } | undefined` — the state shape is user-defined.

## 4. Server Action with `safeParse` → `fieldErrors` (exact doc pattern)

```ts
import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // Return early if invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // validatedFields.data is now typed — call provider/db here...
  // On failure: return { message: 'An error occurred.' }
  // On success: return { message: 'Success' } (or redirect())
}
```

Key points:
- `schema.safeParse({ field: formData.get('field'), ... })` — never throws.
- `validatedFields.error.flatten().fieldErrors` → `{ fieldName: string[] }` matching `FormState['errors']`.
- Treat Server Actions as public endpoints: always validate server-side, even with client validation.

## 5. Client form component (React 19 `useActionState`)

```tsx
'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  )
}
```

### `useActionState` signature (React 19)

```ts
const [state, formAction, pending] = useActionState(action, initialState)
// state       — last value returned by the action (initialState before first submit)
// formAction  — pass to <form action={formAction}>
// pending     — true while the action is executing (built-in loading state)
```

## 6. `useActionState` vs `useTransition`

- With `<form action={...}>`, **`useActionState` alone is sufficient** — `pending` replaces the need for `useTransition`.
- `useTransition` is only needed when invoking an action outside a form submission (e.g. `onClick` handlers): `startTransition(() => action())`.
- Alternative for pending: `useFormStatus` (`react-dom`) inside a **child component** of the form — in React 19 its returned object also includes `data`, `method`, `action`.

## 7. Success/error state shape for a contact form

Discriminated by optional keys (doc-derived):

```ts
export type ContactFormState =
  | {
      errors?: { name?: string[]; email?: string[]; message?: string[] }
      message?: string   // success OR top-level error message
    }
  | undefined

// Validation failure:  { errors: { email: ['Please enter a valid email.'] } }
// Send failure:        { message: 'Failed to send. Please try again.' }
// Success:             { message: 'Message sent!' }
```

## 8. Rendering Resend errors through the state

Inside the action, map the SDK's `{ data, error }` result onto the state:

```ts
const { error } = await resend.emails.send({ /* ... */ })
if (error) {
  return { message: 'Failed to send email. Please try again later.' }
}
return { message: 'Thanks! Your message has been sent.' }
```
