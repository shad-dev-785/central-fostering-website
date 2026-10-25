import Link from "next/link";

/** A fixed edge tab for desktop screens. On phones the bottom action bar does this job instead. */
export default function EnquireTab() {
  return (
    <Link
      href="/contact"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-l-xl bg-leaf-800 px-3 py-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg transition-colors [writing-mode:vertical-rl] hover:bg-leaf-900 xl:block"
      style={{ transform: "translateY(-50%) rotate(180deg)" }}
    >
      Enquire to foster
    </Link>
  );
}
