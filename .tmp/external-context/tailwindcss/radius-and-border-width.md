---
source: tailwindcss.com/docs/theme + tailwindcss.com/docs/border-width + ui.shadcn.com/docs/theming
library: Tailwind CSS
package: tailwindcss
topic: Border radius defaults (sharp corners) and border width tokens in v4
fetched: 2026-07-21T00:00:00Z
official_docs: https://tailwindcss.com/docs/theme
---

# Border Radius & Border Width Customization (Tailwind CSS v4)

## Default --radius-* scale (from default theme)

```css
@theme {
  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;
}
```

These drive `rounded-xs` … `rounded-4xl` (plus `rounded` = 0.25rem default and
`rounded-none` = 0, `rounded-full` = 9999px which are static utilities).

## Strategy 1 — Global sharp corners via shadcn's `--radius` base token

If using shadcn/ui, its radius scale is DERIVED from one base token in `:root`
(see shadcn-ui-coexistence.md). Setting the base to `0rem` zeroes the entire scale:

```css
:root {
  --radius: 0rem; /* default is 0.625rem */
}
```

Since `@theme inline` maps:

```css
@theme inline {
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  /* ... */
}
```

…every `rounded-sm/md/lg/xl` used by shadcn components (Button, Card, Input, Popover)
resolves to `0`. This is the documented, single-source-of-truth way — "Changing `--radius`
updates the entire radius scale."

## Strategy 2 — Override the --radius-* namespace directly in @theme

For non-shadcn setups (or to hard-code values), redefine the tokens in plain `@theme`:

```css
@theme {
  --radius-xs: 0rem;
  --radius-sm: 0rem;
  --radius-md: 0rem;
  --radius-lg: 0rem;
  --radius-xl: 0rem;
  --radius-2xl: 0rem;
  --radius-3xl: 0rem;
  --radius-4xl: 0rem;
}
```

Or wipe the whole namespace and keep only what you need (asterisk + `initial` syntax):

```css
@theme {
  --radius-*: initial; /* removes all default rounded-* token utilities */
  --radius-none: 0rem;
  --radius-brutal: 0rem; /* named escape hatch if you want semantics */
}
```

Note: `rounded` (bare) and `rounded-none` / `rounded-full` are static utilities and are NOT
driven by `--radius-*` tokens — `rounded-none` still works after clearing the namespace;
bare `rounded` falls back to its own default (0.25rem) so prefer `rounded-none` explicitly.

## Base-layer enforcement (belt and braces)

To guarantee sharp corners even on third-party markup, add a base style:

```css
@layer base {
  * {
    border-radius: 0;
  }
}
```

(This is a plain CSS approach, not a Tailwind directive — the theme-token approaches above are
the idiomatic v4 way; use this only if components hard-code radius values.)

## Border width in v4 — no theme namespace needed

From the official border-width docs: `border-<number>` is a DYNAMIC utility in v4 — any number
resolves to pixels:

| Class | Styles |
|---|---|
| `border` | `border-width: 1px;` |
| `border-<number>` | `border-width: <number>px;` |
| `border-(length:<custom-property>)` | `border-width: var(<custom-property>);` |
| `border-[<value>]` | `border-width: <value>;` |

Same for per-side and logical-property variants: `border-t-<number>`, `border-x-<number>`,
`border-s-<number>`, `border-bs-<number>`, `divide-x-<number>`, `divide-y-<number>`, etc.

So for a brutalist system, `border-2`, `border-4`, `border-8` (and any other integer like
`border-6`) already work out of the box — there is no `--border-*` theme namespace for widths
to define. (Note: `--border-*` IS used by shadcn only as the raw COLOR token `--border`, i.e.
`--color-border: var(--border)` — unrelated to widths.)

Custom / variable-driven widths:

```html
<div class="border-[3px]"></div>
<div class="border-(length:--my-border-width)"></div>
```

### Named border-width tokens via @utility (if you want semantic names)

Since widths aren't theme-driven, define named utilities when you want token semantics:

```css
@utility border-brutal {
  border-width: 4px;
}

/* or the combined variant from utility-directive.md */
@utility brutal-border {
  border-width: 4px;
  border-style: solid;
  border-color: var(--color-brutal-black);
}
```

## Gotchas

- Preflight (Tailwind's base reset) sets `border: 0 solid` on all elements — width utilities
  only take visible effect with a border style/color, which preflight handles via
  `border-style: solid` default in v4? No — preflight sets `border: 0 solid`, so style IS
  solid; you still need a color (shadcn's base layer does `* { @apply border-border }`).
  Without shadcn, add your own base default or always pair `border-4` with a color utility.
- `divide-*` and logical-property widths (`border-s`, `border-bs`) follow the same dynamic
  `<number>px` rule.
