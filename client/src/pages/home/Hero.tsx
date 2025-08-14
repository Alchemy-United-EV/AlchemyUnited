import React from "react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      {/* Gold glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(212,175,55,0.12),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* Category pill */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),rgba(255,255,255,0.9)_60%)] px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm">
          ⚡ EV CHARGING
        </div>

        {/* Title */}
        <h1 className="text-center leading-tight tracking-tight mt-4">
          <span className="block text-transparent italic font-extrabold bg-[linear-gradient(135deg,#111_0%,#2b2b2b_35%,#7f6a2a_55%,#d4af37_75%,#f4e3a1_100%)] bg-clip-text drop-shadow-[0_1px_0_rgba(0,0,0,0.25)] [text-shadow:0_1px_0_#000,0_2px_6px_rgba(0,0,0,0.25)] text-6xl sm:text-7xl md:text-8xl">Alchemy</span>
          <span className="block text-transparent italic font-extrabold bg-[linear-gradient(135deg,#111_0%,#2b2b2b_35%,#7f6a2a_55%,#d4af37_75%,#f4e3a1_100%)] bg-clip-text drop-shadow-[0_2px_0_rgba(0,0,0,0.3)] [text-shadow:0_2px_0_#000,0_3px_10px_rgba(0,0,0,0.35)] text-6xl sm:text-7xl md:text-8xl -mt-1">United</span>
        </h1>

        {/* Subcopy */}
        <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-gray-700">
          Discover the pinnacle of EV charging. Alchemy United connects you to an elite network of gold-standard stations — fast, reliable, and reserved for discerning drivers.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/early-access" className="w-full sm:w-auto">
            <button className="w-full rounded-2xl bg-[#D4AF37] px-7 py-4 font-semibold text-black shadow-[0_8px_28px_rgba(212,175,55,0.25)] hover:-translate-y-0.5 duration-200 transition-transform active:translate-y-0">
              Get Early Access
            </button>
          </Link>
          <Link href="/host-application" className="w-full sm:w-auto">
            <button className="w-full rounded-2xl border border-[#D4AF37]/60 bg-white hover:bg-yellow-50 duration-200 px-7 py-4 font-semibold text-neutral-800 shadow-sm transition-all">
              Become a Host
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}