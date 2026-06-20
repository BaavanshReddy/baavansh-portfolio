import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { profile } from "@/lib/profile";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030304",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://baavansh-portfolio.vercel.app"),
  title: "Baavansh Reddy Gundlapalli — Software Engineer",
  description:
    "Portfolio of Baavansh Reddy Gundlapalli — Rutgers CS graduate building backend systems, AI/ML infrastructure, and Python tooling. Features projects, experience, and an embedded AI assistant you can chat with.",
  openGraph: {
    title: "Baavansh Reddy Gundlapalli — Software Engineer",
    description: profile.tagline,
    type: "website",
    url: "https://baavansh-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baavansh Reddy Gundlapalli — Software Engineer",
    description: profile.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-paper antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
