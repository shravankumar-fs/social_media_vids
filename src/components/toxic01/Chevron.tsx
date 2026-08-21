/**
 * The page's single arrow. Everything that points on /celebs/toxic01 — the
 * hero cue, the seam between bands, the oversized marks drifting behind each
 * section — draws this one shape, so the motif reads as one system rather
 * than as three unrelated glyphs.
 *
 * Always decorative: every call site is inside an aria-hidden container, and
 * nothing here is the only carrier of any meaning.
 */
export default function Chevron({
  strokeWidth = 1.5,
  className,
}: {
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 1 L12 12 L23 1" />
    </svg>
  );
}
