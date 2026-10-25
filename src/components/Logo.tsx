import Image from "next/image";
import { site } from "@/config/site";

/**
 * The Central Fostering logo (aperture mark plus name), cut from the supplied artwork.
 * `light` picks the white-text version for navy backgrounds; the default has dark text for white backgrounds.
 */
export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Image
      src={light ? site.logoLight : site.logo}
      alt={site.logoAlt}
      width={site.logoSize.width}
      height={site.logoSize.height}
      priority
      className={`h-11 w-auto sm:h-14 ${className}`}
    />
  );
}

/** The aperture alone, drawn very faintly and turning slowly. Used as a decorative watermark on navy banners. */
export function LogoWatermark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={site.logoMark}
      alt=""
      aria-hidden="true"
      width={334}
      height={334}
      className={`spin-slow pointer-events-none select-none ${className}`}
    />
  );
}
