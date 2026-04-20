"use client";
import Link from "next/link";
import Image from "next/image";
import Starfield from "@/components/Starfield";

const readings = [
  {
    id: "three-card",
    title: "Three-Card Spread",
    subtitle: "Past · Present · Future",
    desc: "The classic tarot reading. Three cards illuminate the threads of time woven around your question.",
    price: "Free",
    href: "/reading/three-card",
    popular: true,
    features: ["3 cards drawn", "AI interpretation", "Shareable result"],
    image: "/images/hero_slide_3_1024x1024.jpg",
  },
  {
    id: "love",
    title: "Love Reading",
    subtitle: "Heart · Partner · Union",
    desc: "Explore the energies between souls. Understand what draws you together and what seeks healing.",
    price: "$2.99",
    href: "/reading/love",
    features: ["3 cards drawn", "Deep analysis", "Compatibility insight"],
    image: "/images/hero_slide_2_1024x1024.jpg",
  },
  {
    id: "daily",
    title: "Daily Card",
    subtitle: "Today's Guidance",
    desc: "A single card to set your intention. A morning ritual of reflection trusted by thousands.",
    price: "Free",
    href: "/reading/daily",
    features: ["1 card drawn", "Daily guidance", "Morning ritual"],
    image: "/images/horscope-optimized.webp",
  },
  {
    id: "palmistry",
    title: "Palm Reading",
    subtitle: "Lines of Destiny",
    desc: "Upload a photo of your palm and let AI trace the ancient lines that map your fate.",
    price: "$4.99",
    href: "#",
    soon: true,
    features: ["Photo analysis", "Line-by-line reading", "Detailed report"],
    image: "/images/expeert-guidance-optimized.webp",
  },
];

export default function ReadingSelect() {
  return (
    <main className="relative min-h-screen">
      <Starfield />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--deep)]/80 backdrop-blur-xl border-b border-[var(--gold)]/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 md:h-20">
          <Link href="/" className="font-display text-xl tracking-[0.25em] text-[var(--gold)] font-semibold">
            NORNA
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pb-24 pt-24 md:pt-28">
        {/* Header */}
        <div className="pb-12 md:pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--cream)]/30 text-xs tracking-wider hover:text-[var(--gold)] transition-colors duration-300 mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Home
          </Link>

          <p className="text-[var(--gold)]/50 text-[11px] tracking-[0.4em] uppercase mb-4">Select Your Spread</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">
            <span className="text-gold-gradient">Choose Your Reading</span>
          </h1>
          <p className="text-[var(--cream)]/40 text-sm md:text-base max-w-lg leading-relaxed">
            Each spread reveals different aspects of your journey. Select the one that resonates with your spirit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {readings.map((r, i) => (
            <Link
              key={r.id}
              href={r.href}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                r.soon
                  ? "border-[var(--cream)]/[0.03] opacity-40 pointer-events-none"
                  : "border-[var(--gold)]/[0.08] hover:border-[var(--gold)]/25 hover:shadow-xl hover:shadow-[var(--gold)]/5"
              }`}
              style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${150 + i * 80}ms forwards` }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className="object-cover opacity-30 transition-all duration-700 group-hover:opacity-40 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/80 to-[var(--deep)]/60" />
              </div>

              {/* Badge */}
              {r.popular && (
                <span className="absolute top-5 right-5 bg-[var(--gold)] text-[var(--deep)] text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md shadow-[var(--gold)]/20 z-10">
                  Most Popular
                </span>
              )}
              {r.soon && (
                <span className="absolute top-5 right-5 bg-[var(--purple)]/40 text-[var(--cream)]/60 text-[9px] tracking-wider uppercase px-3 py-1 rounded-full border border-[var(--purple)]/20 z-10">
                  Coming Soon
                </span>
              )}

              <div className="relative z-10 p-7 md:p-8">
                <h2 className="font-display text-xl text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-300 mb-1">
                  {r.title}
                </h2>
                <p className="text-[var(--gold)]/40 text-[10px] tracking-[0.2em] uppercase mb-4">{r.subtitle}</p>
                <p className="text-[var(--cream)]/40 text-sm leading-relaxed mb-6">{r.desc}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {r.features.map((f, j) => (
                    <span key={j} className="text-[10px] text-[var(--cream)]/30 tracking-wider border border-[var(--cream)]/[0.08] rounded-full px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--gold)]/[0.06]">
                  <span className={`text-sm font-semibold tracking-wider ${r.price === "Free" ? "text-emerald-400/70" : "text-[var(--gold)]"}`}>
                    {r.price}
                  </span>
                  {!r.soon && (
                    <span className="text-[var(--gold)]/30 text-xs group-hover:text-[var(--gold)] transition-colors tracking-wider">
                      Select →
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
