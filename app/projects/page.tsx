import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { caseStudies } from "@/lib/caseStudies";
import { mlSummary } from "@/lib/mlCards";
import { SITE } from "@/lib/site";

const DESCRIPTION =
  "Case studies of three ML systems projects: an MLOps deployment lab, a Responsible AI evaluation system, and a neural network training benchmark. Verified, locally measured results only.";

export const metadata: Metadata = {
  title: "ML systems case studies",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/projects` },
  openGraph: {
    title: "ML systems case studies",
    description: DESCRIPTION,
    url: `${SITE}/projects`,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ML systems case studies",
      },
    ],
  },
};

export default function ProjectsIndex() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="relative">
        <div className="aurora pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="relative mx-auto max-w-site px-6 pb-24 pt-28 md:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-xs uppercase tracking-wider text-muted"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-lime">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-paper">
                Case studies
              </li>
            </ol>
          </nav>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ ml systems ]
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-tight text-paper">
            Case studies
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            {mlSummary.text}
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/projects/${c.slug}`}
                  className="glass card-hover flex h-full flex-col rounded-lg p-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-lime">
                    {c.kicker}
                  </span>
                  <span className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-paper">
                    {c.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {c.summary}
                  </span>
                  <span className="mt-4 font-mono text-xs uppercase tracking-wider text-paper">
                    Read case study <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
