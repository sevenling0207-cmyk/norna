"use client";
import Link from "next/link";
import Starfield from "@/components/Starfield";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <Starfield />

      {/* Logo / Brand */}
      <div className="relative z-10 animate-fade-in">
        <div className="text-6xl mb-4">✦</div>
        <h1 className="text-5xl md:text-7xl font-serif tracking-wider text-mystic-gold mb-3">
          NORNA
        </h1>
        <p className="text-mystic-star/70 text-sm md:text-base tracking-[0.3em] uppercase mb-12">
          Ancient Wisdom, Modern Insight
        </p>

        {/* Main CTA */}
        <p className="text-xl md:text-2xl font-serif text-mystic-star mb-10 animate-float">
          The stars have a message for you
        </p>

        <Link
          href="/reading"
          className="inline-block px-10 py-4 bg-mystic-gold/20 border border-mystic-gold text-mystic-gold 
                     rounded-full text-lg tracking-wider hover:bg-mystic-gold hover:text-mystic-deep 
                     transition-all duration-500 gold-glow"
        >
          Begin Your Reading ✦
        </Link>

        {/* Norns tagline */}
        <div className="mt-16 flex gap-8 text-mystic-star/40 text-xs tracking-widest uppercase">
          <span>Urd · Past</span>
          <span>Verdandi · Present</span>
          <span>Skuld · Future</span>
        </div>
      </div>
    </main>
  );
}
