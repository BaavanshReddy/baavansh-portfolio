import { profile } from "@/lib/profile";

const MARQUEE = [
  "Production RAG",
  "Systems & Compilers",
  "Native Hindi + Telugu",
  "NCAA Division I",
  "Ships through fatigue",
  "Leads, doesn't hand off",
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg mask-fade-b absolute inset-0 opacity-70" />
      <div className="absolute -right-40 -top-32 h-[28rem] w-[28rem] rounded-full bg-lime/10 blur-3xl" />

      <div className="relative mx-auto max-w-site px-6 pb-16 pt-36 md:pt-44">
        <p
          className="animate-fade-up font-mono text-xs uppercase tracking-[0.28em] text-lime"
          style={{ animationDelay: "0s" }}
        >
          {profile.headline}
        </p>

        <h1 className="mt-6 font-display font-bold uppercase leading-[0.9] tracking-tight">
          <span
            className="animate-fade-up block text-[clamp(2.6rem,10.5vw,7.5rem)]"
            style={{ animationDelay: "0.06s" }}
          >
            Baavansh
          </span>
          <span
            className="animate-fade-up block text-[clamp(2.6rem,10.5vw,7.5rem)]"
            style={{ animationDelay: "0.12s" }}
          >
            Reddy
          </span>
          <span
            className="animate-fade-up block text-[clamp(2.6rem,10.5vw,7.5rem)] text-transparent"
            style={{
              animationDelay: "0.18s",
              WebkitTextStroke: "2px #CCFF00",
            }}
          >
            Gundlapalli
          </span>
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-2xl text-balance text-lg text-muted md:text-2xl"
          style={{ animationDelay: "0.26s" }}
        >
          {profile.tagline}
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.34s" }}
        >
          <a
            href="#chat"
            className="group inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
          >
            Ask my AI anything
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center border border-line px-6 py-3.5 font-mono text-sm uppercase tracking-wide text-paper transition-colors hover:border-lime hover:text-lime"
          >
            View work
          </a>
          <a
            href={profile.resumeUrl}
            className="font-mono text-sm uppercase tracking-wide text-muted underline underline-offset-4 transition-colors hover:text-lime"
          >
            Résumé ↓
          </a>
        </div>

        <div
          className="animate-fade-up mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted"
          style={{ animationDelay: "0.42s" }}
        >
          <span>
            <span className="text-lime">◆</span> {profile.status}
          </span>
          <span>
            <span className="text-lime">◆</span> {profile.university}
          </span>
          <span>
            <span className="text-lime">◆</span> {profile.location}
          </span>
        </div>
      </div>

      <div className="overflow-hidden border-y border-line bg-lime py-3">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {MARQUEE.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-6 px-6 font-display text-sm font-bold uppercase tracking-wide text-ink"
                >
                  {m}
                  <span className="text-ink/35">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
