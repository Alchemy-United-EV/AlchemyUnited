import React from "react";

type Testimonial = {
  name: string;
  location: string;
  role: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    location: "San Francisco, CA",
    role: "Model S Owner",
    quote:
      "I finally trust my route planning again. Guaranteed slots are a game changer."
  },
  {
    name: "Michael Rodriguez",
    location: "Austin, TX",
    role: "Host Partner",
    quote:
      "Clear revenue share and predictable demand made it easy to greenlight our site."
  },
  {
    name: "Jennifer Walsh",
    location: "Seattle, WA",
    role: "Lucid Air Driver",
    quote:
      "Charging is as smooth as the drive—fast, available, and premium."
  },
  {
    name: "David Kim",
    location: "Los Angeles, CA",
    role: "BMW iX Owner",
    quote:
      "No more guesswork. The uptime and reservation system just work."
  }
];

const partnerNames = [
  "Mercedes-Benz",
  "Tesla Network",
  "BMW Charging",
  "Audi e-tron",
  "Lucid Motors",
  "Rivian"
];

export default function SocialProof({ showLogos = true }: { showLogos?: boolean }) {
  return (
    <section aria-labelledby="social-proof-heading" className="mx-auto max-w-6xl px-4 py-12">
      <h2 id="social-proof-heading" className="text-2xl font-bold mb-6">Trusted by drivers and hosts</h2>

      {/* Testimonials */}
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <li key={i} className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-700">"{t.quote}"</p>
            <div className="mt-4 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="mx-2 text-slate-400">•</span>
              <span className="text-slate-600">{t.location}</span>
              <div className="text-slate-500">{t.role}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Partner logos (placeholder boxes) */}
      {showLogos && (
        <>
          <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
            Partner Networks (placeholders)
          </h3>
          <div role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {partnerNames.map((name) => (
              <div
                key={name}
                role="listitem"
                className="h-12 rounded-md border bg-slate-50 grid place-items-center text-xs text-slate-600"
                aria-label={`${name} (placeholder)`}
                title={name}
              >
                {name}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}