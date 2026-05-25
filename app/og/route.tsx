import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#eff6ff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#2563eb",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}
        >
          Analytics Engineer · BI Engineer
        </div>

        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#020617",
            lineHeight: 1.05,
          }}
        >
          Madhvika Sehgal
        </div>

        <div
          style={{
            marginTop: "32px",
            fontSize: 34,
            color: "#475569",
            lineHeight: 1.35,
            maxWidth: "980px",
          }}
        >
          Finance data pipelines, cost allocation, cloud analytics, SQL, Tableau, and QuickSight.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}