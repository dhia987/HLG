# Prompt for the pre-launch fork

Paste this into a new Claude Code conversation opened **inside the forked folder**, after
running the fork recipe in `docs/DESIGN-SYSTEM.md` §1.

---

This project is a fork of the completed HLG Real Estate website. The full design system,
motion system and component library are already here and working — I want to keep all of
it and change what the site is for.

**Read these two files before writing any code:**

- `docs/DESIGN-SYSTEM.md` — brand token architecture, component inventory, how to remove a
  section cleanly, the type scale, the motion vocabulary, four bugs already fixed here that
  must not be reintroduced, the client's settled review preferences, and how to verify work
  in this environment (the in-app browser cannot composite — use headless Chromium).
- `README.md` — how the brand guideline is implemented, the section structure, and the
  full inventory of placeholder content.

## What changes

HLG has not opened yet. This becomes a **pre-launch site**, and its single job is to
establish the brand as credible and capture interest until the doors open. Same design,
same motion, same brand — different purpose.

## Keep these sections

- Hero
- About — who we are, vision & mission, CEO & founder
- Why choose HLG
- Our value proposition
- Team
- Location (map)
- Contact

Note: the existing "Why choose HLG" block (six reasons) already reads as a value
proposition. Either write a genuinely distinct value-proposition section or merge the two —
tell me which you recommend rather than shipping two sections that say the same thing.

## Remove entirely

- `sections/PropertiesSection.tsx`, `FeaturedRail.tsx`, `PropertyCard.tsx`, `PropertyOverlay.tsx`
- `sections/DeskSection.tsx` (Buy / Sell / Rent) and `sections/ProcessSection.tsx`
- `sections/DevelopersSection.tsx`
- `sections/BlogSection.tsx`
- `lib/SearchContext.tsx`
- `data/properties.ts`, `data/developers.ts`, `data/posts.ts`, `data/services.ts`

Follow §4 of the design system doc — especially step 4, searching the codebase for each
section id, because the footer and several CTAs cross-reference them. Run
`npx tsc -b --noEmit` afterwards; it catches the rest.

## Add: the pre-launch story

The site has to say "opening soon" without feeling like a holding page. It should feel like
a brand that already exists and is about to open its doors, not like a site waiting to be
built.

Directions worth exploring — **pick one and commit to it, don't do all of them:**

- The tagline already fits perfectly: *"The Key to Your Next Chapter."* The chapter has not
  started yet. Lean on that rather than writing new "coming soon" copy.
- A launch marker in the hero — a season, a date or a countdown, set in Nunito numerals
  (the monogram face, already used for numerals elsewhere in the system).
- **Register your interest** becomes the primary action everywhere, replacing "Explore
  properties". Contact becomes an early-access list rather than a general enquiry form.
- Where the portfolio used to sit, make the absence deliberate — a section that says the
  portfolio opens when the doors do, rather than leaving a gap in the scroll.
- The preloader already assembles the monogram from its own parts. There is an idea there
  about something being built that a pre-launch site could extend.

## Constraints

- **The brand guideline is not negotiable.** Palette, Nunito + Inter, and the logo usage
  rules are all documented in `README.md`. The logo is never recoloured, outlined or set
  as live type.
- Keep the one-page anchored navigation model. Update `nav` in `src/data/site.ts` — that
  single array drives the header, the menu overlay and the scroll spy.
- **The footer needs rethinking.** Its current columns (Communities, Property types,
  Developers) all die with the portfolio. See §8 of the design system doc for the client's
  footer preferences — it should stay a directory, not become a copy of the navbar.
- Keep the display type restrained. See §5 — the client rejected the first version as
  "too big" and the scale was cut ~40%.
- All placeholder content must stay obviously placeholder. The team, testimonials and
  photography are stand-ins and are marked as such in the data files.
- Verify with headless Chromium per §9, at 1440 / 1280 / 834 / 390 wide, checking for
  console errors and horizontal overflow.

## Ask me first

Do not invent a launch date, an opening month, or any specific claim about when HLG opens.
Ask me and I will give you the real one.
