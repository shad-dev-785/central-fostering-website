/**
 * A thin bar across the top that fills as you scroll. Pure CSS (scroll-driven animation), so it costs no
 * JavaScript. Browsers without support simply don't show it. See .scroll-progress in globals.css.
 */
export default function ScrollProgress() {
  return <div aria-hidden="true" className="scroll-progress" />;
}
