# HLG Real Estate — pre-launch website

A premium, motion-led **single-page** site for **HLG Real Estate (Home & Leisure Group)**, Dubai.
Built to the supplied *HLG REAL ESTATE BRAND GUIDELINE*.

**HLG has not opened yet.** This site exists to establish the brand as credible and to capture
interest until the doors open — it is not a holding page, and it is not the trading site with
the listings switched off. Everything it says is either true today or stated as an intention.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

---

## The opening date

`launch` in `src/data/site.ts` is the only place the opening date lives. The hero countdown,
the contact card and the footer plate all read it.

```ts
export const launch: Launch = {
  date: '2026-09-15T10:00:00+04:00',   // ISO, with the Gulf offset
  label: '15 September 2026 - 10:00 GST',
}
```

Three states, all designed rather than accidental:

| `date` | What the marker shows |
| --- | --- |
| a future moment | A live countdown in Nunito numerals, plus the date in prose. **This is what ships today.** |
| a past moment | Every marker switches itself to an "open" state, with no deploy |
| `null` | Same layout, numerals as dashes, caption reads "Date to be announced" |

The offset matters — the countdown is computed against real Gulf time, so a visitor in London
sees the same number of days as one in Dubai.

> **The time of day is an assumption.** The date was supplied as 15/09/2026 without an hour;
> `10:00` is a stand-in. Change it and the matching label if the doors open at another time.

---

## Brand implementation

Everything below is taken directly from the guideline, not invented.

| Guideline | Where it lives |
| --- | --- |
| Colours — Anthracite `#1C1C1E`, Bronze `#9C6625`, Soft Bronze `#B88D5B`, Off-White `#F5F3EF`, greys `#6C6C6C` / `#BCBCBC` (p.08) | `src/index.css` → `@theme` |
| Typography — **Nunito** + **Inter** (p.09) | Inter carries the editorial display sizes and all body copy. Nunito is the monogram face and appears as a deliberate accent via `.brand-type`: the preloader counter, the launch countdown, the footer launch plate and the tagline card in About. Tokens: `--font-display`, `--font-sans`, `--font-brand` |
| Logo lockup + monogram, three approved variants | `public/brand/*.svg`, wrapped by `src/components/brand/Logo.tsx` and `Monogram.tsx` |
| Minimum sizes — lockup ≥ 112px wide, monogram ≥ 25px (p.05) | Header lockup ~150px wide; no instance falls below the minimum |
| Prohibitions — no recolouring, outlining, distorting, or splitting the lockup (p.06) | `Logo.tsx` always serves the original artwork unmodified; only the three approved variants are selectable, and "HLG" is never set as live type |
| Monogram roof as a standalone graphic element, **as an outline** (p.10) | `.chevron-field` background pattern, and `RoofOutline` — which is what the custom cursor is |
| Bronze diamond separator (from the `H.L.G` wordmark) | Used site-wide as the section bullet / eyebrow marker |
| Tagline "The Key to Your Next Chapter" | Hero, preloader, footer marquee |
| Contact details (p.12–13) | `src/data/site.ts` |

### Why the tagline carries the pre-launch story

"The Key to Your Next Chapter" was always the brand line. Before opening it is also the literal
position: **the chapter has not started yet.** That is the whole pre-launch concept, and it is
why there is no "coming soon" copy anywhere on the site. The launch marker in the hero is the
one place that says it out loud, which is what lets everything else stay in the brand's own
voice.

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
    site.ts                brand copy, contact details, geo, LAUNCH, NAV
    images.ts              the whole photo library, in one map
    team.ts                advisors    ← PLACEHOLDER
  lib/
    SmoothScroll.tsx       single global Lenis instance
    useSectionNav.ts       scroll spy + anchored navigation
    InterestContext.tsx    which registration type the visitor is choosing
    motion.ts              shared easing curves, variants, viewport config
    hooks.ts               media queries, pointer capability, scroll lock
  components/
    brand/                 Logo, Monogram, Diamond
    layout/                Header, MenuOverlay, Footer, Cursor, Preloader,
                           ScrollProgress
    ui/                    Reveal / MaskText / MaskWords / Unveil, Parallax,
                           Magnetic, Marquee, Counter, Countdown, CTA
    sections/              Hero, AboutSection, ValueSection, TeamSection,
                           LocationSection, ContactSection, SocialSection,
                           SectionHeading
  pages/Home.tsx           the section order
```

### Sections, in scroll order

| # | Section id | Contains |
| --- | --- | --- |
| 01 | `home` | Hero — tagline, four-frame city dissolve, **launch marker** |
| 02 | `about` | Positioning statement, **Vision & mission** (`#vision`), our story (`#story`), **CEO & founder** (`#founder`), why Dubai (`#dubai`), closing plate |
| 03 | `value` | **Why HLG** — the six commitments, merged from "why choose HLG" and the value proposition |
| 04 | `team` | The six advisors, plus careers |
| 05 | `location` | Map, office details and directions |
| 06 | `contact` | Early-access registration and office details |
| — | | Social feed band; social links also sit in the footer, menu and contact card |

The `#vision` / `#story` / `#founder` / `#dubai` ids are **not** nav entries. The scroll spy only
reads `nav`, so extra ids cost nothing — and they give the footer real destinations that the
navbar does not already hold, which is what keeps it a directory rather than a second navbar.

The map is an **OpenStreetMap** embed — no API key, no tracking cookie. It is
inverted and hue-rotated in CSS so the tiles land in the site's anthracite
range. Swap the iframe in `LocationSection.tsx` for a keyed Google or Mapbox
embed if the client wants Street View or custom styling.

### What was removed, and why

The portfolio, the three desks (buy / sell / rent), the six-step process, the developer index
and the journal all belong to a house that is trading. Deleted along with their data modules
and `SearchContext`. Testimonials went too: a company with no clients cannot have client
quotes, and inventing them is the fastest way to lose the credibility this site exists to build.

`SearchContext` is replaced by `lib/InterestContext.tsx`, which carries one thing — the
registration type — so the footer's shortcuts still arrive at the form with the right option
already chosen.

---

## The motion system

One vocabulary, defined in `src/lib/motion.ts`, so the site reads as a single
piece rather than a pile of effects.

- **Smooth scroll** — one global Lenis instance; every scroll-linked effect
  (parallax, progress rule, marquee velocity, scroll spy) reads from it, which
  is what keeps them in step with each other.
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
- **Launch marker** — deliberately the quietest thing on the page. One interval,
  tabular Nunito numerals, no flip or odometer effect; the ticking figures are
  hidden from assistive tech and replaced by a single static sentence, because a
  live region updating every second is unusable. The interval stops itself the
  moment it reaches zero.
- **Cursor** — the monogram's roof, as an outline, tipped 20° anticlockwise so
  it reads as a pointer. It banks into the direction of travel and settles level
  when you stop; a bronze ring opens on interactive elements and becomes a
  labelled disc on media. Any element can drive it with
  `data-cursor="link | view | drag | hidden"` and `data-cursor-label`.
- **Reduced motion** — `MotionConfig reducedMotion="user"` plus a CSS fallback;
  Lenis, parallax, the marquee and the custom cursor all switch themselves off.

### Four traps worth knowing about

All four were hit during the build and are commented in the source:

1. **Never put `whileInView` on an element that is clipped out of view.**
   IntersectionObserver accounts for ancestor clipping, so a masked line sitting
   at `translateY(110%)` inside `overflow: hidden` can never be observed — the
   trigger must live on an unclipped wrapper (`ui/Reveal.tsx`).
2. **Never reveal an image by clipping it.** A clipped image counts as invisible,
   so native lazy-loading never fetches it and a fast scroll leaves it blank.
   Reveals use the `Unveil` curtain instead (`ui/Reveal.tsx`).
3. **Custom classes belong in `@layer components`, not `@layer utilities`.**
   Emitted into the utilities layer they come *after* Tailwind's own rules at
   equal specificity, so `.link-underline{display:inline-block}` silently
   defeated `.hidden` (`index.css`).
4. **A full-bleed masthead wants `min-h`, not `h`.** `h-[100svh]` plus
   `overflow-hidden` silently ate the eyebrow and the top of the headline at
   390×640 once the launch marker made the content block taller. `min-h` is
   identical wherever the content fits and simply grows where it does not
   (`sections/Hero.tsx`).

---

## Before launch — placeholders to replace

Each is marked with a comment in the source.

1. **The opening time** — the date is set (15 September 2026) but the *hour* is a stand-in.
   See [The opening date](#the-opening-date).
2. **Team** — `src/data/team.ts` holds stand-in names, roles, bios and portraits.
   The founder block in the About section reads from `team[0]`, so update that
   record and the quotes in `AboutSection.tsx`.
3. **Office detail** — the address and coordinates are set to The Binary by OMNIYAT,
   Business Bay, from the client's Google Maps pin. Add the floor and office number,
   and check the parking copy in `LocationSection.tsx`.
4. **Social feed tiles** — `src/components/sections/SocialSection.tsx`. Captions deliberately
   carry no transactions; there are no handover days yet.
5. **Photography** — every image resolves through `src/data/images.ts`. These are
   licence-free Unsplash stand-ins, visually checked for subject accuracy; swap
   the map for HLG's own photography (ideally self-hosted, so the site has no
   third-party image dependency).
6. **Registration form** — `src/components/sections/ContactSection.tsx` currently
   fakes the round trip so the interaction can be reviewed. Replace the
   `setTimeout` in `onSubmit` with a POST to your CRM or form endpoint. The form
   promises "one message before we open, and a named advisor after" — whatever it
   posts to has to be able to honour that.
7. **Legal pages** — `public/terms.html` and `public/privacy-policy.html` are
   branded placeholders that say plainly they are unpublished. The wording must be
   drafted and approved by HLG's legal advisor before launch; they are `noindex`
   until then.
8. **Social URLs** — the handles in `src/data/site.ts` are built from the
   guideline's LinkedIn reference; confirm the real profile URLs.

---

## Verifying work

The in-app browser pane in the authoring environment does not composite frames, so
IntersectionObserver never fires there and no scroll animation can be checked through it. Use
headless Chromium instead — load the page, wait out the preloader (~4.5s), step through the full
scroll height, then assert `document.documentElement.scrollWidth <= window.innerWidth` and
collect `pageerror` / `console.error`. Run it at 1440, 1280, 834 and 390 wide.

Add 390×640 to that list. It is the viewport that catches a hero overrunning its own box, and
neither of the two standard phone sizes will show it.

## Deployment

A static build — `dist/` can be dropped on any host. Because everything is one
page there are no route rewrites to configure.
