import type { ReactNode } from "react";

/** A template remounts on every navigation, so each page fades in softly (opacity only, so sticky and fixed UI is unaffected). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
