---
name: Neo-Brutalist Industrial
colors:
  brutal-black: '#000000'
  brutal-white: '#FFFFFF'
  brutal-yellow: '#FFD700'
  brutal-gray: '#1A1A1A'
  selection-bg: '#FFD700'
  selection-text: '#000000'
typography:
  display:
    fontFamily: Space Grotesk
    fontWeight: '700'
    textTransform: uppercase
    letterSpacing: -0.05em
    lineHeight: '0.85'
    usage: Hero headlines, section titles, buttons, logo
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 6rem
    fontSizeDesktop: 8rem
    fontWeight: '900'
    lineHeight: '0.85'
    letterSpacing: -0.05em
    textTransform: uppercase
  section-title:
    fontFamily: Space Grotesk
    fontSize: 3rem
    fontSizeDesktop: 3.75rem
    fontWeight: '900'
    lineHeight: '1'
    letterSpacing: -0.05em
    textTransform: uppercase
  card-title:
    fontFamily: Space Grotesk
    fontSize: 1.875rem
    fontWeight: '900'
    lineHeight: '1'
    textTransform: uppercase
  mono-body:
    fontFamily: JetBrains Mono
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '700'
    textTransform: uppercase
    usage: Form labels, badges, meta info
  mono-tag:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '700'
    textTransform: uppercase
    usage: Stack tags, nav links, terminal output
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  2xl: 120px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
borders:
  width: 4px
  style: solid
  color: '#000000'
  variants:
    - brutal-border (all sides)
    - brutal-border-t (top)
    - brutal-border-r (right)
    - brutal-border-b (bottom)
    - brutal-border-l (left)
shadows:
  brutal: 8px 8px 0px 0px #000000
  brutal-hover: 4px 4px 0px 0px #000000
  brutal-yellow: 8px 8px 0px 0px #FFD700
radius: 0px
---

## Brand & Style

The design system is **Neo-Brutalism** applied to a Senior Web Developer's professional presence — raw, industrial, and unapologetically structural. The brand personality is confident and engineering-first: **"NO FLUFF. JUST CODE."**

The visual language borrows from construction signage, terminal interfaces, and blueprint documents. Every element is declared with thick black borders, hard offset shadows, and aggressive uppercase typography. Decoration is earned through structure, not applied through softness. There are **no gradients, no blur, no rounded corners, and no subtle drop shadows** — depth is expressed exclusively through flat color blocks and hard-edged offset shadows.

## Colors

A strict 4-color palette. Anything outside these four values is a violation.

- **Brutal Black (`#000000`):** The structural color. All borders, primary text, inverted panels, and terminal blocks. Black is the skeleton of every layout.
- **Brutal White (`#FFFFFF`):** The canvas. Primary background for sections, cards, and the modal. Never pure empty space — always contained by black borders.
- **Brutal Yellow (`#FFD700`):** The signal color. Primary CTAs, section number blocks (`01 // TARGETS`), hover states, form focus backgrounds, the marquee strip, and highlighted headline words. Used with black text only.
- **Brutal Gray (`#1A1A1A`):** The near-black surface. Alternate section backgrounds (projects section) and subtle panel fills where pure black would be too heavy.

**Usage rules:**
- Yellow is reserved for action and emphasis — never for large passive backgrounds other than the marquee strip and section-label blocks.
- Text is always maximum contrast: black on white, white on black, black on yellow.
- Selection state: `::selection` uses yellow background with black text.
- Focus states never use glow/ring blur — they are expressed as background-color shifts (e.g., input focus fills yellow) or border color inversions.

## Typography

Typography carries the entire brand. Two typefaces, always uppercase for display and label work.

- **Display (Space Grotesk):** Headlines, section titles, buttons, logo, footer brand. Always **bold/black weight (700–900)**, `text-transform: uppercase`, and **negative letter spacing (`-0.05em`, i.e. `tracking-tighter`)** for a compressed, industrial feel. Hero display type runs at `6rem` mobile / `8rem` desktop with `line-height: 0.85`.
- **Mono (JetBrains Mono):** Body copy, form fields, nav links, tags, badges, labels, terminal output, and all meta information. Labels and tags are bold (700) uppercase at `0.75rem`. The mono face signals technical precision — it is the voice of the system.

**Hierarchy patterns:**
- Section headers follow the pattern `0N // LABEL` in mono bold above a huge display title (e.g. `01 // TARGETS` over `DEPLOYED ASSETS`).
- Highlighted words inside headlines use yellow text with a black outline (`-webkit-text-stroke: 2px #000`) — e.g. `HARD-`**`CODED`**`RELIABILITY.`
- Bracketed text `[ PROJECTS ]`, `[ LINKEDIN ]` is the standard treatment for nav links and text links.

## Layout & Spacing

The layout is a **border-segmented grid** — sections and columns are divided by shared 4px black borders rather than whitespace alone, producing a blueprint/schematic feel.

- **Grid:** 12-column on desktop (`md:grid-cols-12`), collapsing to a single column on mobile. Section label blocks typically span 3 columns; content spans 9.
- **Section headers:** Sticky/sticky-like label panels (yellow or black) sit at the left of each section with the number, title, and optional hint text (e.g. `Scroll Horizontal`).
- **Horizontal scroll:** The projects rail uses native horizontal scrolling with `scroll-snap-type: x mandatory` and `scroll-snap-align: start` on cards; scrollbars are hidden (`.no-scrollbar`).
- **Spacing scale:** `4 / 8 / 16 / 24 / 48 / 80 / 120px`. Section padding: `16px` mobile, `64px` desktop. Generous internal padding (`md`/`lg`) inside bordered cells.
- **Sticky header:** Full-width top nav with a bottom 4px border; nav items are full-height cells separated by right borders that invert (black bg / white text) on hover.
- **Alignment:** Everything aligns to the grid edges. Text is left-aligned; nothing is centered except full-bleed CTA blocks.

## Borders & Shadows

Borders and shadows are the entire elevation system.

- **Borders:** `4px solid #000000`, always. Directional variants (`brutal-border-t/r/b/l`) divide grid cells. Inner media frames may use `2px` borders for nesting contrast.
- **Hard shadow (`shadow-brutal`):** `8px 8px 0px 0px #000000` — flat, offset bottom-right, zero blur. Applied to primary interactive elements (CTA buttons, submit button).
- **Shadow compression hover:** On hover, the shadow shrinks to `4px 4px` while the element translates `+4px` on both axes (`hover:translate-x-1 hover:translate-y-1`) — creating a physical "press into the page" effect.
- **Yellow shadow (`shadow-brutal-yellow`):** `8px 8px 0px 0px #FFD700` — reserved for the modal container to separate it from the dimmed backdrop.
- **Transition:** `transition-all`, fast (~150–300ms), linear-feeling. No easing curves that feel soft.

## Shapes

**Sharp (0px) corners everywhere.** Every button, input, card, modal, tag, and image frame is a perfect rectangle. `border-radius: 0` is a hard global rule — including all component-library primitives, which must be overridden to remove their default radii.

## Texture & Motion

- **Noise texture:** The body background layers an inline SVG `feTurbulence` noise pattern at 5% opacity over white, giving the flat canvas a printed/newsprint grain.
- **Marquee:** A yellow strip with a 4px top/bottom black border runs an infinite horizontal scroll (`translateX(0 → -50%)`, ~20s linear) of uppercase mono slogans separated by `///`. Content is duplicated for a seamless loop.
- **Terminal panel:** Hero includes a black terminal block with yellow `>` prefixed mono lines (`INITIALIZING BUILD SEQUENCE`, `COMPILING ASSETS [OK]`…).
- **Image treatment:** All project/certification imagery renders `grayscale` with boosted contrast, transitioning to full color (and slight `scale-110`) on hover.
- **Micro-interactions:** Icons rotate (`rotate-90`/`rotate-180`) or translate on hover; footer/contact links slide right (`hover:translate-x-2`).

## Components

- **Buttons:** 4px black border, sharp corners, display font uppercase bold. Primary: yellow bg + black text + `shadow-brutal` with compression hover. Secondary: white bg + black text + same shadow behavior. Inverted CTA blocks (header/footer): black bg + white text, hover swaps to yellow bg + black text.
- **Nav links:** Full-height grid cells with right borders; mono bold uppercase in brackets; hover inverts to black bg / white text. Active CTA cell inverts further to yellow on hover.
- **Inputs / Select / Textarea:** `4px` black border, white bg, mono text, sharp corners, generous padding (`16px`). **Focus: background fills yellow** — no outline ring, no shadow. Labels are mono bold uppercase `0.75rem` with an underscore-coded naming convention (`NAME_ID`, `EMAIL_ADDR`, `PROJECT_TYPE`).
- **Tags / Badges:** Black bg + white mono bold uppercase text (`NEXT.JS`), or yellow bg + black text for emphasis (project IDs like `ID: ALPHA_01`). 2px bordered variant for modal stack lists.
- **Cards (projects):** White card, 4px borders, image pane on top (`aspect-[4/3]`, grayscale image with 2px inner frame + corner ID badge), body below with title, yellow category tag, stack tags, and a large arrow icon that turns yellow on hover.
- **Lists (skills):** Mono bold uppercase items separated by 4px bottom rules; proficiency marked as `[++]` at reduced opacity. Panel hover fills yellow (or inverts black↔white for the middle column) with the header icon rotating.
- **Modal (project detail):** Full-screen black backdrop at 90% opacity. Container is white with a 4px white border and `shadow-brutal-yellow`. Left: framed grayscale image. Right: info column (title, ROLE, STACK, OBJECTIVE, OUTPUT sections, each headed by a black mono label chip), closing with a full-width yellow CTA bar. Close button: 64px yellow square, top-right, `X` glyph, borders on left/bottom, inverts on hover.
- **Marquee strip:** Yellow bg, 4px top+bottom borders, infinite mono uppercase slogans with `///` separators.
- **Footer:** Black bg, 8px yellow top border, display-font brand mark, bracketed link chips (white bg → yellow hover), and a `SYS.TIME: YYYY // ALL RIGHTS SECURED.` mono stamp in a bordered gray box.

## Accessibility

- Contrast pairs are always maximum-ratio: `#000` on `#FFF`, `#FFF` on `#000`, `#000` on `#FFD700` — all exceed WCAG AAA.
- Every icon-only control carries an `aria-label` (menu toggle, modal close).
- All interactive elements are keyboard-focusable; focus is visible via background inversion (never removed outlines without a replacement).
- Images use meaningful `alt` text; decorative terminal/marquee content is non-essential and should not interrupt screen-reader flow (`aria-hidden` where appropriate).
- Marquee motion respects `prefers-reduced-motion` (animation disabled on request).
- Hit targets are minimum 44×44px; the full-cell nav links and 64px modal close button exceed this.
