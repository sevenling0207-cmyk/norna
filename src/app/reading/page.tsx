"use client";
import Link from "next/link";
import Starfield from "@/components/Starfield";

const readings = [
  {
    id: "three-card",
    icon: "🃏",
    title: "Three-Card Spread",
    desc: "Unveil the threads of Past, Present, and Future. The classic reading for any question.",
    price: "Free",
    path: "/reading/three-card",
    popular: true,
  },
  {
    id: "love",
    icon: "💜",
    title: "Love Reading",
    desc: "Explore the energies between you and your partner. Understand heart connections on a deeper level.",
    price: "$2.99",
    path: "/reading/love",
  },
  {
    id: "daily",
    icon: "☀️",
    title: "Daily Horoscope",
    desc: "A single card to illuminate your day. Perfect for your morning ritual of intention.",
    price: "Free",
    path: "/reading/daily",
  },
  {
    id: "palmistry",
    icon: "✋",
    title: "Palm Reading",
    desc: "Upload a photo of your palm and let AI trace the lines of your destiny.",
    price: "$4.99",
    path: "#",
    soon: true,
  },
];

export default function ReadingSelect() {
  return (
    <main className="relative min-h-screen">
      <Starfield />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <Link href="/" className="font-display text-xl tracking-[0.2em] text-mystic-gold">
          NORNA
        </Link>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="pt-8 md:pt-16 pb-10 md:pb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-mystic-star/40 text-sm hover:text-mystic-gold transition-colors duration-300 mb-8"
          >
            <span>←</span>
            <span>Home</span>
          </Link>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-gold-gradient mb-3">
            Choose Your Reading
          </h1>
          <p className="text-mystic-star/40 text-sm md:text-base max-w-lg">
            Each spread reveals different aspects of your journey. Select the one that calls to you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {readings.map((r, i) => (
            <Link
              key={r.id}
              href={r.path}
              className={`group relative glass rounded-2xl p-6 md:p-8 transition-all duration-500
                ${
                  r.soon
                    ? "opacity-40 pointer-events-none"
                    : "hover:border-mystic-gold/40 hover:scale-[1.02] hover:shadow-lg hover:shadow-mystic-gold/10"
                }`}
              style={{
                opacity: 0,
                animation: `slideUp 0.6s ease-out ${i * 100}ms forwards`,
              }}
            >
              {/* Popular badge */}
              {r.popular && (
                <span className="absolute -top-2 right-6 bg-mystic-gold text-mystic-deep text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              {/* Soon badge */}
              {r.soon && (
                <span className="absolute -top-2 right-6 bg-mystic-purple/60 text-mystic-star text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border border-mystic-purple/40">
                  Coming Soon
                </span>
              )}

              <div className="flex items-start gap-4">
                <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-lg md:text-xl text-mystic-gold mb-2 group-hover:text-mystic-gold-light transition-colors">
                    {r.title}
                  </h2>
                  <p className="text-mystic-star/40 text-sm leading-relaxed mb-4">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium tracking-wider ${
                        r.price === "Free" ? "text-emerald-400/80" : "text-mystic-gold/70"
                      }`}
                    >
                      {r.price}
                    </span>
                    {!r.soon && (
                      <span className="text-mystic-gold/40 text-xs group-hover:text-mystic-gold/70 transition-colors tracking-wider">
                        Select →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
