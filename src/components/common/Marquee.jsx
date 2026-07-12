/**
 * Single continuous marquee, built from two duplicated tracks so the
 * loop is seamless. Pauses on hover, collapses to a static wrapped
 * list under prefers-reduced-motion (handled in index.css).
 */
export default function Marquee({ items }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-zinc-950 to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-zinc-950 to-transparent md:w-32" />

      <div className="marquee-track animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-2 flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-zinc-400 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
