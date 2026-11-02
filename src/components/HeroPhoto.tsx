import Image from "next/image";
import heroPhoto from "@/assets/photos/hero-sunset.jpg";

/**
 * The home page hero photograph. It is meant to sit in a NEGATIVE z-index layer (-z-10) of an `isolate`d section,
 * so the headline and buttons render on top of it. A navy fade keeps the text readable and leaves the family clear.
 *
 * To change the picture, import a new photo above (src/assets/photos/hero-sunset.jpg is already flipped so the people sit on the
 * right; `npm run photo:optimise -- <file>` shrinks one). Next.js creates the smaller sizes, formats and blurred preview automatically.
 *
 * The photo moves in layers (see .hero-photo, .hero-veil and .hero-sheen in globals.css): it emerges from navy, settles in,
 * drifts slowly, and a soft band of light crosses it now and then.
 * On large screens the photo starts 10% in from the left (that strip blends into the navy fade) so the people sit right of the text.
 */
export default function HeroPhoto() {
  return (
    <>
      <div className="hero-parallax hero-fade-left absolute inset-0 lg:left-[10%]">
        <Image
          src={heroPhoto}
          alt="A father with his daughter on his shoulders, holding up a toy plane in a grassy field at sunset"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          placeholder="blur"
          className="hero-photo object-cover object-[64%_40%] lg:object-[60%_40%]"
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
