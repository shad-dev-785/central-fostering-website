"use client";

import { useEffect, useState } from "react";

/**
 * Cache Components forbids reading the current time while prerendering, so the
 * page ships with a fixed year and the browser corrects it after hydration.
 */
export default function CopyrightYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off client-only correction
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
