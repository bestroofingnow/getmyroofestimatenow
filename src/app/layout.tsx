import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  OrganizationSchema,
  WebsiteSchema,
  ServiceSchema,
  LocalBusinessSchema,
  HowToSchema,
  SoftwareApplicationSchema,
  ProductSchema,
} from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://instantroofestimate.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Instant Roof Estimate | Get Your Free Roofing Quote in 60 Seconds",
    template: "%s | Instant Roof Estimate",
  },
  description: "Get an instant, accurate roof replacement estimate using satellite imagery. Free, fast, and no obligation. Enter your address to start.",
  keywords: [
    "roof estimate",
    "roofing quote",
    "roof replacement cost",
    "instant roof estimate",
    "free roof quote",
    "roof cost calculator",
    "roofing estimate online",
    "satellite roof measurement",
    "roof replacement estimate",
    "new roof cost",
    "roofing contractor",
    "roof inspection",
  ],
  authors: [{ name: "Instant Roof Estimate" }],
  creator: "Instant Roof Estimate",
  publisher: "Instant Roof Estimate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo-small.png",
    apple: "/logo-small.png",
  },
  openGraph: {
    title: "Get Your Free Instant Roof Estimate in 60 Seconds",
    description: "Accurate roof replacement estimates in 60 seconds using satellite imagery. No hassle, no obligation. Trusted by 10,000+ homeowners.",
    type: "website",
    url: siteUrl,
    siteName: "Instant Roof Estimate",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Instant Roof Estimate Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your Free Instant Roof Estimate in 60 Seconds",
    description: "Accurate roof replacement estimates using satellite imagery. Free, fast, and no obligation.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
        <ServiceSchema />
        <LocalBusinessSchema />
        <HowToSchema />
        <SoftwareApplicationSchema />
        <ProductSchema />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
