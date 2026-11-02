import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/** The picture shown when a page is shared on Facebook, LinkedIn, WhatsApp and so on. Generated at build time. */
export const alt = `${site.name}: foster care in the Midlands`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const mark = `data:image/png;base64,${readFileSync(join(process.cwd(), "public", "logo-mark.png")).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#131b41",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -140, width: 520, height: 520, borderRadius: 999, background: "#1d2760" }} />
        <div style={{ position: "absolute", right: 150, bottom: -90, width: 230, height: 230, borderRadius: 999, background: "#3f7a2a", opacity: 0.55 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} width={360} height={360} alt="" style={{ position: "absolute", right: 90, top: 135 }} />
        <div style={{ fontSize: 34, letterSpacing: 6, textTransform: "uppercase", color: "#efc08a", marginBottom: 24, display: "flex" }}>Fostering agency in the Midlands</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.08, maxWidth: 700, display: "flex" }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 28, color: "#e1e5f4", maxWidth: 680, display: "flex" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
