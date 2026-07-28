---
source: Context7 API + tailwindcss.com/docs/adding-custom-styles + tailwindcss.com/docs/functions-and-directives
library: Tailwind CSS
package: tailwindcss
topic: @utility directive — custom utilities (simple, complex, functional)
fetched: 2026-07-21T00:00:00Z
official_docs: https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities
---

# @utility Directive — Custom Utilities (Tailwind CSS v4)

`@utility` replaces the v3 `@layer utilities` approach. Custom utilities are automatically
inserted into the `utilities` layer alongside built-in utilities, and **automatically work with
variants** like `hover:`, `focus:`, `lg:`, `dark:` — no extra config needed.

## Simple utilities

```css
@utility content-auto {
  content-visibility: auto;
}
```

Usage:

```html
<div class="content-auto">...</div>
<div class="hover:content-auto">...</div> <!-- variants just work -->
```

## Neo-brutalist example — combined utility (assembled from documented syntax)

A `.brutal-border` utility combining border width + color (replaces `border-4 border-black`):

```css
@utility brutal-border {
  border-width: 4px;
  border-style: solid;
  border-color: var(--color-brutal-black);
}
```

Usage: `<div class="brutal-border">...</div>` — and `hover:brutal-border`, `md:brutal-border` work.

Notes on the example:
- Inside `@utility` you write plain CSS declarations; reference theme tokens with
  `var(--color-...)` / `var(--shadow-...)` etc. (they're emitted on `:root`).
- v4 has no `@apply`-inside-`@utility` requirement — plain declarations are the documented form.

More brutalist utilities:

```css
@utility brutal-shadow {
  box-shadow: var(--shadow-brutal);
}

@utility brutal-press {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px 0px #000;
}
```

## Complex utilities — nesting

If the utility is more complex than a single class name's declarations, use nesting:

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}
```

## Functional utilities — accepting arguments

Use the special `--value()` function to resolve the utility's argument:

```css
@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

### Matching theme values — `--value(--theme-key-*)`

```css
@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

Matches `tab-2`, `tab-4`, `tab-github`.

### Bare values — `--value({type})`

```css
@utility tab-* {
  tab-size: --value(integer);
}
```

Matches `tab-1`, `tab-76`. Available bare types: `number`, `integer`, `ratio`, `percentage`.

### Literal values — `--value('literal')` (quotes)

```css
@utility tab-* {
  tab-size: --value("inherit", "initial", "unset");
}
```

### Arbitrary values — `--value([{type}])` (square brackets)

```css
@utility tab-* {
  tab-size: --value([integer]);
}
```

Matches `tab-[1]`, `tab-[76]`. Arbitrary types include `absolute-size`, `angle`, `color`,
`length`, `percentage`, `url`, `*`, and more.

### Combining all forms

Multiple declarations; failing resolutions are omitted from output:

```css
@utility tab-* {
  tab-size: --value([integer]);
  tab-size: --value(integer);
  tab-size: --value(--tab-size-*);
}

/* or multiple args resolved left-to-right */
@utility tab-* {
  tab-size: --value(--tab-size-*, integer, [integer]);
}
```

### Default values — `--default()`

```css
@utility tab-* {
  tab-size: --value(integer, --default(4));
}
```

`tab` → `tab-size: 4`; `tab-2` → `tab-size: 2`.

### Negative values

Register separate positive and negative utilities:

```css
@utility inset-* {
  inset: --spacing(--value(integer));
  inset: --value([percentage], [length]);
}

@utility -inset-* {
  inset: --spacing(--value(integer) * -1);
  inset: calc(--value([percentage], [length]) * -1);
}
```

### Modifiers (`/` suffix) — `--modifier()`

```css
@utility text-* {
  font-size: --value(--text-*, [length]);
  line-height: --modifier(--leading-*, [length], [*]);
}
```

With default when no modifier: `line-height: --modifier(integer, --default(1));`

### Fractions

```css
@utility aspect-* {
  aspect-ratio: --value(--aspect-ratio-*, ratio, [ratio]);
}
```

Matches `aspect-square`, `aspect-3/4`, `aspect-[7/9]`.

## Related: custom variants (for completeness)

```css
@custom-variant theme-midnight {
  &:where([data-theme="midnight"] *) {
    @slot;
  }
}

/* shorthand */
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Usage: `<button class="theme-midnight:bg-black">`.

## Related: @variant directive in custom CSS

```css
.my-element {
  background: white;

  @variant dark {
    background: black;
  }

  @variant hover, focus {
    background: gray;
  }
}
```

## Migration note (v3 → v4)

```css
/* v3 */
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}

/* v4 */
@utility tab-4 {
  tab-size: 4;
}
```

## Gotchas

- `@utility` names must be valid utility names (the docs use kebab-case; the name is what you
  type in HTML).
- Use `@utility` (not `@layer utilities`) so the utility works with variants and is sorted
  correctly with built-ins.
- For one-off component-like classes that should be overridable by utilities, use
  `@layer components` instead (e.g. `.card`) — `@utility` is for utility-class semantics.
