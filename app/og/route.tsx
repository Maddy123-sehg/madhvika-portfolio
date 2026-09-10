import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f4efe7",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Georgia",
          borderTop: "18px solid #783348",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#783348",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}
        >
          Business Intelligence · Analytics · Applied AI
        </div>

        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#211c19",
            lineHeight: 1.05,
          }}
        >
          Madhvika Sehgal
        </div>

        <div
          style={{
            marginTop: "32px",
            fontSize: 34,
            color: "#4f4842",
            lineHeight: 1.35,
            maxWidth: "980px",
          }}
        >
          SQL data models, KPI systems, dashboards, experimentation, and AI-assisted workflows across finance, operations, and customer analytics.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
