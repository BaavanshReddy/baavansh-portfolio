import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { profile } from "@/lib/profile";
import MotionProvider from "@/components/MotionProvider";
import { SITE } from "@/lib/site";

// Fonts are vendored into the repo (app/fonts) and served from our own
// domain: no render-blocking Google Fonts request, no layout shift, and the
// build never depends on fonts.googleapis.com being reachable.
const spaceGrotesk = localFont({
  src: [
    {
      path: "./fonts/space-grotesk-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/space-grotesk-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/space-grotesk-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/space-grotesk-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "./fonts/jetbrains-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05050a",
};

const TITLE = "Baavansh Reddy Gundlapalli | Backend, AI & ML Systems Engineer";
const DESCRIPTION =
  "Backend and AI systems engineer with four years across REST APIs and IoT platforms, now LLM/ML integration, plus ML systems case studies (MLflow, Feast, FastAPI, SHAP, PyTorch). Projects, experience, and an AI assistant you can ask about any of it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | Baavansh Reddy Gundlapalli" },
  description: DESCRIPTION,
  applicationName: "Baavansh Reddy Gundlapalli",
  authors: [{ name: profile.name, url: SITE }],
  creator: profile.name,
  keywords: [
    "backend engineer",
    "AI systems engineer",
    "LLM integration",
    "RAG",
    "Python",
    "FastAPI",
    "Java",
    "Spring Boot",
    "IoT",
    "ML systems",
    "MLOps",
    "MLflow",
    "Feast",
    "PyTorch",
    "Responsible AI",
    "Rutgers",
    "software engineer 2026",
  ],
  alternates: { canonical: SITE },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "profile",
    url: SITE,
    siteName: profile.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

// Structured data: lets Google and LinkedIn read the profile properly.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE,
  email: `mailto:${profile.email}`,
  jobTitle: profile.headline,
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Brunswick",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.university },
  sameAs: [profile.github, profile.linkedin, profile.pypi],
  knowsAbout: [
    "Backend engineering",
    "REST API design",
    "LLM and ML integration",
    "Retrieval-augmented generation",
    "IoT platforms",
    "ML systems and MLOps (project experience)",
    "Model evaluation and explainability",
    "Compilers and computer architecture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
