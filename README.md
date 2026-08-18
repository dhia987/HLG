# HLG Real Estate — website

A premium, motion-led **single-page** site for **HLG Real Estate (Home & Leisure Group)**, Dubai.
Built to the supplied *HLG REAL ESTATE BRAND GUIDELINE*.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

---

## Brand implementation

Everything below is taken directly from the guideline, not invented.

| Guideline | Where it lives |
| --- | --- |
| Colours — Anthracite `#1C1C1E`, Bronze `#9C6625`, Soft Bronze `#B88D5B`, Off-White `#F5F3EF`, greys `#6C6C6C` / `#BCBCBC` (p.08) | `src/index.css` → `@theme` |
| Typography — **Nunito** for the monogram/display, **Inter** for text (p.09) | `--font-display` / `--font-sans`; loaded from Google Fonts in `index.html` |
| Logo lockup + monogram, three approved variants | `public/brand/*.svg`, wrapped by `src/components/brand/Logo.tsx` and `Monogram.tsx` |
| Minimum sizes — lockup ≥ 112px wide, monogram ≥ 25px (p.05) | Header lockup ~120px wide, hero lockup up to 640px; no instance falls below the minimum |
| Prohibitions — no recolouring, outlining, distorting, or splitting the lockup (p.06) | `Logo.tsx` always serves the original artwork unmodified; only the three approved variants are selectable. The hero shows the lockup rather than setting "HLG" as live type, which the guideline forbids |
| Logo over photography, in primary colours (p.07) | The hero masthead |
| Monogram chevron as a background pattern (p.10) | `.chevron-field` utility — menu overlay, footer CTA, contact card, process, careers, testimonials |
| Bronze diamond separator (from the `H.L.G` wordmark) | Used site-wide as the section bullet / eyebrow marker |
| Tagline "The Key to Your Next Chapter" | Hero, preloader, footer marquee |
| Contact details (p.12–13) | `src/data/site.ts` |

---

## Architecture

The whole site is **one page**. There is no router — every nav entry is a section
id, and the header, the menu overlay and the footer all navigate through the same
`useSectionNav()` hook (Lenis-driven smooth scroll + a scroll spy that highlights
the section you are reading).

```
src/
  App.tsx                  page shell: preloader, cursor, header, page, footer
  main.tsx                 smooth scroll + global MotionConfig
  index.css                design tokens, type scale, brand utilities
  data/
    site.ts                brand copy, contact details, NAV (the section list)
    images.ts              the whole photo library, in one map
    properties.ts          listings  ← PLACEHOLDER
    team.ts                advisors  ← PLACEHOLDER
    services.ts            the five mandates
  lib/
    SmoothScroll.tsx       single global Lenis instance
    useSectionNav.ts       scroll spy + anchored navigation
    motion.ts              shared easing curves, variants, viewport config
    hooks.ts               media queries, pointer capability, scroll lock
  components/
    brand/                 Logo, Monogram, Diamond
    layout/                Header, MenuOverlay, Footer, Cursor, Preloader,
                           ScrollProgress
    ui/                    Reveal / MaskText / MaskWords / Unveil, Parallax,
                           Magnetic, Marquee, Counter, CTA
    sections/              Hero, AboutSection, ServicesSection,
                           PropertiesSection, FeaturedRail, PropertyCard,
                           PropertyOverlay, TeamSection, Testimonials,
                           ContactSection, SocialSection, SectionHeading
  pages/Home.tsx           the section order
```

### Sections, in scroll order

| # | Section id | Contains |
| --- | --- | --- |
| 01 | `home` | Hero — lockup, tagline, four-frame city dissolve |
| 02 | `about` | Positioning statement, our story, the H.L.G letters, how we work, why Dubai, closing plate |
| 03 | `services` | Buy / Sell / Rent / Manage / Advisory as an expanding index, plus the six-step process |
| 04 | `properties` | Pinned horizontal "selected portfolio" rail, then the filterable full portfolio and the off-market note |
| 05 | `team` | The six advisors, plus careers |
| — | | Testimonials |
| 06 | `contact` | Enquiry form and office details |
| — | `social` | Social feed band; social links also sit in the footer, menu and contact card |

Property detail opens as a **full-screen overlay** rather than a separate page,
so the portfolio keeps its scroll position underneath. It is deep-linkable via
`/#property/<slug>` and closes on Escape.

---

## The motion system

One vocabulary, defined in `src/lib/motion.ts`, so the site reads as a single
piece rather than a pile of effects.

- **Smooth scroll** — one global Lenis instance; every scroll-linked effect
  (parallax, progress rule, pinned rail, marquee velocity, scroll spy) reads
  from it, which is what keeps them in step with each other.
- **Preloader** — the monogram assembles from its own parts, a counter runs to
  100, then the field lifts away in columns. Once per browser session.
- **Section navigation** — anchored scrolling with an eased Lenis tween; the
  header pill animates between sections with a shared `layoutId`.
- **Headlines** — line- and word-level masked reveals (`MaskText`, `MaskWords`).
- **Images** — `Unveil` slides an opaque panel off the frame; `ParallaxImage`
  adds spring-damped drift against scroll.
- **Services index** — hovering carries a preview frame under the pointer;
  opening a row expands its full detail inline.
- **Portfolio rail** — pins on desktop and travels horizontally against vertical
  scroll; degrades to native snap-scrolling on tablet and mobile.
- **Cursor** — a precise dot plus a spring-lagged ring. Any element can drive it
  with `data-cursor="link | view | drag | hidden"` and `data-cursor-label`.
- **Reduced motion** — `MotionConfig reducedMotion="user"` plus a CSS fallback;
  Lenis, parallax, the pinned rail, the marquee and the custom cursor all
  switch themselves off.

### Three traps worth knowing about

All three were hit during the build and are commented in the source:

1. **Never put `whileInView` on an element that is clipped out of view.**
   IntersectionObserver accounts for ancestor clipping, so a masked line sitting
   at `translateY(110%)` inside `overflow: hidden` can never be observed — the
   trigger must live on an unclipped wrapper (`ui/Reveal.tsx`).
2. **Never reveal an image by clipping it.** A clipped image counts as invisible,
   so native lazy-loading never fetches it and a fast scroll leaves it blank.
   Reveals use the `Unveil` curtain instead (`ui/Reveal.tsx`).
3. **Custom classes belong in `@layer components`, not `@layer utilities`.**
   Emitted into the utilities layer they come *after* Tailwind's own rules at
   equal specificity, so `.link-underline { display:inline-block }` silently
   defeated `.hidden` (`index.css`).

---

## Before launch — placeholders to replace

Each is marked with a comment in the source.

1. **Listings** — `src/data/properties.ts` is demonstration content. Replace it,
   or point the module at a CRM/MLS feed; the exported `Property` type is the
   shape the UI consumes.
2. **Team** — `src/data/team.ts` holds stand-in names, roles, bios and portraits.
3. **Testimonials** — `src/components/sections/Testimonials.tsx`.
4. **Social feed tiles** — `src/components/sections/SocialSection.tsx`.
5. **Photography** — every image resolves through `src/data/images.ts`. These are
   licence-free Unsplash stand-ins, visually checked for subject accuracy; swap
   the map for HLG's own photography (ideally self-hosted, so the site has no
   third-party image dependency).
6. **Contact form** — `src/components/sections/ContactSection.tsx` currently
   fakes the round trip so the interaction can be reviewed. Replace the
   `setTimeout` in `onSubmit` with a POST to your CRM or form endpoint.
7. **Social URLs** — the handles in `src/data/site.ts` are built from the
   guideline's LinkedIn reference; confirm the real profile URLs.

## Deployment

A static build — `dist/` can be dropped on any host. Because everything is one
page there are no route rewrites to configure.
#   H L G  
 