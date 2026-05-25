import { edges } from "@/lib/profile";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-y border-ink bg-lime py-24 text-ink md:py-32"
    >
      <div className="mx-auto max-w-site px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">
          [ what makes him different ]
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold uppercase leading-[1.03] tracking-tight">
              Most people hand the problem up.{" "}
              <span className="decoration-clone bg-ink px-2 text-lime">
                He hands up the solution.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                When most people hit a problem, they carry it to their
                supervisor and hand it over. That is where their part ends.
              </p>
              <p>
                Baavansh works the other way. By nature he shows up having
                already mapped it —{" "}
                <strong className="font-semibold text-ink">
                  here is the problem, here is my read on it, here are two or
                  three ways to solve it, and here are the people and resources
                  to get it done.
                </strong>
              </p>
              <p>
                He is good at reading the people around him: spotting what each
                person does best and routing work to where it actually gets
                done. He does not wait to be handed a plan. He takes charge of
                one.
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink/55">
              Unfair edges
            </p>
            <ul className="mt-4 border-t border-ink/15">
              {edges.map((e) => (
                <li key={e.title} className="border-b border-ink/15 py-4">
                  <p className="font-display text-lg font-bold uppercase tracking-tight">
                    {e.title}
                  </p>
                  <p className="mt-1 text-sm text-ink/70">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
