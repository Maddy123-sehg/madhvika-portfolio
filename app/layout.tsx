import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://madhvika-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Madhvika Sehgal | Analytics Engineer & BI Engineer",
    template: "%s | Madhvika Sehgal",
  },
  description:
    "Analytics Engineer and BI Engineer with experience in finance data pipelines, cost allocation, cloud analytics, SQL, AWS, Tableau, and QuickSight.",
  keywords: [
    "Madhvika Sehgal",
    "Analytics Engineer",
    "Business Intelligence Engineer",
    "BI Engineer",
    "Finance Analytics",
    "SQL",
    "AWS",
    "Tableau",
    "QuickSight",
    "Cost Allocation",
    "Data Pipelines",
    "Analytics Engineering",
  ],
  authors: [{ name: "Madhvika Sehgal" }],
  creator: "Madhvika Sehgal",
  openGraph: {
    title: "Madhvika Sehgal | Analytics Engineer & BI Engineer",
    description:
      "Finance analytics, SQL-heavy data pipelines, cloud analytics, BI dashboards, and stakeholder-ready reporting.",
    url: siteUrl,
    siteName: "Madhvika Sehgal Portfolio",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Madhvika Sehgal - Analytics Engineer and BI Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhvika Sehgal | Analytics Engineer & BI Engineer",
    description:
      "Finance analytics, SQL-heavy data pipelines, cloud analytics, BI dashboards, and stakeholder-ready reporting.",
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
