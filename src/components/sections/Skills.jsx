import Reveal from "../common/Reveal";
import Marquee from "../common/Marquee";
import { SKILLS, MARQUEE_ITEMS } from "../../data/content";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            What I work with
          </h2>
          <p className="mt-4 max-w-[60ch] text-zinc-400">
            Languages, frameworks, and AI tooling I reach for when building
            full-stack products and autonomous agents.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12">
        <Marquee items={MARQUEE_ITEMS} />
      </Reveal>

      <div className="mx-auto mt-14 max-w-content px-6 md:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.05}>
              <div
                className={`relative h-full overflow-hidden rounded-3xl border p-6 ${
                  group.tint
                    ? "border-lime-400/20 bg-lime-400/[0.06]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {group.tint && (
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lime-400/20 blur-2xl" />
                )}
                <h3 className="font-display text-sm font-semibold text-zinc-100">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
