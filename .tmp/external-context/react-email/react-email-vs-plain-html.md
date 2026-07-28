---
source: Context7 API (/resend/react-email) + resend.com/docs/send-with-nodejs
library: React Email
package: react-email (@react-email/components)
topic: react-email with Resend — is it needed for a contact form?
fetched: 2026-07-21T12:00:00Z
official_docs: https://react.email/docs/introduction
tech_stack: Next.js 15 App Router + Resend
---

# react-email vs plain HTML string — Contact Form Verdict

## Verdict

**For a simple contact-form notification email, a plain `html` template string is completely fine and officially supported** — Resend's own docs call sending with the `html` parameter "the easiest way to send an email". react-email is **optional, not required**.

Reach for react-email when you want:
- Reusable, branded templates (layout components, design system)
- Cross-client compatibility handled for you (tables/inlining quirks, dark mode)
- A template preview/dev server (`npx react-email dev`)

Both approaches are first-class in the Resend SDK.

## Option A — Plain HTML string (sufficient for contact form)

```ts
await resend.emails.send({
  from: 'Contact Form <onboarding@resend.dev>',
  to: ['you@yourdomain.com'],
  subject: `New message from ${name}`,
  html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  // text auto-generated from html if omitted
});
```

> Sanitize/escape user input before interpolating into HTML (XSS in email clients).

## Option B — react-email component via `react` param

Resend renders the component automatically (Node.js only):

```tsx
import { Resend } from 'resend';
import { WelcomeEmail } from './emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: ['user@example.com'],
  subject: 'Welcome to Acme',
  react: WelcomeEmail({ name: 'John' }), // Resend docs: function call form
  // react-email's own docs also show JSX: react: <WelcomeEmail name="John" />
});
```

## react-email building blocks (if adopted)

Template with components:

```jsx
import * as React from 'react';
import { Html, Button, Hr, Text } from 'react-email';

export function MyTemplate(props) {
  return (
    <Html lang="en">
      <Text>Some title</Text>
      <Hr />
      <Button href="https://example.com">Click me</Button>
    </Html>
  );
}
```

Manual render to string (e.g. to pass `html` yourself or generate plain text):

```tsx
import { render } from 'react-email';

const html = await render(<WelcomeEmail name="John" />);
const text = await render(<WelcomeEmail name="John" />, { plainText: true });
```

> Note: newer react-email versions split packages — components live in `@react-email/components` and `render` in `@react-email/render`. Check `npm install react-email @react-email/components` against the current docs at react.email.

## Constraint reminder

`html`, `text`, and `react` are mutually exclusive with Resend hosted `template`. Provide exactly one content source per `emails.send()` call.
