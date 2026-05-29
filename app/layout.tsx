import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  metadataBase: new URL("https://baavansh-portfolio.vercel.app"),
  title: `${profile.name} — ${profile.headline}`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.headline}`,
    description: profile.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
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
