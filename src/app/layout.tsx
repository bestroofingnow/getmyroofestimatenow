import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instant Roof Estimate | Get Your Free Roofing Quote in 60 Seconds",
  description: "Get an instant, accurate roof replacement estimate using satellite imagery. Free, fast, and no obligation. Enter your address to start.",
  keywords: "roof estimate, roofing quote, roof replacement cost, instant roof estimate, free roof quote",
  openGraph: {
    title: "Get Your Free Instant Roof Estimate",
    description: "Accurate roof replacement estimates in 60 seconds using satellite imagery. No hassle, no obligation.",
    type: "website",
    url: "https://instantroofestimate.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
