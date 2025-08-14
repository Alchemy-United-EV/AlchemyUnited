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
      "Finally found reliable EV charging with guaranteed availability. This premium EV charging network changed my road trip planning completely."
  },
  {
    name: "Michael Rodriguez",
    location: "Austin, TX",
    role: "EV Host Partner",
    quote:
      "The EV host revenue model is transparent and profitable. Fast charging demand keeps my site busy with excellent returns."
  },
  {
    name: "Jennifer Walsh",
    location: "Seattle, WA",
    role: "Lucid Air Driver",
    quote:
      "This premium EV charging service delivers fast, reliable EV charging every time. The network uptime is genuinely impressive."
  },
  {
    name: "David Kim",
    location: "Los Angeles, CA",
    role: "BMW iX Owner",
    quote:
      "Best EV charging network experience I've had. No more unreliable chargers—just fast charging when I need it."
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
      <h2 id="social-proof-heading" className="text-3xl font-bold mb-8 text-center">Trusted by Drivers and Hosts</h2>

      {/* Testimonials */}
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Customer Testimonials</h3>
      <ul className="grid gap-6 md:grid-cols-2 mb-12">
        {testimonials.map((t, i) => (
          <li key={i} className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-base text-slate-700 leading-relaxed">"{t.quote}"</p>
            <div className="mt-4 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="mx-2 text-slate-400">•</span>
              <span className="text-slate-600">{t.location}</span>
              <div className="text-slate-500 mt-1">{t.role}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Partner logos */}
      {showLogos && (
        <>
          <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
            Partner Networks
          </h3>
          <div role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {partnerNames.map((name) => (
              <div
                key={name}
                role="listitem"
                className="h-14 rounded-lg border border-gray-200 bg-white grid place-items-center text-sm text-gray-700 font-medium hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 cursor-pointer"
                aria-label={`${name} EV charging network partner`}
                title={`${name} - EV Charging Network Partner`}
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