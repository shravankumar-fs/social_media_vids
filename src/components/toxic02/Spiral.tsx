/**
 * One arrow, spiralling.
 *
 * The whole page shares a single background mark: an Archimedean spiral that
 * draws itself as the reader descends, with a chevron riding its leading edge.
 * It is fixed rather than per-section, so it reads as one continuous gesture
 * across the whole scroll instead of restarting in every band.
 *
 * How it moves, all from `--depth` (0..1 page progress, written once a frame by
 * useScrollPulse):
 *   - `pathLength="1"` normalises the curve, so `stroke-dashoffset: 1 - depth`
 *     draws it from nothing to complete without anyone measuring the path.
 *   - `offset-path` walks the chevron along that same curve, so the arrowhead
 *     is always exactly where the line currently ends.
 *   - a slow counter-rotation of the whole group keeps the tail from reading
 *     as a static decal.
 *
 * Nothing here animates on a timer: stop scrolling and it holds. Decorative
 * throughout, and hidden outright under reduced motion.
 */

const CX = 300;
const CY = 300;

/** r = a + bθ, sampled densely enough that the curve has no visible facets. */
function spiralPath(turns = 3.25, perTurn = 90, a = 6, b = 13.5) {
  const total = Math.round(turns * perTurn);
  const pts: string[] = [];
  for (let i = 0; i <= total; i++) {
    const t = (i / perTurn) * Math.PI * 2;
    const r = a + b * t;
    pts.push(`${(CX + r * Math.cos(t)).toFixed(2)},${(CY + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join(" L")}`;
}

const D = spiralPath();

export default function Spiral() {
  return (
    <div className="spiral" aria-hidden="true">
      <svg viewBox="0 0 600 600" fill="none" focusable="false">
        <defs>
          <linearGradient id="t02-spiral" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--azure)" />
            <stop offset="55%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--magenta)" />
          </linearGradient>
        </defs>

        <g className="spiral__spin">
          <path
            className="spiral__line"
            d={D}
            pathLength={1}
            stroke="url(#t02-spiral)"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          {/* The head rides the same curve, so it always sits on the tip. */}
          <g className="spiral__head" style={{ offsetPath: `path("${D}")` }}>
            <path
              d="M-7 -5 L0 2 L7 -5"
              stroke="var(--magenta)"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
