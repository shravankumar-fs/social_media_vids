# DESIGN.md — Hoysala gold-leaf relief

Recorded from the built surface at `/celebs/yash`, not from intention.

## The world

Two Karnataka crafts, joined:

- **Hoysala relief carving** (Belur, Halebidu, Somanathapura). Chloritic schist —
  soapstone — cut into stacked depth planes: narrative bands at eye level,
  figures set into arched niches above, endowments inscribed into the plinth.
- **Mysore traditional painting.** Gesso raised in relief, then covered in
  22-carat gold leaf and burnished. Pigment used sparingly around it.

The rule that follows from this: **the ground is stone and the accent is leaf.**
Nothing on this page is gold because gold looks expensive; it is gold because
gold leaf is what that craft lays over raised gesso. Everything not gilded is
bare stone, and that contrast is the whole hierarchy.

Deliberately refused: the near-black-plus-neon movie-star page, the black-to-gold
gradient hero, and the cream-and-serif editorial profile.

## Colour

Defined in `src/app/globals.css` under `@theme`.

| Role | Token | Value |
|---|---|---|
| Deepest carve shadow | `--color-stone-950` | `#080a07` |
| Page ground | `--color-stone-900` | `#0e120c` |
| Band / course fill | `--color-stone-700` | `#242c1e` |
| Secondary text | `--color-stone-300` | `#94a286` |
| Micro-labels | `--color-stone-400` | `#7e8f6f` |
| Leaf, thin | `--color-leaf-050…200` | `#fff9e4` → `#f6da94` |
| Leaf, burnished | `--color-leaf-500…800` | `#c08d24` → `#43300c` |
| Gesso | `--color-gesso` | `#efe6d2` |
| Mysore pigment | indigo / kumkum / malachite | `#1b3a6b` `#b3321e` `#1f6b4f` |

Strategy: **Committed.** Stone carries the surface; leaf carries roughly a third
of it and all of the emphasis. Pigment appears only as light — the indigo fill in
the WebGL scene, the indigo wash behind the inner-room section.

Dark was chosen from the use scene, not from category: a fan on a phone, at
night, in bed or in a queue. It is also what schist actually looks like.

`--color-stone-400` is set at `#7e8f6f` specifically because the obvious
mid-tone `#6b7a5e` measures 4.1:1 on the darkest ground and fails at label
sizes. Do not darken it back.

## Type

- **Display: Cinzel**, 400–900. A lapidary face descended from Roman
  inscriptional capitals — the letterform of things cut into stone. Used for
  every heading, every figure, and every tracked micro-label.
- **Body: Spectral**, 300–700. A low-contrast screen serif that holds up on a
  dark ground at small sizes.

Both self-hosted through `next/font/google`. No third family.

Floors held in the build: display caps at 10rem, micro-labels no smaller than
11px, body measure under 75ch, tracking on caps between 0.2em and 0.42em.

## Materials

- **Stone grain** — `@utility grain` / `grain-layer`, an inline `feTurbulence`
  data-URI at 0.16 opacity, `mix-blend-mode: overlay`. Texture, never pattern.
- **Gold leaf** — a multi-stop gradient that swings pale → burnished → pale
  several times across one surface, because leaf is laid in squares by hand and
  facets. A flat gold fill is paint and is wrong here.
- **Relief** — raised: light lip on top, dark below, then offset blur. Cut: the
  inverse, inset. Never a zero-offset halo.
- **No cards.** The page is built from bands, courses, settings, slabs and
  plinths. Where content repeats, it repeats as one continuous carved surface
  divided by incised grooves — see `.frieze__track` and `.panel + .panel::before`.

## Motion — one authored moment

**Gilding**, and it is an act, not a reveal. A band of leaf travels left to
right across the element, the surface brighter behind the band than in front of
it. That is what laying and burnishing leaf looks like, and it is the reason
this page's motion is not interchangeable with any other page's.

An earlier version of this was opacity + rise + saturate — a fade-and-rise
wearing the name "gilding". If you are tempted back toward that, the concept
dies with it.

- `.gild` in `globals.css` holds the element at 0.42 opacity in bare stone —
  legible before any script runs — and `[data-gilded="true"]` takes it to 1.
- `.gild::after` carries the band: a gradient at `background-size: 300% 100%`
  animated from `100% 0` to `0% 0` by `@keyframes lay-leaf`, with `leaf-edge`
  fading the leading edge in and out so the band has no hard start or stop.
- It runs **once** per element and never repeats. `useGild` unobserves on fire.
- Where a `.gild` element is a wrapper wider than its material — `.tier` carries
  the page gutter — the band is inset to the stone. A sweep across a gutter
  reads as a light leak.

**The focal sequence** is the hero, once, on arrival: the name exists first as
raised chalk gesso (`gesso-yield` holds it at 0.92 then settles to 0.55) while
`name-gild` lays the leaf across the letterforms over 1.5s; in the same window
the WebGL key light crosses the archivolt from off to the left and rises from 40
to 95 intensity, so the gold is discovered rather than simply present. The
inscription follows in sequence — above, epithet, plinth, cue — rather than
arriving all at once.

Supporting, never competing: `name-burnish` drifts the leaf slowly after the
arrival settles, and the key light tracks the pointer.

## Motion budget

The target is a mid-range Android on mobile data, so what matters is not the
cost of any one animation but which things run **continuously**. Every
persistent loop is bounded:

| Loop | Bound |
|---|---|
| WebGL render | `frameloop="never"` when the hero is offscreen — measured at 0 `drawElements`/s, not merely idling |
| Scroll parallax | An `IntersectionObserver` keeps a set of on-screen elements; only those get a rect read per frame, since reading a rect forces layout |
| Pointer tilt | The easing loop cancels itself once the value catches up and wakes on the next input; it also stops on `visibilitychange` |
| `name-burnish`, `sink` | `animation-play-state: paused` when the header is offscreen |
| Gold dust canvas | `IntersectionObserver`, stops when the section leaves |

Measured at 4× CPU throttle with the full scene visible: median frame 16.7ms,
p95 18ms, worst 18.4ms — 60fps with nothing dropped.

If you add motion here, the question to answer is not "is it cheap" but "does it
stop".

## Depth

Three separate mechanisms, all real:

1. **WebGL niche** (`NicheCanvas.tsx`) — an `ExtrudeGeometry` wall with a
   five-cusped Chalukyan arch cut clean through it, the portrait on a plane
   behind, gilded archivolt and pilasters in front. Pointer or device tilt turns
   the group, so the parallax between face and opening is geometric.
2. **CSS 3D** — the ore strata in the KGF section and the kundan settings sit in
   real `perspective` containers with per-layer `translateZ`.
3. **Scroll parallax** — one shared rAF loop writes `--p` / `--pc` / `--depth`
   as custom properties; the transforms live in CSS. `view` mode measures an
   element crossing the viewport, `pin` mode measures a tall section's sticky
   travel. Pinned horizontal motion must use `pin`.

## Responsive

Mobile-first without exception: every base rule is the phone, breakpoints at
`48rem` and `64rem` only ever add. The two structural switches:

- **Hero.** Phone stacks niche above inscription. At `64rem` the niche moves to
  71% across and the inscription takes the left — the 3D scene offsets by the
  same 21% so the two layers agree.
- **Frieze.** Phone reads it as a vertical course of panels. At `64rem` it
  becomes a pinned band travelling sideways. Thumb scroll is never hijacked.

## Fallbacks that are not optional

- **No WebGL, low-core device, or reduced motion** → the CSS-carved niche with
  the same cusped arch via `clip-path`. It is the floor, not a downgrade.
- **Reduced motion at `64rem`** → the frieze abandons pinning entirely and falls
  back to the vertical course. Without this the last two episodes are stranded
  off the right edge with no scroll to reach them.
- Every `.gild` resolves to its final state; the dust canvas never starts.

## Content rules

Every date, title and figure comes from the Wikipedia article on Yash and is
kept in `src/data/yash.ts`. Nothing is invented — no fabricated box office, no
fake links, no invented quotes. Photographs are CC-licensed Wikimedia Commons
files with author and licence shown in the colophon, as CC BY-SA requires.

If you extend this page, add facts to `src/data/yash.ts` with a source, or do
not add them.
