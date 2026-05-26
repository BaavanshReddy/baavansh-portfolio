import { edges } from "@/lib/profile";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-y border-ink bg-lime py-24 text-ink md:py-32"
    >
      <div className="mx-auto max-w-site px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">
          [ what makes me different ]
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold uppercase leading-[1.03] tracking-tight">
              Most people hand the problem up.{" "}
              <span className="decoration-clone bg-ink px-2 text-lime">
                I hand up the solution.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                When most people hit a problem, they carry it to their
                supervisor and hand it over. That's where their part ends.
              </p>
              <p>
                I work the other way. By nature I show up having already mapped
                it —{" "}
                <strong className="font-semibold text-ink">
                  here's the problem, here's my read on it, here are two or
                  three ways to solve it, and here are the people and resources
                  to get it done.
                </strong>
              </p>
              <p>
                I'm good at reading the people around me: spotting what each
                person does best and routing work to where it actually gets
                done. I don't wait to be handed a plan. I take charge of one.
              </p>

              {/* Hire signals — what companies are actually looking for */}
              <div className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                {[
                  { k: "Production AI", v: "shipped" },
                  { k: "Open source", v: "1 library" },
                  { k: "Systems in C", v: "3 projects" },
                  { k: "Test coverage", v: "pytest + JUnit" },
                  { k: "Stack range", v: "DB → UI" },
                  { k: "Internships", v: "4 completed" },
                ].map((m) => (
                  <div
                    key={m.k}
                    className="border border-ink/20 bg-ink/[0.04] p-3"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
                      {m.k}
                    </p>
                    <p className="mt-0.5 font-display text-base font-bold uppercase tracking-tight">
                      {m.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink/55">
              Unfair edges
            </p>
            <ul className="mt-4 border-t border-ink/15">
              {edges.map((e, i) => (
                <li
                  key={e.title}
                  className="group border-b border-ink/15 py-4 transition-all hover:bg-ink/[0.03] hover:pl-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-ink/40">
                      0{i + 1}
                    </span>
                    <p className="font-display text-lg font-bold uppercase tracking-tight">
                      {e.title}
                    </p>
                  </div>
                  <p className="mt-1 pl-7 text-sm text-ink/70">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
