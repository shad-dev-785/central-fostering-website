import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P): P => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
export const MailIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const HeartIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z" />
  </svg>
);
export const HomeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 11 12 4l8 7v9H4v-9Z" />
    <path d="M10 20v-5h4v5" />
  </svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 5 6v5c0 4.500 3 8 7 10 4-2 7-5.500 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const UsersIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.200" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <circle cx="17" cy="9" r="2.500" />
    <path d="M16 14.200A5 5 0 0 1 21 19" />
  </svg>
);
export const BookIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
    <path d="M4 21V5M9 8h6" />
  </svg>
);
export const MoonIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 14.500A8 8 0 0 1 9.500 4 8 8 0 1 0 20 14.500Z" />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.500 4.500 4.500L19 7" />
  </svg>
);
export const ChevronDownIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ArrowCircleIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9.500" />
    <path d="M8 12h8M12.500 8.500 16 12l-3.500 3.500" />
  </svg>
);

/* Brand icons: filled glyphs */
const fill = (props: P): P => ({
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const FacebookIcon = (p: P) => (
  <svg {...fill(p)}>
    <path d="M13.500 21v-7.500h2.600l.4-3h-3V8.600c0-.9.300-1.500 1.600-1.500h1.600V4.400c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.400-4 4.100v2.100H7.700v3h2.600V21h3.200Z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg {...fill(p)}>
    <path d="M7.800 3h8.400A4.800 4.800 0 0 1 21 7.800v8.400a4.800 4.800 0 0 1-4.800 4.800H7.800A4.800 4.800 0 0 1 3 16.200V7.800A4.800 4.800 0 0 1 7.800 3Zm0 1.800A3 3 0 0 0 4.800 7.800v8.400a3 3 0 0 0 3 3h8.400a3 3 0 0 0 3-3V7.800a3 3 0 0 0-3-3H7.800ZM12 7.500a4.500 4.500 0 1 1 0 9 4.500 4.500 0 0 1 0-9Zm0 1.800a2.700 2.700 0 1 0 0 5.400 2.700 2.700 0 0 0 0-5.400Zm4.700-2.600a1.050 1.050 0 1 1 0 2.100 1.050 1.050 0 0 1 0-2.100Z" />
  </svg>
);
export const LinkedinIcon = (p: P) => (
  <svg {...fill(p)}>
    <path d="M5.100 8.800h3V20h-3V8.800ZM6.600 4a1.750 1.750 0 1 1 0 3.500 1.750 1.750 0 0 1 0-3.500ZM10 8.800h2.900v1.500h.1c.4-.8 1.400-1.700 3-1.700 3.100 0 3.700 2 3.700 4.700V20h-3v-5.900c0-1.400 0-3.200-2-3.200s-2.300 1.500-2.300 3.100V20H10V8.800Z" />
  </svg>
);
export const XIcon = (p: P) => (
  <svg {...fill(p)}>
    <path d="M17.800 3h3l-6.600 7.600L22 21h-6.100l-4.800-6.300L5.600 21h-3l7.100-8.100L2.200 3h6.200l4.300 5.700L17.800 3Zm-1 16.200h1.700L7.300 4.700H5.500l11.300 14.500Z" />
  </svg>
);
export const TiktokIcon = (p: P) => (
  <svg {...fill(p)}>
    <path d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.900v3a7 7 0 0 1-3.800-1.200v6.100a5.900 5.900 0 1 1-5.900-5.900c.3 0 .600 0 .9.100v3.100a2.900 2.900 0 1 0 2 2.800V3h2.900Z" />
  </svg>
);
export const YoutubeIcon = (p: P) => (
  <svg {...fill(p)}>
    <path d="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800ZM10 15V9l5.200 3L10 15Z" />
  </svg>
);
