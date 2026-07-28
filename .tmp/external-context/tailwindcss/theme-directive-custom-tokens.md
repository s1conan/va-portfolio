---
source: Context7 API + tailwindcss.com/docs/theme
library: Tailwind CSS
package: tailwindcss
topic: @theme directive — custom design tokens (colors, fonts, shadows, spacing)
fetched: 2026-07-21T00:00:00Z
official_docs: https://tailwindcss.com/docs/theme
---

# @theme Directive — CSS-First Theme Customization (Tailwind CSS v4)

Theme variables are special CSS variables defined with the `@theme` directive that tell Tailwind
which utility classes to generate. Defining `--color-mint-500` creates `bg-mint-500`,
`text-mint-500`, `fill-mint-500`, etc. Tailwind also emits them as regular CSS variables on
`:root` so you can reference them in arbitrary values, custom CSS, or inline styles.

**Why `@theme` instead of `:root`?** Theme variables aren't just CSS variables — they generate
utilities. Use `@theme` when a token should map to utility classes; use `:root` for plain CSS
variables with no utilities (e.g. shadcn raw tokens — see shadcn-ui-coexistence.md).

## Theme variable namespaces

| Namespace | Utilities / variants generated |
|---|---|
| `--color-*` | Color utilities like `bg-red-500`, `text-sky-300` |
| `--font-*` | Font family utilities like `font-sans` |
| `--text-*` | Font size utilities like `text-xl` |
| `--font-weight-*` | Font weight utilities like `font-bold` |
| `--tracking-*` | Letter spacing like `tracking-wide` |
| `--leading-*` | Line height like `leading-tight` |
| `--breakpoint-*` | Responsive variants like `sm:*` |
| `--container-*` | Container query variants like `@sm:*`, size utils like `max-w-md` |
| `--spacing-*` | Spacing/sizing utilities like `px-4`, `max-h-16` |
| `--radius-*` | Border radius like `rounded-sm` |
| `--shadow-*` | Box shadow like `shadow-md` |
| `--inset-shadow-*` | Inset box shadow like `inset-shadow-xs` |
| `--drop-shadow-*` | Drop shadow filter like `drop-shadow-md` |
| `--blur-*` | Blur filter like `blur-md` |
| `--perspective-*` | Perspective like `perspective-near` |
| `--aspect-*` | Aspect ratio like `aspect-video` |
| `--ease-*` | Timing functions like `ease-out` |
| `--animate-*` | Animation utilities like `animate-spin` |

You can name variables anything within a namespace; the matching utility name is derived from
the variable name.

## Official example (adding-custom-styles docs)

```css
@theme {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 120rem;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

## Neo-brutalist token example (assembled from documented syntax)

```css
@import "tailwindcss";

@theme {
  /* Colors → bg-brutal-black, text-brutal-yellow, border-brutal-black, fill-brutal-yellow ... */
  --color-brutal-black: #000000;
  --color-brutal-white: #ffffff;
  --color-brutal-yellow: #FFD700;
  --color-brutal-pink: #FF6B9D;
  --color-brutal-blue: #4D96FF;

  /* Font families → font-display, font-mono (overrides default --font-mono) */
  --font-display: "Archivo Black", "Arial Black", sans-serif;
  --font-mono: "Space Mono", ui-monospace, monospace;

  /* Box shadows → shadow-brutal, shadow-brutal-sm, shadow-brutal-lg */
  --shadow-brutal: 8px 8px 0px 0px #000;
  --shadow-brutal-sm: 4px 4px 0px 0px #000;
  --shadow-brutal-lg: 12px 12px 0px 0px #000;
  --shadow-brutal-yellow: 8px 8px 0px 0px #FFD700;

  /* Spacing tokens → p-brutal, m-brutal-lg, gap-brutal ... */
  --spacing-brutal: 1.25rem;
  --spacing-brutal-lg: 2.5rem;
}
```

Note on spacing: the default spacing scale in v4 is derived from a single `--spacing: 0.25rem`
base value — every `p-4`, `mt-2` etc. is a multiple of it. Change the whole scale with one line:

```css
@theme {
  --spacing: 0.25rem; /* default; e.g. set to 4px or 0.5rem to rescale everything */
}
```

Named spacing tokens like `--spacing-brutal` above add named utilities (`p-brutal`) alongside
the numeric scale.

## Overriding defaults

Override a single default variable by redefining it:

```css
@theme {
  --breakpoint-sm: 30rem; /* sm:* now triggers at 30rem instead of 40rem */
}
```

Completely clear an entire namespace with the asterisk + `initial` syntax — all default
utilities in that namespace are removed:

```css
@import "tailwindcss";

@theme {
  --color-*: initial; /* removes bg-red-500 etc. */
  --color-white: #fff;
  --color-purple: #3f3cbb;
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
  --color-bermuda: #78dcca;
}
```

Disable the ENTIRE default theme and use only your tokens:

```css
@import "tailwindcss";

@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
  --color-coral: oklch(0.74 0.17 40.24);
}
```

## @theme options

- `@theme inline` — for theme variables that REFERENCE other variables; the utility uses the
  referenced value directly instead of `var(--the-theme-variable)`. Required for the shadcn
  pattern and next/font CSS variables:

```css
@theme inline {
  --font-sans: var(--font-inter);
}
/* compiled: .font-sans { font-family: var(--font-inter); } */
```

Without `inline`, utilities may resolve to unexpected values due to where CSS variables resolve
in the tree.

- `@theme static` — always emit ALL CSS variables in output (by default only used variables
  are generated).

## Using tokens elsewhere

Compiled output puts theme variables on `:root`, so you can use them in:

```css
/* custom CSS */
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);      /* --spacing() function: multiples of the spacing base */
    box-shadow: var(--shadow-xl);
  }
}
```

```html
<!-- arbitrary values -->
<div class="rounded-[calc(var(--radius-xl)-1px)]"></div>
<!-- custom-property shorthand: same as fill-[var(--my-brand-color)] -->
<div class="fill-(--my-brand-color)"></div>
```

```js
// JavaScript
let styles = getComputedStyle(document.documentElement);
let shadow = styles.getPropertyValue("--shadow-xl");
```

## Rules / gotchas

- Theme variables must be defined top-level inside `@theme`, not nested under selectors or
  media queries.
- Default theme comes from `@import "tailwindcss"` which imports `theme.css` (layer theme),
  `preflight.css` (layer base), `utilities.css` (layer utilities).
- Default `--font-sans/serif/mono`, `--radius-*`, `--shadow-*`, `--animate-*` etc. all live in
  the default `@theme` — redefining the same name overrides them.
- Share themes across projects by putting `@theme` in its own CSS file and `@import`-ing it.
