import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const SITE_URL = "https://peaceful-rest.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Peaceful Rest Baptist Church | Aurora, CO",
    template: "%s | Peaceful Rest Baptist Church",
  },
  description:
    "God's Perfect Peace, in the midst of Life's Storms. Peaceful Rest Baptist Church in Aurora, CO — Sunday worship at 10am, in-person and online. Pastor Rev. Chuck Survine.",
  keywords: [
    "Baptist church Aurora CO",
    "Peaceful Rest Baptist Church",
    "church Aurora Colorado",
    "Rev Chuck Survine",
    "Sunday worship Aurora",
    "Black church Aurora CO",
    "Northern District Baptist Association",
    "PRBC Aurora",
  ],
  authors: [{ name: "Peaceful Rest Baptist Church" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Peaceful Rest Baptist Church",
    title: "Peaceful Rest Baptist Church | Aurora, CO",
    description:
      "God's Perfect Peace, in the midst of Life's Storms. Join us Sundays at 10am — in person or online. 1195 Lima St, Aurora, CO 80010.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Peaceful Rest Baptist Church — Aurora, CO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peaceful Rest Baptist Church | Aurora, CO",
    description:
      "God's Perfect Peace, in the midst of Life's Storms. Sunday worship at 10am. Aurora, CO.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Peaceful Rest Baptist Church",
  description:
    "God's Perfect Peace, in the midst of Life's Storms. Baptist church serving Aurora, Colorado.",
  url: SITE_URL,
  telephone: "(303) 364-4100",
  email: "info@peacefulrestbc.org",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1195 Lima St",
    addressLocality: "Aurora",
    addressRegion: "CO",
    postalCode: "80010",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:30",
      closes: "12:00",
      description: "Sunday School 8:30am, Worship Service 10am",
    },
  ],
  sameAs: [
    "https://www.youtube.com/@prbcaurora",
    "https://www.instagram.com/prbcaurora",
    "https://www.facebook.com/prbcaurora",
  ],
  member: {
    "@type": "Person",
    name: "Rev. Chuck Survine",
    jobTitle: "Senior Pastor",
  },
  slogan: "God's Perfect Peace, in the midst of Life's Storms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
