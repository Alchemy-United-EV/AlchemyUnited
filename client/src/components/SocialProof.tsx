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
    <section aria-labelledby="social-proof-heading" className="mx-auto max-w-6xl px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Trusted Network</span>
        </div>
        <h2 id="social-proof-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">1,000+</span> Users
        </h2>
        <p className="text-gray-600 mt-2">Real stories from drivers and hosts in our network</p>
      </div>

      {/* Testimonials */}
      <ul className="grid gap-6 md:grid-cols-2 mb-16">
        {testimonials.map((t, i) => (
          <li key={i} className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{t.name}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, starI) => (
                        <div key={starI} className="w-4 h-4 text-yellow-400">⭐</div>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>{t.location}</span>
                    <span className="mx-1">•</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">{t.role}</span>
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed italic">
                "{t.quote}"
              </blockquote>
            </div>
          </li>
        ))}
      </ul>

      {/* Partner logos */}
      {showLogos && (
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Trusted Partners</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Integrated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Leading Networks</span>
            </h3>
            <p className="text-gray-600">Connect with the most trusted EV charging brands</p>
          </div>
          
          <div role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {partnerNames.map((name, index) => (
              <div
                key={name}
                role="listitem"
                className="group relative h-16 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
                aria-label={`${name} EV charging network partner`}
                title={`${name} - EV Charging Network Partner`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 h-full flex items-center justify-center p-3">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 leading-tight">
                      {name}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">50+</span> charging networks • 
              <span className="font-semibold text-gray-700 ml-1">10,000+</span> stations • 
              <span className="font-semibold text-gray-700 ml-1">99.9%</span> uptime
            </p>
          </div>
        </div>
      )}
    </section>
  );
}