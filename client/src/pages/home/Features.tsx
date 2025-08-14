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
    <section aria-labelledby="features-heading" className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(90deg,rgba(255,179,179,0.22),rgba(180,255,207,0.22))] px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <span className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors bg-white shadow-sm text-gray-900">Problems</span>
          <div className="w-6 h-6 text-gold">🔄</div>
          <span className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors bg-transparent text-gray-600 hover:text-gray-800">Solutions</span>
        </div>
        <h2 id="features-heading" className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-gray-900">We Solve Real </span><span className="text-[#D4AF37]">EV</span><span className="text-emerald-600"> Problems</span>
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-center text-gray-600">Tap any card to see how we transform industry pain points into seamless experiences</p>
      </div>
      <div className="mt-10 sm:mt-12 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {pairs.map(pair => {
          const isFlipped = !!flipped[pair.id];
          return (
            <div key={pair.id} className="group perspective reveal">
              <button
                type="button"
                onClick={() => toggle(pair.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(pair.id); }}}
                aria-pressed={isFlipped}
                aria-label={isFlipped ? "Show problem" : "Show solution"}
                className="relative w-full h-72 focus:outline-none transform hover:scale-105 transition-transform duration-200 touch-tap"
              >
                <div className={`preserve-3d duration-700 ease-out relative w-full h-full ${isFlipped ? "rotate-y-180" : ""} hover:shadow-elev-2`}>
                  {/* Problem side (front) */}
                  <div className="absolute inset-0 backface-hidden bg-[linear-gradient(180deg,rgba(255,0,0,0.04),rgba(255,255,255,0)_60%)]">
                    <div className="rounded-3xl p-6 sm:p-7 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] transition-shadow h-full">
                      <div className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">⚠️</span>
                        </div>
                        <span className="text-rose-600">PROBLEM</span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-gray-900">{pair.problemTitle}</h3>
                      <p className="mt-2 text-gray-700">{pair.problemText}</p>
                      <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        <span>Tap for solution</span>
                      </div>
                    </div>
                  </div>
                  {/* Solution side (back) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0)_60%)]">
                    <div className="rounded-3xl p-6 sm:p-7 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] transition-shadow h-full">
                      <div className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✅</span>
                        </div>
                        <span className="text-emerald-600">SOLUTION</span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-gray-900">{pair.solutionTitle}</h3>
                      <p className="mt-2 text-gray-700">{pair.solutionText}</p>
                      <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        <span>Tap for problem</span>
                      </div>
                    </div>
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