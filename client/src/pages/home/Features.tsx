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
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-green-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <span>Problems</span>
          <div className="w-6 h-6 text-yellow-500">🔄</div>
          <span>Solutions</span>
        </div>
        <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          We Solve Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-600">EV Problems</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Tap any card to see how we transform industry pain points into seamless experiences</p>
      </div>
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
                className="relative w-full h-72 focus:outline-none transform hover:scale-105 transition-transform duration-200"
              >
                <div className={`preserve-3d duration-700 ease-out relative w-full h-full ${isFlipped ? "rotate-y-180" : ""} hover:shadow-2xl`}>
                  {/* Problem side (front) */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl p-6 shadow-lg bg-gradient-to-br from-red-50 to-red-100 hover:shadow-xl transition-all duration-300 border border-red-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">⚠️</span>
                      </div>
                      <p className="text-sm font-bold text-red-700 uppercase tracking-wide">Problem</p>
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-3 leading-tight">{pair.problemTitle}</h3>
                    <p className="text-sm text-red-900/90 leading-relaxed mb-4">{pair.problemText}</p>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-red-600 font-semibold bg-red-200/50 px-3 py-1.5 rounded-full">
                      <span>Tap</span>
                      <div className="w-4 h-4 animate-spin">🔄</div>
                      <span>for solution</span>
                    </div>
                  </div>
                  {/* Solution side (back) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✅</span>
                      </div>
                      <p className="text-sm font-bold text-green-700 uppercase tracking-wide">Solution</p>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-3 leading-tight">{pair.solutionTitle}</h3>
                    <p className="text-sm text-green-900/90 leading-relaxed mb-4">{pair.solutionText}</p>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-200/50 px-3 py-1.5 rounded-full">
                      <span>Tap</span>
                      <div className="w-4 h-4 animate-spin">🔄</div>
                      <span>for problem</span>
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