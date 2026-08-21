---
target: /celebs/yash_01
total_score: 19
max_score: 28
na_heuristics: 5,7,9
p0_count: 0
p1_count: 2
timestamp: 2026-08-19T05-41-53Z
slug: src-app-celebs-yash-01-page-tsx
---
Method: dual-agent (A: a90fdc7bc9c9f2cce · B: aa01d3c0a5cf8527f)
Surface mode: **Experience**. Scope note: PRODUCT.md/DESIGN.md govern the *other* surface (`/celebs/yash`) and refuse neon; that override is settled and is not a finding here.

Run context: A was interrupted twice by environment failures (an API error, then the machine sleeping) and lost screenshots partway; it completed on measurement and source. B completed fully. Both flagged measured-vs-inferred, and I independently re-measured the two points where they disagreed.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | The live "8 days out" counter is real status; but 11,966px at 375px with no progress indication, and `.banner__count` renders empty until hydration. |
| 2 | Match System / Real World | 3 | Fluent cinema language, undercut by the same figure in two units 4px apart: "Over ₹10 billion worldwide" beside "₹1,000 cr+". |
| 3 | User Control and Freedom | 2 | Reduced-motion is genuinely first-class. But on a 14.7-viewport page, a reader who passes the gallery has no way back — a consequence of the no-nav decision the page does nothing to soften. |
| 4 | Consistency and Standards | 3 | Tight internal system, broken by `.hero__cue` measuring x=128.6 (dead centre) against every other hero element at x=20. |
| 5 | Error Prevention | n/a | No input, submission, or destructive action exists on this surface. (Was scored 2 last run against the no-JS failure mode, now fixed.) |
| 6 | Recognition Rather Than Recall | 2 | Banner at y=869, payoff at y=6,746 — 5,877px, ~7.2 screens — with the film named nowhere between. Tier-by-glow remains an unlabelled encoding. |
| 7 | Flexibility and Efficiency | n/a | Scroll-only experience surface with no task; no expert path to accelerate. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained for neon — three colours, one motion, no chrome. But Toxic runs 4,428px at 375px, five sub-blocks flat, ending on an 8-row credits table. |
| 9 | Error Recovery | n/a | No reachable error state. |
| 10 | Help and Documentation | 3 | The colophon is real documentation — provenance, licence, non-affiliation. It is the page's dimmest prose (5.38:1, 14px) at y=11,077. |
| **Total** | | **19/28** | **Accessibility floor now met; structure and editorial standard are the remaining work** |

**On comparing to last run's 17/28:** not like-for-like — the `n/a` set changed (5,7,9 now; 7,9,10 before). On the six heuristics scored in *both* runs the movement is **15/24 → 16/24**. The real result is not in the table: **both P0s are gone**, and A opened its priority list with "No P0."

## Design Specificity Verdict

**The type system is now authored for Yash. The light system is still off the shelf.**

Subject-specific, would not survive a swap: the `Yash ಯಶ್` lockup with a real Noto Sans Kannada, `letter-spacing: 0` because an abugida breaks when tracked, `lang="kn"`, and the script inside the accessible name — A calls this "the single strongest move on the page." The `ROCKING STAR` chip (flat venom block, `--ink-950` knocked out, Kannada honorific beside it) is "the one element that actively refuses the category default." The ₹ engineering exists specifically so U+20B9 doesn't drop to Helvetica beside Syne digits. Venom = Yash, magenta = Toxic, with the timeline's final stop inverting to venom for the release date — the one place the film's colour yields to the star's.

Still category-default: near-black + acid green + hot pink is the stock neon triad; two-shadow tube glow, `feTurbulence` grain, scanline, two blurred orbs, animated scroll cue — the standard kit, present in full; Syne is the default premium-display face of the last five years and carries no Kannada; the dot-on-a-rail timeline appears twice; `.scale` is a SaaS 4-up metric row wearing neon.

A's verdict: **roughly two-thirds authored editorially, one-third template visually** — up from "the copy is authored, the design is not." The largest remaining gap is named in the page's own copy: *Toxic* is a post-independence Goa period picture with a 20-acre set rebuilding 1940–1970. The page **states** that and **renders none of it**. The film's section looks exactly like the actor's sections.

**Deterministic scan.** CLI detector: `[]`, exit 0 — and B validated it with a control file (`bounceIn` + a bounce cubic-bezier) that correctly returned exit 2 with 3 `bounce-easing` findings, so the clean result is real, not a silent no-op. B additionally scanned the 1,367-line CSS out-of-spec: also `[]`.

In-page detector: **24 groups / 27 findings**, down from 45. `kicker-above-heading` ×4 and `hero-eyebrow-chip` ×1 are **gone**; `ai-color-palette` ×2 (cyan) is **gone**. Remaining: `dark-glow` ×11 (the committed neon world), `heading-rhythm` ×6, `wide-tracking` ×5 (0.06em on 11px captions), `radial-spotlight-glow` ×2, `overused-font` (Inter 57%, was 63%), `em-dash-overuse` (14).

Overlay: B injected successfully and read findings programmatically, then stopped the live server and confirmed port 8400 closed (`curl` exit 7). B explicitly did **not** claim a user-visible overlay.

## Overall Impression

The accessibility floor that dominated the last run is genuinely fixed, and B's independent numbers confirm it: **one measured contrast failure on the entire page**, and it is an `aria-hidden` decorative mark. The h1 over the portrait — which a bounding-box method scores 3.92:1 — measures **14.57:1 minimum across 39,305 glyph-mask ink pixels**.

What the first run's framing hid is now the top issue: **the gallery has no editorial standard, and its attribution is wrong.** That is a legal and privacy problem, not a craft one, and it sits in the section whose entire purpose is to let a fan look at the subject.

## What's Working

1. **Four hard motion/robustness problems, four correct answers.** `.lit` never translates — opacity and filter only. The unlit state is gated behind `@media (scripting: enabled)` so no-JS gets full strength with no hydration flag. Reduced motion resolves to final state. The flicker measures **1.11 flashes/sec** against WCAG 2.3.1's 3/sec (B notes the in-code comment claiming 2.2/sec *understates* its own result). A: "Most neon pages I review fail at least two."
2. **Kannada treated as language, not ornament** — real family, correct tracking, `lang` attributes, script inside the accessible name (`"Yash ಯಶ್"`, codepoint `U+0020` verified present). The same discipline shows in the scoping contract that keeps this stylesheet off `/celebs/yash`.
3. **Tier-by-light in the filmography**, with the gradient bled to the true gutter via `padding-inline: var(--pad); margin-inline: calc(var(--pad) * -1)` so the two most important rows are the only ones that break the measure — an editorial judgement rendered as light rather than as a badge.

## Priority Issues

**[P1] The gallery's attribution is wrong, and one plate is a private individual who is not the subject.** *(Legal + privacy. I verified the image claims myself by opening the files.)*
- `kgf-press-crop.jpg` and `kgf-vishal-crop.jpg` are **the same exposure** — identical pose, maroon shirt, LED backdrop graphic and watermark; the second is a tighter crop. They carry the **identical caption** two cells apart.
- `kgf2-cast-crop.jpg` is **a photograph of an unidentified woman in a saree** — not Yash — published under the caption "KGF: Chapter 2 promotions" in a section titled "On the record".
- `imageCredits` groups three visually distinct photographs (different garments, locations, occasions) under one Commons file, `File:Yash_Kannada_actor.jpg`.
- Net: roughly **four distinct photographs of Yash across nine cells**.
- Captions and alts are authored inline in `Gallery.tsx`, **outside** the `src/data/*` sourcing discipline — which is how a seated interview against pink upholstery acquired the caption "KGF: Chapter 2 promotions".
- *Why it matters:* `Gallery.tsx` states the standard correctly — "an uncredited CC BY-SA file must not be published" — and the credits block then misapplies it. The same file excludes `portrait-tex.jpg` for having no credit entry, then ships a stranger cropped out of a group shot.
- *Fix:* one credit entry per file with its own verified author and page URL; delete any file whose source cannot be re-verified. Cut `kgf-vishal-crop.jpg` and `kgf2-cast-crop.jpg`, and one of `kgf2-crop.jpg`/`kgf2-neel.jpg`. Six honest plates beat nine padded ones. Move captions and alts into `src/data/` so they inherit the sourcing rule.
- *Suggested command:* `/impeccable clarify`

**[P1] The unlit reveal state fails 4.5:1 for every micro-label, for ~1.2s while it is being read.** *(Verified independently.)*
Measured with `data-lit` cleared: `.eyebrow`, `.film__year`, `.scale__label`, `.slate dt`, `.cast i`, `.film__figure span` all at **3.58:1**; `.role__alias` at **3.78:1**. With `data-lit-index` reaching 5, the stagger adds 425ms before a 750ms transition — a sub-threshold window of ~1.2s, occurring exactly as the element enters view.
*Why it matters:* the fix that closed the last run's P0 was verified against `--txt-dim` (5.09:1) and generalised from it. It was never run for `--txt-mute` or `--magenta` — the page's *smallest* type. The reasoning was sound; the coverage was not, and the CSS comment asserting "5.1:1 while still unlit" is true only for the tier that was sampled.
*Fix:* exempt the mute tier inside `@media (scripting: enabled)` — `opacity: 1; filter: none` for those selectors. The reveal reads on display type and body copy; it does not need the 11px labels.
*Suggested command:* `/impeccable audit`

**[P2] The promise decays over 5,877px, and the payoff opens by repeating it.**
`.banner__word` at y=869, `.toxic__word` at y=6,746 — 7.2 viewports with the film named nowhere between. On arrival the reader gets the title, subtitle and director again before a single new fact. The live countdown — the most affecting thing the page owns — appears once at the top, then only as a trailing clause inside a table cell.
*Fix (neither needs navigation):* end the Toxic section on the countdown as its own lit plate rather than on a licence list; open the payoff on the premise and the dual role, demoting the repeated lockup.
*Suggested command:* `/impeccable layout`

**[P2] `p.colo__mark` carries three separate defects at once.**
B measured it as **the only sub-threshold text on the page**: `rgba(182,255,58,0.14)` on `#04050a` = **1.32:1** at 80px/800. It is also the **only Kannada node still inheriting `lang="en"`**, and it declares `--font-disp` rather than `--font-kn`, so its Kannada renders in a system fallback while the two hero spans correctly get Noto Sans Kannada. It is `aria-hidden`, so the contrast is defensible as decoration — but then it is decoration that is invisible, mislabelled, and set in the wrong face.
*Fix:* either give it `--font-kn` + `lang="kn"` and raise it to a visible weight, or delete it.
*Suggested command:* `/impeccable polish`

**[P2] The page exposes no `banner` and no `contentinfo` landmark.**
`<header class="hero">` and `<footer class="colo">` are both children of `<main>`, which per HTML-AAM demotes them to `generic`. `<main>` itself has no accessible name, and the three colophon `<section>`s are unnamed `generic` regions each holding an `h2`. Also: duplicate `h3` text "Jambada Hudugi" (Bio beat + Films row).
*Fix:* move `<header>` and `<footer>` outside `<main>`; name or downgrade the colophon sections.
*Suggested command:* `/impeccable harden`

## Persona Red Flags

**Sam (screen reader, low vision).** Reads content as it enters the viewport — precisely the ~1.2s window where every micro-label sits at 3.58:1. The colophon, which carries both the legally-required attribution *and* the "Nothing has been added" provenance claim, is the page's dimmest prose at 5.38:1/14px, at y=11,077. Its **10 links are the only focusable elements on the page**; 6 of 10 measure 17px tall (WCAG 2.5.8's inline-prose exception applies, but they are the sole interaction). No `banner`/`contentinfo` landmark and no skip link across 11,966px. **Credit where due:** reduced motion is exemplary — full content, no movement, parallax resolved to neutral rather than half-slid. Sam loses no content; Sam loses orientation.

**Jordan (first-timer).** The hero never says what this page *is* — "an unofficial, non-commercial fan page" appears at y=11,077. Sees "Toxic / 8 days out" at y=869 with no signal the page returns to it; it does, 5,877px later. Cannot gauge length: 14.7 viewports, no progress, no section count. Must infer that glowing rows mean "landmark" — `major` vs `notable` differ only by title colour, a distinction Jordan will not perceive. **On a 667px-tall phone the "SCROLL" cue is entirely below the fold** — the hero renders 760.7px against a 667px viewport.

**Kannada-cinema fan (mobile data, night, one-handed).** Night is where the page is genuinely excellent — near-black ground, no white flash, every lit-state measurement passing, several comfortably. But **the fan's own reward is the weakest section**: nine cells holding four photographs of him plus a stranger, and **5 of 10 images upscale at DPR 2** (worst 2.50×, `kgf2-crop.jpg` at 219×298 into a 548×686 slot) — a source-asset ceiling `next/image` cannot fix. And **Kannada appears three times on the whole page**: the h1, the epithet, and the broken colophon mark. All eleven film titles, all five bio beats and the entire Toxic section are Latin-only. For a page whose specificity argument rests on Kannada, that is thin.

## Cognitive Load — 3 hard failures of 8

Passing: single focus, chunking, grouping, visual hierarchy (measured ramp at 375px: 78.75 → 71.25 → 63.75 → 33.75 → 19.5 → 18 → 17 → 16 → 15 → 13 → 11px, no ties at the wrong level), and minimal choices — trivially, since **no screen presents any decision point**. **Fail — one thing at a time:** Toxic presents split role cards, a stat grid, an 8-name list, a 7-stop timeline and an 8-row table as one unbroken 4,428px stack. **Fail — working memory:** 5,877px between promise and payoff with no carrier; tier-by-light has no legend. **Fail — progressive disclosure:** nothing is disclosed progressively; the Soundtrack `<dd>` alone concatenates release date, label, running length, five composers and two dated singles into one run-on value.

## Emotional Journey

Ignition (0–812px) is strong and is the first-half peak. The promise lands at 812–1,107. Then 4,146px of one grammar in one colour — the first valley. The gallery, which should be the lift, measures as the **deepest valley**. The payoff at 6,649px genuinely works — the colour change reads as walking into a different room, and the venom node on 26 August 2026 is the peak. Then **3,400px of cast, timeline and credits *after* the peak**, ending on the dimmest type on the page. Peak-end says the countdown should own the ending; it owns a table cell.

## Minor Observations

- **`.hero__cue` is centred while everything else is left-aligned** — x=128.6 vs x=20 for every other hero element. `.shell` sets `margin-inline:auto`, and because `.hero__cue` is also `display:flex` it shrink-wraps and the auto margins centre it. Add `width:100%`.
- **The gallery grid ends on a hole** at 768px — nine items don't fit a 4-column pattern; the fourth cell of row 3 is empty. Row 1 also has ragged bottoms from three different `aspect-ratio` values in one row.
- **`.grain::before` sits at `z-index: 3`, above text at `z-index: 2`** — the film grain paints over every glyph, not just the ground. Small at 0.14 overlay, but unintended.
- **Mixed-face numeral lockup:** in `.scale dt` and `.film__figure b` the digits are Syne (106.602) and the ₹ is Inter (56.141). This is the intended per-glyph fallback working — but it is measurably a two-face lockup, which is a design decision worth making deliberately rather than inheriting.
- `Noto Sans Kannada` weight **700 is requested but reports `status: "unloaded"`** — it is declared in `layout.tsx` and never used.
- `.scale dt` overflows its box by 61px at 1280 (`white-space: nowrap`), but paints 17.6px *inside* the parent with `overflow-x: visible` — **no clipping, no truncation**, and page overflow is 0 at all five widths. B correctly classified the detector's `text-overflow` hit as a false positive.
- At **320px**, `.films` measures scrollWidth 300 vs clientWidth 280 and the landmark row's figure is clipped by `overflow-x: clip`; `.scale dt` sits at exactly the clip edge. Outside the brief's breakpoints but live.
- `portrait-tex.jpg` (129 KB) ships unused in `public/yash/` — `Gallery.tsx` explains why it isn't shown; it should be deleted, not served.
- All 10 links carry `target="_blank"` with no indication the tab changes. No `<meta name="theme-color">`.
- **Zero horizontal overflow at 320/375/768/820/1280.** Smallest rendered font 11px on 35 elements — the floor holds exactly.

## Questions to Consider

1. The gallery is the only reason a fan visits a fan page, and it is the one section with no editorial standard — nine cells holding four photographs and one stranger. If you had to ship six plates, which three would you cut? Does the answer tell you it should have been six all along?
2. Kannada appears three times on a page whose entire specificity claim is Kannada cinema. What would it cost to set the eleven film titles in Kannada alongside the Latin — and if the answer is "the source doesn't give them", is the sourcing rule protecting the page's honesty or capping its ambition?
3. *Toxic* is a period picture: post-independence Goa, twenty acres rebuilding 1940–1970. The page states all of it in prose and renders none of it in light. Why does the film's section look like every other section instead of like the film?
4. Three of eight cognitive-load checks fail on **volume**, not craft. Which two of the five Toxic blocks survive a rule that the section may not exceed three screens?
5. Reduced motion here is exemplary and the unlit micro-labels measure 3.58:1 — both come from the same reveal system. Does that suggest `.lit` was designed for the display type and then sprayed onto 73 elements by default? Should it have been opt-in?
6. The most affecting fact this page owns is "8 days out", and it is currently a clause in a table cell. What would the page feel like if that were the last thing on it?
