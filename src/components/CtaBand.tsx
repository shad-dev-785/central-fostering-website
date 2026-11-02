import { site } from "@/config/site";
import { Backdrop } from "./Art";
import { LogoWatermark } from "./Logo";
import { ButtonLink, Container } from "./ui";
import { PhoneIcon } from "./Icons";
import Reveal from "./Reveal";

/** Closing call to action, repeated at the bottom of most pages. */
export default function CtaBand({
  title = "Make room for a child who needs you.",
  text = "Enquiring costs nothing. There's no obligation. Just a friendly chat about whether fostering could be right for you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-800 py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <LogoWatermark className="absolute -left-24 -bottom-32 w-[30rem] opacity-[0.08]" />
        <Backdrop variant="a" className="absolute -left-40 -top-32 h-[120%] w-auto min-w-[28rem] text-navy-700/70" />
        <Backdrop variant="c" className="absolute -bottom-48 -right-32 h-[110%] w-auto min-w-[26rem] text-navy-600/40" />
        <div className="absolute right-[16%] top-14 h-5 w-5 rounded-full bg-tangerine-500" />
        <div className="absolute bottom-14 left-[20%] h-3 w-3 rounded-full bg-leaf-500" />
      </div>
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">{title}</h2>
            <p className="mt-4 text-lg text-white/90">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/apply" variant="orange" arrow>
                Apply online
              </ButtonLink>
              <ButtonLink href="/request-a-call-back" variant="outlineLight">
                Request a call back
              </ButtonLink>
            </div>
            <p className="mt-7 flex flex-wrap items-center justify-center gap-2 text-white/90">
              <PhoneIcon width={20} height={20} className="text-tangerine-300" />
              Prefer to talk? Call us on{" "}
              <a href={site.contact.phoneHref} className="inline-block py-1 font-bold underline underline-offset-4 hover:text-tangerine-300">
                {site.contact.phone}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
