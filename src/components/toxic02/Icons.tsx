/**
 * A drawn icon set, one consistent 1.6 stroke on a 24-grid. Deliberately not
 * emoji: a glyph borrowed from the system font is a costume, and it changes
 * shape between platforms.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconReel = () => (
  <svg viewBox="0 0 24 24" {...S} aria-hidden="true"><circle cx="12" cy="9" r="6" /><circle cx="12" cy="9" r="1.6" /><path d="M6 20h12M9 15l-1 5M15 15l1 5" /></svg>
);
export const IconMap = () => (
  <svg viewBox="0 0 24 24" {...S} aria-hidden="true"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
);
export const IconClock = () => (
  <svg viewBox="0 0 24 24" {...S} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.2 2" /></svg>
);
export const IconGlobe = () => (
  <svg viewBox="0 0 24 24" {...S} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.4 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.4-3.3-8.5S9.8 5.9 12 3.5Z" /></svg>
);
export const IconShield = () => (
  <svg viewBox="0 0 24 24" {...S} aria-hidden="true"><path d="M12 3.5 19 6v6c0 4-3 7.2-7 8.5-4-1.3-7-4.5-7-8.5V6l7-2.5Z" /><path d="M9.5 12l1.8 1.8 3.4-3.6" /></svg>
);
export const IconPen = () => (
  <svg viewBox="0 0 24 24" {...S} aria-hidden="true"><path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4Z" /><path d="M13.5 6.5l4 4" /></svg>
);
