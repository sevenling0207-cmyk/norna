"use client";

import Image from "next/image";
import Link from "next/link";
import Starfield from "@/components/Starfield";

const readings = [
  {
    title: "Three-Card Spread",
    desc: "Reveal the influences of your past, the energy of your present, and the possibilities of your future in one powerful spread.",
    price: "Free first reading",
    image: "/images/hero_slide_2_1024x1024.jpg",
    slug: "three-card",
    badge: "Popular",
    badgeColor: "bg-[rgba(212,168,83,0.2)] border-[rgba(212,168,83,0.3)] text-[#f0d48a]",
  },
  {
    title: "Love Reading",
    desc: "Understand the dynamics of your romantic life. Gain clarity on relationships, connections, and matters of the heart.",
    price: "$6.99",
    image: "/images/hero_slide_3_1024x1024.jpg",
    slug: "love",
    badge: null,
    badgeColor: "",
  },
  {
    title: "Daily Horoscope",
    desc: "Start each day with cosmic clarity. Your personalized daily forecast based on runic wisdom and celestial alignment.",
    price: "Free",
    image: "/images/horscope-optimized.webp",
    slug: "daily",
    badge: "Free",
    badgeColor: "bg-[rgba(76,212,140,0.15)] border-[rgba(76,212,140,0.3)] text-emerald-400",
  },
  {
    title: "Celtic Cross",
    desc: "The most comprehensive reading available. Ten cards reveal deep insights into every aspect of your life situation.",
    price: "$9.99",
    image: "/images/hero_slide_4_1024x1024.jpg",
    slug: "celtic-cross",
    badge: null,
    badgeColor: "",
  },
];

export default function ReadingSelectPage() {
  return (
    <>
      <Starfield />

      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,20,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-gold-gradient font-bold">NORNA</Link>
          <Link href="/" className="text-[#9ca3af] text-sm hover:text-white transition-colors">← Back</Link>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Reading
            </h1>
            <p className="text-[#9ca3af] text-base sm:text-lg max-w-xl mx-auto">
              Each reading type offers a unique perspective on your journey
            </p>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {readings.map((r) => (
              <Link key={r.slug} href={`/reading/${r.slug}`} className="group glass-card overflow-hidden">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/30 to-transparent" />
                  {r.badge && (
                    <span className={`absolute top-4 right-4 border text-xs px-3 py-1 rounded-full font-medium ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-white mb-2">{r.title}</h2>
                  <p className="text-[#9ca3af] text-sm leading-relaxed mb-5">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0d48a] font-semibold">{r.price}</span>
                    <span className="btn-gold px-5 py-2 text-sm font-semibold">
                      Start Reading
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
