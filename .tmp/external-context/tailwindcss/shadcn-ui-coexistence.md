---
source: ui.shadcn.com/docs/theming + tailwindcss.com/docs/theme (@theme inline)
library: Tailwind CSS + shadcn/ui
package: tailwindcss
topic: shadcn/ui CSS variables coexisting with custom @theme tokens in globals.css
fetched: 2026-07-21T00:00:00Z
official_docs: https://ui.shadcn.com/docs/theming
---

# shadcn/ui CSS Variables + Custom @theme Tokens (Tailwind v4)

## The coexistence architecture

Two layers of variables in `globals.css`:

1. **Raw semantic tokens** in `:root` and `.dark` — plain CSS variables, NO utilities generated
   (e.g. `--background`, `--primary`, `--radius`). Values change per color scheme.
2. **`@theme inline` mapping** — exposes those raw tokens to Tailwind as utilities by
   referencing them: `--color-background: var(--background)` → `bg-background`,
   `text-foreground`, `border-border`, `ring-ring`, etc.

`@theme inline` is required (not plain `@theme`) because these variables REFERENCE other
variables. From the Tailwind docs: without `inline`, utilities resolve `var()` at the wrong
place in the tree and can fall back to unexpected values. With `inline` the compiled utility
directly embeds the referenced variable:

```css
@theme inline {
  --font-sans: var(--font-inter);
}
/* compiled: .font-sans { font-family: var(--font-inter); } */
```

## Official shadcn pattern (current default theme scaffold)

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* radius scale derived from the single --radius base token */
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... same tokens, dark values ... */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Adding YOUR custom tokens alongside shadcn's (official "Adding New Tokens" pattern)

Define raw values under `:root` / `.dark`, then expose via `@theme inline`:

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Now `bg-warning` / `text-warning-foreground` work, and they flip with dark mode automatically.

## Coexistence rules for a neo-brutalist system

1. **Static brand tokens that never change with dark mode** → define directly in plain
   `@theme` (not `inline`), since they don't reference other variables:

```css
@theme {
  --color-brutal-black: #000000;
  --color-brutal-yellow: #ffd700;
  --shadow-brutal: 8px 8px 0px 0px #000;
  --animate-marquee: marquee 30s linear infinite;

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
}
```

2. **Theme-aware tokens (different in light/dark)** → raw values in `:root`/`.dark`, mapped in
   `@theme inline`. You can point shadcn's semantic tokens AT your brutal palette:

```css
:root {
  --radius: 0rem;                      /* sharp corners everywhere */
  --background: #ffffff;
  --foreground: #000000;
  --primary: #ffd700;                  /* brutal yellow */
  --primary-foreground: #000000;
  --border: #000000;                   /* brutal black borders */
  --input: #000000;
  --ring: #000000;
  /* ... */
}
```

3. **Multiple `@theme` / `@theme inline` blocks are fine** — they merge. Keep shadcn's
   `inline` block untouched and add your own `@theme` block for brutal tokens.
4. **Dark mode variant**: current shadcn scaffolds use
   `@custom-variant dark (&:is(.dark *));` so `dark:` utilities respond to the `.dark` class.
5. **Base layer** applies shadcn tokens globally:
   `@layer base { * { @apply border-border outline-ring/50; } body { @apply bg-background text-foreground; } }`
6. `components.json` must have `"tailwind": { "cssVariables": true }` (the default) for this
   pattern.

## next/font CSS variables → @theme inline

`next/font` exposes fonts as CSS variables via a generated className; map those variables into
the `--font-*` namespace with `@theme inline` (same referencing rule as shadcn tokens):

```css
@theme inline {
  --font-display: var(--font-archivo-black), "Arial Black", sans-serif;
  --font-mono: var(--font-space-mono), ui-monospace, monospace;
}
```

(The `var(--font-archivo-black)` / `var(--font-space-mono)` variables are defined by adding the
font's `.variable` className to `<html>` or `<body>` in the Next.js layout.) Then
`font-display` / `font-mono` utilities use the next/font-loaded fonts. This is exactly the
mechanism the Tailwind docs show for `--font-sans: var(--font-inter)`.
