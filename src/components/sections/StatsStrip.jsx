import Reveal from "../common/Reveal";
import { STATS } from "../../data/content";

export default function StatsStrip() {
  return (
    <section className="border-y border-white/10">
      <Reveal className="mx-auto grid max-w-content grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex items-baseline justify-center gap-3 py-6 sm:flex-col sm:items-center sm:gap-1 sm:text-center"
          >
            <span className="font-display text-3xl font-semibold text-zinc-50 md:text-4xl">
              {stat.value}
            </span>
            <span className="text-sm text-zinc-500">{stat.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
