import React from "react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      {/* Gold glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(212,175,55,0.12),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        {/* Category pill */}
        <div className="mx-auto w-fit rounded-full border border-yellow-500/30 bg-white/80 px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur">
          ⚡ EV CHARGING
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center font-extrabold leading-tight tracking-tight">
          <span className="block text-5xl sm:text-6xl md:text-7xl text-neutral-900">Alchemy</span>
          <span className="block text-5xl sm:text-6xl md:text-7xl text-[#D4AF37]">United</span>
        </h1>

        {/* Subcopy */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg sm:text-xl text-neutral-600">
          Discover the pinnacle of EV charging. Alchemy United connects you to an elite network of gold-standard stations — fast, reliable, and reserved for discerning drivers.
        </p>

        {/* CTAs */}
        <div className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/early-access" className="w-full sm:w-auto">
            <button className="w-full rounded-2xl bg-[#D4AF37] px-7 py-4 font-semibold text-black shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
              Get Early Access
            </button>
          </Link>
          <Link href="/host-application" className="w-full sm:w-auto">
            <button className="w-full rounded-2xl border border-[#D4AF37]/50 bg-white px-7 py-4 font-semibold text-neutral-800 shadow-sm transition-all duration-200 hover:shadow-md">
              Become a Host
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}