# Design system & fork guide

How to build another site with this look and these behaviours, for a different brand.

> **Status of this repository.** This is no longer the trading site the guide was written
> against — it is the HLG **pre-launch** site. The portfolio, the three desks, the process,
> the developer index, the journal, the testimonials and `SearchContext` have all been
> removed, so the files named in §3 under "property-market specific" and in §7 traps 4 and 5
> no longer exist here. The lessons still travel; the paths no longer resolve. See
> `README.md` for the structure as it stands.

**Read this first if you are starting a new project from this codebase.** It carries the
parts a fresh conversation or a new developer would otherwise have to rediscover: which
files hold the brand, which components are generic, how to remove a section without
leaving dead references, and the specific mistakes already made and fixed here.

---

## 1. Fork recipe

The HLG site is committed on `main` and pushed to `origin`. Nothing below touches it.

```bash
# from the folder that contains HLG/
cp -r HLG NEWSITE
cd NEWSITE

rm -rf .git node_modules dist
git init && git add -A && git commit -m "Fork of HLG front end"

npm install
npm run dev
```

Copying rather than branching is deliberate: the two sites will diverge immediately and
you do not want to be merging between them for the next year. What you are reusing is the
engine, not the content.

---

## 2. What holds the brand

Six places. Change these and the site is a different brand; change nothing else and every
animation, layout and interaction still works.

| File | Holds |
| --- | --- |
| `src/index.css` → `@theme` | The entire palette and the type scale. Every colour on the site resolves from here. |
| `public/brand/*.svg` | Logo lockups and monogram, three variants each (black / white / grey). |
| `src/components/brand/Logo.tsx` | Maps variant → file. Change the filenames here. |
| `src/components/brand/Monogram.tsx` | The mark drawn as inline SVG (animated in the preloader) and `RoofOutline`, which is the custom cursor. **Rewrite this for a new brand** — the paths are HLG's. |
| `src/data/site.ts` | Name, tagline, contact details, address, coordinates, social links, and `nav` — the section list. |
| `index.html` | `<title>`, meta description, Google Fonts link, favicon. |

### Swapping the palette

Everything is a token. Replace the six brand values in `@theme` and the whole site
re-skins — including the cursor, the chevron background pattern and the gradient text.

```css
@theme {
  --color-anthracite: #1c1c1e;   /* the ground */
  --color-bronze:     #9c6625;   /* the accent */
  --color-bronze-soft:#b88d5b;   /* the light accent */
  --color-offwhite:   #f5f3ef;   /* the ink on dark */
  --color-gray-bronze:#6c6c6c;
  --color-gray-soft:  #bcbcbc;
}
```

Two things are **not** tokenised and must be found by search if the accent changes:
literal hex values in Tailwind arbitrary classes (`text-[#B88D5B]`, `bg-[#9C6625]`), and
the `%23B88D5B` inside the `.chevron-field` data-URI. A find-and-replace on the two bronze
hexes catches all of them.

### If the new brand is light rather than dark

The site is dark-first. Inverting means editing `body` in `index.css` plus the `hairline`,
`glass` and section background utilities. Budget half a day and re-check every image scrim
— the gradients over photography are tuned for dark type on dark ground.

---

## 3. Component inventory

### Generic — reuse anywhere, no property-market assumptions

| File | What it is |
| --- | --- |
| `lib/SmoothScroll.tsx` | One global Lenis instance. Every scroll-linked effect reads from it. |
| `lib/useSectionNav.ts` | Scroll spy + anchored navigation for one-page layouts. |
| `lib/motion.ts` | Shared easing curves, variants, viewport config. **The reason the motion reads as one system.** |
| `lib/hooks.ts` | Media queries, pointer capability, scroll lock. |
| `ui/Reveal.tsx` | `Reveal`, `MaskText`, `MaskWords`, `Unveil`. The four reveal primitives. |
| `ui/Parallax.tsx` | `ParallaxImage`, `Drift`. |
| `ui/Magnetic.tsx`, `ui/Marquee.tsx`, `ui/Counter.tsx`, `ui/Button.tsx` | Interaction primitives. |
| `layout/Cursor.tsx` | The custom cursor. Swap the mark; the behaviour is generic. |
| `layout/Preloader.tsx`, `layout/ScrollProgress.tsx` | |
| `layout/Header.tsx`, `layout/MenuOverlay.tsx` | Driven entirely by `nav` in `site.ts`. |
| `layout/SocialIcons.tsx`, `layout/WhatsAppButton.tsx` | |
| `sections/SectionHeading.tsx` | The eyebrow + masked headline + aside pattern every section opens with. |

### Structural — the shape is reusable, the content is not

`sections/Hero.tsx`, `AboutSection.tsx`, `TeamSection.tsx`, `Testimonials.tsx`,
`ContactSection.tsx`, `LocationSection.tsx`, `SocialSection.tsx`, `BlogSection.tsx`,
`ProcessSection.tsx`, `DeskSection.tsx`.

These are layouts with HLG copy in them. Keep the structure, rewrite the words.
`DeskSection` in particular is a clean "one service, alternating image side" template.

### Property-market specific — delete unless the new site sells property

`sections/PropertiesSection.tsx`, `FeaturedRail.tsx`, `PropertyCard.tsx`,
`PropertyOverlay.tsx`, `DevelopersSection.tsx`, `lib/SearchContext.tsx`,
`data/properties.ts`, `data/developers.ts`.

---

## 4. Removing a section cleanly

Four steps, in this order. Skipping the last one is how you end up with a nav item that
scrolls nowhere.

1. Delete the component file and its data module.
2. Remove it from `src/pages/Home.tsx`.
3. Remove its entry from `nav` in `src/data/site.ts` — this clears it from the header, the
   menu overlay and the scroll spy at once.
4. **Search the codebase for its section id** (`goTo('developers')`, `#properties`) and for
   imports of its data module. The footer, other sections' CTAs and `SearchContext` all
   cross-reference each other.

Then `npx tsc -b --noEmit` — TypeScript catches every broken import, which is most of what
step 4 would otherwise miss.

Keep `Home.tsx` as the single place that declares section order. It is a fourteen-line file
on purpose.

---

## 5. Type scale — and the lesson

```css
.display-xl  clamp(2.5rem,  7.2vw, 6.5rem)   /* hero only */
.display-lg  clamp(1.95rem, 4.4vw, 3.6rem)   /* section headlines */
.display-md  clamp(1.6rem,  3.1vw, 2.6rem)
.display-sm  clamp(1.25rem, 1.9vw, 1.65rem)  /* card titles */
.eyebrow     clamp(0.625rem, 0.78vw, 0.72rem), 0.34em tracking, uppercase
.body-lg     clamp(1rem, 1.25vw, 1.175rem), weight 300
```

The first version of this site ran roughly 60% larger at the top of the scale. The client's
review was one word — *"too big"* — on two separate screenshots. Editorial type at 96px
reads as confident in a mockup and as shouting on a 13-inch laptop, which is what a client
actually reviews on.

**Start restrained.** It is much easier to be asked to go bigger than to be told twice that
it is too big.

---

## 6. Motion vocabulary

One curve family, defined once in `lib/motion.ts`:

```ts
EASE      = [0.22, 1, 0.36, 1]   // the decisive settle. Default for everything.
EASE_CINE = [0.65, 0, 0.35, 1]   // curtains, wipes, image scale.
EASE_SOFT = [0.16, 1, 0.3, 1]    // small interactive parts.
inView    = { once: true, margin: '-12% 0px -12% 0px' }
```

Durations sit between 0.6s and 1.3s. Anything faster feels cheap, anything slower feels
broken. Every new animation should use these rather than inventing a curve — that
consistency is the whole effect.

Reduced motion is handled globally by `MotionConfig reducedMotion="user"` in `main.tsx`
plus a CSS fallback. Lenis, parallax, the pinned rail, the marquee and the cursor all
disable themselves. Do not add a component that ignores it.

---

## 7. Four traps already hit here

Each cost real debugging time. All four are commented at the site of the fix.

1. **Never put `whileInView` on an element that is clipped out of view.**
   IntersectionObserver accounts for ancestor clipping, so a masked line at
   `translateY(110%)` inside `overflow: hidden` can never be observed and never animates
   in. The trigger must live on an unclipped wrapper. → `ui/Reveal.tsx`

2. **Never reveal an image by clipping it.** A clipped image counts as invisible, so
   native lazy-loading never fetches it and a fast scroll leaves it blank. Use the
   `Unveil` curtain — an opaque panel that slides off — instead. → `ui/Reveal.tsx`

3. **Custom classes belong in `@layer components`, not `@layer utilities`.** In the
   utilities layer they are emitted *after* Tailwind's own rules at equal specificity, so
   `.link-underline { display: inline-block }` silently defeated `.hidden` and left
   "mobile-hidden" elements on screen. → `index.css`

4. **`AnimatePresence mode="popLayout"` needs its children to forward a ref.** Without it
   the grid collapses and every card stacks in the same place. → was
   `sections/PropertyCard.tsx`, removed from this repo with the portfolio

A sixth, learned on the pre-launch build: **a full-bleed masthead wants `min-h`, not `h`.**
`h-[100svh]` plus `overflow-hidden` cannot overflow — it silently crops. Adding one block to
the hero content ate the eyebrow and the top of the headline at 390×640, and neither of the
two standard phone sizes showed it. → `sections/Hero.tsx`

A fifth, less general but worth knowing: any link that applies a filter should check the
filter actually returns something. Footer shortcuts defaulted to "Buy" and landed on an
empty grid for rental-only communities. → `lib/SearchContext.tsx` (`applyFilter`)

---

## 8. Client review preferences, learned on this project

Carry these into the next build rather than rediscovering them.

- **Restrained display type.** See §5.
- **The header never hides.** It condenses on scroll — utility bar folds away, lockup
  scales down, glass background fades in — all on one curve. Hiding it on scroll-down was
  rejected.
- **A utility bar above the main nav** carrying email and WhatsApp, which folds away once
  reading starts.
- **No duplicate navigation.** The hamburger is hidden wherever the full nav is visible.
  The footer holds *shortcuts* (filtered destinations), never a second copy of the navbar.
- **The footer is a directory**, in the shape of the big Dubai agency sites: logo +
  description, three or four columns of real destinations, a centred social row, then
  copyright and legal links.
- **A floating WhatsApp action**, appearing after the hero. Expected on any Gulf site.
- **The brand's own display face, used sparingly.** Nunito appears only on numerals and
  one card. A logo font used everywhere stops reading as a logo font.
- **Distinctive cursor.** The monogram's roof outline, tipped 20° so it reads as a pointer.

---

## 9. Verifying work in this environment

The in-app Browser pane does not composite frames here: screenshots time out and
**IntersectionObserver never fires**, so no scroll animation can be verified through it.
Every visual check in this project was done with headless Chromium instead.

```bash
# once, in the scratchpad folder
npm i -D playwright && npx playwright install chromium
```

A verification script should: load the page, wait out the preloader (~3.5s), step through
the full scroll height in ~12 increments with a pause at each, then assert
`document.documentElement.scrollWidth <= window.innerWidth` and collect `pageerror` /
`console.error`. Run it at 1440, 1280, 834 and 390 wide. That catches overflow, broken
reveals and runtime errors in one pass.

The same harness renders contact sheets of candidate stock images — worth doing, since
photo IDs picked blind produced a giraffe and a mountain hiker on a Dubai property site.

---

## 10. Handing this to a new conversation

A new session has none of this context. Open the new project with:

> "This is a fork of an existing site. Read `docs/DESIGN-SYSTEM.md` and `README.md` first —
> they carry the design system, the client's review preferences and the mistakes already
> fixed. The new brand is X, and we are removing Y and Z."

That is the whole handover. Both files travel with the fork.
