import { ImageResponse } from "next/og";

/**
 * Default share image (1200x630). Static: no request-time APIs, so it is generated at build time,
 * which works with Cache Components. Uses the built-in font to stay small and robust.
 * Hex values are the DESIGN.md brand colours (image generators can't read CSS variables).
 */
export const alt = "Tutoring Galaxy: expert tutors for O Level, A Level, IGCSE and IB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14284B";
const GRAPHITE = "#55637A";
const RULE = "#E6EDF5";
const STAR = "#E0A21B";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: INK,
          padding: "72px 80px",
          borderBottom: `16px solid ${RULE}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: STAR }} />
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>tutoring galaxy</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
            Expert tutors for O Level, A Level, IGCSE and IB
          </div>
          <div style={{ fontSize: 32, color: GRAPHITE }}>Online or at home. First lesson free.</div>
        </div>
      </div>
    ),
    size,
  );
}
