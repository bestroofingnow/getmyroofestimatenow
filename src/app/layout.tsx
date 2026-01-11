import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
import {
  VoiceActionSchema,
  ConversationalContentSchema,
} from "@/components/VoiceSearchSchema";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { SkipToContent } from "@/components/shared";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://getmyroofestimatenow.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Get My Roof Estimate Now | Get Your Free Roofing Quote in 60 Seconds",
    template: "%s | Get My Roof Estimate Now",
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
  authors: [{ name: "Get My Roof Estimate Now" }],
  creator: "Get My Roof Estimate Now",
  publisher: "Get My Roof Estimate Now",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Get Your Free Get My Roof Estimate Now in 60 Seconds",
    description: "Accurate roof replacement estimates in 60 seconds using satellite imagery. No hassle, no obligation. Trusted measurements used by millions through Google Services.",
    type: "website",
    url: siteUrl,
    siteName: "Get My Roof Estimate Now",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Get My Roof Estimate Now Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your Free Get My Roof Estimate Now in 60 Seconds",
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
        {/* Core SEO Schemas */}
        <OrganizationSchema />
        <WebsiteSchema />
        <ServiceSchema />
        <LocalBusinessSchema />
        <HowToSchema />
        <SoftwareApplicationSchema />
        <ProductSchema />
        {/* Voice Search & AI Optimization Schemas */}
        <VoiceActionSchema
          actionType="get_estimate"
          targetUrl="https://getmyroofestimatenow.com"
          description="Get a free instant roof estimate using satellite imagery"
        />
        <ConversationalContentSchema
          headline="Get Your Free Roof Estimate in 60 Seconds"
          summary="Get My Roof Estimate Now uses satellite imagery to measure your roof and provide accurate cost estimates. No appointment needed, no one climbs on your roof, and it's completely free."
          keyPoints={[
            "Free satellite-based roof measurements in 60 seconds",
            "Average roof replacement costs $5,000 to $15,000",
            "Connect with licensed local roofing contractors",
            "No credit card or obligation required"
          ]}
          pageUrl="https://getmyroofestimatenow.com"
          topic="Roof Replacement Estimate"
        />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        <SkipToContent />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y5ZVZYVLRE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y5ZVZYVLRE');
          `}
        </Script>
        {children}
        {/* Exit Intent Popup - shows when user tries to leave */}
        <ExitIntentPopup delay={10000} />
      </body>
    </html>
  );
}
