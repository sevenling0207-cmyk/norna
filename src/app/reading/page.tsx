"use client";
import Link from "next/link";
import Starfield from "@/components/Starfield";

const readings = [
  { id: "three-card", icon: "🃏", title: "Three Card Spread", desc: "Past · Present · Future", path: "/reading/three-card" },
  { id: "love", icon: "💜", title: "Love Reading", desc: "Heart matters & relationships", path: "/reading/love" },
  { id: "daily", icon: "☀️", title: "Daily Fortune", desc: "Your card of the day", path: "/reading/daily" },
  { id: "palmistry", icon: "✋", title: "Palm Reading", desc: "Lines of destiny (coming soon)", path: "#", soon: true },
];

export default function ReadingSelect() {
  return (
    <main className="relative min-h-screen px-6 py-16">
      <Starfield />
      <div className="relative z-10 max-w-lg mx-auto">
        <Link href="/" className="text-mystic-gold/60 text-sm hover:text-mystic-gold transition-colors">
          ← Back
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-mystic-gold mt-6 mb-2">
          Choose Your Reading
        </h1>
        <p className="text-mystic-star/50 text-sm mb-10">What would you like to explore?</p>

        <div className="space-y-4">
          {readings.map((r, i) => (
            <Link
              key={r.id}
              href={r.path}
              className={`block p-5 rounded-2xl border transition-all duration-300 animate-slide-up
                ${r.soon
                  ? "border-mystic-star/10 opacity-40 pointer-events-none"
                  : "border-mystic-gold/20 hover:border-mystic-gold/60 hover:bg-mystic-gold/5 gold-glow"
                }`}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{r.icon}</span>
                <div>
                  <h2 className="text-lg font-serif text-mystic-gold">{r.title}</h2>
                  <p className="text-mystic-star/50 text-sm">{r.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
