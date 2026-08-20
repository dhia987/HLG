# HLG Platform — architecture decision record

Point-in-time record of what this project is built on and what the next phase should be
built on. The full write-up (with reasoning, comparisons, costs and DNS detail) is the
companion document; this file is the short version that lives with the code.

**Status:** front end complete, backend not started.

---

## 1. What exists today

| Layer | Choice |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 (brand tokens in `@theme`) |
| Motion | Motion 13 + Lenis 1.3 |
| Routing | None — one page, detail opens as overlays |
| Content | TypeScript modules in `src/data/` |
| Output | Static `dist/` — 146 kB JS gzipped, 10.7 kB CSS gzipped |

45 source files, ~5,900 lines. 12 properties, 6 advisors, 6 articles, 8 developers — all
placeholder records.

### What it cannot do

- Only a developer can publish a listing (edit file → commit → deploy).
- No listing or article has its own URL, so search engines see one page.
- The contact form fakes its submit; no enquiry is stored anywhere.
- Images are hotlinked from Unsplash.

---

## 2. Decisions

### 2.1 Framework → **Next.js (App Router)**

Migrate. The deciding factor is that individual listings need their own URLs to be found in
search, which is the free acquisition channel for a brokerage. Next.js also brings image
optimisation, server-side form handling, and a home for the CMS — four problems, one move.

Components, Tailwind, the data modules and the brand tokens all port unchanged. The work is
in adding `'use client'` to animated components, converting the overlays to intercepting
routes, and re-testing the motion system. **Estimate: 1–2 weeks.**

Alternative considered: pre-rendering the Vite build. Cheaper, but requires a full redeploy
for every price change and gives the CMS nowhere to live.

### 2.2 Database → **PostgreSQL**

The data is relational (property → community → developer → agent → enquiry) and every filter
on the site is an indexed multi-attribute query with ranges. That is the relational sweet
spot. PostGIS also gives map and radius search when it is wanted.

- **Not MongoDB** — fixed shape, join-heavy filtering, and no schema guarantee across a team.
- **Not Firebase** — composite index requirements and no `OR` across fields make property
  search its weakest case; read-based pricing is unpredictable.
- **Hosting:** Supabase (Postgres + object storage in one place) or Neon (Postgres only,
  branching per preview). Keep the database in the same region as the functions, closest to
  Dubai.

### 2.3 Admin → **Payload CMS 3**

Installs into the Next.js app, writes to your Postgres, ships an admin panel and media
library, open source and self-hosted with no per-seat fee. Collections are defined in
TypeScript so the schema and the site share one set of types.

Sanity is the better editor but is a hosted content lake rather than SQL, which makes complex
property filtering and geospatial work harder.

### 2.4 Hosting → **Vercel**

First-party Next.js support, a preview URL per branch, automatic TLS. Cloudflare Pages or
Netlify are fine for the current static build if the site goes live before the migration —
the domain simply repoints afterwards.

### 2.5 Supporting services

| Concern | Choice |
| --- | --- |
| Images | Object storage (Supabase Storage / Cloudflare R2) + Next.js image optimisation |
| Email | Resend — team notification + sender acknowledgement |
| Spam | Cloudflare Turnstile (invisible) |
| Errors | Sentry (free tier) |

---

## 3. The fork that changes everything

**Does HLG already run a property CRM?** (Property Finder, PropSpace, Masterkey, etc.)

- **Yes** → the website consumes its feed and holds no listing data of its own. It keeps a
  database only for enquiries, articles, team and developers. One source of truth, no double
  entry, portals stay in sync.
- **No** → the website is the source of truth and needs the full stack above. Keep listing
  data in its own tables so a future CRM can be put behind an interface rather than unpicked.

Settle this before writing any backend code.

---

## 4. Schema sketch

```
properties        id · slug · title · listing_type(buy|rent) · status
                  price · currency · rent_period
                  community_id → communities · developer_id → developers
                  agent_id → team_members
                  beds · baths · area_sqft · property_type · handover_date
                  tagline · description · features(jsonb)
                  location geography(point)      ← PostGIS
                  is_featured · published_at · created_at · updated_at

property_images   id · property_id · url · alt · sort_order
communities       id · name · slug · description · hero_image
developers        id · name · slug · note · is_partner
team_members      id · name · slug · role · bio · languages · portrait · linkedin
posts             id · slug · title · excerpt · body · category
                  author_id → team_members · published_at · hero_image
enquiries         id · name · email · phone · intent · budget · message
                  property_id(nullable) · source_page · status · created_at
testimonials      id · quote · author · context · is_published
```

Indexes that matter:

```sql
properties (listing_type, status, published_at);
properties (community_id, beds, price);
properties USING GIN (to_tsvector(title || description));
```

---

## 5. Phasing

| Phase | Work | Effort |
| --- | --- | --- |
| 1 | Replace placeholders with real content, point the domain at the static build | days |
| 2 | Next.js migration, real URLs, motion re-test | 1–2 weeks |
| 3 | Postgres + Payload + object storage; agents self-publish; enquiries stored | 2–3 weeks |
| 4 | Sitemap, `RealEstateListing` structured data, metadata, analytics | 1 week |
| Later | Arabic/Russian, saved searches, portal syndication, mortgage calculator | — |

---

## 6. Domain

The brand material uses **hlgrealestate.com** for the site and **@hlgrealestate.ae** for
email. Pick one canonical domain, redirect the other permanently, and align email with it.

DNS: take the exact apex and CNAME values from the host's dashboard — they change. Pick one
canonical host (apex or `www`) and 301 the other; serving both splits search ranking.

> **Warning.** Changing nameservers moves all DNS including `MX`. If company email runs on
> this domain, copy every existing record first or the mail goes down.

---

## 7. Open questions

1. Is there already a property CRM? (see §3)
2. `.com` or `.ae` as the canonical domain?
3. How many people publish listings, and how often?
4. Arabic at launch or later? (cheap to plan for, expensive to retrofit)
5. Does any contract require UAE data residency?
6. Who owns the site after handover?
