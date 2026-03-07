import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BagsFeeHub — Real-Time Creator Fees on Bags.fm",
  description:
    "Track your 1% creator trading fees, claim stats, volume, and active traders. One-click claim transaction generator powered by the Bags API.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "BagsFeeHub",
    description: "Real-time creator earnings dashboard for Bags.fm token deployers.",
    url: "https://bagsfeehub.vercel.app",
    siteName: "BagsFeeHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BagsFeeHub — Creator Fees Dashboard",
    description: "Track your 1% Bags creator fees in real-time!",
    creator: "@0xshobha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-grid`}
      >
        {children}
      </body>
    </html>
  );
}
