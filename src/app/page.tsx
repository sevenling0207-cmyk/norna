"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Starfield from "@/components/Starfield";

const norns = [
  {
    name: "Urd",
    domain: "Past",
    icon: "🕰️",
    desc: "She who carved the runes of what has been. The roots of your story lie in her hands.",
  },
  {
    name: "Verdandi",
    domain: "Present",
    icon: "⚡",
    desc: "She who weaves the threads of now. This moment is where your power lives.",
  },
  {
    name: "Skuld",
    domain: "Future",
    icon: "🌙",
    desc: "She who veils what is yet to come. The unwritten fate awaits your question.",
  },
];

const testimonials = [
  {
    name: "Aria M.",
    text: "Norna's reading about my career change was eerily accurate. Three months later, everything unfolded exactly as the cards suggested.",
    rating: 5,
  },
  {
    name: "James K.",
    text: "I was skeptical, but the love reading gave me clarity I hadn't found anywhere else. The AI interpretation felt deeply personal.",
    rating: 5,
  },
  {
    name: "Luna S.",
    text: "The three-card spread helped me understand a pattern I'd been blind to for years. Truly transformative experience.",
    rating: 5,
  },
  {
    name: "Marcus W.",
    text: "I do a daily reading every morning now. It's become my meditation ritual. Norna just gets it.",
    rating: 5,
  },
  {
    name: "Sophia R.",
    text: "Beautiful interface, profound insights. This is what modern divination should look like.",
    rating: 5,
  },
  {
    name: "Daniel T.",
    text: "The premium reading blew my mind. So specific to my situation — not generic fortune cookie stuff.",
    rating: 5,
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />

      {/* ─── Nav ─── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <span className="font-display text-xl tracking-[0.2em] text-mystic-gold">NORNA</span>
        <Link
          href="/reading"
          className="text-sm text-mystic-star/50 hover:text-mystic-gold transition-colors duration-300 tracking-wider"
        >
          Readings
        </Link>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 md:pt-28 md:pb-36 text-center">
        {/* Decorative circle */}
        <div
          className={`w-24 h-24 md:w-32 md:h-32 rounded-full border border-mystic-gold/20 flex items-center justify-center mb-10 transition-all duration-1000 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-mystic-gold/30 flex items-center justify-center">
            <span className="text-3xl md:text-4xl animate-pulse-glow text-mystic-gold">✦</span>
          </div>
        </div>

        <h1
          className={`font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-gold-gradient leading-tight mb-6 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The stars have a<br className="hidden sm:block" /> message for you
        </h1>

        <p
          className={`text-mystic-star/50 text-sm md:text-base tracking-[0.25em] uppercase mb-12 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Ancient Wisdom, Modern Insight
        </p>

        <Link
          href="/reading"
          className={`btn-shimmer inline-flex items-center gap-3 px-10 py-4 md:px-14 md:py-5 
                     bg-mystic-gold/10 border border-mystic-gold/60 text-mystic-gold 
                     rounded-full text-base md:text-lg tracking-wider font-display
                     hover:bg-mystic-gold hover:text-mystic-deep
                     transition-all duration-500 animate-pulse-glow
                     ${mounted ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-6"}`}
        >
          Begin Your Reading
          <span className="text-sm">→</span>
        </Link>
      </section>

      {/* ─── Norns Section ─── */}
      <section className="relative z-10 px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Ornamental divider */}
          <div className="ornament-divider text-mystic-gold/40 text-xs tracking-[0.3em] uppercase mb-16 md:mb-20">
            ✦ The Three Norns ✦
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {norns.map((norn, i) => (
              <div
                key={norn.name}
                className="group glass rounded-2xl p-8 md:p-10 text-center hover:border-mystic-gold/30 transition-all duration-500"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-500">
                  {norn.icon}
                </div>
                <h3 className="font-display text-xl md:text-2xl text-mystic-gold mb-1">{norn.name}</h3>
                <p className="text-mystic-gold/50 text-xs tracking-[0.2em] uppercase mb-4">{norn.domain}</p>
                <p className="text-mystic-star/50 text-sm leading-relaxed">{norn.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Proof / Testimonials ─── */}
      <section className="relative z-10 pb-20 md:pb-28 overflow-hidden">
        <div className="ornament-divider text-mystic-gold/40 text-xs tracking-[0.3em] uppercase mb-14 md:mb-16 px-6">
          ✦ Seekers Speak ✦
        </div>

        {/* Infinite marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-mystic-deep to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-mystic-deep-end to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] md:w-[360px] mx-3 glass rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-mystic-gold text-xs">★</span>
                  ))}
                </div>
                <p className="text-mystic-star/60 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-mystic-gold/70 text-xs tracking-wider">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Bottom ─── */}
      <section className="relative z-10 px-6 pb-20 md:pb-32 text-center">
        <p className="font-display text-2xl md:text-3xl text-mystic-star/80 mb-4">
          Your destiny is one card away
        </p>
        <p className="text-mystic-star/40 text-sm mb-8">
          Join thousands who trust the Norns for guidance
        </p>
        <Link
          href="/reading"
          className="btn-shimmer inline-flex items-center gap-3 px-10 py-4 bg-mystic-gold text-mystic-deep 
                     rounded-full text-base font-display tracking-wider
                     hover:bg-mystic-gold-light transition-all duration-300
                     shadow-lg shadow-mystic-gold/20"
        >
          Start Free Reading →
        </Link>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-mystic-gold/10 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-sm tracking-[0.2em] text-mystic-gold/40">NORNA</span>
          <p className="text-mystic-star/25 text-xs">
            For entertainment purposes. The stars guide, but you decide.
          </p>
          <div className="flex gap-6 text-mystic-star/30 text-xs">
            <span className="hover:text-mystic-gold/60 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-mystic-gold/60 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
