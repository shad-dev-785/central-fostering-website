import { site } from "@/config/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon, XIcon, YoutubeIcon } from "./Icons";

const networks = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "x", label: "X", Icon: XIcon },
  { key: "tiktok", label: "TikTok", Icon: TiktokIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
] as const;

/** Renders an icon only for networks that have a URL in site.social. */
export default function SocialLinks({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const links = networks.filter((n) => site.social[n.key]);
  if (links.length === 0) return null;
  const style =
    tone === "light"
      ? "bg-white/10 text-white hover:bg-white hover:text-navy-800"
      : "bg-navy-100 text-navy-700 hover:bg-navy-700 hover:text-white";
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={site.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${label}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${style}`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
