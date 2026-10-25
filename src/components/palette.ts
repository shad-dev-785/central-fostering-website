/**
 * The accent colours, taken from the logo's aperture. Components pick one by index so neighbouring cards differ.
 * Navy is the brand colour; these appear in small doses (a bar, a chip, an icon).
 * "text" and "dot" use the 700 shades so they stay readable (WCAG AA) on white.
 * Class names are written out in full so Tailwind can see them.
 */
export const palette = [
  { name: "tangerine", bar: "bg-tangerine-500", tint: "bg-tangerine-100", chip: "bg-tangerine-100 text-tangerine-700", text: "text-tangerine-700", dot: "bg-tangerine-700 text-white" },
  { name: "berry", bar: "bg-berry-500", tint: "bg-berry-100", chip: "bg-berry-100 text-berry-700", text: "text-berry-700", dot: "bg-berry-700 text-white" },
  { name: "sky", bar: "bg-sky-400", tint: "bg-sky-100", chip: "bg-sky-100 text-sky-700", text: "text-sky-700", dot: "bg-sky-700 text-white" },
  { name: "leaf", bar: "bg-leaf-500", tint: "bg-leaf-50", chip: "bg-leaf-100 text-leaf-900", text: "text-leaf-700", dot: "bg-leaf-700 text-white" },
  { name: "ember", bar: "bg-ember-500", tint: "bg-ember-100", chip: "bg-ember-100 text-ember-700", text: "text-ember-700", dot: "bg-ember-700 text-white" },
  { name: "aqua", bar: "bg-aqua-400", tint: "bg-aqua-100", chip: "bg-aqua-100 text-aqua-700", text: "text-aqua-700", dot: "bg-aqua-700 text-white" },
] as const;

export const pick = (i: number) => palette[i % palette.length];
