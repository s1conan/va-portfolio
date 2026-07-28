---
source: Context7 API + tailwindcss.com/docs/theme + tailwindcss.com/docs/animation
library: Tailwind CSS
package: tailwindcss
topic: Custom animations — --animate-* variables with @keyframes inside @theme
fetched: 2026-07-21T00:00:00Z
official_docs: https://tailwindcss.com/docs/theme#defining-animation-keyframes
---

# Custom Animations in Tailwind CSS v4 — `--animate-*` + `@keyframes` inside `@theme`

## Official pattern (theme.mdx)

Define the `@keyframes` rules for your `--animate-*` theme variables **within `@theme`** to
include them in your generated CSS:

```css
@import "tailwindcss";

@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;

  @keyframes fade-in-scale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

Usage in HTML:

```html
<div class="animate-fade-in-scale">...</div>
```

## Official example (animation.mdx) — "wiggle"

```css
@theme {
  --animate-wiggle: wiggle 1s ease-in-out infinite;

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
}
```

Usage: `<div class="animate-wiggle">...</div>`

## Neo-brutalist marquee example (assembled from documented syntax)

```css
@import "tailwindcss";

@theme {
  --animate-marquee: marquee 30s linear infinite;
  --animate-marquee-reverse: marquee-reverse 30s linear infinite;

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes marquee-reverse {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }
}
```

Usage:

```html
<div class="overflow-hidden">
  <div class="flex w-max animate-marquee">
    <!-- duplicate content twice for a seamless -50% loop -->
  </div>
</div>
```

## How Tailwind's own defaults do it (theme.css)

```css
@theme {
  --animate-spin: spin 1s linear infinite;
  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bounce: bounce 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  /* ... */
}
```

## Key rules / gotchas

1. **Keyframes inside `@theme` are only emitted if their `--animate-*` variable is used.**
   From the docs: "If you want your custom `@keyframes` rules to always be included even when
   not adding an `--animate-*` theme variable, define them **outside** of `@theme` instead."
2. The variable VALUE is a standard CSS `animation` shorthand:
   `--animate-<name>: <keyframe-name> <duration> <timing-function> <iteration-count>;`
   You can also add delay/direction/fill-mode per the CSS animation shorthand spec.
3. The utility name comes from the variable name: `--animate-marquee` → `animate-marquee`.
4. Works with variants like any utility: `hover:animate-marquee`, `motion-safe:animate-marquee`
   (recommended for accessibility — pair marquee-type animations with
   `motion-reduce:animate-none`).
5. Keyframes can reference theme variables in their declarations (e.g.
   `background-color: var(--color-sky-500)`), and theme variables are available on `:root` in
   compiled output.
