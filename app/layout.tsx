import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://madhvika-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Madhvika Sehgal | Business Intelligence & Analytics",
    template: "%s | Madhvika Sehgal",
  },
  description:
    "Business Intelligence and analytics portfolio with 4+ years across Amazon, Barclays, and Accenture, covering SQL data models, KPI design, dashboards, experimentation, cloud data systems, and applied AI.",
  keywords: [
    "Madhvika Sehgal",
    "Analytics Engineer",
    "Data Analyst",
    "Data Analytics",
    "Business Intelligence Engineer",
    "BI Engineer",
    "Financial Analytics",
    "Operational Analytics",
    "Customer Analytics",
    "SQL",
    "AWS",
    "Tableau",
    "QuickSight",
    "Cost Allocation",
    "Data Pipelines",
    "Analytics Engineering",
    "KPI Design",
    "A/B Testing",
    "Applied AI",
  ],
  authors: [{ name: "Madhvika Sehgal" }],
  creator: "Madhvika Sehgal",
  openGraph: {
    title: "Madhvika Sehgal | Business Intelligence & Analytics",
    description:
      "SQL data models, KPI systems, dashboards, experimentation, and AI-assisted workflows across finance, operations, and customer analytics.",
    url: siteUrl,
    siteName: "Madhvika Sehgal Portfolio",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Madhvika Sehgal - Business Intelligence and Analytics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhvika Sehgal | Business Intelligence & Analytics",
    description:
      "SQL data models, KPI systems, dashboards, experimentation, and AI-assisted workflows across finance, operations, and customer analytics.",
    images: ["/og"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
