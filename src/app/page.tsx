"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Starfield from "@/components/Starfield";

/* ─── Data ─── */
const readings = [
  {
    id: "three-card",
    title: "Three-Card Spread",
    subtitle: "Past · Present · Future",
    desc: "The classic reading to illuminate any question. Three cards reveal the threads of time woven around your query.",
    price: "Free",
    href: "/reading/three-card",
    popular: true,
  },
  {
    id: "love",
    title: "Love Reading",
    subtitle: "Heart · Partner · Union",
    desc: "Explore the energies that flow between souls. Understand what draws you together and what seeks healing.",
    price: "$2.99",
    href: "/reading/love",
  },
  {
    id: "daily",
    title: "Daily Card",
    subtitle: "Today's Guidance",
    desc: "A single card to set your intention for the day. A morning ritual trusted by thousands of seekers.",
    price: "Free",
    href: "/reading/daily",
  },
  {
    id: "palmistry",
    title: "Palm Reading",
    subtitle: "Lines of Destiny",
    desc: "Upload a photo of your palm and let AI trace the ancient lines that map your fate and fortune.",
    price: "$4.99",
    href: "#",
    soon: true,
  },
];

const testimonials = [
  { name: "Aria M.", text: "Norna's reading about my career change was eerily accurate. Three months later, everything unfolded exactly as the cards suggested.", rating: 5 },
  { name: "James K.", text: "I was skeptical, but the love reading gave me clarity I hadn't found anywhere else. The AI interpretation felt deeply personal.", rating: 5 },
  { name: "Luna S.", text: "The three-card spread helped me understand a pattern I'd been blind to for years. Truly transformative experience.", rating: 5 },
  { name: "Marcus W.", text: "I do a daily reading every morning now. It's become my meditation ritual. Norna just gets it.", rating: 5 },
  { name: "Sophia R.", text: "Beautiful interface, profound insights. This is what modern divination should look like.", rating: 5 },
  { name: "Daniel T.", text: "The premium reading blew my mind. So specific to my situation — not generic fortune cookie stuff.", rating: 5 },
];

const faqs = [
  { q: "How does AI tarot work?", a: "Our AI draws from centuries of tarot wisdom and interprets card combinations in the context of your specific question, creating readings that are both traditional and deeply personal." },
  { q: "Are the readings accurate?", a: "Tarot is a tool for reflection and insight, not prediction. Our AI provides thoughtful interpretations that help you see your situation from new perspectives and discover hidden patterns." },
  { q: "What's included in a free reading?", a: "Free readings include a card draw with a concise interpretation. Premium unlocks deep multi-paragraph analysis, card relationship insights, and actionable guidance." },
  { q: "Is my data private?", a: "Absolutely. Your questions and readings are not stored or shared. Each session is ephemeral — your spiritual journey remains yours alone." },
];

/* ─── Decorative SVG Components ─── */
function OrnamentStar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="currentColor" />
    </svg>
  );
}

function SectionDivider({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 max-w-xs mx-auto mb-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--gold)]/20" />
      {children || <OrnamentStar className="text-[var(--gold)]/40 w-3 h-3" />}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--gold)]/20" />
    </div>
  );
}

/* ─── Main Component ─── */
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Starfield />

      {/* ═══ Navigation ═══ */}
      <nav className="relative z-20 border-b border-[var(--gold)]/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 md:h-20">
          <Link href="/" className="font-display text-lg tracking-[0.25em] text-[var(--gold)]">
            NORNA
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/reading"
              className="hidden md:block text-xs tracking-[0.2em] uppercase text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors duration-300"
            >
              Readings
            </Link>
            <Link
              href="/reading"
              className="text-xs tracking-[0.15em] uppercase px-5 py-2 border border-[var(--gold)]/30 text-[var(--gold)] rounded-full hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ Hero ═══ */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-28 md:pt-32 md:pb-40 text-center overflow-hidden">
        {/* Decorative rotating ring */}
        <div
          className={`relative w-28 h-28 md:w-36 md:h-36 mb-12 transition-all duration-[1.5s] ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="absolute inset-0 rounded-full border border-[var(--gold)]/15 animate-rotate-slow" />
          <div className="absolute inset-2 rounded-full border border-[var(--gold)]/10" style={{ animationDirection: 'reverse', animation: 'rotate-slow 20s linear infinite reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[var(--gold)]/60">
              <path d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5L16 0Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <p
          className={`text-[var(--cream)]/30 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Ancient Wisdom, Modern Insight
        </p>

        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.15] mb-8 max-w-4xl transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-gold-gradient">Discover the Wisdom</span>
          <br />
          <span className="text-[var(--cream)]/80">Hidden in the Cards</span>
        </h1>

        <p
          className={`text-[var(--cream)]/40 text-sm md:text-base max-w-lg leading-relaxed mb-12 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          AI-powered tarot readings guided by the wisdom of the Norse Norns.
          Gain clarity, find direction, and unlock the secrets of your path.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-900 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="/reading"
            className="btn-shimmer inline-flex items-center justify-center gap-3 px-10 py-4 bg-[var(--gold)] text-[var(--deep)] rounded-full text-sm font-semibold tracking-wider hover:bg-[var(--gold-light)] transition-all duration-300 shadow-lg shadow-[var(--gold)]/15"
          >
            Begin Your Reading
          </Link>
          <Link
            href="/reading"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[var(--cream)]/10 text-[var(--cream)]/60 rounded-full text-sm tracking-wider hover:border-[var(--gold)]/30 hover:text-[var(--gold)] transition-all duration-300"
          >
            Explore Readings
          </Link>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--gold)]/15 to-transparent" />
      </section>

      {/* ═══ Readings Section ═══ */}
      <section className="relative z-10 px-6 lg:px-8 pb-28 md:pb-36">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <SectionDivider />
            <p className="text-[var(--cream)]/30 text-[10px] tracking-[0.35em] uppercase mb-4">Our Offerings</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)]/90 mb-4">
              Choose Your <span className="text-gold-gradient italic">Reading</span>
            </h2>
            <p className="text-[var(--cream)]/35 text-sm max-w-md mx-auto leading-relaxed">
              Each spread reveals different facets of your journey. Select the one that calls to your spirit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {readings.map((r, i) => (
              <Link
                key={r.id}
                href={r.href}
                className={`group relative rounded-2xl p-7 md:p-8 border transition-all duration-500
                  ${r.soon
                    ? "border-[var(--cream)]/[0.04] opacity-50 pointer-events-none"
                    : "border-[var(--gold)]/[0.06] hover:border-[var(--gold)]/20 hover:bg-[var(--gold)]/[0.02]"
                  }`}
                style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${200 + i * 100}ms forwards` }}
              >
                {r.popular && (
                  <span className="absolute -top-3 right-6 bg-[var(--gold)] text-[var(--deep)] text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full">
                    Popular
                  </span>
                )}
                {r.soon && (
                  <span className="absolute -top-3 right-6 bg-[var(--purple)]/40 text-[var(--cream)]/70 text-[10px] tracking-wider uppercase px-4 py-1 rounded-full border border-[var(--purple)]/30">
                    Coming Soon
                  </span>
                )}

                <div className="flex items-start gap-5">
                  {/* Geometric icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl border border-[var(--gold)]/15 flex items-center justify-center group-hover:border-[var(--gold)]/30 transition-colors duration-500">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--gold)]/60 group-hover:text-[var(--gold)] transition-colors duration-500">
                      {r.id === "three-card" && <><rect x="1" y="3" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1" /><rect x="7.5" y="2" width="5" height="9" rx="1" stroke="currentColor" strokeWidth="1" /><rect x="14" y="3" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1" /></>}
                      {r.id === "love" && <path d="M10 18s-7-4.5-7-9.5C3 5.5 5 3 7.5 3c1.5 0 2.5 1 2.5 1s1-1 2.5-1C15 3 17 5.5 17 8.5 17 13.5 10 18 10 18z" stroke="currentColor" strokeWidth="1" fill="none" />}
                      {r.id === "daily" && <><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1" /><path d="M10 2v3M10 15v3M2 10h3M15 10h3M4.5 4.5l2 2M13.5 13.5l2 2M4.5 15.5l2-2M13.5 6.5l2-2" stroke="currentColor" strokeWidth="1" /></>}
                      {r.id === "palmistry" && <path d="M10 18c-3.5 0-6-2.5-6-6V7c0-2.5 2-4.5 4-4.5M8 5c0-1.5 1-3 2-3s2 1.5 2 3M12 4c0-1.5 1-2.5 2-2.5s2 1 2 2.5v4" stroke="currentColor" strokeWidth="1" fill="none" />}
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-display text-lg text-[var(--cream)]/90 group-hover:text-[var(--gold)] transition-colors duration-300">
                        {r.title}
                      </h3>
                    </div>
                    <p className="text-[var(--gold)]/40 text-[10px] tracking-[0.2em] uppercase mb-3">{r.subtitle}</p>
                    <p className="text-[var(--cream)]/35 text-sm leading-relaxed mb-4">{r.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium tracking-wider ${r.price === "Free" ? "text-emerald-400/70" : "text-[var(--gold)]/60"}`}>
                        {r.price}
                      </span>
                      {!r.soon && (
                        <span className="text-[var(--gold)]/30 text-xs group-hover:text-[var(--gold)]/70 transition-colors tracking-wider flex items-center gap-1">
                          Begin <span className="text-sm">→</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="relative z-10 px-6 lg:px-8 pb-28 md:pb-36">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionDivider />
            <p className="text-[var(--cream)]/30 text-[10px] tracking-[0.35em] uppercase mb-4">The Process</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)]/90">
              How <span className="text-gold-gradient italic">Norna</span> Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: "01", title: "Ask Your Question", desc: "Focus your mind on what you seek guidance for. Your intention shapes the reading." },
              { step: "02", title: "Draw Your Cards", desc: "Tap to reveal each card. The ancient symbols hold messages meant only for you." },
              { step: "03", title: "Receive Insight", desc: "Our AI interprets your spread with the depth and nuance of a seasoned reader." },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-[var(--gold)]/20 text-xs tracking-[0.3em] font-display mb-4">{item.step}</div>
                <div className="w-16 h-16 mx-auto rounded-full border border-[var(--gold)]/15 flex items-center justify-center mb-6 group-hover:border-[var(--gold)]/30 transition-colors duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/50" />
                </div>
                <h3 className="font-display text-lg text-[var(--cream)]/80 mb-3">{item.title}</h3>
                <p className="text-[var(--cream)]/35 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section className="relative z-10 pb-28 md:pb-36 overflow-hidden">
        <div className="text-center mb-14 px-6">
          <SectionDivider />
          <p className="text-[var(--cream)]/30 text-[10px] tracking-[0.35em] uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)]/90">
            Trusted by <span className="text-gold-gradient italic">Seekers</span>
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative" ref={marqueeRef}>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--deep)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--deep)] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[320px] md:w-[380px] mx-3 rounded-2xl border border-[var(--gold)]/[0.06] p-6 md:p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-[var(--gold)]/70">
                      <path d="M6 0l1.5 4.5H12l-3.75 2.7L9.75 12 6 9.3 2.25 12l1.5-4.8L0 4.5h4.5z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--cream)]/50 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-[var(--gold)]/50 text-xs tracking-[0.15em]">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="relative z-10 px-6 lg:px-8 pb-28 md:pb-36">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <SectionDivider />
            <p className="text-[var(--cream)]/30 text-[10px] tracking-[0.35em] uppercase mb-4">Questions</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)]/90">
              Frequently <span className="text-gold-gradient italic">Asked</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--gold)]/[0.06] overflow-hidden transition-colors duration-300 hover:border-[var(--gold)]/15"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-display text-sm md:text-base text-[var(--cream)]/80">{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className={`text-[var(--gold)]/40 flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5" : "max-h-0"}`}
                >
                  <p className="px-6 text-[var(--cream)]/35 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative z-10 px-6 pb-28 md:pb-36 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--gold)]/20 mx-auto mb-8" />
          <h2 className="font-display text-2xl md:text-3xl text-[var(--cream)]/90 mb-3">
            Your destiny is one card away
          </h2>
          <p className="text-[var(--cream)]/35 text-sm mb-10">
            Join thousands who trust the Norns for guidance.
          </p>
          <Link
            href="/reading"
            className="btn-shimmer inline-flex items-center gap-3 px-12 py-4 bg-[var(--gold)] text-[var(--deep)] rounded-full text-sm font-semibold tracking-wider hover:bg-[var(--gold-light)] transition-all duration-300 shadow-lg shadow-[var(--gold)]/15"
          >
            Start Free Reading →
          </Link>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="relative z-10 border-t border-[var(--gold)]/[0.06]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div>
              <p className="font-display text-sm tracking-[0.25em] text-[var(--gold)]/60 mb-4">NORNA</p>
              <p className="text-[var(--cream)]/25 text-xs leading-relaxed max-w-xs">
                AI-powered tarot readings guided by the wisdom of the Norse Norns. Ancient symbols, modern insight.
              </p>
            </div>

            {/* Readings */}
            <div>
              <p className="text-[var(--cream)]/40 text-[10px] tracking-[0.25em] uppercase mb-4">Readings</p>
              <div className="space-y-2.5">
                <Link href="/reading/three-card" className="block text-[var(--cream)]/25 text-xs hover:text-[var(--gold)]/60 transition-colors">Three-Card Spread</Link>
                <Link href="/reading/love" className="block text-[var(--cream)]/25 text-xs hover:text-[var(--gold)]/60 transition-colors">Love Reading</Link>
                <Link href="/reading/daily" className="block text-[var(--cream)]/25 text-xs hover:text-[var(--gold)]/60 transition-colors">Daily Card</Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[var(--cream)]/40 text-[10px] tracking-[0.25em] uppercase mb-4">Legal</p>
              <div className="space-y-2.5">
                <span className="block text-[var(--cream)]/25 text-xs cursor-pointer hover:text-[var(--gold)]/60 transition-colors">Privacy Policy</span>
                <span className="block text-[var(--cream)]/25 text-xs cursor-pointer hover:text-[var(--gold)]/60 transition-colors">Terms of Service</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--gold)]/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--cream)]/15 text-[10px] tracking-wider">
              © 2024 Norna. For entertainment purposes. The stars guide, but you decide.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
