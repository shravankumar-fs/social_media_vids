/**
 * The page's only arrow. The hero cue and the oversized marks drifting behind
 * every band draw this same shape, so the motif reads as one system rather
 * than as unrelated glyphs. Always decorative: every call site sits inside an
 * aria-hidden container and nothing here carries meaning on its own.
 */
export default function Chevron({ strokeWidth = 1.5 }: { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 1 L12 12 L23 1" />
    </svg>
  );
}
