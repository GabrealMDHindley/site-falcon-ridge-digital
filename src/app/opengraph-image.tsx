import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Falcon Ridge Digital — Fill Vacancies and Maximize NOI";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#042839",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(12,204,175,0.32), transparent 55%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#19ab98",
            marginBottom: 28,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 62,
            fontWeight: 700,
            color: "#f3fbf9",
            lineHeight: 1.12,
            maxWidth: 1040,
          }}
        >
          <span style={{ color: "#0cccaf", marginRight: 16 }}>Fill Vacancies</span>
          <span style={{ marginRight: 16 }}>and</span>
          <span style={{ color: "#0cccaf", marginRight: 16 }}>Maximize NOI</span>
          <span>with High-Performance Digital Marketing Engines</span>
        </div>
        <div style={{ fontSize: 26, color: "#a3c3c9", marginTop: 32, maxWidth: 900 }}>
          Multifamily · RV Parks · Self Storage · Marinas · and other rentable assets
        </div>
      </div>
    ),
    { ...size }
  );
}
