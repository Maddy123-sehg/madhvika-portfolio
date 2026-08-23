import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://madhvika-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Madhvika Sehgal | Business Intelligence Engineer",
    template: "%s | Madhvika Sehgal",
  },
  description:
    "Business Intelligence Engineer with 4+ years across Amazon, Barclays, and Accenture, building SQL data models, cloud pipelines, BI systems, experiments, and applied AI workflows.",
  keywords: [
    "Madhvika Sehgal",
    "Analytics Engineer",
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
  ],
  authors: [{ name: "Madhvika Sehgal" }],
  creator: "Madhvika Sehgal",
  openGraph: {
    title: "Madhvika Sehgal | Business Intelligence Engineer",
    description:
      "SQL data models, cloud pipelines, BI systems, experimentation, financial and customer analytics, and applied AI.",
    url: siteUrl,
    siteName: "Madhvika Sehgal Portfolio",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Madhvika Sehgal - Business Intelligence Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhvika Sehgal | Business Intelligence Engineer",
    description:
      "SQL data models, cloud pipelines, BI systems, experimentation, financial and customer analytics, and applied AI.",
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
