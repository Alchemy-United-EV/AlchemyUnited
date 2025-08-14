import React, {useState} from "react";

type Pair = {
  id: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
};

const pairs: Pair[] = [
  {
    id: "p1",
    problemTitle: "Unreliable public chargers",
    problemText:
      "Hosts and drivers can't trust availability or uptime. Trips get re-routed, time is wasted.",
    solutionTitle: "Guaranteed reservations",
    solutionText:
      "Premium chargers with bookable time slots and 99.9% uptime SLAs keep trips on schedule."
  },
  {
    id: "p2",
    problemTitle: "Slow charge speeds",
    problemText:
      "Legacy equipment and power limits cause long dwell times and poor throughput.",
    solutionTitle: "High-power hardware",
    solutionText:
      "Modern DC equipment with real-time power management for fast, predictable sessions."
  },
  {
    id: "p3",
    problemTitle: "Poor host economics",
    problemText:
      "Utilization is inconsistent and fees are opaque, so ROI is unclear for site owners.",
    solutionTitle: "Aligned incentives",
    solutionText:
      "Transparent revenue share, dynamic pricing, and demand shaping maximize host earnings."
  }
];

export default function Features() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section aria-labelledby="features-heading" className="mx-auto max-w-6xl px-4 py-12">
      <h2 id="features-heading" className="text-2xl font-bold mb-6">EV Pain Points → Solutions</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pairs.map(pair => {
          const isFlipped = !!flipped[pair.id];
          return (
            <div key={pair.id} className="group perspective">
              <button
                type="button"
                onClick={() => toggle(pair.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(pair.id); }}}
                aria-pressed={isFlipped}
                aria-label={isFlipped ? "Show problem" : "Show solution"}
                className="relative w-full h-56 focus:outline-none"
              >
                <div className={`preserve-3d duration-500 ease-out relative w-full h-full ${isFlipped ? "rotate-y-180" : ""}`}>
                  {/* Problem side (front) */}
                  <div className="absolute inset-0 backface-hidden rounded-lg p-4 border shadow-sm bg-red-50">
                    <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">Problem</p>
                    <h3 className="mt-1 font-semibold">{pair.problemTitle}</h3>
                    <p className="mt-2 text-sm text-red-900/80">{pair.problemText}</p>
                    <p className="absolute bottom-3 right-4 text-xs text-red-700">Tap ↻ for solution</p>
                  </div>
                  {/* Solution side (back) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg p-4 border shadow-sm bg-green-50">
                    <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Solution</p>
                    <h3 className="mt-1 font-semibold">{pair.solutionTitle}</h3>
                    <p className="mt-2 text-sm text-green-900/80">{pair.solutionText}</p>
                    <p className="absolute bottom-3 right-4 text-xs text-green-700">Tap ↻ for problem</p>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Minimal CSS utilities for 3D flip (scoped) */}
      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}