# design.md — LivingWithPixels homepage

> **Agents: read this file before generating or editing ANY UI for this site.**
> Build only from the tokens and rules below. **Never invent a colour, size, font,
> radius, or shadow that isn't here.** If something you need is genuinely missing,
> stop and ask — don't improvise a value.
>
> This is the homepage's canonical design contract. The live source of truth is the
> `:root` block at the top of **`index.html`**; this file mirrors it in a form you
> can read in one pass. (`design-system.md` is a separate, longer human reference —
> this file is self-contained, you don't need it.)

---

## 1. What this is

LWP is an **educational platform for working web professionals** (freelancers, solo
designers, small-agency owners). Founder Rino de Boer is the *voice*, not the subject.

> "LivingWithPixels helps web professionals build better websites and web apps with AI,
> without working harder."

**Personality (build to this):** confident, precise, calm, peer-to-peer, optimistic.
**Not:** AI-hype, beginner-y, salesy, or a personal-brand vanity site. The message is
**process and clarity**, never "AI magic."

**Look:** dark, cinematic base with a tight purple + neon-lime accent language; generous
**fixed-px** spacing; heavy display headings (Fira Sans 800) over clean body text.

---

## 2. Always / Never (load-bearing — obey these first)

**ALWAYS**
- Use **Fira Sans 800** for every title/heading (via `.title-*` / `.section-title`).
  Keep 800 even if it feels heavy — it's the site convention.
- Use **Plus Jakarta Sans** for body, labels, buttons, UI.
- Pull every colour from the palette tokens in §3. Pull every size/space from §5.
- Use **fixed px** values from the scales. Responsive changes go in **media queries**, not `clamp()`.
- For **lime on a light background**, add the citrus-rind rim (§3) so it doesn't wash out.
- Place a new product section by **price tier**, and scale its visual weight to price (§6).
- Respect `prefers-reduced-motion` — every animation must degrade to a static state.

**NEVER**
- Introduce a **new colour** (no new hex, no off-palette tint). Confirmed user rule.
- Use **fluid `clamp()`** for type or spacing — it shrinks LWP's desktop look 20–35%.
- Use a lighter heading weight than 800, or swap the two fonts' roles.
- Add a lime rim on a **dark** surface — neon lime stands alone on dark.
- Hardcode a raw value when a token exists (`padding: 24px` → `padding: var(--size-24)`).
- Redefine `.btn`, `.section-title`, etc. — **consume** the existing utilities.

---

## 3. Colour

All colours are tokens. There are **no** others.

### Accent — purple (primary action / focus)
| token | value | use |
|-------|-------|-----|
| `--brand-accent`   | `#7C5CFC` | primary accent, links, CTAs, focus rings, borders-on-hover |
| `--brand-accent-2` | `#6b4de8` | darker — button **hover** depth |
| `--brand-accent-3` | `#a68fff` | lighter — accent text on dark, `.section-label.light` |
| `--brand-accent-4` | `rgba(124,92,252,0.14)` | translucent tint (soft fills) |
| `--brand-accent-5` | `rgba(124,92,252,0.08)` | translucent tint (very soft fills) |

### Accent — lime (the spark; use sparingly)
| token | value | use |
|-------|-------|-----|
| `--brand-2-accent`   | `#C8F135` | **the** lime fill, on every surface (dots, pills, lime buttons) |
| `--brand-2-accent-2` | `#aed120` | lime-button **hover** tone |
| `--brand-2-accent-3` | `#82B600` | chartreuse **rim** for lime-on-light (citrus-rind, see below) |

**Citrus-rind rule (lime on light bg):** wrap the `--brand-2-accent` fill in a
`--brand-2-accent-3` border so the neon edge reads. Always `box-sizing: border-box;`.
Rim thickness scales with the shape's thinnest dimension:

| shape ≤ | rim |
|---|---|
| 7px | 1px |
| 8–10px | 1.5px |
| 11–15px | 2px |
| ≥16px | 2.5–3px |

On **dark** surfaces: drop the rim.

### Neutrals — light (surfaces)
| token | value | use |
|-------|-------|-----|
| `--brand-light-1` | `#ffffff` | primary light surface |
| `--brand-light-2` | `#f7f5ff` | off-white surface |
| `--brand-light-3` | `#ede8ff` | lavender — card backgrounds, light sections, default borders |

### Neutrals — dark (backgrounds + text)
| token | value | use |
|-------|-------|-----|
| `--brand-dark-1` | `#0d0b1a` | dark backgrounds **and** body text |
| `--brand-dark-2` | `#6b6a7a` | muted secondary text (subtitles) |
| `--brand-dark-3` | `#9997aa` | dim tertiary text |

Text on dark: `#fff` for headings, `rgba(255,255,255,0.75)` for body (`.heading-light` / `.body-light`).

---

## 4. Typography

- **Display / headings:** `--heading-font` = `'Fira Sans'`, **weight 800 always**.
- **Body / UI:** `--body-font` = `'Plus Jakarta Sans'` (400/500/600/700).
- Loaded via Google Fonts in `<head>`.

### Type scale (fixed px) — use the `.title-*` / `.body-*` classes
| class | size token | px | weight | line-height | letter-spacing | role |
|-------|-----------|----|--------|-------------|----------------|------|
| `.title-1` | `--title-size-1` | 88 | 800 | 1.04 | -1.5px | hero |
| `.title-2` | `--title-size-2` | 56 | 800 | 1.06 | -1px | big display |
| `.title-3` | `--title-size-3` | 44 | 800 | 1.08 | -0.8px | section title |
| `.title-4` | `--title-size-4` | 32 | 800 | 1.15 | -0.4px | sub-headers |
| `.title-5` | `--title-size-5` | 24 | 800 | 1.2 | -0.2px | card titles |
| `.title-6` | `--title-size-6` | 20 | 800 | 1.25 | — | small headings |
| (lead) | `--title-size-7` | 17 | — | — | — | lead / subtitle |
| `.body-l` | `--body-l` | 18 | — | 1.7 | — | large body |
| `.body-m` | `--body-m` | 16 | — | 1.6 | — | default body |
| `.body-s` | `--body-s` | 14 | — | 1.6 | — | small body |

Headings tighten as they grow (negative tracking); body stays open (1.6–1.7).

---

## 5. Spacing

One ramp, **fixed px**, named by value. Use these for every padding / margin / gap.

`--size-0` 0 · `--size-4` 4 · `--size-8` 8 · `--size-12` 12 · `--size-16` 16 ·
`--size-24` 24 · `--size-32` 32 · `--size-40` 40 · `--size-48` 48 · `--size-64` 64 ·
`--size-80` 80 · `--size-96` 96 · `--size-128` 128 · `--size-160` 160

Helpers: `.pad-s` 12 · `.pad-m` 24 · `.pad-l` 48 · `.gap-0` 0.

### Vertical section rhythm
| class | block padding | side padding |
|---|---|---|
| `.section-s` | `--size-48` | `--section-container` |
| `.section-m` | `--size-80` | `--section-container` |
| `.section-l` | `--size-128` | `--section-container` |
| `.section-full` | `--size-80` | `--section-container-full` (5%) |

---

## 6. Layout

### Containers / width caps
| token / class | max-width | use |
|---|---|---|
| `.container` / `.boxed-m` / `--section-container` | **1100px** | default content width |
| `.boxed-s` / `--section-container-s` | 820px | narrow (prose, forms) |
| `.boxed-l` / `--section-container-l` | 1280px | wide (nav) |
| `--section-container-full` | 5% gutter | full-bleed |

Side gutters use `max(5%, calc((100% - <cap>) / 2))` so content centres and never
hugs the edge on small screens.

### Section order (load-bearing) — price-tier ladder
Products run **cheapest → most expensive**, and **visual weight scales with price**:
cheap = compact light grids high on the page; flagship = heaviest, most cinematic UI
(the sticky stacking course cards). Current order:

1. Hero → 2. Social proof → 3. Free resources (free) → 4. Vision →
5. Focused guides (low) → 6. Testimonials → 7. Workshops (mid) →
8. Bridge testimonial → 9. News → 10. Courses ($299–$399, heaviest) →
11. Community → 12. Email club → Footer.

**When adding a product section:** slot it by its price tier and match UI weight to tier
(compact grid for cheap; stacked / pinned / full-bleed for expensive).

---

## 7. Radius, shadow, elevation

**Radius:** `--rounded-s` 8 · `--rounded-m` 16 · `--rounded-l` 24 · `--rounded-full` 100px.
Classes: `.rounded-s|m|l|full`, `.rounded-zero`. Buttons use `--rounded-s`.

**Shadow / elevation (low → high):**
| token / class | value | use |
|---|---|---|
| `.shadow-s` | `0 2px 10px rgba(13,11,26,0.06)` | resting cards |
| `--shadow-card-hover` / `.shadow-m` | `0 12px 40px rgba(13,11,26,0.13)` | card hover |
| `.shadow-l` | `0 20px 60px rgba(13,11,26,0.18)` | lifted / floating |
| `--shadow-accent` | `0 8px 28px rgba(124,92,252,0.28)` | purple-glow on accent buttons |

`z-index`: nav = `1000`; sticky course cards `top: 110px`.

---

## 8. Components

### Buttons — `.btn` + one variant
Base `.btn`: inline-flex, `gap --size-8`, `padding var(--size-12) var(--size-24)`,
`--rounded-s`, body font, 700, 16px, `transition all .2s ease`, `white-space:nowrap`.

| variant | fill | text | hover |
|---|---|---|---|
| `.btn-lime` | `--brand-2-accent` | `#0d0b1a` | `--brand-2-accent-2` + lift + `0 6px 20px rgba(200,241,53,0.4)` |
| `.btn-purple` / `.btn-solid` | `--brand-accent` | `#fff` | `--brand-accent-2` + lift + `--shadow-accent` |
| `.btn-outline` | transparent | `--brand-dark-1`, 1.5px `--brand-light-3` border | border+text → `--brand-accent` |
| `.btn-outline-dark` | transparent | `rgba(255,255,255,.75)`, 1.5px `rgba(255,255,255,.15)` | brighten to `#fff` |

Hover lift = `translateY(-1px)`. Lime = primary CTA; purple = secondary/solid; outlines = tertiary.

### Section header trio
- `.section-label` — 11px / 700 / uppercase / `letter-spacing 2.5px` / `--brand-accent`,
  with a citrus-rind lime diamond `::before`. `.light` variant for dark sections (rimless, `--brand-accent-3`).
- `.section-title` — `.title-3` styling (44px, 800, -0.8px, lh 1.08). `.light` → `#fff`.
- `.section-subtitle` — 17px / `--brand-dark-2` / lh 1.75 / `max-width 520px`.
- Wrap in `.section-header` (`margin-bottom --size-48`); add `.centered` to centre.

### Interactive card (convention, not one class)
Surface `--brand-light-1` or `--brand-light-3`; `1px solid --brand-light-3` border;
`--rounded-m`/`l`. Transition `transform/box-shadow/border-color .3s`.
**Hover:** `translateY(-4px)`, border → `--brand-accent`, shadow → `--shadow-card-hover`.

### Lime accent shapes
Diamonds / pips / list bullets / strips: `--brand-2-accent` fill + citrus-rind rim on
light (§3), rotate 45° for diamonds, `box-sizing: border-box`.

---

## 9. Motion

- Default interactive transition: `all .2s ease`. Card hovers: `.3s`–`.35s`,
  ease-out (`cubic-bezier(.22,1,.36,1)`).
- Named effects already in the page (reuse, don't reinvent): `memberFloat` (hero avatars),
  `h1Shuffle` (hero tutorial stack), `heroBadgePulse`, `ts-scroll-left/right` (testimonial
  marquees, pause on hover), `fg-download-loop`, scroll-driven `view()` fades on testimonial
  & course cards, and the sticky course-card recede.
- **Sticky stacks are fragile.** Every pinned sibling needs identical `min-height` **and**
  `margin-bottom`; offset with `translate` (not `top`); animate the `scale` property.
  Full write-up: `docs/handovers/2026-05-09-courses-stacking-cards.md`.
- **`prefers-reduced-motion`:** disable animations, swap looping video for a poster, keep
  static end-states (no hidden content).

---

## 10. Responsive

Fixed-px design + media queries (no fluid scaling). Breakpoints:

| ≤ | behaviour |
|---|---|
| **960px** (tablet) | nav collapses to hamburger; grids reflow (3-col → 2-col); side gutter → `--size-24`; parallelogram clips shrink; hero bg-attachment → scroll |
| **640px** (mobile) | single-column stacks; tightest gutters (`--size-16`); hero avatars hidden; courses drop sticky (static stack) |

Touch targets ≥ 44px (e.g. the nav hamburger). Headings reduce via per-breakpoint
overrides, **not** `clamp()`.

---

## 11. Voice & tone (for any UI copy)

- Address the reader as a **peer** — semi-experienced web pros, not beginners.
- Sell **process, systems, clarity** — "a good system beats a thousand tutorials."
- Avoid AI-hype words ("magic", "revolutionary", "10x"). LWP uses AI as a tool, calmly.
- LWP is a **product brand**; Rino is the voice, not the headline subject.
- Concrete and confident over breathless. No exclamation spam, no superlatives.
