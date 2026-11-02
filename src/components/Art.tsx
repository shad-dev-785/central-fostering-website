import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Backdrop shapes                                                      */
/* ------------------------------------------------------------------ */

/** A large soft organic shape that sits behind a photo. Colour it with a text-* class. */
export function Backdrop({ className = "", variant = "a" }: { className?: string; variant?: "a" | "b" | "c" }) {
  const paths = {
    a: "M421 62c70 52 83 150 49 232-34 82-122 134-214 138-92 4-171-45-208-122C11 233 26 135 90 82 156 28 350 8 421 62Z",
    b: "M60 200C40 110 130 20 240 16s190 70 200 170-70 214-190 226S80 290 60 200Z",
    c: "M30 250C10 150 90 40 210 30s210 60 230 160-50 220-180 232S50 350 30 250Z",
  } as const;
  return (
    <svg viewBox="0 0 480 440" aria-hidden="true" focusable="false" className={`drift ${className}`}>
      <path fill="currentColor" d={paths[variant]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Photo slot                                                           */
/* ------------------------------------------------------------------ */

/** Calm adult-and-child silhouettes used inside placeholder frames. */
function Silhouettes() {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false" className="absolute inset-0 h-full w-full">
      <g fill="#ffffff" opacity="0.55">
        {/* adult */}
        <circle cx="120" cy="92" r="30" />
        <path d="M60 240c0-52 26-92 60-92s60 40 60 92Z" />
        {/* child */}
        <circle cx="206" cy="128" r="22" />
        <path d="M164 240c0-38 18-68 42-68s42 30 42 68Z" />
      </g>
      <g fill="#ffffff" opacity="0.3">
        <circle cx="262" cy="150" r="16" />
        <path d="M232 240c0-28 13-50 30-50s30 22 30 50Z" />
      </g>
    </svg>
  );
}

const slotTones = {
  navy: "from-navy-400 to-navy-700",
  leaf: "from-leaf-500 to-leaf-800",
  tangerine: "from-tangerine-400 to-tangerine-700",
  sky: "from-sky-400 to-sky-700",
} as const;

export type SlotTone = keyof typeof slotTones;

/**
 * Where a photograph goes. Pass `src` (a file in /public) to show the real photo; without it
 * a calm placeholder is drawn with a visible "Photo placeholder" label so it is never forgotten.
 * Real photos are animated gently (see .photo-img and .photo-parallax in globals.css); all of it is off for reduced motion.
 */
export function PhotoSlot({
  src,
  alt = "",
  label,
  tone = "navy",
  ratio = "aspect-[4/3]",
  className = "",
  priority = false,
  cutout = false,
  objectPosition,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  /** A photo imported from src/assets (best: Next.js adds a blurred preview and the size) or a path in /public. */
  src?: string | StaticImageData;
  alt?: string;
  /** Brief for whoever supplies the photo, e.g. "Family laughing in a garden". */
  label: string;
  tone?: SlotTone;
  ratio?: string;
  className?: string;
  priority?: boolean;
  /**
   * For photos shot on a plain WHITE background: the white is blended away (multiply), so the people appear to sit
   * directly on the page, over any coloured shape placed behind. The bottom edge fades so no floor line shows.
   */
  cutout?: boolean;
  /** Which part of the photo stays in view when it is cropped to the frame, e.g. "25% 50%" (x y). */
  objectPosition?: string;
  /** Tells the browser how wide the photo is shown, so it downloads the right size. */
  sizes?: string;
}) {
  const isCutout = cutout && Boolean(src);
  const fade = "linear-gradient(to bottom, #000 78%, transparent 100%)";
  return (
    <div
      className={`relative overflow-hidden ${isCutout ? "mix-blend-multiply" : `rounded-[2rem] rounded-br-[5rem] bg-gradient-to-br ${slotTones[tone]}`} ${ratio} ${className}`}
      style={isCutout ? { maskImage: fade, WebkitMaskImage: fade } : undefined}
    >
      {src ? (
        // The inner box is a little taller than the frame, so the photo can shift (parallax) without showing an edge.
        <div className="photo-parallax absolute left-0 right-0 -bottom-[6%] -top-[6%]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            placeholder={typeof src === "string" ? "empty" : "blur"}
            className="photo-img object-cover"
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
      ) : (
        <>
          <Silhouettes />
          <span className="absolute left-4 top-4 max-w-[85%] rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
            Photo placeholder: {label}
          </span>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flat people icons (original artwork)                                 */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

const svgProps = (className?: string) => ({
  viewBox: "0 0 96 96",
  className,
  "aria-hidden": true as const,
  focusable: false as const,
});

function Person({ x, y, body, head = "#f3d2b3", s = 1 }: { x: number; y: number; body: string; head?: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-12" r="8" fill={head} />
      <path d="M-13 14c0-14 6-21 13-21s13 7 13 21Z" fill={body} />
    </g>
  );
}

const heart = "M0 8C-14-1-14-15-5-15c3 0 5 2 5 4 0-2 2-4 5-4 9 0 9 14-5 23Z";

export function IconCommunity({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <g transform="translate(48 22) scale(0.9)"><path d={heart} fill="#1d2760" /></g>
      <Person x={26} y={64} body="#d78d3c" head="#e3b48a" />
      <Person x={48} y={58} body="#84be6a" head="#f3d2b3" s={1.15} />
      <Person x={70} y={64} body="#55a0d7" head="#8a5a3c" />
    </svg>
  );
}

export function IconSupport({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M14 20h46a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H36l-14 12V58h-8a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8Z" fill="#1d2760" transform="translate(4 -2)" />
      <path d="M40 48h42a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8h-6v12L62 82H48a8 8 0 0 1-8-8Z" fill="#84be6a" transform="translate(-4 -6)" />
      <g transform="translate(32 36) scale(0.55)"><path d={heart} fill="#d78d3c" /></g>
      <circle cx="56" cy="64" r="3" fill="#fff" /><circle cx="66" cy="64" r="3" fill="#fff" /><circle cx="76" cy="64" r="3" fill="#fff" />
    </svg>
  );
}

export function IconTraining({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M48 28C38 20 24 20 12 24v50c12-4 26-4 36 4 10-8 24-8 36-4V24c-12-4-26-4-36 4Z" fill="#1d2760" />
      <path d="M48 28v50" stroke="#fff" strokeWidth="3" />
      <rect x="20" y="34" width="20" height="4" rx="2" fill="#fff" opacity="0.8" />
      <rect x="20" y="44" width="16" height="4" rx="2" fill="#fff" opacity="0.8" />
      <circle cx="68" cy="22" r="9" fill="#d78d3c" />
      <path d="M64 22l3 3 6-6" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 46 48 16l36 30" fill="none" stroke="#1d2760" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 44h56v36a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4Z" fill="#84be6a" />
      <rect x="40" y="58" width="16" height="26" rx="4" fill="#fff" />
      <g transform="translate(48 40) scale(0.55)"><path d={heart} fill="#d78d3c" /></g>
    </svg>
  );
}

export function IconTherapy({ className }: IconProps) {
  const ring = [
    [48, 20, "#1d2760"],
    [76, 48, "#d78d3c"],
    [48, 76, "#84be6a"],
    [20, 48, "#55a0d7"],
  ] as const;
  return (
    <svg {...svgProps(className)}>
      <circle cx="48" cy="48" r="28" fill="none" stroke="#e1e5f4" strokeWidth="6" />
      {ring.map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y - 5} r="6" fill="#f3d2b3" />
          <path d={`M${x - 10} ${y + 10}c0-9 4-14 10-14s10 5 10 14Z`} fill={c} />
        </g>
      ))}
      <g transform="translate(48 51) scale(0.6)"><path d={heart} fill="#1d2760" /></g>
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M48 10 18 22v22c0 20 12 34 30 42 18-8 30-22 30-42V22Z" fill="#1d2760" />
      <path d="M48 10v76c18-8 30-22 30-42V22Z" fill="#131b41" />
      <path d="m34 48 10 10 18-20" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="76" cy="20" r="7" fill="#d78d3c" />
    </svg>
  );
}

export const flatIcons = [IconCommunity, IconSupport, IconTraining, IconHome, IconTherapy, IconShield];

/** Small heart used as a list bullet, in place of a tick. */
export function HeartBullet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-16 -17 32 32" aria-hidden="true" focusable="false" className={className}>
      <path d={heart} fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section edges                                                        */
/* ------------------------------------------------------------------ */

/** A soft curved top edge that takes its section's colour. Kept for the odd place a gentle curve helps. */
export function SectionWave({ className = "", variant = "a" }: { className?: string; variant?: "a" | "b" }) {
  const d =
    variant === "a"
      ? "M0 56C240 8 480 0 720 28S1200 64 1440 24V80H0Z"
      : "M0 28C240 64 480 72 720 40S1200 0 1440 40V80H0Z";
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ bottom: "calc(100% - 1px)" }}
      className={`pointer-events-none absolute inset-x-0 block h-6 w-full sm:h-10 ${className}`}
    >
      <path fill="currentColor" d={d} />
    </svg>
  );
}

/** Wrapper that positions an illustration with a backdrop behind it. */
export function WithBackdrop({
  children,
  color = "text-leaf-100",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Backdrop className={`absolute -right-6 -top-8 -z-0 h-[115%] w-[115%] ${color}`} />
      <div className="relative">{children}</div>
    </div>
  );
}
