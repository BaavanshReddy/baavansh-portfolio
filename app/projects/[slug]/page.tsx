import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { caseStudies, getCaseStudy, type CaseStudy } from "@/lib/caseStudies";
import { profile } from "@/lib/profile";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  const url = `${SITE}/projects/${c.slug}`;
  const title = `${c.title}: case study`;
  return {
    title,
    description: c.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: c.seoDescription,
      type: "article",
      url,
      siteName: profile.name,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: c.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: c.seoDescription,
      images: ["/og.png"],
    },
  };
}

function jsonLd(c: CaseStudy) {
  const url = `${SITE}/projects/${c.slug}`;
  const repo = c.links.find((l) =>
    l.href.startsWith("https://github.com"),
  )?.href;
  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: c.title,
      description: c.seoDescription,
      url,
      author: { "@type": "Person", name: profile.name, url: SITE },
      keywords: c.tags.join(", "),
      about: {
        "@type": "SoftwareSourceCode",
        name: c.title,
        codeRepository: repo,
        programmingLanguage: "Python",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case studies",
          item: `${SITE}/projects`,
        },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
      ],
    },
  ];
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-sm border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-lime/60 hover:text-lime"
    >
      {children} <span aria-hidden>↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();
  const others = caseStudies.filter((o) => o.slug !== c.slug);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(c)) }}
      />
      <main id="main" className="relative">
        <div className="aurora pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
        <article className="relative mx-auto max-w-site px-6 pb-24 pt-28 md:pt-32">
          {/* Breadcrumb */}
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
              <li>
                <Link href="/projects" className="hover:text-lime">
                  Case studies
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-paper">
                {c.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mt-8 max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
              [ {c.kicker} ]
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-tight text-paper">
              {c.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">
              {c.summary}
            </p>
            <p
              role="note"
              className="mt-6 rounded-lg border border-lime/30 bg-lime/[0.05] px-4 py-3 text-sm leading-relaxed text-paper"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-lime">
                Scope ·{" "}
              </span>
              {c.evidenceNote}
            </p>
            <ul
              className="mt-6 flex flex-wrap gap-1.5"
              aria-label="Tools implemented in this project"
            >
              {c.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {c.links.map((l) => (
                <ExternalLink key={l.href} href={l.href}>
                  {l.label}
                </ExternalLink>
              ))}
            </div>
          </header>

          {/* Verified metrics */}
          <section aria-labelledby="metrics-heading" className="mt-14">
            <h2
              id="metrics-heading"
              className="font-mono text-xs uppercase tracking-[0.28em] text-lime"
            >
              [ measured results ]
            </h2>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {c.metrics.map((m) => (
                <div key={m.label} className="flex flex-col bg-surface p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {m.label}
                  </dt>
                  <dd className="mt-2 font-display text-2xl font-bold tracking-tight text-paper">
                    {m.value}
                  </dd>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {m.context}
                  </dd>
                  <dd className="mt-3 break-words font-mono text-[11px] text-faint">
                    <span className="sr-only">Source: </span>
                    <span aria-hidden>src: </span>
                    {m.source}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr]">
            {/* Table of contents */}
            <nav
              aria-label="On this page"
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                On this page
              </p>
              <ol className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 lg:grid-cols-1">
                {c.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-muted transition-colors hover:text-lime"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#screenshots"
                    className="text-sm text-muted transition-colors hover:text-lime"
                  >
                    Screenshots and plots
                  </a>
                </li>
              </ol>
            </nav>

            <div className="min-w-0 max-w-3xl">
              {c.sections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-h`}
                  className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0"
                >
                  <h2
                    id={`${s.id}-h`}
                    className="font-display text-xl font-bold uppercase tracking-tight text-paper md:text-2xl"
                  >
                    {s.heading}
                  </h2>
                  {s.paragraphs?.map((p) => (
                    <p key={p} className="mt-3 leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-3 space-y-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-2 leading-relaxed text-muted"
                        >
                          <span className="text-lime" aria-hidden>
                            →
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.id === "responsible-ai" &&
                    c.slug === "mlops-deployment-lab" && (
                      <p className="mt-3">
                        <Link
                          href="/projects/responsible-ai-evaluation"
                          className="font-mono text-xs uppercase tracking-wider text-paper underline underline-offset-4 hover:text-lime"
                        >
                          Responsible AI Evaluation case study →
                        </Link>
                      </p>
                    )}
                  {s.code && (
                    <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface p-4 font-mono text-[13px] leading-relaxed text-paper">
                      <code>{s.code}</code>
                    </pre>
                  )}
                </section>
              ))}

              {/* Screenshots */}
              <section
                id="screenshots"
                aria-labelledby="screenshots-h"
                className="scroll-mt-24 border-t border-line py-8"
              >
                <h2
                  id="screenshots-h"
                  className="font-display text-xl font-bold uppercase tracking-tight text-paper md:text-2xl"
                >
                  Screenshots and plots
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Real captures and generated plots from the runs described
                  above. Nothing is mocked up.
                </p>
                <div className="mt-6 space-y-10">
                  {c.shots.map((shot) => (
                    <figure key={shot.src}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        unoptimized
                        loading="lazy"
                        sizes="(min-width: 1024px) 768px, 100vw"
                        className="h-auto w-full rounded-lg border border-line bg-white"
                      />
                      <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Other case studies */}
          <nav
            aria-label="Other case studies"
            className="mt-16 border-t border-line pt-10"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              More case studies
            </p>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/projects/${o.slug}`}
                    className="glass card-hover block rounded-lg p-5"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-lime">
                      {o.kicker}
                    </span>
                    <span className="mt-2 block font-display text-lg font-bold uppercase tracking-tight text-paper">
                      {o.title} <span aria-hidden>→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                href="/#ml-systems"
                className="font-mono text-xs uppercase tracking-wider text-muted underline underline-offset-4 hover:text-lime"
              >
                ← Back to ML systems
              </Link>
            </p>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
