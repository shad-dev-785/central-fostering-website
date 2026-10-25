import Image from "next/image";
import heroPhoto from "@/assets/hero-family.jpg";

/**
 * The home page hero photograph. It is meant to sit in a NEGATIVE z-index layer (-z-10) of an `isolate`d section,
 * so the headline and buttons render on top of it. A navy fade keeps the text readable and leaves the family clear.
 *
 * To change the picture, save a new photo over src/assets/hero-family.jpg (then `npm run photo:optimise -- src/assets/hero-family.jpg`).
 * Next.js creates the smaller sizes, the modern formats and the blurred preview automatically.
 *
 * The photo moves in layers (see .hero-photo, .hero-veil and .hero-sheen in globals.css): it emerges from navy, settles in,
 * drifts slowly, and a soft band of light crosses it now and then.
 * On large screens the frame is enlarged and anchored left so the family sits on the right, away from the text.
 */
export default function HeroPhoto() {
  return (
    <>
      <div className="hero-parallax absolute inset-0 lg:origin-[0%_44%] lg:scale-[1.35] xl:scale-[1.28]">
        <Image
          src={heroPhoto}
          alt="A family of five laughing together on an autumn woodland path"
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 135vw, 100vw"
          quality={75}
          placeholder="blur"
          className="hero-photo object-cover object-[55%_30%] lg:object-[0%_0%]"
        />
      </div>
      {/* A soft band of light that sweeps across the photo every few seconds. */}
      <div aria-hidden="true" className="hero-sheen pointer-events-none absolute inset-0 overflow-hidden" />
      {/* Phones: the photo sits above the text and fades into navy beneath it. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/40 to-navy-800/5 lg:hidden" />
      {/* Desktops: solid navy behind the text, clearing to the photo on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{ backgroundImage: "linear-gradient(90deg, #131b41 0%, rgba(19,27,65,0.93) 30%, rgba(19,27,65,0.6) 50%, rgba(19,27,65,0.12) 72%, rgba(19,27,65,0) 100%)" }}
      />
      {/* On load the photo emerges from the brand navy as this veil fades away. */}
      <div aria-hidden="true" className="hero-veil pointer-events-none absolute inset-0 bg-navy-800" />
    </>
  );
}
