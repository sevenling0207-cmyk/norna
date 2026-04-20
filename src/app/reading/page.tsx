"use client";
import Link from "next/link";
import Starfield from "@/components/Starfield";

const readings = [
  {
    id: "three-card",
    title: "Three-Card Spread",
    subtitle: "Past · Present · Future",
    desc: "The classic tarot reading. Three cards illuminate the threads of time woven around your question, revealing what was, what is, and what may be.",
    price: "Free",
    href: "/reading/three-card",
    popular: true,
    features: ["3 cards drawn", "AI interpretation", "Shareable result"],
  },
  {
    id: "love",
    title: "Love Reading",
    subtitle: "Heart · Partner · Union",
    desc: "Explore the energies that flow between souls. Understand what draws you together, what seeks healing, and the potential that lies ahead.",
    price: "$2.99",
    href: "/reading/love",
    features: ["3 cards drawn", "Deep relationship analysis", "Compatibility insight"],
  },
  {
    id: "daily",
    title: "Daily Card",
    subtitle: "Today's Guidance",
    desc: "A single card to set your intention for the day ahead. A morning ritual of reflection and centering, trusted by thousands.",
    price: "Free",
    href: "/reading/daily",
    features: ["1 card drawn", "Daily guidance", "Morning ritual"],
  },
  {
    id: "palmistry",
    title: "Palm Reading",
    subtitle: "Lines of Destiny",
    desc: "Upload a photo of your palm and let our AI trace the ancient lines that map your fate, fortune, and the deeper patterns of your life.",
    price: "$4.99",
    href: "#",
    soon: true,
    features: ["Photo analysis", "Line-by-line reading", "Detailed report"],
  },
];

function ReadingIcon({ id }: { id: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[var(--gold)]/50">
      {id === "three-card" && (
        <>
          <rect x="4" y="10" width="11" height="18" rx="2" stroke="currentColor" strokeWidth="1" />
          <rect x="18.5" y="8" width="11" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
          <rect x="33" y="10" width="11" height="18" rx="2" stroke="currentColor" strokeWidth="1" />
          <circle cx="9.5" cy="19" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="24" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="38.5" cy="19" r="1.5" fill="currentColor" opacity="0.4" />
        </>
      )}
      {id === "love" && (
        <>
          <path d="M24 40s-14-8-14-19c0-5.5 4-10 8.5-10 2.5 0 4.5 1.5 5.5 3 1-1.5 3-3 5.5-3 4.5 0 8.5 4.5 8.5 10 0 11-14 19-14 19z" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M24 40s-8-5-11-12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </>
      )}
      {id === "daily" && (
        <>
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1" />
          <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
          <path d="M24 8v6M24 34v6M8 24h6M34 24h6M12.5 12.5l4 4M31.5 31.5l4 4M12.5 35.5l4-4M31.5 16.5l4-4" stroke="currentColor" strokeWidth="1" />
        </>
      )}
      {id === "palmistry" && (
        <>
          <path d="M24 42c-8 0-14-5-14-14V18c0-5.5 4-9 8-9" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M18 12c0-3 2-5 4-5s4 2 4 5" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M26 10c0-3 2-5 4-5s4 2 4 5v10" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M16 22c-2 0-4-1.5-4-4" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <path d="M14 28c6-2 12-2 18 0" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </>
      )}
    </svg>
  );
}

export default function ReadingSelect() {
  return (
    <main className="relative min-h-screen">
      <Starfield />

      {/* Nav */}
      <nav className="relative z-20 border-b border-[var(--gold)]/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 md:h-20">
          <Link href="/" className="font-display text-lg tracking-[0.25em] text-[var(--gold)]">
            NORNA
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-24">
        {/* Header */}
        <div className="pt-10 md:pt-16 pb-12 md:pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--cream)]/30 text-xs tracking-wider hover:text-[var(--gold)] transition-colors duration-300 mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold)]/15 to-transparent" />
          </div>
          <p className="text-[var(--cream)]/25 text-[10px] tracking-[0.35em] uppercase mb-4">Select Your Spread</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">
            <span className="text-gold-gradient">Choose Your Reading</span>
          </h1>
          <p className="text-[var(--cream)]/35 text-sm md:text-base max-w-lg leading-relaxed">
            Each spread reveals different aspects of your journey. Select the one that resonates with your spirit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {readings.map((r, i) => (
            <Link
              key={r.id}
              href={r.href}
              className={`group relative rounded-2xl border transition-all duration-500
                ${r.soon
                  ? "border-[var(--cream)]/[0.03] opacity-40 pointer-events-none"
                  : "border-[var(--gold)]/[0.06] hover:border-[var(--gold)]/20 hover:bg-[var(--gold)]/[0.015]"
                }`}
              style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${150 + i * 80}ms forwards` }}
            >
              {/* Badge */}
              {r.popular && (
                <span className="absolute -top-3 right-6 bg-[var(--gold)] text-[var(--deep)] text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md shadow-[var(--gold)]/20">
                  Most Popular
                </span>
              )}
              {r.soon && (
                <span className="absolute -top-3 right-6 bg-[var(--purple)]/30 text-[var(--cream)]/60 text-[9px] tracking-wider uppercase px-3 py-1 rounded-full border border-[var(--purple)]/20">
                  Coming Soon
                </span>
              )}

              <div className="p-7 md:p-8">
                {/* Icon */}
                <div className="mb-5 group-hover:opacity-100 opacity-70 transition-opacity duration-500">
                  <ReadingIcon id={r.id} />
                </div>

                <h2 className="font-display text-xl text-[var(--cream)]/90 group-hover:text-[var(--gold)] transition-colors duration-300 mb-1">
                  {r.title}
                </h2>
                <p className="text-[var(--gold)]/35 text-[10px] tracking-[0.2em] uppercase mb-4">{r.subtitle}</p>
                <p className="text-[var(--cream)]/35 text-sm leading-relaxed mb-6">{r.desc}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {r.features.map((f, j) => (
                    <span key={j} className="text-[10px] text-[var(--cream)]/25 tracking-wider border border-[var(--cream)]/[0.06] rounded-full px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--gold)]/[0.04]">
                  <span className={`text-sm font-medium tracking-wider ${r.price === "Free" ? "text-emerald-400/60" : "text-[var(--gold)]/50"}`}>
                    {r.price}
                  </span>
                  {!r.soon && (
                    <span className="text-[var(--gold)]/25 text-xs group-hover:text-[var(--gold)]/70 transition-colors tracking-wider">
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
