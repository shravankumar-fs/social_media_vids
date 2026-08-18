# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Fans of Kannada cinema, arriving on a phone — one-handed, often on mobile data,
in a queue or in bed. They already know the subject; they are not here to learn
who he is. They know first-day-first-show culture, painted hoardings, and
fan-edit reels, so they measure this page against how fandom already celebrates
a star, not against a Wikipedia article.

Desktop visitors are secondary but real, and the wide layout is authored for
them rather than stretched.

## Product Purpose

A single scrolling page about the actor Yash, at `/celebs/yash`, that treats a
biography as something you move through rather than something you read.

Success is memory: a visitor who leaves after one viewport can describe a
specific object an hour later — not "a nice dark page about an actor."

The deliverable is the web page itself, visited in a browser. Despite the repo
name, this is **not** a source for social video: there is no capture mode, no
9:16 requirement, and no timed-beat scroll. The name `social_media_vids` is
legacy and carries no product requirement. *(Confirmed 17 Aug 2026.)*

## Positioning

The mechanism is depth. Scroll is the narrative device, and the dimensionality
is real rather than depicted — WebGL geometry in the hero, CSS 3D in the middle
sections, scroll-linked parallax throughout. A neighbouring fan page cannot
truthfully claim this, because the usual version is a photograph behind a frame
with a gradient over it.

## Operating Context

Read in a browser, most often a phone held in one hand, frequently at night. No
sign-in, no task to complete, nothing to buy. The visitor's only interaction is
scrolling, tilting the device, and moving the pointer — so those three inputs
carry the entire experience, and anything requiring a click is out of scope.

## Capabilities and Constraints

- The only built surface is `/celebs/yash`. `/` renders nothing by design, and
  there is no global navigation anywhere in the app.
- **Yash is the whole product**, not the first of a series. Do not abstract the
  page into a reusable celebrity template — generalizing it would flatten the
  subject-specific detail that the page exists for. Shared plumbing may be
  extracted only if a second subject is actually commissioned.
  *(Confirmed 17 Aug 2026.)*
- **Private, local-only.** Not publicly deployed. The app is `noindex, nofollow`
  and should stay that way unless that decision changes. If it ever goes public,
  three things become required together: removing `noindex`, setting a real
  `metadataBase`, and adding a visible unofficial/fan-project disclaimer — the
  page uses a living person's name and likeness. *(Confirmed 17 Aug 2026.)*
- Parallax, smooth scrolling, and genuine 3D interaction are commissioned
  features, not decoration. Removing them removes the product.
- Every device must get a working page: no-WebGL, low-core, and reduced-motion
  visitors receive an equivalent composition, never a broken or empty one.

## Brand Commitments

- **Premium and luxurious.** User-pinned. Recorded as given, not expanded here;
  how it is expressed lives in DESIGN.md.
- **Mobile-first responsive.** The phone is the primary canvas, not a shrunk
  desktop. Base rules are the phone; breakpoints only add.

## Evidence on Hand

- **Facts:** `src/data/yash.ts` is the single source of truth for every date,
  title, role, award and figure on the page, all taken from
  <https://en.wikipedia.org/wiki/Yash_(actor)>. PRODUCT.md deliberately does not
  duplicate them — two copies would drift.
- **Photographs:** ten CC-licensed Wikimedia Commons files in `public/yash/`,
  credited to their photographers with licence links in the page colophon, as
  CC BY-SA and CC BY require.
- **Absences that must never be fabricated:** there is no commercial data, no
  ticketing or merchandise relationship, no follower counts, no quotes not in
  the source article, and no official association with the subject or his
  representatives. Nothing in any of these categories may be invented to fill a
  layout.

## Product Principles

1. **Depth is the argument.** When a section could be flat or dimensional, it is
   dimensional — and the dimension is real geometry, not a drop shadow.
2. **Sourced or absent.** A fact appears on the page only if it is in
   `src/data/yash.ts` with the article behind it. Empty space beats invention.
3. **The phone is the design, not the fallback.** Any composition that only
   works wide has failed the primary visitor.
4. **Never trade content for effect.** Every reveal starts from a legible state,
   and no visitor — no WebGL, low-powered, reduced-motion — is left with less
   content than anyone else.
5. **Specific over reusable.** This page is allowed to be unrepeatable. Do not
   trade its particularity for a template nobody asked for.

## Accessibility & Inclusion

`prefers-reduced-motion` is a first-class path, not a courtesy: it disables
smooth scroll and the WebGL scene, resolves every reveal to its final state, and
replaces the pinned horizontal frieze with a vertical one so no content becomes
unreachable. Body text holds 4.5:1 and micro-labels are never smaller than 11px.
No product-specific standard beyond this has been established.
