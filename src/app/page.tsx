"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ─── Stars Background ─── */
function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    left: `${(13 * i + 7) * 43 % 100}%`,
    top: `${(17 * i + 5) * 61 % 100}%`,
    delay: `${(0.14 * i % 2.5).toFixed(2)}s`,
    size: `${2 + i % 3}px`,
    dur: `${2 + i % 3}s`,
  }));

  return (
    <div className="tarot-stars">
      {stars.map((s, i) => (
        <span
          key={i}
          className="tarot-star"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, ["--dur" as string]: s.dur }}
        />
      ))}
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="font-display text-xl text-gold-gradient font-bold tracking-wider">NORNA</Link>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/about" className="text-[#9ca3af] hover:text-white transition-colors">About</Link>
          <Link href="/faq" className="text-[#9ca3af] hover:text-white transition-colors">FAQ</Link>
        </div>
      </div>
    </nav>
  );
}

export default function HomePage() {
  return (
    <>
      <Stars />
      <Navbar />

      <main className="relative z-10">
        {/* ═══ Hero ═══ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 30%, #1a1040 0%, #0a0a14 60%, #050510 100%)" }}>
          {/* Decorative rings */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", width: 300, height: 300, opacity: 0.1 }}>
            <svg viewBox="0 0 300 300" fill="none" style={{ width: "100%", height: "100%" }}>
              <circle cx="150" cy="150" r="140" stroke="rgba(212,168,83,0.4)" strokeWidth="0.5" />
              <circle cx="150" cy="150" r="110" stroke="rgba(155,126,240,0.3)" strokeWidth="0.5" />
              <circle cx="150" cy="150" r="80" stroke="rgba(212,168,83,0.3)" strokeWidth="0.5" />
              <path d="M150 10 L172 114 L270 114 L190 162 L212 266 L150 218 L88 266 L110 162 L30 114 L128 114 Z" fill="rgba(212,168,83,0.05)" stroke="rgba(212,168,83,0.2)" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
            <p style={{ color: "rgba(212,168,83,0.7)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
              AI Tarot · Norse Wisdom
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Discover What the Fates{" "}
              <span className="text-gold-gradient">Hold for You</span>
            </h1>
            <p style={{ color: "#a8a0c0", fontSize: "14px", lineHeight: 1.7, marginBottom: "32px" }}>
              AI-powered tarot readings guided by the wisdom of the Norse Norns — Urd, Verdandi, and Skuld.
              Draw your cards and uncover the threads of destiny.
            </p>

            {/* Feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "36px", textAlign: "left" }}>
              {[
                { label: "5 Topics", desc: "Love · Career · Wealth · Daily · General", color: "#d4a853", borderColor: "rgba(212,168,83,0.2)" },
                { label: "1 or 3 Cards", desc: "Quick insight or full spread", color: "#9b7ef0", borderColor: "rgba(155,126,240,0.2)" },
                { label: "78 Card Deck", desc: "Major & Minor Arcana with real artwork", color: "#d4a853", borderColor: "rgba(212,168,83,0.2)" },
                { label: "AI Interpretation", desc: "Deep, personalized readings", color: "#9b7ef0", borderColor: "rgba(155,126,240,0.2)" },
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(16,10,40,0.8)", border: `1px solid ${item.borderColor}`, borderRadius: 12, padding: 14 }}>
                  <div style={{ color: item.color, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: "#7a6a9a", fontSize: 11, lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <Link href="/reading/three-card" className="btn-gold inline-block px-8 py-4 text-base font-semibold tracking-wide">
              Start Your Free Reading →
            </Link>
            <p className="mt-4 text-xs" style={{ color: "rgba(168,160,192,0.5)" }}>
              ✦ No sign-up required · Completely free
            </p>
          </div>
        </section>

        {/* ═══ Footer ═══ */}
        <footer className="bg-[#060610] border-t border-[rgba(255,255,255,0.04)] py-10 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9ca3af]/60">
            <p>© 2026 Norna. For entertainment purposes only.</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
