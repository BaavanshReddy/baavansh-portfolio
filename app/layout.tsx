import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { profile } from "@/lib/profile";
import MotionProvider from "@/components/MotionProvider";

// Self-hosted via next/font: no render-blocking Google Fonts request,
// zero layout shift, served from the same domain.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
