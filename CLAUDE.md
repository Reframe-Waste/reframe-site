# Reframe Waste — Marketing Website

## Project Overview

Single-page React SPA for reframewaste.com. Implements the Reframe Waste editorial design system: WIRED-inspired broadsheet aesthetic, four-font hierarchy, black-and-white with a single brand-purple accent. Animated with GSAP + ScrollTrigger for editorial text reveals, counter animations, and scroll-driven entrance effects.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview  # preview the build
```

## Stack

- **Vite 5** + **React 18** — build tooling and UI
- **GSAP 3** + **ScrollTrigger** — all animations
- Local fonts served from `public/fonts/` — no Google Fonts CDN dependency

---

## Design System

### Philosophy

The page is black ink on white newsprint. Every surface is either `#ffffff` (paper) or `#1a1a1a` (ink). The single brand color — `#553d97` (purple) — appears only on hover states and interactive kickers. No gradients, no shadows, no rounded corners.

Animations are editorial, not performative. They evoke type being set and ink being laid, not elements floating onto screen. Stagger is short (0.1–0.15s). Movement is minimal (y: 16–24px). Easing is `power2.out` or `power3.out` — never bouncy.

### Color Tokens

| Token | Value | Role |
|---|---|---|
| `--black` | `#000000` | Ribbons, rules, button borders |
| `--ink` | `#1a1a1a` | Headlines, body text, footer bg |
| `--white` | `#ffffff` | Page canvas |
| `--caption` | `#757575` | Metadata, bylines, captions |
| `--hairline` | `#e2e8f0` | Quiet `<hr>` dividers |
| `--purple` | `#553d97` | Link hover, the only non-grayscale color |
| `--purple-light` | `#795fa9` | Secondary interactive cues |

### Typography — Four Faces, Four Jobs

| Face | Variable | Role | Never Used For |
|---|---|---|---|
| **Headland One** | `--font-display` | Display headlines, large numerals | Body text, buttons |
| **Lora** | `--font-body` | Article body, decks, long reads | UI labels, buttons |
| **Inter** | `--font-ui` | Navigation, buttons, labels | Body text |
| **JetBrains Mono** | `--font-mono` | Eyebrows, kickers, timestamps — ALWAYS uppercase | Anything lowercase |

**Typography scale:**

| Role | Font | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| Display Hero | Headland One | 72px | 400 | 1.02 | -1px |
| Display Section | Headland One | 40–52px | 400 | 1.08 | -0.5px |
| Section Heading | Headland One | 32–40px | 400 | 1.12 | — |
| Body Large | Lora | 19–20px | 400 | 1.5 | 0.1px |
| Body | Lora | 16–17px | 400 | 1.5 | 0.09px |
| UI Label | Inter | 13–16px | 700 | 1.25 | 0.3–0.8px |
| Eyebrow/Kicker | JetBrains Mono | 11–13px | 400–700 | 1.23 | 0.92–1.4px |

**Critical rules:**
- Mono is ALWAYS `text-transform: uppercase`. Lowercase mono = broken.
- Display type uses negative tracking (-0.5 to -1px). Mono uses positive (0.9–1.4px).
- Bold weight (700) is used only for Inter UI elements, never for editorial display.

### Spacing

Base unit: 8px. Scale: 4, 8, 12, 16, 24, 32, 40, 48, 64px.
Section vertical padding: 64–80px. Horizontal page padding: 48px desktop, 24px tablet, 16px mobile.

### Borders & Corners

- `border-radius: 0` everywhere except:
  - `50%` — round icon buttons only
  - `1920px` — inline text pills ("BREAKING", "LIVE") only
- Button borders: `2px solid #000`
- Structural rules: `1px solid #000`
- Quiet dividers: `1px solid #e2e8f0`
- **Zero shadows. Ever.** Depth = rule weight, not box-shadow.

### Components

**Eyebrow / Kicker** — JetBrains Mono, 11–13px, uppercase, 0.92–1.4px tracking, color `#553d97` (active) or `#757575` (neutral).

**Ribbon** — Full-bleed black bar, JetBrains Mono uppercase white label, ~40px tall. The "most elevated" surface on the page. Animated with `scaleX` from left on scroll.

**Button (Primary, dark)** — Inter 13–16px / 700 / uppercase, `background: #000`, `color: #fff`, `border: 2px solid #000`, `border-radius: 0`. Hover: background `#553d97`, border `#553d97`.

**Button (Primary, light)** — Same but inverted: white background, black text. Hover: background `#000`, color `#fff`.

**Inline Link** — Text color `#1a1a1a`, underline on hover, color → `#553d97` on hover. `transition: color 120ms`.

**FAQ Accordion** — GSAP height animation. `height: 0 → scrollHeight` on open, `height → 0` on close. Duration 0.35s / 0.25s.

---

## Animation System

All GSAP plugins registered once in `src/main.jsx`:
```js
gsap.registerPlugin(ScrollTrigger);
```

### Pattern: Section Entry (used everywhere)

```js
gsap.from(el, {
  opacity: 0,
  y: 20,
  duration: 0.7,
  ease: 'power2.out',
  scrollTrigger: { trigger: el, start: 'top 85%', once: true }
});
```

### Pattern: Staggered Children

```js
gsap.from(items, {
  opacity: 0,
  y: 20,
  stagger: 0.12,
  duration: 0.7,
  ease: 'power2.out',
  scrollTrigger: { trigger: container, start: 'top 80%', once: true }
});
```

### Pattern: Hero Text Reveal (editorial mask)

```js
// Each headline line is wrapped: <div style={{overflow:'hidden'}}><span className="line-inner">...</span></div>
gsap.from('.line-inner', {
  y: '110%',
  duration: 1.0,
  stagger: 0.12,
  ease: 'power4.out',
  delay: 0.1
});
```

### Pattern: Ribbon Expand

```js
gsap.from(ribbon, {
  scaleX: 0,
  transformOrigin: 'left center',
  duration: 0.6,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: ribbon, start: 'top 90%', once: true }
});
```

### Pattern: Counter Animation

```js
const obj = { val: 0 };
gsap.to(obj, {
  val: 72257,
  duration: 2,
  ease: 'power1.inOut',
  onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString(); },
  scrollTrigger: { trigger: el, start: 'top 80%', once: true }
});
```

### Pattern: FAQ Height Toggle

```js
// Open
gsap.fromTo(panel, { height: 0 }, {
  height: panel.scrollHeight,
  duration: 0.35,
  ease: 'power2.out',
  onComplete: () => gsap.set(panel, { height: 'auto' })
});
// Close
gsap.to(panel, { height: 0, duration: 0.25, ease: 'power2.in' });
```

### Navigation Scroll Behavior

ScrollTrigger on `body` start: Nav background switches from `transparent` (over hero) to `rgba(255,255,255,0.97)` with `backdrop-filter: blur(4px)` once scrolled past ~80px. Done via a CSS class toggle.

---

## Project Structure

```
reframe-site/
├── CLAUDE.md                    ← This file
├── package.json
├── vite.config.js
├── index.html
├── public/
│   ├── fonts/
│   │   ├── HeadlandOne-Regular.ttf
│   │   ├── Lora-VariableFont_wght.ttf
│   │   ├── Lora-Italic-VariableFont_wght.ttf
│   │   ├── JetBrainsMono-VariableFont_wght.ttf
│   │   ├── Inter_18pt-Regular.ttf
│   │   ├── Inter_18pt-SemiBold.ttf
│   │   └── Inter_18pt-Bold.ttf
│   └── assets/
│       ├── reframe-logo.png
│       └── dashboard.webp
└── src/
    ├── main.jsx                 ← GSAP plugin registration
    ├── App.jsx                  ← Single page, all sections
    ├── index.css                ← Design tokens + global styles
    └── components/
        ├── Navigation.jsx       ← Sticky nav, scroll-aware bg
        ├── Hero.jsx             ← Animated text reveal, hero image
        ├── TheProblem.jsx       ← Split layout, editorial two-col
        ├── WhereWeAre.jsx       ← Stats counters, logos strip
        ├── OurProduct.jsx       ← Product image + feature list
        ├── HowItWorks.jsx       ← 4-step grid with ribbon
        ├── WhoItsFor.jsx        ← Two-col: municipalities + haulers
        ├── FAQ.jsx              ← GSAP accordion
        ├── CTASection.jsx       ← Dark CTA + contact form
        └── Footer.jsx           ← Dark footer, link columns
```

---

## Sections & IDs

| Section | Anchor ID | Nav Label |
|---|---|---|
| Hero | `#hero` | — |
| The Problem | `#the-problem` | The Problem |
| Where We Are | `#where-we-are` | Where We Are |
| Our Product | `#product` | Our Product |
| How It Works | `#how-it-works` | How It Works |
| Who It's For | `#who-its-for` | Who It's For |
| FAQ | `#faq` | FAQ |
| Demo / CTA | `#demo` | Get a Demo (CTA button) |

---

## Content

All copy lives directly in each component — no CMS or i18n. For content updates, edit the component directly. Key stats from live Queen Creek deployment:
- 72,257 service events audited
- 25,690 contaminated services flagged
- 15,000 residential customers covered
- 500+ electronic notices sent

---

## Do's and Don'ts

### Do
- Use 2px solid `#000` borders on all buttons
- Use JetBrains Mono ALL-CAPS for every kicker/eyebrow
- Use Headland One for all display headlines
- Use `#553d97` only for hover states and active kicker color
- Keep animations subtle: y ≤ 24px, opacity 0→1, ease `power2.out`

### Don't
- Add `box-shadow` to anything — ever
- Add `border-radius` to rectangular elements
- Use color outside the palette (no green, no blue, no orange)
- Animate with scale, 3D transforms, or blur
- Use Lora for UI labels or Inter for body text
