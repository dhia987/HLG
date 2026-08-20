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
| Typography — **Nunito** + **Inter** (p.09) | Inter carries the editorial display sizes and all body copy. Nunito is the monogram face and appears as a deliberate accent via `.brand-type`: the preloader counter, the process numerals, and the tagline card in About. Tokens: `--font-display`, `--font-sans`, `--font-brand` |
| Logo lockup + monogram, three approved variants | `public/brand/*.svg`, wrapped by `src/components/brand/Logo.tsx` and `Monogram.tsx` |
| Minimum sizes — lockup ≥ 112px wide, monogram ≥ 25px (p.05) | Header lockup ~150px wide; no instance falls below the minimum |
| Prohibitions — no recolouring, outlining, distorting, or splitting the lockup (p.06) | `Logo.tsx` always serves the original artwork unmodified; only the three approved variants are selectable, and "HLG" is never set as live type |
| Monogram roof as a standalone graphic element, **as an outline** (p.10) | `.chevron-field` background pattern, and `RoofOutline` — which is what the custom cursor is |
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
    site.ts                brand copy, contact details, geo, NAV (section list)
    images.ts              the whole photo library, in one map
    properties.ts          listings    ← PLACEHOLDER
    team.ts                advisors    ← PLACEHOLDER
    developers.ts          developers  ← PLACEHOLDER, see the warning in the file
    posts.ts               journal     ← PLACEHOLDER
    services.ts            the three desks (buy / sell / rent)
                           each rendered by components/sections/DeskSection
  lib/
    SmoothScroll.tsx       single global Lenis instance
    useSectionNav.ts       scroll spy + anchored navigation
    SearchContext.tsx      portfolio filter state + contact enquiry type
    motion.ts              shared easing curves, variants, viewport config
    hooks.ts               media queries, pointer capability, scroll lock
  components/
    brand/                 Logo, Monogram, Diamond
    layout/                Header, MenuOverlay, Footer, Cursor, Preloader,
                           ScrollProgress
    ui/                    Reveal / MaskText / MaskWords / Unveil, Parallax,
                           Magnetic, Marquee, Counter, CTA
    sections/              Hero, AboutSection, DeskSection, ProcessSection,
                           PropertiesSection, FeaturedRail, PropertyCard,
                           PropertyOverlay, DevelopersSection, BlogSection,
                           TeamSection, Testimonials, ContactSection,
                           LocationSection, SocialSection, SectionHeading
  pages/Home.tsx           the section order
```

### Sections, in scroll order

| # | Section id | Contains |
| --- | --- | --- |
| 01 | `home` | Hero — tagline, four-frame city dissolve |
| 02 | `about` | Positioning statement, **Vision & Mission**, our story, **CEO & Founder**, **Why choose HLG** (six reasons), why Dubai, closing plate |
| 03 | `buy` | Buy — image, narrative, capability grid, through to the portfolio |
| 04 | `sell` | Sell — same shape, mirrored, with a valuation request |
| 05 | `rent` | Rent — same shape as Buy |
| — | | The six-step process, shared by all three desks |
| 06 | `properties` | Pinned horizontal "selected portfolio" rail, then the filterable full portfolio and the off-market note |
| 07 | `developers` | Kinetic name band, developer index with communities, launch-allocation CTA |
| 08 | `blog` | Lead story, category filter, article index — each opens a reading overlay |
| 09 | `team` | The six advisors, plus careers |
| — | | Testimonials |
| 10 | `contact` | Enquiry form and office details |
| — | `location` | Map, office details and directions |
| — | `social` | Social feed band; social links also sit in the footer, menu and contact card |

Property detail and blog articles both open as **full-screen overlays** rather
than separate pages, so the index underneath keeps its scroll position. Property
detail is deep-linkable via `/#property/<slug>`. Both close on Escape.

The map is an **OpenStreetMap** embed — no API key, no tracking cookie. It is
inverted and hue-rotated in CSS so the tiles land in the site's anthracite
range. Swap the iframe in `LocationSection.tsx` for a keyed Google or Mapbox
embed if the client wants Street View or custom styling.

---

## The motion system

One vocabulary, defined in `src/lib/motion.ts`, so the site reads as a single
piece rather than a pile of effects.

- **Smooth scroll** — one global Lenis instance; every scroll-linked effect
  (parallax, progress rule, pinned rail, marquee velocity, scroll spy) reads
  from it, which is what keeps them in step with each other.
- **Preloader** — the monogram assembles from its own parts, a counter runs to
  100, then the field lifts away in columns. Once per browser session.
- **Header** — never leaves the screen. Instead of hiding on scroll it
  *condenses*: the utility bar (email + WhatsApp) folds away, the lockup scales
  down and the glass background fades in, all on the same curve.
- **Section navigation** — anchored scrolling with an eased Lenis tween; the
  header pill animates between sections with a shared `layoutId`.
- **Headlines** — line- and word-level masked reveals (`MaskText`, `MaskWords`).
- **Images** — `Unveil` slides an opaque panel off the frame; `ParallaxImage`
  adds spring-damped drift against scroll.
- **The desks** — Buy, Sell and Rent are three separate sections with three
  separate anchors and one shared shape: parallax frame, masked headline,
  capability grid, call to action. The image side alternates so they do not
  read as one list. Filtering lives in the portfolio filter rail, in one place,
  rather than being repeated on each desk.
- **Portfolio rail** — pins on desktop and travels horizontally against vertical
  scroll; degrades to native snap-scrolling on tablet and mobile.
- **Cursor** — the monogram's roof, as an outline, tipped 20° anticlockwise so
  it reads as a pointer. It banks into the direction of travel and settles level
  when you stop; a bronze ring opens on interactive elements and becomes a
  labelled disc on media. Any element can drive it with
  `data-cursor="link | view | drag | hidden"` and `data-cursor-label`.
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
   The founder block in the About section reads from `team[0]`, so update that
   record and the quotes in `AboutSection.tsx`.
3. **Developers** — `src/data/developers.ts` lists the major Dubai master
   developers as an illustration. **Confirm which relationships HLG actually
   holds and delete the rest** — an implied partnership that does not exist is a
   commercial and legal risk. Logos are deliberately not used; they are
   third-party trademarks and need written permission.
4. **Journal** — `src/data/posts.ts` contains six demonstration articles.
   Replace them or point the module at a CMS.
5. **Office detail** — the address and coordinates are set to The Binary by OMNIYAT,
   Business Bay, from the client's Google Maps pin. Add the floor and office number,
   and check the parking/hours copy in `LocationSection.tsx`.
6. **Testimonials** — `src/components/sections/Testimonials.tsx`.
7. **Social feed tiles** — `src/components/sections/SocialSection.tsx`.
8. **Photography** — every image resolves through `src/data/images.ts`. These are
   licence-free Unsplash stand-ins, visually checked for subject accuracy; swap
   the map for HLG's own photography (ideally self-hosted, so the site has no
   third-party image dependency).
9. **Contact form** — `src/components/sections/ContactSection.tsx` currently
   fakes the round trip so the interaction can be reviewed. Replace the
   `setTimeout` in `onSubmit` with a POST to your CRM or form endpoint.
10. **Legal pages** — `public/terms.html` and `public/privacy-policy.html` are
   branded placeholders that say plainly they are unpublished. The wording must be
   drafted and approved by HLG's legal advisor before launch; they are `noindex`
   until then.
11. **Social URLs** — the handles in `src/data/site.ts` are built from the
   guideline's LinkedIn reference; confirm the real profile URLs.

## Deployment

A static build — `dist/` can be dropped on any host. Because everything is one
page there are no route rewrites to configure.
