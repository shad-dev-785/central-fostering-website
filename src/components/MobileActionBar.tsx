import Link from "next/link";
import { site } from "@/config/site";
import { PhoneIcon } from "./Icons";

/** Sticky call / call-back bar shown on phones only, where most enquiries start. */
export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-leaf-100 bg-white p-2.5 shadow-[0_-4px_16px_rgba(20,38,59,0.08)] xl:hidden">
      <a
        href={site.contact.phoneHref}
        className="flex items-center justify-center gap-2 rounded-full bg-navy-700 py-3 font-bold text-white"
      >
        <PhoneIcon width={18} height={18} /> Call us
      </a>
      <Link
        href="/request-a-call-back"
        className="flex items-center justify-center rounded-full border-2 border-navy-700 py-3 font-bold text-navy-700"
      >
        Request a call back
      </Link>
    </div>
  );
}
